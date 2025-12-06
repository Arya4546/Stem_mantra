import prisma from '../config/database';
import { Prisma } from '@prisma/client';

// ==========================================
// Analytics Service
// ==========================================

interface PageViewData {
  path: string;
  title?: string;
  referrer?: string;
  userAgent?: string;
  ipAddress?: string;
  sessionId?: string;
  userId?: string;
}

interface UserActivityData {
  userId?: string;
  sessionId?: string;
  action: string;
  resource?: string;
  resourceId?: string;
  metadata?: object;
  ipAddress?: string;
}

class AnalyticsService {
  // ==========================================
  // Page Views
  // ==========================================

  async trackPageView(data: PageViewData) {
    const pageView = await prisma.pageView.create({ data });
    return pageView;
  }

  async getPageViews(query: {
    startDate?: Date;
    endDate?: Date;
    path?: string;
    limit?: number;
  }) {
    const where: Prisma.PageViewWhereInput = {};

    if (query.path) {
      where.path = { contains: query.path };
    }

    if (query.startDate || query.endDate) {
      where.createdAt = {};
      if (query.startDate) where.createdAt.gte = query.startDate;
      if (query.endDate) where.createdAt.lte = query.endDate;
    }

    const pageViews = await prisma.pageView.findMany({
      where,
      take: query.limit || 100,
      orderBy: { createdAt: 'desc' },
    });

    return pageViews;
  }

  async getPageViewStats(startDate?: Date, endDate?: Date) {
    const where: Prisma.PageViewWhereInput = {};

    if (startDate || endDate) {
      where.createdAt = {};
      if (startDate) where.createdAt.gte = startDate;
      if (endDate) where.createdAt.lte = endDate;
    }

    const [total, byPath, uniqueSessions] = await Promise.all([
      prisma.pageView.count({ where }),
      prisma.pageView.groupBy({
        by: ['path'],
        where,
        _count: true,
        orderBy: { _count: { path: 'desc' } },
        take: 20,
      }),
      prisma.pageView.findMany({
        where,
        select: { sessionId: true },
        distinct: ['sessionId'],
      }),
    ]);

    return {
      totalViews: total,
      uniqueSessions: uniqueSessions.length,
      topPages: byPath.map((p) => ({
        path: p.path,
        views: p._count,
      })),
    };
  }

  async getPopularPages(limit: number = 10, days: number = 30) {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    const pages = await prisma.pageView.groupBy({
      by: ['path', 'title'],
      where: {
        createdAt: { gte: startDate },
      },
      _count: true,
      orderBy: { _count: { path: 'desc' } },
      take: limit,
    });

    return pages.map((p) => ({
      path: p.path,
      title: p.title,
      views: p._count,
    }));
  }

  // ==========================================
  // User Activity
  // ==========================================

  async trackActivity(data: UserActivityData) {
    const activity = await prisma.userActivity.create({ data });
    return activity;
  }

  async getActivityStats(startDate?: Date, endDate?: Date) {
    const where: Prisma.UserActivityWhereInput = {};

    if (startDate || endDate) {
      where.createdAt = {};
      if (startDate) where.createdAt.gte = startDate;
      if (endDate) where.createdAt.lte = endDate;
    }

    const byAction = await prisma.userActivity.groupBy({
      by: ['action'],
      where,
      _count: true,
      orderBy: { _count: { action: 'desc' } },
    });

    return {
      byAction: byAction.reduce(
        (acc, a) => ({ ...acc, [a.action]: a._count }),
        {} as Record<string, number>
      ),
    };
  }

  async getRecentActivities(limit: number = 50) {
    return prisma.userActivity.findMany({
      take: limit,
      orderBy: { createdAt: 'desc' },
    });
  }

  // ==========================================
  // Dashboard Stats
  // ==========================================

  async getDashboardStats() {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const thisMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);

