import { useEffect, useRef, useState } from "react";
import { Navigate, useParams, useSearchParams, Link } from "react-router-dom";
import { ChevronLeft, BarChart3, ShieldCheck, TrendingUp, Check, Lock, Sparkles } from "lucide-react";
import SellerShell from "@/components/seller/SellerShell";
import WaitlistDialog from "@/components/seller/WaitlistDialog";
import { getProfile } from "@/lib/sellerProfiles";
import { getSessionPrice } from "@/lib/wtpPrice";
import { logEvent } from "@/lib/wtpLog";
import personaBartek from "@/assets/persona-bartek.jpg";
import personaDorota from "@/assets/persona-dorota.jpg";
import personaKamil from "@/assets/persona-kamil.jpg";

const PERSONAS = [
  {
    name: "Bartek",
    meta: "Premium odzież · 45k zł GMV/mies.",
    photo: personaBartek,
    pain:
      "Tracił 7 godz./tydzień na ręczne śledzenie trendów. Nie widział, że 19 900 zł ginie miesięcznie w zwrotach.",
    gain: "Sygnały trendów i UGC obniżają zwroty o 13 pp.",
  },
  {
    name: "Dorota",
    meta: "Obuwie · top 11% return rate na platformie",
    photo: personaDorota,
    pain:
      "5 godz./tydzień w Excelu na śledzenie cen. Nie wiedziała, że jest jednym z najcenniejszych sprzedawców platformy.",
    gain: "Automatyczny benchmark z kalkulatorem break-even.",
  },
  {
    name: "Kamil",
    meta: "Streetwear · nowy seller, ryzyko churnu",
    photo: personaKamil,
    pain:
      "Pozycja #247 w kategorii. Algorytm go nie widział — błędne koło braku danych.",
    gain: "Score listingu + AI opisy = lepsza konwersja bez przepalania budżetu.",
  },
];


const INCLUDED = [
  "Sygnały trendów — bądź przed rynkiem",
  "Benchmark cen i kalkulator break-even",
  "Prawdziwy koszt zwrotów w PLN",
  "Stockout alert powiązany z trendami",
  "Rotacja produktów fast / mid / slow",
  "Score listingu: opis · zdjęcia · cena",
  "Zdjęcia klientek (UGC) z kolejką zatwierdzeń",
  "AI: generator opisów produktów",
  "Checklist „Co teraz” — priorytety na dziś",
];

const VALUE_PROPS = [
  { Icon: BarChart3, text: "−12 godz./tydzień\nręcznej pracy" },
  { Icon: ShieldCheck, text: "Wyższa marża\ni mniej zwrotów" },
  { Icon: TrendingUp, text: "Decyzje oparte\nna Twoich danych" },
];

