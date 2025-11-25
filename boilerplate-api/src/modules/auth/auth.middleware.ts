import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { env } from '../../config/env';
import { APIError } from '../../common/APIError';
import { userService } from '../users/user.service';

export interface AuthRequest extends Request {
    user?: any;
}

export const protect = async (req: AuthRequest, res: Response, next: NextFunction) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
        return next(new APIError('Not authorized to access this route', 401));
    }

    try {
        const decoded = jwt.verify(token, env.JWT_SECRET) as { id: string };
        const user = await userService.getUserById(decoded.id);

        if (!user) {
            return next(new APIError('No user found with this id', 404));
        }

        req.user = user;
        next();
    } catch (error) {
        return next(new APIError('Not authorized to access this route', 401));
    }
};

export const authorize = (...roles: string[]) => {
    return (req: AuthRequest, res: Response, next: NextFunction) => {
        if (!roles.includes(req.user.role)) {
            return next(new APIError(`User role ${req.user.role} is not authorized to access this route`, 403));
        }
        next();
    };
};
