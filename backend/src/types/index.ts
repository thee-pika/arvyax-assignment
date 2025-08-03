import { z } from "zod";

export const registerSchema = z.object({
    name: z.string().optional(),
    email: z.email(),
    password: z.string().min(6),
});

export const loginSchema = z.object({
    email: z.email(),
    password: z.string().min(6),
});

export const createSessionSchema = z.object({
  title: z.string(),
  tags: z.array(z.string()),
  json_file_url: z.string(),
  status: z.enum(["DRAFT", "PUBLISHED"]),
});


