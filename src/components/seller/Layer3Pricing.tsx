import { useEffect, useRef, useState } from "react";
import { Check } from "lucide-react";
import type { SellerProfile } from "@/lib/sellerProfiles";
import type { PricePoint } from "@/lib/wtpPrice";
import { logEvent } from "@/lib/wtpLog";
import ConfirmDialog from "./ConfirmDialog";

interface Props {
  profile: SellerProfile;
  price: PricePoint;
}

const INCLUDED = [
  "Pełny Seller Dashboard z marżą netto i kosztem zwrotów",
  "Price Monitor — alerty zmian cen konkurencji",
  "Trend Feed — kategorie i frazy rosnące w wyszukiwarce",
  "Returns Analyzer — powody zwrotów i rekomendacje",
  "Cotygodniowe alerty mailowe i podsumowanie miesiąca",
];

export default function Layer3Pricing({ profile, price }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const seen = useRef(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !seen.current) {
          seen.current = true;
          logEvent({ type: "w3_view", profile: profile.id, price });
        }
      },
      { threshold: 0.4 },
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, [profile.id, price]);

  const onPrimary = () => {
    logEvent({ type: "cta_click", profile: profile.id, price, feature: "primary_cta" });
    setOpen(true);
  };

  const onDismiss = () => {
    logEvent({ type: "cta_dismiss", profile: profile.id, price });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section ref={ref} className="pt-4">
      <div className="max-w-md mx-auto bg-card border border-border p-6 md:p-8 text-center">
        <div className="text-[11px] uppercase tracking-[1.6px] text-muted-foreground mb-4">
          SELLER SUCCESS BUNDLE
        </div>
        <div className="flex items-baseline justify-center gap-1">
          <span className="font-serif text-5xl md:text-6xl">{price}</span>
          <span className="text-base text-muted-foreground">zł / mies.</span>
        </div>
        <div className="text-[12px] text-muted-foreground mt-1">
          Płatność miesięczna — anulujesz, kiedy chcesz.
        </div>

        <ul className="text-left mt-6 space-y-2.5">
          {INCLUDED.map((item) => (
            <li key={item} className="flex gap-2 text-[13px] leading-relaxed">
              <Check className="w-4 h-4 text-success shrink-0 mt-0.5" />
              <span>{item}</span>
            </li>
          ))}
        </ul>

        <div className="space-y-2 mt-6">
          <button
            type="button"
            onClick={onPrimary}
            className="fh-pill w-full justify-center bg-foreground text-background border-foreground hover:opacity-90 py-3"
          >
            Zostaw kontakt — odezwiemy się w 48h
          </button>
          <button
            type="button"
            onClick={onDismiss}
            className="fh-pill w-full justify-center border-transparent text-foreground/60 hover:text-foreground"
          >
            Nie teraz
          </button>
        </div>

        <p className="text-[11px] text-muted-foreground mt-4">
          Bez podpinania karty. Bez zobowiązań.
        </p>
      </div>

      <ConfirmDialog open={open} onOpenChange={setOpen} profile={profile.id} price={price} />
    </section>
  );
}
