import { z } from 'zod';

export const name = z
  .string()
  .max(150)
  .regex(/^[a-zA-Z\s]+$/, 'Name can only contain letters and spaces')
  .transform(val => val.trim());

export const email = z
  .string()
  .email('Please enter a valid email')
  .max(100)
  .transform(val => val.trim().toLowerCase());

  export const password = z
  .string()
  .min(8, 'Password must be at least 8 characters')
  .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, 'Password must contain uppercase, lowercase, and a number')
  .max(255);

  export const phoneNumber = z
  .string()
  .min(1, 'Phone number is required')
  .transform(val => val.replace(/\s/g, '')) // Remove spaces
  .refine(val => val.length >= 10, 'Phone number must be at least 10 digits')
  .refine(val => val.length <= 20, 'Phone number must be less than 20 digits')
  .refine(
    val =>/^\d{10,20}$/.test(val),
    'Please enter a valid phone number'
  );

export const roleId = z
.number()
.int()
.refine(val => [2, 3].includes(val), {
  message: 'Invalid roleId value',
});

export const gender = z
.string()
.transform(val => val.trim().toLowerCase())
.refine(val => ["male", "female"].includes(val), {
  message: 'Invalid value',
});
