import { Router } from 'express';
import { UserRole } from '@prisma/client';
import {
  subscribeToNewsletter,
  unsubscribeFromNewsletter,
  getNewsletterSubscribers,
  sendNewsletter,
  getAllTestimonials,
  getFeaturedTestimonials,
  getTestimonialById,
  createTestimonial,
  updateTestimonial,
  approveTestimonial,
  deleteTestimonial,
  getAllGalleryItems,
  getFeaturedGalleryItems,
  getGalleryCategories,
  getGalleryItemById,
  createGalleryItem,
  updateGalleryItem,
  deleteGalleryItem,
  getAllFAQs,
  getFAQCategories,
  getFAQById,
  createFAQ,
  updateFAQ,
  deleteFAQ,
  reorderFAQs
} from '../controllers/content.controller';
import { authenticate, authorize } from '../middlewares/auth';

const router = Router();

// ============ NEWSLETTER ============

// Public routes
router.post('/newsletter/subscribe', subscribeToNewsletter);
router.post('/newsletter/unsubscribe', unsubscribeFromNewsletter);

// Admin routes
router.get('/newsletter/subscribers', authenticate, authorize(UserRole.ADMIN, UserRole.SUPER_ADMIN, UserRole.MANAGER), getNewsletterSubscribers);
router.post('/newsletter/send', authenticate, authorize(UserRole.ADMIN, UserRole.SUPER_ADMIN, UserRole.MANAGER), sendNewsletter);

// ============ TESTIMONIALS ============

// Public routes
router.get('/testimonials', getAllTestimonials);
router.get('/testimonials/featured', getFeaturedTestimonials);
router.get('/testimonials/:id', getTestimonialById);

// Anyone can submit a testimonial (will need approval)
router.post('/testimonials', createTestimonial);

// Admin routes
router.put('/testimonials/:id', authenticate, authorize(UserRole.ADMIN, UserRole.SUPER_ADMIN, UserRole.MANAGER), updateTestimonial);
router.patch('/testimonials/:id/approve', authenticate, authorize(UserRole.ADMIN, UserRole.SUPER_ADMIN, UserRole.MANAGER), approveTestimonial);
router.delete('/testimonials/:id', authenticate, authorize(UserRole.ADMIN, UserRole.SUPER_ADMIN, UserRole.MANAGER), deleteTestimonial);

// ============ GALLERY ============

// Public routes
router.get('/gallery', getAllGalleryItems);
router.get('/gallery/featured', getFeaturedGalleryItems);
router.get('/gallery/categories', getGalleryCategories);
router.get('/gallery/:id', getGalleryItemById);

// Admin routes
router.post('/gallery', authenticate, authorize(UserRole.ADMIN, UserRole.SUPER_ADMIN, UserRole.MANAGER), createGalleryItem);
router.put('/gallery/:id', authenticate, authorize(UserRole.ADMIN, UserRole.SUPER_ADMIN, UserRole.MANAGER), updateGalleryItem);
router.delete('/gallery/:id', authenticate, authorize(UserRole.ADMIN, UserRole.SUPER_ADMIN, UserRole.MANAGER), deleteGalleryItem);

// ============ FAQ ============

// Public routes
router.get('/faq', getAllFAQs);
router.get('/faq/categories', getFAQCategories);
router.get('/faq/:id', getFAQById);

// Admin routes
router.post('/faq', authenticate, authorize(UserRole.ADMIN, UserRole.SUPER_ADMIN, UserRole.MANAGER), createFAQ);
router.put('/faq/:id', authenticate, authorize(UserRole.ADMIN, UserRole.SUPER_ADMIN, UserRole.MANAGER), updateFAQ);
router.delete('/faq/:id', authenticate, authorize(UserRole.ADMIN, UserRole.SUPER_ADMIN, UserRole.MANAGER), deleteFAQ);
router.post('/faq/reorder', authenticate, authorize(UserRole.ADMIN, UserRole.SUPER_ADMIN, UserRole.MANAGER), reorderFAQs);

export default router;
