import { Suspense } from "react";
import ShowList from "@/app/(root)/_components/ShowList";

export default function Page() {


  return (
    <main className="p-8 md:px-24 xl:px-36 2xl:px-64">
      <Suspense fallback={null}>
        <ShowList />
      </Suspense>
    </main>
  );
}
