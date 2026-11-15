export enum HttpStatus {
  OK = 200,
  CREATED = 201,
  NO_CONTENT = 204,
  NOT_MODIFIED = 304,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  CONFLICT = 409,
  PAYLOAD_TOO_LARGE = 413,
  UNSUPPORTED_MEDIA_TYPE = 415,
  UNPROCESSABLE_ENTITY = 422,
  LOCKED = 423,
  TOO_MANY_REQUESTS = 429,
  INTERNAL_SERVER_ERROR = 500,
  BAD_GATEWAY = 502,
  SERVICE_UNAVAILABLE = 503,
}

export class AppError extends Error {
  public readonly statusCode: HttpStatus;
  public readonly isOperational: boolean;
  public readonly details?: Record<string, string>;

  constructor(
    message: string,
    statusCode: HttpStatus = HttpStatus.INTERNAL_SERVER_ERROR,
    details?: Record<string, string>,
  ) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;
    this.details = details;
    Object.setPrototypeOf(this, AppError.prototype);
    Error.captureStackTrace(this, this.constructor);
  }

  static badRequest(message: string, details?: Record<string, string>): AppError {
    return new AppError(message, HttpStatus.BAD_REQUEST, details);
  }
  static unauthorized(message = 'Authentication required'): AppError {
    return new AppError(message, HttpStatus.UNAUTHORIZED);
  }
  static forbidden(message = 'You do not have permission to do this'): AppError {
    return new AppError(message, HttpStatus.FORBIDDEN);
  }
  static notFound(resource = 'Resource'): AppError {
    return new AppError(`${resource} not found`, HttpStatus.NOT_FOUND);
  }
  static conflict(message: string, details?: Record<string, string>): AppError {
    return new AppError(message, HttpStatus.CONFLICT, details);
  }
  static unprocessable(message: string, details?: Record<string, string>): AppError {
    return new AppError(message, HttpStatus.UNPROCESSABLE_ENTITY, details);
  }
}
