"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const INPUT_CLASS =
  "mt-2 w-full rounded-2xl border border-zinc-200 bg-white px-4 py-3 font-sans text-sm text-zinc-900 placeholder:text-zinc-400 focus:border-[#F40009] focus:outline-none focus:ring-2 focus:ring-[#F40009]/20";
const LABEL_CLASS = "block text-xs font-medium uppercase tracking-wider text-zinc-500 font-sans";

export default function MerchantKycPage() {
  const router = useRouter();
  const [cacNumber, setCacNumber] = useState("");
  const [idFile, setIdFile] = useState<File | null>(null);
  const [cacFile, setCacFile] = useState<File | null>(null);
  const [idDrag, setIdDrag] = useState(false);
  const [cacDrag, setCacDrag] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const onIdDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIdDrag(false);
    const f = e.dataTransfer.files?.[0];
    if (f && (f.type.startsWith("image/") || f.type === "application/pdf")) setIdFile(f);
  }, []);
  const onCacDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setCacDrag(false);
    const f = e.dataTransfer.files?.[0];
    if (f && (f.type.startsWith("image/") || f.type === "application/pdf")) setCacFile(f);
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (!cacNumber.trim()) {
      setError("CAC / Registration number is required.");
      return;
    }
    setSubmitting(true);
    try {
      const formData = new FormData();
      formData.set("cacNumber", cacNumber.trim());
      if (idFile) formData.set("idDocument", idFile);
      if (cacFile) formData.set("cacDocument", cacFile);
      const res = await fetch("/api/merchant/kyc", { method: "POST", body: formData });
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
        <span className="shrink-0 font-sans text-xl font-bold text-black">Shipco</span>
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
          <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        {/* Identity upload */}
        <div className="rounded-2xl border border-zinc-100 bg-white p-6 shadow-sm">
          <label className={LABEL_CLASS}>Government ID</label>
          <p className="mt-1 text-sm text-zinc-500">NIN, Passport, or BVN document (PDF or image)</p>
          <div
            onDragOver={(e) => { e.preventDefault(); setIdDrag(true); }}
            onDragLeave={() => setIdDrag(false)}
            onDrop={onIdDrop}
            className={`mt-3 flex min-h-[140px] flex-col items-center justify-center rounded-2xl border-2 border-dashed bg-zinc-50/50 p-6 transition-colors ${
              idDrag ? "border-[#F40009] bg-red-50/30" : "border-zinc-200"
            }`}
          >
            <input
              type="file"
              accept=".pdf,image/*"
              className="hidden"
              id="id-doc"
              onChange={(e) => setIdFile(e.target.files?.[0] ?? null)}
            />
            <label htmlFor="id-doc" className="cursor-pointer text-center text-sm text-zinc-500">
              {idFile ? (
                <span className="font-medium text-zinc-700">{idFile.name}</span>
              ) : (
                "Drag and drop your ID here or click to browse"
              )}
            </label>
          </div>
        </div>

        {/* Business proof – CAC number */}
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

        {/* Optional CAC document upload */}
        <div className="rounded-2xl border border-zinc-100 bg-white p-6 shadow-sm">
          <label className={LABEL_CLASS}>CAC certificate (optional)</label>
          <p className="mt-1 text-sm text-zinc-500">Upload your CAC certificate (PDF or image)</p>
          <div
            onDragOver={(e) => { e.preventDefault(); setCacDrag(true); }}
            onDragLeave={() => setCacDrag(false)}
            onDrop={onCacDrop}
            className={`mt-3 flex min-h-[120px] flex-col items-center justify-center rounded-2xl border-2 border-dashed bg-zinc-50/50 p-6 transition-colors ${
              cacDrag ? "border-[#F40009] bg-red-50/30" : "border-zinc-200"
            }`}
          >
            <input
              type="file"
              accept=".pdf,image/*"
              className="hidden"
              id="cac-doc"
              onChange={(e) => setCacFile(e.target.files?.[0] ?? null)}
            />
            <label htmlFor="cac-doc" className="cursor-pointer text-center text-sm text-zinc-500">
              {cacFile ? (
                <span className="font-medium text-zinc-700">{cacFile.name}</span>
              ) : (
                "Drag and drop or click to browse"
              )}
            </label>
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
            className="flex-1 rounded-2xl bg-[#F40009] py-4 text-sm font-medium text-white hover:bg-[#cc0008] disabled:opacity-50"
          >
            {submitting ? "Submitting…" : "Submit for verification"}
          </button>
        </div>
      </form>
    </div>
  );
}
