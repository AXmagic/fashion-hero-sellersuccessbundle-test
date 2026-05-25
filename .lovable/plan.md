
## Cel
Dodać sekcję „Dla kogo" pod główną kartą oferty na `/seller/:profile/unlock`, z 3 kartami person (Bartek, Dorota, Kamil) ze zdjęciami, opisem bólu i korzyścią.

## Zakres
- Plik: `src/pages/seller/SellerUnlock.tsx` — nowa sekcja po zamknięciu obecnego bloku oferty (po `<p>` z linią „Cena obejmuje…").
- Brak zmian w logice losowania ceny, layoutu menu, ani innych stronach.

## Treść kart

**Bartek** — Premium odzież · 45k zł GMV/mies.  
Ból: Tracił 7 godz./tydzień na ręczne śledzenie trendów. Nie widział, że 19 900 zł ginie miesięcznie w zwrotach.  
Korzyść: Sygnały trendów i UGC obniżają zwroty o 13 pp.

**Dorota** — Obuwie · top 11% return rate na platformie.  
Ból: 5 godz./tydzień w Excelu na śledzenie cen. Nie wiedziała, że jest jednym z najcenniejszych sprzedawców platformy.  
Korzyść: Automatyczny benchmark z kalkulatorem break-even.

**Kamil** — Streetwear · nowy seller, ryzyko churnu.  
Ból: Pozycja #247 w kategorii. Algorytm go nie widział — błędne koło braku danych.  
Korzyść: Score listingu + AI opisy = lepsza konwersja bez przepalania budżetu.

## Zdjęcia
Wygeneruję 3 portretowe zdjęcia (fast quality, ~640×640, .jpg) zapisane w `src/assets/`:
- `persona-bartek.jpg` — mężczyzna ~35 lat, premium odzież, naturalne studio light
- `persona-dorota.jpg` — kobieta ~40 lat, w showroomie obuwniczym
- `persona-kamil.jpg` — mężczyzna ~25 lat, streetwear vibe

Import jako ES6 i `<img>` w karcie (okrągłe lub zaokrąglony top karty).

## Layout / design
- Sekcja w kontenerze `max-w-[1200px]`, margin-top ~`mt-16`.
- Nagłówek serif: „Dla kogo jest Seller Success Bundle" + krótki podtytuł muted.
- Grid: `grid-cols-1 md:grid-cols-3 gap-6`.
- Każda karta: `bg-card border border-border rounded-2xl` z zdjęciem na górze (aspect-[4/3] object-cover, zaokrąglony top), padding 6, w środku:
  - Imię (font-serif, text-2xl) + meta muted (kategoria · GMV/status)
  - Sekcja „Ból" — mały label uppercase + tekst
  - Sekcja „Z pakietem" — mały label warning + tekst
- Użycie istniejących tokenów (`bg-card`, `text-warning`, `text-muted-foreground`, `border-border`). Brak custom kolorów.

## Techniczne
- Brak zmian w stanie/logice/routingu.
- Brak nowych dependencies.
- Generowanie obrazów via `imagegen--generate_image` (fast).

## Out of scope
- Animacje, karuzela, modale person.
- Edycja `sellerProfiles.ts` (dane person sekcji są statyczne w pliku strony, niezależne od istniejących profili demo).
