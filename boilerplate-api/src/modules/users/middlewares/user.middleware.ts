import { Request, Response, NextFunction } from 'express';

export const ensureUserExists = (req: Request, res: Response, next: NextFunction) => {
    // custom logic
    next();
};
