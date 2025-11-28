import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class UserPrismaRepository {
    create(data: any) {
        return prisma.user.create({ data });
    }

    findAll(query: any) {
        return prisma.user.findMany({ where: query });
    }

    findById(id: string) {
        return prisma.user.findUnique({ where: { id } });
    }

    findOne(query: any) {
        return prisma.user.findFirst({ where: query });
    }

    update(id: string, data: any) {
        return prisma.user.update({ where: { id }, data });
    }

    delete(id: string) {
        return prisma.user.delete({ where: { id } });
    }
}
