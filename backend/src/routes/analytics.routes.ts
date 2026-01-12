import { Router } from 'express';
import {
  trackPageView,
  getPageViews,
  getPopularPages,
  getPageViewsByPath,
  logUserActivity,
  getUserActivities,
  getRecentActivities,
  getDashboard,
  getTrafficOverview,
  getReferrerStats,
  getBrowserStats,
  getDeviceStats,
  getConversionFunnel,
  getGoalCompletions
} from '../controllers/analytics.controller';
import { authenticate, authorize } from '../middlewares/auth';

const router = Router();

// ============ PAGE TRACKING (Public) ============
// These endpoints are called from the frontend to track user behavior

router.post('/pageview', trackPageView);
router.post('/activity', logUserActivity);

// ============ ANALYTICS DASHBOARD (Admin Only) ============

// Main dashboard
router.get('/dashboard', authenticate, authorize('ADMIN', 'SUPER_ADMIN', 'MANAGER'), getDashboard);

// Page views analytics (support both /pageviews and /page-views for compatibility)
router.get('/pageviews', authenticate, authorize('ADMIN', 'SUPER_ADMIN', 'MANAGER'), getPageViews);
router.get('/page-views', authenticate, authorize('ADMIN', 'SUPER_ADMIN', 'MANAGER'), getPageViews);
router.get('/pageviews/popular', authenticate, authorize('ADMIN', 'SUPER_ADMIN', 'MANAGER'), getPopularPages);
router.get('/pageviews/path/:path', authenticate, authorize('ADMIN', 'SUPER_ADMIN', 'MANAGER'), getPageViewsByPath);

// User activity analytics
router.get('/activities', authenticate, authorize('ADMIN', 'SUPER_ADMIN', 'MANAGER'), getRecentActivities);
router.get('/activities/user/:userId', authenticate, authorize('ADMIN', 'SUPER_ADMIN', 'MANAGER'), getUserActivities);

// Traffic analytics
router.get('/traffic/overview', authenticate, authorize('ADMIN', 'SUPER_ADMIN', 'MANAGER'), getTrafficOverview);
router.get('/traffic/referrers', authenticate, authorize('ADMIN', 'SUPER_ADMIN', 'MANAGER'), getReferrerStats);
router.get('/traffic/browsers', authenticate, authorize('ADMIN', 'SUPER_ADMIN', 'MANAGER'), getBrowserStats);
router.get('/traffic/devices', authenticate, authorize('ADMIN', 'SUPER_ADMIN', 'MANAGER'), getDeviceStats);

// Conversion analytics
router.get('/conversions/funnel', authenticate, authorize('ADMIN', 'SUPER_ADMIN', 'MANAGER'), getConversionFunnel);
router.get('/conversions/goals', authenticate, authorize('ADMIN', 'SUPER_ADMIN', 'MANAGER'), getGoalCompletions);

export default router;
