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

const router = Router();

// Health check endpoint
router.get('/health', (_req, res) => {
  res.json({
    success: true,
    message: 'STEM Mantra API is running',
    timestamp: new Date().toISOString(),
    version: process.env.API_VERSION || 'v1',
    endpoints: {
      auth: '/api/v1/auth',
      contact: '/api/v1/contact',
      programs: '/api/v1/programs',
      blog: '/api/v1/blog',
      products: '/api/v1/products',
      orders: '/api/v1/orders',
      leads: '/api/v1/leads',
      content: '/api/v1/content',
      analytics: '/api/v1/analytics',
      upload: '/api/v1/upload',
    },
  });
});

// Mount routes
router.use('/auth', authRoutes);
router.use('/contact', contactRoutes);
router.use('/programs', programRoutes);
router.use('/blog', blogRoutes);
router.use('/products', productRoutes);
router.use('/orders', orderRoutes);
router.use('/leads', leadRoutes);
router.use('/content', contentRoutes);
router.use('/analytics', analyticsRoutes);
router.use('/upload', uploadRoutes);

export default router;
