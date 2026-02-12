import prisma from "@/lib/prisma";

// DELETE FROM "Link" WHERE "expireAt" < NOW();
await prisma.link.deleteMany({
  where: {
    expireAt: { lt: new Date() },
  },
});
