import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User, { Role } from '../models/user';
import UserValidation from '../utils/validation';

const JWT_SECRET = process.env.JWT_SECRET || 'secrerntnffksmdfakdsmakfsakf222';
const JWT_EXPIRES_IN = '7d';

// Signup controller
export const signup = async (req: Request, res: Response) => {
  try {
    // Input already validated by middleware
    const { firstName, lastName, email, phoneNumber, password, role } = req.body;

    // Check if user already exists
    const existing = await User.findOne({ where: { email } });
    if (existing) {
      return res.status(409).json({ success: false, message: 'Email already in use' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await User.create({
      firstName,
      lastName,
      email,
      phoneNumber,
      password: hashedPassword,
      role: role || Role.CONTRACTOR
    });

    // Generate JWT
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );

    return res.status(201).json({
      success: true,
      message: 'User registered successfully',
      data: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phoneNumber: user.phoneNumber,
        role: user.role
      },
      token
    });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message || 'Signup failed' });
  }
};

// Signin controller
export const signin = async (req: Request, res: Response) => {
  try {
    // Input already validated by middleware
    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    // Compare password
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    // Generate JWT
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );

    return res.status(200).json({
      success: true,
      message: 'Signin successful',
      data: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phoneNumber: user.phoneNumber,
        role: user.role
      },
      token
    });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message || 'Signin failed' });
  }
}; 