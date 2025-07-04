import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";


const prisma = new PrismaClient();
export const deleteTransaction = async (req: Request, res: Response) => {
    const { id } = req.params
    const userId = (req as any).userId

    try {
        const existing = await prisma.transaction.findUnique({
            where: {id}
        })

        if (!existing || existing.userId !== userId) {
      return res.status(404).json({ message: "Гүйлгээ олдсонгүй" });
    }

    await prisma.transaction.delete({where: {id}});
    res.status(200).json({message: "Гүйлгээ амжилттай устгалаа"})
    } catch (error) {
        res.status(500).json({ message: "Гүйлгээ устгахад алдаа гарлаа", error})
    }
}