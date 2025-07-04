import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes";
import transactionRoutes from "./routes/transactionRoutes";
import { errorHandler } from "./middleware/errorHandler";


dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors())
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/transactions", transactionRoutes);


app.use(errorHandler);

app.get("/", (_req, res) => {
  res.send("Server is running 🚀");
});

app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});