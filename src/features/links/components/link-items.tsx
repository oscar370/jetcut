"use client";

import { Button } from "@/components/ui/button";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from "@/components/ui/item";
import { Spinner } from "@/components/ui/spinner";
import { deleteLinkById } from "@/lib/actions";
import { Link } from "@/lib/generated/prisma/client";
import { handleCopyUrl } from "@/lib/utils";
import { Copy, Trash } from "lucide-react";
import { useTransition } from "react";
import { toast } from "sonner";

type LinkItemsProps = {
  links: Link[];
};

export function LinkItems({ links }: LinkItemsProps) {
  const [isPending, startTransition] = useTransition();

  function handleDelete(link: Link) {
    startTransition(async () => {
      const result = await deleteLinkById(link.id);

      if (!result?.success) {
        toast.error("Failed to remove the link");
      }

      toast.success("Link successfully deleted");
    });
  }

  return (
    <>
      {links.length === 0 ? (
        <p>You haven&apos;t shortened any links yet</p>
      ) : (
        <ul className="space-y-1">
          {links.map((link) => (
            <li className="list-none" key={link.id}>
              <Item variant="outline">
                <ItemContent>
                  <ItemTitle>{link.originalUrl}</ItemTitle>
                  <ItemDescription>
                    <span>Short URL: </span>
                    <span>{`https://jetcut.vercel.app/${link.shortUrl}`}</span>
                    <br />
                    <span>Expire at: </span>
                    <span> {link.expireAt?.toLocaleDateString()} </span>
                  </ItemDescription>
                </ItemContent>
                <ItemActions>
                  <Button
                    className="cursor-pointer"
                    onClick={() =>
                      handleCopyUrl(
                        `https://jetcut.vercel.app/${link.shortUrl}`,
                      )
                    }
                  >
                    <Copy />
                  </Button>
                  <Button
                    className="cursor-pointer"
                    variant="destructive"
                    disabled={isPending}
                    onClick={() => startTransition(() => handleDelete(link))}
                  >
                    {isPending ? <Spinner /> : <Trash />}
                  </Button>
                </ItemActions>
              </Item>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
