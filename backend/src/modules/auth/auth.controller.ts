import type { Request, Response } from 'express';
import * as authService from './auth.service';
import type { ChangePasswordInput, LoginInput } from './auth.validators';
import { sendSuccess } from '../../shared/utils/response';
import { clearAuthCookies, COOKIE, setAuthCookies } from '../../shared/utils/tokens';
import { clientIp, userAgent } from '../../shared/utils/request-info';
import { AppError } from '../../shared/errors/app-error';

const meta = (req: Request) => ({ ip: clientIp(req), userAgent: userAgent(req) });

export async function login(req: Request, res: Response): Promise<void> {
  const { email, password } = req.body as LoginInput;
  const session = await authService.login(email, password, meta(req));
  setAuthCookies(res, session.accessToken, session.refreshToken);
  sendSuccess(res, { user: session.user }, 'Signed in');
}

export async function refresh(req: Request, res: Response): Promise<void> {
  try {
    const session = await authService.refresh(req.cookies?.[COOKIE.refresh], meta(req));
    setAuthCookies(res, session.accessToken, session.refreshToken);
    sendSuccess(res, { user: session.user }, 'Session refreshed');
  } catch (err) {
    if (err instanceof AppError && err.statusCode === 401) clearAuthCookies(res);
    throw err;
  }
}

export async function logout(req: Request, res: Response): Promise<void> {
  await authService.logout(req.cookies?.[COOKIE.refresh], req.user?.id);
  clearAuthCookies(res);
  sendSuccess(res, null, 'Signed out');
}

export async function me(req: Request, res: Response): Promise<void> {
  sendSuccess(res, { user: await authService.getMe(req.user!.id) });
}

export async function changePassword(req: Request, res: Response): Promise<void> {
  const { currentPassword, newPassword } = req.body as ChangePasswordInput;
  const session = await authService.changePassword(req.user!.id, currentPassword, newPassword, meta(req));
  setAuthCookies(res, session.accessToken, session.refreshToken);
  sendSuccess(res, { user: session.user }, 'Password updated');
}
