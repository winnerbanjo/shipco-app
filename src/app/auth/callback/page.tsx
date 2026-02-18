import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export default async function AuthCallbackPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    redirect("/auth/login");
  }
  const role = (session.user as { role?: string }).role;
  if (role === "ADMIN") redirect("/admin/dashboard");
  if (role === "MERCHANT") redirect("/merchant/dashboard");
  if (role === "CUSTOMER") redirect("/customer/dashboard");
  redirect("/");
}
