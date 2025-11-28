import { IRepository } from '../../../database/repository.interface';
import { IUser } from '../interfaces/user.interface';
import { UserSequelize } from '../models/user.model.sequelize';

export class UserRepositorySequelize implements IRepository<IUser> {
    async create(data: Partial<IUser>): Promise<IUser> {
        const user = await UserSequelize.create(data as any);
        return user.toJSON();
    }

    async findById(id: string): Promise<IUser | null> {
        const user = await UserSequelize.findByPk(id);
        return user ? user.toJSON() : null;
    }

    async findOne(query: any): Promise<IUser | null> {
        const user = await UserSequelize.findOne({ where: query });
        return user ? user.toJSON() : null;
    }

    async findMany(query: any): Promise<IUser[]> {
        const users = await UserSequelize.findAll({ where: query });
        return users.map((u) => u.toJSON());
    }

    async update(id: string, data: Partial<IUser>): Promise<IUser | null> {
        const [affectedCount] = await UserSequelize.update(data, { where: { id } });
        if (affectedCount === 0) return null;
        return this.findById(id);
    }

    async delete(id: string): Promise<boolean> {
        const affectedCount = await UserSequelize.destroy({ where: { id } });
        return affectedCount > 0;
    }

    async count(query: any): Promise<number> {
        return await UserSequelize.count({ where: query });
    }
}
