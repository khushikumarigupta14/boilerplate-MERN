import { faker } from '@faker-js/faker';
import { ProductModel } from '../modules/product/models/product.model.mongoose';
import { logger } from '../common/logger';

export const seedProducts = async (mode: string) => {
    logger.info('🌱 Seeding products...');

    if (mode === 'safe') {
        const count = await ProductModel.countDocuments();
        if (count > 0) {
            logger.info('⏩ Products already exist, skipping safe seed.');
            return;
        }
    }

    const productsToCreate = 20;
    const products = [];

    for (let i = 0; i < productsToCreate; i++) {
        products.push({
            name: faker.commerce.productName(),
            // Add other fields if Product model has them
        });
    }

    await ProductModel.insertMany(products);
    logger.info(`📦 ${productsToCreate} random products created.`);
};
