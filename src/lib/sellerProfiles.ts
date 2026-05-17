export type ProfileId = "dorota" | "bartek" | "kamil";

export interface SellerProfile {
  id: ProfileId;
  name: string;
  shop: string;
  category: string;
  initials: string;
  // Headline metrics (last 30 days)
  netRevenue: number; // PLN
  marginPct: number;
  marginDeltaPp: number; // negative = drop
  returnRatePct: number;
  returnsCost: number; // PLN/mies
  positionLabel: string;
  positionTone: "warning" | "destructive" | "muted";
  hookHeadline: string;
  hookSub: string;
  // Sparkline data: last 8 weeks margin %
  marginWeekly: number[];
}

export const PROFILES: Record<ProfileId, SellerProfile> = {
  dorota: {
    id: "dorota",
    name: "Dorota",
    shop: "Dorota Shoes",
    category: "Obuwie damskie",
    initials: "DS",
    netRevenue: 14_100,
    marginPct: 23,
    marginDeltaPp: -5,
    returnRatePct: 18,
    returnsCost: 1_100,
    positionLabel: "-12% poniżej mediany cen w obuwiu",
    positionTone: "warning",
    hookHeadline: "Twoja marża na obuwiu spadła o 5pp w ostatnich 30 dniach.\nJeśli trend się utrzyma, stracisz ok. 700 PLN netto w kolejnych 30 dniach",
    hookSub: "Przy utrzymujacym sie trendzie, to ~700 PLN netto strat w kolejnym miesiacu.",
    marginWeekly: [29, 28, 27, 28, 26, 25, 24, 23],
  },
  bartek: {
    id: "bartek",
    name: "Bartek",
    shop: "BRTK Wear",
    category: "Odzież damska",
    initials: "BR",
    netRevenue: 27_800,
    marginPct: 31,
    marginDeltaPp: -2,
    returnRatePct: 44,
    returnsCost: 3_400,
    positionLabel: "Top 25% GMV, ale -8pp marży vs konkurenci w odzieży damskiej",
    positionTone: "destructive",
    hookHeadline: "Zwroty kosztują Cię ~3 400 zł miesięcznie",
    hookSub: "Sprzedajesz dużo sukienek i topów, ale prawie połowa wraca. To Twoja największa dziura w marży.",
    marginWeekly: [33, 34, 32, 33, 31, 32, 30, 31],
  },
  kamil: {
    id: "kamil",
    name: "Kamil",
    shop: "Kamil Streetwear",
    category: "Streetwear męski",
    initials: "KS",
    netRevenue: 3_900,
    marginPct: 38,
    marginDeltaPp: 1,
    returnRatePct: 9,
    returnsCost: 180,
    positionLabel: "Poza top 50 w kategorii „streetwear męski\"",
    positionTone: "muted",
    hookHeadline: "Twoje dropy widzi 4× mniej osób niż mediana",
    hookSub: "Marża jest świetna — problemem jest widoczność. Konkurencyjne marki streetwear zbierają zapytania, których nie widzisz.",
    marginWeekly: [36, 37, 36, 38, 37, 38, 37, 38],
  },
};

export const PROFILE_LIST: SellerProfile[] = [PROFILES.dorota, PROFILES.bartek, PROFILES.kamil];

export function getProfile(id: string | undefined): SellerProfile | null {
  if (!id) return null;
  return (PROFILES as Record<string, SellerProfile>)[id] ?? null;
}
