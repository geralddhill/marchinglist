import { z } from "zod"

export const usernameSchema = z
  .string()
  .min(3)
  .max(30)
  .regex(/^[a-z0-9_.]+$/);