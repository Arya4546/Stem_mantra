import { Request, Response, NextFunction } from 'express';
import { leadService, demoBookingService, eventService } from '../services/lead.service';
import { asyncHandler, sendSuccess, sendPaginated, sendCreated } from '../utils/response';
import { BadRequestError } from '../utils/errors';
import { LeadStatus, LeadSource, DemoStatus } from '@prisma/client';

// ============ LEADS ============

export const createLead = asyncHandler(async (req: Request, res: Response, _next: NextFunction) => {
  const lead = await leadService.createLead(req.body);
  sendCreated(res, lead, 'Lead created successfully. Our team will contact you soon!');
});

export const getLeadById = asyncHandler(async (req: Request, res: Response, _next: NextFunction) => {
  const { id } = req.params;
  const lead = await leadService.getLeadById(id);
  sendSuccess(res, lead, 'Lead fetched successfully');
});

export const getAllLeads = asyncHandler(async (req: Request, res: Response, _next: NextFunction) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 20;
  const status = req.query.status as LeadStatus | undefined;
  const source = req.query.source as LeadSource | undefined;
  const assignedTo = req.query.assignedTo as string;
  const search = req.query.search as string;
  
  const result = await leadService.getAllLeads({ 
    page, 
    limit, 
    status, 
    source, 
    assignedTo, 
    search
  });
  
  sendPaginated(res, result.leads, page, limit, result.meta.total, 'Leads fetched successfully');
});

export const updateLeadStatus = asyncHandler(async (req: Request, res: Response, _next: NextFunction) => {
  const { id } = req.params;
  const { status } = req.body;
  
  const lead = await leadService.updateLead(id, { status: status as LeadStatus });
  sendSuccess(res, lead, 'Lead status updated successfully');
});

export const assignLead = asyncHandler(async (req: Request, res: Response, _next: NextFunction) => {
  const { id } = req.params;
  const { assignedTo } = req.body;
  
  if (!assignedTo) {
    throw new BadRequestError('Assigned user ID is required');
  }
  
  const lead = await leadService.updateLead(id, { assignedTo });
  sendSuccess(res, lead, 'Lead assigned successfully');
});

export const addLeadNote = asyncHandler(async (req: Request, res: Response, _next: NextFunction) => {
  const { id } = req.params;
  const { note } = req.body;
  const userId = (req as any).user?.id;
  
  if (!note) {
    throw new BadRequestError('Note content is required');
  }
  
  const activity = await leadService.addActivity(id, {
    type: 'NOTE',
    title: 'Note Added',
    description: note,
    performedBy: userId
  });
  
  sendSuccess(res, activity, 'Note added successfully');
});

export const getLeadStats = asyncHandler(async (_req: Request, res: Response, _next: NextFunction) => {
  const stats = await leadService.getLeadStats();
  sendSuccess(res, stats, 'Lead statistics fetched successfully');
});

// ============ DEMO BOOKINGS ============

export const bookDemo = asyncHandler(async (req: Request, res: Response, _next: NextFunction) => {
  const demo = await demoBookingService.createBooking(req.body);
  sendCreated(res, demo, 'Demo booked successfully. We will confirm your slot shortly!');
});

export const getDemoById = asyncHandler(async (req: Request, res: Response, _next: NextFunction) => {
  const { id } = req.params;
  const demo = await demoBookingService.getBookingById(id);
  sendSuccess(res, demo, 'Demo booking fetched successfully');
});

export const getAllDemos = asyncHandler(async (req: Request, res: Response, _next: NextFunction) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 20;
  const status = req.query.status as DemoStatus | undefined;
  const date = req.query.date as string;
  
  const result = await demoBookingService.getAllBookings({ 
    page, 
    limit, 
    status, 
    startDate: date ? new Date(date) : undefined
  });
  sendPaginated(res, result.bookings, page, limit, result.meta.total, 'Demo bookings fetched successfully');
});

