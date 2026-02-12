"use client";

import { Button } from "@/components/ui/button";
import { Field, FieldError } from "@/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
} from "@/components/ui/item";
import { createShortUrl } from "@/lib/actions";
import { LinkForm, linkFormSchema } from "@/types/url";
import { valibotResolver } from "@hookform/resolvers/valibot";
import { Copy, SendHorizonal } from "lucide-react";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

export function AddLink() {
  const [shortUrl, setShortUrl] = useState("");
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LinkForm>({
    resolver: valibotResolver(linkFormSchema),
    defaultValues: {
      originalUrl: "",
    },
  });

  async function onSubmit(data: LinkForm) {
    const result = await createShortUrl(data);
    console.log(result);

    if (!result.id) {
      toast.error("Failed to shorten the URL");
      return;
    }

    setShortUrl(result.shortUrl);
    toast.success("The URL has been successfully shortened");
  }

  return (
    <div className="space-y-2">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="originalUrl"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <InputGroup>
                <InputGroupInput
                  placeholder="Add your URL here"
                  aria-invalid={fieldState.invalid}
                  autoComplete="off"
                  {...field}
                />
                <InputGroupAddon align="inline-end">
                  <Button className="cursor-pointer" variant="ghost" size="sm">
                    <SendHorizonal />
                  </Button>
                </InputGroupAddon>
              </InputGroup>

              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </form>

      {shortUrl && (
        <Item variant="outline">
          <ItemContent>
            <ItemDescription> {shortUrl} </ItemDescription>
          </ItemContent>
          <ItemActions>
            <Button className="cursor-pointer">
              <Copy />
            </Button>
          </ItemActions>
        </Item>
      )}
    </div>
  );
}
