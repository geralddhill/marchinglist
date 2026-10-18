import { betterAuth } from "better-auth";
import { drizzleAdapter } from "@better-auth/drizzle-adapter/relations-v2";
import { db } from "@/db/drizzle";
import { username } from "better-auth/plugins";
import { createAuthMiddleware, APIError } from "better-auth/api";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    usePlural: true,
  }),
  emailAndPassword: {
    enabled: true,
  },
  plugins: [username()],
  user: {
    changeEmail: {
      enabled: true,
    },
  },
  emailVerification: {
    sendVerificationEmail: async ({ user, url }) => {
      void resend.emails.send({
        from: "MarchingList <no-reply@account.geralddhill.com>",
        to: user.email,
        subject: "Verify your email address",
        html: `Click <a href="${url}">here</a> to verify your email.`,
      });
    },
  },
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
    }),
  },
});
