import type { Metadata } from "next";
import "@/app/globals.css";

export const metadata: Metadata = {
  title: "MarchingList",
  description: "Your one stop shop for all your marching arts purchases!",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`h-full antialiased`}>
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}
