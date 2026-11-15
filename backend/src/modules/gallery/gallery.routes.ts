import { Router } from 'express';
import { z } from 'zod';
import * as service from './gallery.service';
import {
  categoryCreateSchema,
  categoryDeleteQuery,
  categoryUpdateSchema,
  imageBulkActionSchema,
  imageBulkCreateSchema,
  imageCreateSchema,
  imageListQuery,
  imageReorderSchema,
  imageUpdateSchema,
  type ImageListQuery,
} from './gallery.validators';
import { validate } from '../../shared/middleware/validate';
import { asyncHandler } from '../../shared/utils/async-handler';
import { sendPaginated, sendSuccess } from '../../shared/utils/response';
import { idParam, reorderSchema } from '../../shared/utils/schemas';
import { HttpStatus } from '../../shared/errors/app-error';

// ── Public ───────────────────────────────────────────────────
export const galleryPublicRouter = Router();

galleryPublicRouter.get(
  '/',
  asyncHandler(async (_req, res) => sendSuccess(res, await service.getPublicGallery())),
);

galleryPublicRouter.get(
  '/featured',
  validate(z.object({ limit: z.coerce.number().int().min(1).max(24).default(7) }), 'query'),
  asyncHandler(async (_req, res) => sendSuccess(res, await service.getFeaturedImages(res.locals.query.limit))),
);

// ── Admin ────────────────────────────────────────────────────
export const galleryAdminRouter = Router();

galleryAdminRouter.get('/categories', asyncHandler(async (_req, res) => sendSuccess(res, await service.listCategories())));

galleryAdminRouter.post(
  '/categories',
  validate(categoryCreateSchema),
  asyncHandler(async (req, res) =>
    sendSuccess(res, await service.createCategory(req, req.body), 'Gallery type created', HttpStatus.CREATED),
  ),
);

galleryAdminRouter.patch(
  '/categories/reorder',
  validate(reorderSchema),
  asyncHandler(async (req, res) => {
    await service.reorderCategories(req, req.body.ids);
    sendSuccess(res, null, 'Order saved');
  }),
);

galleryAdminRouter.patch(
  '/categories/:id',
  validate(idParam, 'params'),
  validate(categoryUpdateSchema),
  asyncHandler(async (req, res) =>
    sendSuccess(res, await service.updateCategory(req, res.locals.params.id, req.body), 'Gallery type updated'),
  ),
);

galleryAdminRouter.delete(
  '/categories/:id',
  validate(idParam, 'params'),
  validate(categoryDeleteQuery, 'query'),
  asyncHandler(async (req, res) => {
    await service.deleteCategory(req, res.locals.params.id, res.locals.query.moveTo);
    sendSuccess(res, null, 'Gallery type deleted');
  }),
);

galleryAdminRouter.get(
  '/images',
  validate(imageListQuery, 'query'),
  asyncHandler(async (_req, res) => {
    const { items, pagination } = await service.listImages(res.locals.query as ImageListQuery);
    sendPaginated(res, items, pagination);
  }),
);

galleryAdminRouter.post(
  '/images',
  validate(imageCreateSchema),
  asyncHandler(async (req, res) => sendSuccess(res, await service.createImage(req, req.body), 'Photo added', HttpStatus.CREATED)),
);

galleryAdminRouter.post(
  '/images/bulk',
  validate(imageBulkCreateSchema),
  asyncHandler(async (req, res) => {
    const created = await service.bulkCreateImages(req, req.body);
    sendSuccess(res, created, `${created.length} photo(s) added`, HttpStatus.CREATED);
  }),
);

galleryAdminRouter.post(
  '/images/bulk-action',
  validate(imageBulkActionSchema),
  asyncHandler(async (req, res) => {
    const affected = await service.bulkAction(req, req.body);
    sendSuccess(res, { affected }, `${affected} photo(s) updated`);
  }),
);

galleryAdminRouter.patch(
  '/images/reorder',
  validate(imageReorderSchema),
  asyncHandler(async (req, res) => {
    await service.reorderImages(req, req.body.categoryId, req.body.ids);
    sendSuccess(res, null, 'Order saved');
  }),
);

galleryAdminRouter.patch(
  '/images/:id',
  validate(idParam, 'params'),
  validate(imageUpdateSchema),
  asyncHandler(async (req, res) => sendSuccess(res, await service.updateImage(req, res.locals.params.id, req.body), 'Photo updated')),
);

galleryAdminRouter.delete(
  '/images/:id',
  validate(idParam, 'params'),
  asyncHandler(async (req, res) => {
    await service.deleteImage(req, res.locals.params.id);
    sendSuccess(res, null, 'Photo deleted');
  }),
);
