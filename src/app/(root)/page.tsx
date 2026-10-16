import { Suspense } from "react";
import ShowList from "@/app/(root)/_components/ShowList";

export default function Page() {


  return (
    <main>
      <Suspense fallback={null}>
        <ShowList/>
      </Suspense>
    </main>
  );
}
