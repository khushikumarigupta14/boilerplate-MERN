import { IRepository } from '../../../database/repository.interface';
import { IUser } from '../user.interface';
import { prisma } from '../../../database/connection';

export class UserRepositoryPrisma implements IRepository<IUser> {
    async create(data: Partial<IUser>): Promise<IUser> {
        const user = await prisma!.user.create({
            data: {
                name: data.name!,
                email: data.email!,
                password: data.password!,
                role: data.role || 'user',
            },
        });
        return user as IUser;
    }

    async findById(id: string): Promise<IUser | null> {
        const user = await prisma!.user.findUnique({ where: { id } });
        return user as IUser | null;
    }

    async findOne(query: any): Promise<IUser | null> {
        const user = await prisma!.user.findFirst({ where: query });
        return user as IUser | null;
    }

    async findMany(query: any): Promise<IUser[]> {
        const users = await prisma!.user.findMany({ where: query });
        return users as IUser[];
    }

    async update(id: string, data: Partial<IUser>): Promise<IUser | null> {
        const user = await prisma!.user.update({ where: { id }, data });
        return user as IUser | null;
    }

    async delete(id: string): Promise<boolean> {
        await prisma!.user.delete({ where: { id } });
        return true;
    }

    async count(query: any): Promise<number> {
        return await prisma!.user.count({ where: query });
    }
}
