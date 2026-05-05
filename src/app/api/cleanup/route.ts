import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  try {
    const deleted = await prisma.link.deleteMany({
      where: {
        expireAt: { lt: new Date() },
      },
    });

    return NextResponse.json({
      success: true,
      message: `Cleanup complete. Rows deleted: ${deleted.count}`,
    });
  } catch (error) {
    console.error("Cleaning error:", error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
