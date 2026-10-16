import { betterAuth } from "better-auth";
import { drizzleAdapter } from "@better-auth/drizzle-adapter/relations-v2";
import { db } from "@/db/drizzle";
import { username } from "better-auth/plugins";
import { createAuthMiddleware, APIError } from "better-auth/api";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    usePlural: true,
  }),
  emailAndPassword: {
    enabled: true,
  },
  plugins: [
    username()
  ],
  hooks: {
    before: createAuthMiddleware(async (ctx) => {
      if (ctx.path === "/sign-up/email") {
        const value = ctx.body?.username;
        if (typeof value !== "string" || !value.trim()) {
          throw new APIError("BAD_REQUEST", {
            message: "Username is required",
          });
        }
      }
    })
  }
});
