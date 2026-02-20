"use client";

import { useEffect, useState } from "react";
import { getMerchantKycDocumentsAction, setMerchantKycStatusAction } from "./actions";

type KycDoc = {
  personalKyc: { fullName: string; dateOfBirth: string; idType: string; idDocumentUrl?: string } | null;
  businessKyc: { companyName: string; rcNumber?: string; businessAddress?: string; industry?: string; cacDocumentUrl?: string } | null;
  kycStatus: string;
};

export function KycDocumentsModal({
  merchantId,
  businessName,
  open,
  onClose,
  onStatusChange,
}: {
  merchantId: string;
  businessName: string;
  open: boolean;
  onClose: () => void;
  onStatusChange?: () => void;
}) {
  const [data, setData] = useState<KycDoc | null>(null);
  const [loading, setLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);

  useEffect(() => {
    if (!open || !merchantId) return;
    setLoading(true);
    getMerchantKycDocumentsAction(merchantId)
      .then(setData)
      .finally(() => setLoading(false));
  }, [open, merchantId]);

  async function handleApprove() {
    setActionLoading(true);
    await setMerchantKycStatusAction(merchantId, "Approved");
    setActionLoading(false);
    onStatusChange?.();
    onClose();
  }

  async function handleReject() {
    setActionLoading(true);
    await setMerchantKycStatusAction(merchantId, "Rejected");
    setActionLoading(false);
    onStatusChange?.();
    onClose();
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-lg rounded-none border border-zinc-200 bg-white shadow-lg">
        <header className="flex items-center gap-3 border-b border-zinc-100 px-6 py-4">
          <span className="shrink-0 font-sans text-lg font-bold tracking-tighter text-black">shipco</span>
          <div>
            <h2 className="font-sans text-lg font-semibold tracking-tight text-zinc-900">
              KYC Documents
            </h2>
            <p className="text-sm text-zinc-500">{businessName}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="ml-auto rounded-none border border-zinc-200 bg-white p-2 text-zinc-500 hover:bg-zinc-50"
            aria-label="Close"
          >
            ×
          </button>
        </header>

        <div className="max-h-[60vh] overflow-y-auto px-6 py-6">
          {loading ? (
            <p className="text-center text-sm text-zinc-500">Loading…</p>
          ) : data ? (
            <div className="space-y-8">
              <section>
                <h3 className="text-xs font-medium uppercase tracking-wider text-zinc-500 font-sans">
                  Personal KYC
                </h3>
                <div className="mt-3 space-y-2 rounded-none border border-zinc-100 bg-zinc-50 p-4 font-sans text-sm">
                  {data.personalKyc ? (
                    <>
                      <p><span className="text-zinc-500">Full Name:</span> {data.personalKyc.fullName}</p>
                      <p><span className="text-zinc-500">DOB:</span> {data.personalKyc.dateOfBirth}</p>
                      <p><span className="text-zinc-500">ID Type:</span> {data.personalKyc.idType}</p>
                      {data.personalKyc.idDocumentUrl && (
                        <p><span className="text-zinc-500">Document:</span> <a href={data.personalKyc.idDocumentUrl} target="_blank" rel="noopener noreferrer" className="text-[#e3201b] underline">View</a></p>
                      )}
                    </>
                  ) : (
                    <p className="text-zinc-500">No personal KYC submitted.</p>
                  )}
                </div>
              </section>
              <section>
                <h3 className="text-xs font-medium uppercase tracking-wider text-zinc-500 font-sans">
                  Business KYC
                </h3>
                <div className="mt-3 space-y-2 rounded-none border border-zinc-100 bg-zinc-50 p-4 font-sans text-sm">
                  {data.businessKyc ? (
                    <>
                      <p><span className="text-zinc-500">Company:</span> {data.businessKyc.companyName}</p>
                      <p><span className="text-zinc-500">RC Number:</span> {data.businessKyc.rcNumber ?? "-"}</p>
                      {data.businessKyc.industry && <p><span className="text-zinc-500">Industry:</span> {data.businessKyc.industry}</p>}
                      <p><span className="text-zinc-500">Address:</span> {data.businessKyc.businessAddress ?? "-"}</p>
                      {data.businessKyc.cacDocumentUrl && (
                        <p><span className="text-zinc-500">CAC Doc:</span> <a href={data.businessKyc.cacDocumentUrl} target="_blank" rel="noopener noreferrer" className="text-[#e3201b] underline">View</a></p>
                      )}
                    </>
                  ) : (
                    <p className="text-zinc-500">No business KYC submitted.</p>
                  )}
                </div>
              </section>
            </div>
          ) : (
            <p className="text-center text-sm text-zinc-500">No documents found.</p>
          )}
        </div>

        <footer className="flex gap-3 border-t border-zinc-100 px-6 py-4">
          <button
            type="button"
            onClick={handleApprove}
            disabled={actionLoading}
            className="flex-1 rounded-none border-0 bg-green-600 py-3 text-sm font-medium text-white hover:bg-green-700 disabled:opacity-50 font-sans"
          >
            Approve Merchant
          </button>
          <button
            type="button"
            onClick={handleReject}
            disabled={actionLoading}
            className="flex-1 rounded-none border border-[#e3201b] bg-white py-3 text-sm font-medium text-[#e3201b] hover:bg-[#e3201b]/5 disabled:opacity-50 font-sans"
          >
            Reject
          </button>
        </footer>
      </div>
    </div>
  );
}