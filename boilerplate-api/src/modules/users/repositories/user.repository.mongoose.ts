import { IRepository } from '../../../database/repository.interface';
import { IUser } from '../user.interface';
import { UserModel, IUserDoc } from '../models/user.model.mongoose';

export class UserRepositoryMongoose implements IRepository<IUser> {
    async create(data: Partial<IUser>): Promise<IUser> {
        const user = await UserModel.create(data);
        return user.toObject();
    }

    async findById(id: string): Promise<IUser | null> {
        const user = await UserModel.findById(id);
        return user ? user.toObject() : null;
    }

    async findOne(query: any): Promise<IUser | null> {
        const user = await UserModel.findOne(query);
        return user ? user.toObject() : null;
    }

    async findMany(query: any): Promise<IUser[]> {
        const users = await UserModel.find(query);
        return users.map((u) => u.toObject());
    }

    async update(id: string, data: Partial<IUser>): Promise<IUser | null> {
        const user = await UserModel.findByIdAndUpdate(id, data, { new: true });
        return user ? user.toObject() : null;
    }

    async delete(id: string): Promise<boolean> {
        const result = await UserModel.findByIdAndDelete(id);
        return !!result;
    }

    async count(query: any): Promise<number> {
        return await UserModel.countDocuments(query);
    }
}
