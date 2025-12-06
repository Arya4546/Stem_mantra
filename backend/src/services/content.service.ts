import prisma from '../config/database';
import { BadRequestError } from '../utils/errors';

// ==========================================
// Newsletter Service
// ==========================================

class NewsletterService {
  async subscribe(email: string, name?: string) {
    // Check if already subscribed
    const existing = await prisma.newsletterSubscriber.findUnique({
      where: { email },
    });

    if (existing) {
      if (existing.isSubscribed) {
        throw new BadRequestError('Email already subscribed');
      }

      // Re-subscribe
      return prisma.newsletterSubscriber.update({
        where: { id: existing.id },
        data: {
          isSubscribed: true,
          name,
          unsubscribedAt: null,
          subscribedAt: new Date(),
        },
      });
    }

    const subscriber = await prisma.newsletterSubscriber.create({
      data: { email, name },
    });

    // Also create a lead
    await prisma.lead.upsert({
      where: { email },
      update: { score: { increment: 5 } },
      create: {
        name: name || email.split('@')[0],
        email,
        source: 'WEBSITE',
        score: 5,
      },
    });

    return subscriber;
  }

  async unsubscribe(email: string) {
    const subscriber = await prisma.newsletterSubscriber.findUnique({
      where: { email },
    });

    if (!subscriber) {
      throw new BadRequestError('Email not found');
    }

    return prisma.newsletterSubscriber.update({
      where: { id: subscriber.id },
      data: {
        isSubscribed: false,
        unsubscribedAt: new Date(),
      },
    });
  }

  async getAllSubscribers(query: { page?: number; limit?: number; isSubscribed?: boolean }) {
    const page = query.page || 1;
    const limit = query.limit || 50;
    const skip = (page - 1) * limit;

    const where = query.isSubscribed !== undefined ? { isSubscribed: query.isSubscribed } : {};

    const [subscribers, total] = await Promise.all([
      prisma.newsletterSubscriber.findMany({
        where,
        skip,
        take: limit,
        orderBy: { subscribedAt: 'desc' },
      }),
      prisma.newsletterSubscriber.count({ where }),
    ]);

    return {
      subscribers,
      meta: { page, limit, total, totalPages: Math.ceil(total / limit) },
    };
  }

  async getStats() {
    const [total, subscribed, unsubscribed] = await Promise.all([
      prisma.newsletterSubscriber.count(),
      prisma.newsletterSubscriber.count({ where: { isSubscribed: true } }),
      prisma.newsletterSubscriber.count({ where: { isSubscribed: false } }),
    ]);

    return { total, subscribed, unsubscribed };
  }

  async exportSubscribers() {
    const subscribers = await prisma.newsletterSubscriber.findMany({
      where: { isSubscribed: true },
      select: { email: true, name: true, subscribedAt: true },
      orderBy: { subscribedAt: 'desc' },
    });

    return subscribers;
  }
}

// ==========================================
// Testimonial Service
// ==========================================

interface CreateTestimonialDto {
  name: string;
  designation: string;
  schoolName: string;
  content: string;
  rating?: number;
  avatar?: string;
}

class TestimonialService {
  async create(data: CreateTestimonialDto) {
    const testimonial = await prisma.testimonial.create({ data });
    return testimonial;
  }

  async getAll(query: { page?: number; limit?: number; isApproved?: boolean; isFeatured?: boolean }) {
    const page = query.page || 1;
    const limit = query.limit || 10;
    const skip = (page - 1) * limit;

    const where: { isApproved?: boolean; isFeatured?: boolean } = {};
    if (query.isApproved !== undefined) where.isApproved = query.isApproved;
    if (query.isFeatured !== undefined) where.isFeatured = query.isFeatured;

    const [testimonials, total] = await Promise.all([
      prisma.testimonial.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      prisma.testimonial.count({ where }),
    ]);

    return {
      testimonials,
      meta: { page, limit, total, totalPages: Math.ceil(total / limit) },
    };
  }

  async getApproved(limit: number = 10) {
    return prisma.testimonial.findMany({
      where: { isApproved: true },
      take: limit,
      orderBy: [{ isFeatured: 'desc' }, { createdAt: 'desc' }],
    });
  }

  async getFeatured(limit: number = 6) {
    return prisma.testimonial.findMany({
      where: { isApproved: true, isFeatured: true },
      take: limit,
      orderBy: { createdAt: 'desc' },
    });
  }

  async approve(id: string) {
    return prisma.testimonial.update({
      where: { id },
      data: { isApproved: true },
    });
  }

  async setFeatured(id: string, isFeatured: boolean) {
    return prisma.testimonial.update({
      where: { id },
      data: { isFeatured },
    });
  }

  async delete(id: string) {
    await prisma.testimonial.delete({ where: { id } });
    return { message: 'Testimonial deleted' };
  }
}

// ==========================================
// FAQ Service
// ==========================================

class FAQService {
  async create(data: { question: string; answer: string; category?: string; sortOrder?: number }) {
    return prisma.fAQ.create({ data });
  }

  async getAll(category?: string) {
    const where = category ? { category, isPublished: true } : { isPublished: true };

    return prisma.fAQ.findMany({
      where,
      orderBy: [{ category: 'asc' }, { sortOrder: 'asc' }],
    });
  }

  async getByCategory(category: string) {
    return prisma.fAQ.findMany({
      where: { category, isPublished: true },
      orderBy: { sortOrder: 'asc' },
    });
  }

  async getCategories() {
    const faqs = await prisma.fAQ.findMany({
      where: { isPublished: true },
      select: { category: true },
      distinct: ['category'],
    });

    return faqs.map((f) => f.category).filter(Boolean);
  }

  async update(id: string, data: { question?: string; answer?: string; category?: string; sortOrder?: number; isPublished?: boolean }) {
    return prisma.fAQ.update({ where: { id }, data });
  }

  async delete(id: string) {
    await prisma.fAQ.delete({ where: { id } });
    return { message: 'FAQ deleted' };
  }
}

// ==========================================
// Gallery Service
// ==========================================

class GalleryService {
  async create(data: { title: string; description?: string; url: string; thumbnail?: string; type: string; category: string; tags?: string[] }) {
    return prisma.galleryItem.create({ data: data as any });
  }

  async getAll(query: { page?: number; limit?: number; category?: string; type?: string }) {
    const page = query.page || 1;
    const limit = query.limit || 20;
    const skip = (page - 1) * limit;

    const where: any = { isPublished: true };
    if (query.category) where.category = query.category;
    if (query.type) where.type = query.type;

    const [items, total] = await Promise.all([
      prisma.galleryItem.findMany({
        where,
        skip,
        take: limit,
        orderBy: [{ sortOrder: 'asc' }, { createdAt: 'desc' }],
      }),
      prisma.galleryItem.count({ where }),
    ]);

    return {
      items,
      meta: { page, limit, total, totalPages: Math.ceil(total / limit) },
    };
  }

  async getCategories() {
    const items = await prisma.galleryItem.findMany({
      where: { isPublished: true },
      select: { category: true },
      distinct: ['category'],
    });

    return items.map((i) => i.category);
  }

  async update(id: string, data: Partial<{ title: string; description: string; url: string; thumbnail: string; category: string; tags: string[]; isPublished: boolean; sortOrder: number }>) {
    return prisma.galleryItem.update({ where: { id }, data });
  }

  async delete(id: string) {
    await prisma.galleryItem.delete({ where: { id } });
    return { message: 'Gallery item deleted' };
  }
}

export const newsletterService = new NewsletterService();
export const testimonialService = new TestimonialService();
export const faqService = new FAQService();
export const galleryService = new GalleryService();
