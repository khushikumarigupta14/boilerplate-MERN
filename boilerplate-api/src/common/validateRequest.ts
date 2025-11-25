import { Request, Response, NextFunction } from 'express';
import { AnyZodObject } from 'zod';
import { APIError } from './APIError';

export const validateRequest =
    (schema: AnyZodObject) => async (req: Request, res: Response, next: NextFunction) => {
        try {
            await schema.parseAsync({
                body: req.body,
                query: req.query,
                params: req.params,
            });
            return next();
        } catch (error: any) {
            const message = error.errors.map((e: any) => e.message).join(', ');
            next(new APIError(message, 400));
        }
    };
