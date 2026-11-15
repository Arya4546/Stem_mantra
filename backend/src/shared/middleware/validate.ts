import type { NextFunction, Request, Response } from 'express';
import type { ZodError, ZodTypeAny } from 'zod';
import { HttpStatus } from '../errors/app-error';

type Target = 'body' | 'params' | 'query';

/**
 * Validates and *replaces* req[target] with the parsed (coerced, trimmed, stripped) value.
 * Unknown keys are dropped by the schemas, so handlers only ever see whitelisted fields.
 */
export function validate(schema: ZodTypeAny, target: Target = 'body') {
  return (req: Request, res: Response, next: NextFunction): void => {
    const parsed = schema.safeParse(req[target] ?? {});
    if (!parsed.success) {
      res.status(HttpStatus.UNPROCESSABLE_ENTITY).json({
        success: false,
        message: firstMessage(parsed.error) ?? 'Validation failed',
        data: null,
        meta: { errors: formatZodErrors(parsed.error) },
      });
      return;
    }
    if (target === 'query') {
      // req.query is a getter in Express 5 — store the parsed copy separately.
      res.locals.query = parsed.data;
    } else if (target === 'params') {
      res.locals.params = parsed.data;
    } else {
      req.body = parsed.data;
    }
    next();
  };
}

function firstMessage(error: ZodError): string | undefined {
  return error.issues[0]?.message;
}

export function formatZodErrors(error: ZodError): Record<string, string> {
  const out: Record<string, string> = {};
  for (const issue of error.issues) {
    const key = issue.path.join('.') || '_';
    if (!out[key]) out[key] = issue.message;
  }
  return out;
}
