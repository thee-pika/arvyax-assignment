import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { User } from "../types/interfaces/User";

export const AuthMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];

        if (!token) {
             res.status(401).json({ error: "Unauthorized! TOKEN IS REQUIRED" });
             return
        }

        const secret = process.env.JWT_SECRET as string;
        if (!secret) {
            res.status(500).json({ error: "JWT_SECRET IS NOT SET" });
            return;
        }

        const decoded = await jwt.verify(token, secret) as { user: User };

        if (!decoded) {
            res.status(401).json({ error: "Unauthorized! INVALID TOKEN" });
            return
        }

        req.user = decoded.user;
        next();
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
}

