import { Request, Response, NextFunction } from 'express';
import { 
  newsletterService, 
  testimonialService, 
  galleryService, 
  faqService 
} from '../services/content.service';
import { asyncHandler, sendSuccess, sendPaginated, sendCreated } from '../utils/response';
import { NotFoundError, BadRequestError } from '../utils/errors';

// ============ NEWSLETTER ============

export const subscribeToNewsletter = asyncHandler(async (req: Request, res: Response, _next: NextFunction) => {
  const { email, name } = req.body;
  
  if (!email) {
    throw new BadRequestError('Email is required');
  }
  
  const subscription = await newsletterService.subscribe(email, name);
  sendCreated(res, subscription, 'Successfully subscribed to newsletter!');
});

export const unsubscribeFromNewsletter = asyncHandler(async (req: Request, res: Response, _next: NextFunction) => {
  const { email } = req.body;
  
  if (!email) {
    throw new BadRequestError('Email is required');
  }
  
  await newsletterService.unsubscribe(email);
  sendSuccess(res, null, 'Successfully unsubscribed from newsletter');
});

export const getNewsletterSubscribers = asyncHandler(async (req: Request, res: Response, _next: NextFunction) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 50;
  const isSubscribed = req.query.isSubscribed !== 'false';
  
  const result = await newsletterService.getAllSubscribers({ page, limit, isSubscribed });
  sendPaginated(res, result.subscribers, page, limit, result.meta.total, 'Subscribers fetched successfully');
});

export const sendNewsletter = asyncHandler(async (req: Request, res: Response, _next: NextFunction) => {
  const { subject, content } = req.body;
  
  if (!subject || !content) {
    throw new BadRequestError('Subject and content are required');
  }
  
  // This would integrate with an email service
  // For now, return a placeholder response
  sendSuccess(res, { message: 'Newsletter sending not yet implemented' }, 'Newsletter queued for sending');
});

// ============ TESTIMONIALS ============

export const getAllTestimonials = asyncHandler(async (req: Request, res: Response, _next: NextFunction) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;
  const isApproved = req.query.isApproved !== 'false';
  
  const result = await testimonialService.getAll({ page, limit, isApproved });
  sendPaginated(res, result.testimonials, page, limit, result.meta.total, 'Testimonials fetched successfully');
});

export const getFeaturedTestimonials = asyncHandler(async (req: Request, res: Response, _next: NextFunction) => {
  const limit = parseInt(req.query.limit as string) || 6;
  const testimonials = await testimonialService.getFeatured(limit);
  sendSuccess(res, testimonials, 'Featured testimonials fetched successfully');
});

export const getTestimonialById = asyncHandler(async (req: Request, res: Response, _next: NextFunction) => {
  const { id } = req.params;
  const testimonials = await testimonialService.getAll({ isApproved: true });
  const testimonial = testimonials.testimonials.find(t => t.id === id);
  
  if (!testimonial) {
    throw new NotFoundError('Testimonial not found');
  }
  
  sendSuccess(res, testimonial, 'Testimonial fetched successfully');
});

export const createTestimonial = asyncHandler(async (req: Request, res: Response, _next: NextFunction) => {
  const testimonial = await testimonialService.create(req.body);
  sendCreated(res, testimonial, 'Testimonial submitted successfully. It will be visible after approval.');
});

export const updateTestimonial = asyncHandler(async (req: Request, res: Response, _next: NextFunction) => {
  const { id } = req.params;
  // For update, we can set featured status
  const testimonial = await testimonialService.setFeatured(id, req.body.isFeatured || false);
  sendSuccess(res, testimonial, 'Testimonial updated successfully');
});

export const approveTestimonial = asyncHandler(async (req: Request, res: Response, _next: NextFunction) => {
  const { id } = req.params;
  const testimonial = await testimonialService.approve(id);
  sendSuccess(res, testimonial, 'Testimonial approved successfully');
});

export const deleteTestimonial = asyncHandler(async (req: Request, res: Response, _next: NextFunction) => {
  const { id } = req.params;
  await testimonialService.delete(id);
  sendSuccess(res, null, 'Testimonial deleted successfully');
});

