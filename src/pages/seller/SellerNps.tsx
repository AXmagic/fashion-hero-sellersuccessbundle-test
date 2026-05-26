import { useEffect, useState } from "react";
import { Navigate, useNavigate, useParams, Link } from "react-router-dom";
import { Sparkles } from "lucide-react";
import { getProfile } from "@/lib/sellerProfiles";
import { getSessionPrice } from "@/lib/wtpPrice";
import { logEvent } from "@/lib/wtpLog";
import { setNps } from "@/lib/npsStore";
import npsIllustration from "@/assets/nps-marketplace.png";

const SCALE = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

export default function SellerNps() {
  const { profile: profileId } = useParams();
  const profile = getProfile(profileId);
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState<number | null>(null);

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  if (!profile) return <Navigate to="/seller" replace />;
  const price = getSessionPrice(profile.id);

  const pick = (value: number) => {
    if (submitting != null) return;
    setSubmitting(value);
    setNps(profile.id, value);
    logEvent({ type: "nps_submit", profile: profile.id, price, nps: value });
    navigate(`/seller/${profile.id}/flow`);
  };

  const skip = () => navigate(`/seller/${profile.id}/flow`);

  const toneFor = (n: number) =>
    n <= 6
      ? "hover:border-destructive hover:text-destructive"
      : n <= 8
        ? "hover:border-warning hover:text-warning"
        : "hover:border-accent hover:text-accent";

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="px-5 md:px-10 py-5 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-1.5">
          <Sparkles className="w-4 h-4 text-accent" />
          <span className="text-[13px] font-semibold tracking-[2px]">
            FASHION<span className="font-normal">HERO</span>
          </span>
        </Link>
        <span className="text-[11px] uppercase tracking-[1.4px] text-muted-foreground">
          {profile.shop}
        </span>
      </header>

      <main className="flex-1 flex items-center justify-center px-5 md:px-10 py-10">
        <div className="max-w-2xl w-full text-center">
          <h1 className="font-serif text-3xl md:text-[44px] leading-[1.1]">
            Jedno krótkie <em className="italic">pytanie</em> do Ciebie
          </h1>

          <div className="mt-8 flex justify-center">
            <img
              src={npsIllustration}
              alt="Ilustracja małego sklepu z ubraniami i torbą zakupową"
              width={420}
              height={350}
              loading="lazy"
              className="w-[280px] md:w-[360px] h-auto"
            />
          </div>

          <div className="mt-6 space-y-3 text-left max-w-md mx-auto">
            <p className="text-[15px] text-muted-foreground">
              Cześć {profile.name},
            </p>
            <p className="text-[15px] text-muted-foreground">
              Rozwijasz swój sklep na FashionHero już od jakiegoś czasu i chcielibyśmy usłyszeć, jak Ci idzie
            </p>
          </div>

          <h2 className="mt-8 font-serif text-xl md:text-2xl leading-snug">
            Jak bardzo poleciłbyś/poleciłabyś FashionHero innemu sprzedawcy?
          </h2>



          <div className="mt-10">
            <div className="flex flex-wrap justify-center gap-2 md:gap-2.5">
              {SCALE.map((n) => (
                <button
                  key={n}
                  type="button"
                  onClick={() => pick(n)}
                  disabled={submitting != null}
                  aria-label={`Ocena ${n} z 10`}
                  className={`w-11 h-11 md:w-12 md:h-12 rounded-md border border-border bg-card text-[15px] font-medium transition-colors disabled:opacity-50 ${toneFor(
                    n,
                  )} ${submitting === n ? "border-foreground text-foreground" : ""}`}
                >
                  {n}
                </button>
              ))}
            </div>
            <div className="flex justify-between mt-3 text-[11px] uppercase tracking-[1.4px] text-muted-foreground px-1">
              <span>Wcale</span>
              <span>Zdecydowanie tak</span>
            </div>
            <p className="mt-6 text-[13px] text-muted-foreground">
              Dziękujemy! Twoja szczera opinia pomaga nam ulepszać platformę dla sprzedawców.
            </p>
          </div>

          <button
            type="button"
            onClick={skip}
            className="mt-10 text-[12px] text-muted-foreground underline underline-offset-2 hover:text-foreground"
          >
            Pomiń
          </button>
        </div>
      </main>
    </div>
  );
}
