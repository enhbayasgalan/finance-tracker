
import { Request, Response } from "express";
import { PrismaClient, TransactionType } from "@prisma/client";

const prisma = new PrismaClient();


export const getTransactions = async (req: Request, res: Response) => {
  const userId = (req as any).userId

  try {
    const transactions = await prisma.transaction.findMany({
        where: {userId},
        orderBy: {date : "desc"},
    });
    res.status(200).json(transactions);
  } catch (error) {
    res.status(500).json({message: "Гүйлгээ авахад алдаа гарлаа", error })
  }
};

