import SignUpForm from "@/app/(authentication)/_components/SignUpForm";
import { Suspense } from "react";

export default function Page() {
  return (
    <main className="flex w-full grow items-center justify-center">
      <Suspense fallback={null}>
        <SignUpForm />
      </Suspense>
    </main>
  );
}