## Install PostHog (EU)

Add PostHog browser SDK pointed at the EU host (`https://eu.i.posthog.com`) and wire it into the existing `logEvent` helper so wszystkie zdarzenia WTP (`session_start`, `w1_view`, `w2_view`, `preview_click`, `w3_view`, `cta_click`, `cta_dismiss`, `confirm_view`) trafiają zarówno do localStorage (jak teraz) jak i do PostHog.

### Kroki

1. **Instalacja paczki**
   - `bun add posthog-js`

2. **Klucz projektu PostHog**
   - Potrzebuję `VITE_POSTHOG_KEY` (publishable project API key z PostHog EU — zaczyna się od `phc_`).
   - Klucz jest publiczny (frontend), więc wpiszemy go jako zmienną `VITE_POSTHOG_KEY`. Host na sztywno: `https://eu.i.posthog.com`.
   - Jeśli wolisz, mogę też hardkodować klucz w `src/lib/posthog.ts` — daj znać.

3. **Inicjalizacja** — nowy plik `src/lib/posthog.ts`
   - Export `initPosthog()` wywoływany raz w `src/main.tsx` przed renderem.
   - Konfig: `api_host: 'https://eu.i.posthog.com'`, `person_profiles: 'identified_only'`, `capture_pageview: true`, `capture_pageleave: true`, `autocapture: true`.
   - Guard: nie inicjalizuj jeśli brak klucza (np. lokalny dev bez env) — tylko `console.warn`.

4. **Integracja z `wtpLog.ts`**
   - W `logEvent()` po zapisie do localStorage dorzucamy `posthog.capture(ev.type, { profile, price, feature, email })`.
   - Przy `session_start` dodatkowo `posthog.register({ profile, price })` żeby każde kolejne zdarzenie miało te property „na stałe” w sesji.

5. **Bez zmian w UI** — to czysta warstwa analityki, layout/treści zostają.

### Pytanie do Ciebie

Czy masz już projekt w PostHog EU i klucz `phc_…`? Jeśli tak — wklej go, dodam jako `VITE_POSTHOG_KEY`. Jeśli nie, załóż projekt na https://eu.posthog.com i przekaż klucz, zanim wdrożę.
