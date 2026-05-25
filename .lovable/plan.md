## Cel
Zwiększyć white space między 9 sekcjami narzędzi i ujednolicić ich wygląd z dolną sekcją cenową — całe tło karty narzędzia ma być takie samo jak tło dolnej sekcji "Aktywuj pełny dostęp" (kremowy gradient).

## Zmiany w `src/pages/seller/SellerUnlock.tsx`

### 1. Więcej white space między narzędziami
- Wrapper listy narzędzi (linia 296): `flex flex-col gap-8` → `flex flex-col gap-12 md:gap-20`.

### 2. Tło kart narzędzi identyczne jak dolna sekcja cenowa
Dolna sekcja używa: `rounded-2xl bg-gradient-to-br from-cream via-cream to-warning/15` (linia 1197).

Dla każdego z 9 `<article>` (linie 298, 411, 502, 637, 743, 843, 925, 1021, 1090):
- Zamienić: `bg-card rounded-2xl ring-1 ring-border/40 shadow-[0_1px_3px_rgba(15,23,42,0.04)] overflow-hidden grid …`
- Na: `rounded-2xl bg-gradient-to-br from-cream via-cream to-warning/15 shadow-[0_20px_60px_-24px_rgba(0,0,0,0.18)] overflow-hidden grid …`
- Usunąć podziały `border-b lg:border-b-0 lg:border-r border-border/40` między kolumnami (na kremowym tle wyglądają jak szrama). W razie potrzeby zastąpić ledwo widocznym `lg:border-r border-foreground/5`.
- Wewnętrzne białe panele z metrykami zostawić bez zmian — kontrast biały-na-kremowym tle jest tym samym efektem co w dolnej karcie cenowej (biały `bg-card` na kremowym kontenerze).

### 3. Drobny porządek odstępów
- Nagłówek sekcji "Co dostajesz" (linia 282): `mb-12` → `mb-14 md:mb-16` dla spójnego rytmu.

## Poza zakresem
- Brak zmian w treści, ikonach, typografii, akcentach warning, logice CTA/PostHog.
- Brak zmian w sekcji hero, "Dla kogo", scroll-to-top, dolnej sekcji cenowej.
