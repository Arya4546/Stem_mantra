import { Router } from 'express';
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
router.get('/newsletter/subscribers', authenticate, authorize('ADMIN'), getNewsletterSubscribers);
router.post('/newsletter/send', authenticate, authorize('ADMIN'), sendNewsletter);

// ============ TESTIMONIALS ============

// Public routes
router.get('/testimonials', getAllTestimonials);
router.get('/testimonials/featured', getFeaturedTestimonials);
router.get('/testimonials/:id', getTestimonialById);

// Anyone can submit a testimonial (will need approval)
router.post('/testimonials', createTestimonial);

// Admin routes
router.put('/testimonials/:id', authenticate, authorize('ADMIN'), updateTestimonial);
router.patch('/testimonials/:id/approve', authenticate, authorize('ADMIN'), approveTestimonial);
router.delete('/testimonials/:id', authenticate, authorize('ADMIN'), deleteTestimonial);

// ============ GALLERY ============

// Public routes
router.get('/gallery', getAllGalleryItems);
router.get('/gallery/featured', getFeaturedGalleryItems);
router.get('/gallery/categories', getGalleryCategories);
router.get('/gallery/:id', getGalleryItemById);

// Admin routes
router.post('/gallery', authenticate, authorize('ADMIN'), createGalleryItem);
router.put('/gallery/:id', authenticate, authorize('ADMIN'), updateGalleryItem);
router.delete('/gallery/:id', authenticate, authorize('ADMIN'), deleteGalleryItem);

// ============ FAQ ============

// Public routes
router.get('/faq', getAllFAQs);
router.get('/faq/categories', getFAQCategories);
router.get('/faq/:id', getFAQById);

// Admin routes
router.post('/faq', authenticate, authorize('ADMIN'), createFAQ);
router.put('/faq/:id', authenticate, authorize('ADMIN'), updateFAQ);
router.delete('/faq/:id', authenticate, authorize('ADMIN'), deleteFAQ);
router.post('/faq/reorder', authenticate, authorize('ADMIN'), reorderFAQs);

export default router;
