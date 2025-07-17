import { z } from 'zod';
import {email, name,password, phoneNumber, roleId, gender } from "./rules";

export const userRegistrationSchema = z.object({
  name,
  email,
  phoneNumber,
  password,
  roleId,
  gender,
});

export const userLoginSchema = z.object({
  email,
  password,
});
