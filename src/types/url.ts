import { Link } from "@/lib/generated/prisma/client";
import * as v from "valibot";
import { Errors } from "./common";

export const LinkFormSchema = v.object({
  originalUrl: v.pipe(
    v.string(),
    v.nonEmpty("Enter your URL"),
    v.url("Invalid URL"),
    v.maxLength(2048),
  ),
});

export type LinkForm = v.InferOutput<typeof LinkFormSchema>;

export type LinkAction = Link | Errors | null;
