import * as v from "valibot";

export const linkFormSchema = v.object({
  originalUrl: v.pipe(
    v.string(),
    v.nonEmpty("Enter your URL"),
    v.url("Invalid URL"),
    v.maxLength(2048),
  ),
});

export type LinkForm = v.InferOutput<typeof linkFormSchema>;
