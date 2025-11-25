import { logger } from '../common/logger';

export const seedRoles = async () => {
    logger.info('🌱 Seeding roles...');
    // In this architecture, roles are static enums in the User model.
    // If we had a Role model, we would create them here.
    logger.info('✅ Roles seeded (static enums).');
};
