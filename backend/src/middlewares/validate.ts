import { Request, Response, NextFunction } from 'express';
import { validationResult, ValidationChain } from 'express-validator';
import { ValidationError } from '../utils/errors';

// Run validations and check for errors
export const validate = (validations: ValidationChain[]) => {
  return async (req: Request, _res: Response, next: NextFunction): Promise<void> => {
    // Run all validations
    await Promise.all(validations.map((validation) => validation.run(req)));

    // Check for errors
    const errors = validationResult(req);

    if (errors.isEmpty()) {
      return next();
    }

    // Format errors
    const formattedErrors = errors.array().map((error) => {
      if ('path' in error) {
        return {
          field: error.path,
          message: error.msg,
        };
      }
      return {
        field: 'unknown',
        message: error.msg,
      };
    });

    next(new ValidationError(formattedErrors));
  };
};

export default validate;
