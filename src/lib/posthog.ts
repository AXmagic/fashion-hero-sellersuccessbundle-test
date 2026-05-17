import posthog from "posthog-js";

const KEY = import.meta.env.VITE_POSTHOG_KEY as string | undefined;
const HOST = "https://eu.i.posthog.com";

let initialized = false;

export function initPosthog() {
  if (initialized || typeof window === "undefined") return;
  if (!KEY) {
    // eslint-disable-next-line no-console
    console.warn("[posthog] VITE_POSTHOG_KEY not set — analytics disabled");
    return;
  }
  posthog.init(KEY, {
    api_host: HOST,
    person_profiles: "identified_only",
    capture_pageview: true,
    capture_pageleave: true,
    autocapture: true,
  });
  initialized = true;
}

export { posthog };
