import prisma from '../config/database';
import { NotFoundError, BadRequestError } from '../utils/errors';
import { LeadStatus, LeadSource, DemoStatus, EventStatus, Prisma } from '@prisma/client';

// ==========================================
// Lead Service
// ==========================================

interface CreateLeadDto {
  name: string;
  email: string;
  phone?: string;
  schoolName?: string;
  designation?: string;
  city?: string;
  state?: string;
  source?: LeadSource;
  interests?: string[];
  budget?: string;
  timeline?: string;
  notes?: string;
}

class LeadService {
  async createLead(data: CreateLeadDto) {
    // Check for existing lead
    const existing = await prisma.lead.findFirst({
      where: { email: data.email },
    });

    if (existing) {
      // Update existing lead
      return prisma.lead.update({
        where: { id: existing.id },
        data: {
          ...data,
          score: { increment: 10 },
        },
      });
    }

    const lead = await prisma.lead.create({
      data: {
        ...data,
        score: this.calculateInitialScore(data),
      },
    });

    return lead;
  }

  private calculateInitialScore(data: CreateLeadDto): number {
    let score = 10;
    
    if (data.phone) score += 10;
    if (data.schoolName) score += 15;
    if (data.budget) score += 20;
    if (data.timeline) score += 15;
    if (data.interests && data.interests.length > 0) {
      score += data.interests.length * 5;
    }

    return score;
  }

  async getAllLeads(query: {
    page?: number;
    limit?: number;
    status?: LeadStatus;
    source?: LeadSource;
    assignedTo?: string;
    search?: string;
    minScore?: number;
  }) {
    const page = query.page || 1;
    const limit = query.limit || 20;
    const skip = (page - 1) * limit;

    const where: Prisma.LeadWhereInput = {};

    if (query.status) where.status = query.status;
    if (query.source) where.source = query.source;
    if (query.assignedTo) where.assignedTo = query.assignedTo;
    if (query.minScore) where.score = { gte: query.minScore };

    if (query.search) {
      where.OR = [
        { name: { contains: query.search, mode: 'insensitive' } },
        { email: { contains: query.search, mode: 'insensitive' } },
        { schoolName: { contains: query.search, mode: 'insensitive' } },
        { city: { contains: query.search, mode: 'insensitive' } },
      ];
    }

    const [leads, total] = await Promise.all([
      prisma.lead.findMany({
        where,
        skip,
        take: limit,
        orderBy: [{ score: 'desc' }, { createdAt: 'desc' }],
        include: {
          _count: { select: { activities: true } },
        },
      }),
      prisma.lead.count({ where }),
    ]);

    return {
      leads,
      meta: { page, limit, total, totalPages: Math.ceil(total / limit) },
    };
  }

  async getLeadById(id: string) {
    const lead = await prisma.lead.findUnique({
      where: { id },
      include: {
        activities: {
          orderBy: { createdAt: 'desc' },
          take: 20,
        },
      },
    });

    if (!lead) {
      throw new NotFoundError('Lead not found');
    }

    return lead;
  }

  async updateLead(id: string, data: Partial<CreateLeadDto> & { status?: LeadStatus; assignedTo?: string; nextFollowUp?: Date }) {
    const lead = await prisma.lead.update({
      where: { id },
      data: {
        ...data,
        lastContactAt: data.status ? new Date() : undefined,
      },
    });

    return lead;
  }

  async addActivity(leadId: string, data: { type: string; title: string; description?: string; outcome?: string; performedBy: string }) {
    const activity = await prisma.leadActivity.create({
      data: {
        leadId,
        ...data,
      },
    });

    // Update lead score and last contact
    await prisma.lead.update({
      where: { id: leadId },
      data: {
        score: { increment: 5 },
        lastContactAt: new Date(),
      },
    });

    return activity;
  }

