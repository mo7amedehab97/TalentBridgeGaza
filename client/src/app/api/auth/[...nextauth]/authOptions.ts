import { AuthOptions, Session, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios, { AxiosError } from "axios";
import { JWT } from "next-auth/jwt";

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
            `${API_URL}/api/auth/signin`,
            {
              email: credentials.email,
              password: credentials.password,
            },
            {
              headers: { 'Content-Type': 'application/json' },
              withCredentials: true,
            }
          );

          const { data } = response;
          
          if (data.success && data.data && data.token) {
            return {
              ...data.data,
              accessToken: data.token,
            };
          }
          
          return null;
        } catch (error) {
          const axiosError = error as AxiosError;
          if (axiosError.response?.data) {
            throw new Error(axiosError.response.data.message || 'Authentication failed');
          }
          throw new Error('Unable to connect to the server');
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 7 * 24 * 60 * 60, // 7 days (matches backend JWT_EXPIRES_IN)
  },
  callbacks: {
    async jwt({ token, user, account }) {
      // Initial sign in
      if (user) {
        token.accessToken = (user as any).accessToken;
        token.role = (user as any).role;
        token.id = (user as any).id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user = {
          ...session.user,
          id: token.id as string,
          role: token.role as string,
        };
        session.accessToken = token.accessToken as string;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
    error: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET || 'your-secret-key',
  debug: process.env.NODE_ENV === 'development',
}; 