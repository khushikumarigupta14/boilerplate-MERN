import dotenv from 'dotenv';
import { z } from 'zod';

dotenv.config();

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  PORT: z.string().default('3000'),
  DB_TYPE: z
    .enum(['mongodb', 'postgres-prisma', 'postgres-sequelize', 'mysql-sequelize'])
    .default('mongodb'),
  MONGO_URI: z.string().optional(),
  POSTGRES_URI: z.string().optional(),
  MYSQL_URI: z.string().optional(),
  JWT_SECRET: z.string().default('secret'),
  JWT_EXPIRES_IN: z.string().default('1d'),
  JWT_REFRESH_SECRET: z.string().default('refresh-secret'),
  JWT_REFRESH_EXPIRES_IN: z.string().default('7d'),
  FRONTEND_URL: z.string().default('http://localhost:5173'),
});

const _env = envSchema.safeParse(process.env);

if (!_env.success) {
  console.error('❌ Invalid environment variables:', _env.error.format());
  throw new Error('Invalid environment variables');
}

export const env = _env.data;
