import express from "express";
import { createSession, deleteSession, getSessions, getSession, getUserSessions, updateSession, uploadJsonToCloud } from "../controllers/Session";
import { AuthMiddleware } from "../middlewares/AuthMiddleware";
import multer from "multer";

export const SessionRouter = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

SessionRouter.post("/create", AuthMiddleware, createSession);
SessionRouter.post("/upload-file", AuthMiddleware, upload.single("file") , uploadJsonToCloud);
SessionRouter.get("/", AuthMiddleware, getUserSessions);
SessionRouter.get("/all", getSessions);
SessionRouter.get("/:id", AuthMiddleware, getSession);
SessionRouter.put("/:id", AuthMiddleware, updateSession);
SessionRouter.delete("/:id", AuthMiddleware, deleteSession);


