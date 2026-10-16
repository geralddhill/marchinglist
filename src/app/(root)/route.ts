import { redirect } from "next/dist/client/components/redirect";

export async function GET() {
   redirect(`/shows`);
}