export const updateDemoStatus = asyncHandler(async (req: Request, res: Response, _next: NextFunction) => {
  const { id } = req.params;
  const { status, meetingLink, notes } = req.body;
  
  const demo = await demoBookingService.updateBookingStatus(id, status as DemoStatus, { 
    meetingUrl: meetingLink, 
    adminNotes: notes 
  });
  
  sendSuccess(res, demo, 'Demo status updated successfully');
});

export const getDemoStats = asyncHandler(async (_req: Request, res: Response, _next: NextFunction) => {
  const upcoming = await demoBookingService.getUpcomingBookings(7);
  sendSuccess(res, { upcoming, count: upcoming.length }, 'Demo statistics fetched successfully');
});

// ============ EVENTS ============

export const createEvent = asyncHandler(async (req: Request, res: Response, _next: NextFunction) => {
  const event = await eventService.createEvent(req.body);
  sendCreated(res, event, 'Event created successfully');
});

export const getEventById = asyncHandler(async (req: Request, res: Response, _next: NextFunction) => {
  const { id } = req.params;
  // Get by slug since that's more common for public access
  const event = await eventService.getEventBySlug(id);
  sendSuccess(res, event, 'Event fetched successfully');
});

export const getAllEvents = asyncHandler(async (req: Request, res: Response, _next: NextFunction) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;
  const type = req.query.type as string;
  const upcoming = req.query.upcoming === 'true';
  
  const result = await eventService.getAllEvents({ page, limit, type, upcoming });
  sendPaginated(res, result.events, page, limit, result.meta.total, 'Events fetched successfully');
});

export const registerForEvent = asyncHandler(async (req: Request, res: Response, _next: NextFunction) => {
  const { id } = req.params;
  
  const registration = await eventService.registerForEvent(id, {
    ...req.body
  });
  
  sendCreated(res, registration, 'Successfully registered for the event!');
});

export const getEventRegistrations = asyncHandler(async (req: Request, res: Response, _next: NextFunction) => {
  const { id } = req.params;
  
  const registrations = await eventService.getEventRegistrations(id);
  sendSuccess(res, registrations, 'Event registrations fetched successfully');
});

export const updateEvent = asyncHandler(async (req: Request, res: Response, _next: NextFunction) => {
  const { id } = req.params;
  const event = await eventService.updateEvent(id, req.body);
  sendSuccess(res, event, 'Event updated successfully');
});

export const deleteEvent = asyncHandler(async (req: Request, res: Response, _next: NextFunction) => {
  // Events typically aren't deleted, just cancelled
  const { id } = req.params;
  const event = await eventService.updateEvent(id, { status: 'CANCELLED' as any });
  sendSuccess(res, event, 'Event cancelled successfully');
});

export const getEventStats = asyncHandler(async (_req: Request, res: Response, _next: NextFunction) => {
  const upcoming = await eventService.getUpcomingEvents(10);
  sendSuccess(res, { upcoming, count: upcoming.length }, 'Event statistics fetched successfully');
});

// ============ CERTIFICATES ============
// Note: Certificates need to be added to lead.service.ts

export const generateCertificate = asyncHandler(async (_req: Request, res: Response, _next: NextFunction) => {
  // TODO: Implement certificate generation
  sendCreated(res, { message: 'Certificate generation not yet implemented' }, 'Certificate generated');
});

export const getCertificateById = asyncHandler(async (_req: Request, res: Response, _next: NextFunction) => {
  // TODO: Implement certificate retrieval
  sendSuccess(res, { message: 'Certificate retrieval not yet implemented' }, 'Certificate fetched');
});

export const getCertificatesByUser = asyncHandler(async (_req: Request, res: Response, _next: NextFunction) => {
  // TODO: Implement user certificates retrieval
  sendSuccess(res, [], 'Certificates fetched');
});

export const verifyCertificate = asyncHandler(async (_req: Request, res: Response, _next: NextFunction) => {
  // TODO: Implement certificate verification
  sendSuccess(res, { valid: false, message: 'Certificate verification not yet implemented' }, 'Certificate verification');
});
