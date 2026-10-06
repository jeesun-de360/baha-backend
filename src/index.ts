import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";
import routes from "./routes/routes";
import { connectToDatabase } from "./database/config";

if (!process.env.BH_PORT) {
  process.exit(1);
}

const PORT: number = parseInt(process.env.BH_PORT as string, 10);
const app = express();

// Enable CORS for all origins (Express)
app.use(cors()); // Allow origin all
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/v1/", routes);

app.get("/", (req, res) => {
  res.send(`Server is Running!`);
});

app.use((req, res) => {
  res.status(404).json({ message: "Api Not Found" });
});

app.listen(PORT, async () => {
  await connectToDatabase();
  console.log(`Listening on port ${PORT}`);
});
