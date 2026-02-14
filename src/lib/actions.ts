"use server";

import { ActionResponse } from "@/types/common";
import { LinkFormSchema } from "@/types/url";
import { UserNameFormSchema } from "@/types/user";
import { addDays, addHours } from "date-fns";
import { refresh } from "next/cache";
import { flatten, safeParse } from "valibot";
import { auth } from "./auth";
import { Link, User } from "./generated/prisma/client";
import prisma from "./prisma";
import { encodeBase62 } from "./utils";

export async function createShortUrl(
  _formState: ActionResponse<Link>,
  formData: FormData,
): Promise<ActionResponse<Link>> {
  const result = safeParse(LinkFormSchema, {
    originalUrl: (formData.get("originalUrl") as string).replace(/\/$/, ""),
  });
  const session = await auth();

  if (!result.success) {
    return {
      success: false,
      errors: flatten(result.issues).nested as {
        [key: string]: string[] | undefined;
      },
    };
  }

  try {
    if (session?.user) {
      const existUrl = await prisma.link.findFirst({
        where: {
          originalUrl: result.output.originalUrl,
          userId: session.user.id,
          status: "active",
        },
      });

      if (existUrl) {
        return {
          success: false,
          errors: {
            duplicate: ["The URL has already been shortened"],
          },
        };
      }
    }

    const data = await prisma.$transaction(async (txn) => {
      const newLink = await txn.link.create({
        data: {
          userId: session?.user ? session.user.id : null,
          originalUrl: result.output.originalUrl,
          shortUrl: "",
          expireAt: session?.user
            ? addDays(new Date(), 30)
            : addHours(new Date(), 48),
        },
      });

      const code = encodeBase62(newLink.id);

      return await txn.link.update({
        where: { id: newLink.id },
        data: { shortUrl: code },
      });
    });

    return { success: true, data };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (e) {
    return { success: false, errors: { db: ["Database error"] } };
  }
}

export async function getLinkByShortUrl(shortUrl: string) {
  return prisma.link.findFirst({
    where: { shortUrl },
  });
}

export async function getLinksByAccount(): Promise<ActionResponse<Link[]>> {
  const session = await auth();

  if (!session?.user) {
    return {
      success: false,
      errors: {
        session: ["The user is not authenticated"],
      },
    };
  }

  try {
    const user = await prisma.user.findFirst({
      where: { id: session.user.id },
    });

    if (!user) {
      return {
        success: false,
        errors: {
          user: ["The user does not exist"],
        },
      };
    }

    const links = await prisma.link.findMany({
      where: { userId: user.id },
    });

    return { success: true, data: links };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return {
      success: false,
      errors: {
        db: ["Database error"],
      },
    };
  }
}

export async function getUserById(id: string): Promise<ActionResponse<User>> {
  const session = await auth();

  if (!session?.user) {
    return {
      success: false,
      errors: {
        session: ["The user is not authenticated"],
      },
    };
  }

  try {
    const user = await prisma.user.findFirst({
      where: { id },
    });

    if (!user) {
      return {
        success: false,
        errors: {
          notFound: ["User not found"],
        },
      };
    }

    return {
      success: true,
      data: user,
    };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return {
      success: false,
      errors: {
        db: ["Database error"],
      },
    };
  }
}

export async function updateUserName(
  _formState: ActionResponse<User>,
  formData: FormData,
): Promise<ActionResponse<User>> {
  const result = safeParse(UserNameFormSchema, {
    name: formData.get("name"),
  });
  const session = await auth();
  console.log(result);

  if (!session?.user) {
    return {
      success: false,
      errors: {
        session: ["The user is not authenticated"],
      },
    };
  }

  if (!result.success) {
    return {
      success: false,
      errors: flatten(result.issues).nested as {
        [key: string]: string[] | undefined;
      },
    };
  }

  try {
    const user = await prisma.user.update({
      where: { id: session.user.id },
      data: { name: formData.get("name") as string },
    });

    session.user.name = user.name;

    refresh();
    return {
      success: true,
      data: user,
    };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return {
      success: false,
      errors: {
        db: ["Database error"],
      },
    };
  }
}

export async function deleteLinkById(
  id: number,
): Promise<ActionResponse<Pick<Link, "id">>> {
  const session = await auth();

  if (!session?.user) {
    return {
      success: false,
      errors: {
        session: ["The user is not authenticated"],
      },
    };
  }

  try {
    const link = await prisma.link.delete({
      where: { id },
    });

    refresh();
    return {
      success: true,
      data: link,
    };

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return {
      success: false,
      errors: {
        db: ["Database error"],
      },
    };
  }
}
