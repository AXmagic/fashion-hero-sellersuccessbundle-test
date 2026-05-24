## Zmiany

**1. `src/lib/sellerProfiles.ts`**
- Dorota: `returnRatePct: 18` → `14`
- W interfejsie `SellerProfile` dodać pole `positiveCards: [string, string]` po `hookSub`
- Dodać `positiveCards` do każdego z trzech profili (Dorota, Bartek, Kamil) z podanymi tekstami

**2. `src/components/seller/Layer1Economics.tsx`**
- Dodać `CheckCircle` do istniejącego importu z `lucide-react`
- Pomiędzy "Metric grid" a "Weekly margin chart" wstawić nową sekcję:
  - `grid grid-cols-1 md:grid-cols-2 gap-3` z dwoma kartami
  - Każda karta: zielone tło (`bg-success/10`, `border-success/25`), ikona `CheckCircle` w kółku (`bg-success/20`), tekst z `profile.positiveCards[0/1]`
  - Bez sparkline, bez CTA

Bez zmian w innych plikach. Bez zmian kolejności istniejących sekcji. Bez zmian w MetricCard i MarginSparkline.