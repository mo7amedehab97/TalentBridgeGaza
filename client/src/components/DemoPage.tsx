"use client";

import React, { useState } from "react";
import {
  Button,
  Alert,
  Badge,
  Card,
  Input,
  Select,
  Textarea,
  RadioGroup,
  Checkbox,
  Form,
} from "./ui";
import {
  userRegistrationSchema,
  UserRegistrationForm as UserRegistrationFormType,
} from "../lib/validations";

const DemoPage: React.FC = () => {
  const [showAlert, setShowAlert] = useState(false);
  const [alertType, setAlertType] = useState<"success" | "error" | "warning">(
    "success"
  );

  const handleRegistrationSubmit = (data: UserRegistrationFormType) => {
    console.log("Registration data:", data);
    setAlertType("success");
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 3000);
  };

  const experienceOptions = [
    { value: "entry", label: "Entry Level (0-2 years)" },
    { value: "mid", label: "Mid Level (3-5 years)" },
    { value: "senior", label: "Senior Level (6+ years)" },
  ];

  const educationOptions = [
    { value: "bachelor", label: "Bachelor's Degree" },
    { value: "master", label: "Master's Degree" },
    { value: "phd", label: "PhD" },
  ];

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <h1 className="text-4xl font-bold mb-8 text-center">
        TalentBridge Gaza Design System
      </h1>

      {showAlert && (
        <Alert type={alertType} className="mb-6">
          {alertType === "success" &&
            "Registration successful! Welcome to TalentBridge Gaza."}
          {alertType === "error" && "Something went wrong. Please try again."}
          {alertType === "warning" &&
            "Please review your information before submitting."}
        </Alert>
      )}

      {/* Buttons Section */}
      <section className="mb-12">
        <h2 className="text-3xl font-semibold mb-6">Buttons</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <h3 className="text-lg font-medium mb-3">Primary Buttons</h3>
            <div className="space-y-2">
              <Button variant="primary" size="sm">
                Small
              </Button>
              <Button variant="primary">Default</Button>
              <Button variant="primary" size="lg">
                Large
              </Button>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-3">Secondary Buttons</h3>
            <div className="space-y-2">
              <Button variant="secondary" size="sm">
                Small
              </Button>
              <Button variant="secondary">Default</Button>
              <Button variant="secondary" size="lg">
                Large
              </Button>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-3">Destructive Buttons</h3>
            <div className="space-y-2">
              <Button variant="destructive" size="sm">
                Delete
              </Button>
              <Button variant="destructive">Remove</Button>
              <Button variant="destructive" size="lg">
                Cancel
              </Button>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-3">Disabled Buttons</h3>
            <div className="space-y-2">
              <Button variant="primary" disabled>
                Disabled
              </Button>
              <Button variant="secondary" disabled>
                Disabled
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Alerts Section */}
      <section className="mb-12">
        <h2 className="text-3xl font-semibold mb-6">Alerts</h2>
        <div className="space-y-4">
          <Alert type="success" title="Success!">
            Your application has been submitted successfully. We&apos;ll review
            it and get back to you soon.
          </Alert>
          <Alert type="error" title="Error">
            There was an error submitting your application. Please try again or
            contact support.
          </Alert>
          <Alert type="warning" title="Warning">
            Please make sure all required fields are filled before submitting
            your application.
          </Alert>
        </div>
      </section>

      {/* Badges Section */}
      <section className="mb-12">
        <h2 className="text-3xl font-semibold mb-6">Badges</h2>
        <div className="flex flex-wrap gap-4">
          <Badge variant="applied">Applied</Badge>
          <Badge variant="pending">Pending</Badge>
          <Badge variant="rejected">Rejected</Badge>
          <Badge variant="remote">Remote</Badge>
        </div>
      </section>

      {/* Cards Section */}
      <section className="mb-12">
        <h2 className="text-3xl font-semibold mb-6">Cards</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card
            title="Frontend Developer"
            meta="TechCorp • Gaza, Palestine • Full-time"
          >
            <p className="mb-4">
              We&apos;re looking for a talented Frontend Developer to join our
              team...
            </p>
            <div className="flex gap-2 mb-4">
              <Badge variant="remote">Remote</Badge>
              <Badge variant="applied">New</Badge>
            </div>
            <Button variant="primary" className="w-full">
              Apply Now
            </Button>
          </Card>

          <Card title="UX Designer" meta="DesignStudio • Ramallah • Part-time">
            <p className="mb-4">
              Join our creative team as a UX Designer and help shape amazing
              user experiences...
            </p>
            <div className="flex gap-2 mb-4">
              <Badge variant="pending">Urgent</Badge>
            </div>
            <Button variant="secondary" className="w-full">
              Learn More
            </Button>
          </Card>

          <Card
            title="Backend Engineer"
            meta="StartupHub • Jerusalem • Contract"
          >
            <p className="mb-4">
              Help us build scalable backend systems for our growing platform...
            </p>
            <div className="flex gap-2 mb-4">
              <Badge variant="remote">Remote</Badge>
            </div>
            <Button variant="primary" className="w-full">
              Apply Now
            </Button>
          </Card>
        </div>
      </section>

      {/* Form Components Section */}
      <section className="mb-12">
        <h2 className="text-3xl font-semibold mb-6">Form Components</h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Individual Form Components */}
          <div>
            <h3 className="text-xl font-semibold mb-4">
              Individual Components
            </h3>
            <div className="space-y-4">
              <Input
                name="demo-input"
                label="Text Input"
                placeholder="Enter some text"
                helpText="We'll use this to send you important updates"
              />

              <Select
                name="demo-select"
                label="Select Option"
                options={experienceOptions}
                placeholder="Choose an option"
              />

              <Textarea
                name="demo-textarea"
                label="Text Area"
                placeholder="Enter a longer text..."
                rows={4}
              />

              <RadioGroup
                name="demo-radio"
                label="Radio Group"
                options={educationOptions}
              />

              <Checkbox
                name="demo-checkbox"
                label="I agree to the terms and conditions"
              />
            </div>
          </div>

          {/* Complete Form Example */}
          <div>
            <h3 className="text-xl font-semibold mb-4">
              Complete Form Example
            </h3>
            <Form
              schema={userRegistrationSchema}
              onSubmit={handleRegistrationSubmit}
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
              <div className="space-y-4">
                <div className="flex gap-4">
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
                  placeholder="Enter your email"
                  required
                />

                <Input
                  name="phone"
                  label="Phone Number"
                  type="tel"
                  placeholder="Enter your phone"
                  required
                />

                <Input
                  name="password"
                  label="Password"
                  type="password"
                  placeholder="Create a password"
                  required
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
                  label="I agree to the terms and conditions"
                  required
                />

                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  className="w-full"
                >
                  Create Account
                </Button>
              </div>
            </Form>
          </div>
        </div>
      </section>

      {/* Color Palette Section */}
      <section className="mb-12">
        <h2 className="text-3xl font-semibold mb-6">Color Palette</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <div className="text-center">
            <div className="w-20 h-20 rounded-lg mb-2 mx-auto bg-primary-blue"></div>
            <p className="text-sm font-medium">Primary Blue</p>
            <p className="text-xs text-text-muted">#4A90E2</p>
          </div>

          <div className="text-center">
            <div className="w-20 h-20 rounded-lg mb-2 mx-auto bg-accent-green"></div>
            <p className="text-sm font-medium">Accent Green</p>
            <p className="text-xs text-text-muted">#A7D129</p>
          </div>

          <div className="text-center">
            <div className="w-20 h-20 rounded-lg mb-2 mx-auto bg-alert-red"></div>
            <p className="text-sm font-medium">Alert Red</p>
            <p className="text-xs text-text-muted">#D63C3C</p>
          </div>

          <div className="text-center">
            <div className="w-20 h-20 rounded-lg mb-2 mx-auto bg-dark-gray border border-gray-300"></div>
            <p className="text-sm font-medium">Dark Gray</p>
            <p className="text-xs text-text-muted">#333333</p>
          </div>

          <div className="text-center">
            <div className="w-20 h-20 rounded-lg mb-2 mx-auto bg-light-gray border border-gray-300"></div>
            <p className="text-sm font-medium">Light Gray</p>
            <p className="text-xs text-text-muted">#F7F9FB</p>
          </div>

          <div className="text-center">
            <div className="w-20 h-20 rounded-lg mb-2 mx-auto bg-white border border-gray-300"></div>
            <p className="text-sm font-medium">White</p>
            <p className="text-xs text-text-muted">#FFFFFF</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DemoPage;
