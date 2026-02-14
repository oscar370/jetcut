"use client";

import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { updateUserName } from "@/lib/actions";
import { User } from "@/lib/generated/prisma/client";
import { useActionState } from "react";

type EditUserProps = {
  user: User;
};

export function EditUser({ user }: EditUserProps) {
  const [state, action, pending] = useActionState(updateUserName, null);

  return (
    <form action={action} className="space-y-1">
      <Field data-invalid={state?.errors?.name && true}>
        <FieldLabel>Name</FieldLabel>
        <Input
          name="name"
          defaultValue={user.name ?? "unknown"}
          required
          maxLength={120}
          aria-invalid={state?.errors?.name && true}
        />
        {state?.errors?.name && (
          <FieldError errors={[{ message: state.errors.name[0] }]} />
        )}
      </Field>

      <Button className="cursor-pointer" type="submit" disabled={pending}>
        Save changes
      </Button>
    </form>
  );
}
