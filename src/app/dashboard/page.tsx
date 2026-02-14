import { LinkItems } from "@/features/links";
import { getLinksByAccount } from "@/lib/actions";

export default async function Page() {
  const links = await getLinksByAccount();

  return (
    <main className="space-y-2">
      <h1 className="text-2xl font-bold">Dashboard</h1>

      <section>
        <h2 className="text-lg font-bold">Links</h2>
        {links?.data && <LinkItems links={links.data} />}
      </section>
    </main>
  );
}
