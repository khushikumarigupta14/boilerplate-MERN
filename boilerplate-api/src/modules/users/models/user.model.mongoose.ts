import mongoose, { Schema, Document } from 'mongoose';
import { IUser } from '../user.interface';

export interface IUserDoc extends IUser, Document {
    id: string; // Mongoose virtual id
}

const UserSchema = new Schema<IUserDoc>(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true, select: false },
        role: { type: String, enum: ['user', 'admin'], default: 'user' },
    },
    {
        timestamps: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    },
);

export const UserModel = mongoose.model<IUserDoc>('User', UserSchema);
