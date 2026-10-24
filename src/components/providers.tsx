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
import { uploadFiles } from "@/lib/uploadthing-client";
import { publicFileUrl } from "@/lib/files";
import { deleteUserAvatar } from "@/features/users/actions";

export function Providers({ children }: { children: ReactNode }) {
  const router = useRouter();
  const queryClient = getQueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider
        authClient={authClient}
        redirectTo="/"
        emailAndPassword={{ requireEmailVerification: true }}
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
        avatar={{
          upload: async (file) => {
            const [response] = await uploadFiles("userAvatar", {
              files: [file],
            });
            return publicFileUrl(response.key);
          },
          delete: async () => {
            await deleteUserAvatar();
          }
        }}
      >
        {children}

        <Toaster />
      </AuthProvider>
    </QueryClientProvider>
  );
}
