import { body, param, query } from 'express-validator';

// ============ LEADS ============

export const createLeadValidator = [
  body('name')
    .trim()
    .notEmpty().withMessage('Name is required')
    .isLength({ min: 2, max: 100 }).withMessage('Name must be between 2 and 100 characters'),
  body('email')
    .isEmail().withMessage('Valid email is required'),
  body('phone')
    .optional()
    .matches(/^[+]?[\d\s-]{10,15}$/).withMessage('Invalid phone number format'),
  body('schoolName')
    .optional()
    .trim()
    .isLength({ max: 200 }).withMessage('School name must be less than 200 characters'),
  body('designation')
    .optional()
    .trim()
    .isLength({ max: 100 }).withMessage('Designation must be less than 100 characters'),
  body('city')
    .optional()
    .trim()
    .isLength({ max: 100 }).withMessage('City must be less than 100 characters'),
  body('state')
    .optional()
    .trim()
    .isLength({ max: 100 }).withMessage('State must be less than 100 characters'),
  body('source')
    .optional()
    .isIn(['WEBSITE', 'REFERRAL', 'SOCIAL', 'EMAIL', 'PHONE', 'EVENT', 'OTHER'])
    .withMessage('Invalid lead source'),
  body('message')
    .optional()
    .trim()
    .isLength({ max: 2000 }).withMessage('Message must be less than 2000 characters'),
  body('interestedIn')
    .optional()
    .isArray().withMessage('interestedIn must be an array'),
];

export const updateLeadStatusValidator = [
  param('id')
    .isUUID().withMessage('Invalid lead ID'),
  body('status')
    .isIn(['NEW', 'CONTACTED', 'QUALIFIED', 'PROPOSAL', 'NEGOTIATION', 'CONVERTED', 'LOST'])
    .withMessage('Invalid lead status'),
];

export const assignLeadValidator = [
  param('id')
    .isUUID().withMessage('Invalid lead ID'),
  body('assignedTo')
    .isUUID().withMessage('Invalid user ID for assignment'),
];

export const addLeadNoteValidator = [
  param('id')
    .isUUID().withMessage('Invalid lead ID'),
  body('note')
    .trim()
    .notEmpty().withMessage('Note content is required')
    .isLength({ max: 2000 }).withMessage('Note must be less than 2000 characters'),
];

// ============ DEMO BOOKINGS ============

export const bookDemoValidator = [
  body('name')
    .trim()
    .notEmpty().withMessage('Name is required')
    .isLength({ min: 2, max: 100 }).withMessage('Name must be between 2 and 100 characters'),
  body('email')
    .isEmail().withMessage('Valid email is required'),
  body('phone')
    .matches(/^[+]?[\d\s-]{10,15}$/).withMessage('Valid phone number is required'),
  body('schoolName')
    .optional()
    .trim()
    .isLength({ max: 200 }).withMessage('School name must be less than 200 characters'),
  body('preferredDate')
    .isISO8601().withMessage('Valid preferred date is required'),
  body('preferredTime')
    .optional()
    .matches(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/).withMessage('Invalid time format (use HH:MM)'),
  body('programType')
    .optional()
    .trim()
    .isLength({ max: 100 }).withMessage('Program type must be less than 100 characters'),
  body('message')
    .optional()
    .trim()
    .isLength({ max: 1000 }).withMessage('Message must be less than 1000 characters'),
];

export const updateDemoStatusValidator = [
  param('id')
    .isUUID().withMessage('Invalid demo ID'),
  body('status')
    .isIn(['PENDING', 'CONFIRMED', 'COMPLETED', 'CANCELLED', 'RESCHEDULED'])
    .withMessage('Invalid demo status'),
  body('meetingLink')
    .optional()
    .isURL().withMessage('Invalid meeting link URL'),
  body('notes')
    .optional()
    .trim()
    .isLength({ max: 1000 }).withMessage('Notes must be less than 1000 characters'),
];

// ============ EVENTS ============

