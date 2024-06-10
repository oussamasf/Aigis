import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

class Database {
  private static instance: Database;
  private constructor() {
    this.connect();
  }

  public connect(): void {
    mongoose
      .connect(process.env.DB_URL as string, {})
      .then(() => {
        console.log("MongoDB connected");
      })
      .catch((err: Error) => {
        console.error(err.message);
        process.exit(1);
      });
  }

  public static getInstance(): Database {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }
}

export default Database.getInstance();
