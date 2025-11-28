import { Request, Response, NextFunction } from 'express';
import { CreateUserSchema } from "../schemas/create-user.schema";
import { APIError } from '../../../common/APIError';

export const validateCreateUser = (req: Request, res: Response, next: NextFunction) => {
    const result = CreateUserSchema.safeParse(req.body);
    if (!result.success) {
        throw new APIError('Validation Error', 400);
    }
    next();
};
