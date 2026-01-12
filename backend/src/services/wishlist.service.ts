import prisma from '../config/database';
import { NotFoundError, BadRequestError } from '../utils/errors';

class WishlistService {
  // Get or create user's wishlist
  async getOrCreateWishlist(userId: string) {
    let wishlist = await prisma.wishlist.findUnique({
      where: { userId },
    });

    if (!wishlist) {
      wishlist = await prisma.wishlist.create({
        data: { userId },
      });
    }

    return wishlist;
  }

  // Get user's wishlist with items
  async getWishlist(userId: string) {
    const wishlist = await this.getOrCreateWishlist(userId);

    const items = await prisma.wishlistItem.findMany({
      where: { wishlistId: wishlist.id },
      orderBy: { createdAt: 'desc' },
    });

    // Fetch product and program details
    const itemsWithDetails = await Promise.all(
      items.map(async (item) => {
        let product = null;
        let program = null;

        if (item.productId) {
          product = await prisma.product.findUnique({
            where: { id: item.productId },
            select: {
              id: true,
              name: true,
              slug: true,
              price: true,
              compareAtPrice: true,
              thumbnail: true,
              status: true,
            },
          });
        }

        if (item.programId) {
          program = await prisma.program.findUnique({
            where: { id: item.programId },
            select: {
              id: true,
              name: true,
              slug: true,
              type: true,
              thumbnail: true,
              price: true,
              duration: true,
              description: true,
            },
          });
        }

        return {
          ...item,
          product,
          program,
        };
      })
    );

    return {
      id: wishlist.id,
      items: itemsWithDetails.filter((item) => item.product || item.program),
    };
  }

  // Add item to wishlist
  async addToWishlist(userId: string, type: 'product' | 'program', itemId: string) {
    const wishlist = await this.getOrCreateWishlist(userId);

    // Check if item exists
    if (type === 'product') {
      const product = await prisma.product.findUnique({ where: { id: itemId } });
      if (!product) {
        throw new NotFoundError('Product not found');
      }

      // Check if already in wishlist
      const existing = await prisma.wishlistItem.findUnique({
        where: {
          wishlistId_productId: {
            wishlistId: wishlist.id,
            productId: itemId,
          },
        },
      });

      if (existing) {
        throw new BadRequestError('Product is already in your wishlist');
      }

      return prisma.wishlistItem.create({
        data: {
          wishlistId: wishlist.id,
          type: 'product',
          productId: itemId,
        },
      });
    } else if (type === 'program') {
      const program = await prisma.program.findUnique({ where: { id: itemId } });
      if (!program) {
        throw new NotFoundError('Program not found');
      }

      // Check if already in wishlist
      const existing = await prisma.wishlistItem.findUnique({
        where: {
          wishlistId_programId: {
            wishlistId: wishlist.id,
            programId: itemId,
          },
        },
      });

      if (existing) {
        throw new BadRequestError('Program is already in your wishlist');
      }

      return prisma.wishlistItem.create({
        data: {
          wishlistId: wishlist.id,
          type: 'program',
          programId: itemId,
        },
      });
    }

    throw new BadRequestError('Invalid item type');
  }

  // Remove product from wishlist
  async removeProductFromWishlist(userId: string, productId: string) {
    const wishlist = await this.getOrCreateWishlist(userId);

    const item = await prisma.wishlistItem.findUnique({
      where: {
        wishlistId_productId: {
          wishlistId: wishlist.id,
          productId,
        },
      },
    });

    if (!item) {
      throw new NotFoundError('Item not found in wishlist');
    }

    await prisma.wishlistItem.delete({
      where: { id: item.id },
    });

    return { message: 'Item removed from wishlist' };
  }

  // Remove program from wishlist
  async removeProgramFromWishlist(userId: string, programId: string) {
    const wishlist = await this.getOrCreateWishlist(userId);

    const item = await prisma.wishlistItem.findUnique({
      where: {
        wishlistId_programId: {
          wishlistId: wishlist.id,
          programId,
        },
      },
    });

    if (!item) {
      throw new NotFoundError('Item not found in wishlist');
    }

    await prisma.wishlistItem.delete({
      where: { id: item.id },
    });

    return { message: 'Item removed from wishlist' };
  }

  // Clear wishlist
  async clearWishlist(userId: string) {
    const wishlist = await this.getOrCreateWishlist(userId);

    await prisma.wishlistItem.deleteMany({
      where: { wishlistId: wishlist.id },
    });

    return { message: 'Wishlist cleared' };
  }

  // Check if item is in wishlist
  async isInWishlist(userId: string, type: 'product' | 'program', itemId: string): Promise<boolean> {
    const wishlist = await prisma.wishlist.findUnique({
      where: { userId },
    });

    if (!wishlist) return false;

    if (type === 'product') {
      const item = await prisma.wishlistItem.findUnique({
        where: {
          wishlistId_productId: {
            wishlistId: wishlist.id,
            productId: itemId,
          },
        },
      });
      return !!item;
    } else {
      const item = await prisma.wishlistItem.findUnique({
        where: {
          wishlistId_programId: {
            wishlistId: wishlist.id,
            programId: itemId,
          },
        },
      });
      return !!item;
    }
  }
}

export default new WishlistService();
