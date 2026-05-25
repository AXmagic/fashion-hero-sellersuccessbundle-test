## Warstwa 0 — NPS screen przed W1

### Cel
Jednoekranowy NPS (0–10) przed wejściem w dane sellera. Wynik loguje się do PostHog razem z `profile` i `price`. Nie blokuje przejścia. Krytycy (0–6) dostają dodatkowe pytanie otwarte po kliknięciu CTA w W3.

### Flow

```
/seller/:profile  →  W0 NPS (nowy ekran)  →  /seller/:profile/flow (obecne W1+W2)  →  W3 Pricing/Unlock
                          │                                                                │
                          └─ logEvent nps_submit                                            └─ jeśli nps ≤ 6: modal "Co chcesz naprawić?"
                                                                                                 → logEvent nps_followup_submit
```

### Zmiany w plikach

**1. `src/lib/wtpLog.ts`** — dodać dwa typy zdarzeń:
- `nps_submit` (z polem `nps: number`)
- `nps_followup_submit` (z polem `nps_followup: string`)

Rozszerzyć interfejs `WtpEvent` o opcjonalne pola `nps` i `nps_followup`. PostHog `capture` przekazuje te pola w properties.

**2. `src/lib/npsStore.ts`** (nowy) — mały helper do trzymania wyniku NPS w `sessionStorage` per profil:
- `getNps(profile)` → number | null
- `setNps(profile, value)`
- `isCritic(profile)` → boolean (score ≤ 6)

Używamy sessionStorage, żeby modal krytyka w W3 wiedział, że pokazać follow-up bez ponownego pytania.

**3. `src/pages/seller/SellerNps.tsx`** (nowy) — pełnoekranowy widok:
- Tytuł: „Jak bardzo polecałbyś FashionHero innemu sprzedawcy?"
- Skala 0–10 jako 11 przycisków w rzędzie (mobile: zawijanie), pod spodem etykiety „Wcale" / „Zdecydowanie tak"
- Klik liczby → `setNps`, `logEvent({ type: "nps_submit", profile, price, nps: value })`, `navigate(/seller/:profile/flow)`
- Link „Pomiń" pod spodem → przejście bez logowania wyniku (loguje `nps_submit` z `nps: -1`? — **otwarte pytanie**, domyślnie: pomiń = brak eventu, czyste przekierowanie)
- Bez paska postępu, bez kontekstu „dlaczego pytamy" (zgodnie z briefem)

**4. `src/App.tsx`** — przepiąć routing:
- `/seller/:profile` → `SellerNps` (gate)
- `/seller/:profile/flow` → `SellerFlow` (dotychczasowy widok W1+W2)
- `/seller/:profile/unlock` → bez zmian
- Linki w `SellerLanding`, `SellerShell` itd. nie wymagają zmian, bo wchodzą przez `/seller/:profile`

**5. `src/pages/seller/SellerUnlock.tsx`** (W3) — po kliknięciu głównego CTA:
- Jeśli `isCritic(profile)` → otwórz modal `NpsFollowupDialog` zamiast od razu pokazać confirm
- Po submit follow-up: `logEvent({ type: "nps_followup_submit", profile, price, nps_followup: text })`, potem standardowy confirm flow
- Jeśli nie krytyk → bez zmian

**6. `src/components/seller/NpsFollowupDialog.tsx`** (nowy) — modal oparty o istniejący `Dialog`:
- Tytuł: „Co w Twoim sklepie chcesz naprawić w pierwszej kolejności?"
- `Textarea` (max 500 znaków, walidacja zod: trim, max 500)
- Przyciski: „Pomiń" (zamknij i kontynuuj) / „Wyślij" (loguj i kontynuuj)
- Brak walidacji wymagalności — pomiń też jest OK, ale wtedy brak `nps_followup_submit`

### Szczegóły techniczne
- Routing przez `react-router-dom` — nowa zagnieżdżona ścieżka `/seller/:profile/flow`
- NPS persisted w `sessionStorage` (nie localStorage) — czysty start per karta przeglądarki, spójne z `wtpPrice.ts`
- PostHog: pola `nps` i `nps_followup` lecą w `capture` properties, można je segmentować obok `profile` i `price`
- Walidacja inputu follow-up: zod schema (`z.string().trim().max(500)`)
- Brak nowych zależności

### Otwarte pytanie
- Czy „Pomiń" na ekranie NPS ma logować event z `nps: null/-1`, czy w ogóle nie logować? Domyślnie: nie logować.
