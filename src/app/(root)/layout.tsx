import Navbar from "@/components/navbar/navbar";
import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div>
      <Navbar />
      <div className="data-inert-when-menu-open">{children}</div>
    </div>
  );
}
