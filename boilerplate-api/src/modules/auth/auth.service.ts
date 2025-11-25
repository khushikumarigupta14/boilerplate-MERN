import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { env } from '../../config/env';
import { userService } from '../users/user.service';
import { APIError } from '../../common/APIError';
import { IUser } from '../users/user.interface';

class AuthService {
    async register(data: IUser) {
        const existingUser = await userService.getUserByEmail(data.email);
        if (existingUser) {
            throw new APIError('User already exists', 400);
        }

        const hashedPassword = await bcrypt.hash(data.password!, 10);
        const user = await userService.createUser({
            ...data,
            password: hashedPassword,
        });

        const tokens = this.generateTokens(user.id!);
        return { user, tokens };
    }

    async login(data: Pick<IUser, 'email' | 'password'>) {
        const user = await userService.getUserByEmail(data.email);
        if (!user || !user.password) {
            throw new APIError('Invalid credentials', 401);
        }

        const isMatch = await bcrypt.compare(data.password!, user.password!);
        if (!isMatch) {
            throw new APIError('Invalid credentials', 401);
        }

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { password, ...userWithoutPassword } = user;
        const tokens = this.generateTokens(user.id!);
        return { user: userWithoutPassword, tokens };
    }

    async refresh(refreshToken: string) {
        try {
            const decoded = jwt.verify(refreshToken, env.JWT_REFRESH_SECRET) as { id: string };
            const user = await userService.getUserById(decoded.id);
            if (!user) {
                throw new APIError('User not found', 401);
            }

            const tokens = this.generateTokens(user.id!);
            return { tokens };
        } catch (error) {
            throw new APIError('Invalid refresh token', 401);
        }
    }

    private generateTokens(userId: string) {
        const accessToken = jwt.sign({ id: userId }, env.JWT_SECRET, {
            expiresIn: env.JWT_EXPIRES_IN,
        } as jwt.SignOptions);
        const refreshToken = jwt.sign({ id: userId }, env.JWT_REFRESH_SECRET, {
            expiresIn: env.JWT_REFRESH_EXPIRES_IN,
        } as jwt.SignOptions);

        return { accessToken, refreshToken };
    }
}

export const authService = new AuthService();
