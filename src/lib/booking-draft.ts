export const BOOKING_DRAFT_KEY = "shipco_booking_draft";

export type BookingDraft = {
  origin: string;
  destination: string;
  weightKg: number;
  quoteAmount: number;
  ts: number;
};

export function saveBookingDraft(origin: string, destination: string, weightKg: number, quoteAmount: number): void {
  if (typeof window === "undefined") return;
  try {
    sessionStorage.setItem(
      BOOKING_DRAFT_KEY,
      JSON.stringify({ origin, destination, weightKg, quoteAmount, ts: Date.now() })
    );
  } catch (_) {}
}

export function getAndClearBookingDraft(): BookingDraft | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = sessionStorage.getItem(BOOKING_DRAFT_KEY);
    if (!raw) return null;
    sessionStorage.removeItem(BOOKING_DRAFT_KEY);
    const d = JSON.parse(raw) as BookingDraft;
    return d?.origin && d?.destination && d?.weightKg != null ? d : null;
  } catch (_) {
    return null;
  }
}
