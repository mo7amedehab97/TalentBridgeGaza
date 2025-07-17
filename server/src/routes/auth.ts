import { Router } from 'express';
import { signup, login } from '../controllers/authController';
import { validate } from '../middlewares/validate';
import { userRegistrationSchema, userLoginSchema } from "../utils/validations/user.schema";

const router = Router();

// Signup route
router.post('/signup', validate(userRegistrationSchema), signup);

// Signin route
router.post('/login', validate(userLoginSchema), login);

export default router; 