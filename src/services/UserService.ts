import { IUserModel } from "../models/@types";
import { IUser, UserIns } from "../models/UserModel";
import { IUserService } from "./@type";

class UserService implements IUserService {
  constructor(private user: IUserModel) {}

  async getAllUsers(): Promise<IUser[]> {
    return this.user.find();
  }

  async createUser(data: IUser): Promise<IUser> {
    return this.user.create(data);
  }
}

export const userService = new UserService(UserIns);
