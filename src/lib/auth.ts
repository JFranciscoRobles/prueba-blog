import { PrismaAdapter } from "@auth/prisma-adapter";
import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth from "next-auth";
import { db } from "./server/db";
import bcrypt from "bcrypt";

export const {
  handlers: { GET, POST },
  auth,
} = NextAuth({
  adapter: PrismaAdapter(db),
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const { email, password } = credentials;
  
        if (!email || !password) {
          throw new Error("Missing username or password");
        }
        const user = await db.user.findUnique({
          where: {
            email: String(email),
          },
        });
        if (
          !user ||
          !(await bcrypt.compare(String(password), user.password || ""))
        ) {
          throw new Error("Invalid username or password");
        }
        return user;
      },
    }),
  ],
 callbacks: {
  async session({ session, user, token }) {
    session.user.id = token.sub || ""
  
    return session
  },
  async jwt({ token, user }) {
    return token
  }
 }
});
