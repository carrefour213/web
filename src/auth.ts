import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import authConfig from "./auth.config"
import { db } from "./lib/db"
import { getUserById } from "../data/user"
import { UserRole } from "@prisma/client"

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut
} = NextAuth({
  pages: {
    signIn: "/auth/login"
  },
  events: {
    async linkAccount({ user }) {
      await db.user.update({
        where: { id: user.id },
        data: { emailVerified: new Date() }
      })
    }
  },
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider !== "credentials") return true

      const existingUser = await getUserById(user?.id)
      if (!existingUser?.emailVerified) return false

      if (existingUser) return true
      return true
    },
    async session({ session, user, token }) {
      if (token.sub && session.user) {
        session.user.id = token.sub
      }
      if (token.role && session.user) {
        session.user.role = token.role as UserRole;
      }
      if (token.phoneNumber && session.user) {
        session.user.phoneNumber = token.phoneNumber as string;
      }
      if (token.wilaya && session.user) {
        session.user.wilaya = token.wilaya as string;
      }
      if (token.adresse && session.user) {
        session.user.adresse = token.adresse as string;
      }
      return session
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      if (!token.sub) return token

      const existingUser = await getUserById(token.sub)

      if (!existingUser) return token

      token.role = existingUser.role
      token.phoneNumber = existingUser.phoneNumber
      token.wilaya = existingUser.wilaya
      token.adresse = existingUser.adresse

      return token
    }
  },
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  ...authConfig,
})