import { Request, Response, NextFunction } from 'express';
import { siteSettingsService } from '../services/analytics.service';
import { asyncHandler, sendSuccess } from '../utils/response';
import { BadRequestError } from '../utils/errors';

/**
 * Get all site settings
 */
export const getAllSettings = asyncHandler(async (_req: Request, res: Response, _next: NextFunction) => {
  const settings = await siteSettingsService.getAll();
  sendSuccess(res, settings, 'Settings fetched successfully');
});

/**
 * Get settings by group
 */
export const getSettingsByGroup = asyncHandler(async (req: Request, res: Response, _next: NextFunction) => {
  const { group } = req.params;
  
  if (!group) {
    throw new BadRequestError('Group is required');
  }
  
  const settings = await siteSettingsService.getByGroup(group);
  sendSuccess(res, settings, `Settings for group "${group}" fetched successfully`);
});

/**
 * Get a single setting by key
 */
export const getSettingByKey = asyncHandler(async (req: Request, res: Response, _next: NextFunction) => {
  const { key } = req.params;
  
  if (!key) {
    throw new BadRequestError('Key is required');
  }
  
  const value = await siteSettingsService.get(key);
  sendSuccess(res, { key, value }, 'Setting fetched successfully');
});

/**
 * Update or create a single setting
 */
export const upsertSetting = asyncHandler(async (req: Request, res: Response, _next: NextFunction) => {
  const { key, value, type = 'string', group = 'general', description } = req.body;
  
  if (!key || value === undefined) {
    throw new BadRequestError('Key and value are required');
  }
  
  const setting = await siteSettingsService.set(key, value, type, group, description);
  sendSuccess(res, setting, 'Setting saved successfully');
});

/**
 * Bulk update settings
 */
export const bulkUpdateSettings = asyncHandler(async (req: Request, res: Response, _next: NextFunction) => {
  const { settings } = req.body;
  
  if (!settings || !Array.isArray(settings)) {
    throw new BadRequestError('Settings array is required');
  }
  
  const results = [];
  
  for (const setting of settings) {
    const { key, value, type = 'string', group = 'general', description } = setting;
    
    if (!key || value === undefined) {
      continue; // Skip invalid entries
    }
    
    const result = await siteSettingsService.set(key, value, type, group, description);
    results.push(result);
  }
  
  sendSuccess(res, results, `${results.length} settings saved successfully`);
});

/**
 * Delete a setting by key
 */
export const deleteSetting = asyncHandler(async (req: Request, res: Response, _next: NextFunction) => {
  const { key } = req.params;
  
  if (!key) {
    throw new BadRequestError('Key is required');
  }
  
  await siteSettingsService.delete(key);
  sendSuccess(res, null, 'Setting deleted successfully');
});

/**
 * Get public settings (for frontend without authentication)
 * Only returns settings marked as public
 */
export const getPublicSettings = asyncHandler(async (_req: Request, res: Response, _next: NextFunction) => {
  const publicGroups = ['general', 'social'];
  const settings: Record<string, any> = {};
  
  for (const group of publicGroups) {
    const groupSettings = await siteSettingsService.getByGroup(group);
    Object.assign(settings, groupSettings);
  }
  
  sendSuccess(res, settings, 'Public settings fetched successfully');
});
