"use server";

import { LinkForm } from "@/types/url";
import { addHours } from "date-fns";
import prisma from "./prisma";
import { encodeBase62 } from "./utils";

export async function createShortUrl(data: LinkForm) {
  return prisma.$transaction(async (txn) => {
    const newLink = await txn.link.create({
      data: {
        originalUrl: data.originalUrl,
        shortUrl: "",
        expireAt: addHours(new Date(), 48),
      },
    });

    const code = encodeBase62(newLink.id);

    return await txn.link.update({
      where: { id: newLink.id },
      data: { shortUrl: code },
    });
  });
}
