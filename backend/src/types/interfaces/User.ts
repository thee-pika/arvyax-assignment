import { User as PrismaUser } from "@prisma/client";

export interface User extends PrismaUser {
    id: string;
    name: string;
    email: string;
    role: "ADMIN" | "USER";
    createdAt: Date;
    updatedAt: Date;
}