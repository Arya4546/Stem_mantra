import prisma from '../config/database';
import { NotFoundError, BadRequestError } from '../utils/errors';
import { ProductType, ProductStatus, Prisma } from '@prisma/client';

interface ProductQuery {
  page?: number;
  limit?: number;
  type?: string; // Allow 'all' or ProductType values
  status?: string; // Allow 'all' or ProductStatus values
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  search?: string;
  isFeatured?: boolean;
  sortBy?: 'price' | 'name' | 'createdAt' | 'popularity';
  sortOrder?: 'asc' | 'desc';
}

interface CreateProductDto {
  name: string;
  slug: string;
  sku: string;
  type: ProductType;
  status?: ProductStatus;
  price: number;
  compareAtPrice?: number;
  costPrice?: number;
  shortDescription?: string;
  description: string;
  features?: string[];
  specifications?: object;
  thumbnail?: string;
  images?: string[];
  video?: string;
  trackInventory?: boolean;
  quantity?: number;
  lowStockAlert?: number;
  metaTitle?: string;
  metaDescription?: string;
  isFeatured?: boolean;
  isNew?: boolean;
  isBestSeller?: boolean;
  downloadUrl?: string;
  accessDuration?: number;
  categoryIds?: string[];
}

class ProductService {
  // ==========================================
  // Products
  // ==========================================