  async getLeadStats() {
    const [total, byStatus, bySource, highValue] = await Promise.all([
      prisma.lead.count(),
      prisma.lead.groupBy({
        by: ['status'],
        _count: true,
      }),
      prisma.lead.groupBy({
        by: ['source'],
        _count: true,
      }),
      prisma.lead.count({
        where: { score: { gte: 50 } },
      }),
    ]);

    return {
      total,
      highValue,
      byStatus: byStatus.reduce((acc, s) => ({ ...acc, [s.status]: s._count }), {}),
      bySource: bySource.reduce((acc, s) => ({ ...acc, [s.source]: s._count }), {}),
    };
  }

  async convertToCustomer(leadId: string) {
    const lead = await prisma.lead.update({
      where: { id: leadId },
      data: { status: LeadStatus.WON },
    });

    return lead;
  }
}

// ==========================================
// Demo Booking Service
// ==========================================

interface CreateDemoBookingDto {
  name: string;
  email: string;
  phone: string;
  schoolName?: string;
  designation?: string;
  city?: string;
  preferredDate: Date;
  preferredTime: string;
  demoType: string;
  interests?: string[];
  message?: string;
}

class DemoBookingService {
  async createBooking(data: CreateDemoBookingDto) {
    // Create demo booking
    const booking = await prisma.demoBooking.create({
      data,
    });

    // Also create a lead
    await prisma.lead.upsert({
      where: { email: data.email },
      update: {
        score: { increment: 30 },
        interests: data.interests,
      },
      create: {
        name: data.name,
        email: data.email,
        phone: data.phone,
        schoolName: data.schoolName,
        designation: data.designation,
        city: data.city,
        source: LeadSource.WEBSITE,
        interests: data.interests || [],
        score: 40,
      },
    });

    return booking;
  }

  async getAllBookings(query: {
    page?: number;
    limit?: number;
    status?: DemoStatus;
    startDate?: Date;
    endDate?: Date;
    assignedTo?: string;
  }) {
    const page = query.page || 1;
    const limit = query.limit || 20;
    const skip = (page - 1) * limit;

    const where: Prisma.DemoBookingWhereInput = {};

    if (query.status) where.status = query.status;
    if (query.assignedTo) where.assignedTo = query.assignedTo;

    if (query.startDate || query.endDate) {
      where.preferredDate = {};
      if (query.startDate) where.preferredDate.gte = query.startDate;
      if (query.endDate) where.preferredDate.lte = query.endDate;
    }

    const [bookings, total] = await Promise.all([
      prisma.demoBooking.findMany({
        where,
        skip,
        take: limit,
        orderBy: { preferredDate: 'asc' },
      }),
      prisma.demoBooking.count({ where }),
    ]);

    return {
      bookings,
      meta: { page, limit, total, totalPages: Math.ceil(total / limit) },
    };
  }

  async getBookingById(id: string) {
    const booking = await prisma.demoBooking.findUnique({ where: { id } });

    if (!booking) {
      throw new NotFoundError('Demo booking not found');
    }

    return booking;
  }

  async updateBookingStatus(id: string, status: DemoStatus, data?: { confirmedDate?: Date; meetingUrl?: string; adminNotes?: string }) {
    const booking = await prisma.demoBooking.update({
      where: { id },
      data: {
        status,
        ...data,
      },
    });

    return booking;
  }

  async assignBooking(id: string, assignedTo: string) {
    const booking = await prisma.demoBooking.update({
      where: { id },
      data: { assignedTo },
    });

    return booking;
  }

  async getUpcomingBookings(days: number = 7) {
    const startDate = new Date();
    const endDate = new Date();
    endDate.setDate(endDate.getDate() + days);

    const bookings = await prisma.demoBooking.findMany({
      where: {
        preferredDate: {
          gte: startDate,
          lte: endDate,
        },
        status: { in: [DemoStatus.SCHEDULED, DemoStatus.CONFIRMED] },
      },
      orderBy: { preferredDate: 'asc' },
    });

    return bookings;
  }
}

// ==========================================
// Event Service
// ==========================================

