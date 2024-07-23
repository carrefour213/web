import { isValidPhoneNumber } from "react-phone-number-input";
import { z } from "zod";

export const OrderClientInformationSchema = z.object({
    "name": z.string().min(1).max(255),
    "mail": z.string().email().min(1).max(255),
    "phone": z.string().refine(isValidPhoneNumber, { message: "Invalid phone number" }),
    "wilaya": z.string().min(1).max(255),
    "adresse": z.string().min(1).max(255),
    "save": z.boolean().default(true).optional()
})