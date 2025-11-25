import { connectDatabase } from '../database/connection';
// import { seedUsers } from './users.seed';
// import { seedProducts } from './products.seed';
// import { seedRoles } from './roles.seed';
import mongoose from 'mongoose';
import { logger } from '../common/logger';
import { seedRoles } from './roles.seed';
import { seedUsers } from './users.seed';
import { seedProducts } from './products.seed';

const runSeed = async () => {
    const mode = process.argv[2]; // 'strict' or 'safe'

    if (!['strict', 'safe'].includes(mode)) {
        logger.error('❌ Invalid mode. Use "strict" or "safe".');
        process.exit(1);
    }

    try {
        await connectDatabase();
        logger.info(`🌱 Starting seeding in ${mode} mode...`);

        if (mode === 'strict') {
            logger.warn('⚠️ Strict mode: Wiping database...');
            if (mongoose.connection.readyState === 1) {
                await mongoose.connection.dropDatabase();
            }
            // Add logic for other DB types if needed
        }

        await seedRoles();
        await seedUsers(mode);
        await seedProducts(mode);

        logger.info('✅ Seeding completed successfully.');
        process.exit(0);
    } catch (error) {
        logger.error('❌ Seeding failed:', error);
        process.exit(1);
    }
};

runSeed();
