import { Request, Response, NextFunction } from 'express';
import { analyticsService } from '../services/analytics.service';
import { asyncHandler, sendSuccess } from '../utils/response';
import { BadRequestError } from '../utils/errors';

// ============ PAGE VIEWS ============

export const trackPageView = asyncHandler(async (req: Request, res: Response, _next: NextFunction) => {
  const { path, title, referrer } = req.body;
  const sessionId = req.cookies?.sessionId || req.headers['x-session-id'] as string;
  const userId = (req as any).user?.id;
  const ipAddress = req.ip || req.headers['x-forwarded-for'] as string;
  const userAgent = req.headers['user-agent'];
  
  if (!path) {
    throw new BadRequestError('Page path is required');
  }
  
  await analyticsService.trackPageView({
    path,
    title,
    referrer,
    userAgent,
    sessionId,
    userId,
    ipAddress
  });
  
  sendSuccess(res, null, 'Page view tracked');
});

export const getPageViews = asyncHandler(async (req: Request, res: Response, _next: NextFunction) => {
  const limit = parseInt(req.query.limit as string) || 100;
  const path = req.query.path as string;
  const dateFrom = req.query.dateFrom as string;
  const dateTo = req.query.dateTo as string;
  
  const pageViews = await analyticsService.getPageViews({ 
    limit, 
    path, 
    startDate: dateFrom ? new Date(dateFrom) : undefined,
    endDate: dateTo ? new Date(dateTo) : undefined
  });
  
  sendSuccess(res, pageViews, 'Page views fetched successfully');
});

export const getPopularPages = asyncHandler(async (req: Request, res: Response, _next: NextFunction) => {
  const limit = parseInt(req.query.limit as string) || 10;
  const days = parseInt(req.query.days as string) || 30;
  
  const pages = await analyticsService.getPopularPages(limit, days);
  sendSuccess(res, pages, 'Popular pages fetched successfully');
});

export const getPageViewsByPath = asyncHandler(async (req: Request, res: Response, _next: NextFunction) => {
  const days = parseInt(req.query.days as string) || 30;
  
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - days);
  
  const stats = await analyticsService.getPageViewStats(startDate);
  sendSuccess(res, stats, 'Page view statistics fetched successfully');
});

// ============ USER ACTIVITY ============

export const logUserActivity = asyncHandler(async (req: Request, res: Response, _next: NextFunction) => {
  const { action, resource, resourceId, metadata } = req.body;
  const userId = (req as any).user?.id;
  const sessionId = req.cookies?.sessionId || req.headers['x-session-id'] as string;
  const ipAddress = req.ip || req.headers['x-forwarded-for'] as string;
  
  if (!action) {
    throw new BadRequestError('Action is required');
  }
  
  await analyticsService.trackActivity({
    action,
    resource,
    resourceId,
    metadata,
    userId,
    sessionId,
    ipAddress
  });
  
  sendSuccess(res, null, 'Activity logged');
});

export const getUserActivities = asyncHandler(async (req: Request, res: Response, _next: NextFunction) => {
  const limit = parseInt(req.query.limit as string) || 50;
  
  const activities = await analyticsService.getRecentActivities(limit);
  sendSuccess(res, activities, 'User activities fetched successfully');
});

export const getRecentActivities = asyncHandler(async (req: Request, res: Response, _next: NextFunction) => {
  const limit = parseInt(req.query.limit as string) || 50;
  const activities = await analyticsService.getRecentActivities(limit);
  sendSuccess(res, activities, 'Recent activities fetched successfully');
});

// ============ DASHBOARD STATS ============

export const getDashboard = asyncHandler(async (_req: Request, res: Response, _next: NextFunction) => {
  const stats = await analyticsService.getDashboardStats();
  sendSuccess(res, stats, 'Dashboard statistics fetched successfully');
});

// ============ TRAFFIC ANALYTICS ============

export const getTrafficOverview = asyncHandler(async (req: Request, res: Response, _next: NextFunction) => {
  const days = parseInt(req.query.days as string) || 30;
  
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - days);
  
  const overview = await analyticsService.getPageViewStats(startDate);
  sendSuccess(res, overview, 'Traffic overview fetched successfully');
});

export const getReferrerStats = asyncHandler(async (req: Request, res: Response, _next: NextFunction) => {
  const days = parseInt(req.query.days as string) || 30;
  
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - days);
  
  // Get referrer stats from page views
  const stats = await analyticsService.getPageViewStats(startDate);
  sendSuccess(res, stats, 'Referrer statistics fetched successfully');
});

export const getBrowserStats = asyncHandler(async (_req: Request, res: Response, _next: NextFunction) => {
  // Browser stats would need to be parsed from user agent
  sendSuccess(res, { message: 'Browser statistics not yet implemented' }, 'Browser statistics fetched successfully');
});

export const getDeviceStats = asyncHandler(async (_req: Request, res: Response, _next: NextFunction) => {
  // Device stats would need to be parsed from user agent
  sendSuccess(res, { message: 'Device statistics not yet implemented' }, 'Device statistics fetched successfully');
});

// ============ CONVERSION ANALYTICS ============

export const getConversionFunnel = asyncHandler(async (req: Request, res: Response, _next: NextFunction) => {
  const days = parseInt(req.query.days as string) || 30;
  
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - days);
  
  // Get activity stats for funnel
  const activityStats = await analyticsService.getActivityStats(startDate);
  sendSuccess(res, activityStats, 'Conversion funnel data fetched successfully');
});

export const getGoalCompletions = asyncHandler(async (req: Request, res: Response, _next: NextFunction) => {
  const days = parseInt(req.query.days as string) || 30;
  
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - days);
  
  const activityStats = await analyticsService.getActivityStats(startDate);
  sendSuccess(res, activityStats, 'Goal completions fetched successfully');
});
