import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../Database/models/user';
import { findUserByEmail } from "../services/userService";

const JWT_SECRET = process.env.JWT_SECRET || 'secrerntnffksmdfakdsmakfsakf222';

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

      response.cookie("userToken", token, {
        httpOnly: true,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        secure: process.env.NODE_ENV === 'production'
      });

      return response.status(201).json({
        message: 'User registered successfully',
        data: {
          id: user.id,
          name: user.name,
          email: user.email,
          roleId: user.roleId
        }});
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

      response.cookie("userToken", token, {
        httpOnly: true,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        secure: process.env.NODE_ENV === 'production'
      });

      return response.status(200).json({
        message: 'User LogdIn successfully',
        data: {
          id: user.id,
          name: user.name,
          email: user.email,
          roleId: user.roleId,
          phoneNumber: user.phoneNumber,
          gender: user.gender
        }});
    } catch (error: any) {
      return response.status(500).json({ message: error.message || 'LogIn failed' });
    }
  };