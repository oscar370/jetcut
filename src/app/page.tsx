import { AddLink } from "@/features/links";

export default function Page() {
  return (
    <div className="h-[calc(100dvh-44px)] w-full flex justify-center items-center">
      <main className="space-y-2 w-full">
        <div className="space-y-1">
          <h1 className="text-center text-2xl font-bold">Shorten Link</h1>

          <AddLink />
        </div>
      </main>
    </div>
  );
}
