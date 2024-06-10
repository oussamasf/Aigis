import { Request, Response } from "express";
import { userService } from "../services/UserService";
import { IUserService } from "../services/@type";

class UserController {
  constructor(private userService: IUserService) {}
  async getUsers(req: Request, res: Response): Promise<void> {
    try {
      const users = await this.userService.getAllUsers();
      res.status(200).json(users);
    } catch (err) {
      console.log((err as Error).stack);
      res.status(500).json({ message: (err as Error).message });
    }
  }

  async createUser(req: Request, res: Response): Promise<void> {
    try {
      const user = await this.userService.createUser(req.body);
      res.status(201).json(user);
    } catch (err) {
      console.log((err as Error).stack);
      res.status(400).json({ message: (err as Error).message });
    }
  }

  async findUser(req: Request, res: Response): Promise<void> {
    try {
      const user = await this.userService.findOneUser({
        email: req.params.email,
      });
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({ message: "User not found" });
      }
    } catch (err) {
      console.log((err as Error).stack);
      res.status(500).json({ message: (err as Error).message });
    }
  }
}

export const userController = new UserController(userService);
