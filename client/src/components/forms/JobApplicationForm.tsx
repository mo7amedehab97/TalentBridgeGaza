import React from "react";
import { Form, Input, Select, Textarea, Checkbox, Button, Alert } from "../ui";
import {
  jobApplicationSchema,
  JobApplicationForm as JobApplicationFormType,
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

const skillOptions = [
  { value: "javascript", label: "JavaScript" },
  { value: "react", label: "React" },
  { value: "nodejs", label: "Node.js" },
  { value: "python", label: "Python" },
  { value: "java", label: "Java" },
  { value: "sql", label: "SQL" },
  { value: "aws", label: "AWS" },
  { value: "docker", label: "Docker" },
  { value: "kubernetes", label: "Kubernetes" },
  { value: "git", label: "Git" },
];

interface JobApplicationFormProps {
  jobTitle: string;
  onSubmit: (data: JobApplicationFormType) => void;
  isLoading?: boolean;
  error?: string;
}

export const JobApplicationForm: React.FC<JobApplicationFormProps> = ({
  jobTitle,
  onSubmit,
  isLoading = false,
  error,
}) => {
  const handleSubmit = (data: JobApplicationFormType) => {
    onSubmit(data);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-semibold mb-6">Apply for {jobTitle}</h2>

      {error && (
        <Alert type="error" className="mb-6">
          {error}
        </Alert>
      )}

      <Form
        schema={jobApplicationSchema}
        onSubmit={handleSubmit}
        defaultValues={{
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          coverLetter: "",
          experience: "",
          education: "",
          skills: [],
          portfolio: "",
          linkedin: "",
          github: "",
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
        />

        <Input
          name="phone"
          label="Phone Number"
          type="tel"
          placeholder="Enter your phone number"
          required
        />

        <div className="flex gap-4 mb-4">
          <Select
            name="experience"
            label="Experience Level"
            options={experienceOptions}
            placeholder="Select your experience level"
            required
          />
          <Select
            name="education"
            label="Education Level"
            options={educationOptions}
            placeholder="Select your education level"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-primary-blue font-medium mb-2 text-sm">
            Skills <span className="text-alert-red"> *</span>
          </label>
          <div className="grid grid-cols-2 gap-2">
            {skillOptions.map((skill) => (
              <Checkbox
                key={skill.value}
                name={`skills.${skill.value}`}
                label={skill.label}
              />
            ))}
          </div>
        </div>

        <div className="flex gap-4 mb-4">
          <Input
            name="portfolio"
            label="Portfolio URL"
            type="url"
            placeholder="https://your-portfolio.com"
            helpText="Optional: Link to your portfolio or personal website"
          />
          <Input
            name="linkedin"
            label="LinkedIn Profile"
            type="url"
            placeholder="https://linkedin.com/in/your-profile"
            helpText="Optional: Your LinkedIn profile URL"
          />
        </div>

        <Input
          name="github"
          label="GitHub Profile"
          type="url"
          placeholder="https://github.com/your-username"
          helpText="Optional: Your GitHub profile URL"
        />

        <Textarea
          name="coverLetter"
          label="Cover Letter"
          placeholder="Tell us why you're the perfect fit for this position..."
          rows={6}
          required
          helpText="Minimum 100 characters, maximum 2000 characters"
        />

        <Checkbox
          name="agreeToTerms"
          label="I confirm that all information provided is accurate"
          required
        />

        <Button
          type="submit"
          variant="primary"
          size="lg"
          disabled={isLoading}
          className="w-full"
        >
          {isLoading ? "Submitting Application..." : "Submit Application"}
        </Button>
      </Form>

      <div className="mt-6 p-4 bg-success-bg rounded-lg">
        <h3 className="font-semibold mb-2">Application Tips</h3>
        <ul className="text-sm text-text-muted space-y-1">
          <li>• Tailor your cover letter to this specific position</li>
          <li>• Highlight relevant skills and experience</li>
          <li>• Keep your portfolio and social links up to date</li>
          <li>• Double-check all information before submitting</li>
        </ul>
      </div>
    </div>
  );
};
