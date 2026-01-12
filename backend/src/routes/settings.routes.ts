import { Router } from 'express';
import { UserRole } from '@prisma/client';
import {
  getAllSettings,
  getSettingsByGroup,
  getSettingByKey,
  upsertSetting,
  bulkUpdateSettings,
  deleteSetting,
  getPublicSettings
} from '../controllers/settings.controller';
import { authenticate, authorize } from '../middlewares/auth';

const router = Router();

// ============ PUBLIC ROUTES ============

// Get public settings (for frontend site info, social links, etc.)
router.get('/public', getPublicSettings);

// ============ ADMIN ROUTES ============

// Get all settings
router.get('/', authenticate, authorize(UserRole.ADMIN, UserRole.SUPER_ADMIN), getAllSettings);

// Get settings by group
router.get('/group/:group', authenticate, authorize(UserRole.ADMIN, UserRole.SUPER_ADMIN), getSettingsByGroup);

// Get single setting by key
router.get('/key/:key', authenticate, authorize(UserRole.ADMIN, UserRole.SUPER_ADMIN), getSettingByKey);

// Create or update a single setting
router.post('/', authenticate, authorize(UserRole.ADMIN, UserRole.SUPER_ADMIN), upsertSetting);

// Bulk update settings
router.post('/bulk', authenticate, authorize(UserRole.ADMIN, UserRole.SUPER_ADMIN), bulkUpdateSettings);

// Delete a setting
router.delete('/:key', authenticate, authorize(UserRole.ADMIN, UserRole.SUPER_ADMIN), deleteSetting);

export default router;
