"use client";

import { Button } from "@/components/ui/button";
import { Field, FieldError } from "@/components/ui/field";
import {
  InputGroup,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
} from "@/components/ui/item";
import { createShortUrl } from "@/lib/actions";
import { handleCopyUrl } from "@/lib/utils";
import { Copy, SendHorizontal } from "lucide-react";
import { useActionState } from "react";

export function AddLink() {
  const [state, action, pending] = useActionState(createShortUrl, null);

  return (
    <div className="space-y-2">
      <form action={action}>
        <Field data-invalid={state?.errors?.originalUrl && true}>
          <InputGroup>
            <InputGroupInput
              name="originalUrl"
              placeholder="Add your URL here"
              aria-invalid={state?.errors?.originalUrl && true}
              autoComplete="off"
            />
            <InputGroupButton
              type="submit"
              aria-label="Shorten url"
              className="cursor-pointer"
              disabled={pending}
            >
              <SendHorizontal />
            </InputGroupButton>
          </InputGroup>

          {state?.errors?.originalUrl && (
            <FieldError errors={[{ message: state.errors.originalUrl[0] }]} />
          )}
          {state?.errors?.duplicate && (
            <FieldError errors={[{ message: state.errors.duplicate[0] }]} />
          )}
        </Field>
      </form>

      {state?.success && (
        <Item variant="outline">
          <ItemContent>
            <ItemDescription>
              {`http://localhost:3000/${state.data.shortUrl}`}
            </ItemDescription>
          </ItemContent>
          <ItemActions>
            <Button
              className="cursor-pointer"
              onClick={() =>
                handleCopyUrl(`http://localhost:3000/${state.data.shortUrl}`)
              }
            >
              <Copy />
            </Button>
          </ItemActions>
        </Item>
      )}
    </div>
  );
}
