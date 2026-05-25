## Cel

Cała podstrona `/seller/:profile/unlock` ma wyglądać nowocześniej, lżej i czytelniej — w duchu załączników (Proton Drive, Analytko, Efficense). Zostawiamy tylko typografię z DS (serif w nagłówkach + sans w body). Reszta tokenów wizualnych w sekcji narzędzi przechodzi na lokalną, „luźniejszą" paletę i kompozycję.

## Diagnoza obecnego stanu

- Sekcja „Co dokładnie dostajesz w pakiecie" (9 narzędzi) jest gęsta i mocno żółta: `bg-warning/5`, `bg-warning/10`, `bg-warning/15`, `border-warning/40`, żółte badge'y, żółte pigułki CTA w każdej wizualizacji.
- Każda karta narzędzia ma identyczny rytm: lewa kolumna (Ból / Co robi / Impact-żółty box) + prawa kolumna (wizualizacja w `bg-muted/30` z białą kartą w środku z `border-border` i żółtymi akcentami).
- Wnętrza wizualizacji są zatłoczone: dużo pigułek statusu, badge'ów, akcentów koloru — wszystko walczy o uwagę.
- Hero / persony / pricing card stylistycznie są OK i pozostają bez zmian poza drobnymi korektami spójności.

## Kierunek wizualny (z załączników)

- Tło sekcji: bardzo jasne, lekko mleczne (gradient `from-background to-muted/30` lub solidny off-white), zamiast kontrastowych kafli.
- Karty narzędzi: białe, bez ciężkich obramowań — delikatny `shadow-[0_1px_2px_rgba(0,0,0,0.04)]`, `rounded-2xl`, brak `border` lub bardzo subtelny `border-border/50`.
- Wizualizacje: powietrza więcej, mniej linii podziału, większe „liczby bohaterskie" (font-serif XXL dla jednej kluczowej metryki per narzędzie), reszta jako spokojne wiersze tekstu.
- Akcent koloru: żółty `warning` zarezerwowany TYLKO dla najważniejszego sygnału (Impact + finalny CTA w karcie cenowej). W wizualizacjach żółty schodzi do roli kropki/cienkiej kreski/podkreślenia. Statusy (HOT / Rosnący / Stabilny, FAST / MID / SLOW) idą na neutralną skalę szarości z drobnym kolorowym znacznikiem (kropka, nie pełne tło badge'a).
- Ikony: cieńsze (`strokeWidth={1.5}`), w `text-muted-foreground` z wyjątkiem jednej, która jest „bohaterem" danego widoku.
- Typografia: bez zmian — `font-serif` w h2/h3 i w pojedynczych dużych liczbach, body w sans. Lekkie zwiększenie line-height w opisach.

## Zakres zmian

### 1. Sekcja „Co dokładnie dostajesz w pakiecie" — przebudowa wizualna (głównie)

Plik: `src/pages/seller/SellerUnlock.tsx`, linie ~245–~1100 (9 kart narzędzi).

Per karta narzędzia:

- Kontener `<article>`: `bg-card` → `bg-card`, `border border-border` → brak borderu, dodać `shadow-[0_1px_2px_rgba(15,23,42,0.04)]` + `ring-1 ring-border/40`.
- Lewa kolumna (Ból / Co robi / Impact):
  - Etykiety sekcji („Ból", „Co robi") z `uppercase tracking` zostawiamy.
  - Box „Impact" przechodzi z `bg-warning/10 border-warning/30` na `bg-muted/40` bez borderu, z cienką kreską `border-l-2 border-warning` po lewej. Treść Impactu zostaje wyróżniona, ale bez „żółtego dymka".
- Prawa kolumna (wizualizacja):
  - Tło panelu `bg-muted/30` → bardzo jasny gradient `bg-gradient-to-br from-muted/30 via-background to-muted/20`.
  - Wewnętrzna karta wizualizacji: zostaje biała, ale traci `border-border` na rzecz `shadow-[0_8px_24px_-12px_rgba(15,23,42,0.12)]` + `ring-1 ring-border/40`.
  - Nagłówki wizualizacji (np. „Aktywne sygnały trendów") — bez `border-b` pod headerem, oddzielenie samą przestrzenią.
  - Listy wierszy: `divide-y divide-border` → `divide-y divide-border/40` + większy `py-4`.
  - Badge statusu (HOT / Rosnący / Stabilny, FAST / MID / SLOW, Krytyczny / Średni / Niski): wymiana z kolorowych pigułek na: kolorowa kropka 6px + uppercase tracking text, bez tła.
  - „Pigułki CTA" wewnątrz wizualizacji (`bg-warning text-warning-foreground … rounded-full`): zamiana na neutralny link-button „Zamów +40 szt. →" w kolorze `text-foreground` z `underline-offset` lub na czarny pill (`bg-foreground text-background`) — żółty znika z wnętrza wizualizacji.
  - Dolne paski „bg-warning/10 border-t border-warning/30" (Stockout, Trend Feed): zamiana na neutralne `bg-muted/40` z `border-t border-border/40` i jedną kolorową kropką sygnalizującą priorytet.
  - W każdej wizualizacji wytypować JEDNĄ liczbę-bohatera (np. „19 900 zł / mies.", „8 700 zł", „score 64", „rotacja: 4 dni") i wybić ją `font-serif text-[40px]` z subtelnym podpisem — wzorzec z Efficense.

### 2. Nagłówek sekcji narzędzi

- H2 „Co dokładnie dostajesz w pakiecie" — bez zmian typografii. Pod nim dodać delikatny separator (kropka + 1px kreska 40px) zamiast samego paragrafu, dla rytmu „Awwwards".

### 3. Tło całej podstrony (drobna spójność)

- Wrapper `SellerShell` zostawiamy. W `SellerUnlock` ramka hero (`bg-gradient-to-br from-cream via-cream to-warning/15`) — bez zmian.
- Sekcje „Dla kogo" i „Co dokładnie dostajesz" dostają wspólny, subtelny gradient tła (`bg-gradient-to-b from-background to-muted/20`) zamiast neutralnego białego, dla lekkiego oddechu między blokami.

### 4. Karty person („Dla kogo")

- Drobny lifting w duchu Proton: zdjęcie persony w okrągłej masce z cienką obwódką `ring-1 ring-border`, box „Z pakietem" traci `bg-warning/10 border-warning/30` na rzecz `bg-muted/30` z lewą kreską `border-l-2 border-warning`. Spójne z nowym stylem „Impact" w narzędziach.

## Czego NIE ruszamy

- Hero (lewa strona) i pricing card po prawej — bez zmian (po ostatniej iteracji jest OK).
- Treści (copy) wszystkich sekcji — bez zmian.
- Logika losowania ceny, eventy, WaitlistDialog — bez zmian.
- Typografia DS (`font-serif`, sans) — zostaje.
- Tokeny w `index.css` / `tailwind.config.ts` — bez zmian (działamy tylko klasami w komponencie, używając istniejących tokenów: `card`, `border`, `muted`, `foreground`, `warning`, `background`).

## Pliki do edycji

- `src/pages/seller/SellerUnlock.tsx` — jedyny edytowany plik.

## Walidacja po wdrożeniu

- Wizualnie: przejrzeć `/seller/dorota/unlock?feature=analytics_offer` — sprawdzić rytm 9 sekcji, brak „żółtej ściany", obecność jednej liczby-bohatera w każdej wizualizacji.
- Brak regresji buildu (TS).
- Responsywność: 1423px (obecny viewport) + 375px (mobile) — karty narzędzi składają się do 1 kolumny bez ścinania.
