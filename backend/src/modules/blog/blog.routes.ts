import { Router } from 'express';
import * as service from './blog.service';
import {
  adminPostListQuery,
  postCreateSchema,
  postUpdateSchema,
  publicPostListQuery,
  slugParam,
  type AdminPostListQuery,
  type PublicPostListQuery,
} from './blog.validators';
import { validate } from '../../shared/middleware/validate';
import { asyncHandler } from '../../shared/utils/async-handler';
import { sendPaginated, sendSuccess } from '../../shared/utils/response';
import { idParam } from '../../shared/utils/schemas';
import { AppError, HttpStatus } from '../../shared/errors/app-error';

export const blogPublicRouter = Router();

blogPublicRouter.get(
  '/',
  validate(publicPostListQuery, 'query'),
  asyncHandler(async (_req, res) => {
    const { items, pagination } = await service.listPublishedPosts(res.locals.query as PublicPostListQuery);
    sendPaginated(res, items, pagination);
  }),
);
blogPublicRouter.get('/slugs', asyncHandler(async (_req, res) => sendSuccess(res, await service.listPublishedSlugs())));
blogPublicRouter.get(
  '/:slug',
  validate(slugParam, 'params'),
  asyncHandler(async (_req, res) => {
    const result = await service.getPublishedPost(res.locals.params.slug);
    if (!result) throw AppError.notFound('Post');
    sendSuccess(res, result);
  }),
);

export const blogAdminRouter = Router();

blogAdminRouter.get(
  '/',
  validate(adminPostListQuery, 'query'),
  asyncHandler(async (_req, res) => {
    const { items, pagination } = await service.listPosts(res.locals.query as AdminPostListQuery);
    sendPaginated(res, items, pagination);
  }),
);
blogAdminRouter.get(
  '/:id',
  validate(idParam, 'params'),
  asyncHandler(async (_req, res) => sendSuccess(res, await service.getPost(res.locals.params.id))),
);
blogAdminRouter.post(
  '/',
  validate(postCreateSchema),
  asyncHandler(async (req, res) => sendSuccess(res, await service.createPost(req, req.body), 'Post saved', HttpStatus.CREATED)),
);
blogAdminRouter.patch(
  '/:id',
  validate(idParam, 'params'),
  validate(postUpdateSchema),
  asyncHandler(async (req, res) => sendSuccess(res, await service.updatePost(req, res.locals.params.id, req.body), 'Post saved')),
);
blogAdminRouter.delete(
  '/:id',
  validate(idParam, 'params'),
  asyncHandler(async (req, res) => {
    await service.deletePost(req, res.locals.params.id);
    sendSuccess(res, null, 'Post deleted');
  }),
);
