import { auth } from "@/lib/auth";
import { redirect } from "next/dist/client/components/redirect";
import { headers } from "next/headers";

export async function GET() {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

    // This case is already covered by proxy
  if (!session) redirect('/sign-in?from=profile');

  redirect(`/profile/${encodeURIComponent(session.user.username ?? "")}`);
}
