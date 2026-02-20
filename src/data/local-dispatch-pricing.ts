/**
 * Local Dispatch (Within Lagos) - flat rate + weight surcharge.
 * Used when Origin and Destination are both Lagos (LGA-to-LGA).
 */

export const LOCAL_DISPATCH_FLAT_RATE_NGN = 1500;
export const LOCAL_DISPATCH_PER_KG_NGN = 120;

/** Compute Local Dispatch total: flat + (weight × perKg). */
export function computeLocalDispatchTotal(weightKg: number): number {
  if (!Number.isFinite(weightKg) || weightKg <= 0) return 0;
  return Math.round(LOCAL_DISPATCH_FLAT_RATE_NGN + weightKg * LOCAL_DISPATCH_PER_KG_NGN);
}
