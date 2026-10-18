import * as z from "zod";

export const nameSchema = z.string().trim().nonempty("Required")

export const usernameSeletSchema = z
  .string()
  .min(3)
  .max(30)
  .regex(/^[a-z0-9_.]+$/);
export const usernameUpsertSchema = z
  .string()
  .trim()
  .min(3, "Minimum 3 characters long")
  .max(30, "Maximum 30 characters long")
  .regex(/^[a-zA-Z0-9_.]+$/, "Letters, numbers, underscores, dots only");

export const emailSchema = z.email("Invalid email address");

export const passwordSchema = z.string().trim().min(8, "Minimum 8 characters long");