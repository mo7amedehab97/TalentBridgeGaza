import { z } from 'zod';

// Common validation patterns
export const emailSchema = z
  .string()
  .min(1, 'Email is required')
  .email('Please enter a valid email address')
  .max(100, 'Email must be less than 100 characters')
  .transform(val => val.trim().toLowerCase());

export const passwordSchema = z
  .string()
  .min(1, 'Password is required')
  .min(8, 'Password must be at least 8 characters')
  .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, 'Password must contain at least one uppercase letter, one lowercase letter, and one number')
  .max(255, 'Password must be less than 255 characters');

export const phoneSchema = z
  .string()
  .min(1, 'Phone number is required')
  .regex(/^[\+]?[1-9][\d]{0,15}$/, 'Please enter a valid phone number');

export const urlSchema = z
  .string()
  .url('Please enter a valid URL')
  .optional()
  .or(z.literal(''));

export const nameSchema = z
  .string()
  .min(1, 'Name is required')
  .min(2, 'Name must be at least 2 characters')
  .max(50, 'Name must be less than 50 characters')
  .regex(/^[a-zA-Z\s]+$/, 'Name can only contain letters and spaces')
  .transform(val => val.trim());

export const phoneNumberSchema = z
  .string()
  .min(1, 'Phone number is required')
  .transform(val => val.replace(/\s/g, ''))
  .refine(val => val.length >= 10, 'Phone number must be at least 10 characters')
  .refine(val => val.length <= 20, 'Phone number must be less than 20 characters')
  .refine(val => /^[\+]?[1-9][\d]{0,15}$/.test(val), 'Please enter a valid phone number');

export const roleSchema = z.enum(['ADMIN', 'CONTRACTOR', 'CLIENT', 'COMPANY'], {
  required_error: 'Role is required',
  invalid_type_error: 'Invalid role value'
});

// User registration schema
export const userRegistrationSchema = z.object({
  firstName: nameSchema,
  lastName: nameSchema,
  email: emailSchema,
  phoneNumber: phoneNumberSchema,
  password: passwordSchema,
  role: roleSchema.default('CONTRACTOR'),
});

// User login schema
export const userLoginSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, 'Password is required'),
  rememberMe: z.boolean().optional(),
});

// Profile update schema
export const profileUpdateSchema = z.object({
  firstName: z.string().min(1, 'First name is required').min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(1, 'Last name is required').min(2, 'Last name must be at least 2 characters'),
  email: emailSchema,
  phone: phoneSchema,
  bio: z.string().max(500, 'Bio must be less than 500 characters').optional(),
  location: z.string().min(1, 'Location is required'),
  website: urlSchema,
  linkedin: urlSchema,
  github: urlSchema,
});

// Job application schema
export const jobApplicationSchema = z.object({
  firstName: z.string().min(1, 'First name is required').min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(1, 'Last name is required').min(2, 'Last name must be at least 2 characters'),
  email: emailSchema,
  phone: phoneSchema,
  coverLetter: z.string().min(100, 'Cover letter must be at least 100 characters').max(2000, 'Cover letter must be less than 2000 characters'),
  experience: z.string().min(1, 'Please select your experience level'),
  education: z.string().min(1, 'Please select your education level'),
  skills: z.array(z.string()).min(1, 'Please select at least one skill'),
  portfolio: urlSchema,
  linkedin: urlSchema,
  github: urlSchema,
  agreeToTerms: z.boolean().refine((val) => val === true, 'You must agree to the terms and conditions'),
});

// Job posting schema
export const jobPostingSchema = z.object({
  title: z.string().min(1, 'Job title is required').min(5, 'Job title must be at least 5 characters'),
  company: z.string().min(1, 'Company name is required').min(2, 'Company name must be at least 2 characters'),
  location: z.string().min(1, 'Location is required'),
  type: z.enum(['full-time', 'part-time', 'contract', 'internship'], {
    required_error: 'Please select a job type',
  }),
  remote: z.boolean().optional(),
  salary: z.object({
    min: z.number().min(0, 'Minimum salary must be positive'),
    max: z.number().min(0, 'Maximum salary must be positive'),
    currency: z.string().min(1, 'Currency is required'),
  }).refine((data) => data.max >= data.min, {
    message: "Maximum salary must be greater than or equal to minimum salary",
    path: ["max"],
  }),
  description: z.string().min(100, 'Job description must be at least 100 characters').max(5000, 'Job description must be less than 5000 characters'),
  requirements: z.array(z.string()).min(1, 'Please add at least one requirement'),
  benefits: z.array(z.string()).optional(),
  skills: z.array(z.string()).min(1, 'Please select at least one skill'),
  experience: z.string().min(1, 'Please select required experience level'),
  education: z.string().min(1, 'Please select required education level'),
  applicationDeadline: z.date().min(new Date(), 'Application deadline must be in the future'),
});

// Contact form schema
export const contactFormSchema = z.object({
  name: z.string().min(1, 'Name is required').min(2, 'Name must be at least 2 characters'),
  email: emailSchema,
  subject: z.string().min(1, 'Subject is required').min(5, 'Subject must be at least 5 characters'),
  message: z.string().min(10, 'Message must be at least 10 characters').max(1000, 'Message must be less than 1000 characters'),
});

// Search form schema
export const searchFormSchema = z.object({
  query: z.string().min(1, 'Search query is required'),
  location: z.string().optional(),
  type: z.enum(['all', 'full-time', 'part-time', 'contract', 'internship']).optional(),
  remote: z.boolean().optional(),
  experience: z.string().optional(),
  skills: z.array(z.string()).optional(),
});

// Password reset schema
export const passwordResetSchema = z.object({
  email: emailSchema,
});

// Password change schema
export const passwordChangeSchema = z.object({
  currentPassword: z.string().min(1, 'Current password is required'),
  newPassword: passwordSchema,
  confirmPassword: z.string().min(1, 'Please confirm your new password'),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

// Export types
export type UserRegistrationForm = z.infer<typeof userRegistrationSchema>;
export type UserLoginForm = z.infer<typeof userLoginSchema>;
export type ProfileUpdateForm = z.infer<typeof profileUpdateSchema>;
export type JobApplicationForm = z.infer<typeof jobApplicationSchema>;
export type JobPostingForm = z.infer<typeof jobPostingSchema>;
export type ContactForm = z.infer<typeof contactFormSchema>;
export type SearchForm = z.infer<typeof searchFormSchema>;
export type PasswordResetForm = z.infer<typeof passwordResetSchema>;
export type PasswordChangeForm = z.infer<typeof passwordChangeSchema>; 