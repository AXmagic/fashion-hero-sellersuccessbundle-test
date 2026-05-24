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
  positiveCards: [string, string]; // dwie pozytywne karty per profil
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
    returnRatePct: 14,
    returnsCost: 1_100,
    positionLabel: "-12% poniżej mediany cen w obuwiu",
    positionTone: "warning",
    hookHeadline: "W tym miesiącu Twoja marża na butach spadła o 5 punktów.\nJeśli trend się utrzyma, stracisz ok. 700 PLN netto w kolejnych 30 dniach",
    hookSub: "Pełna analiza pokaże, które modele butów, koszty lub rabaty odpowiadają za spadek marży",
    positiveCards: [
      "Twój return rate 14% jest w top 10% sprzedawców na FashionHero",
      "Jesteś w top 15% marży w kategorii obuwie damskie",
    ],
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
    hookHeadline: "Zwroty kosztowały Cię w tym miesiącu 3 400 PLN",
    hookSub: "Zarabiasz na sukienkach, a oddajesz to samo na zwrotach. Sprawdź dlaczego.",
    positiveCards: [
      "Twój średni koszyk jest wyższy niż 90% sprzedawców w Twojej kategorii",
      "Masz kupujących którzy zapisali Twoje produkty — ale jeszcze nie kupili",
    ],
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
    hookHeadline: "Twoje koszulki i bluzy są niewidoczne dla 9 na 10 kupujących.",
    hookSub: "Zanim wydasz pierwsze złote na promowane oferty — dowiedz się, które z 20 produktów w ogóle mają szansę się przebić.",
    positiveCards: [
      "Streetwear rośnie najszybciej ze wszystkich kategorii na FashionHero w tym kwartale",
      "3 Twoje produkty mają rosnący trend zapisów w tym tygodniu",
    ],
    marginWeekly: [36, 37, 36, 38, 37, 38, 37, 38],
  },
};

export const PROFILE_LIST: SellerProfile[] = [PROFILES.dorota, PROFILES.bartek, PROFILES.kamil];

export function getProfile(id: string | undefined): SellerProfile | null {
  if (!id) return null;
  return (PROFILES as Record<string, SellerProfile>)[id] ?? null;
}
