import swaggerJsdoc from 'swagger-jsdoc';
import { env } from '../config/env';

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Boilerplate API',
            version: '1.0.0',
            description: 'Scalable Node.js + Express Backend Boilerplate API Documentation',
            contact: {
                name: 'API Support',
                email: 'support@example.com',
            },
        },
        servers: [
            {
                url: `http://localhost:${env.PORT}`,
                description: 'Development server',
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
            },
        },
        security: [
            {
                bearerAuth: [],
            },
        ],
    },
    apis: ['./src/modules/**/*.routes.ts', './src/modules/**/*.ts'], // Path to the API docs
};

export const specs = swaggerJsdoc(options);
