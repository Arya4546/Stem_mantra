import { Router } from 'express';
import * as service from './enquiries.service';
import {
  enquiryBulkSchema,
  enquiryListQuery,
  enquirySubmitSchema,
  enquiryUpdateSchema,
  type EnquiryListQuery,
} from './enquiries.validators';
import { validate } from '../../shared/middleware/validate';
import { asyncHandler } from '../../shared/utils/async-handler';
import { sendPaginated, sendSuccess } from '../../shared/utils/response';
import { idParam } from '../../shared/utils/schemas';
import { HttpStatus } from '../../shared/errors/app-error';
import { enquiryLimiter } from '../../config/rate-limit';

export const enquiriesPublicRouter = Router();
enquiriesPublicRouter.post(
  '/',
  enquiryLimiter,
  validate(enquirySubmitSchema),
  asyncHandler(async (req, res) => {
    await service.submitEnquiry(req, req.body);
    sendSuccess(res, null, "Thank you! We'll get back to you within 24 hours.", HttpStatus.CREATED);
  }),
);

export const enquiriesAdminRouter = Router();
enquiriesAdminRouter.get(
  '/',
  validate(enquiryListQuery, 'query'),
  asyncHandler(async (_req, res) => {
    const { items, pagination } = await service.listEnquiries(res.locals.query as EnquiryListQuery);
    sendPaginated(res, items, pagination);
  }),
);
enquiriesAdminRouter.post(
  '/bulk-action',
  validate(enquiryBulkSchema),
  asyncHandler(async (req, res) => {
    const count = await service.bulkAction(req, req.body.ids, req.body.action);
    sendSuccess(res, { affected: count }, `${count} enquiries updated`);
  }),
);
enquiriesAdminRouter.get(
  '/:id',
  validate(idParam, 'params'),
  asyncHandler(async (_req, res) => sendSuccess(res, await service.getEnquiry(res.locals.params.id))),
);
enquiriesAdminRouter.patch(
  '/:id',
  validate(idParam, 'params'),
  validate(enquiryUpdateSchema),
  asyncHandler(async (req, res) => sendSuccess(res, await service.setStatus(req, res.locals.params.id, req.body.status), 'Updated')),
);
enquiriesAdminRouter.post(
  '/:id/resend',
  validate(idParam, 'params'),
  asyncHandler(async (_req, res) => {
    await service.resendEmail(res.locals.params.id);
    sendSuccess(res, null, 'Email sent');
  }),
);
enquiriesAdminRouter.delete(
  '/:id',
  validate(idParam, 'params'),
  asyncHandler(async (req, res) => {
    await service.deleteEnquiry(req, res.locals.params.id);
    sendSuccess(res, null, 'Enquiry deleted');
  }),
);
