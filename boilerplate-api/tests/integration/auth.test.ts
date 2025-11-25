import request from 'supertest';
import app from '../../src/app';
import mongoose from 'mongoose';
import { UserModel } from '../../src/modules/users/models/user.model.mongoose';

describe('Auth Endpoints', () => {
    beforeAll(async () => {
        // Connect to a test database or ensure the current one is clean
        // For simplicity, we assume the dev DB or a separate test env is used
        if (mongoose.connection.readyState === 0) {
            // Connection logic is handled in server.ts but app.ts doesn't connect.
            // We need to connect manually for tests if we want to mock or use real DB.
            // In this boilerplate, we'll mock the connection or just rely on the fact that
            // the app might need a connection.
            // Actually, app.ts exports 'app' but doesn't call connectDatabase().
            // server.ts calls it.
            // So we need to connect here.
            const { connectDatabase } = await import('../../src/database/connection');
            await connectDatabase();
        }
    });

    afterAll(async () => {
        await UserModel.deleteMany({ email: 'test@example.com' });
        await mongoose.connection.close();
    });

    it('should register a new user', async () => {
        const res = await request(app).post('/api/v1/auth/register').send({
            name: 'Test User',
            email: 'test@example.com',
            password: 'password123',
        });

        expect(res.status).toBe(201);
        expect(res.body.data.user).toHaveProperty('email', 'test@example.com');
        expect(res.body.data).toHaveProperty('tokens');
    });

    it('should login the user', async () => {
        const res = await request(app).post('/api/v1/auth/login').send({
            email: 'test@example.com',
            password: 'password123',
        });

        expect(res.status).toBe(200);
        expect(res.body.data).toHaveProperty('tokens');
    });
});
