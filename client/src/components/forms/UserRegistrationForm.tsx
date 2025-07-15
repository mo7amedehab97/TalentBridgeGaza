"use client";

import React from "react";
import { Form, Input, Button, Alert } from "../ui";

interface UserRegistrationFormProps {
  onSubmit: (data: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    phoneNumber: string;
    role: "CONTRACTOR" | "ADMIN" | "CLIENT" | "COMPANY";
  }) => void;
  isLoading?: boolean;
  error?: string;
}

export const UserRegistrationForm: React.FC<UserRegistrationFormProps> = ({
  onSubmit,
  isLoading = false,
  error,
}) => {
  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-2xl font-semibold mb-6 text-center">
        Create Your Account
      </h2>

      {error && (
        <Alert type="error" className="mb-6">
          {Array.isArray(error)
            ? error.map((err, idx) => <div key={idx}>{err}</div>)
            : error}
        </Alert>
      )}

      <Form
        onSubmit={(data) => {
          // Only send required fields to backend
          const { firstName, lastName, email, password, phoneNumber, role } =
            data;
          onSubmit({ firstName, lastName, email, password, phoneNumber, role });
        }}
        defaultValues={{
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          phoneNumber: "",
          role: "CONTRACTOR",
        }}
      >
        <div className="flex gap-4 mb-4">
          <Input
            name="firstName"
            label="First Name"
            placeholder="Enter your first name"
            required
          />
          <Input
            name="lastName"
            label="Last Name"
            placeholder="Enter your last name"
            required
          />
        </div>

        <Input
          name="email"
          label="Email Address"
          type="email"
          placeholder="Enter your email address"
          required
          helpText="We'll use this to send you important updates"
        />

        <Input
          name="phoneNumber"
          label="Phone Number"
          type="tel"
          placeholder="Enter your phone number"
          required
        />

        <Input
          name="password"
          label="Password"
          type="password"
          placeholder="Create a strong password"
          required
          helpText="Must be at least 8 characters with uppercase, lowercase, and number"
        />

        {/* No confirmPassword or agreeToTerms fields, as per backend */}

        <Button
          type="submit"
          variant="primary"
          size="lg"
          disabled={isLoading}
          className="w-full"
        >
          {isLoading ? "Creating Account..." : "Create Account"}
        </Button>
      </Form>

      <p className="text-center mt-6 text-sm text-text-muted">
        Already have an account?{" "}
        <a
          href="/login"
          className="text-primary-blue hover:text-primary-blue-hover"
        >
          Sign in here
        </a>
      </p>
    </div>
  );
};
