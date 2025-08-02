import prisma from "../lib/db"
import { createSessionSchema } from "../types";
import { Request, Response } from "express";

const createSession = async (req: Request, res: Response) => {
    try {
        console.log("im in",req.body);
        const parsedData = createSessionSchema.safeParse(req.body);
        if (!parsedData.success) {
            return res.status(400).json({ error: parsedData.error.message });
        }

        const user = req.user;

        if (!user) {
            res.status(401).json({ error: "Unauthorized! TOKEN IS REQUIRED" });
            return;
        }
        const session = await prisma.session.create({
            data: {
                title: parsedData.data.title,
                tags: parsedData.data.tags,
                json_file_url: parsedData.data.json_file_url,
                status: parsedData.data.status,
                userId: user.id,
            }
        })

        res.status(201).json({ message: "Session created successfully", session });
    } catch (error) {
        
    }
}

const getSessions = async (req: Request, res: Response) => {
    try {
        const user = req.user;

        if (!user) {
            res.status(401).json({ error: "Unauthorized! TOKEN IS REQUIRED" });
            return;
        }

        const sessions = await prisma.session.findMany({});

        res.status(200).json({ sessions });
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
}

const getUserSessions = async (req: Request, res: Response) => {
    try {
        const user = req.user;

        if (!user) {
            res.status(401).json({ error: "Unauthorized! TOKEN IS REQUIRED" });
            return;
        }

        const sessions = await prisma.session.findMany({
            where: {
                userId: user.id,
            },
            orderBy: {
                createdAt: "desc",
            },
        })

        res.status(200).json({ sessions });
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
}

const getSession = async (req: Request, res: Response) => {

    try {
        const { id } = req.params;

        if (!id) {
            res.status(400).json({ error: "Session ID is required" });
            return;
        }

        const session = await prisma.session.findFirst({
            where: {
                id,
            }
        })

        if (!session) {
            res.status(404).json({ error: "Session not found" });
            return;
        }

        res.status(200).json({ session });

    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
}

const updateSession = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        if (!id) {
            res.status(400).json({ error: "Session ID is required" });
            return;
        }

        const session = await prisma.session.findFirst({
            where: {
                id,
            }
        })

        if (!session) {
            res.status(404).json({ error: "Session not found" });
            return;
        }
        const updatedSession = await prisma.session.update({
            where: {
                id,
            },
            data: req.body,
        })

        res.status(200).json({ message: "Session updated successfully", updatedSession });

    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
}

const deleteSession = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        if (!id) {
            res.status(400).json({ error: "Session ID is required" });
            return;
        }

        const session = await prisma.session.findFirst({
            where: {
                id,
            }
        })

        if (!session) {
            res.status(404).json({ error: "Session not found" });
            return;
        }

        await prisma.session.delete({
            where: {
                id,
            }
        })

        res.status(200).json({ message: "Session deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
}

export { createSession, getSessions, getSession, updateSession, deleteSession , getUserSessions};

