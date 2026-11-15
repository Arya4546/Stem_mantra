import { Router } from 'express';
import * as ctrl from './auth.controller';
import { changePasswordSchema, loginSchema } from './auth.validators';
import { validate } from '../../shared/middleware/validate';
import { authenticate } from '../../shared/middleware/auth';
import { asyncHandler } from '../../shared/utils/async-handler';
import { authLimiter } from '../../config/rate-limit';

const router = Router();

router.post('/login', authLimiter, validate(loginSchema), asyncHandler(ctrl.login));
router.post('/refresh', authLimiter, asyncHandler(ctrl.refresh));
router.post('/logout', asyncHandler(ctrl.logout));
router.get('/me', authenticate, asyncHandler(ctrl.me));
router.post('/change-password', authenticate, authLimiter, validate(changePasswordSchema), asyncHandler(ctrl.changePassword));

export { router as authRoutes };
