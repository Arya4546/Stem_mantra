import { body } from 'express-validator';

export const createContactValidation = [
  body('name')
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Name must be between 2 and 100 characters'),
  body('email')
    .isEmail()
    .withMessage('Please provide a valid email address')
    .normalizeEmail(),
  body('phone')
    .optional()
    .isMobilePhone('any')
    .withMessage('Please provide a valid phone number'),
  body('schoolName')
    .optional()
    .trim()
    .isLength({ max: 200 })
    .withMessage('School name must not exceed 200 characters'),
  body('designation')
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage('Designation must not exceed 100 characters'),
  body('subject')
    .optional()
    .trim()
    .isLength({ max: 200 })
    .withMessage('Subject must not exceed 200 characters'),
  body('message')
    .trim()
    .isLength({ min: 10, max: 5000 })
    .withMessage('Message must be between 10 and 5000 characters'),
  body('type')
    .optional()
    .isIn(['GENERAL', 'LAB_SETUP', 'TRAINING', 'PARTNERSHIP', 'DEMO_REQUEST', 'SUPPORT'])
    .withMessage('Invalid inquiry type'),
];

export const updateContactStatusValidation = [
  body('status')
    .isIn(['NEW', 'IN_PROGRESS', 'RESPONDED', 'CLOSED'])
    .withMessage('Invalid status'),
  body('response')
    .optional()
    .trim()
    .isLength({ max: 5000 })
    .withMessage('Response must not exceed 5000 characters'),
];
