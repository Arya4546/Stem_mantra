import { Request, Response } from 'express';
import { asyncHandler } from '../middlewares/errorHandler';
import contactService from '../services/contact.service';
import { sendSuccess, sendCreated } from '../utils/response';
import { InquiryStatus, InquiryType } from '@prisma/client';

export const createContact = asyncHandler(async (req: Request, res: Response) => {
  const { name, email, phone, schoolName, designation, subject, message, type } = req.body;

  const contact = await contactService.create({
    name,
    email,
    phone,
    schoolName,
    designation,
    subject,
    message,
    type: type as InquiryType,
    ipAddress: req.ip,
    userAgent: req.get('User-Agent'),
    source: req.get('Referer'),
    userId: req.user?.id,
  });

  return sendCreated(res, contact, 'Thank you for contacting us. We will get back to you soon!');
});

export const getAllContacts = asyncHandler(async (req: Request, res: Response) => {
  const {
    page,
    limit,
    status,
    type,
    search,
    startDate,
    endDate,
  } = req.query;

  const result = await contactService.getAll({
    page: page ? parseInt(page as string, 10) : undefined,
    limit: limit ? parseInt(limit as string, 10) : undefined,
    status: status as InquiryStatus,
    type: type as InquiryType,
    search: search as string,
    startDate: startDate ? new Date(startDate as string) : undefined,
    endDate: endDate ? new Date(endDate as string) : undefined,
  });

  return sendSuccess(res, result.contacts, 'Contacts retrieved successfully', 200, result.meta);
});

export const getContactById = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;

  const contact = await contactService.getById(id);

  return sendSuccess(res, contact, 'Contact retrieved successfully');
});

export const updateContactStatus = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { status, response } = req.body;

  const contact = await contactService.updateStatus(
    id,
    status as InquiryStatus,
    req.user?.id,
    response
  );

  return sendSuccess(res, contact, 'Contact status updated successfully');
});

export const deleteContact = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await contactService.delete(id);

  return sendSuccess(res, result, result.message);
});

export const getContactStats = asyncHandler(async (_req: Request, res: Response) => {
  const stats = await contactService.getStats();

  return sendSuccess(res, stats, 'Contact statistics retrieved successfully');
});
