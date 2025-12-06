import { Router } from 'express';
import { UserRole } from '@prisma/client';
import {
  createLead,
  getLeadById,
  getAllLeads,
  updateLeadStatus,
  assignLead,
  addLeadNote,
  getLeadStats,
  bookDemo,
  getDemoById,
  getAllDemos,
  updateDemoStatus,
  getDemoStats,
  createEvent,
  getEventById,
  getAllEvents,
  registerForEvent,
  getEventRegistrations,
  updateEvent,
  deleteEvent,
  getEventStats,
  generateCertificate,
  getCertificateById,
  getCertificatesByUser,
  verifyCertificate
} from '../controllers/lead.controller';
import { authenticate, authorize } from '../middlewares/auth';

const router = Router();

// ============ LEADS ============

// Public route - anyone can submit a lead
router.post('/leads', createLead);

// Admin routes
router.get('/leads', authenticate, authorize(UserRole.ADMIN, UserRole.SCHOOL_ADMIN), getAllLeads);
router.get('/leads/stats', authenticate, authorize(UserRole.ADMIN, UserRole.SCHOOL_ADMIN), getLeadStats);
router.get('/leads/:id', authenticate, authorize(UserRole.ADMIN, UserRole.SCHOOL_ADMIN), getLeadById);
router.patch('/leads/:id/status', authenticate, authorize(UserRole.ADMIN, UserRole.SCHOOL_ADMIN), updateLeadStatus);
router.patch('/leads/:id/assign', authenticate, authorize(UserRole.ADMIN), assignLead);
router.post('/leads/:id/notes', authenticate, authorize(UserRole.ADMIN, UserRole.SCHOOL_ADMIN), addLeadNote);

// ============ DEMO BOOKINGS ============

// Public or authenticated - book a demo
router.post('/demos', bookDemo);

// Admin routes
router.get('/demos', authenticate, authorize(UserRole.ADMIN, UserRole.SCHOOL_ADMIN), getAllDemos);
router.get('/demos/stats', authenticate, authorize(UserRole.ADMIN, UserRole.SCHOOL_ADMIN), getDemoStats);
router.get('/demos/:id', authenticate, authorize(UserRole.ADMIN, UserRole.SCHOOL_ADMIN), getDemoById);
router.patch('/demos/:id/status', authenticate, authorize(UserRole.ADMIN, UserRole.SCHOOL_ADMIN), updateDemoStatus);

// ============ EVENTS ============

// Public routes
router.get('/events', getAllEvents);
router.get('/events/:id', getEventById);

// Authenticated routes
router.post('/events/:id/register', authenticate, registerForEvent);

// Admin routes
router.post('/events', authenticate, authorize('ADMIN'), createEvent);
router.put('/events/:id', authenticate, authorize('ADMIN'), updateEvent);
router.delete('/events/:id', authenticate, authorize('ADMIN'), deleteEvent);
router.get('/events/:id/registrations', authenticate, authorize('ADMIN'), getEventRegistrations);
router.get('/events-stats', authenticate, authorize('ADMIN'), getEventStats);

// ============ CERTIFICATES ============

// Public route - verify certificate
router.get('/certificates/verify/:certificateNumber', verifyCertificate);

// Authenticated routes
router.get('/certificates/me', authenticate, getCertificatesByUser);
router.get('/certificates/:id', authenticate, getCertificateById);

// Admin routes
router.post('/certificates', authenticate, authorize('ADMIN'), generateCertificate);
router.get('/certificates/user/:userId', authenticate, authorize('ADMIN'), getCertificatesByUser);

export default router;
