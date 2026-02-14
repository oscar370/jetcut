import { EditUser } from "@/features/session/components/edit-user";
import { getUserById } from "@/lib/actions";
import { auth } from "@/lib/auth";
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
      <h1 className="text-2xl font-bold">Edit user name</h1>

      {user?.data && <EditUser user={user.data} />}
    </main>
  );
}
