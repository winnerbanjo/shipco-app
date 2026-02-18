import Link from "next/link";
import { MERCHANT_DEMO_CUSTOMERS_15 } from "@/data/demo-customers";
import { AdminCustomersTable } from "./customers-table";

export default function AdminCustomersPage() {
  return (
    <div className="mx-auto max-w-5xl bg-white">
      <header className="flex items-center gap-4 border-b border-zinc-100 pb-6">
        <span className="shrink-0 font-sans text-xl font-bold text-black">Shipco</span>
        <div>
          <h1 className="text-3xl font-semibold tracking-tight text-zinc-900">
            Merchants
          </h1>
          <p className="mt-1 text-sm text-zinc-500">
            Global database of all Shipco merchants. Use search and filters above the table.
          </p>
        </div>
        <Link
          href="/admin/dashboard"
          className="rounded-none border border-zinc-100 bg-white px-4 py-2 text-sm font-medium text-zinc-700 hover:border-[#F40009] hover:text-[#F40009]"
        >
          ← Admin
        </Link>
      </header>

      <AdminCustomersTable customers={MERCHANT_DEMO_CUSTOMERS_15} />
    </div>
  );
}
