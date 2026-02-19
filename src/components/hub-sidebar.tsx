"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  CheckSquare,
  Package,
  Users,
  LogOut,
  FileEdit,
  RefreshCw,
  ScanLine,
} from "lucide-react";

const nav = [
  { href: "/hub/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/hub/scan", label: "Scan", icon: ScanLine },
  { href: "/hub/update-status", label: "Update Status", icon: CheckSquare },
  { href: "/hub/booking", label: "Booking", icon: FileEdit },
  { href: "/hub/inventory", label: "Branch Inventory", icon: Package },
  { href: "/hub/customers", label: "Merchant Directory", icon: Users },
];

export function HubSidebar() {
  const pathname = usePathname();
  function handleSignOut() {
    document.cookie = "shipco-hub-token=; path=/; max-age=0";
    window.location.href = "/auth/login";
  }

  return (
    <aside className="flex h-full w-56 flex-col border-r border-zinc-100 bg-white">
      <div className="flex h-14 items-center border-b border-zinc-100 px-4 py-3">
        <Link href="/hub/dashboard" className="flex h-10 items-center gap-2 font-sans text-lg font-bold text-black">
          Shipco <span className="font-normal text-zinc-600">Hub</span>
        </Link>
      </div>
      <nav className="flex-1 space-y-0.5 p-2">
        {nav.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-none border-l-[3px] px-3 py-2 text-sm font-medium transition-colors",
                isActive
                  ? "border-l-[#F40009] bg-[#F40009]/10 text-[#F40009]"
                  : "border-l-transparent text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900"
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>
      <div className="border-t border-zinc-100 p-2">
        <p className="mb-1 px-3 py-1 text-[10px] font-medium uppercase tracking-wider text-zinc-400">
          Switch role (testing)
        </p>
        <div className="flex gap-1">
          <Link
            href="/merchant/dashboard"
            className="flex flex-1 items-center justify-center gap-1.5 rounded-none border border-zinc-200 bg-white px-2 py-2 text-xs font-medium text-zinc-600 hover:bg-zinc-50"
          >
            <RefreshCw className="h-3 w-3" />
            Merchant
          </Link>
        </div>
        <button
          type="button"
          onClick={handleSignOut}
          className="mt-2 flex w-full items-center gap-3 rounded-none px-3 py-2 text-sm font-medium text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900"
        >
          <LogOut className="h-4 w-4" />
          Sign out
        </button>
      </div>
    </aside>
  );
}
