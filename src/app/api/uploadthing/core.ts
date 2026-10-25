import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { updateUserAvatar } from "@/features/users/mutations";
import { z } from "zod";
import { isShowOwnedByUser } from "@/features/shows/queries";
import { updateShowThumbnail } from "@/features/shows/mutations";
import {
  revalidatePath,
} from "next/dist/server/web/spec-extension/revalidate";

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

  showThumbnail: f(
    ["image"],
  )
    .input(z.number().nonnegative())
    .middleware(async (input) => {
      const session = await auth.api.getSession({
        headers: await headers(),
      });
      if (!session) throw new UploadThingError("Unauthorized");

      if (!(await isShowOwnedByUser(input.input, session.user.id))) throw new UploadThingError("Unauthorized");

      return {showId: input.input, userId: session.user.id};
    })
    .onUploadComplete(async ({ metadata, file }) => {
      await updateShowThumbnail(metadata.showId, metadata.userId, file.key);
      revalidatePath(`/my-shows/${metadata.showId}`)
    })
} satisfies FileRouter;

export type UploadRouter = typeof uploadRouter;
