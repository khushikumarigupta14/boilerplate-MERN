import { UserModel } from "../models/user.model.mongoose";

export class UserMongooseRepository {
    create(data: any) {
        return UserModel.create(data);
    }

    findAll(query: any) {
        return UserModel.find(query);
    }

    findById(id: string) {
        return UserModel.findById(id);
    }

    findOne(query: any) {
        return UserModel.findOne(query);
    }

    update(id: string, data: any) {
        return UserModel.findByIdAndUpdate(id, data, { new: true });
    }

    delete(id: string) {
        return UserModel.findByIdAndDelete(id);
    }
}
