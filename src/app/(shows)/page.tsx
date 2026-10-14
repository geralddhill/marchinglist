import { Suspense } from "react";
import ShowList from "@/app/(shows)/_components/ShowList";

export default async function Page() {


  return (
    <main>
      <Suspense fallback={null}>
        <ShowList/>
      </Suspense>
    </main>
  );
}
