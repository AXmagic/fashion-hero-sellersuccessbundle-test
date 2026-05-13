import { ReactNode } from "react";
import { NavLink, Link } from "react-router-dom";
import {
  LayoutDashboard,
  ShoppingBag,
  Package,
  Users,
  RotateCcw,
  Wallet,
  BarChart3,
  FileText,
  Settings,
  HelpCircle,
  Sparkles,
} from "lucide-react";
import type { SellerProfile } from "@/lib/sellerProfiles";

interface Props {
  profile: SellerProfile;
  children: ReactNode;
  pageTitle?: string;
  pageSub?: string;
  rightSlot?: ReactNode;
}

const NAV = [
  { label: "Przegląd", icon: LayoutDashboard, to: "" },
  { label: "Zamówienia", icon: ShoppingBag },
  { label: "Produkty", icon: Package },
  { label: "Klienci", icon: Users },
  { label: "Zwroty", icon: RotateCcw },
  { label: "Finanse", icon: Wallet },
  { label: "Analityka", icon: BarChart3, premium: true, unlock: true },
  { label: "Raporty", icon: FileText, premium: true, unlock: true },
];

const FOOTER_NAV = [
  { label: "Ustawienia", icon: Settings },
  { label: "Pomoc", icon: HelpCircle },
];

export default function SellerShell({ profile, children, pageTitle, pageSub, rightSlot }: Props) {
  return (
    <div className="min-h-screen bg-background">
      {/* Floating sidebar */}
      <aside className="hidden md:flex fixed left-0 top-0 bottom-0 w-[220px] bg-card border-r border-border flex-col z-30">
        <div className="px-5 py-5 flex items-center justify-between gap-2">
          <Link to="/" className="flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-accent" />
            <span className="text-[13px] font-semibold tracking-[2px]">
              FASHION<span className="font-normal">HERO</span>
            </span>
          </Link>
          <span className="inline-flex items-center text-[10px] font-semibold uppercase tracking-[1.4px] bg-transparent border border-orange-500 text-orange-500 px-1.5 py-0.5 rounded-[5px]">
            Beta
          </span>
        </div>

        <nav className="flex-1 px-3 space-y-0.5 overflow-y-auto">
          {NAV.map((item, i) => {
            const Active = i === 0;
            const className = `flex items-center gap-2.5 px-3 py-2 text-[13px] rounded-sm select-none ${
              Active
                ? "bg-accent/15 text-accent font-medium border-l-2 border-accent pl-[10px]"
                : "text-foreground/70 hover:bg-muted"
            } ${item.unlock ? "cursor-pointer" : "cursor-default"}`;
            const inner = (
              <>
                <item.icon className="w-4 h-4 shrink-0" />
                <span className="flex-1">{item.label}</span>
                {item.premium && (
                  <span className="text-[9px] uppercase tracking-[1.2px] bg-muted text-muted-foreground px-1.5 py-0.5 rounded">
                    Premium
                  </span>
                )}
              </>
            );
            if (item.unlock) {
              return (
                <Link
                  key={item.label}
                  to={`/seller/${profile.id}/unlock?feature=${item.label.toLowerCase()}`}
                  className={className}
                >
                  {inner}
                </Link>
              );
            }
            return (
              <div key={item.label} className={className}>
                {inner}
              </div>
            );
          })}

          <div className="pt-3 mt-3 border-t border-border space-y-0.5">
            {FOOTER_NAV.map((item) => (
              <div
                key={item.label}
                className="flex items-center gap-2.5 px-3 py-2 text-[13px] rounded-sm text-foreground/70 cursor-default"
              >
                <item.icon className="w-4 h-4 shrink-0" />
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        </nav>

        <div className="m-3 p-3 bg-cream border border-border rounded-sm">
          <div className="text-[12px] font-medium leading-snug">
            Odblokuj pełną analitykę i rozwijaj swój sklep szybciej.
          </div>
          <Link
            to={`/seller/${profile.id}/unlock?feature=analytics_offer`}
            className="mt-2 inline-flex items-center gap-1.5 text-[12px] font-medium bg-card border border-border px-3 py-1.5 rounded-full hover:border-foreground"
          >
            Zobacz ofertę
          </Link>
        </div>
      </aside>

      {/* Main */}
      <div className="md:pl-[220px]">
        {/* Mobile top bar */}
        <div className="md:hidden flex items-center justify-between px-4 py-3 border-b border-border bg-card">
          <Link to="/" className="flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-accent" />
            <span className="text-[12px] font-semibold tracking-[2px]">FASHIONHERO</span>
          </Link>
          <div className="text-[11px] text-muted-foreground">{profile.shop}</div>
        </div>

        {/* Page header */}
        {(pageTitle || rightSlot) && (
          <header className="px-5 md:px-10 pt-7 md:pt-9 pb-4 flex items-start justify-between gap-4 flex-wrap">
            <div>
              {pageTitle && (
                <h1 className="font-serif text-3xl md:text-[34px] leading-tight">{pageTitle}</h1>
              )}
              {pageSub && (
                <p className="text-[13px] text-muted-foreground mt-1">{pageSub}</p>
              )}
            </div>
            <div className="flex items-center gap-3">
              {rightSlot}
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-full bg-foreground text-background flex items-center justify-center text-[11px] font-semibold">
                  {profile.initials}
                </div>
                <div className="text-right leading-tight hidden sm:block">
                  <div className="text-[12px] font-medium">{profile.shop}</div>
                  <div className="text-[10px] uppercase tracking-[1.2px] text-muted-foreground">
                    Twój sklep
                  </div>
                </div>
              </div>
            </div>
          </header>
        )}

        <main className="px-5 md:px-10 pb-16">{children}</main>
      </div>
    </div>
  );
}
