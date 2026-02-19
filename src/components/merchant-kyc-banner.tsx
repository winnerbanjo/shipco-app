"use client";

import Link from "next/link";

export function MerchantKycBanner({ showBlockedMessage = false }: { showBlockedMessage?: boolean }) {
  return (
    <div className="border-0 bg-[#e3201b] px-6 py-4 text-center text-sm font-medium text-white font-sans">
      <strong>Account Pending Approval.</strong> Please allow 24–48 hours for KYC verification.
      {showBlockedMessage && (
        <span className="ml-2 opacity-90">
          You cannot book shipments until an admin verifies your account.
        </span>
      )}{" "}
      <Link href="/merchant/kyc" className="ml-2 underline opacity-95 hover:opacity-100">
        Complete KYC
      </Link>
    </div>
  );
}
