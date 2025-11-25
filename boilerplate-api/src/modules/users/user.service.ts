import { env } from '../../config/env';
import { IRepository } from '../../database/repository.interface';
import { IUser } from './user.interface';
import { UserRepositoryMongoose } from './repositories/user.repository.mongoose';
import { UserRepositoryPrisma } from './repositories/user.repository.prisma';
import { UserRepositorySequelize } from './repositories/user.repository.sequelize';

class UserService {
    private repository: IRepository<IUser>;

    constructor() {
        if (env.DB_TYPE === 'mongodb') {
            this.repository = new UserRepositoryMongoose();
        } else if (env.DB_TYPE === 'postgres-prisma') {
            this.repository = new UserRepositoryPrisma();
        } else {
            this.repository = new UserRepositorySequelize();
        }
    }

    async createUser(data: Partial<IUser>) {
        return await this.repository.create(data);
    }

    async getUserById(id: string) {
        return await this.repository.findById(id);
    }

    async getUserByEmail(email: string) {
        return await this.repository.findOne({ email });
    }

    async getAllUsers() {
        return await this.repository.findMany({});
    }

    async updateUser(id: string, data: Partial<IUser>) {
        return await this.repository.update(id, data);
    }

    async deleteUser(id: string) {
        return await this.repository.delete(id);
    }
}

export const userService = new UserService();
