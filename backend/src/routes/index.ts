import { Router } from 'express';
import authRoutes from './auth.routes';
import contactRoutes from './contact.routes';
import programRoutes from './program.routes';
import blogRoutes from './blog.routes';
import productRoutes from './product.routes';
import orderRoutes from './order.routes';
import leadRoutes from './lead.routes';
import contentRoutes from './content.routes';
import analyticsRoutes from './analytics.routes';
import uploadRoutes from './upload.routes';
import userRoutes from './user.routes';
import enrollmentRoutes from './enrollment.routes';
import wishlistRoutes from './wishlist.routes';
import paymentRoutes from './payment.routes';
import settingsRoutes from './settings.routes';
import achievementRoutes from './achievement.routes';

const router = Router();

// Health check endpoint
router.get('/health', (_req, res) => {
  res.json({
    success: true,
    message: 'STEMmantra API is running',
    timestamp: new Date().toISOString(),
    version: process.env.API_VERSION || 'v1',
    endpoints: {
      auth: '/api/v1/auth',
      users: '/api/v1/users',
      contact: '/api/v1/contact',
      programs: '/api/v1/programs',
      enrollments: '/api/v1/enrollments',
      blog: '/api/v1/blog',
      products: '/api/v1/products',
      orders: '/api/v1/orders',
      payments: '/api/v1/payments',
      leads: '/api/v1/leads',
      content: '/api/v1/content',
      analytics: '/api/v1/analytics',
      upload: '/api/v1/upload',
      wishlist: '/api/v1/wishlist',
      settings: '/api/v1/settings',
      achievements: '/api/v1/achievements',
    },
  });
});

// Mount routes
router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/contact', contactRoutes);
router.use('/programs', programRoutes);
router.use('/enrollments', enrollmentRoutes);
router.use('/blog', blogRoutes);
router.use('/products', productRoutes);
router.use('/orders', orderRoutes);
router.use('/payments', paymentRoutes);
router.use('/leads', leadRoutes);
router.use('/content', contentRoutes);
router.use('/analytics', analyticsRoutes);
router.use('/upload', uploadRoutes);
router.use('/wishlist', wishlistRoutes);
router.use('/settings', settingsRoutes);
router.use('/achievements', achievementRoutes);

export default router;
