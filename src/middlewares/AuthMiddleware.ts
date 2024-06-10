import { Request, Response, NextFunction } from "express";

class AuthMiddleware {
  static authorize(req: Request, res: Response, next: NextFunction): void {
    if (req.headers.authorization) {
      next();
    } else {
      res.status(401).json({ message: "Unauthorized" });
    }
  }
}

export default AuthMiddleware;
