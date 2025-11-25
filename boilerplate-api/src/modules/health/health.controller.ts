import { Request, Response } from 'express';
import { asyncHandler } from '../../common/asyncHandler';
import { sendResponse } from '../../common/responseHandler';
import { sequelize, prisma } from '../../database/connection';
import mongoose from 'mongoose';

export const checkHealth = asyncHandler(async (req: Request, res: Response) => {
    const healthStatus = {
        uptime: process.uptime(),
        message: 'OK',
        timestamp: Date.now(),
        database: 'disconnected',
    };

    if (mongoose.connection.readyState === 1) {
        healthStatus.database = 'connected (mongodb)';
    } else if (sequelize) {
        try {
            await sequelize.authenticate();
            healthStatus.database = 'connected (sequelize)';
        } catch {
            healthStatus.database = 'disconnected (sequelize)';
        }
    } else if (prisma) {
        try {
            await prisma.$queryRaw`SELECT 1`;
            healthStatus.database = 'connected (prisma)';
        } catch {
            healthStatus.database = 'disconnected (prisma)';
        }
    }

    sendResponse(res, 200, healthStatus, 'Health check passed');
});