// ============ GALLERY ============

export const getAllGalleryItems = asyncHandler(async (req: Request, res: Response, _next: NextFunction) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 20;
  const category = req.query.category as string;
  const type = req.query.type as string;
  
  const result = await galleryService.getAll({ page, limit, category, type });
  sendPaginated(res, result.items, page, limit, result.meta.total, 'Gallery items fetched successfully');
});

export const getFeaturedGalleryItems = asyncHandler(async (req: Request, res: Response, _next: NextFunction) => {
  const limit = parseInt(req.query.limit as string) || 8;
  const result = await galleryService.getAll({ limit });
  sendSuccess(res, result.items, 'Featured gallery items fetched successfully');
});

export const getGalleryCategories = asyncHandler(async (_req: Request, res: Response, _next: NextFunction) => {
  const categories = await galleryService.getCategories();
  sendSuccess(res, categories, 'Gallery categories fetched successfully');
});

export const getGalleryItemById = asyncHandler(async (req: Request, res: Response, _next: NextFunction) => {
  const { id } = req.params;
  const result = await galleryService.getAll({});
  const item = result.items.find(i => i.id === id);
  
  if (!item) {
    throw new NotFoundError('Gallery item not found');
  }
  
  sendSuccess(res, item, 'Gallery item fetched successfully');
});

export const createGalleryItem = asyncHandler(async (req: Request, res: Response, _next: NextFunction) => {
  const item = await galleryService.create(req.body);
  sendCreated(res, item, 'Gallery item created successfully');
});

export const updateGalleryItem = asyncHandler(async (req: Request, res: Response, _next: NextFunction) => {
  const { id } = req.params;
  const item = await galleryService.update(id, req.body);
  sendSuccess(res, item, 'Gallery item updated successfully');
});

export const deleteGalleryItem = asyncHandler(async (req: Request, res: Response, _next: NextFunction) => {
  const { id } = req.params;
  await galleryService.delete(id);
  sendSuccess(res, null, 'Gallery item deleted successfully');
});

// ============ FAQ ============

export const getAllFAQs = asyncHandler(async (req: Request, res: Response, _next: NextFunction) => {
  const category = req.query.category as string;
  
  const faqs = await faqService.getAll(category);
  sendSuccess(res, faqs, 'FAQs fetched successfully');
});

export const getFAQCategories = asyncHandler(async (_req: Request, res: Response, _next: NextFunction) => {
  const categories = await faqService.getCategories();
  sendSuccess(res, categories, 'FAQ categories fetched successfully');
});

export const getFAQById = asyncHandler(async (req: Request, res: Response, _next: NextFunction) => {
  const { id } = req.params;
  const faqs = await faqService.getAll();
  const faq = faqs.find((f: any) => f.id === id);
  
  if (!faq) {
    throw new NotFoundError('FAQ not found');
  }
  
  sendSuccess(res, faq, 'FAQ fetched successfully');
});

export const createFAQ = asyncHandler(async (req: Request, res: Response, _next: NextFunction) => {
  const faq = await faqService.create(req.body);
  sendCreated(res, faq, 'FAQ created successfully');
});

export const updateFAQ = asyncHandler(async (req: Request, res: Response, _next: NextFunction) => {
  const { id } = req.params;
  const faq = await faqService.update(id, req.body);
  sendSuccess(res, faq, 'FAQ updated successfully');
});

export const deleteFAQ = asyncHandler(async (req: Request, res: Response, _next: NextFunction) => {
  const { id } = req.params;
  await faqService.delete(id);
  sendSuccess(res, null, 'FAQ deleted successfully');
});

export const reorderFAQs = asyncHandler(async (req: Request, res: Response, _next: NextFunction) => {
  const { orderedIds } = req.body;
  
  if (!Array.isArray(orderedIds)) {
    throw new BadRequestError('orderedIds must be an array');
  }
  
  // Update sort order for each FAQ
  for (let i = 0; i < orderedIds.length; i++) {
    await faqService.update(orderedIds[i], { sortOrder: i });
  }
  
  sendSuccess(res, null, 'FAQs reordered successfully');
});
