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
    <div className="h-[calc(100dvh-44px)] w-full flex justify-center items-center">
      <main className="space-y-2 w-full">
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
