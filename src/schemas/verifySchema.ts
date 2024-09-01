import { z } from "zod";

export const verifySchema = z.object({
    code: z.string().length(6, { message: "The verification code must be exactly 6 digits long." })
});
