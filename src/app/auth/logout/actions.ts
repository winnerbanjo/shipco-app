"use server";

import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export async function logoutMerchant() {
  const cookieStore = await cookies();
  cookieStore.delete("shipco-merchant-token");
  redirect("/auth/login");
}