export const createEventValidator = [
  body('title')
    .trim()
    .notEmpty().withMessage('Event title is required')
    .isLength({ min: 5, max: 200 }).withMessage('Title must be between 5 and 200 characters'),
  body('description')
    .trim()
    .notEmpty().withMessage('Description is required')
    .isLength({ min: 20 }).withMessage('Description must be at least 20 characters'),
  body('startDate')
    .isISO8601().withMessage('Valid start date is required'),
  body('endDate')
    .optional()
    .isISO8601().withMessage('Invalid end date format'),
  body('location')
    .optional()
    .trim()
    .isLength({ max: 500 }).withMessage('Location must be less than 500 characters'),
  body('isOnline')
    .optional()
    .isBoolean().withMessage('isOnline must be a boolean'),
  body('meetingLink')
    .optional()
    .isURL().withMessage('Invalid meeting link URL'),
  body('maxParticipants')
    .optional()
    .isInt({ min: 1, max: 10000 }).withMessage('Max participants must be between 1 and 10000'),
  body('registrationDeadline')
    .optional()
    .isISO8601().withMessage('Invalid registration deadline format'),
  body('type')
    .optional()
    .isIn(['WORKSHOP', 'WEBINAR', 'COMPETITION', 'EXHIBITION', 'TRAINING', 'OTHER'])
    .withMessage('Invalid event type'),
];

export const registerForEventValidator = [
  param('id')
    .isUUID().withMessage('Invalid event ID'),
  body('name')
    .optional()
    .trim()
    .isLength({ min: 2, max: 100 }).withMessage('Name must be between 2 and 100 characters'),
  body('email')
    .optional()
    .isEmail().withMessage('Invalid email format'),
  body('phone')
    .optional()
    .matches(/^[+]?[\d\s-]{10,15}$/).withMessage('Invalid phone number format'),
];

// ============ CERTIFICATES ============

export const generateCertificateValidator = [
  body('userId')
    .isUUID().withMessage('Valid user ID is required'),
  body('courseName')
    .trim()
    .notEmpty().withMessage('Course name is required')
    .isLength({ max: 200 }).withMessage('Course name must be less than 200 characters'),
  body('completionDate')
    .optional()
    .isISO8601().withMessage('Invalid completion date format'),
  body('grade')
    .optional()
    .trim()
    .isLength({ max: 20 }).withMessage('Grade must be less than 20 characters'),
  body('score')
    .optional()
    .isFloat({ min: 0, max: 100 }).withMessage('Score must be between 0 and 100'),
];

export const verifyCertificateValidator = [
  param('certificateNumber')
    .trim()
    .notEmpty().withMessage('Certificate number is required')
    .isLength({ min: 5, max: 50 }).withMessage('Invalid certificate number format'),
];

// ============ QUERY VALIDATORS ============

export const leadQueryValidator = [
  query('page')
    .optional()
    .isInt({ min: 1 }).withMessage('Page must be a positive integer'),
  query('limit')
    .optional()
    .isInt({ min: 1, max: 100 }).withMessage('Limit must be between 1 and 100'),
  query('status')
    .optional()
    .isIn(['NEW', 'CONTACTED', 'QUALIFIED', 'PROPOSAL', 'NEGOTIATION', 'CONVERTED', 'LOST'])
    .withMessage('Invalid status filter'),
  query('source')
    .optional()
    .isIn(['WEBSITE', 'REFERRAL', 'SOCIAL', 'EMAIL', 'PHONE', 'EVENT', 'OTHER'])
    .withMessage('Invalid source filter'),
  query('assignedTo')
    .optional()
    .isUUID().withMessage('Invalid assignedTo user ID'),
  query('search')
    .optional()
    .trim()
    .isLength({ max: 200 }).withMessage('Search query too long'),
  query('dateFrom')
    .optional()
    .isISO8601().withMessage('Invalid date format for dateFrom'),
  query('dateTo')
    .optional()
    .isISO8601().withMessage('Invalid date format for dateTo'),
];

export const eventQueryValidator = [
  query('page')
    .optional()
    .isInt({ min: 1 }).withMessage('Page must be a positive integer'),
  query('limit')
    .optional()
    .isInt({ min: 1, max: 100 }).withMessage('Limit must be between 1 and 100'),
  query('type')
    .optional()
    .isIn(['WORKSHOP', 'WEBINAR', 'COMPETITION', 'EXHIBITION', 'TRAINING', 'OTHER'])
    .withMessage('Invalid event type filter'),
  query('upcoming')
    .optional()
    .isIn(['true', 'false']).withMessage('Upcoming must be true or false'),
];
