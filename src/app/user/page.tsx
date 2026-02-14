import { Button } from "@/components/ui/button";
import { UserDetails } from "@/features/session";
import { getUserById } from "@/lib/actions";
import { auth } from "@/lib/auth";
import { signOut } from "next-auth/react";
import { redirect } from "next/navigation";

export default async function Page() {
  const session = await auth();

  if (!session?.user || !session.user.id) {
    redirect("/");
  }

  const user = await getUserById();

  if (user?.errors)
    return Object.values(user.errors).map((e) => e && <p key={e[0]}>{e[0]}</p>);

  return (
    <main className="space-y-2">
      <h1 className="text-2xl font-bold">User</h1>

      {user?.data && <UserDetails user={user.data} />}

      <form
        action={async () => {
          "use server";
          await signOut();
        }}
      >
        <div>
          <Button className="cursor-pointer" variant="outline">
            Sign out
          </Button>
        </div>
      </form>
    </main>
  );
}
