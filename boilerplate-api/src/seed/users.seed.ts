import { faker } from '@faker-js/faker';
import { UserModel } from '../modules/users/models/user.model.mongoose';
import { logger } from '../common/logger';
import bcrypt from 'bcryptjs';

export const seedUsers = async (mode: string) => {
    logger.info('🌱 Seeding users...');

    if (mode === 'safe') {
        const count = await UserModel.countDocuments();
        if (count > 0) {
            logger.info('⏩ Users already exist, skipping safe seed.');
            return;
        }
    }

    // Create Admin
    const adminEmail = 'admin@example.com';
    const adminExists = await UserModel.findOne({ email: adminEmail });

    if (!adminExists) {
        const hashedPassword = await bcrypt.hash('Admin@123', 10);
        await UserModel.create({
            name: 'Admin User',
            email: adminEmail,
            password: hashedPassword,
            role: 'admin',
        });
        logger.info('👤 Admin user created.');
    }

    // Create Random Users
    const usersToCreate = 10;
    const users = [];
    const password = await bcrypt.hash('User@123', 10);

    for (let i = 0; i < usersToCreate; i++) {
        users.push({
            name: faker.person.fullName(),
            email: faker.internet.email(),
            password: password,
            role: 'user',
        });
    }

    await UserModel.insertMany(users);
    logger.info(`👥 ${usersToCreate} random users created.`);
};
