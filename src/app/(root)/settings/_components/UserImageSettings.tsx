"use client"
import { UploadButton } from "@/components/uploadthing";
import { Image } from "next/dist/client/image-component";
import { authClient } from "@/lib/auth-client";
import { notFound } from "next/dist/client/components/not-found";
import { useRouter } from "next/dist/client/components/navigation";

export default function UserImageSettings() {
  const router = useRouter();
  const { data: session, isPending, refetch } = authClient.useSession();

  if (isPending) return (<div></div>);
  if (!session) notFound();

  const {name, image} = session.user;
  const avatarUrl = image ?? "/default_avatar.png";

  return (
    <div className="flex flex-col lg:flex-row items-center justify-center gap-8">
      <div className="relative aspect-square size-[calc(6lh)] overflow-hidden rounded-full">
        <Image
          src={avatarUrl}
          alt={`${name}'s avatar`}
          fill
          sizes="33vw"
          className="object-cover"
        />
      </div>
      <UploadButton
        className="btn-primary text-base"
        endpoint="userAvatar"
        onClientUploadComplete={async () => {
          await refetch()
          router.refresh()
        }}
        onUploadError={() => {
          // Do something with the error.
          alert("Error uploading image. Please try again later.");
        }}
      />
    </div>
  );
}