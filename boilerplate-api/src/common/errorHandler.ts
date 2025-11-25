import { Request, Response, NextFunction } from 'express';
import { APIError } from './APIError';
import { logger } from './logger';
import { env } from '../config/env';

export const errorHandler = (
    err: Error | APIError,
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    let statusCode = 500;
    let message = 'Internal Server Error';

    if (err instanceof APIError) {
        statusCode = err.statusCode;
        message = err.message;
    }

    logger.error(`${statusCode} - ${message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);

    res.status(statusCode).json({
        status: 'error',
        statusCode,
        message,
        stack: env.NODE_ENV === 'development' ? err.stack : undefined,
    });
};
