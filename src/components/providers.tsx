"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import type { ReactNode } from "react";
import { deleteUserPlugin } from "@/lib/auth/delete-user-plugin";
import { usernamePlugin } from "@/lib/auth/username-plugin";
import { authClient } from "@/lib/auth-client";
import { getQueryClient } from "@/lib/query-client";
import { AuthProvider } from "./auth/auth-provider";
import { Toaster } from "./ui/sonner";
import { themePlugin } from "@/lib/auth/theme-plugin";

export function Providers({ children }: { children: ReactNode }) {
  const router = useRouter();
  const queryClient = getQueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider
        authClient={authClient}
        redirectTo="/settings/account"
        socialProviders={["google", "github"]}
        emailAndPassword={{ requireEmailVerification: false }}
        navigate={({ to, replace }) =>
          replace ? router.replace(to) : router.push(to)
        }
        plugins={[
          usernamePlugin({
            localization: { usernamePlaceholder: "username" },
          }),
          deleteUserPlugin(),
          themePlugin({useTheme})
        ]}
        Link={Link}
      >
        {children}

        <Toaster />
      </AuthProvider>
    </QueryClientProvider>
  );
}
