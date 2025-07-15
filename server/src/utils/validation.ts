import { z } from 'zod';

export class ValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ValidationError';
  }
}

// Zod schemas for validation
export const emailSchema = z
  .string()
  .min(1, 'Email is required')
  .email('Please enter a valid email address')
  .max(100, 'Email must be less than 100 characters')
  .transform(val => val.trim().toLowerCase());

export const phoneNumberSchema = z
  .string()
  .min(1, 'Phone number is required')
  .transform(val => val.replace(/\s/g, ''))
  .refine(val => val.length >= 10, 'Phone number must be at least 10 characters')
  .refine(val => val.length <= 20, 'Phone number must be less than 20 characters')
  .refine(val => /^[\+]?[1-9][\d]{0,15}$/.test(val), 'Please enter a valid phone number');

export const passwordSchema = z
  .string()
  .min(1, 'Password is required')
  .min(8, 'Password must be at least 8 characters long')
  .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, 'Password must contain at least one uppercase letter, one lowercase letter, and one number')
  .max(255, 'Password must be less than 255 characters');

export const nameSchema = z
  .string()
  .min(1, 'Name is required')
  .min(2, 'Name must be at least 2 characters')
  .max(50, 'Name must be less than 50 characters')
  .regex(/^[a-zA-Z\s]+$/, 'Name can only contain letters and spaces')
  .transform(val => val.trim());

  export const roleIdSchema = z.number()
  .int()
  .refine(val => [1, 2, 3, 4].includes(val), {
    message: 'Invalid roleId value',
  });
  
// User validation schemas
export const userRegistrationSchema = z.object({
  firstName: nameSchema,
  lastName: nameSchema,
  email: emailSchema,
  phoneNumber: phoneNumberSchema,
  password: passwordSchema,
  role: roleIdSchema.default(2)
});

export const userUpdateSchema = z.object({
  firstName: nameSchema.optional(),
  lastName: nameSchema.optional(),
  email: emailSchema.optional(),
  phoneNumber: phoneNumberSchema.optional(),
  password: passwordSchema.optional(),
  roleId: roleIdSchema.optional()
}).refine(data => Object.keys(data).length > 0, {
  message: 'At least one field must be provided for update'
});

export const userLoginSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, 'Password is required').min(8, 'Password must be at least 8 characters long')
});

export const roleValidationSchema = z.object({
  roleId: roleIdSchema
});

export class UserValidation {
  /**
   * Validates email format using Zod
   */
  static validateEmail(email: string): { success: boolean; error?: string } {
    try {
      emailSchema.parse(email);
      return { success: true };
    } catch (error) {
      if (error instanceof z.ZodError) {
        return { success: false, error: error.errors[0].message };
      }
      return { success: false, error: 'Invalid email' };
    }
  }

  /**
   * Validates phone number format using Zod
   */
  static validatePhoneNumber(phoneNumber: string): { success: boolean; error?: string } {
    try {
      phoneNumberSchema.parse(phoneNumber);
      return { success: true };
    } catch (error) {
      if (error instanceof z.ZodError) {
        return { success: false, error: error.errors[0].message };
      }
      return { success: false, error: 'Invalid phone number' };
    }
  }

  /**
   * Validates password strength using Zod
   */
  static validatePassword(password: string): { success: boolean; error?: string } {
    try {
      passwordSchema.parse(password);
      return { success: true };
    } catch (error) {
      if (error instanceof z.ZodError) {
        return { success: false, error: error.errors[0].message };
      }
      return { success: false, error: 'Invalid password' };
    }
  }

  /**
   * Validates first name using Zod
   */
  static validateFirstName(firstName: string): { success: boolean; error?: string } {
    try {
      nameSchema.parse(firstName);
      return { success: true };
    } catch (error) {
      if (error instanceof z.ZodError) {
        return { success: false, error: error.errors[0].message };
      }
      return { success: false, error: 'Invalid first name' };
    }
  }

  /**
   * Validates last name using Zod
   */
  static validateLastName(lastName: string): { success: boolean; error?: string } {
    try {
      nameSchema.parse(lastName);
      return { success: true };
    } catch (error) {
      if (error instanceof z.ZodError) {
        return { success: false, error: error.errors[0].message };
      }
      return { success: false, error: 'Invalid last name' };
    }
  }

  /**
   * Validates roleId using Zod
   */
  static validateRole(roleId: number): { success: boolean; error?: string } {
    try {
      roleIdSchema.parse(roleId);
      return { success: true };
    } catch (error) {
      if (error instanceof z.ZodError) {
        return { success: false, error: error.errors[0].message };
      }
      return { success: false, error: 'Invalid role' };
    }
  }

  /**
   * Comprehensive user data validation using Zod
   */
  static validateUserData(userData: any): { isValid: boolean; errors: string[]; data?: any } {
    try {
      const validatedData = userRegistrationSchema.parse(userData);
      return { isValid: true, data: validatedData, errors: [] };
    } catch (error) {
      if (error instanceof z.ZodError) {
        return {
          isValid: false,
          errors: error.errors.map(err => err.message)
        };
      }
      return {
        isValid: false,
        errors: ['Validation failed']
      };
    }
  }

  /**
   * Validate user update data using Zod
   */
  static validateUserUpdate(userData: any): { isValid: boolean; errors: string[]; data?: any } {
    try {
      const validatedData = userUpdateSchema.parse(userData);
      return { isValid: true, data: validatedData, errors: [] };
    } catch (error) {
      if (error instanceof z.ZodError) {
        return {
          isValid: false,
          errors: error.errors.map(err => err.message)
        };
      }
      return {
        isValid: false,
        errors: ['Validation failed']
      };
    }
  }

  /**
   * Validate user login data using Zod
   */
  static validateUserLogin(userData: any): { isValid: boolean; errors: string[]; data?: any } {
    try {
      const validatedData = userLoginSchema.parse(userData);
      return { isValid: true, data: validatedData, errors: [] };
    } catch (error) {
      if (error instanceof z.ZodError) {
        return {
          isValid: false,
          errors: error.errors.map(err => err.message)
        };
      }
      return {
        isValid: false,
        errors: ['Validation failed']
      };
    }
  }

  /**
   * Sanitize user input data using Zod transforms
   */
  static sanitizeUserData(userData: any): any {
    try {
      return userUpdateSchema.parse(userData);
    } catch (error) {
      // Return original data if validation fails
      return userData;
    }
  }
}

export default UserValidation; 