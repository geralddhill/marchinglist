import { genUploader } from "uploadthing/client";
import type { UploadRouter } from "@/app/api/uploadthing/core";
export const { uploadFiles } = genUploader<UploadRouter>();

export function publicFileUrl(key: string): string {
  return `https://${process.env.NEXT_PUBLIC_UPLOADTHING_APP_ID!}.ufs.sh/f/${key}`;
}