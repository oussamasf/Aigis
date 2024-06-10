import { IUser } from "../../models/UserModel";

export interface IUserService {
  getAllUsers(): Promise<IUser[]>;
  createUser(data: IUser): Promise<IUser>;
}