export default function SellerUnlock() {
  const { profile: profileId } = useParams();
  const [params] = useSearchParams();
  const featureKey = params.get("feature") ?? "full_access";
  const profile = getProfile(profileId);
  const [open, setOpen] = useState(false);
  const seen = useRef(false);

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  useEffect(() => {
    if (!profile || seen.current) return;
    seen.current = true;
    logEvent({ type: "w3_view", profile: profile.id, price: getSessionPrice(profile.id) });
  }, [profile]);

  if (!profile) return <Navigate to="/seller" replace />;
  const price = getSessionPrice(profile.id);

  const onPrimary = () => {
    logEvent({ type: "cta_click", profile: profile.id, price, feature: "primary_cta" });
    setOpen(true);
  };

  return (
    <SellerShell profile={profile}>
      <div className="max-w-[1200px] pt-6 md:pt-8">
        {/* Back link — always at the very top */}
        <Link
          to={`/seller/${profile.id}`}
          className="inline-flex items-center gap-1 text-[12px] text-muted-foreground hover:text-foreground mb-6"
        >
          <ChevronLeft className="w-3.5 h-3.5" /> Wróć do panelu
        </Link>

        <div className="rounded-2xl bg-gradient-to-br from-cream via-cream to-warning/15 px-6 md:px-10 py-8 md:py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-center">
            {/* LEFT: hero copy */}
            <div>
              <span className="inline-flex items-center text-[11px] font-semibold uppercase tracking-[1.6px] bg-warning/15 text-warning px-3 py-1.5 rounded-md">
                SELLER SUCCESS BUNDLE
              </span>
              <h1 className="font-serif text-4xl md:text-5xl leading-[1.1] mt-5">
                Odblokuj pełne dane
                <br />
                <span className="text-warning">swojego sklepu.</span>
              </h1>
              <p className="text-[14px] md:text-[15px] text-muted-foreground mt-5 leading-relaxed max-w-md">
                9 narzędzi, które zastępują Excela, ręczne śledzenie trendów i zgadywanie.
                Dane z FashionHero — Twojego sklepu i Twojej kategorii. Wiesz co zarabiasz,
                co się sprzedaje, i co naprawić jeszcze dziś.
              </p>

              <div className="grid grid-cols-3 gap-4 mt-8 max-w-md">
                {VALUE_PROPS.map(({ Icon, text }) => (
                  <div key={text} className="flex flex-col items-center text-center gap-2">
                    <span className="w-11 h-11 rounded-full bg-card border border-warning/30 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-warning" strokeWidth={1.6} />
                    </span>
                    <span className="text-[11.5px] text-foreground/80 leading-snug whitespace-pre-line">
                      {text}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT: pricing card */}
            <div className="bg-card rounded-2xl shadow-[0_10px_40px_-12px_rgba(0,0,0,0.15)] overflow-hidden">
              <div className="bg-warning text-warning-foreground text-center text-[12px] font-semibold uppercase tracking-[1.6px] py-3 inline-flex items-center justify-center gap-1.5 w-full">
                Oferta dla Ciebie
                <Sparkles className="w-3.5 h-3.5" />
              </div>

              <div className="px-7 md:px-9 py-7 text-center">
                <div className="flex items-baseline justify-center gap-1.5">
                  <span className="font-serif text-[56px] leading-none">{price}</span>
                  <span className="text-[15px] font-semibold">PLN</span>
                  <span className="text-[14px] text-muted-foreground">/ miesiąc</span>
                </div>
                <p className="text-[13px] text-muted-foreground mt-3 leading-relaxed">
                  Pełny dostęp do wszystkich narzędzi
                  <br />
                  analitycznych FashionHero
                </p>

                <ul className="text-left mt-6 space-y-2.5">
                  {INCLUDED.map((item) => (
                    <li key={item} className="flex gap-2.5 text-[13.5px]">
                      <Check className="w-4 h-4 text-warning shrink-0 mt-0.5" strokeWidth={2.5} />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <button
                  type="button"
                  onClick={onPrimary}
                  className="mt-7 w-full bg-warning text-warning-foreground font-semibold text-[14px] py-3.5 rounded-full hover:opacity-90 transition-opacity"
                >
                  Aktywuj pełny dostęp
                </button>

                <p className="text-[11.5px] text-muted-foreground mt-4 inline-flex items-center gap-1.5">
                  <Lock className="w-3 h-3" />
                  Bez zobowiązań. Anuluj w dowolnym momencie.
                </p>
              </div>
            </div>
          </div>

          <p className="text-[12px] text-muted-foreground mt-6 text-center">
            Cena obejmuje wszystkie 9 narzędzi. Bez ukrytych opłat. Rezygnacja w dowolnym momencie.
          </p>
        </div>

        {/* Dla kogo */}
        <section className="mt-16 md:mt-20">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="font-serif text-3xl md:text-4xl leading-tight">
              Jeden pakiet. Różne problemy. Ten sam efekt: lepsza sprzedaż.
            </h2>
            <p className="text-[14px] text-muted-foreground mt-3">
              Niezależnie od tego, czy dopiero startujesz, czy sprzedajesz premium za dziesiątki tysięcy miesięcznie — Seller Success Bundle pomaga uporządkować i przyspieszyć rozwój.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PERSONAS.map((p) => (
              <article
                key={p.name}
                className="bg-card border border-border rounded-2xl overflow-hidden flex flex-col"
              >
                <div className="px-6 pt-6 pb-5 flex items-center gap-3.5 border-b border-border">
                  <div className="w-16 h-16 rounded-full overflow-hidden bg-muted shrink-0">
                    <img
                      src={p.photo}
                      alt={`${p.name} — ${p.meta}`}
                      loading="lazy"
                      width={128}
                      height={128}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-[14px] font-medium text-muted-foreground leading-tight">
                      {p.name}
                    </h3>
                    <p className="text-[14px] text-muted-foreground/80 mt-1 leading-snug">
                      {p.meta}
                    </p>
                  </div>
                </div>
                <div className="p-6 flex flex-col gap-5 flex-1">
                  <div>
                    <span className="text-[14px] font-semibold uppercase tracking-[1.4px] text-muted-foreground">
                      Ból
                    </span>
                    <p className="text-[15px] mt-2 leading-relaxed">{p.pain}</p>
                  </div>

                  <div className="mt-auto rounded-xl bg-warning/10 border border-warning/30 p-4">
                    <span className="inline-flex items-center gap-1.5 text-[14px] font-semibold uppercase tracking-[1.4px] text-warning">
                      Z pakietem
                    </span>
                    <p className="text-[15px] mt-2 leading-relaxed font-medium text-foreground">
                      {p.gain}
                    </p>
                  </div>
                </div>
              </article>


            ))}
          </div>
        </section>
      </div>


      <WaitlistDialog open={open} onOpenChange={setOpen} profile={profile.id} price={price} />
    </SellerShell>
  );
}
