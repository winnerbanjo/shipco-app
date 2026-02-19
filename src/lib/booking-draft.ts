export const BOOKING_DRAFT_KEY = "shipco_booking_draft";
export const BOOKING_DRAFT_LOCAL_KEY = "shipco_booking_draft_local";

export type BookingDraft = {
  origin: string;
  destination: string;
  weightKg: number;
  quoteAmount: number;
  ts: number;
  /** Service from homepage: local | nationwide | import | export */
  serviceType?: string;
  /** When both origin & destination are Lagos (or service is local). */
  originLga?: string;
  destLga?: string;
};

export function saveBookingDraft(
  origin: string,
  destination: string,
  weightKg: number,
  quoteAmount: number,
  options?: { serviceType?: string; originLga?: string; destLga?: string }
): void {
  if (typeof window === "undefined") return;
  try {
    const payload: BookingDraft = {
      origin,
      destination,
      weightKg,
      quoteAmount,
      ts: Date.now(),
      ...(options?.serviceType && { serviceType: options.serviceType }),
      ...(options?.originLga && { originLga: options.originLga }),
      ...(options?.destLga && { destLga: options.destLga }),
    };
    const json = JSON.stringify(payload);
    sessionStorage.setItem(BOOKING_DRAFT_KEY, json);
    localStorage.setItem(BOOKING_DRAFT_LOCAL_KEY, json);
  } catch (_) {}
}

/** Prefer localStorage (survives redirect to login), then sessionStorage. */
function getDraftRaw(): string | null {
  if (typeof window === "undefined") return null;
  try {
    return localStorage.getItem(BOOKING_DRAFT_LOCAL_KEY) ?? sessionStorage.getItem(BOOKING_DRAFT_KEY);
  } catch (_) {
    return null;
  }
}

export function getAndClearBookingDraft(): BookingDraft | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = getDraftRaw();
    if (!raw) return null;
    localStorage.removeItem(BOOKING_DRAFT_LOCAL_KEY);
    sessionStorage.removeItem(BOOKING_DRAFT_KEY);
    const d = JSON.parse(raw) as BookingDraft;
    return d?.origin != null && d?.destination != null && d?.weightKg != null ? d : null;
  } catch (_) {
    return null;
  }
}

/** Read draft without clearing (e.g. for prefill). Call getAndClearBookingDraft once when applying. */
export function peekBookingDraft(): BookingDraft | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = getDraftRaw();
    if (!raw) return null;
    const d = JSON.parse(raw) as BookingDraft;
    return d?.origin != null && d?.destination != null && d?.weightKg != null ? d : null;
  } catch (_) {
    return null;
  }
}