interface CreateEventDto {
  title: string;
  slug: string;
  description: string;
  shortDescription?: string;
  type: string;
  startDate: Date;
  endDate: Date;
  timezone?: string;
  isOnline?: boolean;
  venue?: string;
  meetingUrl?: string;
  thumbnail?: string;
  banner?: string;
  maxAttendees?: number;
  isFree?: boolean;
  price?: number;
  metaTitle?: string;
  metaDescription?: string;
  speakers?: object;
}

class EventService {
  async createEvent(data: CreateEventDto) {
    const event = await prisma.event.create({ data: data as Prisma.EventCreateInput });
    return event;
  }

  async getAllEvents(query: {
    page?: number;
    limit?: number;
    status?: EventStatus;
    type?: string;
    upcoming?: boolean;
  }) {
    const page = query.page || 1;
    const limit = query.limit || 10;
    const skip = (page - 1) * limit;

    const where: Prisma.EventWhereInput = {};

    if (query.status) where.status = query.status;
    if (query.type) where.type = query.type as Prisma.EnumEventTypeFilter<"Event">;

    if (query.upcoming) {
      where.startDate = { gte: new Date() };
      where.status = EventStatus.UPCOMING;
    }

    const [events, total] = await Promise.all([
      prisma.event.findMany({
        where,
        skip,
        take: limit,
        orderBy: { startDate: 'asc' },
        include: {
          _count: { select: { registrations: true } },
        },
      }),
      prisma.event.count({ where }),
    ]);

    return {
      events,
      meta: { page, limit, total, totalPages: Math.ceil(total / limit) },
    };
  }

  async getEventBySlug(slug: string) {
    const event = await prisma.event.findUnique({
      where: { slug },
      include: {
        _count: { select: { registrations: true } },
      },
    });

    if (!event) {
      throw new NotFoundError('Event not found');
    }

    return event;
  }

  async updateEvent(id: string, data: Partial<CreateEventDto> & { status?: EventStatus }) {
    const event = await prisma.event.update({
      where: { id },
      data: data as Prisma.EventUpdateInput,
    });
    return event;
  }

  async registerForEvent(eventId: string, data: {
    name: string;
    email: string;
    phone?: string;
    schoolName?: string;
    designation?: string;
  }) {
    const event = await prisma.event.findUnique({ where: { id: eventId } });

    if (!event) {
      throw new NotFoundError('Event not found');
    }

    // Check capacity
    if (event.maxAttendees) {
      const count = await prisma.eventRegistration.count({ where: { eventId } });
      if (count >= event.maxAttendees) {
        throw new BadRequestError('Event is fully booked');
      }
    }

    // Check for existing registration
    const existing = await prisma.eventRegistration.findUnique({
      where: {
        eventId_email: { eventId, email: data.email },
      },
    });

    if (existing) {
      throw new BadRequestError('Already registered for this event');
    }

    const registration = await prisma.eventRegistration.create({
      data: {
        eventId,
        ...data,
      },
    });

    // Create lead
    await prisma.lead.upsert({
      where: { email: data.email },
      update: { score: { increment: 20 } },
      create: {
        name: data.name,
        email: data.email,
        phone: data.phone,
        schoolName: data.schoolName,
        designation: data.designation,
        source: LeadSource.EVENT,
        score: 25,
      },
    });

    return registration;
  }

  async getEventRegistrations(eventId: string) {
    const registrations = await prisma.eventRegistration.findMany({
      where: { eventId },
      orderBy: { createdAt: 'desc' },
    });

    return registrations;
  }

  async markAttendance(registrationId: string, isAttended: boolean) {
    const registration = await prisma.eventRegistration.update({
      where: { id: registrationId },
      data: { isAttended },
    });

    return registration;
  }

  async getUpcomingEvents(limit: number = 5) {
    const events = await prisma.event.findMany({
      where: {
        startDate: { gte: new Date() },
        status: EventStatus.UPCOMING,
      },
      take: limit,
      orderBy: { startDate: 'asc' },
      include: {
        _count: { select: { registrations: true } },
      },
    });

    return events;
  }
}

export const leadService = new LeadService();
export const demoBookingService = new DemoBookingService();
export const eventService = new EventService();
