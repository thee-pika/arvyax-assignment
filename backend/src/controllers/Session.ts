import prisma from "../lib/db"
import { createSessionSchema } from "../types";
import { Request, Response } from "express";
import { uploadImageToCloudinary } from "../utils/imageUpload";

const createSession = async (req: Request, res: Response) => {
        try {
          
        const parsedData = createSessionSchema.safeParse(req.body);
        if (!parsedData.success) {
            return res.status(400).json({ success: false, error: parsedData.error.message });
        }

        const user = req.user;

        if (!user) {
            res.status(401).json({ success: false, error: "Unauthorized! TOKEN IS REQUIRED" });
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

        res.status(201).json({ success: true, message: "Session created successfully", session });
    } catch (error) {

    }
}

const uploadJsonToCloud = async (req: Request, res: Response) => {
    try {
        if (!req.file) {
            res.status(400).json({
                error: "Avatar is required"
            });
            return;
        }

        const result = await uploadImageToCloudinary(req.file.buffer);

        const { url, id } = JSON.parse(result);
        res.json({ success: true, fileUrl: url, fileId: id })
    } catch (error) {
        res.status(500).json({ success: false, error: "Internal server error" });
    }
}

const getSessions = async (req: Request, res: Response) => {
    try {

        const sessions = await prisma.session.findMany({});

        res.status(200).json({ success: true, sessions });
    } catch (error) {
        res.status(500).json({ success: false, error: "Internal server error" });
    }
}

const getUserSessions = async (req: Request, res: Response) => {
    try {
     
        const user = req.user;

        if (!user) {
            res.status(401).json({ success: false, error: "Unauthorized! TOKEN IS REQUIRED" });
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

        res.status(200).json({ success: true, sessions });
    } catch (error) {
        console.log("error", error);
        res.status(500).json({ success: false, error });
    }
}

const getSession = async (req: Request, res: Response) => {

    try {
        const { id } = req.params;

        if (!id) {
            res.status(400).json({ success: false, error: "Session ID is required" });
            return;
        }

        const session = await prisma.session.findFirst({
            where: {
                id,
            }
        })

        if (!session) {
            res.status(404).json({ success: false, error: "Session not found" });
            return;
        }

        res.status(200).json({ session });

    } catch (error) {
        res.status(500).json({ success: false, error: "Internal server error" });
    }
}

const updateSession = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        if (!id) {
            res.status(400).json({ success: false, error: "Session ID is required" });
            return;
        }

        const session = await prisma.session.findFirst({
            where: {
                id,
            }
        })

        if (!session) {
            res.status(404).json({ success: false, error: "Session not found" });
            return;
        }
        const updatedSession = await prisma.session.update({
            where: {
                id,
            },
            data: req.body,
        })

        res.status(200).json({ success: true, message: "Session updated successfully", updatedSession });

    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
}

const deleteSession = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        if (!id) {
            res.status(400).json({ success: false, error: "Session ID is required" });
            return;
        }

        const session = await prisma.session.findFirst({
            where: {
                id,
            }
        })

        if (!session) {
            res.status(404).json({ success: false, error: "Session not found" });
            return;
        }

        await prisma.session.delete({
            where: {
                id,
            }
        })

        res.status(200).json({ success: true, message: "Session deleted successfully" });
    } catch (error) {
        res.status(500).json({ success: false, error: "Internal server error" });
    }
}

export { createSession, getSessions, getSession, updateSession, deleteSession, getUserSessions, uploadJsonToCloud };

