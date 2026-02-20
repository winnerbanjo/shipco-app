"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { CldUploadWidget } from "next-cloudinary";

const INPUT_CLASS =
  "mt-2 w-full rounded-2xl border border-zinc-200 bg-white px-4 py-3 font-sans text-sm text-zinc-900 placeholder:text-zinc-400 focus:border-[#e3201b] focus:outline-none focus:ring-2 focus:ring-[#e3201b]/20";
const LABEL_CLASS = "block text-xs font-medium uppercase tracking-wider text-zinc-500 font-sans";

const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME ?? "do4mbqgjn";
const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

export default function MerchantKycPage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [cacNumber, setCacNumber] = useState("");
  const [idDocumentUrl, setIdDocumentUrl] = useState("");
  const [cacDocumentUrl, setCacDocumentUrl] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const getSecureUrl = useCallback((results: { info?: unknown }) => {
    const info = results?.info;
    if (info && typeof info === "object" && "secure_url" in info && typeof (info as { secure_url: string }).secure_url === "string") {
      return (info as { secure_url: string }).secure_url;
    }
    return undefined;
  }, []);
  const onIdSuccess = useCallback((results: { info?: unknown }, _widget: unknown) => {
    const url = getSecureUrl(results);
    if (url) setIdDocumentUrl(url);
  }, [getSecureUrl]);
  const onCacSuccess = useCallback((results: { info?: unknown }, _widget: unknown) => {
    const url = getSecureUrl(results);
    if (url) setCacDocumentUrl(url);
  }, [getSecureUrl]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (!cacNumber.trim()) {
      setError("CAC / Registration number is required.");
      return;
    }
    if (!idDocumentUrl) {
      setError("Government ID document is required.");
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch("/api/merchant/kyc", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          cacNumber: cacNumber.trim(),
          idDocumentUrl: idDocumentUrl || undefined,
          cacDocumentUrl: cacDocumentUrl || undefined,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.message || "Submission failed");
      setSuccess(true);
      setTimeout(() => router.push("/merchant/dashboard"), 2000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Submission failed");
    } finally {
      setSubmitting(false);
    }
  }

  if (status === "loading") {
    return (
      <div className="mx-auto max-w-2xl py-12 text-center">
        <p className="text-sm text-zinc-500">Loading…</p>
      </div>
    );
  }

  if (status === "unauthenticated") {
    return (
      <div className="mx-auto max-w-lg rounded-2xl border border-zinc-100 bg-white p-12 text-center shadow-sm">
        <p className="text-zinc-600">You need to sign in to complete KYC.</p>
        <Link href="/auth/login" className="mt-4 inline-block text-[#e3201b] hover:underline">
          Sign in
        </Link>
      </div>
    );
  }

  if (success) {
    return (
      <div className="mx-auto max-w-lg rounded-2xl border border-zinc-100 bg-white p-12 text-center shadow-sm">
        <h2 className="text-xl font-semibold text-zinc-900">Documents submitted</h2>
        <p className="mt-2 text-sm text-zinc-500">
          Your KYC is under review. You’ll be redirected to the dashboard shortly.
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl">
      <header className="flex items-center gap-4 border-b border-zinc-100 pb-6">
        <span className="shrink-0 font-sans text-xl font-extrabold tracking-tighter text-black">shipco</span>
        <div>
          <h1 className="font-sans text-2xl font-semibold tracking-tighter text-zinc-900">
            KYC verification
          </h1>
          <p className="mt-1 text-sm text-zinc-500">
            Upload your identity and business documents to get approved for higher volumes.
          </p>
        </div>
      </header>

      <div className="mt-8 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
        <strong>Account Pending Approval.</strong> Complete the form below. An admin will verify your documents.
      </div>

      <form onSubmit={handleSubmit} className="mt-8 space-y-8">
        {error && (
          <div className="rounded-2xl border border-[#e3201b]/30 bg-[#e3201b]/5 px-4 py-3 text-sm text-[#e3201b]">
            {error}
          </div>
        )}

        {/* Government ID – Cloudinary */}
        <div className="rounded-2xl border border-zinc-100 bg-white p-6 shadow-sm">
          <label className={LABEL_CLASS}>Government ID</label>
          <p className="mt-1 text-sm text-zinc-500">NIN, Passport, or BVN document (PDF or image)</p>
          <div className="mt-3">
            <CldUploadWidget
              options={{
                cloudName,
                folder: "shipco-kyc/id",
                resourceType: "auto",
                multiple: false,
              }}
              onSuccess={onIdSuccess}
              signatureEndpoint={!uploadPreset ? "/api/cloudinary/sign" : undefined}
              uploadPreset={uploadPreset || undefined}
            >
              {({ open }: { open: () => void }) => (
                <button
                  type="button"
                  onClick={open}
                  className="flex min-h-[120px] w-full flex-col items-center justify-center rounded-2xl border-2 border-dashed border-zinc-200 bg-zinc-50/50 p-6 text-sm text-zinc-500 transition-colors hover:border-[#e3201b] hover:bg-[#e3201b]/5"
                >
                  {idDocumentUrl ? (
                    <span className="font-medium text-[#e3201b]">ID uploaded ✓</span>
                  ) : (
                    "Click to upload Government ID"
                  )}
                </button>
              )}
            </CldUploadWidget>
          </div>
        </div>

        {/* CAC number */}
        <div className="rounded-2xl border border-zinc-100 bg-white p-6 shadow-sm">
          <label htmlFor="cac" className={LABEL_CLASS}>CAC / Registration number</label>
          <p className="mt-1 text-sm text-zinc-500">Your company registration number (e.g. RC 123456)</p>
          <input
            id="cac"
            type="text"
            value={cacNumber}
            onChange={(e) => setCacNumber(e.target.value)}
            placeholder="e.g. RC 123456"
            className={INPUT_CLASS}
          />
        </div>

        {/* CAC certificate – Cloudinary */}
        <div className="rounded-2xl border border-zinc-100 bg-white p-6 shadow-sm">
          <label className={LABEL_CLASS}>CAC certificate (optional)</label>
          <p className="mt-1 text-sm text-zinc-500">Upload your CAC certificate (PDF or image)</p>
          <div className="mt-3">
            <CldUploadWidget
              options={{
                cloudName,
                folder: "shipco-kyc/cac",
                resourceType: "auto",
                multiple: false,
              }}
              onSuccess={onCacSuccess}
              signatureEndpoint={!uploadPreset ? "/api/cloudinary/sign" : undefined}
              uploadPreset={uploadPreset || undefined}
            >
              {({ open }: { open: () => void }) => (
                <button
                  type="button"
                  onClick={open}
                  className="flex min-h-[120px] w-full flex-col items-center justify-center rounded-2xl border-2 border-dashed border-zinc-200 bg-zinc-50/50 p-6 text-sm text-zinc-500 transition-colors hover:border-[#e3201b] hover:bg-[#e3201b]/5"
                >
                  {cacDocumentUrl ? (
                    <span className="font-medium text-[#e3201b]">CAC document uploaded ✓</span>
                  ) : (
                    "Click to upload CAC certificate (optional)"
                  )}
                </button>
              )}
            </CldUploadWidget>
          </div>
        </div>

        <div className="flex gap-3">
          <Link
            href="/merchant/dashboard"
            className="flex-1 rounded-2xl border border-zinc-200 bg-white py-4 text-center text-sm font-medium text-zinc-700 hover:bg-zinc-50"
          >
            Back to Dashboard
          </Link>
          <button
            type="submit"
            disabled={submitting}
            className="flex-1 rounded-2xl bg-[#e3201b] py-4 text-sm font-medium text-white hover:bg-[#e3201b]/90 disabled:opacity-50"
          >
            {submitting ? "Submitting…" : "Submit for verification"}
          </button>
        </div>
      </form>
    </div>
  );
}
