import { Request, Response, NextFunction } from 'express';
import { config } from '../config';

export interface AppError extends Error {
  statusCode?: number;
  isOperational?: boolean;
}

export function errorHandler(
  err: AppError,
  _req: Request,
  res: Response,
  _next: NextFunction
): void {
  const statusCode = err.statusCode || 500;
  const isDev = config.isDev;

  console.error(`[Error] ${statusCode} - ${err.message}`);
  if (isDev) {
    console.error(err.stack);
  }

  if (statusCode >= 500) {
    res.status(statusCode).json({
      success: false,
      message: isDev ? err.message : 'An unexpected error occurred. Please try again.',
      ...(isDev && { stack: err.stack }),
    });
  } else {
    res.status(statusCode).json({
      success: false,
      message: err.message,
    });
  }
}

export function notFoundHandler(_req: Request, res: Response): void {
  res.status(404).json({
    success: false,
    message: 'The requested resource was not found',
  });
}
