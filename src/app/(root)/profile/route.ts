import { auth } from "@/lib/auth";
import { redirect } from "next/dist/client/components/redirect";

export async function GET(request: Request) {
  const session = await auth.api.getSession({
    headers: request.headers,
  })

    // This case is already covered by proxy
  if (!session) redirect('/signin?from=profile');

  redirect(`/profile/${encodeURIComponent(session.user.username ?? "")}`);
}
