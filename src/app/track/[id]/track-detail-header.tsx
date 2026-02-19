"use client";

import Link from "next/link";

export function TrackDetailHeader() {
  return (
    <header className="border-b border-zinc-100 bg-white">
      <div className="mx-auto flex max-w-2xl items-center justify-between px-6 py-5">
        <Link href="/" className="font-sans text-lg font-bold text-black">
          shipco
        </Link>
        <Link
          href="/track"
          className="text-sm font-medium text-zinc-600 hover:text-zinc-900"
        >
          ← Track another
        </Link>
      </div>
    </header>
  );
}
