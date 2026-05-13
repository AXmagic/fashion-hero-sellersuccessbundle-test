## WTP Seller Success Bundle — Fake-door prototype

Trzywarstwowy flow testujący willingness-to-pay sprzedawców FashionHero. Mobile-first, B2B SaaS feel (karty metryk, alerty marżowe — wzorzec Shopify Analytics, nie Zalando).

### Routing i wejście

- Nowa trasa `/seller/:profile` gdzie `profile ∈ {dorota, bartek, kamil}`
- Plus `/seller` — landing wyboru profilu (3 karty „Wejdź jako Dorota / Bartek / Kamil") tylko do testów; w realnym wysłaniu link prowadzi prosto do `/seller/dorota` itd.
- Price point losowany **raz per sesja per profil** i trzymany w `sessionStorage` pod kluczem `wtp_price_{profile}` — kolejne wejścia tej samej osoby pokazują tę samą cenę (spójność doświadczenia), ale nowa karta = nowa sesja = nowe losowanie. Rozkład jednostajny 299/399/499.

### Dane demo profili (zamrożone w kodzie)


| Profil | GMV        | Marża netto    | Return rate | Koszt zwrotów | Pozycja vs mediana kategorii              | Hook W1                                          |
| ------ | ---------- | -------------- | ----------- | ------------- | ----------------------------------------- | ------------------------------------------------ |
| Dorota | 18 200 PLN | 23% (-5pp m/m) | 18%         | 1 100 PLN     | -12% poniżej mediany cen                  | „Twoja marża spadła o 5pp — nie wiesz dlaczego"  |
| Bartek | 45 000 PLN | 31%            | 44%         | 3 400 PLN     | top 25% GMV, ale -8pp marży vs konkurenci | „Zwroty kosztują Cię ~3 400 PLN/mies."           |
| Kamil  | 4 800 PLN  | 38%            | 9%          | 180 PLN       | poza top 50 w kategorii „torby skórzane"  | „Twoje produkty widzi 4× mniej osób niż mediana" |


### Warstwa 1 — Seller Economics (pełny dostęp)

- Header: avatar + imię profilu, „Twój sklep · ostatnie 30 dni"
- 3 karty metryk (grid 2 kol mobile, 4 desktop):
  1. Przychód netto (GMV - prowizje - zwroty)
  2. Marża netto % z deltą m/m (czerwona strzałka jeśli spadek)
  3. Koszt zwrotów PLN/mies.
  4. Pozycja vs mediana kategorii (badge)
- Alert-banner pod kartami w kolorze ostrzegawczym (semantyczny token `destructive`/`warning`) z hookiem profilu
- Mini-wykres słupkowy „Marża tygodniowa" (SVG inline, 8 słupków, ostatni czerwony)
- CTA na dół warstwy: „Zobacz, co dalej →" scrolluje do W2

### Warstwa 2 — Premium preview (rozmyte)

3 feature-cards w grid, każda z:

- Tytuł + 1-zdaniowy opis (ostre, czytelne)
- Podgląd contentu (wykres / tabela / lista) z `filter: blur(8px)` + warstwa `pointer-events-none select-none` + `aria-hidden`
- Overlay z ikoną kłódki + małym CTA „Odblokuj"

Features:

1. **Price Monitor** — „5 produktów konkurencji potaniało w tym tygodniu" (rozmyta tabela)
2. **Trend Feed** — „Wzrost zapytań: linen blazer +180%" (rozmyty wykres trendu)
3. **Returns Analyzer** — „Top 3 powody zwrotów w Twojej kategorii" (rozmyta lista)

Każde kliknięcie w kafelek W2 loguje `preview_click | feature=<name> | profile | price` i scrolluje do W3.

### Warstwa 3 — Pricing + CTA

- Jedna karta cenowa wyśrodkowana (nie tabela 3 cen!)
- Cena: `{price} PLN/mies.` duża, font-serif, pod spodem „Płatność miesięczna — anulujesz, kiedy chcesz."
- Lista 5 punktów co zawiera Bundle (Dashboard + Price Monitor + Trend Feed + Returns Analyzer + alerty mailowe)
- Główne CTA: „Zostaw kontakt — odezwiemy się w 48h" (primary)
- Wtórne CTA: „Nie teraz" (ghost, loguje `cta_dismiss`)
- Pod CTA mały disclaimer: „Bez podpinania karty. Bez zobowiązań."

Po kliknięciu primary CTA → modal/sekcja potwierdzenia:

- „Dziękujemy za zainteresowanie — skontaktujemy się z Tobą w ciągu 48 godzin."
- Pole email (opcjonalne, nie wymagane do logu — log poszedł już na klik)
- Przycisk „Wróć do sklepu" → `/`

### Logowanie zdarzeń (mock, bez backendu)

- Helper `src/lib/wtpLog.ts` z `logEvent(type, payload)`
- Każdy event: `{ ts, type, profile, price, ...extra }`
- Zapis do `localStorage` pod kluczem `wtp_events` (append do JSON array) + `console.info` dla łatwego sprawdzenia w devtools
- Eventy: `session_start`, `w1_view`, `w2_view`, `preview_click`, `w3_view`, `cta_click`, `cta_dismiss`, `confirm_view`
- View-eventy odpalają się przez `IntersectionObserver` na sekcjach (raz per sesja)
- Bonus: ukryta strona `/seller/_events` listująca wszystkie zarejestrowane eventy z localStorage (do ręcznej weryfikacji w testach moderowanych) — nielinkowana z UI

### Pliki do utworzenia / zmiany

```text
src/pages/seller/SellerLanding.tsx        // wybór profilu (3 karty)
src/pages/seller/SellerFlow.tsx           // główna strona z W1+W2+W3 dla :profile
src/pages/seller/SellerEvents.tsx         // ukryty viewer eventów
src/components/seller/Layer1Economics.tsx
src/components/seller/Layer2Preview.tsx
src/components/seller/Layer3Pricing.tsx
src/components/seller/MetricCard.tsx
src/components/seller/MarginSparkline.tsx
src/components/seller/ConfirmDialog.tsx
src/lib/sellerProfiles.ts                 // dane 3 profili
src/lib/wtpPrice.ts                       // losowanie + sessionStorage
src/lib/wtpLog.ts                         // logEvent
src/App.tsx                                // 3 nowe routes
```

Brak zmian w istniejącym storefront — feature żyje pod `/seller/*`. Nie modyfikujemy `Index.tsx`, `Auth.tsx`, `StoreContext`.

### Design / tokens

Używamy istniejących semantycznych tokenów z `index.css` (`background`, `foreground`, `cream`, `border`, `destructive`, `muted-foreground`). Dodamy 2 tokeny tylko jeśli brakuje: `--warning` (bursztyn dla alertów marżowych) i `--success` (dla pozytywnych delt). Brak twardych kolorów w komponentach. Mobile-first: stack pionowy do `md:`, grid od `md:`.

### Czego nie budujemy (z briefu)

Brak prawdziwego dashboardu po CTA, brak płatności/checkoutu/rejestracji, brak porównań między sellerami, brak admina, brak deterministycznego price-pointu (losowanie zostaje).