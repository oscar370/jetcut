import {
  InputGroup,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";
import { signIn } from "@/lib/auth";
import { SendHorizontal } from "lucide-react";

export function SignInResend() {
  return (
    <form
      action={async (formData) => {
        "use server";
        await signIn("resend", formData);
      }}
    >
      <InputGroup>
        <InputGroupInput name="email" type="email" placeholder="Email" />
        <InputGroupButton
          type="submit"
          aria-label="Sign in with email"
          className="cursor-pointer"
          variant="ghost"
        >
          <SendHorizontal />
        </InputGroupButton>
      </InputGroup>
    </form>
  );
}
