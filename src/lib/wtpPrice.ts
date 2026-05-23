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
  // Equal distribution: each price point has 1/3 probability
  const idx = Math.floor(Math.random() * POINTS.length);
  const picked: PricePoint = POINTS[idx];
  sessionStorage.setItem(key, String(picked));
  return picked;
}
