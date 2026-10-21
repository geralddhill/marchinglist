import { Suspense } from "react";
import ShowsSection from "@/app/(root)/shows/_components/ShowsSection";

export default function Page() {


  return (
    <main className="p-8 md:px-24 xl:px-36 2xl:px-64">
      <h1 className="mb-8 block w-full border-b-2 pb-4 text-4xl font-semibold sm:text-6xl xl:text-7xl">
        Shows
      </h1>
      <Suspense fallback={<p>Loading shows...</p>}>
        <ShowsSection className="sm:grid sm:grid-cols-2 md:grid-cols-3 2xl:grid-cols-4" />
      </Suspense>
    </main>
  );
}
