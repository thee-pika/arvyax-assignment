import { Request, Response } from "express";
import { loginSchema, registerSchema } from "../types";
import prisma from "../lib/db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { config } from "dotenv";
config();

const createAccount = async (req: Request, res: Response) => {
    try {
 
        const parsedData = await registerSchema.safeParse(req.body);

        if (!parsedData.success) {
            res.status(400).json({ success: false, error: parsedData.error.message });
            return
        }

        const user = await prisma.user.findFirst({
            where: { email: parsedData.data.email },
        });

        if (user) {
            res.status(401).json({ success: false, error: "User Already exists" });
            return
        }

        const hashedPassword = await bcrypt.hash(parsedData.data.password, 10);

        const newUser = await prisma.user.create({
            data: {
                ...parsedData.data,
                password: hashedPassword,
            },
        });

        res.status(201).json({ success: true, message: "User created successfully", newUser });
    } catch (error) {
        res.status(500).json({ success: false, error: "Internal server error" });
    }
};

const Login = async (req: Request, res: Response) => {
    try {
     
        const parsedData = await loginSchema.safeParse(req.body);

        if (!parsedData.success) {
            res.status(400).json({ success: false, error: parsedData.error.message });
            return
        }

        const user = await prisma.user.findFirst({
            where: { email: parsedData.data.email },
        });

        if (!user) {
            res.status(401).json({ success: false, error: "User Not found" });
            return
        }

        const isPasswordValid = await bcrypt.compare(parsedData.data.password, user.password);

        if (!isPasswordValid) {
            res.status(401).json({ success : false, error: "Invalid credentials" });
            return
        }

        const token = await jwt.sign({ user }, process.env.JWT_SECRET as string, { expiresIn: "2h" });

        res.status(200).json({ success: true, message: "Login successful", token , user });
    } catch (error) {
        res.status(500).json({ success: false, error: "Internal server error" });
    }
};

export { createAccount, Login };

