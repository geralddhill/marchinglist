import { Suspense } from "react";
import ResetPasswordForm from "@/app/(authentication)/_components/ResetPasswordForm";

export default function Page() {
  return <main>
    <Suspense fallback={null}>
      <ResetPasswordForm />
    </Suspense>
  </main>
}