import { Request, Response, NextFunction } from 'express';
import UserValidation, { ValidationError } from '../utils/validation';

export interface UserValidationRequest extends Request {
  validatedUserData?: any;
}

/**
 * Middleware to validate user registration data using Zod
 */
export const validateUserRegistration = (req: UserValidationRequest, res: Response, next: NextFunction) => {
  try {
    const validation = UserValidation.validateUserData(req.body);

    if (!validation.isValid) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: validation.errors
      });
    }

    // Store validated data in request for use in controller
    req.validatedUserData = validation.data;
    next();
  } catch (error) {
    console.error('User validation error:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error during validation'
    });
  }
};

/**
 * Middleware to validate user update data using Zod
 */
export const validateUserUpdate = (req: UserValidationRequest, res: Response, next: NextFunction) => {
  try {
    const validation = UserValidation.validateUserUpdate(req.body);

    if (!validation.isValid) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: validation.errors
      });
    }

    // Store validated data in request for use in controller
    req.validatedUserData = validation.data;
    next();
  } catch (error) {
    console.error('User update validation error:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error during validation'
    });
  }
};

/**
 * Middleware to validate user login data using Zod
 */
export const validateUserLogin = (req: Request, res: Response, next: NextFunction) => {
  try {
    const validation = UserValidation.validateUserLogin(req.body);

    if (!validation.isValid) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: validation.errors
      });
    }

    next();
  } catch (error) {
    console.error('User login validation error:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error during validation'
    });
  }
};

/**
 * Middleware to validate role-based access using Zod
 */
export const validateRole = (allowedRoles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const userRole = req.body.role || req.query.role || req.params.role;

      if (!userRole) {
        return res.status(400).json({
          success: false,
          message: 'Role is required',
          errors: ['Role must be specified']
        });
      }

      const validation = UserValidation.validateRole(userRole);
      if (!validation.success) {
        return res.status(400).json({
          success: false,
          message: 'Invalid role',
          errors: [validation.error || 'Invalid role value']
        });
      }

      if (!allowedRoles.includes(userRole)) {
        return res.status(403).json({
          success: false,
          message: 'Access denied',
          errors: [`Role ${userRole} is not authorized for this operation`]
        });
      }

      next();
    } catch (error) {
      console.error('Role validation error:', error);
      return res.status(500).json({
        success: false,
        message: 'Internal server error during role validation'
      });
    }
  };
};

export default {
  validateUserRegistration,
  validateUserUpdate,
  validateUserLogin,
  validateRole
}; 