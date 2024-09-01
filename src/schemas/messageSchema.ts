import { z } from "zod";

export const messageSchema = z.object({
    content: z
        .string()
        .min(5, { message: "Content must be at least 5 characters long." })
        .max(300, { message: "Content must not exceed 300 characters." })
});
