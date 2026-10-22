import { DropdownMenu } from "radix-ui";
import { Plus } from "lucide-react";
import Link from "next/dist/client/link";

export default function AddButton() {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button
          className="btn-primary aspect-square h-4/5 p-2 cursor-pointer overflow-hidden rounded-full"
          aria-label="add menu"
          aria-controls="add-menu"
        >
          <Plus className="size-full" size={40} />
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content className="border text-xl" id="add-menu">
          <DropdownMenu.Item asChild className="hover:outline-0">
            <Link
              href={"/create-show"}
              className="bg-background3 hover:bg-background2 block p-2"
            >
              Create Show
            </Link>
          </DropdownMenu.Item>

          <DropdownMenu.Arrow className="fill-current" />
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}