    const [
      totalUsers,
      newUsersToday,
      newUsersThisMonth,
      totalLeads,
      newLeadsThisMonth,
      totalOrders,
      ordersThisMonth,
      revenueThisMonth,
      revenueLastMonth,
      pageViewsToday,
      pageViewsThisMonth,
      newsletterSubscribers,
      upcomingEvents,
      pendingDemos,
    ] = await Promise.all([
      prisma.user.count(),
      prisma.user.count({ where: { createdAt: { gte: today } } }),
      prisma.user.count({ where: { createdAt: { gte: thisMonth } } }),
      prisma.lead.count(),
      prisma.lead.count({ where: { createdAt: { gte: thisMonth } } }),
      prisma.order.count(),
      prisma.order.count({ where: { createdAt: { gte: thisMonth } } }),
      prisma.order.aggregate({
        where: { createdAt: { gte: thisMonth }, paymentStatus: 'PAID' },
        _sum: { total: true },
      }),
      prisma.order.aggregate({
        where: {
          createdAt: { gte: lastMonth, lt: thisMonth },
          paymentStatus: 'PAID',
        },
        _sum: { total: true },
      }),
      prisma.pageView.count({ where: { createdAt: { gte: today } } }),
      prisma.pageView.count({ where: { createdAt: { gte: thisMonth } } }),
      prisma.newsletterSubscriber.count({ where: { isSubscribed: true } }),
      prisma.event.count({
        where: { startDate: { gte: now }, status: 'UPCOMING' },
      }),
      prisma.demoBooking.count({ where: { status: 'SCHEDULED' } }),
    ]);

    const revenueGrowth =
      Number(revenueLastMonth._sum.total) > 0
        ? ((Number(revenueThisMonth._sum.total) - Number(revenueLastMonth._sum.total)) /
            Number(revenueLastMonth._sum.total)) *
          100
        : 0;

    return {
      users: {
        total: totalUsers,
        today: newUsersToday,
        thisMonth: newUsersThisMonth,
      },
      leads: {
        total: totalLeads,
        thisMonth: newLeadsThisMonth,
      },
      orders: {
        total: totalOrders,
        thisMonth: ordersThisMonth,
        revenue: Number(revenueThisMonth._sum.total) || 0,
        revenueGrowth: Math.round(revenueGrowth * 100) / 100,
      },
      pageViews: {
        today: pageViewsToday,
        thisMonth: pageViewsThisMonth,
      },
      other: {
        newsletterSubscribers,
        upcomingEvents,
        pendingDemos,
      },
    };
  }

  async getRevenueChart(days: number = 30) {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    const orders = await prisma.order.findMany({
      where: {
        createdAt: { gte: startDate },
        paymentStatus: 'PAID',
      },
      select: {
        createdAt: true,
        total: true,
      },
      orderBy: { createdAt: 'asc' },
    });

    // Group by date
    const dailyRevenue: Record<string, number> = {};
    orders.forEach((order) => {
      const date = order.createdAt.toISOString().split('T')[0];
      dailyRevenue[date] = (dailyRevenue[date] || 0) + Number(order.total);
    });

    return Object.entries(dailyRevenue).map(([date, revenue]) => ({
      date,
      revenue,
    }));
  }

  async getLeadsChart(days: number = 30) {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    const leads = await prisma.lead.findMany({
      where: { createdAt: { gte: startDate } },
      select: { createdAt: true, source: true },
      orderBy: { createdAt: 'asc' },
    });

    // Group by date
    const dailyLeads: Record<string, number> = {};
    leads.forEach((lead) => {
      const date = lead.createdAt.toISOString().split('T')[0];
      dailyLeads[date] = (dailyLeads[date] || 0) + 1;
    });

    return Object.entries(dailyLeads).map(([date, count]) => ({
      date,
      count,
    }));
  }
}

// ==========================================
// Site Settings Service
// ==========================================

class SiteSettingsService {
  async get(key: string) {
    const setting = await prisma.siteSetting.findUnique({ where: { key } });
    
    if (!setting) return null;

    // Parse value based on type
    switch (setting.type) {
      case 'json':
        return JSON.parse(setting.value);
      case 'boolean':
        return setting.value === 'true';
      case 'number':
        return Number(setting.value);
      default:
        return setting.value;
    }
  }

