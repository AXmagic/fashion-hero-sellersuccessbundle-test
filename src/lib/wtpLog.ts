import type { ProfileId } from "./sellerProfiles";
import type { PricePoint } from "./wtpPrice";
import { posthog } from "./posthog";

export type WtpEventType =
  | "session_start"
  | "w1_view"
  | "w2_view"
  | "preview_click"
  | "w3_view"
  | "cta_click"
  | "cta_dismiss"
  | "confirm_view";

export interface WtpEvent {
  ts: string;
  type: WtpEventType;
  profile: ProfileId;
  price: PricePoint;
  feature?: string;
  email?: string;
}

const KEY = "wtp_events";

export function logEvent(ev: Omit<WtpEvent, "ts">) {
  if (typeof window === "undefined") return;
  const full: WtpEvent = { ts: new Date().toISOString(), ...ev };
  try {
    const raw = localStorage.getItem(KEY);
    const arr: WtpEvent[] = raw ? JSON.parse(raw) : [];
    arr.push(full);
    localStorage.setItem(KEY, JSON.stringify(arr));
  } catch {
    /* ignore */
  }
  try {
    if (posthog.__loaded) {
      if (full.type === "session_start") {
        posthog.register({ profile: full.profile, price: full.price });
      }
      posthog.capture(full.type, {
        profile: full.profile,
        price: full.price,
        feature: full.feature,
        email: full.email,
      });
    }
  } catch {
    /* ignore */
  }
  if (import.meta.env.DEV) {
    // eslint-disable-next-line no-console
    console.info("[wtp]", full);
  }
}

export function readEvents(): WtpEvent[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function clearEvents() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(KEY);
}
