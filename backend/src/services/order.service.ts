import prisma from '../config/database';
import { NotFoundError, BadRequestError } from '../utils/errors';
import { OrderStatus, PaymentStatus, Prisma } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';

interface CartItemDto {
  productId: string;
  quantity: number;
}

interface CreateOrderDto {
  cartId?: string;
  items?: CartItemDto[];
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  shippingAddress?: object;
  billingAddress?: object;
  couponCode?: string;
  notes?: string;
  paymentMethod?: string;
}

class OrderService {
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
      cart = await prisma.cart.create({
        data: {
          sessionId: sessionId || uuidv4(),
          userId,
        },
      });
    }

    return cart;
  }

  async getCart(cartId: string) {
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

    // Calculate totals
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
    // Check if product exists and is in stock
    const product = await prisma.product.findUnique({
      where: { id: productId },
      select: { id: true, quantity: true, trackInventory: true, status: true },
    });

    if (!product) {
      throw new NotFoundError('Product not found');
    }

    if (product.status !== 'ACTIVE') {
      throw new BadRequestError('Product is not available');
    }

    if (product.trackInventory && product.quantity < quantity) {
      throw new BadRequestError('Insufficient stock');
    }

    // Check if item already in cart
    const existingItem = await prisma.cartItem.findUnique({
      where: {
        cartId_productId: { cartId, productId },
      },
    });

    if (existingItem) {
      // Update quantity
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

    // Add new item
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
  // Order Management
  // ==========================================

  async createOrder(data: CreateOrderDto) {
    let items: { productId: string; quantity: number; price: number; name: string; sku: string }[] = [];

    // Get items from cart or direct items
    if (data.cartId) {
      const cart = await this.getCart(data.cartId);
      items = cart.items.map((item) => ({
        productId: item.productId,
        quantity: item.quantity,
        price: Number(item.product.price),
        name: item.product.name,
        sku: item.product.slug,
      }));
    } else if (data.items) {
      const products = await prisma.product.findMany({
        where: { id: { in: data.items.map((i) => i.productId) } },
      });

      items = data.items.map((item) => {
        const product = products.find((p) => p.id === item.productId);
        if (!product) {
          throw new NotFoundError(`Product ${item.productId} not found`);
        }
        return {
          productId: item.productId,
          quantity: item.quantity,
          price: Number(product.price),
          name: product.name,
          sku: product.sku,
        };
      });
    }

    if (items.length === 0) {
      throw new BadRequestError('Order must have at least one item');
    }

    // Calculate totals
    let subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    let discount = 0;
    let couponDiscount = 0;

    // Apply coupon if provided
    if (data.couponCode) {
      const coupon = await prisma.coupon.findUnique({
        where: { code: data.couponCode },
      });

      if (coupon && coupon.isActive && new Date() >= coupon.validFrom && new Date() <= coupon.validTo) {
        if (coupon.usageLimit && coupon.usedCount >= coupon.usageLimit) {
          throw new BadRequestError('Coupon usage limit reached');
        }

        if (coupon.minOrderValue && subtotal < Number(coupon.minOrderValue)) {
          throw new BadRequestError(`Minimum order value is ₹${coupon.minOrderValue}`);
        }

        if (coupon.discountType === 'percentage') {
          couponDiscount = subtotal * (Number(coupon.discountValue) / 100);
          if (coupon.maxDiscount) {
            couponDiscount = Math.min(couponDiscount, Number(coupon.maxDiscount));
          }
        } else {
          couponDiscount = Number(coupon.discountValue);
        }

        discount = couponDiscount;

        // Increment usage count
        await prisma.coupon.update({
          where: { id: coupon.id },
          data: { usedCount: { increment: 1 } },
        });
      }
    }

    const tax = (subtotal - discount) * 0.18; // 18% GST
    const shipping = subtotal >= 1000 ? 0 : 100; // Free shipping above ₹1000
    const total = subtotal - discount + tax + shipping;

    // Generate order number
    const orderNumber = `ORD-${Date.now()}-${Math.random().toString(36).substring(2, 7).toUpperCase()}`;

    // Create order
    const order = await prisma.order.create({
      data: {
        orderNumber,
        customerName: data.customerName,
        customerEmail: data.customerEmail,
        customerPhone: data.customerPhone,
        shippingAddress: data.shippingAddress,
        billingAddress: data.billingAddress,
        subtotal,
        discount,
        tax,
        shipping,
        total,
        couponCode: data.couponCode,
        couponDiscount,
        notes: data.notes,
        paymentMethod: data.paymentMethod,
        items: {
          create: items.map((item) => ({
            productId: item.productId,
            name: item.name,
            sku: item.sku,
            price: item.price,
            quantity: item.quantity,
            total: item.price * item.quantity,
          })),
        },
      },
      include: {
        items: {
          include: {
            product: {
              select: { id: true, name: true, thumbnail: true },
            },
          },
        },
      },
    });

    // Update inventory
    for (const item of items) {
      await prisma.product.updateMany({
        where: {
          id: item.productId,
          trackInventory: true,
        },
        data: {
          quantity: { decrement: item.quantity },
        },
      });
    }

    // Clear cart if order was from cart
    if (data.cartId) {
      await this.clearCart(data.cartId);
    }

    return order;
  }

  async getOrderByNumber(orderNumber: string) {
    const order = await prisma.order.findUnique({
      where: { orderNumber },
      include: {
        items: {
          include: {
            product: {
              select: { id: true, name: true, slug: true, thumbnail: true },
            },
          },
        },
      },
    });

    if (!order) {
      throw new NotFoundError('Order not found');
    }

    return order;
  }

  async getOrderById(id: string) {
    const order = await prisma.order.findUnique({
      where: { id },
      include: {
        items: {
          include: {
            product: {
              select: { id: true, name: true, slug: true, thumbnail: true },
            },
          },
        },
      },
    });

    if (!order) {
      throw new NotFoundError('Order not found');
    }

    return order;
  }

  async getUserOrders(userId: string, page: number = 1, limit: number = 10) {
    const skip = (page - 1) * limit;

    const [orders, total] = await Promise.all([
      prisma.order.findMany({
        where: { userId },
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          items: {
            include: {
              product: {
                select: { id: true, name: true, thumbnail: true },
              },
            },
          },
        },
      }),
      prisma.order.count({ where: { userId } }),
    ]);

    return {
      orders,
      meta: { page, limit, total, totalPages: Math.ceil(total / limit) },
    };
  }

  async getAllOrders(query: {
    page?: number;
    limit?: number;
    status?: OrderStatus;
    paymentStatus?: PaymentStatus;
    search?: string;
    startDate?: Date;
    endDate?: Date;
  }) {
    const page = query.page || 1;
    const limit = query.limit || 20;
    const skip = (page - 1) * limit;

    const where: Prisma.OrderWhereInput = {};

    if (query.status) {
      where.status = query.status;
    }

    if (query.paymentStatus) {
      where.paymentStatus = query.paymentStatus;
    }

    if (query.search) {
      where.OR = [
        { orderNumber: { contains: query.search, mode: 'insensitive' } },
        { customerEmail: { contains: query.search, mode: 'insensitive' } },
        { customerName: { contains: query.search, mode: 'insensitive' } },
      ];
    }

    if (query.startDate || query.endDate) {
      where.createdAt = {};
      if (query.startDate) {
        where.createdAt.gte = query.startDate;
      }
      if (query.endDate) {
        where.createdAt.lte = query.endDate;
      }
    }

    const [orders, total] = await Promise.all([
      prisma.order.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          _count: { select: { items: true } },
        },
      }),
      prisma.order.count({ where }),
    ]);

    return {
      orders,
      meta: { page, limit, total, totalPages: Math.ceil(total / limit) },
    };
  }

  async updateOrderStatus(id: string, status: OrderStatus) {
    const order = await prisma.order.update({
      where: { id },
      data: { status },
    });

    return order;
  }

  async updatePaymentStatus(id: string, paymentStatus: PaymentStatus, paymentId?: string) {
    const order = await prisma.order.update({
      where: { id },
      data: { paymentStatus, paymentId },
    });

    return order;
  }

  // ==========================================
  // Coupons
  // ==========================================

  async validateCoupon(code: string, subtotal: number) {
    const coupon = await prisma.coupon.findUnique({ where: { code } });

    if (!coupon) {
      throw new NotFoundError('Coupon not found');
    }

    if (!coupon.isActive) {
      throw new BadRequestError('Coupon is not active');
    }

    if (new Date() < coupon.validFrom || new Date() > coupon.validTo) {
      throw new BadRequestError('Coupon has expired');
    }

    if (coupon.usageLimit && coupon.usedCount >= coupon.usageLimit) {
      throw new BadRequestError('Coupon usage limit reached');
    }

    if (coupon.minOrderValue && subtotal < Number(coupon.minOrderValue)) {
      throw new BadRequestError(`Minimum order value is ₹${coupon.minOrderValue}`);
    }

    let discount = 0;
    if (coupon.discountType === 'percentage') {
      discount = subtotal * (Number(coupon.discountValue) / 100);
      if (coupon.maxDiscount) {
        discount = Math.min(discount, Number(coupon.maxDiscount));
      }
    } else {
      discount = Number(coupon.discountValue);
    }

    return {
      valid: true,
      code: coupon.code,
      discountType: coupon.discountType,
      discountValue: Number(coupon.discountValue),
      discount,
    };
  }

  async createCoupon(data: {
    code: string;
    description?: string;
    discountType: string;
    discountValue: number;
    minOrderValue?: number;
    maxDiscount?: number;
    usageLimit?: number;
    validFrom: Date;
    validTo: Date;
  }) {
    const coupon = await prisma.coupon.create({ data });
    return coupon;
  }

  async getAllCoupons() {
    return prisma.coupon.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  // ==========================================
  // Analytics
  // ==========================================

  async getOrderStats(startDate?: Date, endDate?: Date) {
    const where: Prisma.OrderWhereInput = {};
    
    if (startDate || endDate) {
      where.createdAt = {};
      if (startDate) where.createdAt.gte = startDate;
      if (endDate) where.createdAt.lte = endDate;
    }

    const [totalOrders, totalRevenue, ordersByStatus] = await Promise.all([
      prisma.order.count({ where }),
      prisma.order.aggregate({
        where: { ...where, paymentStatus: PaymentStatus.PAID },
        _sum: { total: true },
      }),
      prisma.order.groupBy({
        by: ['status'],
        where,
        _count: true,
      }),
    ]);

    return {
      totalOrders,
      totalRevenue: totalRevenue._sum.total || 0,
      ordersByStatus: ordersByStatus.reduce(
        (acc, o) => {
          acc[o.status] = o._count;
          return acc;
        },
        {} as Record<string, number>
      ),
    };
  }
}

export default new OrderService();
