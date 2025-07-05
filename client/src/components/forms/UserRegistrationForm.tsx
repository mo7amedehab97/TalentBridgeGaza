import React from "react";
import { Form, Input, Select, Checkbox, Button, Alert } from "../ui";
import {
  userRegistrationSchema,
  UserRegistrationForm as UserRegistrationFormType,
} from "../../lib/validations";

const experienceOptions = [
  { value: "entry", label: "Entry Level (0-2 years)" },
  { value: "mid", label: "Mid Level (3-5 years)" },
  { value: "senior", label: "Senior Level (6+ years)" },
  { value: "lead", label: "Lead/Manager" },
];

const educationOptions = [
  { value: "high-school", label: "High School" },
  { value: "associate", label: "Associate Degree" },
  { value: "bachelor", label: "Bachelor's Degree" },
  { value: "master", label: "Master's Degree" },
  { value: "phd", label: "PhD" },
  { value: "other", label: "Other" },
];

interface UserRegistrationFormProps {
  onSubmit: (data: UserRegistrationFormType) => void;
  isLoading?: boolean;
  error?: string;
}

export const UserRegistrationForm: React.FC<UserRegistrationFormProps> = ({
  onSubmit,
  isLoading = false,
  error,
}) => {
  const handleSubmit = (data: UserRegistrationFormType) => {
    onSubmit(data);
  };

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-2xl font-semibold mb-6 text-center">
        Create Your Account
      </h2>

      {error && (
        <Alert type="error" className="mb-6">
          {error}
        </Alert>
      )}

      <Form
        schema={userRegistrationSchema}
        onSubmit={handleSubmit}
        defaultValues={{
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          confirmPassword: "",
          phone: "",
          agreeToTerms: false,
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
          name="phone"
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

        <Input
          name="confirmPassword"
          label="Confirm Password"
          type="password"
          placeholder="Confirm your password"
          required
        />

        <Checkbox
          name="agreeToTerms"
          label="I agree to the Terms and Conditions and Privacy Policy"
          required
        />

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
