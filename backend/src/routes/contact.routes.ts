import { Router } from 'express';
import * as contactController from '../controllers/contact.controller';
import { authenticate, isAdmin } from '../middlewares/auth';
import { contactLimiter } from '../middlewares/rateLimiter';
import validate from '../middlewares/validate';
import {
  createContactValidation,
  updateContactStatusValidation,
} from '../validators/contact.validator';

const router = Router();

/**
 * @route   POST /api/v1/contact
 * @desc    Submit a contact form
 * @access  Public
 */
router.post(
  '/',
  contactLimiter,
  validate(createContactValidation),
  contactController.createContact
);

/**
 * @route   GET /api/v1/contact
 * @desc    Get all contact submissions
 * @access  Private (Admin only)
 */
router.get(
  '/',
  authenticate,
  isAdmin,
  contactController.getAllContacts
);

/**
 * @route   GET /api/v1/contact/stats
 * @desc    Get contact statistics
 * @access  Private (Admin only)
 */
router.get(
  '/stats',
  authenticate,
  isAdmin,
  contactController.getContactStats
);

/**
 * @route   GET /api/v1/contact/:id
 * @desc    Get a contact submission by ID
 * @access  Private (Admin only)
 */
router.get(
  '/:id',
  authenticate,
  isAdmin,
  contactController.getContactById
);

/**
 * @route   PATCH /api/v1/contact/:id/status
 * @desc    Update contact submission status
 * @access  Private (Admin only)
 */
router.patch(
  '/:id/status',
  authenticate,
  isAdmin,
  validate(updateContactStatusValidation),
  contactController.updateContactStatus
);

/**
 * @route   DELETE /api/v1/contact/:id
 * @desc    Delete a contact submission
 * @access  Private (Admin only)
 */
router.delete(
  '/:id',
  authenticate,
  isAdmin,
  contactController.deleteContact
);

export default router;
