import { ZodSchema } from 'zod';
import { Request, Response, NextFunction } from 'express';

export const validate =
  (schema: ZodSchema) =>
  (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      const errors = result.error.flatten().fieldErrors;
      return res.status(400).json({ message: 'Validation Error', errors });
    }
    req.body = result.data;
    next();
  };