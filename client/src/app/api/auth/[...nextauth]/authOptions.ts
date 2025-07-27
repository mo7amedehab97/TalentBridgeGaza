import { AuthOptions, DefaultSession } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios, { AxiosError } from "axios";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      roleId: number;
    } & DefaultSession["user"];
    accessToken?: string;
  }
}

// API configuration
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Email and password are required');
        }

        try {
          const response = await axios.post(
            `${API_URL}/api/v1/auth/login`,
            {
              email: credentials.email,
              password: credentials.password,
            },
            {
              headers: { 'Content-Type': 'application/json' },
              withCredentials: false,
            }
          );

          const { data } = response;
          
          if (data.success && data.data && data.token) {
            return {
              id: data.data.id,
              name: data.data.name,
              email: data.data.email,
              roleId: data.data.roleId,
              accessToken: data.token,
            };
          }
          
          return null;
        } catch (error) {
          const axiosError = error as AxiosError<{ message?: string }>;
          if (axiosError.response?.data?.message) {
            throw new Error(axiosError.response.data.message);
          }
          throw new Error(axiosError.message || 'Authentication failed');
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 7 * 24 * 60 * 60, // 7 days (matches backend JWT_EXPIRES_IN)
  },
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
  },
  callbacks: {
    async jwt({ token, user }) {
      // Initial sign in
      if (user) {
        token.accessToken = (user as { accessToken?: string }).accessToken;
        token.roleId = (user as { roleId?: number }).roleId;
        token.id = (user as { id?: string }).id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user = {
          ...session.user,
          id: token.id as string,
          roleId: token.roleId as number,
        };
        session.accessToken = token.accessToken as string;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
    signOut: "/login",
    error: "/login",
  },
  events: {
    async signOut() {
      // Clear any client-side auth state
      if (typeof window !== 'undefined') {
        localStorage.removeItem('authState');
      }
    },
  },
  secret: process.env.NEXTAUTH_SECRET || 'your-secret-key',
  debug: process.env.NODE_ENV === 'development',
}; 