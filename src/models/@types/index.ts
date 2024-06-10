import { IUser } from "../UserModel";

export interface IUserModel {
  find(): Promise<IUser[]>;
  create(data: IUser): Promise<IUser>;
  findOne(query: object): Promise<IUser | null>;
}
