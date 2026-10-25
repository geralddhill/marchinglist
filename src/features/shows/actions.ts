"use server"

import { z } from "zod";
import { createShowSchema, updateShowSchema } from "@/features/shows/schemas";
import { insertShow, updateShow } from "@/features/shows/mutations";
import { generateUniqueSlug } from "@/features/shows/slug";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/dist/server/web/spec-extension/revalidate";

type ActionState = {
  fieldErrors?: {
    title?: string[] | undefined;
    difficulty?: string[] | undefined;
    price?: string[] | undefined;
    duration?: string[] | undefined;
    description?: string[] | undefined;
  };
} | null;

export async function createShowAction(_prevState: ActionState, data: z.infer<typeof createShowSchema>) {
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

  redirect(`/my-shows/${slug}`);
}

export async function updateShowAction(_prevState: ActionState, data: z.infer<typeof updateShowSchema>) {
  const parsed = updateShowSchema.safeParse(data);
  if (!parsed.success) {
    return {
      fieldErrors: z.flattenError(parsed.error).fieldErrors
    }
  }

  const {
    id,
    duration: { minutes, seconds },
    ...rest
  } = parsed.data;
  const duration = minutes * 60 + seconds;

  const slug = await generateUniqueSlug(rest.title);

  await updateShow(id, {slug, duration, ...rest})

  revalidatePath(`shows/${slug}`);
  revalidatePath(`my-shows/${slug}`);
  redirect(`/my-shows/${slug}`);
}