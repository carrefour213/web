"use server"

import { RegisterSchema } from "@/schemas";
import * as z from "zod";
import bcrypt from 'bcryptjs'
import { db } from "@/lib/db";
import { getUserByEmail } from "../../data/user";
import { generateVerificationToken } from "@/lib/tokens";
import { sendEmailVerification } from "@/lib/mail";

export const register = async (values: z.infer<typeof RegisterSchema>,) => {
    const validatedFields = RegisterSchema.safeParse(values);

    if (!validatedFields.success) {
        return { error: "Invalid fields!" };
    }

    const { email, password, name, phoneNumber } = validatedFields.data;
    const hashedPassword = await bcrypt.hash(password, 10);

    const existingUser = await getUserByEmail(email);
    if (existingUser) {
        return { error: "Email is already in use." };
    }

    await db.user.create({
        data: {
            name,
            email,
            phoneNumber,
            password: hashedPassword,
        },
    })

    const verificationToken = await generateVerificationToken(email)
    await sendEmailVerification(verificationToken.email, verificationToken.token)
    // TODO: send verifictaion token email

    return { success: "verifictaion email sent " }
}