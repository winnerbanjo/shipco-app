"use client";

import Link from "next/link";
import { useState, useMemo } from "react";
import { ScanLine, RefreshCw, UserPlus, Package } from "lucide-react";
import { HUB_INVENTORY_DEMO_SHIPMENTS } from "@/data/demo-shipments";
import { DateFilter, type DateFilterState } from "@/components/date-filter";
import {
  getHubOperationsForPeriod,
  getTimeAtHubMinutes,
  formatTimeAtHub,
} from "@/data/hub-operations-demo";

const QUICK_ACTIONS = [
  { href: "/hub/scan", label: "Scan Package", icon: ScanLine, primary: true },
  { href: "/hub/update-status", label: "Update Status", icon: RefreshCw, primary: false },
  { href: "/hub/register-walkin", label: "Register Walk-in Merchant", icon: UserPlus, primary: true },
];

export default function HubDashboardPage() {
  const [dateState, setDateState] = useState<DateFilterState>({ period: "today" });

  const metrics = useMemo(
    () =>
      getHubOperationsForPeriod(
        dateState.period,
        dateState.customFrom,
        dateState.customTo
      ),
    [dateState]
  );

  const inventoryPreview = useMemo(
    () =>
      HUB_INVENTORY_DEMO_SHIPMENTS.slice(0, 8).map((s) => ({
        ...s,
        timeAtHub: formatTimeAtHub(getTimeAtHubMinutes(s.id)),
      })),
    []
  );

  return (
    <div className="mx-auto max-w-5xl bg-white">
      <header className="flex items-center gap-4 border-b border-zinc-100 pb-6">
        <span className="shrink-0 font-sans text-xl font-bold text-black">Shipco</span>
        <div>
          <h1 className="font-sans text-2xl font-semibold tracking-tighter text-zinc-900">
            Hub Operations
          </h1>
          <p className="mt-1 text-sm text-zinc-500">
            Operational metrics. No financial data.
          </p>
        </div>
      </header>

      <section className="mt-6 border-b border-zinc-100 pb-6">
        <DateFilter value={dateState} onChange={setDateState} />
      </section>

      {/* Quick actions — Scan & Register Walk-in in Wine Red */}
      <section className="mt-8">
        <h2 className="text-xs font-medium uppercase tracking-wider text-zinc-500">
          Quick actions
        </h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          {QUICK_ACTIONS.map(({ href, label, icon: Icon, primary }) => (
            <Link
              key={href}
              href={href}
              className={
                primary
                  ? "flex items-center gap-4 border-0 bg-[#F40009] p-6 font-medium text-white transition-colors hover:bg-[#cc0008]"
                  : "flex items-center gap-4 border border-zinc-100 bg-white p-6 transition-colors hover:border-zinc-200 hover:bg-zinc-50"
              }
            >
              <div
                className={
                  primary
                    ? "flex h-12 w-12 items-center justify-center bg-white/15"
                    : "flex h-12 w-12 items-center justify-center border border-zinc-100 bg-zinc-50"
                }
              >
                <Icon strokeWidth={1} className={`h-6 w-6 ${primary ? "text-white" : "text-[#F40009]"}`} />
              </div>
              <span className={primary ? "text-white" : "text-zinc-900"}>{label}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Operations Master Grid — 4 high-impact metrics */}
      <section className="mt-10">
        <h2 className="text-xs font-medium uppercase tracking-wider text-zinc-500">
          Operations
        </h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-none border border-zinc-100 bg-white p-6">
            <p className="font-sans text-2xl font-semibold tracking-tighter text-zinc-900">
              {metrics.currentInventory}
            </p>
            <p className="mt-1 text-sm text-zinc-500">Current Inventory</p>
            <p className="mt-0.5 text-xs text-zinc-400">Total packages sitting in hub</p>
          </div>
          <div className="rounded-none border border-zinc-100 bg-white p-6">
            <p className="font-sans text-2xl font-semibold tracking-tighter text-zinc-900">
              {metrics.pendingDispatches}
            </p>
            <p className="mt-1 text-sm text-zinc-500">Pending Dispatches</p>
            <p className="mt-0.5 text-xs text-zinc-400">Need to leave the hub today</p>
          </div>
          <div className="rounded-none border border-zinc-100 bg-white p-6">
            <p className="font-sans text-2xl font-semibold tracking-tighter text-zinc-900">
              {metrics.inboundShipments}
            </p>
            <p className="mt-1 text-sm text-zinc-500">Inbound Shipments</p>
            <p className="mt-0.5 text-xs text-zinc-400">Expected to arrive at hub today</p>
          </div>
          <div className="rounded-none border border-zinc-100 bg-white p-6">
            <p className="font-sans text-2xl font-semibold tracking-tighter text-zinc-900">
              {metrics.avgProcessingTimeMins} mins
            </p>
            <p className="mt-1 text-sm text-zinc-500">Avg. Processing Time</p>
            <p className="mt-0.5 text-xs text-zinc-400">Arrived → Dispatched</p>
          </div>
        </div>
      </section>

      {/* Activity row — Walk-ins & Tasks Assigned */}
      <section className="mt-10">
        <h2 className="text-xs font-medium uppercase tracking-wider text-zinc-500">
          Activity
        </h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div className="rounded-none border border-zinc-100 bg-white p-6">
            <p className="font-sans text-2xl font-semibold tracking-tighter text-zinc-900">
              {metrics.walkInsToday}
            </p>
            <p className="mt-1 text-sm text-zinc-500">Walk-ins registered today</p>
          </div>
          <div className="rounded-none border border-zinc-100 bg-white p-6">
            <p className="font-sans text-2xl font-semibold tracking-tighter text-zinc-900">
              {metrics.tasksAssigned}
            </p>
            <p className="mt-1 text-sm text-zinc-500">Tasks Assigned</p>
            <p className="mt-0.5 text-xs text-zinc-400">IG/WhatsApp pickups from Admin</p>
          </div>
        </div>
      </section>

      {/* Inventory Preview — no Amount, add Time at Hub */}
      <section className="mt-10">
        <h2 className="text-xs font-medium uppercase tracking-wider text-zinc-500">
          At hub — preview
        </h2>
        <div className="mt-4 overflow-hidden rounded-none border border-zinc-100 bg-white">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-zinc-100 bg-zinc-50">
                <th className="px-6 py-4 font-medium font-sans tracking-tighter text-zinc-900">
                  Tracking
                </th>
                <th className="px-6 py-4 font-medium font-sans tracking-tighter text-zinc-900">
                  Merchant
                </th>
                <th className="px-6 py-4 font-medium font-sans tracking-tighter text-zinc-900">
                  Destination
                </th>
                <th className="px-6 py-4 font-medium font-sans tracking-tighter text-zinc-900">
                  Time at Hub
                </th>
              </tr>
            </thead>
            <tbody>
              {inventoryPreview.map((s) => (
                <tr key={s.id} className="border-b border-zinc-100 last:border-b-0">
                  <td className="px-6 py-4 font-mono font-sans tracking-tighter text-[#F40009]">
                    {s.trackingId}
                  </td>
                  <td className="px-6 py-4 font-sans tracking-tighter text-zinc-900">
                    {s.merchant}
                  </td>
                  <td className="px-6 py-4 font-sans tracking-tighter text-zinc-600">
                    {s.destination}
                  </td>
                  <td className="px-6 py-4 font-mono font-sans tracking-tighter text-zinc-900">
                    {(s as { timeAtHub: string }).timeAtHub}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Link
          href="/hub/inventory"
          className="mt-3 inline-flex items-center gap-2 text-sm font-medium text-[#F40009] hover:underline"
        >
          <Package className="h-4 w-4" />
          View full Branch Inventory
        </Link>
      </section>
    </div>
  );
}
