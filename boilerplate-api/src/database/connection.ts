import mongoose from 'mongoose';
import { Sequelize } from 'sequelize';
import { PrismaClient } from '@prisma/client';
import { env } from '../config/env';
import { logger } from '../common/logger';

export let sequelize: Sequelize | null = null;
export let prisma: PrismaClient | null = null;

export const connectDatabase = async () => {
    switch (env.DB_TYPE) {
        case 'mongodb':
            await connectMongoDB();
            break;
        case 'postgres-sequelize':
        case 'mysql-sequelize':
            await connectSequelize();
            break;
        case 'postgres-prisma':
            await connectPrisma();
            break;
        default:
            throw new Error(`Unsupported DB_TYPE: ${env.DB_TYPE}`);
    }
};

const connectMongoDB = async () => {
    try {
        if (!env.MONGO_URI) throw new Error('MONGO_URI is not defined');
        await mongoose.connect(env.MONGO_URI);
        logger.info('✅ MongoDB Connected');
    } catch (error) {
        logger.error('❌ MongoDB Connection Error:', error);
        process.exit(1);
    }
};

const connectSequelize = async () => {
    try {
        const uri = env.DB_TYPE === 'postgres-sequelize' ? env.POSTGRES_URI : env.MYSQL_URI;
        if (!uri) throw new Error(`${env.DB_TYPE} URI is not defined`);

        sequelize = new Sequelize(uri, {
            logging: (msg) => logger.debug(msg),
            dialect: env.DB_TYPE === 'postgres-sequelize' ? 'postgres' : 'mysql',
        });

        // Initialize Models
        const { initUserSequelize } = await import('../modules/users/models/user.model.sequelize');
        initUserSequelize();

        await sequelize.sync();
        await sequelize.authenticate();
        logger.info(`✅ ${env.DB_TYPE} Connected`);
    } catch (error) {
        logger.error(`❌ ${env.DB_TYPE} Connection Error:`, error);
        process.exit(1);
    }
};

const connectPrisma = async () => {
    try {
        prisma = new PrismaClient();
        await prisma.$connect();
        logger.info('✅ Prisma (PostgreSQL) Connected');
    } catch (error) {
        logger.error('❌ Prisma Connection Error:', error);
        process.exit(1);
    }
};
