import * as v from "valibot";

export const UserNameFormSchema = v.object({
  name: v.pipe(v.string(), v.maxLength(120)),
});