  async set(key: string, value: any, type: string = 'string', group: string = 'general', description?: string) {
    const stringValue = type === 'json' ? JSON.stringify(value) : String(value);

    const setting = await prisma.siteSetting.upsert({
      where: { key },
      update: { value: stringValue, type, group, description },
      create: { key, value: stringValue, type, group, description },
    });

    return setting;
  }

  async getByGroup(group: string) {
    const settings = await prisma.siteSetting.findMany({
      where: { group },
    });

    return settings.reduce(
      (acc, s) => {
        let value: any = s.value;
        switch (s.type) {
          case 'json':
            value = JSON.parse(s.value);
            break;
          case 'boolean':
            value = s.value === 'true';
            break;
          case 'number':
            value = Number(s.value);
            break;
        }
        acc[s.key] = value;
        return acc;
      },
      {} as Record<string, any>
    );
  }

  async getAll() {
    const settings = await prisma.siteSetting.findMany({
      orderBy: [{ group: 'asc' }, { key: 'asc' }],
    });

    return settings;
  }

  async delete(key: string) {
    await prisma.siteSetting.delete({ where: { key } });
    return { message: 'Setting deleted' };
  }
}

// ==========================================
// Redirect Service
// ==========================================

class RedirectService {
  async getRedirect(fromPath: string) {
    const redirect = await prisma.redirect.findUnique({
      where: { fromPath },
    });

    if (!redirect || !redirect.isActive) {
      return null;
    }

    return redirect;
  }

  async create(data: { fromPath: string; toPath: string; statusCode?: number }) {
    return prisma.redirect.create({ data });
  }

  async getAll() {
    return prisma.redirect.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async update(id: string, data: { fromPath?: string; toPath?: string; statusCode?: number; isActive?: boolean }) {
    return prisma.redirect.update({ where: { id }, data });
  }

  async delete(id: string) {
    await prisma.redirect.delete({ where: { id } });
    return { message: 'Redirect deleted' };
  }
}

// ==========================================
// SEO Service
// ==========================================

class SEOService {
  async generateSitemap() {
    const baseUrl = process.env.FRONTEND_URL || 'https://stemmantra.com';

    // Static pages
    const staticPages = [
      { url: '/', priority: 1.0, changefreq: 'weekly' },
      { url: '/about', priority: 0.8, changefreq: 'monthly' },
      { url: '/contact', priority: 0.8, changefreq: 'monthly' },
      { url: '/gallery', priority: 0.7, changefreq: 'weekly' },
      { url: '/programs/atl-labs', priority: 0.9, changefreq: 'monthly' },
      { url: '/programs/robotics-lab', priority: 0.9, changefreq: 'monthly' },
      { url: '/programs/stem-lab', priority: 0.9, changefreq: 'monthly' },
      { url: '/blog', priority: 0.8, changefreq: 'daily' },
      { url: '/products', priority: 0.8, changefreq: 'weekly' },
      { url: '/events', priority: 0.7, changefreq: 'weekly' },
    ];

    // Dynamic pages
    const [blogPosts, products, programs, events] = await Promise.all([
      prisma.blogPost.findMany({
        where: { status: 'PUBLISHED' },
        select: { slug: true, updatedAt: true },
      }),
      prisma.product.findMany({
        where: { status: 'ACTIVE' },
        select: { slug: true, updatedAt: true },
      }),
      prisma.program.findMany({
        where: { status: 'ACTIVE' },
        select: { slug: true, updatedAt: true },
      }),
      prisma.event.findMany({
        where: { status: 'UPCOMING' },
        select: { slug: true, updatedAt: true },
      }),
    ]);

    const dynamicPages = [
      ...blogPosts.map((p) => ({
        url: `/blog/${p.slug}`,
        lastmod: p.updatedAt,
        priority: 0.7,
        changefreq: 'weekly',
      })),
      ...products.map((p) => ({
        url: `/products/${p.slug}`,
        lastmod: p.updatedAt,
        priority: 0.8,
        changefreq: 'weekly',
      })),
      ...programs.map((p) => ({
        url: `/programs/${p.slug}`,
        lastmod: p.updatedAt,
        priority: 0.9,
        changefreq: 'monthly',
      })),
      ...events.map((e) => ({
        url: `/events/${e.slug}`,
        lastmod: e.updatedAt,
        priority: 0.6,
        changefreq: 'weekly',
      })),
    ];

    return {
      baseUrl,
      pages: [...staticPages, ...dynamicPages],
    };
  }

