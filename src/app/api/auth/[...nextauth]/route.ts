import NextAuth from "next-auth";
import { authOptions } from "@/lib/auth";

export const dynamic = "force-dynamic";

// Same bcryptjs as prisma/seed.ts. authorize() in @/lib/auth. JWT session; secret from process.env.NEXTAUTH_SECRET.
const handler = NextAuth({
  ...authOptions,
  session: { strategy: "jwt" },
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
