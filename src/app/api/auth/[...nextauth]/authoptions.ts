import CredentialsProvider from "next-auth/providers/credentials";
import { connect_auth } from "@/dbConfig/dbConfig";
import { getUserModel } from "@/models/userModel";
import bcrypt from "bcryptjs";
import { AuthOptions } from "next-auth";

export const authOptions: AuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const connection =  connect_auth();
          if(!connection) {
            throw new Error("DB connection failed");
          }
          const User = getUserModel(connection);

          const user = await User.findOne({ email: credentials?.email });
          if (!user) throw new Error("Invalid E-Mail / Password");

          const isValid = await bcrypt.compare(
            credentials!.password,
            user.password
          );
          if (!isValid) throw new Error("Invalid E-Mail / Password");

          return {
            id: user._id.toString(),
            email: user.email,
            username: user.username,
          };
        } catch {
          throw new Error("Something went wrong");
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.username = user.username;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.email = token.email as string;
        session.user.username = token.username as string;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
};
