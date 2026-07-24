import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Facebook from "next-auth/providers/facebook";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

import { DEMO_EMAIL, DEMO_PASSWORD } from "@/lib/demo-user";
import { getUser } from "@/lib/user-store";

export const {
  handlers: { GET, POST },
  signIn,
  signOut,
  auth,
} = NextAuth({
  providers: [
    Google,
    Facebook,
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const email = typeof credentials?.email === "string" ? credentials.email : "";
        const password = typeof credentials?.password === "string" ? credentials.password : "";

        if (email === DEMO_EMAIL && password === DEMO_PASSWORD) {
          return { id: "demo-user", email: DEMO_EMAIL, name: "Demo User" };
        }

        const user = getUser(email);
        if (user && (await bcrypt.compare(password, user.passwordHash))) {
          return { id: user.id, email: user.email };
        }
        return null;
      },
    }),
  ],
  pages: {
    signIn: "/",
  },
});
