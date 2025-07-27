import  { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      roleId: number;
      email: string;
    };
    expires: DefaultSession["expires"];
  }
  interface User {
    id: string;
    roleId: number;
    email: string;
  }
} 