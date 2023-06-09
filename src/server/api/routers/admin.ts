import { TRPCError } from "@trpc/server";
import cookie from "cookie";
import { SignJWT } from "jose";
import { nanoid } from "nanoid";
import { z } from "zod";
import { getJwtSecretKey } from "../../../lib/auth";
import { adminProcedure, publicProcedure, router } from "../trpc";

export const adminRouter = router({
  login: publicProcedure
    .input(z.object({ email: z.string(), password: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const { res } = ctx;
      const { email, password } = input;

      if (
        email === process.env.ADMIN_EMAIL &&
        password === process.env.ADMIN_PASSWORD
      ) {
        // user is authenticated
        const token = await new SignJWT({})
          .setProtectedHeader({ alg: "HS256" })
          .setJti(nanoid())
          .setIssuedAt()
          .setExpirationTime("1h")
          .sign(new TextEncoder().encode(getJwtSecretKey()));

        res.setHeader(
          "Set-Cookie",
          cookie.serialize("user-token", token, {
            httpOnly: true,
            path: "/",
            secure: process.env.NODE_ENV === "production",
          })
        );
        return { success: true };
      }

      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "Invalid email or password",
      });
    }),

  sensitive: adminProcedure.mutation(() => {
    return "sensitive";
  }),
});
