import { z } from "zod";

export const usernameValidation = z
    .string()
    .min(2, "Username must be at least 2 characters long.")
    .max(20, "Username must not exceed 20 characters.")
    .regex(/[a-zA-Z][a-zA-Z0-9-_]{3,32}/gi, "Username can only contain letters, numbers, hyphens, and underscores.")

export const signupSchema = z.object({
    username: usernameValidation,
    email: z.string().email({ message: "Please enter a valid email address." }),
    password: z.string().min(6, { message: "Password must be at least 6 characters long and no more than 20 characters." })
})