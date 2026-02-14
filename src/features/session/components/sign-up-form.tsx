"use client";

import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

export function SignUpForm() {
  return (
    <form>
      <Field>
        <FieldLabel>Name</FieldLabel>
        <Input />
      </Field>
    </form>
  );
}
