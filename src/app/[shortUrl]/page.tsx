import { getLinkByShortUrl } from "@/lib/actions";
import { redirect } from "next/navigation";

type PageProps = {
  params: Promise<{ shortUrl: string }>;
};

export default async function Page({ params }: PageProps) {
  const { shortUrl } = await params;
  const data = await getLinkByShortUrl(shortUrl);

  if (!data) {
    redirect("/404");
  }

  redirect(data.originalUrl);
}
