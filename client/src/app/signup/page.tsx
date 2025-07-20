"use client";
import React, { useState } from "react";
import Image from "next/image";
import { UserRegistrationForm } from "@/components/forms/UserRegistrationForm";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useRouter } from "next/navigation";
import { signIn, getSession } from "next-auth/react";
import { signUpThunk } from "@/features/auth/authSlice";

type Plan = {
  key: string;
  title: string;
  description: string;
  icon: React.ReactNode;
};

const plans: Plan[] = [
  {
    key: "CONTRACTOR",
    title: "Contractor",
    description: "I work as a contractor or remote employee.",
    icon: (
      <svg width="32" height="32" fill="none" viewBox="0 0 32 32">
        <rect width="32" height="32" rx="8" fill="#E6F0FA" />
        <path d="M16 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z" fill="#2B6CB0" />
        <path d="M8 24c0-2.21 3.58-4 8-4s8 1.79 8 4v2H8v-2Z" fill="#2B6CB0" />
      </svg>
    ),
  },
  {
    key: "CLIENT",
    title: "Client",
    description: "I want to purchase services.",
    icon: (
      <svg width="32" height="32" fill="none" viewBox="0 0 32 32">
        <rect width="32" height="32" rx="8" fill="#F3F4F6" />
        <path d="M16 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z" fill="#4A5568" />
        <path d="M8 24c0-2.21 3.58-4 8-4s8 1.79 8 4v2H8v-2Z" fill="#4A5568" />
      </svg>
    ),
  },
  {
    key: "ADMIN",
    title: "ADMIN",
    description: "We plan to hire remotely and pay workers.",
    icon: (
      <svg width="32" height="32" fill="none" viewBox="0 0 32 32">
        <rect width="32" height="32" rx="8" fill="#E6F4EA" />
        <path d="M10 22V10h12v12H10Z" fill="#2F855A" />
        <path d="M14 14h4v4h-4v-4Z" fill="#fff" />
      </svg>
    ),
  },
];

export default function SignupPage() {
  const [step, setStep] = useState(1);
  const [selectedPlan, setSelectedPlan] = useState<
    "CONTRACTOR" | "ADMIN" | "CLIENT" | "COMPANY" | null
  >(null);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [error, setError] = React.useState<string | null>(null);

  const handleSignup = async (data: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    phoneNumber: string;
    role: "CONTRACTOR" | "ADMIN" | "CLIENT" | "COMPANY";
  }) => {
    setError(null);
    const result = await dispatch(
      signUpThunk({
        ...data,
        role: selectedPlan!,
      })
    );
    if ((result as { success?: boolean }).success) {
      const signInResult = await signIn("credentials", {
        redirect: false,
        email: data.email as string,
        password: data.password as string,
      });
      if (signInResult?.ok) {
        // Wait for session to update and get the user role
        const session = await getSession();
        const userRole =
          session?.user && (session.user as { role?: string }).role;
        if (userRole === "ADMIN") router.replace("/admin");
        else if (userRole === "CONTRACTOR") router.replace("/moderator");
        else if (userRole === "CLIENT") router.replace("/talent");
        else router.replace("/");
      }
    } else {
      setError((result as { message?: string }).message || "");
    }
  };

  return (
    <div className="min-h-screen flex bg-bg-secondary">
      {/* Left: Stepper & Form */}
      <div className=" flex flex-col justify-center px-8 max-w-xl mx-auto w-[50vw]">
        {step === 1 && (
          <div>
            <h1 className="text-3xl font-bold mb-6">
              Please choose the account that suits you
            </h1>
            <div className="space-y-4 mb-8">
              {plans.map((plan: Plan) => (
                <button
                  key={plan.key}
                  type="button"
                  onClick={() =>
                    setSelectedPlan(
                      plan.key as "CONTRACTOR" | "ADMIN" | "CLIENT" | "COMPANY"
                    )
                  }
                  className={`w-full flex items-center gap-4 p-4 border rounded-lg transition-all ${
                    selectedPlan === plan.key
                      ? "border-primary-blue bg-blue-50"
                      : "border-border-medium bg-white"
                  }`}
                >
                  {plan.icon}
                  <div className="text-left">
                    <div className="font-semibold text-lg">{plan.title}</div>
                    <div className="text-sm text-text-muted">
                      {plan.description}
                    </div>
                  </div>
                  <span className="ml-auto">
                    <span
                      className={`inline-block w-5 h-5 rounded-full border-2 ${
                        selectedPlan === plan.key
                          ? "border-primary-blue bg-primary-blue"
                          : "border-border-medium bg-white"
                      }`}
                    ></span>
                  </span>
                </button>
              ))}
            </div>
            <button
              className="w-full bg-primary-blue text-white py-3 rounded-lg font-semibold disabled:opacity-50"
              disabled={!selectedPlan}
              onClick={() => setStep(2)}
            >
              Continue
            </button>
          </div>
        )}
        {step === 2 && (
          <div>
            <UserRegistrationForm onSubmit={handleSignup} />
            {error && <div className="text-red-500 mt-2">{error}</div>}
          </div>
        )}
      </div>
      {/* Right: Image */}
      <div className="hidden md:flex  items-center justify-center  w-[50vw]">
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
