import  { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: string;
      email: string;
    };
    expires: DefaultSession["expires"];
  }
  interface User {
    id: string;
    role: string;
    email: string;
  }
} 