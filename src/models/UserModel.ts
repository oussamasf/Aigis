import mongoose, { Document, Schema, Model } from "mongoose";
import { IUserModel } from "./@types";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
}

const UserSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const UserModel: Model<IUser> = mongoose.model<IUser>("User", UserSchema);

class User implements IUserModel {
  constructor(private model: Model<IUser>) {}

  async find(): Promise<IUser[]> {
    return this.model.find().exec();
  }

  async create(data: IUser): Promise<IUser> {
    const user = new this.model(data);
    return user.save();
  }
}

export const UserIns = new User(UserModel);
