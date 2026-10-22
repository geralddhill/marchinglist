import { Suspense } from "react";
import ResetPasswordForm from "@/app/(authentication)/_components/reset-password-form";

export default function Page() {
  return <main>
    <Suspense fallback={null}>
      <ResetPasswordForm />
    </Suspense>
  </main>
}