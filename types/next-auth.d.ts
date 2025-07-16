import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email: string;
      username: string;
      isEditor: Boolean;
    };
  }

  interface User {
    id: string;
    name?: string | null;
    email: string;
    username: string;
    isEditor: Boolean;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    name?: string | null;
    email: string;
    username: string;
    isEditor: Boolean;
  }
}