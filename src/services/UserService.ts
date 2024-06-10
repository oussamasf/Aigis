import { RedisClient, redisClient } from "../config/RedisClient";
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

class CachingProxyService implements IUserService {
  constructor(
    private userService: IUserService,
    private redisClient: ReturnType<typeof RedisClient.getInstance>
  ) {}

  async getAllUsers(): Promise<IUser[]> {
    return this.userService.getAllUsers();
  }

  async createUser(data: IUser): Promise<IUser> {
    return this.userService.createUser(data);
  }

  async findOneUser(query: { email: string }): Promise<IUser | null> {
    // Check the cache first
    const key: string = query.email;
    const cachedData = await this.redisClient.get(query.email);
    if (cachedData) {
      console.log(
        `CachingProxyService: Returning cached data for key: ${query.email}`
      );
      return JSON.parse(cachedData);
    } else {
      console.log(
        `CachingProxyService: No cached data for key: ${query.email}. Fetching from RealDataService.`
      );
      const data = await this.userService.findOneUser({});
      if (!data) throw new Error();
      await this.redisClient.set(key, JSON.stringify(data));
      return data;
    }
  }
}
const service = new UserService(UserIns);
export const userService = new CachingProxyService(service, redisClient);
