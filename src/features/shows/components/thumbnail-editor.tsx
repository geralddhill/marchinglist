"use client";

import { Card, CardAction, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UploadButton } from "@/components/uploadthing";
import { Image } from "next/dist/client/image-component";
import { publicFileUrl } from "@/lib/files";
import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { deleteShowThumbnailAction } from "@/features/shows/actions";

type ThumbnailEditorProps = {
  id: number;
  title: string;
  thumbnailKey: string | null;
};

export default function ThumbnailEditor({
  id,
  title,
  thumbnailKey,
}: ThumbnailEditorProps) {
  const router = useRouter();

  return (
    <Card className="w-full sm:max-w-md">
      <CardHeader>
        <CardTitle>
          <h2>Upload Thumbnail</h2>
        </CardTitle>
        {thumbnailKey && (
          <CardAction>
            <Button
              type="button"
              onClick={async () => await deleteShowThumbnailAction(id)}
            >
              Delete
            </Button>
          </CardAction>
        )}
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        {thumbnailKey && (
          <div className="bg-muted relative aspect-5/4 h-auto w-full overflow-hidden rounded-md">
            <Image
              src={publicFileUrl(thumbnailKey)}
              alt={title}
              fill
              sizes="50vw"
              loading="eager"
              style={{ objectFit: "cover" }}
            />
          </div>
        )}
        <UploadButton
          config={{ cn: cn }}
          endpoint="showThumbnail"
          input={id}
          appearance={{
            button: cn(buttonVariants({ variant: "default", size: "default" })),
            allowedContent: "text-muted-foreground",
          }}
          onClientUploadComplete={() => router.refresh()}
        />
      </CardContent>
    </Card>
  );
}
