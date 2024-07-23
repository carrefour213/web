import * as z from "zod";
import { isValidPhoneNumber } from "react-phone-number-input"

export const messageSchema = z.object({
    name: z.string().min(1).max(255),
    email: z.string().email(),
    phone: z.string().refine(isValidPhoneNumber, { message: "Invalid phone number" }),
    message: z.string().min(1).max(255),
});