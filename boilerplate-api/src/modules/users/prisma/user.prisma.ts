import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const UserPrismaModel = {
    create: (data: any) => prisma.user.create({ data }),
};
