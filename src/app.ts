import express, { Application } from "express";
import dotenv from "dotenv";
import database from "./config/Database";
import userRoutes from "./routes/UserRoutes";
import errorHandler from "./middlewares/ErrorHandler";
import logger from "./utils/Logger";

dotenv.config();
database.connect();

class App {
  public app: Application;

  constructor() {
    this.app = express();
    this.setMiddlewares();
    this.setRoutes();
    this.setErrorHandler();
  }

  private setMiddlewares(): void {
    this.app.use(express.json());
    this.app.use(logger);
  }

  private setRoutes(): void {
    this.app.use("/api/users", userRoutes);
  }

  private setErrorHandler(): void {
    this.app.use(errorHandler.handle);
  }

  public listen(port: number): void {
    this.app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  }
}

export default new App().app;
