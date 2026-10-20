import { Suspense } from "react";
import MyShowsList from "@/app/(root)/myshows/_components/MyShowsList";

export default async function Page() {
  return (
    <main className="p-8 md:px-24 xl:px-36 2xl:px-64">
      <h1 className="mb-8 block w-full border-b-2 pb-4 text-4xl font-semibold sm:text-6xl xl:text-7xl">
        My Shows
      </h1>
      <Suspense fallback={null}>
        <MyShowsList />
      </Suspense>
    </main>
  );
}