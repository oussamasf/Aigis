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

  async findOneUser(query: object): Promise<IUser | null> {
    return this.user.findOne(query);
  }
}

export const userService = new UserService(UserIns);
