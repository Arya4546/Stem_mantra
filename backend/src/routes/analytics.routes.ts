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
router.get('/dashboard', authenticate, authorize('ADMIN'), getDashboard);

// Page views analytics
router.get('/pageviews', authenticate, authorize('ADMIN'), getPageViews);
router.get('/pageviews/popular', authenticate, authorize('ADMIN'), getPopularPages);
router.get('/pageviews/path/:path', authenticate, authorize('ADMIN'), getPageViewsByPath);

// User activity analytics
router.get('/activities', authenticate, authorize('ADMIN'), getRecentActivities);
router.get('/activities/user/:userId', authenticate, authorize('ADMIN'), getUserActivities);

// Traffic analytics
router.get('/traffic/overview', authenticate, authorize('ADMIN'), getTrafficOverview);
router.get('/traffic/referrers', authenticate, authorize('ADMIN'), getReferrerStats);
router.get('/traffic/browsers', authenticate, authorize('ADMIN'), getBrowserStats);
router.get('/traffic/devices', authenticate, authorize('ADMIN'), getDeviceStats);

// Conversion analytics
router.get('/conversions/funnel', authenticate, authorize('ADMIN'), getConversionFunnel);
router.get('/conversions/goals', authenticate, authorize('ADMIN'), getGoalCompletions);

export default router;
