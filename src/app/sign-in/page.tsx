import { SignInGoogle } from "@/features/session";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function Page() {
  const session = await auth();

  if (session?.user) {
    redirect("/");
  }

  return (
    <div className="flex h-[calc(100dvh-44px)] w-full items-center justify-center">
      <main className="w-full space-y-2">
        <section className="space-y-1">
          <h1 className="text-2xl font-bold">Register</h1>

          <SignInGoogle />
        </section>
      </main>
    </div>
  );
}
