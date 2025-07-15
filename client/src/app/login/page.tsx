"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Form, Input, Button } from "@/components/ui";
import { signIn, getSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Session } from "next-auth";

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = React.useState<string | null>(null);

  const handleSubmit = async (data: { email: string; password: string }) => {
    setError(null);
    const result = await signIn("credentials", {
      redirect: false,
      email: data.email,
      password: data.password,
    });
    if (result?.ok) {
      const session = await getSession();
      const userRole = (session?.user as Session["user"])?.role;
      if (userRole === "ADMIN") router.replace("/admin");
      else if (userRole === "CONTRACTOR") router.replace("/moderator");
      else if (userRole === "CLIENT") router.replace("/talent");
      else router.replace("/");
    } else {
      setError(result?.error || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex bg-bg-secondary justify-between">
      {/* Left: Form */}
      <div className="flex flex-col justify-center px-8 max-w-xl mx-auto  w-[50vw]">
        <h1 className="text-4xl font-bold mb-8">Log In</h1>
        <Form onSubmit={handleSubmit}>
          <Input
            name="email"
            label="Email"
            type="email"
            placeholder="Email"
            required
          />
          <Input
            name="password"
            label="Password"
            type="password"
            placeholder="Password"
            required
          />
          <Button type="submit" variant="primary" className="w-full mt-4 mb-2">
            Log in
          </Button>
        </Form>
        {error && <div className="text-red-500 mt-2">{error}</div>}
        <div className="flex justify-between items-center mt-2 mb-4">
          <span className="text-sm">
            Forgot your password?{" "}
            <Link href="/reset" className="text-primary-blue">
              Reset
            </Link>
          </span>
        </div>
        <div className="flex items-center my-4">
          <div className="flex-1 h-px bg-border-medium" />
          <span className="mx-4 text-text-muted">Or</span>
          <div className="flex-1 h-px bg-border-medium" />
        </div>
        <Button
          type="button"
          variant="outline"
          className="w-full flex items-center justify-center gap-2"
        >
          <svg width="20" height="20" fill="none" viewBox="0 0 20 20">
            <g>
              <path
                d="M19.6 10.23c0-.68-.06-1.36-.17-2H10v3.77h5.5a4.7 4.7 0 0 1-2.04 3.08v2.56h3.3c1.93-1.78 3.04-4.4 3.04-7.41z"
                fill="#4285F4"
              />
              <path
                d="M10 20c2.7 0 4.97-.9 6.63-2.44l-3.3-2.56c-.92.62-2.1.99-3.33.99-2.56 0-4.73-1.73-5.5-4.07H1.1v2.6A10 10 0 0 0 10 20z"
                fill="#34A853"
              />
              <path
                d="M4.5 12.92A5.98 5.98 0 0 1 4.06 10c0-.99.18-1.95.44-2.92V4.48H1.1A10 10 0 0 0 0 10c0 1.64.4 3.19 1.1 4.52l3.4-2.6z"
                fill="#FBBC05"
              />
              <path
                d="M10 3.96c1.47 0 2.78.51 3.82 1.5l2.86-2.86C14.97 1.1 12.7 0 10 0A10 10 0 0 0 1.1 4.48l3.4 2.6C5.27 5.69 7.44 3.96 10 3.96z"
                fill="#EA4335"
              />
            </g>
          </svg>
          Log In With Your Google Account
        </Button>
        <div className="text-center mt-6 text-sm text-text-muted">
          I don&apos;t have an account yet.{" "}
          <Link
            href="/signup"
            className="text-primary-blue hover:text-primary-blue-hover"
          >
            Sign up
          </Link>
        </div>
      </div>
      {/* Right: Image */}
      <div className="hidden md:flex  items-center justify-center bg-bg-secondary  w-[50vw]">
        <Image
          src="/images/authSIDE.svg"
          alt="Authentication Illustration"
          width={500}
          height={500}
          className="object-contain"
        />
      </div>
    </div>
  );
}
