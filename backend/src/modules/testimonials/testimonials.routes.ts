import { Router } from 'express';
import * as service from './testimonials.service';
import { testimonialCreateSchema, testimonialUpdateSchema } from './testimonials.validators';
import { validate } from '../../shared/middleware/validate';
import { asyncHandler } from '../../shared/utils/async-handler';
import { sendSuccess } from '../../shared/utils/response';
import { idParam, reorderSchema } from '../../shared/utils/schemas';
import { HttpStatus } from '../../shared/errors/app-error';

export const testimonialsPublicRouter = Router();
testimonialsPublicRouter.get('/', asyncHandler(async (_req, res) => sendSuccess(res, await service.getPublicTestimonials())));

export const testimonialsAdminRouter = Router();
testimonialsAdminRouter.get('/', asyncHandler(async (_req, res) => sendSuccess(res, await service.listTestimonials())));
testimonialsAdminRouter.post(
  '/',
  validate(testimonialCreateSchema),
  asyncHandler(async (req, res) =>
    sendSuccess(res, await service.createTestimonial(req, req.body), 'Testimonial added', HttpStatus.CREATED),
  ),
);
testimonialsAdminRouter.patch(
  '/reorder',
  validate(reorderSchema),
  asyncHandler(async (req, res) => {
    await service.reorderTestimonials(req, req.body.ids);
    sendSuccess(res, null, 'Order saved');
  }),
);
testimonialsAdminRouter.patch(
  '/:id',
  validate(idParam, 'params'),
  validate(testimonialUpdateSchema),
  asyncHandler(async (req, res) =>
    sendSuccess(res, await service.updateTestimonial(req, res.locals.params.id, req.body), 'Testimonial updated'),
  ),
);
testimonialsAdminRouter.delete(
  '/:id',
  validate(idParam, 'params'),
  asyncHandler(async (req, res) => {
    await service.deleteTestimonial(req, res.locals.params.id);
    sendSuccess(res, null, 'Testimonial deleted');
  }),
);
