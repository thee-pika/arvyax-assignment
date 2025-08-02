import express from "express";
import { createSession, deleteSession, getSessions, getSession, getUserSessions, updateSession } from "../controllers/Session";
import { AuthMiddleware } from "../middlewares/AuthMiddleware";

export const SessionRouter = express.Router();

SessionRouter.post("/create", AuthMiddleware, createSession);
SessionRouter.get("/", AuthMiddleware, getUserSessions);
SessionRouter.get("/all", AuthMiddleware, getSessions);
SessionRouter.get("/:id", AuthMiddleware, getSession);
SessionRouter.put("/:id", AuthMiddleware, updateSession);
SessionRouter.delete("/:id", AuthMiddleware, deleteSession);

