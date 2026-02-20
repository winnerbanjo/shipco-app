import { redirect } from "next/navigation";

/** KYC Approvals: redirect to Merchant Overview where admins review/approve KYC. */
export default function AdminKycPage() {
  redirect("/admin/merchants");
}
