"use server"

import { utapi } from "@/lib/uploadthing-server";
import { deleteUserAvatar } from "@/features/users/mutations";
import { listCurrentUserShows } from "@/features/shows/queries";
import { deleteShowThumbnailAction } from "@/features/shows/actions";

export async function deleteUserAvatarAction() {
  const key = await deleteUserAvatar();
  if (key) await utapi.deleteFiles(key);
}

export async function deleteAllUserFiles() {
  // Deletes user avatar
  await deleteUserAvatarAction();

  // Deletes all files for user's shows
  const shows = await listCurrentUserShows();
  for (const show of shows) {
    // Delete thumbnail
    await deleteShowThumbnailAction(show.id)
  }
}