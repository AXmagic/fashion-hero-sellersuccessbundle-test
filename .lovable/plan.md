## Cel
Dodać konkretne adnotacje źródłowe do kluczowych liczb w Warstwie 1 (Seller Economics), żeby budować zaufanie ("na podstawie X transakcji/zwrotów między DD.MM a DD.MM.2026").

## Zakres zmian

### 1. `src/lib/sellerProfiles.ts`
Dodać do `SellerProfile` pola opisujące podstawę szacunków:
- `dataWindowDays: number` (np. 30, 60, 90)
- `dataWindowLabel: string` — np. `"1.02 – 30.04.2026"`
- `txCount: number` — liczba transakcji w oknie
- `returnsCount: number` — liczba zwrotów w oknie
- `categoryPeerCount: number` — liczba sklepów w kategorii do porównania pozycji

Uzupełnić wartości dla `dorota`, `bartek`, `kamil` spójne z istniejącymi liczbami (np. Dorota: 30 dni, ~180 transakcji, ~32 zwroty).

### 2. `src/components/seller/MetricCard.tsx`
Zamienić dekoracyjną `HelpCircle` w prawym górnym rogu karty na realny tooltip ze źródłem:
- Użyć `Tooltip` z `src/components/ui/tooltip.tsx` (wrapped w `TooltipProvider` w `App.tsx` — sprawdzić; jeśli brak, dodać prowider na poziomie strony Layer1).
- Nowy opcjonalny prop `source?: string` — treść tooltipa.
- Na mobile (brak hover) — kliknięcie ikony otwiera ten sam tekst (Tooltip Radix obsługuje touch po `delayDuration={0}` + `Popover` fallback; prościej: użyć `HoverCard` z `openDelay=0` lub po prostu `Tooltip` — wystarczające dla prototypu).

### 3. `src/components/seller/Layer1Economics.tsx`
Przekazać `source` do każdej z 4 kart:
- **Przychód netto**: `"Na podstawie {txCount} transakcji zarejestrowanych między {dataWindowLabel}."`
- **Marża netto**: `"Szacowane z {txCount} transakcji ({dataWindowDays} dni). Uwzględnia prowizje FashionHero, koszty wysyłki i zwroty."`
- **Koszt zwrotów**: `"Na podstawie {returnsCount} zwrotów zarejestrowanych w systemie między {dataWindowLabel}."`
- **Pozycja w kategorii**: `"Porównanie {categoryPeerCount} aktywnych sklepów w kategorii „{category}" w ostatnich {dataWindowDays} dniach."`

Pod nagłówkiem wykresu "Marża tygodniowa" dodać małą linię:
`"Szacujemy na podstawie {txCount} transakcji z ostatnich {dataWindowDays} dni ({dataWindowLabel})."` — `text-[11.5px] text-muted-foreground`.

Pod alertem (banner ostrzegawczy) dodać krótką notkę źródłową w tym samym tonie — np. dla Doroty: `"Trend wyliczony z {txCount} transakcji w ostatnich {dataWindowDays} dniach."`.

## Co pozostaje bez zmian
- Logika losowania price pointu, eventy WTP, layouty Warstw 2/3, style kart cenowych, breakpointy mobile/desktop, kolory.

## Szczegóły techniczne
- Tooltip dostępny i klawiaturowo (focusable button wokół ikony info).
- Brak nowych zależności.
- Wartości `txCount/returnsCount/dataWindowLabel` są deterministyczne per profil (nie losowane), żeby tooltip i copy się zgadzały między sesjami.
