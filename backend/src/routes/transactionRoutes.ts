import express from "express";
const transactionRoutes = express.Router();

import auth from "../middleware/auth";
import { getTransactions } from "../controllers/transaction/getTransactions";
import { createTransaction } from "../controllers/transaction/createTransaction";
import { updateTransaction } from "../controllers/transaction/updateTransaction";
import { deleteTransaction } from "../controllers/transaction/deleteTransaction";

// Бүх гүйлгээний route-д JWT шаардлагатай
transactionRoutes.use(auth);

transactionRoutes.get('/', getTransactions)
transactionRoutes.post('/', createTransaction)
transactionRoutes.put('/:id', updateTransaction)
transactionRoutes.delete('/:id', deleteTransaction)

export default transactionRoutes;