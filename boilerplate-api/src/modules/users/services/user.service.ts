import { env } from '../../../config/env';
import { UserMongooseRepository } from '../repositories/user.repository.mongoose';
import { UserPrismaRepository } from '../repositories/user.repository.prisma';
import { CreateUserDto } from '../dto/create-user.dto';

export class UserService {
    private repo: any;

    constructor() {
        if (env.DB_TYPE === 'mongodb') {
            this.repo = new UserMongooseRepository();
        } else {
            this.repo = new UserPrismaRepository();
        }
    }

    async createUser(dto: CreateUserDto) {
        return await this.repo.create(dto);
    }

    async getUsers(query: any) {
        return await this.repo.findAll(query);
    }

    async getUserById(id: string) {
        return await this.repo.findById(id);
    }

    async getUserByEmail(email: string) {
        return await this.repo.findOne({ email });
    }
}

export const userService = new UserService();
