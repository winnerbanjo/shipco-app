import Link from "next/link";
import { AdminShipmentsTable } from "./admin-shipments-table";

export default function AdminShipmentsPage() {
  return (
    <div className="mx-auto max-w-6xl bg-white">
      <header className="flex items-center gap-4 border-b border-zinc-100 pb-6">
        <span className="shrink-0 font-sans text-xl font-bold text-black">Shipco</span>
        <div className="flex-1">
          <h1 className="text-2xl font-semibold tracking-tight text-zinc-900">
            All Shipments
          </h1>
          <p className="mt-1 text-sm text-zinc-500">
            Global demo data. Use filters above the table.
          </p>
        </div>
        <Link
          href="/admin/dashboard"
          className="rounded-none border border-zinc-100 bg-white px-4 py-2 text-sm font-medium text-zinc-700 hover:border-[#F40009] hover:text-[#F40009]"
        >
          ← Admin
        </Link>
      </header>

      <div className="mt-8">
        <AdminShipmentsTable />
      </div>
    </div>
  );
}
