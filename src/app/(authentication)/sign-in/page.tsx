import SignInForm from "@/app/(authentication)/_components/sign-in-form";
import { Suspense } from "react";

export default function Page() {
  return (
    <main className="flex w-full grow items-center justify-center">
      <Suspense fallback={null}>
        <SignInForm />
      </Suspense>
    </main>
  );
}