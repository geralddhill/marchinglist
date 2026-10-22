import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { updateUserAvatar } from "@/data/users/mutations";

const f = createUploadthing();

export const uploadRouter = {
  userAvatar: f(
    {
      image: {
        maxFileSize: "2MB",
      },
    },
    { awaitServerData: true },
  )
    .middleware(async () => {
      const session = await auth.api.getSession({
        headers: await headers(),
      });
      if (!session) throw new UploadThingError("Unauthorized");

      return {
        userId: session.user.id,
      };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      await updateUserAvatar(metadata.userId, file.key);
    }),
} satisfies FileRouter;

export type UploadRouter = typeof uploadRouter;
