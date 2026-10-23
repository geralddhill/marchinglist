import {
  Empty, EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { ListMusic, Plus } from "lucide-react";
import Link from "next/dist/client/link";
import { Button } from "@/components/ui/button";

type NoShowsProps = {
  description: string
  withButton?: boolean
}

export default function NoShows({description, withButton = false}: NoShowsProps) {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia>
          <ListMusic />
        </EmptyMedia>
        <EmptyTitle>
          <h2>No Shows Yet</h2>
        </EmptyTitle>
        <EmptyDescription className="whitespace-pre-line">{description}</EmptyDescription>
      </EmptyHeader>
      {withButton && (
        <EmptyContent>
          <Button asChild>
            <Link href="/create-show">
              <Plus /> New Show
            </Link>
          </Button>
        </EmptyContent>
      )}
    </Empty>
  );
}