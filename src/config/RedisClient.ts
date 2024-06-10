import { createClient } from "redis";
import dotenv from "dotenv";

dotenv.config();

class RedisClient {
  private static instance: ReturnType<typeof createClient>;

  private constructor() {}

  public static getInstance(): ReturnType<typeof createClient> {
    if (!RedisClient.instance) {
      RedisClient.instance = createClient({
        url: process.env.REDIS_URL || "redis://localhost:6379",
      });

      RedisClient.instance.on("error", (err) =>
        console.error("Redis Client Error", err)
      );

      RedisClient.instance.connect().catch(console.error);
    }
    return RedisClient.instance;
  }
}

export default RedisClient.getInstance();
