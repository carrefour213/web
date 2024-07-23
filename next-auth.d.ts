import { UserRole } from "@prisma/client";
import NextAuth, { type DefaultSession } from "next-auth";

export interface NextAuthRequest extends NextRequest {
    auth: Session | null;
}

export type ExtendedUser = DefaultSession["user"] & {
    role: UserRole;
    phoneNumber: string
    wilaya: string
    adresse: string
};

declare module "next-auth" {
    interface Session {
        user: ExtendedUser;
    }
}