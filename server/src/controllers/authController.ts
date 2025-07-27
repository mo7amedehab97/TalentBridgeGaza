import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../Database/models/user';
import { findUserByEmail } from "../services/userService";

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
  throw new Error('JWT_SECRET is not defined in environment variables');
}

  export const signup = async (request: Request, response: Response) => {
    try {
      const { name, email, phoneNumber, password, roleId, gender } = request.body;

      const existing = await findUserByEmail(email);
      if (existing) {
        return response.status(409).json({ success: false, message: 'Email already in use' });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const user = await User.create({
        name,
        email,
        phoneNumber,
        password: hashedPassword,
        roleId,
        gender
      });

      const token = jwt.sign(
        { id: user.id, email: user.email, roleId: user.roleId },
        JWT_SECRET,
        { expiresIn: "7d" }
      );

      return response.status(201).json({
        success: true,
        message: 'User registered successfully',
        data: {
          id: user.id,
          name: user.name,
          email: user.email,
          roleId: user.roleId,
          phoneNumber: user.phoneNumber,
          gender: user.gender
        },
        token
      });
    } catch (error: any) {
      return response.status(500).json({ message: error.message || 'Signup failed' });
    }
  };


  export const login = async (request: Request, response: Response) => {
    try {
      const { email, password } = request.body;

      const user = await findUserByEmail(email);
      if (!user) return response.status(401).json({ message: 'Invalid credentials' });

      const valid = await bcrypt.compare(password, user.password);
      if (!valid) return response.status(401).json({ message: 'Invalid credentials' });

      const token = jwt.sign(
        { id: user.id, email: user.email, roleId: user.roleId },
        JWT_SECRET,
        { expiresIn: "7d" }
      );

      return response.status(200).json({
        success: true,
        message: 'User logged in successfully',
        data: {
          id: user.id,
          name: user.name,
          email: user.email,
          roleId: user.roleId,
          phoneNumber: user.phoneNumber,
          gender: user.gender
        },
        token
      });
    } catch (error: any) {
      return response.status(500).json({ message: error.message || 'LogIn failed' });
    }
  };