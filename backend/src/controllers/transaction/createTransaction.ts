import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();
export const createTransaction = async (req: Request, res: Response) => {
  const userId = (req as any).userId;
  const { amount, category, type, note, date } = req.body;

  try {
    const newTransaction = await prisma.transaction.create({
      data: {
        amount,
        category,
        type,
        note,
        date: new Date(date),
        userId,
      },
    });
    res.status(201).json(newTransaction);
  } catch (error) {
    res.status(500).json({ message: "Гүйлгээ нэмэхэд алдаа гарлаа", error });
  }
};