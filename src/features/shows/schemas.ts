import {z} from 'zod';
import {DIFFICULTY_VALUES} from "@/lib/constants";


export const createShowSchema = z.object({
  title: z.string().trim().nonempty("Show title is required"),
  difficulty: z.enum(DIFFICULTY_VALUES, "Please select a difficulty"),
  price: z.number().nonnegative("Price cannot be negative"),
  duration: z.object({
    minutes: z.number().int().min(0, "Minutes cannot be negative").max(59, {error: "Your show is too long", }),
    seconds: z.number().int().min(0, "Seconds cannot be negative").max(59, "Seconds cannot be more than 59"),
  }),
  description: z.string()
})

export const updateShowSchema = createShowSchema.safeExtend({id: z.number().nonnegative()})