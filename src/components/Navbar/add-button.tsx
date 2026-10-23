import { Plus } from "lucide-react";
import Link from "next/dist/client/link";
import { Button } from "@/components/ui/button";

export default function AddButton() {
  return (
    <Button asChild>
      <Link href="/create-show">
        <Plus/> New Show
      </Link>
    </Button>
  );
}