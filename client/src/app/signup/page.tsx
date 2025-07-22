"use client";
import React, { useState } from "react";
import Image from "next/image";
import { UserRegistrationForm } from "@/components/forms/UserRegistrationForm";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { useAppDispatch, useAppSelector } from "@/hooks/useAppDispatch";
import { RootState } from "@/store";
import { useRouter } from "next/navigation";
import { signIn, getSession } from "next-auth/react";
import { signUpThunk } from "@/features/auth/authSlice";
import { useToast } from "@/hooks/use-toast";

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
  const { loading, user } = useAppSelector((state: RootState) => state.auth);
  const { showSuccess, showError } = useToast();

  // Redirect if user is already logged in
  React.useEffect(() => {
    if (user) {
      if (user.role === "ADMIN") router.replace("/admin");
      else if (user.role === "CONTRACTOR") router.replace("/moderator");
      else if (user.role === "CLIENT") router.replace("/talent");
      else router.replace("/");
    }
  }, [user, router]);

  const handleSignup = async (data: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    phoneNumber: string;
    gender: string;
    role: "CONTRACTOR" | "ADMIN" | "CLIENT" | "COMPANY";
  }) => {
    if (!selectedPlan) {
      setError("Please select an account type");
      return;
    }

    setError(null);
    try {
      const result = await dispatch(
        signUpThunk({
          firstName: data.firstName.trim(),
          lastName: data.lastName.trim(),
          email: data.email.trim().toLowerCase(),
          password: data.password,
          phoneNumber: data.phoneNumber.trim(),
          gender: data.gender,
          role: selectedPlan,
        })
      );

      if (signUpThunk.fulfilled.match(result)) {
        showSuccess("Signup successful!");
        const session = await getSession();
        if (session) {
          router.push("/");
        } else {
          await signIn("credentials", {
            email: data.email,
            password: data.password,
            redirect: false,
          });
          router.push("/");
        }
      } else if (signUpThunk.rejected.match(result)) {
        const errorMessage =
          typeof result.payload === "string"
            ? result.payload
            : "An unknown error occurred during signup.";
        showError(errorMessage);
        setError(errorMessage);
      }
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.message ||
        err.message ||
        "An unexpected error occurred.";
      showError(errorMessage);
      setError(errorMessage);
    }
  };

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Left side with form */}
      <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24 w-[50vw]">
        <div className="mt-6">
          <h2 className="text-2xl font-semibold my-12  text-center">
            Create Your Account
          </h2>
          {step === 1 ? (
            <div className="space-y-6">
              <h3 className="text-lg font-medium text-gray-900">I am a...</h3>
              <div className="space-y-4">
                {plans.map((plan) => (
                  <div
                    key={plan.key}
                    onClick={() => setSelectedPlan(plan.key as any)}
                    className={`relative rounded-lg border bg-white px-6 py-5 shadow-sm flex items-center space-x-3 hover:border-indigo-500 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500 cursor-pointer ${
                      selectedPlan === plan.key
                        ? "border-indigo-500 ring-2 ring-indigo-500"
                        : "border-gray-300"
                    }`}
                  >
                    {plan.icon}
                    <div className="flex-1 min-w-0">
                      <span className="absolute inset-0" aria-hidden="true" />
                      <p className="text-sm font-medium text-gray-900">
                        {plan.title}
                      </p>
                      <p className="text-sm text-gray-500 truncate">
                        {plan.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex justify-end">
                <Button
                  type="button"
                  variant="primary"
                  onClick={() => setStep(2)}
                  disabled={!selectedPlan}
                >
                  Continue
                </Button>
              </div>
            </div>
          ) : (
            <UserRegistrationForm
              onSubmit={handleSignup}
              onBack={() => setStep(1)}
              role={selectedPlan!}
              error={error}
              isLoading={loading}
            />
          )}
        </div>
      </div>
      {/* Right: Image */}
      <div className="hidden md:flex items-center justify-center w-[50vw] bg-gray-100">
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
