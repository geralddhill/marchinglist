import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
import { auth } from "@/lib/auth";

const f = createUploadthing();

export const uploadRouter = {
  userImage: f({
    image: {
      maxFileSize: "2MB",
    },
  })
    .middleware(({ req }) => {
      const session = auth.api.getSession({
        headers: req.headers,
      });

      if (!session) throw new UploadThingError("Unauthorized");

      return {};
    })
    .onUploadComplete(() => {}),
} satisfies FileRouter;

export type UploadRouter = typeof uploadRouter;
