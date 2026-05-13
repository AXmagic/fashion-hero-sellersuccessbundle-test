import { type ReactNode } from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="sticky top-0 z-30 bg-background/85 backdrop-blur border-b border-border">
      <div className="mx-auto max-w-[1400px] px-4 md:px-8 h-16 flex items-center justify-between gap-6">
        <Link to="/" className="font-serif text-2xl tracking-wide">
          FashionHero
        </Link>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="bg-foreground text-background mt-12">
      <div className="mx-auto max-w-[1400px] px-4 md:px-8 py-6 flex flex-col md:flex-row items-center justify-between text-[11px] text-background/70">
        <p>© {new Date().getFullYear()} FashionHero. All rights reserved.</p>
        <p className="mt-2 md:mt-0">Made with care in Europe.</p>
      </div>
    </footer>
  );
}

export default function StorefrontLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
