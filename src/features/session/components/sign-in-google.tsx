import { Button } from "@/components/ui/button";
import { signIn } from "@/lib/auth";

export function SignInGoogle() {
  return (
    <form
      action={async () => {
        "use server";
        await signIn("google");
      }}
    >
      <Button className="cursor-pointer" variant="secondary">
        Signin with Google
      </Button>
    </form>
  );
}
