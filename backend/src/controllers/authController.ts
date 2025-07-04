import { Request, Response } from "express";
import {  PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient()
const JWT_SECRET = process.env.JWT_SECRET || "defaultsecret";

export const register = async (req:Request, res:Response) => {
    const {name, email, password} = req.body;

    try {
        const existingUser = await prisma.user.findUnique({
            where: {email}
        });
        if (existingUser) {
            return res.status(400).json({message: "Email already registered"});
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
            },
        });
        
        const token = jwt.sign({userId : user.id}, JWT_SECRET, {expiresIn: "7d"});

        res.status(201).json({token, user: {id: user.id, email: user.email, name: user.name}});
    } catch (error) {
        res.status(500).json({message: "Registration failed", error});
    }
}

export const login = async (req: Request, res: Response) => {
    const {email, password} = req.body

    try {
        const user = await prisma.user.findUnique({where: {email}});
        if (!user) {
            return res.status(400).json({message: "Invalid email or password"});
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(400).json({message: "Invalid email or password"})
        }

        const token = jwt.sign({userId : user.id}, JWT_SECRET, {expiresIn: "7d"});

        res.status(200).json({token, user : {id: user.id, email: user.email, name: user.name}})
    } catch (error) {
        res.status(500).json({message: "Login failed", error})
    }
}