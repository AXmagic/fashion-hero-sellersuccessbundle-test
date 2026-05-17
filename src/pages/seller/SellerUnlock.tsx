import { useEffect, useRef, useState } from "react";
import { Navigate, useParams, useSearchParams, Link } from "react-router-dom";
import { ChevronLeft, BarChart3, ShieldCheck, TrendingUp, Check, Lock, Sparkles } from "lucide-react";
import SellerShell from "@/components/seller/SellerShell";
import ConfirmDialog from "@/components/seller/ConfirmDialog";
import { getProfile } from "@/lib/sellerProfiles";
import { getSessionPrice } from "@/lib/wtpPrice";
import { logEvent } from "@/lib/wtpLog";

const FEATURE_LABELS: Record<string, string> = {
  price_monitor: "Price Monitor",
  trend_feed: "Trend Feed",
  returns_analyzer: "Returns Analyzer",
  margin_breakdown: "Marża produktowa",
  full_access: "Pełny dostęp",
  analytics_offer: "Pełna analityka",
};

const INCLUDED = [
  "Seller Economics Dashboard",
  "Price Monitor",
  "Trend Feed",
  "Returns Analyzer",
  "Marża produktowa",
  "Raporty i eksport danych",
  "Priorytetowe wsparcie",
];

const VALUE_PROPS = [
  { Icon: BarChart3, text: "Lepsze decyzje\noparte na danych" },
  { Icon: ShieldCheck, text: "Wyższa marża\ni mniej zwrotów" },
  { Icon: TrendingUp, text: "Szybszy wzrost\nTwojego sklepu" },
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
  const featureLabel = FEATURE_LABELS[featureKey] ?? featureKey;

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
                Sprzedawaj mądrzej.
                <br />
                <span className="text-warning">Zarabiaj więcej.</span>
              </h1>
              <p className="text-[14px] md:text-[15px] text-muted-foreground mt-5 leading-relaxed max-w-md">
                Odblokuj pełny dostęp do danych, które pokazują co naprawdę zostaje
                w Twojej kieszeni — po zwrotach, prowizjach i kosztach.
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

          {featureKey !== "full_access" && (
            <p className="text-[12px] text-muted-foreground mt-6 text-center">
              Wybrałeś: <span className="text-foreground font-medium">{featureLabel}</span> — to narzędzie jest częścią pełnego pakietu.
            </p>
          )}
        </div>
      </div>

      <ConfirmDialog open={open} onOpenChange={setOpen} profile={profile.id} price={price} />
    </SellerShell>
  );
}
