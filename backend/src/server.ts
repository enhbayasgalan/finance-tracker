// backend/server.ts
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";
import Authrouter from "./routes/authRoutes";
import transactionRoutes from "./routes/transactionRoutes";

dotenv.config();
const app = express();


app.use(cors());
app.use(express.json());

app.use("/api/auth", Authrouter);
app.use("/api/transactions", transactionRoutes);

app.get("/", (req, res) => {
  res.send("API working!");
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
