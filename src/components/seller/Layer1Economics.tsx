import { useEffect, useRef } from "react";
import { AlertTriangle, ChevronRight, Calendar } from "lucide-react";
import type { SellerProfile } from "@/lib/sellerProfiles";
import { logEvent } from "@/lib/wtpLog";
import type { PricePoint } from "@/lib/wtpPrice";
import MetricCard from "./MetricCard";
import MarginSparkline from "./MarginSparkline";

interface Props {
  profile: SellerProfile;
  price: PricePoint;
  onUnlock: (feature: string) => void;
}

const fmtPLN = (n: number) => `${n.toLocaleString("pl-PL")} zł`;

// Generate plausible sparkline series derived from a base value
function series(base: number, drift: number, points = 14): number[] {
  const out: number[] = [];
  let v = base * (1 - drift);
  for (let i = 0; i < points; i++) {
    const noise = (Math.sin(i * 1.7 + base) + Math.cos(i * 0.9)) * base * 0.04;
    const trend = (i / (points - 1)) * (base * drift * 2);
    out.push(Math.max(0, v + trend + noise));
  }
  return out;
}

export default function Layer1Economics({ profile, price, onUnlock }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const seen = useRef(false);

  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !seen.current) {
          seen.current = true;
          logEvent({ type: "w1_view", profile: profile.id, price });
        }
      },
      { threshold: 0.3 },
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, [profile.id, price]);

  const handleAlert = () => {
    logEvent({ type: "preview_click", profile: profile.id, price, feature: "margin_alert" });
    onUnlock("analytics_offer");
  };

  const revenueSpark = series(profile.netRevenue, 0.08);
  const returnsSpark = series(profile.returnsCost, 0.05);
  const positionSpark = series(50, -0.06).map((v) => v + 10);

  return (
    <section ref={ref} className="space-y-5">
      {/* Alert banner — soft cream/warning, full clickable */}
      <button
        type="button"
        onClick={handleAlert}
        className="w-full text-left rounded-2xl bg-warning/10 border border-warning/25 px-4 py-3.5 flex flex-col md:flex-row gap-3 items-start md:items-center hover:bg-warning/15 transition-colors"
      >
        <span className="shrink-0 w-8 h-8 rounded-full bg-warning/20 flex items-center justify-center">
          <AlertTriangle className="w-4 h-4 text-warning" />
        </span>
        <div className="flex-1 min-w-0">
          <div className="text-[14px] font-semibold text-foreground">{profile.hookHeadline}</div>
          <div className="text-[12.5px] text-muted-foreground mt-0.5 leading-relaxed">{profile.hookSub}</div>
        </div>
        <span className="shrink-0 inline-flex items-center gap-1 bg-warning text-warning-foreground text-[12.5px] font-semibold px-4 py-1.5 rounded-full">
          Odblokuj raport
          <ChevronRight className="w-3.5 h-3.5" />
        </span>
      </button>

        <span className="shrink-0 inline-flex items-center gap-1 bg-warning text-warning-foreground text-[12.5px] font-semibold px-4 py-1.5 rounded-full">
          Odblokuj raport
          <ChevronRight className="w-3.5 h-3.5" />
        </span>
      </button>

      <p className="text-[11.5px] text-muted-foreground -mt-2 px-1">
        Trend wyliczony z {profile.txCount} transakcji w ostatnich {profile.dataWindowDays} dniach ({profile.dataWindowLabel}).
      </p>

      {/* Period selector row */}
      <div className="flex justify-end">
        <div className="inline-flex items-center gap-2 text-[12px] bg-card border border-border px-3 py-1.5 rounded-md">
          <Calendar className="w-3.5 h-3.5 text-muted-foreground" />
          <span className="text-foreground">Ostatnie {profile.dataWindowDays} dni</span>
          <ChevronRight className="w-3.5 h-3.5 rotate-90 text-muted-foreground" />
        </div>
      </div>

      {/* Metric grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
        <MetricCard
          label="Przychód netto"
          value={fmtPLN(profile.netRevenue)}
          hint="po prowizjach i zwrotach"
          delta={18}
          deltaSuffix="%"
          tone="success"
          spark={revenueSpark}
        />
        <MetricCard
          label="Marża netto"
          value={`${profile.marginPct}%`}
          hint={`${profile.marginDeltaPp >= 0 ? "+" : ""}${profile.marginDeltaPp}pp vs. poprzednie 30 dni`}
          tone={profile.marginDeltaPp < 0 ? "destructive" : "success"}
          spark={profile.marginWeekly}
        />
        <MetricCard
          label="Koszt zwrotów"
          value={fmtPLN(profile.returnsCost)}
          hint={`${profile.returnRatePct}% zwrotów od sprzedaży brutto`}
          tone={profile.returnRatePct >= 30 ? "destructive" : "warning"}
          spark={returnsSpark}
        />
        <MetricCard
          label="Pozycja w kategorii"
          value={profile.category}
          hint={profile.positionLabel}
          tone={profile.positionTone === "muted" ? "warning" : profile.positionTone}
          spark={positionSpark}
        />
      </div>

      {/* Weekly margin chart */}
      <div className="bg-card border border-border rounded-md p-4 md:p-5">
        <div className="flex items-baseline justify-between mb-2">
          <div className="flex items-baseline gap-2">
            <h3 className="text-[15px] font-semibold text-foreground">Marża tygodniowa</h3>
            <span className="text-[12px] text-muted-foreground">8 tygodni</span>
          </div>
          <div className="text-[12px] text-muted-foreground">
            Ostatnia: <span className="text-foreground font-medium">{profile.marginWeekly.at(-1)}%</span>
          </div>
        </div>
        <MarginSparkline data={profile.marginWeekly} />
      </div>
    </section>
  );
}
