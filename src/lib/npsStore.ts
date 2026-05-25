import type { ProfileId } from "./sellerProfiles";

const key = (p: ProfileId) => `wtp_nps_${p}`;

export function getNps(profile: ProfileId): number | null {
  if (typeof window === "undefined") return null;
  const raw = sessionStorage.getItem(key(profile));
  if (raw == null) return null;
  const n = Number(raw);
  return Number.isFinite(n) ? n : null;
}

export function setNps(profile: ProfileId, value: number) {
  if (typeof window === "undefined") return;
  sessionStorage.setItem(key(profile), String(value));
}

export function isCritic(profile: ProfileId): boolean {
  const n = getNps(profile);
  return n != null && n <= 6;
}
