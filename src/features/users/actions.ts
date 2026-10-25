"use server"

import { utapi } from "@/lib/uploadthing-server";
import { deleteUserAvatar } from "@/features/users/mutations";

export async function deleteUserAvatarAction() {
  const key = await deleteUserAvatar();
  if (key) await utapi.deleteFiles(key);
}
