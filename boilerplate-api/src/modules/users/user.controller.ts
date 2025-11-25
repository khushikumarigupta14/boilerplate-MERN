import { Request, Response } from 'express';
import { userService } from './user.service';
import { asyncHandler } from '../../common/asyncHandler';
import { sendResponse } from '../../common/responseHandler';
import { APIError } from '../../common/APIError';

export const createUser = asyncHandler(async (req: Request, res: Response) => {
    const existingUser = await userService.getUserByEmail(req.body.email);
    if (existingUser) {
        throw new APIError('User already exists', 400);
    }
    const user = await userService.createUser(req.body);
    sendResponse(res, 201, user, 'User created successfully');
});

export const getUsers = asyncHandler(async (req: Request, res: Response) => {
    const users = await userService.getAllUsers();
    sendResponse(res, 200, users, 'Users retrieved successfully');
});

export const getUser = asyncHandler(async (req: Request, res: Response) => {
    const user = await userService.getUserById(req.params.id);
    if (!user) {
        throw new APIError('User not found', 404);
    }
    sendResponse(res, 200, user, 'User retrieved successfully');
});
