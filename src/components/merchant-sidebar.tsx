"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Package,
  Upload,
  Wallet,
  Settings,
  LogOut,
  PackageSearch,
  RefreshCw,
} from "lucide-react";
import { signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";

const nav = [
  { href: "/merchant/dashboard", label: "Overview", icon: LayoutDashboard },
  { href: "/merchant/booking", label: "Book Shipment", icon: Package },
  { href: "/merchant/dashboard/shipments", label: "Tracking", icon: PackageSearch },
  { href: "/merchant/dashboard/bulk", label: "Bulk Upload", icon: Upload },
  { href: "/merchant/wallet", label: "Wallet", icon: Wallet },
  { href: "/merchant/dashboard/settings", label: "Settings", icon: Settings },
];

export function MerchantSidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex h-full w-56 flex-col border-r border-zinc-100 bg-white">
      <div className="flex h-14 items-center border-b border-zinc-100 px-4 py-3">
        <Link href="/merchant/dashboard" className="flex h-10 items-center gap-2 font-sans text-lg font-bold text-black">
          <span className="font-bold tracking-tighter text-black">shipco</span> <span className="font-normal text-zinc-600">Merchant</span>
        </Link>
      </div>
      <nav className="flex-1 space-y-0.5 p-2">
        {nav.map((item) => {
          const isActive =
            pathname === item.href ||
            (item.href !== "/merchant/dashboard" && pathname.startsWith(item.href));
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-none border-l-[3px] px-3 py-2 text-sm font-medium transition-colors",
                isActive
                  ? "border-l-[#e3201b] bg-[#e3201b]/10 text-[#e3201b]"
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
            href="/hub/dashboard"
            className="flex flex-1 items-center justify-center gap-1.5 rounded-none border border-zinc-200 bg-white px-2 py-2 text-xs font-medium text-zinc-600 hover:bg-zinc-50"
          >
            <RefreshCw className="h-3 w-3" />
            Hub
          </Link>
        </div>
        <Button
          variant="ghost"
          className="mt-2 w-full justify-start gap-3 rounded-none text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900"
          onClick={() => signOut({ callbackUrl: "/" })}
        >
          <LogOut className="h-4 w-4" />
          Sign out
        </Button>
      </div>
    </aside>
  );
}
