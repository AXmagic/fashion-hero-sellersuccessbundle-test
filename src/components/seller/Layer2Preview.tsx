import { useEffect, useRef } from "react";
import { Lock, LineChart, TrendingUp, PackageX } from "lucide-react";
import type { SellerProfile } from "@/lib/sellerProfiles";
import type { PricePoint } from "@/lib/wtpPrice";
import { logEvent } from "@/lib/wtpLog";

interface Props {
  profile: SellerProfile;
  price: PricePoint;
  onUnlock: (feature: string) => void;
}

interface Feature {
  key: string;
  title: string;
  teaser: string;
  impact: string;
  Icon: React.ComponentType<{ className?: string }>;
  preview: React.ReactNode;
}

const FAKE_ROWS = [
  ["Sweter oversize beż", "—12%", "189 zł"],
  ["Bluza dresowa krem", "—8%", "245 zł"],
  ["Kardigan wełniany", "—15%", "320 zł"],
  ["Top prążkowany", "—5%", "99 zł"],
];

function FakeChart() {
  return (
    <svg viewBox="0 0 100 60" className="w-full h-full">
      <polyline
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        className="text-foreground/60"
        points="0,45 15,40 30,42 45,30 60,28 75,15 90,10 100,8"
      />
      <polyline
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        className="text-muted-foreground/50"
        strokeDasharray="2 2"
        points="0,50 15,48 30,46 45,44 60,42 75,40 90,38 100,36"
      />
    </svg>
  );
}

export default function Layer2Preview({ profile, price, onUnlock }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const seen = useRef(false);

  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !seen.current) {
          seen.current = true;
          logEvent({ type: "w2_view", profile: profile.id, price });
        }
      },
      { threshold: 0.3 },
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, [profile.id, price]);

  const handleClick = (feature: string) => {
    logEvent({ type: "preview_click", profile: profile.id, price, feature });
    onUnlock(feature);
  };

  const features: Feature[] = [
    {
      key: "price_monitor",
      title: "Price Monitor",
      teaser: "Poświęcasz 20 godzin miesięcznie na śledzenie cen w Excelu? Price Monitor zrobi to za Ciebie.",
      impact: "Sprzedawcy korzystający z Price Monitor odzyskują średnio 3–5pp marży w 60 dni dzięki szybszym reakcjom na zmiany cen konkurencji.",
      Icon: LineChart,
      preview: (
        <table className="w-full text-[11px]">
          <tbody>
            {FAKE_ROWS.map((r, i) => (
              <tr key={i} className="border-b border-border/50">
                <td className="py-1.5">{r[0]}</td>
                <td className="py-1.5 text-destructive">{r[1]}</td>
                <td className="py-1.5 text-right">{r[2]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ),
    },
    {
      key: "trend_feed",
      title: "Trend Feed",
      teaser: "Sprawdź, które produkty w Twojej kategorii zyskują teraz na popularności — zanim zdecydujesz co promować albo co zamawiać.",
      impact: "Sprzedawcy używający Trend Feed trafiają z asortymentem 2× częściej i ograniczają niesprzedaną resztę kolekcji o ok. 20%.",
      Icon: TrendingUp,
      preview: (
        <div className="h-full w-full">
          <FakeChart />
        </div>
      ),
    },
    {
      key: "returns_analyzer",
      title: "Returns Analyzer",
      teaser: "Zarabiasz na produktach i oddajesz prawie to samo w zwrotach? Sprawdź Top 3 powody zwrotów w Twojej kategorii — i jak je ograniczyć.",
      impact: "Sklepy, które wdrożyły rekomendacje Returns Analyzer, obniżają koszt zwrotów średnio o 25–35% w pierwszym kwartale.",
      Icon: PackageX,
      preview: (
        <ul className="text-[11px] space-y-1.5">
          <li className="flex justify-between border-b border-border/50 pb-1">
            <span>Niewłaściwy rozmiar</span>
            <span className="text-muted-foreground">42%</span>
          </li>
          <li className="flex justify-between border-b border-border/50 pb-1">
            <span>Zdjęcie ≠ kolor</span>
            <span className="text-muted-foreground">28%</span>
          </li>
          <li className="flex justify-between">
            <span>Jakość materiału</span>
            <span className="text-muted-foreground">17%</span>
          </li>
        </ul>
      ),
    },
  ];

  return (
    <section ref={ref} className="space-y-5">
      <div className="bg-cream rounded-xl px-6 py-6 text-center space-y-2">
        <div className="flex items-center justify-center gap-3 flex-wrap">
          <h2 className="text-2xl md:text-3xl font-serif">Odkryj więcej insights</h2>
          <span role="status" aria-label="Premium" className="inline-flex items-center text-[11px] font-semibold uppercase tracking-[1.4px] bg-transparent border border-orange-500 text-orange-500 px-2.5 py-1 rounded-[5px]">
            Premium
          </span>
        </div>
        <p className="text-sm text-muted-foreground">
          Te dane pomogą Ci zwiększyć zysk, obniżyć zwroty i wyprzedzić konkurencję.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {features.map((f) => (
          <button
            key={f.key}
            type="button"
            onClick={() => handleClick(f.key)}
            className="group text-left bg-card border border-border p-4 md:p-5 flex flex-col gap-3 hover:border-foreground transition-colors"
          >
            <div className="flex items-center gap-2">
              <f.Icon className="w-4 h-4 text-foreground" />
              <h3 className="text-base font-semibold tracking-tight">{f.title}</h3>
            </div>
            <p className="text-[13px] text-muted-foreground leading-relaxed">{f.teaser}</p>

            {/* Blurred preview */}
            <div className="relative mt-2 h-[120px] bg-cream overflow-hidden">
              <div
                aria-hidden
                className="absolute inset-0 p-3 select-none pointer-events-none"
                style={{ filter: "blur(7px)" }}
              >
                {f.preview}
              </div>
              <div className="absolute inset-0 bg-background/30 flex items-center justify-center">
                <span className="inline-flex items-center gap-1.5 text-[12.5px] font-semibold bg-warning text-warning-foreground px-4 py-1.5 rounded-full">
                  <Lock className="w-3 h-3" /> Odblokuj dane
                </span>
              </div>
            </div>
          </button>
        ))}
      </div>
    </section>
  );
}
