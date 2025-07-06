import { Router } from 'express';
import { signup, signin } from '../controllers/authController';
import { validateUserRegistration, validateUserLogin } from '../middlewares/userValidation';

const router = Router();

// Signup route
router.post('/signup', validateUserRegistration, signup);

// Signin route
router.post('/signin', validateUserLogin, signin);

export default router; 