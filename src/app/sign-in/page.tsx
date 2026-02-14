import { SignInGoogle } from "@/features/session";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function Page() {
  const session = await auth();

  if (session?.user) {
    redirect("/");
  }

  return (
    <div className="h-[calc(100dvh-44px)] w-full flex justify-center items-center">
      <main className="space-y-2 w-full">
        <section className="space-y-1">
          <h1 className="text-2xl font-bold">Register</h1>

          <SignInGoogle />
        </section>
      </main>
    </div>
  );
}
