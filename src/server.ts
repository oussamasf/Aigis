import app from "./app";
import dotenv from "dotenv";

dotenv.config();

const PORT: number = parseInt(process.env.PORT as string, 10) || 5000;

app.listen(PORT);
