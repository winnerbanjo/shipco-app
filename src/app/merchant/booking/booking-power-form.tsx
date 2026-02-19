"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import { useSession } from "next-auth/react";
import { getAndClearBookingDraft } from "@/lib/booking-draft";
import { useFormState } from "react-dom";
import { createBookingFromPowerForm, type CreateBookingState } from "@/app/merchant/booking-actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { ServiceType } from "@/data/booking-constants";
import { extractCityFromAddress } from "@/data/pricing-demo";
import { useRateCard } from "@/contexts/rate-card-context";
import { DESTINATION_HUB_OPTIONS } from "@/data/booking-constants";
import { getPricingCityFromAddress } from "@/data/address-constants";
import {
  getZoneFromCountry,
  getCarrierCostForZone,
  applyMarkup,
  DEFAULT_PROFIT_MARKUP_PERCENT,
  ZONE_LABELS,
} from "@/data/zone-pricing";
import { BookingSlipModal } from "@/components/booking-slip-modal";
import { StructuredAddressField } from "@/components/structured-address-field";
import { emptyStructuredAddress, type StructuredAddressValue } from "@/types/address";

const PICKUP_FEE_NGN = 1500;
const ITEM_CATEGORIES = ["Documents", "Electronics", "Fashion", "Food & Beverage", "General Merchandise", "Other"] as const;
const PACKAGE_CATEGORY_OPTIONS = [
  { value: "personal", label: "Personal" },
  { value: "commercial", label: "Commercial" },
] as const;

type Sender = { businessName: string; email: string; address: string };