  async getSchemaMarkup(type: string, data: any) {
    switch (type) {
      case 'organization':
        return {
          '@context': 'https://schema.org',
          '@type': 'EducationalOrganization',
          name: 'STEM Mantra',
          url: process.env.FRONTEND_URL,
          logo: `${process.env.FRONTEND_URL}/logo.png`,
          description: 'Premier robotics and STEM education organization',
          address: {
            '@type': 'PostalAddress',
            streetAddress: 'C-104 2nd Floor, Noida Sec-10',
            addressLocality: 'Noida',
            addressRegion: 'UP',
            postalCode: '201301',
            addressCountry: 'IN',
          },
          contactPoint: {
            '@type': 'ContactPoint',
            telephone: '+91-6356631515',
            contactType: 'customer service',
          },
          sameAs: [
            'https://facebook.com/stemmantra',
            'https://twitter.com/stemmantra',
            'https://linkedin.com/company/stemmantra',
            'https://instagram.com/stemmantra',
          ],
        };

      case 'product':
        return {
          '@context': 'https://schema.org',
          '@type': 'Product',
          name: data.name,
          description: data.description,
          image: data.thumbnail,
          sku: data.sku,
          offers: {
            '@type': 'Offer',
            price: data.price,
            priceCurrency: 'INR',
            availability: data.quantity > 0 ? 'InStock' : 'OutOfStock',
          },
          aggregateRating: data.avgRating
            ? {
                '@type': 'AggregateRating',
                ratingValue: data.avgRating,
                reviewCount: data.reviewCount,
              }
            : undefined,
        };

      case 'course':
        return {
          '@context': 'https://schema.org',
          '@type': 'Course',
          name: data.name,
          description: data.description,
          provider: {
            '@type': 'EducationalOrganization',
            name: 'STEM Mantra',
          },
        };

      case 'event':
        return {
          '@context': 'https://schema.org',
          '@type': 'EducationEvent',
          name: data.title,
          description: data.description,
          startDate: data.startDate,
          endDate: data.endDate,
          location: data.isOnline
            ? {
                '@type': 'VirtualLocation',
                url: data.meetingUrl,
              }
            : {
                '@type': 'Place',
                name: data.venue,
              },
          organizer: {
            '@type': 'Organization',
            name: 'STEM Mantra',
          },
          offers: data.isFree
            ? undefined
            : {
                '@type': 'Offer',
                price: data.price,
                priceCurrency: 'INR',
              },
        };

      case 'article':
        return {
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: data.title,
          description: data.excerpt,
          image: data.featuredImage,
          datePublished: data.publishedAt,
          dateModified: data.updatedAt,
          author: data.authors?.map((a: any) => ({
            '@type': 'Person',
            name: a.name,
          })),
          publisher: {
            '@type': 'Organization',
            name: 'STEM Mantra',
            logo: {
              '@type': 'ImageObject',
              url: `${process.env.FRONTEND_URL}/logo.png`,
            },
          },
        };

      case 'faq':
        return {
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: data.map((faq: any) => ({
            '@type': 'Question',
            name: faq.question,
            acceptedAnswer: {
              '@type': 'Answer',
              text: faq.answer,
            },
          })),
        };

      default:
        return null;
    }
  }
}

export const analyticsService = new AnalyticsService();
export const siteSettingsService = new SiteSettingsService();
export const redirectService = new RedirectService();
export const seoService = new SEOService();
