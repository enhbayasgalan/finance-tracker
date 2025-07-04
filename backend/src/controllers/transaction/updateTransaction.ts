import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();
export const updateTransaction = async (req: Request, res: Response) => {
    const { id } = req.params
    const userId = (req as any).userId
    const {amount, category, type, note, date} = req.body

    try {
        const existing = await prisma.transaction.findUnique({where: {id}})

        if (!existing || existing.userId !== userId) {
            return res.status(404).json({message : "Гүйлгээ олдсонгүй"})
        }

        const updated =  await prisma.transaction.update({
            where: {id},
            data: {
                amount,
                category,
                type,
                note,
                date: new Date(date),
            },
        })
        res.status(200).json(updated);
    } catch (error) {
        res.status(500).json({
            message: "Гүйлгээ засахад алдаа гарлаа", error
        })
    }
}