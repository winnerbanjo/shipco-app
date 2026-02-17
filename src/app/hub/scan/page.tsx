"use client";

import Link from "next/link";

export default function HubScanPage() {
  return (
    <div className="mx-auto max-w-md">
      <h1 className="text-2xl font-semibold tracking-tight text-zinc-900">
        Scan Package
      </h1>
      <p className="mt-2 text-sm text-zinc-500">
        Enter or scan a tracking ID (demo — no hardware).
      </p>
      <div className="mt-8 border border-zinc-100 bg-white p-8">
        <input
          type="text"
          placeholder="Shipco-XXXX-XXXX"
          className="w-full rounded-none border border-zinc-200 bg-white px-4 py-3 text-zinc-900 placeholder-zinc-400 focus:border-[#F40009] focus:outline-none focus:ring-0"
        />
        <Link
          href="/hub/dashboard"
          className="mt-4 inline-block w-full rounded-none bg-[#F40009] py-3 text-center text-sm font-medium text-white hover:bg-[#cc0008]"
        >
          Scan
        </Link>
      </div>
    </div>
  );
}
