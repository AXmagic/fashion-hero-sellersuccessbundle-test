import type { ProfileId } from "./sellerProfiles";

export type PricePoint = 299 | 399 | 499;
const POINTS: PricePoint[] = [299, 399, 499];

export function getSessionPrice(profile: ProfileId): PricePoint {
  if (typeof window === "undefined") return 399;
  const key = `wtp_price_${profile}`;
  const existing = sessionStorage.getItem(key);
  if (existing && POINTS.includes(Number(existing) as PricePoint)) {
    return Number(existing) as PricePoint;
  }
  // Weighted: 499 = 50%, 399 = 25%, 299 = 25%
  const r = Math.random();
  const picked: PricePoint = r < 0.5 ? 499 : r < 0.75 ? 399 : 299;
  sessionStorage.setItem(key, String(picked));
  return picked;
}
