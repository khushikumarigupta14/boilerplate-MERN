import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../../database/connection';
import { IUser } from '../user.interface';

export class UserSequelize extends Model<IUser> implements IUser {
    public id!: string;
    public name!: string;
    public email!: string;
    public password!: string;
    public role!: 'user' | 'admin';
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

export const initUserSequelize = () => {
    if (!sequelize) return;

    UserSequelize.init(
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            role: {
                type: DataTypes.ENUM('user', 'admin'),
                defaultValue: 'user',
            },
        },
        {
            sequelize,
            tableName: 'users',
        },
    );
};