export function BookingPowerForm({
  sender: initialSender,
  serviceType,
  merchantId,
  onBack,
}: {
  sender: Sender;
  serviceType: ServiceType;
  merchantId?: string;
  onBack: () => void;
}) {
  const { data: session, status: sessionStatus } = useSession();
  const [profileLoading, setProfileLoading] = useState(true);
  const [senderProfile, setSenderProfile] = useState<Sender & { phone?: string }>(initialSender);
  const [senderAddress, setSenderAddress] = useState(initialSender.address);

  useEffect(() => {
    if (sessionStatus === "unauthenticated") {
      setSenderProfile(initialSender);
      setSenderAddress(initialSender.address);
      setProfileLoading(false);
      return;
    }
    if (sessionStatus !== "authenticated") return;

    let cancelled = false;
    setProfileLoading(true);
    fetch("/api/merchant/profile")
      .then((res) => res.json())
      .then((data) => {
        if (cancelled) return;
        const next = {
          businessName: data.businessName ?? "",
          email: data.email ?? "",
          address: data.address ?? "",
          phone: data.phone ?? "",
        };
        setSenderProfile(next);
        setSenderAddress(next.address);
      })
      .catch(() => {
        if (!cancelled) {
          setSenderProfile(initialSender);
          setSenderAddress(initialSender.address);
        }
      })
      .finally(() => {
        if (!cancelled) setProfileLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [sessionStatus, initialSender.businessName, initialSender.email, initialSender.address]);

  const sender = useMemo(
    () => ({ ...senderProfile, address: senderAddress }),
    [senderProfile, senderAddress]
  );

  type ServiceMode = "dropoff" | "pickup";
  const [serviceMode, setServiceMode] = useState<ServiceMode>("dropoff");
  const [nearestHub, setNearestHub] = useState(DESTINATION_HUB_OPTIONS[0].value);
  const [receiverName, setReceiverName] = useState("");
  const [receiverPhone, setReceiverPhone] = useState("");
  const [receiverStructured, setReceiverStructured] = useState<StructuredAddressValue>(emptyStructuredAddress());
  const [assignedHub, setAssignedHub] = useState(DESTINATION_HUB_OPTIONS[0].value);
  const [weight, setWeight] = useState("");
  const [itemCategory, setItemCategory] = useState("");
  const [declaredValue, setDeclaredValue] = useState("");
  const [serviceLevel, setServiceLevel] = useState<"Standard" | "Express">("Standard");
  const [itemValueCustoms, setItemValueCustoms] = useState("");
  const [hsCode, setHsCode] = useState("");
  const [idPassportNumber, setIdPassportNumber] = useState("");
  const [packageCategory, setPackageCategory] = useState("");
  const [receiverCountry, setReceiverCountry] = useState("");
  const draftApplied = useRef(false);

  const isInternational = serviceType === "international";

  useEffect(() => {
    if (draftApplied.current) return;
    const draft = getAndClearBookingDraft();
    if (!draft) return;
    draftApplied.current = true;
    setWeight(String(draft.weightKg));
    setReceiverCountry(draft.destination);
  }, []);

  function handleReceiverHubSuggest(hub: string | null) {
    if (hub && DESTINATION_HUB_OPTIONS.some((o) => o.value === hub)) setAssignedHub(hub);
  }

  const { getQuote } = useRateCard();
  const [state, formAction] = useFormState<CreateBookingState, FormData>(createBookingFromPowerForm, {});

  const weightNum = parseFloat(weight) || 0;
  const declaredNum = parseFloat(declaredValue) || 0;
  const itemValueNum = parseFloat(itemValueCustoms) || 0;
  const express = serviceLevel === "Express";
  const origin = extractCityFromAddress(sender.address) || "Lagos";
  const destination = getPricingCityFromAddress(receiverStructured.state, receiverStructured.lga);
  const zone = getZoneFromCountry(receiverCountry);
  const { baseFare, insurance, total } = useMemo(() => {
    let baseFareVal = 0;
    let totalVal = 0;
    if (weightNum > 0) {
      if (isInternational && zone) {
        const cost = getCarrierCostForZone(weightNum, zone);
        baseFareVal = applyMarkup(cost, DEFAULT_PROFIT_MARKUP_PERCENT);
        totalVal = express ? Math.round(baseFareVal * 1.5) : baseFareVal;
      } else {
        const quote = getQuote(origin, destination, weightNum, express, merchantId);
        baseFareVal = quote.baseFare;
        totalVal = quote.total;
      }
    }
    const ins = declaredNum > 0 ? Math.round(declaredNum * 0.005) : 0;
    const intlIns = isInternational && itemValueNum > 0 ? Math.round(itemValueNum * 0.01) : 0;
    const pickupFee = serviceMode === "pickup" ? PICKUP_FEE_NGN : 0;
    return {
      baseFare: baseFareVal,
      insurance: ins + intlIns,
      total: totalVal + ins + intlIns + pickupFee,
      pickupFee,
    };
  }, [weightNum, express, declaredNum, isInternational, itemValueNum, origin, destination, zone, getQuote, merchantId, serviceMode]);

  const [showSlip, setShowSlip] = useState(false);
  useEffect(() => {
    if (state?.slip) setShowSlip(true);
  }, [state?.slip]);

  return (
    <>
      <div className="mt-12 flex gap-0">
        <form id="booking-power-form" action={formAction} className="min-w-0 flex-1 pr-12">
          <input type="hidden" name="serviceType" value={serviceType} />
          <input type="hidden" name="serviceMode" value={serviceMode} />
          <input type="hidden" name="nearestHub" value={serviceMode === "dropoff" ? nearestHub : ""} />

          {state?.error && (
            <p className="mb-6 text-sm text-red-600" role="alert">
              {state.error}
            </p>
          )}
          {state?.success && !state?.slip && (
            <p className="mb-6 text-sm text-[#e3201b]">{state.success}</p>
          )}

          <div className="mb-8 flex items-center gap-3">
            <Button type="button" variant="secondary" onClick={onBack} className="rounded-none border-zinc-200">
              ← Change service
            </Button>
          </div>

          {/* Service mode: Drop-off at Hub | Rider Pick-up */}
          <div className="mb-10">
            <p className="mb-3 text-xs font-medium uppercase tracking-wider text-zinc-500">Service mode</p>
            <div className="flex rounded-lg border border-zinc-200 bg-zinc-50/50 p-1">
              <button
                type="button"
                onClick={() => setServiceMode("dropoff")}
                className={`flex-1 rounded-md px-5 py-3 text-sm font-medium transition-colors ${
                  serviceMode === "dropoff"
                    ? "bg-[#e3201b] text-white shadow-sm"
                    : "text-zinc-600 hover:text-zinc-900"
                }`}
              >
                Drop-off at Hub
              </button>
              <button
                type="button"
                onClick={() => setServiceMode("pickup")}
                className={`flex-1 rounded-md px-5 py-3 text-sm font-medium transition-colors ${
                  serviceMode === "pickup"
                    ? "bg-[#e3201b] text-white shadow-sm"
                    : "text-zinc-600 hover:text-zinc-900"
                }`}
              >
                Rider Pick-up
              </button>
            </div>
          </div>

          {serviceMode === "dropoff" && (
            <section className="mb-10 border-b border-zinc-100 pb-10">
              <h2 className="text-xs font-medium uppercase tracking-wider text-zinc-500">Drop-off location</h2>
              <p className="mt-1 text-sm text-zinc-400">Select the hub where you’ll drop the package</p>
              <div className="mt-4">
                <Label htmlFor="nearestHub" className="text-zinc-700">Select nearest hub</Label>
                <select
                  id="nearestHub"
                  value={nearestHub}
                  onChange={(e) => setNearestHub(e.target.value)}
                  className="mt-2 flex h-12 w-full max-w-sm rounded-lg border border-zinc-200 bg-white px-4 font-sans text-zinc-900"
                >
                  {DESTINATION_HUB_OPTIONS.map((o) => (
                    <option key={o.value} value={o.value}>{o.label}</option>
                  ))}
                </select>
              </div>
            </section>
          )}

          {/* Economy | Express toggle — Economy = Standard (slower, cheaper), Express = premium */}
          <div className="mb-10">
            <p className="mb-3 text-xs font-medium uppercase tracking-wider text-zinc-500">Service tier</p>
            <div className="flex items-center gap-0 rounded-none border border-zinc-100 bg-white p-1">
              <button
                type="button"
                onClick={() => setServiceLevel("Standard")}
                className={`flex-1 rounded-none px-6 py-3 text-sm font-medium transition-colors ${
                  serviceLevel === "Standard"
                    ? "bg-[#e3201b] text-white"
                    : "bg-white text-zinc-600 hover:bg-zinc-50"
                }`}
              >
                Economy
              </button>
              <button
                type="button"
                onClick={() => setServiceLevel("Express")}
                className={`flex-1 rounded-none px-6 py-3 text-sm font-medium transition-colors ${
                  serviceLevel === "Express"
                    ? "bg-[#e3201b] text-white"
                    : "bg-white text-zinc-600 hover:bg-zinc-50"
                }`}
              >
                Express
              </button>
            </div>
            <p className="mt-2 text-xs text-zinc-500">
              Economy: Slower, cheaper. Express: Faster, premium.
            </p>
          </div>

          <div className="space-y-16">
            {/* Sender — only when Rider Pick-up */}
            {serviceMode === "pickup" && (
              <section className="border-b border-zinc-100 pb-12">
                <h2 className="text-xs font-medium uppercase tracking-wider text-zinc-500">Sender details</h2>
                <p className="mt-1 text-sm text-zinc-400">From your merchant profile (rider will pick up here)</p>
                {profileLoading ? (
                  <div className="mt-8 space-y-6">
                    <div className="h-4 w-48 animate-pulse rounded bg-zinc-100" />
                    <div className="h-4 w-64 animate-pulse rounded bg-zinc-100" />
                    <div className="h-4 w-full animate-pulse rounded bg-zinc-100" />
                    <p className="text-xs text-zinc-400">Loading profile...</p>
                  </div>
                ) : (
                  <div className="mt-8 grid gap-6 sm:grid-cols-2">
                    <div>
                      <Label className="text-zinc-700">Business name</Label>
                      <Input readOnly value={sender.businessName} className="mt-2 h-12 rounded-none border-zinc-100 bg-zinc-50" />
                    </div>
                    <div>
                      <Label className="text-zinc-700">Email</Label>
                      <Input readOnly value={sender.email} className="mt-2 h-12 rounded-none border-zinc-100 bg-zinc-50" />
                    </div>
                    <div className="sm:col-span-2">
                      <Label className="text-zinc-700">Address</Label>
                      <Input
                        name="senderAddress"
                        value={senderAddress}
                        onChange={(e) => setSenderAddress(e.target.value)}
                        className="mt-2 h-12 rounded-none border-zinc-200"
                        placeholder="Edit if rider should pick up from a different branch"
                      />
                      <p className="mt-1 text-xs text-zinc-500">You can change this for this shipment only.</p>
                    </div>
                  </div>
                )}
              </section>
            )}

            {/* Receiver + Destination Hub */}
            <section className="border-b border-zinc-100 pb-12">
              <h2 className="text-xs font-medium uppercase tracking-wider text-zinc-500">Receiver details</h2>
              <div className="mt-8 space-y-8">
                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <Label htmlFor="receiverName" className="text-zinc-700">Name</Label>
                    <Input
                      id="receiverName"
                      name="receiverName"
                      value={receiverName}
                      onChange={(e) => setReceiverName(e.target.value)}
                      className="mt-2 h-12 rounded-none border-zinc-100"
                      placeholder="Full name"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="receiverPhone" className="text-zinc-700">Phone</Label>
                    <Input
                      id="receiverPhone"
                      name="receiverPhone"
                      type="tel"
                      value={receiverPhone}
                      onChange={(e) => setReceiverPhone(e.target.value)}
                      className="mt-2 h-12 rounded-none border-zinc-100"
                      placeholder="+234 800 000 0000"
                      required
                    />
                  </div>
                </div>
                <StructuredAddressField
                  label="Delivery address"
                  value={receiverStructured}
                  onChange={setReceiverStructured}
                  namePrefix="receiver"
                  showMapPreview={true}
                  required={true}
                  onHubSuggest={handleReceiverHubSuggest}
                />
                <div>
                  <Label htmlFor="assignedHub" className="text-zinc-700">Destination Hub (Smart mapping)</Label>
                  <select
                    id="assignedHub"
                    name="assignedHub"
                    value={assignedHub}
                    onChange={(e) => setAssignedHub(e.target.value)}
                    required
                    className="mt-2 flex h-12 w-full rounded-none border border-zinc-100 bg-white px-4 font-sans text-zinc-900"
                  >
                    {DESTINATION_HUB_OPTIONS.map((o) => (
                      <option key={o.value} value={o.value}>{o.label}</option>
                    ))}
                  </select>
                  <p className="mt-1 text-xs text-zinc-500">Set from LGA/State; you can override.</p>
                </div>
              </div>
              <input type="hidden" name="receiverStreetAddress" value={receiverStructured.streetAddress} />
              <input type="hidden" name="receiverLga" value={receiverStructured.lga} />
              <input type="hidden" name="receiverState" value={receiverStructured.state} />
              <input type="hidden" name="receiverApartment" value={receiverStructured.apartment} />
              <input type="hidden" name="receiverLandmark" value={receiverStructured.landmark} />
            </section>

            {/* Package */}
            <section className="border-b border-zinc-100 pb-12">
              <h2 className="text-xs font-medium uppercase tracking-wider text-zinc-500">Package details</h2>
              <div className="mt-8 grid gap-6 sm:grid-cols-2">
                <div>
                  <Label htmlFor="packageWeight" className="text-zinc-700">Weight (kg)</Label>
                  <Input
                    id="packageWeight"
                    name="packageWeight"
                    type="number"
                    step="0.01"
                    min="0.01"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    className="mt-2 h-12 rounded-none border-zinc-100"
                    placeholder="2.5"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="itemCategory" className="text-zinc-700">Item category</Label>
                  <select
                    id="itemCategory"
                    name="itemCategory"
                    value={itemCategory}
                    onChange={(e) => setItemCategory(e.target.value)}
                    className="mt-2 flex h-12 w-full rounded-none border border-zinc-100 bg-white px-4 text-zinc-900"
                  >
                    <option value="">Select</option>
                    {ITEM_CATEGORIES.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <Label htmlFor="declaredValue" className="text-zinc-700">Declared value (₦)</Label>
                  <Input
                    id="declaredValue"
                    name="declaredValue"
                    type="number"
                    min="0"
                    value={declaredValue}
                    onChange={(e) => setDeclaredValue(e.target.value)}
                    className="mt-2 h-12 rounded-none border-zinc-100"
                    placeholder="Optional"
                  />
                </div>
              </div>

              {isInternational && (
                <div className="mt-8 grid gap-6 sm:grid-cols-2">
                  <div>
                    <Label htmlFor="receiverCountry" className="text-zinc-700">Destination country</Label>
                    <Input
                      id="receiverCountry"
                      name="receiverCountry"
                      value={receiverCountry}
                      onChange={(e) => setReceiverCountry(e.target.value)}
                      placeholder="e.g. Cameroon, UK, USA"
                      className="mt-2 h-12 rounded-none border-zinc-100"
                    />
                    {zone && (
                      <p className="mt-1 text-xs font-medium text-[#e3201b]">
                        Zone detected: {ZONE_LABELS[zone]} — rate pulled from sheet
                      </p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="itemValueCustoms" className="text-zinc-700">Item Value for Customs (₦)</Label>
                    <Input
                      id="itemValueCustoms"
                      name="itemValueCustoms"
                      type="number"
                      min="0"
                      value={itemValueCustoms}
                      onChange={(e) => setItemValueCustoms(e.target.value)}
                      className="mt-2 h-12 rounded-none border-zinc-100"
                      placeholder="Required for international"
                    />
                  </div>
                  <div>
                    <Label htmlFor="hsCode" className="text-zinc-700">HS Code (optional)</Label>
                    <Input
                      id="hsCode"
                      name="hsCode"
                      value={hsCode}
                      onChange={(e) => setHsCode(e.target.value)}
                      className="mt-2 h-12 rounded-none border-zinc-100"
                      placeholder="e.g. 8471.30"
                    />
                  </div>
                  <div>
                    <Label htmlFor="idPassportNumber" className="text-zinc-700">ID / Passport Number</Label>
                    <Input
                      id="idPassportNumber"
                      name="idPassportNumber"
                      value={idPassportNumber}
                      onChange={(e) => setIdPassportNumber(e.target.value)}
                      className="mt-2 h-12 rounded-none border-zinc-100"
                      placeholder="For customs"
                    />
                  </div>
                  <div>
                    <Label htmlFor="packageCategory" className="text-zinc-700">Package Category</Label>
                    <select
                      id="packageCategory"
                      name="packageCategory"
                      value={packageCategory}
                      onChange={(e) => setPackageCategory(e.target.value)}
                      className="mt-2 flex h-12 w-full rounded-none border border-zinc-100 bg-white px-4 text-zinc-900"
                    >
                      <option value="">Select</option>
                      {PACKAGE_CATEGORY_OPTIONS.map((o) => (
                        <option key={o.value} value={o.value}>{o.label}</option>
                      ))}
                    </select>
                  </div>
                </div>
              )}
            </section>

            {/* Service level */}
            <section>
              <h2 className="text-xs font-medium uppercase tracking-wider text-zinc-500">Service level</h2>
              <div className="mt-6 flex gap-4">
                <label className="flex flex-1 cursor-pointer items-center rounded-none border border-zinc-100 bg-white p-6">
                  <input
                    type="radio"
                    name="serviceLevel"
                    value="Standard"
                    checked={serviceLevel === "Standard"}
                    onChange={() => setServiceLevel("Standard")}
                    className="h-4 w-4 border-zinc-300 text-[#e3201b]"
                  />
                  <span className="ml-3 text-sm font-medium text-zinc-900">Standard</span>
                </label>
                <label className="flex flex-1 cursor-pointer items-center rounded-none border border-zinc-100 bg-white p-6">
                  <input
                    type="radio"
                    name="serviceLevel"
                    value="Express"
                    checked={serviceLevel === "Express"}
                    onChange={() => setServiceLevel("Express")}
                    className="h-4 w-4 border-zinc-300 text-[#e3201b]"
                  />
                  <span className="ml-3 text-sm font-medium text-zinc-900">Express</span>
                </label>
              </div>
            </section>
          </div>

          <div className="mt-12">
            <Button type="submit" className="h-12 rounded-none bg-[#e3201b] px-8 text-sm font-medium text-white hover:bg-[#c41b17]">
              Generate Waybill
            </Button>
          </div>
        </form>

        <aside className="sticky top-8 hidden w-80 shrink-0 border-l border-zinc-100 bg-white pl-10 lg:block">
          <p className="text-xs font-medium uppercase tracking-wider text-zinc-500 font-sans">Live quote</p>
          <div className="mt-6 space-y-4 rounded-none border border-zinc-100 bg-zinc-50 p-6 font-sans">
            <div className="flex justify-between text-sm">
              <span className="text-zinc-600">Base rate</span>
              <span className="font-medium text-zinc-900">₦{Math.round(baseFare * 0.7).toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-zinc-600">Fuel surcharge</span>
              <span className="font-medium text-zinc-900">₦{Math.round(baseFare * 0.2).toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-zinc-600">Security fee</span>
              <span className="font-medium text-zinc-900">₦{Math.round(baseFare * 0.1).toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-zinc-600">Insurance</span>
              <span className="font-medium text-zinc-900">₦{insurance.toLocaleString()}</span>
            </div>
            {serviceMode === "pickup" && (
              <div className="flex justify-between text-sm">
                <span className="text-zinc-600">Pick-up fee</span>
                <span className="font-medium text-zinc-900">₦{PICKUP_FEE_NGN.toLocaleString()}</span>
              </div>
            )}
            <div className="flex justify-between border-t border-zinc-100 pt-4">
              <span className="text-sm font-medium text-zinc-900">Total</span>
              <span className="text-xl font-semibold tracking-tighter text-[#e3201b]">
                ₦{total.toLocaleString()}
              </span>
            </div>
          </div>
          <p className="mt-3 text-xs text-zinc-500">
            {weightNum > 0
              ? `${weightNum} kg · ${serviceLevel}${serviceMode === "pickup" ? " · Pick-up" : " · Drop-off"}`
              : "Enter weight to see quote"}
          </p>
          <Button type="submit" form="booking-power-form" className="mt-8 w-full rounded-none bg-[#e3201b] py-3 text-sm font-medium text-white hover:bg-[#c41b17]">
            Generate Waybill
          </Button>
        </aside>
      </div>

      {state?.slip && (
        <BookingSlipModal
          open={showSlip}
          onClose={() => setShowSlip(false)}
          data={state.slip}
        />
      )}
    </>
  );
}
