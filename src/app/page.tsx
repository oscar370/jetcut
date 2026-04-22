import {
  Item,
  ItemContent,
  ItemDescription,
  ItemMedia,
} from "@/components/ui/item";
import { AddLink } from "@/features/links";
import { auth } from "@/lib/auth";
import { Info } from "lucide-react";

export default async function Page() {
  const session = await auth();

  return (
    <div className="flex h-[calc(100dvh-44px)] w-full items-center justify-center">
      <main className="w-full space-y-2">
        <div className="space-y-1">
          <h1 className="text-center text-2xl font-bold">Shorten Link</h1>

          <AddLink />

          {!session?.user && (
            <Item variant="outline">
              <ItemMedia>
                <Info />
              </ItemMedia>
              <ItemContent>
                <ItemDescription>
                  For unregistered users, links are valid for 48 hours
                </ItemDescription>
              </ItemContent>
            </Item>
          )}
        </div>
      </main>
    </div>
  );
}
