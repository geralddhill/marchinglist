"use server"

import { z } from "zod";
import { createShowSchema } from "@/features/shows/schemas";
import { insertShow } from "@/features/shows/mutations";
import { generateUniqueSlug } from "@/features/shows/slug";
import { redirect } from "next/navigation";

type ActionState = {
  fieldErrors?: {
    title?: string[] | undefined;
    difficulty?: string[] | undefined;
    price?: string[] | undefined;
    duration?: string[] | undefined;
    description?: string[] | undefined;
  };
} | null;

export async function createShow(_prevState: ActionState, data: z.infer<typeof createShowSchema>) {
  const parsed = createShowSchema.safeParse(data);
  if (!parsed.success) {
    return {
      fieldErrors: z.flattenError(parsed.error).fieldErrors
    }
  }

  const {duration: {minutes, seconds}, ...rest} = parsed.data;
  const duration = (minutes * 60) + seconds

  const slug = await generateUniqueSlug(rest.title);

  await insertShow({
    slug,
    duration,
    ...rest
  })

  redirect(`/shows/${slug}`);
}