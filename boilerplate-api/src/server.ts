import app from './app';
import { env } from './config/env';
import { logger } from './common/logger';
import { connectDatabase } from './database/connection';

const startServer = async () => {
    await connectDatabase();

    app.listen(env.PORT, () => {
        logger.info(`🚀 Server running in ${env.NODE_ENV} mode on port ${env.PORT}`);
    });
};

startServer();