  async getAllProducts(query: ProductQuery) {
    const page = query.page || 1;
    const limit = query.limit || 12;
    const skip = (page - 1) * limit;

    const where: Prisma.ProductWhereInput = {};

    // Status filter - 'all' means no filter, otherwise default to ACTIVE for public
    if (query.status && query.status !== 'all') {
      where.status = query.status as ProductStatus;
    } else if (!query.status) {
      // Default to ACTIVE only for public (when no status specified)
      where.status = ProductStatus.ACTIVE;
    }
    // When status === 'all', we don't add any status filter

    if (query.type && query.type !== 'all') {
      where.type = query.type as ProductType;
    }

    if (query.category) {
      where.categories = {
        some: {
          category: {
            slug: query.category,
          },
        },
      };
    }

    if (query.minPrice !== undefined || query.maxPrice !== undefined) {
      where.price = {};
      if (query.minPrice !== undefined) {
        where.price.gte = query.minPrice;
      }
      if (query.maxPrice !== undefined) {
        where.price.lte = query.maxPrice;
      }
    }

    if (query.isFeatured !== undefined) {
      where.isFeatured = query.isFeatured;
    }

    if (query.search) {
      where.OR = [
        { name: { contains: query.search, mode: 'insensitive' } },
        { shortDescription: { contains: query.search, mode: 'insensitive' } },
        { description: { contains: query.search, mode: 'insensitive' } },
        { sku: { contains: query.search, mode: 'insensitive' } },
      ];
    }

    // Sorting
    let orderBy: Prisma.ProductOrderByWithRelationInput = { createdAt: 'desc' };
    if (query.sortBy) {
      const order = query.sortOrder || 'asc';
      switch (query.sortBy) {
        case 'price':
          orderBy = { price: order };
          break;
        case 'name':
          orderBy = { name: order };
          break;
        case 'createdAt':
          orderBy = { createdAt: order };
          break;
        // popularity would need review count or order count
      }
    }

    const [products, total] = await Promise.all([
      prisma.product.findMany({
        where,
        skip,
        take: limit,
        orderBy,
        include: {
          categories: {
            include: {
              category: true,
            },
          },
          _count: {
            select: {
              reviews: true,
              orderItems: true,
            },
          },
        },
      }),
      prisma.product.count({ where }),
    ]);

    // Calculate average ratings
    const productsWithRatings = await Promise.all(
      products.map(async (product) => {
        const avgRating = await prisma.productReview.aggregate({
          where: { productId: product.id, isApproved: true },
          _avg: { rating: true },
        });
        return {
          ...product,
          avgRating: avgRating._avg.rating || 0,
        };
      })
    );

    return {
      products: productsWithRatings,
      meta: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async getProductBySlug(slug: string) {
    const product = await prisma.product.findUnique({
      where: { slug },
      include: {
        categories: {
          include: {
            category: true,
          },
        },
        reviews: {
          where: { isApproved: true },
          orderBy: { createdAt: 'desc' },
          take: 10,
        },
      },
    });

    if (!product) {
      throw new NotFoundError('Product not found');
    }

    // Get average rating
    const avgRating = await prisma.productReview.aggregate({
      where: { productId: product.id, isApproved: true },
      _avg: { rating: true },
      _count: true,
    });

    return {
      ...product,
      avgRating: avgRating._avg.rating || 0,
      reviewCount: avgRating._count,
    };
  }

  async getProductById(id: string) {
    const product = await prisma.product.findUnique({
      where: { id },
      include: {
        categories: { include: { category: true } },
      },
    });

    if (!product) {
      throw new NotFoundError('Product not found');
    }

    return product;
  }

  async createProduct(data: CreateProductDto) {
    const { categoryIds, ...productData } = data;

    const product = await prisma.product.create({
      data: {
        ...productData,
        categories: categoryIds
          ? {
              create: categoryIds.map((categoryId) => ({
                category: { connect: { id: categoryId } },
              })),
            }
          : undefined,
      },
      include: {
        categories: { include: { category: true } },
      },
    });

    return product;
  }

  async updateProduct(id: string, data: Partial<CreateProductDto>) {
    const { categoryIds, ...productData } = data;

    const existing = await prisma.product.findUnique({ where: { id } });
    if (!existing) {
      throw new NotFoundError('Product not found');
    }

    if (categoryIds) {
      await prisma.productToCategory.deleteMany({ where: { productId: id } });
      await prisma.productToCategory.createMany({
        data: categoryIds.map((categoryId) => ({
          productId: id,
          categoryId,
        })),
      });
    }

    const product = await prisma.product.update({
      where: { id },
      data: productData,
      include: {
        categories: { include: { category: true } },
      },
    });

    return product;
  }

  async deleteProduct(id: string) {
    const existing = await prisma.product.findUnique({ where: { id } });
    if (!existing) {
      throw new NotFoundError('Product not found');
    }

    await prisma.product.delete({ where: { id } });
    return { message: 'Product deleted successfully' };
  }

  async getFeaturedProducts(limit: number = 8) {
    const products = await prisma.product.findMany({
      where: {
        status: ProductStatus.ACTIVE,
        isFeatured: true,
      },
      take: limit,
      orderBy: { createdAt: 'desc' },
      include: {
        categories: { include: { category: true } },
        _count: { select: { reviews: true } },
      },
    });

    return products;
  }

  async getNewArrivals(limit: number = 8) {
    const products = await prisma.product.findMany({
      where: {
        status: ProductStatus.ACTIVE,
        isNew: true,
      },
      take: limit,
      orderBy: { createdAt: 'desc' },
      include: {
        categories: { include: { category: true } },
      },
    });

    return products;
  }

  async getBestSellers(limit: number = 8) {
    const products = await prisma.product.findMany({
      where: {
        status: ProductStatus.ACTIVE,
        isBestSeller: true,
      },
      take: limit,
      orderBy: { createdAt: 'desc' },
      include: {
        categories: { include: { category: true } },
      },
    });

    return products;
  }

  async getRelatedProducts(slug: string, limit: number = 4) {
    const product = await prisma.product.findUnique({
      where: { slug },
      include: { categories: true },
    });

    if (!product) {
      throw new NotFoundError('Product not found');
    }

    const categoryIds = product.categories.map((c) => c.categoryId);

    const related = await prisma.product.findMany({
      where: {
        id: { not: product.id },
        status: ProductStatus.ACTIVE,
        categories: {
          some: {
            categoryId: { in: categoryIds },
          },
        },
      },
      take: limit,
      include: {
        categories: { include: { category: true } },
      },
    });

    return related;
  }

  // ==========================================
  // Categories
  // ==========================================

  async getAllCategories() {
    const categories = await prisma.productCategory.findMany({
      where: { isActive: true },
      orderBy: { sortOrder: 'asc' },
      include: {
        children: {
          where: { isActive: true },
          orderBy: { sortOrder: 'asc' },
        },
        _count: { select: { products: true } },
      },
    });

    // Return only top-level categories
    return categories.filter((c) => !c.parentId);
  }

  async getCategoryBySlug(slug: string) {
    const category = await prisma.productCategory.findUnique({
      where: { slug },
      include: {
        children: { where: { isActive: true } },
        parent: true,
        _count: { select: { products: true } },
      },
    });

    if (!category) {
      throw new NotFoundError('Category not found');
    }

    return category;
  }

  async createCategory(data: {
    name: string;
    slug: string;
    description?: string;
    image?: string;
    parentId?: string;
  }) {
    const category = await prisma.productCategory.create({ data });
    return category;
  }

  // ==========================================
  // Reviews
  // ==========================================

  async getProductReviews(productId: string, page: number = 1, limit: number = 10) {
    const skip = (page - 1) * limit;

    const [reviews, total] = await Promise.all([
      prisma.productReview.findMany({
        where: { productId, isApproved: true },
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      prisma.productReview.count({
        where: { productId, isApproved: true },
      }),
    ]);

    const stats = await prisma.productReview.aggregate({
      where: { productId, isApproved: true },
      _avg: { rating: true },
      _count: true,
    });

    // Rating distribution
    const distribution = await prisma.productReview.groupBy({
      by: ['rating'],
      where: { productId, isApproved: true },
      _count: true,
    });

    return {
      reviews,
      meta: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
      stats: {
        average: stats._avg.rating || 0,
        total: stats._count,
        distribution: distribution.reduce(
          (acc, d) => {
            acc[d.rating] = d._count;
            return acc;
          },
          {} as Record<number, number>
        ),
      },
    };
  }

  async createReview(data: {
    productId: string;
    rating: number;
    title?: string;
    content: string;
    authorName: string;
    authorEmail: string;
  }) {
    if (data.rating < 1 || data.rating > 5) {
      throw new BadRequestError('Rating must be between 1 and 5');
    }

    const product = await prisma.product.findUnique({
      where: { id: data.productId },
    });

    if (!product) {
      throw new NotFoundError('Product not found');
    }

    const review = await prisma.productReview.create({ data });
    return review;
  }

  async approveReview(id: string) {
    const review = await prisma.productReview.update({
      where: { id },
      data: { isApproved: true },
    });
    return review;
  }

  // ==========================================
  // Inventory
  // ==========================================

  async updateInventory(productId: string, quantity: number) {
    const product = await prisma.product.update({
      where: { id: productId },
      data: { quantity },
    });
    return product;
  }

  async checkStock(productId: string, requestedQuantity: number) {
    const product = await prisma.product.findUnique({
      where: { id: productId },
      select: { quantity: true, trackInventory: true, name: true },
    });

    if (!product) {
      throw new NotFoundError('Product not found');
    }

    if (!product.trackInventory) {
      return { inStock: true, available: Infinity };
    }

    return {
      inStock: product.quantity >= requestedQuantity,
      available: product.quantity,
    };
  }

  async getLowStockProducts() {
    const products = await prisma.product.findMany({
      where: {
        trackInventory: true,
        quantity: {
          lte: prisma.product.fields.lowStockAlert,
        },
      },
      orderBy: { quantity: 'asc' },
    });

    return products;
  }

  async updateStock(id: string, stock: number) {
    const product = await prisma.product.update({
      where: { id },
      data: { quantity: stock },
    });
    return product;
  }

  // ==========================================
  // Cart Management
  // ==========================================

  async getOrCreateCart(sessionId?: string, userId?: string) {
    let cart = null;

    if (userId) {
      cart = await prisma.cart.findFirst({ where: { userId } });
    } else if (sessionId) {
      cart = await prisma.cart.findUnique({ where: { sessionId } });
    }

    if (!cart) {
      const newSessionId = sessionId || `sess_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
      cart = await prisma.cart.create({
        data: {
          sessionId: newSessionId,
          userId,
        },
      });
    }

    return cart;
  }

  async getCartDetails(cartId: string) {
    const cart = await prisma.cart.findUnique({
      where: { id: cartId },
      include: {
        items: {
          include: {
            product: {
              select: {
                id: true,
                name: true,
                slug: true,
                price: true,
                compareAtPrice: true,
                thumbnail: true,
                quantity: true,
                trackInventory: true,
              },
            },
          },
        },
      },
    });

    if (!cart) {
      throw new NotFoundError('Cart not found');
    }

    const subtotal = cart.items.reduce((sum, item) => {
      return sum + Number(item.product.price) * item.quantity;
    }, 0);

    return {
      ...cart,
      subtotal,
      itemCount: cart.items.reduce((sum, item) => sum + item.quantity, 0),
    };
  }

  async addToCart(cartId: string, productId: string, quantity: number = 1) {
    const product = await prisma.product.findUnique({
      where: { id: productId },
      select: { id: true, quantity: true, trackInventory: true, status: true },
    });

    if (!product) {
      throw new NotFoundError('Product not found');
    }

    if (product.status !== ProductStatus.ACTIVE) {
      throw new BadRequestError('Product is not available');
    }

    if (product.trackInventory && product.quantity < quantity) {
      throw new BadRequestError('Insufficient stock');
    }

    const existingItem = await prisma.cartItem.findUnique({
      where: {
        cartId_productId: { cartId, productId },
      },
    });

    if (existingItem) {
      const newQuantity = existingItem.quantity + quantity;
      
      if (product.trackInventory && product.quantity < newQuantity) {
        throw new BadRequestError('Insufficient stock');
      }

      return prisma.cartItem.update({
        where: { id: existingItem.id },
        data: { quantity: newQuantity },
        include: { product: true },
      });
    }

    return prisma.cartItem.create({
      data: {
        cartId,
        productId,
        quantity,
      },
      include: { product: true },
    });
  }

  async updateCartItem(cartId: string, productId: string, quantity: number) {
    if (quantity < 1) {
      return this.removeFromCart(cartId, productId);
    }

    const product = await prisma.product.findUnique({
      where: { id: productId },
      select: { quantity: true, trackInventory: true },
    });

    if (product?.trackInventory && product.quantity < quantity) {
      throw new BadRequestError('Insufficient stock');
    }

    return prisma.cartItem.update({
      where: {
        cartId_productId: { cartId, productId },
      },
      data: { quantity },
      include: { product: true },
    });
  }

  async removeFromCart(cartId: string, productId: string) {
    // Check if item exists first
    const existingItem = await prisma.cartItem.findUnique({
      where: {
        cartId_productId: { cartId, productId },
      },
    });

    if (!existingItem) {
      throw new NotFoundError('Item not found in cart');
    }

    await prisma.cartItem.delete({
      where: {
        cartId_productId: { cartId, productId },
      },
    });

    return { message: 'Item removed from cart' };
  }

  async clearCart(cartId: string) {
    await prisma.cartItem.deleteMany({ where: { cartId } });
    return { message: 'Cart cleared' };
  }

  // ==========================================
  // Review Management (additional methods)
  // ==========================================

  async updateReview(id: string, userId: string, data: { rating?: number; title?: string; content?: string }) {
    const review = await prisma.productReview.findUnique({ where: { id } });
    
    if (!review) {
      throw new NotFoundError('Review not found');
    }

    // Only allow update if user owns the review
    if (review.authorEmail !== userId) {
      throw new BadRequestError('You can only update your own reviews');
    }

    return prisma.productReview.update({
      where: { id },
      data,
    });
  }

  async deleteReview(id: string, userId: string, isAdmin: boolean = false) {
    const review = await prisma.productReview.findUnique({ where: { id } });
    
    if (!review) {
      throw new NotFoundError('Review not found');
    }

    // Allow delete if admin or user owns the review
    if (!isAdmin && review.authorEmail !== userId) {
      throw new BadRequestError('You can only delete your own reviews');
    }

    await prisma.productReview.delete({ where: { id } });
    return { message: 'Review deleted successfully' };
  }
}

export default new ProductService();
