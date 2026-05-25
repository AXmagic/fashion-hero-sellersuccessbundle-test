import { useEffect, useRef, useState } from "react";
import { Navigate, useParams, useSearchParams, Link } from "react-router-dom";
import { ChevronLeft, BarChart3, ShieldCheck, TrendingUp, Check, Lock, Sparkles, Flame, ArrowUpRight, Minus, Bell, Calculator, AlertTriangle, Zap, RotateCw, PackageX, Camera, Ruler, MessageSquare, ArrowRight, Rabbit, Turtle, Wand2, X, FileText, ListChecks, Image as ImageIcon, Tag, PenLine } from "lucide-react";
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

              <p className="text-muted-foreground mt-8 leading-relaxed max-w-md text-sm">
                Cena obejmuje wszystkie 9 narzędzi, bez ukrytych opłat.
                <br />
                Masz pytania?{" "}
                <a
                  href="mailto:sellers@fashionhero.pl"
                  className="underline underline-offset-2 hover:text-foreground"
                >
                  Napisz do nas
                </a>{" "}
                — odpowiadamy w 24h.
              </p>
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
                <p className="text-[13px] text-muted-foreground mt-3 leading-relaxed text-center">
                  Pełny dostęp do wszystkich narzędzi analitycznych FashionHero. Pierwsze 14 dni bezpłatnie.
                </p>

                <p className="mt-4 text-[12.5px] leading-relaxed text-muted-foreground text-center">
                  Po zakończeniu okresu próbnego subskrypcja włącza się automatycznie. Rezygnacja możliwa w dowolnym momencie.
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

        {/* Opis narzędzi */}
        <section className="mt-16 md:mt-20">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="font-serif text-3xl md:text-4xl leading-tight">
              Co dokładnie dostajesz w pakiecie
            </h2>
            <p className="text-[14px] text-muted-foreground mt-3">
              Każde narzędzie rozwiązuje konkretny ból sprzedawcy — i pokazuje mierzalny efekt.
            </p>
          </div>

          <div className="flex flex-col gap-8">
            {/* Tool 1 — Sygnały trendów */}
            <article className="bg-card border border-border rounded-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-2 gap-0">
              <div className="p-8 md:p-10 flex flex-col gap-6 border-b lg:border-b-0 lg:border-r border-border">
                <div>
                  <span className="text-[11px] font-semibold uppercase tracking-[1.6px] text-warning">
                    Narzędzie 01
                  </span>
                  <h3 className="font-serif text-2xl md:text-3xl mt-2 leading-tight">
                    Sygnały trendów
                  </h3>
                </div>
                <div>
                  <span className="text-[14px] font-semibold uppercase tracking-[1.4px] text-muted-foreground">
                    Ból
                  </span>
                  <p className="text-[15px] mt-2 leading-relaxed">
                    Bartek tracił 7 godz./tydzień na ręczne śledzenie trendów na Instagramie, TikToku i u konkurencji.
                  </p>
                </div>
                <div>
                  <span className="text-[14px] font-semibold uppercase tracking-[1.4px] text-muted-foreground">
                    Co robi
                  </span>
                  <p className="text-[15px] mt-2 leading-relaxed">
                    Pokazuje, które produkty rosną na platformie, ile dni zostało do szczytu trendu i kiedy uzupełnić magazyn — na podstawie danych sprzedażowych i wyszukiwań FashionHero.
                  </p>
                </div>
                <div className="rounded-xl bg-warning/10 border border-warning/30 p-4">
                  <span className="text-[14px] font-semibold uppercase tracking-[1.4px] text-warning">
                    Impact
                  </span>
                  <p className="text-[15px] mt-2 leading-relaxed font-medium">
                    Oszczędność 7 godz./tydzień ręcznej pracy.
                  </p>
                </div>
              </div>

              {/* Visualization */}
              <div className="bg-muted/30 p-6 md:p-8 flex items-center">
                <div className="w-full bg-card border border-border rounded-xl shadow-sm overflow-hidden">
                  <div className="px-5 py-3 border-b border-border flex items-center justify-between">
                    <span className="text-[14px] font-semibold">Aktywne sygnały trendów</span>
                    <span className="text-[14px] text-muted-foreground">tydzień 47</span>
                  </div>
                  <ul className="divide-y divide-border">
                    {[
                      {
                        name: "Oversized blazer — beżowy",
                        tone: "hot" as const,
                        label: "HOT",
                        Icon: Flame,
                        peak: "szczyt za 6 dni",
                        stock: "Stan: 12 szt.",
                      },
                      {
                        name: "Mokasyny lakierowane",
                        tone: "up" as const,
                        label: "Rosnący",
                        Icon: ArrowUpRight,
                        peak: "szczyt za 18 dni",
                        stock: "Stan: 47 szt.",
                      },
                      {
                        name: "Trencz dwurzędowy",
                        tone: "flat" as const,
                        label: "Stabilny",
                        Icon: Minus,
                        peak: "bez zmian",
                        stock: "Stan: 31 szt.",
                      },
                    ].map((row) => (
                      <li key={row.name} className="px-5 py-3.5 flex items-center gap-4">
                        <span
                          className={`inline-flex items-center gap-1 px-2 py-1 rounded-md text-[14px] font-semibold ${
                            row.tone === "hot"
                              ? "bg-warning/15 text-warning"
                              : row.tone === "up"
                              ? "bg-foreground/10 text-foreground"
                              : "bg-muted text-muted-foreground"
                          }`}
                        >
                          <row.Icon className="w-3.5 h-3.5" />
                          {row.label}
                        </span>
                        <div className="flex-1 min-w-0">
                          <p className="text-[14px] font-medium truncate">{row.name}</p>
                          <p className="text-[14px] text-muted-foreground">{row.peak} · {row.stock}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                  <div className="px-5 py-4 bg-warning/10 border-t border-warning/30 flex items-center gap-3">
                    <span className="w-9 h-9 rounded-full bg-warning/20 flex items-center justify-center shrink-0">
                      <Bell className="w-4 h-4 text-warning" />
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="text-[14px] font-semibold leading-tight">
                        Uzupełnij stock: Oversized blazer
                      </p>
                      <p className="text-[14px] text-muted-foreground mt-0.5">
                        Prognoza: zabraknie za 4 dni — szczyt trendu już za 6.
                      </p>
                    </div>
                    <span className="text-[14px] font-semibold bg-warning text-warning-foreground px-3.5 py-2 rounded-full whitespace-nowrap">
                      Zamów +40 szt.
                    </span>
                  </div>
                </div>
              </div>
            </article>

            {/* Tool 2 — Benchmark cen */}
            <article className="bg-card border border-border rounded-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-2 gap-0">
              <div className="p-8 md:p-10 flex flex-col gap-6 border-b lg:border-b-0 lg:border-r border-border lg:order-2">
                <div>
                  <span className="text-[11px] font-semibold uppercase tracking-[1.6px] text-warning">
                    Narzędzie 02
                  </span>
                  <h3 className="font-serif text-2xl md:text-3xl mt-2 leading-tight">
                    Benchmark cen i kalkulator break-even
                  </h3>
                </div>
                <div>
                  <span className="text-[14px] font-semibold uppercase tracking-[1.4px] text-muted-foreground">
                    Ból
                  </span>
                  <p className="text-[15px] mt-2 leading-relaxed">
                    Dorota spędzała 5 godz./tydzień w Excelu śledząc ceny i nie widziała, co zmiana ceny robi z marżą po prowizji.
                  </p>
                </div>
                <div>
                  <span className="text-[14px] font-semibold uppercase tracking-[1.4px] text-muted-foreground">
                    Co robi
                  </span>
                  <p className="text-[15px] mt-2 leading-relaxed">
                    Automatycznie porównuje cenę sprzedawcy z medianą kategorii. Kalkulator pokazuje wpływ zmiany ceny na marżę netto (z uwzględnieniem prowizji platformy) i próg break-even wolumenowy.
                  </p>
                </div>
                <div className="rounded-xl bg-warning/10 border border-warning/30 p-4">
                  <span className="text-[14px] font-semibold uppercase tracking-[1.4px] text-warning">
                    Impact
                  </span>
                  <p className="text-[15px] mt-2 leading-relaxed font-medium">
                    Oszczędność 5 godz./tydzień + decyzje cenowe oparte na danych, nie intuicji.
                  </p>
                </div>
              </div>

              {/* Visualization */}
              <div className="bg-muted/30 p-6 md:p-8 flex items-center lg:order-1">
                <div className="w-full bg-card border border-border rounded-xl shadow-sm overflow-hidden">
                  <div className="px-5 py-3 border-b border-border flex items-center gap-2">
                    <Calculator className="w-4 h-4 text-warning" />
                    <span className="text-[14px] font-semibold">Kalkulator break-even</span>
                    <span className="ml-auto text-[14px] text-muted-foreground">Mokasyny lakierowane</span>
                  </div>

                  <div className="p-5 grid grid-cols-3 gap-3">
                    {[
                      { label: "Aktualna cena", value: "289 zł" },
                      { label: "Nowa cena", value: "259 zł", accent: true },
                      { label: "Prowizja", value: "18%" },
                    ].map((f) => (
                      <div
                        key={f.label}
                        className={`rounded-lg border px-3 py-2.5 ${
                          f.accent ? "border-warning/40 bg-warning/5" : "border-border bg-background"
                        }`}
                      >
                        <p className="text-[14px] text-muted-foreground">{f.label}</p>
                        <p className="text-[16px] font-semibold mt-0.5">{f.value}</p>
                      </div>
                    ))}
                  </div>

                  <div className="px-5 pb-4 grid grid-cols-2 gap-3">
                    <div className="rounded-lg bg-background border border-border px-4 py-3">
                      <p className="text-[14px] text-muted-foreground">Różnica netto / szt.</p>
                      <p className="text-[20px] font-serif text-destructive mt-1">−24,60 zł</p>
                    </div>
                    <div className="rounded-lg bg-background border border-border px-4 py-3">
                      <p className="text-[14px] text-muted-foreground">Wolumen do break-even</p>
                      <p className="text-[20px] font-serif mt-1">+38%</p>
                    </div>
                  </div>

                  <div className="px-5 py-3 bg-muted/40 border-y border-border flex items-start gap-2.5">
                    <AlertTriangle className="w-4 h-4 text-warning shrink-0 mt-0.5" />
                    <p className="text-[14px] leading-snug">
                      Twoja cena jest <span className="font-semibold">−7% poniżej mediany</span> kategorii (mediana: 312 zł). Rekomendacja: podnieś do <span className="font-semibold">305 zł</span> — marża +11 zł/szt. bez utraty pozycji.
                    </p>
                  </div>

                  <div className="px-5 py-4">
                    <span className="block w-full text-center bg-warning text-warning-foreground font-semibold text-[14px] py-3 rounded-full">
                      Aktualizuj cenę → 305 zł
                    </span>
                  </div>
                </div>
              </div>
            </article>

            {/* Tool 3 — Stockout Alert */}
            <article className="bg-card border border-border rounded-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-2 gap-0">
              <div className="p-8 md:p-10 flex flex-col gap-6 border-b lg:border-b-0 lg:border-r border-border">
                <div>
                  <span className="text-[11px] font-semibold uppercase tracking-[1.6px] text-warning">
                    Narzędzie 03
                  </span>
                  <h3 className="font-serif text-2xl md:text-3xl mt-2 leading-tight">
                    Stockout Alert
                  </h3>
                  <p className="text-[14px] text-muted-foreground mt-1">
                    powiązany z trendami i rotacją
                  </p>
                </div>
                <div>
                  <span className="text-[14px] font-semibold uppercase tracking-[1.4px] text-muted-foreground">
                    Ból
                  </span>
                  <p className="text-[15px] mt-2 leading-relaxed">
                    „Sprzedało się za szybko i hype siadł. Produkcja trwa." — magazyn pusty w momencie szczytu trendu.
                  </p>
                </div>
                <div>
                  <span className="text-[14px] font-semibold uppercase tracking-[1.4px] text-muted-foreground">
                    Co robi
                  </span>
                  <p className="text-[15px] mt-2 leading-relaxed">
                    Łączy sygnał z Trend Feed (trend w szczycie) z sygnałem z Rotacji (fast mover, niski stan) i generuje priorytetowy alert z CTA. Oba sygnały razem → alert krytyczny. Jeden sygnał → niższy priorytet bez CTA zamawiania.
                  </p>
                </div>
                <div className="rounded-xl bg-warning/10 border border-warning/30 p-4">
                  <span className="text-[14px] font-semibold uppercase tracking-[1.4px] text-warning">
                    Impact
                  </span>
                  <p className="text-[15px] mt-2 leading-relaxed font-medium">
                    Sprzedawca nie przegapi szczytu trendu przez brak towaru.
                  </p>
                </div>
              </div>

              {/* Visualization */}
              <div className="bg-muted/30 p-6 md:p-8 flex items-center">
                <div className="w-full bg-card border border-border rounded-xl shadow-sm overflow-hidden">
                  {/* Diagram */}
                  <div className="p-5 border-b border-border">
                    <div className="flex items-stretch gap-3">
                      <div className="flex-1 flex flex-col gap-2">
                        <div className="rounded-lg border border-border bg-background px-3 py-2.5">
                          <div className="flex items-center gap-2">
                            <TrendingUp className="w-3.5 h-3.5 text-warning" />
                            <span className="text-[14px] font-semibold">Trend Feed</span>
                          </div>
                          <p className="text-[14px] text-muted-foreground mt-1 leading-snug">
                            Sukienki midi: szczyt za 8 dni
                          </p>
                        </div>
                        <div className="rounded-lg border border-border bg-background px-3 py-2.5">
                          <div className="flex items-center gap-2">
                            <RotateCw className="w-3.5 h-3.5 text-warning" />
                            <span className="text-[14px] font-semibold">Rotacja</span>
                          </div>
                          <p className="text-[14px] text-muted-foreground mt-1 leading-snug">
                            Fast mover · stan: 2 szt.
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <ArrowRight className="w-5 h-5 text-muted-foreground" />
                      </div>
                      <div className="flex-1 flex items-center">
                        <div className="w-full rounded-lg border border-warning/40 bg-warning/10 px-3 py-3">
                          <div className="flex items-center gap-2">
                            <PackageX className="w-4 h-4 text-warning" />
                            <span className="text-[14px] font-semibold">Stockout Alert</span>
                          </div>
                          <p className="text-[14px] mt-1 leading-snug">
                            Krytyczny: 2 sygnały aktywne
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Cases */}
                  <div className="p-5 grid grid-cols-2 gap-2.5">
                    {[
                      { trend: true, rot: true, label: "Krytyczny", cta: true, tone: "warning" },
                      { trend: true, rot: false, label: "Średni", cta: false, tone: "muted" },
                      { trend: false, rot: true, label: "Niski", cta: false, tone: "muted" },
                      { trend: false, rot: false, label: "Brak alertu", cta: false, tone: "off" },
                    ].map((c, i) => (
                      <div
                        key={i}
                        className={`rounded-lg border px-3 py-2.5 ${
                          c.tone === "warning"
                            ? "border-warning/40 bg-warning/5"
                            : c.tone === "muted"
                            ? "border-border bg-background"
                            : "border-dashed border-border bg-muted/30"
                        }`}
                      >
                        <div className="flex items-center gap-1.5 text-[14px]">
                          <span className={c.trend ? "text-warning font-semibold" : "text-muted-foreground/60"}>Trend</span>
                          <span className="text-muted-foreground">+</span>
                          <span className={c.rot ? "text-warning font-semibold" : "text-muted-foreground/60"}>Rotacja</span>
                        </div>
                        <p className="text-[14px] font-semibold mt-1">{c.label}</p>
                        <p className="text-[14px] text-muted-foreground">
                          {c.cta ? "CTA zamów" : "bez CTA"}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* CTA */}
                  <div className="px-5 py-4 bg-warning/10 border-t border-warning/30 flex items-center gap-3">
                    <span className="w-9 h-9 rounded-full bg-warning/20 flex items-center justify-center shrink-0">
                      <Zap className="w-4 h-4 text-warning" />
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="text-[14px] font-semibold leading-tight">
                        Sukienki midi: zostały 2 szt.
                      </p>
                      <p className="text-[14px] text-muted-foreground mt-0.5">
                        Trend w szczycie za 8 dni.
                      </p>
                    </div>
                    <span className="text-[14px] font-semibold bg-warning text-warning-foreground px-3.5 py-2 rounded-full whitespace-nowrap">
                      Zamów natychmiast
                    </span>
                  </div>
                </div>
              </div>
            </article>

            {/* Tool 4 — Prawdziwy koszt zwrotów */}
            <article className="bg-card border border-border rounded-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-2 gap-0">
              <div className="p-8 md:p-10 flex flex-col gap-6 border-b lg:border-b-0 lg:border-r border-border lg:order-2">
                <div>
                  <span className="text-[11px] font-semibold uppercase tracking-[1.6px] text-warning">
                    Narzędzie 04
                  </span>
                  <h3 className="font-serif text-2xl md:text-3xl mt-2 leading-tight">
                    Prawdziwy koszt zwrotów w PLN
                  </h3>
                </div>
                <div>
                  <span className="text-[14px] font-semibold uppercase tracking-[1.4px] text-muted-foreground">
                    Ból
                  </span>
                  <p className="text-[15px] mt-2 leading-relaxed">
                    Bartek nie czuł kosztu zwrotów, bo platforma pokrywa logistykę. Widział procent — nie widział złotówek.
                  </p>
                </div>
                <div>
                  <span className="text-[14px] font-semibold uppercase tracking-[1.4px] text-muted-foreground">
                    Co robi
                  </span>
                  <p className="text-[15px] mt-2 leading-relaxed">
                    Pokazuje return rate jako kwotę PLN zablokowaną miesięcznie, porównuje z medianą kategorii i rozkłada zwroty na 3 główne przyczyny — z CTA do naprawy każdej z nich.
                  </p>
                </div>
                <div className="rounded-xl bg-warning/10 border border-warning/30 p-4">
                  <span className="text-[14px] font-semibold uppercase tracking-[1.4px] text-warning">
                    Impact
                  </span>
                  <p className="text-[15px] mt-2 leading-relaxed font-medium">
                    Widoczność 8 700 zł/mies. możliwych do odzyskania przy zejściu do mediany kategorii.
                  </p>
                </div>
              </div>

              {/* Visualization */}
              <div className="bg-muted/30 p-6 md:p-8 flex items-center lg:order-1">
                <div className="w-full bg-card border border-border rounded-xl shadow-sm overflow-hidden">
                  {/* Benchmark */}
                  <div className="p-5 border-b border-border grid grid-cols-2 gap-3">
                    <div className="rounded-lg border border-warning/40 bg-warning/5 px-4 py-3">
                      <p className="text-[14px] text-muted-foreground">Twój return rate</p>
                      <p className="font-serif text-[24px] text-warning mt-1 leading-none">28%</p>
                      <p className="text-[14px] font-semibold mt-2">19 900 zł / mies.</p>
                    </div>
                    <div className="rounded-lg border border-border bg-background px-4 py-3">
                      <p className="text-[14px] text-muted-foreground">Mediana kategorii</p>
                      <p className="font-serif text-[24px] mt-1 leading-none">16%</p>
                      <p className="text-[14px] font-semibold mt-2">11 200 zł / mies.</p>
                    </div>
                  </div>

                  <div className="px-5 py-3 bg-muted/40 border-b border-border">
                    <p className="text-[14px] leading-snug">
                      Do odzyskania przy zejściu do mediany:{" "}
                      <span className="font-semibold text-warning">8 700 zł / mies.</span>
                    </p>
                  </div>

                  {/* 3 reasons */}
                  <div className="p-5 flex flex-col gap-2.5">
                    {[
                      {
                        Icon: Camera,
                        pct: "52%",
                        title: "Zdjęcie vs. rzeczywistość",
                        cta: "Dodaj zdjęcia klientek (UGC)",
                      },
                      {
                        Icon: Ruler,
                        pct: "31%",
                        title: "Niezgodność rozmiaru",
                        cta: "Uzupełnij opis AI",
                      },
                      {
                        Icon: MessageSquare,
                        pct: "17%",
                        title: "Pytania bez odpowiedzi",
                        cta: "Wygeneruj pełny opis",
                      },
                    ].map((r) => (
                      <div
                        key={r.title}
                        className="rounded-lg border border-border bg-background px-3.5 py-3 flex items-center gap-3"
                      >
                        <span className="w-9 h-9 rounded-full bg-warning/10 flex items-center justify-center shrink-0">
                          <r.Icon className="w-4 h-4 text-warning" />
                        </span>
                        <div className="flex-1 min-w-0">
                          <p className="text-[14px] font-semibold leading-tight">
                            {r.title}{" "}
                            <span className="text-muted-foreground font-normal">· {r.pct} zwrotów</span>
                          </p>
                        </div>
                        <span className="text-[14px] font-semibold bg-warning text-warning-foreground px-3 py-1.5 rounded-full whitespace-nowrap">
                          {r.cta}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </article>

            {/* Tool 5 — Rotacja produktów */}
            <article className="bg-card border border-border rounded-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-2 gap-0">
              <div className="p-8 md:p-10 flex flex-col gap-6 border-b lg:border-b-0 lg:border-r border-border">
                <div>
                  <span className="text-[11px] font-semibold uppercase tracking-[1.6px] text-warning">
                    Narzędzie 05
                  </span>
                  <h3 className="font-serif text-2xl md:text-3xl mt-2 leading-tight">
                    Rotacja produktów fast / mid / slow
                  </h3>
                </div>
                <div>
                  <span className="text-[14px] font-semibold uppercase tracking-[1.4px] text-muted-foreground">
                    Ból
                  </span>
                  <p className="text-[15px] mt-2 leading-relaxed">
                    Szeroki asortyment bez narzędzia do priorytetyzacji — nie wiadomo co przyspieszyć, a co wycofać.
                  </p>
                </div>
                <div>
                  <span className="text-[14px] font-semibold uppercase tracking-[1.4px] text-muted-foreground">
                    Co robi
                  </span>
                  <p className="text-[15px] mt-2 leading-relaxed">
                    Automatycznie klasyfikuje każdy produkt jako fast / mid / slow mover na podstawie tempa sprzedaży. Do każdego statusu przypisana kontekstowa akcja.
                  </p>
                </div>
                <div className="rounded-xl bg-warning/10 border border-warning/30 p-4">
                  <span className="text-[14px] font-semibold uppercase tracking-[1.4px] text-warning">
                    Impact
                  </span>
                  <p className="text-[15px] mt-2 leading-relaxed font-medium">
                    Jeden rzut oka zastępuje ręczny przegląd całego asortymentu.
                  </p>
                </div>
              </div>

              {/* Visualization */}
              <div className="bg-muted/30 p-6 md:p-8 flex items-center">
                <div className="w-full bg-card border border-border rounded-xl shadow-sm overflow-hidden">
                  <div className="px-5 py-3 border-b border-border flex items-center justify-between">
                    <span className="text-[14px] font-semibold">Rotacja produktów</span>
                    <span className="text-[14px] text-muted-foreground">ostatnie 30 dni</span>
                  </div>
                  <ul className="divide-y divide-border">
                    {[
                      {
                        name: "Bluza oversize — czarna",
                        status: "FAST",
                        Icon: Rabbit,
                        days: "rotacja: 4 dni",
                        cta: "Sprawdź stock",
                        tone: "warning" as const,
                      },
                      {
                        name: "T-shirt logo — biały",
                        status: "MID",
                        Icon: BarChart3,
                        days: "rotacja: 14 dni",
                        cta: "Monitoruj cenę",
                        tone: "neutral" as const,
                      },
                      {
                        name: "Spodnie cargo — khaki",
                        status: "SLOW",
                        Icon: Turtle,
                        days: "rotacja: 62 dni",
                        cta: "Oblicz nową cenę",
                        tone: "muted" as const,
                      },
                    ].map((row) => (
                      <li key={row.name} className="px-5 py-3.5 flex items-center gap-3">
                        <span
                          className={`inline-flex items-center gap-1 px-2 py-1 rounded-md text-[14px] font-semibold ${
                            row.tone === "warning"
                              ? "bg-warning/15 text-warning"
                              : row.tone === "neutral"
                              ? "bg-foreground/10 text-foreground"
                              : "bg-muted text-muted-foreground"
                          }`}
                        >
                          <row.Icon className="w-3.5 h-3.5" />
                          {row.status}
                        </span>
                        <div className="flex-1 min-w-0">
                          <p className="text-[14px] font-medium truncate">{row.name}</p>
                          <p className="text-[14px] text-muted-foreground">{row.days}</p>
                        </div>
                        <span className="text-[14px] font-semibold bg-warning text-warning-foreground px-3 py-1.5 rounded-full whitespace-nowrap">
                          {row.cta}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </article>

            {/* Tool 6 — Score listingu */}
            <article className="bg-card border border-border rounded-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-2 gap-0">
              <div className="p-8 md:p-10 flex flex-col gap-6 border-b lg:border-b-0 lg:border-r border-border lg:order-2">
                <div>
                  <span className="text-[11px] font-semibold uppercase tracking-[1.6px] text-warning">
                    Narzędzie 06
                  </span>
                  <h3 className="font-serif text-2xl md:text-3xl mt-2 leading-tight">
                    Score listingu
                  </h3>
                </div>
                <div>
                  <span className="text-[14px] font-semibold uppercase tracking-[1.4px] text-muted-foreground">
                    Ból
                  </span>
                  <p className="text-[15px] mt-2 leading-relaxed">
                    „Nic nie zrobiłem, bo nie wiedziałem co w ogóle mogę zrobić." Kamil był na pozycji #247 w kategorii bez żadnej wskazówki dlaczego.
                  </p>
                </div>
                <div>
                  <span className="text-[14px] font-semibold uppercase tracking-[1.4px] text-muted-foreground">
                    Co robi
                  </span>
                  <p className="text-[15px] mt-2 leading-relaxed">
                    Dla każdego produktu oblicza score 0–100 w trzech wymiarach: opis, zdjęcia, cena. Wskazuje dokładnie co naprawić.
                  </p>
                </div>
                <div className="rounded-xl bg-warning/10 border border-warning/30 p-4">
                  <span className="text-[14px] font-semibold uppercase tracking-[1.4px] text-warning">
                    Impact
                  </span>
                  <p className="text-[15px] mt-2 leading-relaxed font-medium">
                    Konkretna lista do zrobienia zamiast zgadywania.
                  </p>
                </div>
              </div>

              {/* Visualization */}
              <div className="bg-muted/30 p-6 md:p-8 flex items-center lg:order-1">
                <div className="w-full bg-card border border-border rounded-xl shadow-sm overflow-hidden">
                  <div className="px-5 py-3 border-b border-border flex items-center justify-between">
                    <span className="text-[14px] font-semibold">Score listingu</span>
                    <span className="text-[14px] text-muted-foreground">Bluza streetwear #SW-104</span>
                  </div>

                  <div className="p-5 flex flex-col gap-4">
                    {[
                      { label: "Opis", score: 30, note: "Brak rozmiarówki i materiału." },
                      { label: "Zdjęcia", score: 20, note: "1 zdjęcie, brak UGC i detali." },
                      { label: "Cena", score: 70, note: "Blisko mediany kategorii." },
                    ].map((s) => {
                      const low = s.score < 50;
                      return (
                        <div key={s.label}>
                          <div className="flex items-baseline justify-between">
                            <span className="text-[14px] font-semibold">{s.label}</span>
                            <span className={`text-[14px] font-semibold ${low ? "text-warning" : "text-foreground"}`}>
                              {s.score}<span className="text-muted-foreground font-normal">/100</span>
                            </span>
                          </div>
                          <div className="mt-1.5 h-2 rounded-full bg-muted overflow-hidden">
                            <div
                              className={`h-full rounded-full ${low ? "bg-warning" : "bg-foreground/70"}`}
                              style={{ width: `${s.score}%` }}
                            />
                          </div>
                          <p className="text-[14px] text-muted-foreground mt-1.5 leading-snug">{s.note}</p>
                        </div>
                      );
                    })}
                  </div>

                  <div className="px-5 pb-5">
                    <span className="flex items-center justify-center gap-2 w-full bg-warning text-warning-foreground font-semibold text-[14px] py-3 rounded-full">
                      <Wand2 className="w-4 h-4" />
                      Popraw opis, zdjęcia i cenę
                    </span>
                  </div>
                </div>
              </div>
            </article>

            {/* Tool 7 — UGC */}
            <article className="bg-card border border-border rounded-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-2 gap-0">
              <div className="p-8 md:p-10 flex flex-col gap-6 border-b lg:border-b-0 lg:border-r border-border">
                <div>
                  <span className="text-[11px] font-semibold uppercase tracking-[1.6px] text-warning">
                    Narzędzie 07
                  </span>
                  <h3 className="font-serif text-2xl md:text-3xl mt-2 leading-tight">
                    Zdjęcia klientek (UGC)
                  </h3>
                </div>
                <div>
                  <span className="text-[14px] font-semibold uppercase tracking-[1.4px] text-muted-foreground">
                    Ból
                  </span>
                  <p className="text-[15px] mt-2 leading-relaxed">
                    52% zwrotów Bartka wynikało z rozbieżności między zdjęciem studyjnym a wyglądem produktu w rzeczywistości.
                  </p>
                </div>
                <div>
                  <span className="text-[14px] font-semibold uppercase tracking-[1.4px] text-muted-foreground">
                    Co robi
                  </span>
                  <p className="text-[15px] mt-2 leading-relaxed">
                    Automatyczna prośba o zdjęcie po zakupie (e-mail po 10 dniach od dostawy) z voucherem 5% dla kupującej. Sprzedawca zatwierdza każde zdjęcie przed publikacją.
                  </p>
                </div>
                <div className="rounded-xl bg-warning/10 border border-warning/30 p-4">
                  <span className="text-[14px] font-semibold uppercase tracking-[1.4px] text-warning">
                    Impact
                  </span>
                  <p className="text-[15px] mt-2 leading-relaxed font-medium">
                    Return rate −13 pp przy aktywnym UGC (Bartek), −3 pp (Dorota).
                  </p>
                </div>
              </div>

              <div className="bg-muted/30 p-6 md:p-8 flex items-center">
                <div className="w-full bg-card border border-border rounded-xl shadow-sm overflow-hidden">
                  <div className="p-5 border-b border-border">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[14px] font-semibold">Automatyzacja UGC</span>
                      <span className="inline-flex items-center gap-2 text-[14px]">
                        <span className="relative inline-block w-9 h-5 rounded-full bg-warning">
                          <span className="absolute top-0.5 right-0.5 w-4 h-4 rounded-full bg-card" />
                        </span>
                        <span className="text-warning font-semibold">ON</span>
                      </span>
                    </div>
                    <div className="grid grid-cols-3 gap-2.5">
                      {[
                        { label: "Wysyłka po", value: "10 dniach" },
                        { label: "Voucher", value: "5%" },
                        { label: "Zatwierdzenie", value: "Ręczne" },
                      ].map((f) => (
                        <div key={f.label} className="rounded-lg border border-border bg-background px-3 py-2">
                          <p className="text-[14px] text-muted-foreground">{f.label}</p>
                          <p className="text-[14px] font-semibold mt-0.5">{f.value}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="p-5">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[14px] font-semibold">Kolejka zatwierdzeń</span>
                      <span className="text-[14px] text-muted-foreground">2 oczekujące</span>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        { name: "Sukienka midi · @ania.k", color: "from-warning/40 to-warning/10" },
                        { name: "Bluza oversize · @magda_w", color: "from-foreground/30 to-foreground/5" },
                      ].map((p) => (
                        <div key={p.name} className="rounded-lg border border-border bg-background overflow-hidden">
                          <div className={`aspect-[4/5] bg-gradient-to-br ${p.color} flex items-center justify-center`}>
                            <Camera className="w-8 h-8 text-card opacity-70" />
                          </div>
                          <div className="px-3 py-2.5">
                            <p className="text-[14px] font-medium truncate">{p.name}</p>
                            <div className="flex gap-2 mt-2">
                              <span className="flex-1 inline-flex items-center justify-center gap-1 text-[14px] font-semibold bg-warning text-warning-foreground px-2 py-1.5 rounded-full">
                                <Check className="w-3.5 h-3.5" /> Zatwierdź
                              </span>
                              <span className="flex-1 inline-flex items-center justify-center gap-1 text-[14px] font-semibold bg-background border border-border text-muted-foreground px-2 py-1.5 rounded-full">
                                <X className="w-3.5 h-3.5" /> Odrzuć
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </article>

            {/* Tool 8 — AI opisy */}
            <article className="bg-card border border-border rounded-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-2 gap-0">
              <div className="p-8 md:p-10 flex flex-col gap-6 border-b lg:border-b-0 lg:border-r border-border lg:order-2">
                <div>
                  <span className="text-[11px] font-semibold uppercase tracking-[1.6px] text-warning">
                    Narzędzie 08
                  </span>
                  <h3 className="font-serif text-2xl md:text-3xl mt-2 leading-tight">
                    AI generator opisów produktów
                  </h3>
                </div>
                <div>
                  <span className="text-[14px] font-semibold uppercase tracking-[1.4px] text-muted-foreground">
                    Ból
                  </span>
                  <p className="text-[15px] mt-2 leading-relaxed">
                    Kilka godzin tygodniowo na odpowiadanie na te same pytania presale w czacie — bo opisy nie zawierały podstawowych informacji.
                  </p>
                </div>
                <div>
                  <span className="text-[14px] font-semibold uppercase tracking-[1.4px] text-muted-foreground">
                    Co robi
                  </span>
                  <p className="text-[15px] mt-2 leading-relaxed">
                    Generuje opis według szablonu per kategoria (odzież / obuwie / streetwear), pokrywając 8 typowych pytań presale: materiał, rozciągliwość, rozmiarówka, długość na wzrost, prześwit, pielęgnacja, komfort, pasowanie.
                  </p>
                </div>
                <div className="rounded-xl bg-warning/10 border border-warning/30 p-4">
                  <span className="text-[14px] font-semibold uppercase tracking-[1.4px] text-warning">
                    Impact
                  </span>
                  <p className="text-[15px] mt-2 leading-relaxed font-medium">
                    Redukcja pytań presale w czacie. Czas generowania ~30 sekund.
                  </p>
                </div>
              </div>

              <div className="bg-muted/30 p-6 md:p-8 flex items-center lg:order-1">
                <div className="w-full bg-card border border-border rounded-xl shadow-sm overflow-hidden">
                  <div className="px-5 py-3 border-b border-border flex items-center gap-2">
                    <FileText className="w-4 h-4 text-warning" />
                    <span className="text-[14px] font-semibold">Opis produktu</span>
                    <span className="ml-auto text-[14px] text-muted-foreground">Sukienka midi · odzież</span>
                  </div>

                  <div className="p-5 grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {[
                      { label: "Materiał", value: "Wiskoza 95% · elastan 5%" },
                      { label: "Długość", value: "112 cm — do połowy łydki (na 168 cm)" },
                      { label: "Prześwit", value: "Brak — podszewka pełna" },
                      { label: "Pielęgnacja", value: "Pranie ręczne 30°C, bez wybielacza" },
                    ].map((f) => (
                      <div key={f.label} className="rounded-lg border border-border bg-background px-3.5 py-2.5">
                        <p className="text-[14px] text-muted-foreground">{f.label}</p>
                        <p className="text-[14px] font-medium mt-0.5 leading-snug">{f.value}</p>
                      </div>
                    ))}
                  </div>

                  <div className="px-5 pb-5">
                    <span className="flex items-center justify-center gap-2 w-full bg-warning text-warning-foreground font-semibold text-[14px] py-3 rounded-full">
                      <Sparkles className="w-4 h-4" />
                      Wygeneruj opis dla swojego produktu
                    </span>
                  </div>
                </div>
              </div>
            </article>

            {/* Tool 9 — Checklist */}
            <article className="bg-card border border-border rounded-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-2 gap-0">
              <div className="p-8 md:p-10 flex flex-col gap-6 border-b lg:border-b-0 lg:border-r border-border">
                <div>
                  <span className="text-[11px] font-semibold uppercase tracking-[1.6px] text-warning">
                    Narzędzie 09
                  </span>
                  <h3 className="font-serif text-2xl md:text-3xl mt-2 leading-tight">
                    Checklist „Co teraz"
                  </h3>
                </div>
                <div>
                  <span className="text-[14px] font-semibold uppercase tracking-[1.4px] text-muted-foreground">
                    Ból
                  </span>
                  <p className="text-[15px] mt-2 leading-relaxed">
                    Każdy sprzedawca miał dużo danych, ale nie wiedział od czego zacząć — brak priorytetyzacji prowadził do paraliżu decyzyjnego.
                  </p>
                </div>
                <div>
                  <span className="text-[14px] font-semibold uppercase tracking-[1.4px] text-muted-foreground">
                    Co robi
                  </span>
                  <p className="text-[15px] mt-2 leading-relaxed">
                    Generuje 3–4 konkretne akcje posortowane według wpływu na GMV, na podstawie aktualnych danych panelu. Każda akcja prowadzi bezpośrednio do narzędzia, które naprawia problem.
                  </p>
                </div>
                <div className="rounded-xl bg-warning/10 border border-warning/30 p-4">
                  <span className="text-[14px] font-semibold uppercase tracking-[1.4px] text-warning">
                    Impact
                  </span>
                  <p className="text-[15px] mt-2 leading-relaxed font-medium">
                    Zero zastanawiania się co robić — otwierasz panel i od razu działasz.
                  </p>
                </div>
              </div>

              <div className="bg-muted/30 p-6 md:p-8 flex items-center">
                <div className="w-full bg-card border border-border rounded-xl shadow-sm overflow-hidden">
                  <div className="px-5 py-3 border-b border-border flex items-center gap-2">
                    <ListChecks className="w-4 h-4 text-warning" />
                    <span className="text-[14px] font-semibold">Dzisiaj do zrobienia</span>
                    <span className="ml-auto text-[14px] text-muted-foreground">4 akcje</span>
                  </div>
                  <ul className="divide-y divide-border">
                    {[
                      {
                        Icon: PackageX,
                        prio: "Pilne",
                        prioTone: "warning" as const,
                        text: "Zamów stock: sukienka midi 2 szt. · trend w szczycie za 8 dni",
                        cta: "Zamów stock",
                      },
                      {
                        Icon: ImageIcon,
                        prio: "Ostrzeżenie",
                        prioTone: "neutral" as const,
                        text: "Zatwierdź 2 zdjęcia klientek w kolejce UGC",
                        cta: "Zatwierdź",
                      },
                      {
                        Icon: Tag,
                        prio: "Ostrzeżenie",
                        prioTone: "neutral" as const,
                        text: "Obniż cenę szpilki beżowej: 31 dni rotacji · +12% vs mediana",
                        cta: "Obniż cenę",
                      },
                      {
                        Icon: PenLine,
                        prio: "Info",
                        prioTone: "muted" as const,
                        text: "Uzupełnij opis bluzy: score 30/100 · brakuje 5 kategorii",
                        cta: "Uzupełnij opis",
                      },
                    ].map((row) => (
                      <li key={row.text} className="px-5 py-3.5 flex items-center gap-3">
                        <span className="w-9 h-9 rounded-full bg-muted flex items-center justify-center shrink-0">
                          <row.Icon className="w-4 h-4 text-foreground/70" />
                        </span>
                        <div className="flex-1 min-w-0">
                          <span
                            className={`inline-block text-[14px] font-semibold uppercase tracking-[1.2px] mb-1 ${
                              row.prioTone === "warning"
                                ? "text-warning"
                                : row.prioTone === "neutral"
                                ? "text-foreground/80"
                                : "text-muted-foreground"
                            }`}
                          >
                            {row.prio}
                          </span>
                          <p className="text-[14px] leading-snug">{row.text}</p>
                        </div>
                        <span className="inline-flex items-center gap-1 text-[14px] font-semibold bg-warning text-warning-foreground px-3.5 py-2 rounded-full whitespace-nowrap">
                          {row.cta}
                          <ArrowRight className="w-3.5 h-3.5" />
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </article>
          </div>
        </section>
      </div>


      <WaitlistDialog open={open} onOpenChange={setOpen} profile={profile.id} price={price} />
    </SellerShell>
  );
}
