import { z } from "zod";
import slugify from "slugify";
import { existsSlug } from "@/features/shows/queries";

const MAX_SLUG_LENGTH = 100;

export const slugSchema = z
  .string()
  .min(1)
  .max(100)
  .regex(/^[a-z0-9]+(-[a-z0-9]+)*$/);

export async function generateUniqueSlug(title: string): Promise<string> {
  const base = toSlug(title);
  let slug = base

  for (let i = 2; ; i++) {
    const exists = await existsSlug(base);

    if (!exists) return slug;
    slug = `${base}-${i}`;
  }
}

function toSlug(input: string, maxLength = MAX_SLUG_LENGTH): string {
  const slug = slugify(input, {
    lower: true,
    strict: true,
    trim: true,
  });

  const truncated = truncateAtWord(slug, maxLength);

  return truncated || "show"; // fallback if the result is empty
}

function truncateAtWord(slug: string, maxLength: number): string {
  if (slug.length <= maxLength) return slug;

  const cut = slug.slice(0, maxLength);
  const lastHyphen = cut.lastIndexOf("-");

  // only back up to the hyphen if it doesn't throw away too much
  return (
    lastHyphen > maxLength * 0.6
      ? cut.slice(0, lastHyphen)
      : cut
  ).replace(/-+$/g, "");
}