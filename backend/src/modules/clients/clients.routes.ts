import { Router } from 'express';
import * as service from './clients.service';
import { clientCreateSchema, clientListQuery, clientUpdateSchema, type ClientListQuery } from './clients.validators';
import { validate } from '../../shared/middleware/validate';
import { asyncHandler } from '../../shared/utils/async-handler';
import { sendPaginated, sendSuccess } from '../../shared/utils/response';
import { idParam, reorderSchema } from '../../shared/utils/schemas';
import { HttpStatus } from '../../shared/errors/app-error';

export const clientsPublicRouter = Router();
clientsPublicRouter.get('/', asyncHandler(async (_req, res) => sendSuccess(res, await service.getPublicClients())));

export const clientsAdminRouter = Router();

clientsAdminRouter.get(
  '/',
  validate(clientListQuery, 'query'),
  asyncHandler(async (_req, res) => {
    const { items, pagination } = await service.listClients(res.locals.query as ClientListQuery);
    sendPaginated(res, items, pagination);
  }),
);
clientsAdminRouter.post(
  '/',
  validate(clientCreateSchema),
  asyncHandler(async (req, res) => sendSuccess(res, await service.createClient(req, req.body), 'Client added', HttpStatus.CREATED)),
);
clientsAdminRouter.patch(
  '/reorder',
  validate(reorderSchema),
  asyncHandler(async (req, res) => {
    await service.reorderClients(req, req.body.ids);
    sendSuccess(res, null, 'Order saved');
  }),
);
clientsAdminRouter.patch(
  '/:id',
  validate(idParam, 'params'),
  validate(clientUpdateSchema),
  asyncHandler(async (req, res) => sendSuccess(res, await service.updateClient(req, res.locals.params.id, req.body), 'Client updated')),
);
clientsAdminRouter.delete(
  '/:id',
  validate(idParam, 'params'),
  asyncHandler(async (req, res) => {
    await service.deleteClient(req, res.locals.params.id);
    sendSuccess(res, null, 'Client deleted');
  }),
);
