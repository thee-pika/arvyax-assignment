import express, { Request, Router, Response, RequestHandler } from "express";
import { Login, createAccount } from "../controllers/User";

export const userRouter: Router = express.Router();

userRouter.post("/register", createAccount);
userRouter.post("/login", Login);

