"use client";

import { Package, Truck, MapPin, CheckCircle } from "lucide-react";

const STEPS = [
  { key: "processed", label: "Order Processed", done: true, icon: Package },
  { key: "picked", label: "Picked up by Shipco", done: true, icon: Package },
  { key: "transit", label: "In Transit", done: false, current: true, icon: Truck },
  { key: "out", label: "Out for Delivery", done: false, icon: MapPin },
];

export function TrackJourney() {
  return (
    <div className="bg-white">
      <h2 className="text-xs font-medium uppercase tracking-[0.15em] text-zinc-500">
        Delivery journey
      </h2>
      <p className="mt-1 font-mono text-lg font-semibold tracking-tight text-zinc-900">
        Shipco-123
      </p>

      <ul className="relative mt-10">
        {STEPS.map((step, i) => {
          const isLast = i === STEPS.length - 1;
          const Icon = step.icon;
          return (
            <li key={step.key} className="relative flex gap-5 pb-12">
              {!isLast && (
                <div
                  className="absolute left-[11px] top-8 h-[calc(100%-1rem)] w-px bg-[#F40009]"
                  aria-hidden
                />
              )}
              <div
                className={`relative z-10 flex h-6 w-6 shrink-0 items-center justify-center rounded-none border-2 ${
                  step.done
                    ? "border-[#F40009] bg-[#F40009]"
                    : step.current
                      ? "border-[#F40009] bg-[#F40009]"
                      : "border-zinc-200 bg-white"
                }`}
              >
                {step.done && (
                  <CheckCircle
                    strokeWidth={1.2}
                    className="h-3.5 w-3.5 text-white"
                  />
                )}
                {step.current && (
                  <Icon
                    strokeWidth={1.2}
                    className="h-3.5 w-3.5 text-white"
                  />
                )}
                {!step.done && !step.current && (
                  <Icon
                    strokeWidth={1.2}
                    className="h-3.5 w-3.5 text-zinc-300"
                  />
                )}
              </div>
              <div className="min-w-0 flex-1 pt-0.5">
                <p
                  className={`font-medium ${
                    step.done
                      ? "text-zinc-500"
                      : step.current
                        ? "text-zinc-900"
                        : "text-zinc-400"
                  }`}
                >
                  {step.label}
                </p>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
