import * as z from "zod";

export const nameSchema = z.string().trim().nonempty("Required")

export const usernameSchema = z
  .string()
  .trim()
  .min(3, "Minimum 3 characters long")
  .max(30, "Maximum 30 characters long")
  .regex(/^[a-zA-Z0-9_.]+$/, "Letters, numbers, underscores, dots only");

export const emailSchema = z.email("Invalid email address");

export const passwordSchema = z.string().trim().min(8, "Minimum 8 characters long");