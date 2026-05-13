import { Link } from "react-router-dom";
import StorefrontLayout from "@/components/layout/StorefrontLayout";
import { PROFILE_LIST } from "@/lib/sellerProfiles";

export default function SellerLanding() {
  return (
    <StorefrontLayout>
      <section className="mx-auto max-w-3xl px-4 py-12 md:py-20">
        <div className="text-center space-y-2 mb-10">
          <div className="text-[11px] uppercase tracking-[1.6px] text-muted-foreground">FashionHero · Sellers</div>
          <h1 className="font-serif text-3xl md:text-4xl">Wybierz profil testowy</h1>
          <p className="text-[13px] text-muted-foreground max-w-md mx-auto">
            Każdy profil to inny scenariusz ekonomiki sklepu. Wejdź, by zobaczyć dane oraz losowo przypisaną cenę
            Bundle.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {PROFILE_LIST.map((p) => (
            <Link
              key={p.id}
              to={`/seller/${p.id}`}
              className="group bg-card border border-border p-5 hover:border-foreground transition-colors flex flex-col gap-3"
            >
              <div className="w-10 h-10 rounded-full bg-foreground text-background flex items-center justify-center text-sm font-semibold">
                {p.initials}
              </div>
              <div>
                <div className="font-serif text-2xl">{p.name}</div>
                <div className="text-[11px] uppercase tracking-[1.4px] text-muted-foreground mt-0.5">
                  {p.category}
                </div>
              </div>
              <p className="text-[13px] text-muted-foreground leading-relaxed flex-1">{p.hookHeadline}.</p>
              <span className="fh-pill border-foreground/20 self-start group-hover:bg-foreground group-hover:text-background">
                Wejdź jako {p.name}
              </span>
            </Link>
          ))}
        </div>
      </section>
    </StorefrontLayout>
  );
}
