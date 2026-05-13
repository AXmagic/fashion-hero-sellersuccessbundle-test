import { useState } from "react";
import StorefrontLayout from "@/components/layout/StorefrontLayout";
import { clearEvents, readEvents } from "@/lib/wtpLog";

export default function SellerEvents() {
  const [events, setEvents] = useState(() => readEvents());

  const refresh = () => setEvents(readEvents());
  const clear = () => {
    clearEvents();
    setEvents([]);
  };

  return (
    <StorefrontLayout>
      <section className="mx-auto max-w-4xl px-4 py-10">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="font-serif text-3xl">WTP events</h1>
            <p className="text-[12px] text-muted-foreground">
              Lokalny log z localStorage · {events.length} zdarzeń
            </p>
          </div>
          <div className="flex gap-2">
            <button onClick={refresh} className="fh-pill border-foreground/20 hover:bg-foreground hover:text-background">
              Odśwież
            </button>
            <button onClick={clear} className="fh-pill border-destructive/40 text-destructive hover:bg-destructive hover:text-destructive-foreground">
              Wyczyść
            </button>
          </div>
        </div>

        <div className="border border-border bg-card overflow-x-auto">
          <table className="w-full text-[12px]">
            <thead className="bg-cream text-left">
              <tr>
                <th className="px-3 py-2 font-medium">ts</th>
                <th className="px-3 py-2 font-medium">type</th>
                <th className="px-3 py-2 font-medium">profile</th>
                <th className="px-3 py-2 font-medium">price</th>
                <th className="px-3 py-2 font-medium">extra</th>
              </tr>
            </thead>
            <tbody>
              {events.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-3 py-6 text-center text-muted-foreground">
                    Brak zdarzeń. Przejdź na /seller/dorota i wróć.
                  </td>
                </tr>
              )}
              {events.map((e, i) => (
                <tr key={i} className="border-t border-border">
                  <td className="px-3 py-1.5 font-mono text-[11px]">{e.ts.slice(11, 19)}</td>
                  <td className="px-3 py-1.5">{e.type}</td>
                  <td className="px-3 py-1.5">{e.profile}</td>
                  <td className="px-3 py-1.5">{e.price}</td>
                  <td className="px-3 py-1.5 text-muted-foreground">
                    {[e.feature && `feature=${e.feature}`, e.email && `email=${e.email}`]
                      .filter(Boolean)
                      .join(" · ")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </StorefrontLayout>
  );
}
