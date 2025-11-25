import { Request, Response } from 'express';
import { authService } from './auth.service';
import { asyncHandler } from '../../common/asyncHandler';
import { sendResponse } from '../../common/responseHandler';

export const register = asyncHandler(async (req: Request, res: Response) => {
    const result = await authService.register(req.body);
    sendResponse(res, 201, result, 'User registered successfully');
});

export const login = asyncHandler(async (req: Request, res: Response) => {
    const result = await authService.login(req.body);
    sendResponse(res, 200, result, 'Login successful');
});

export const refresh = asyncHandler(async (req: Request, res: Response) => {
    const result = await authService.refresh(req.body.refreshToken);
    sendResponse(res, 200, result, 'Token refreshed successfully');
});
