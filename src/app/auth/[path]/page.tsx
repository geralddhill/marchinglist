import { viewPaths } from "@better-auth-ui/core";
import { notFound } from "next/navigation";

import { Auth } from "@/components/auth/auth";

export const instant = false;

const validAuthPaths = new Set([
  ...Object.values(viewPaths.auth),
]);

export default async function AuthPage({
  params,
}: {
  params: Promise<{
    path: string;
  }>;
}) {
  const { path } = await params;

  if (!validAuthPaths.has(path)) {
    notFound();
  }

  return (
    <div className="my-auto flex justify-center p-4 md:p-6">
      <Auth path={path} />
    </div>
  );
}
