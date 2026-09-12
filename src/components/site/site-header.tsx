import { Link, useRouterState } from "@tanstack/react-router";
import { ChevronDown, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { navigation } from "@/content/site";
import { cn } from "@/lib/utils";

import { BrandMark } from "./brand-mark";

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const pathname = useRouterState({ select: (state) => state.location.pathname });

  // Lifts the header off the page once content starts passing underneath it.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close everything whenever the route changes — otherwise the panel stays
  // open behind the new page after a nav click.
  useEffect(() => {
    setMenuOpen(false);
    setOpenGroup(null);
  }, [pathname]);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  const isActive = (to: string) => pathname === to || pathname.startsWith(`${to}/`);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b bg-paper/90 backdrop-blur-md transition-all duration-300",
        scrolled
          ? "border-line-soft/80 shadow-lg shadow-brand-strong/10"
          : "border-transparent shadow-none",
      )}
    >
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-50 focus:rounded-md focus:bg-brand focus:px-4 focus:py-2 focus:text-sm focus:font-bold focus:text-primary-foreground"
      >
        Skip to content
      </a>

      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-3 sm:px-8 lg:px-10">
        <Link
          to="/"
          className="flex shrink-0 items-center gap-3"
          aria-label="Gramonnati Trust — home"
        >
          <BrandMark className="size-10" />
          <span className="leading-none">
            <span className="display-face block text-lg text-brand-strong">Gramonnati Trust</span>
            <span className="mt-1 block text-[0.6rem] font-extrabold uppercase tracking-[0.16em] text-ink-soft">
              Dignity, delivered
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 xl:flex" aria-label="Primary">
          {navigation.map((item) =>
            item.children ? (
              <div
                key={item.to}
                className="relative"
                onMouseEnter={() => setOpenGroup(item.to)}
                onMouseLeave={() => setOpenGroup(null)}
              >
                <button
                  type="button"
                  aria-expanded={openGroup === item.to}
                  aria-haspopup="true"
                  onClick={() => setOpenGroup((current) => (current === item.to ? null : item.to))}
                  className={cn(
                    "nav-link flex items-center gap-1 px-3 py-2 text-sm font-bold transition-colors",
                    isActive(item.to)
                      ? "nav-link-active text-brand"
                      : "text-ink-soft hover:text-brand",
                  )}
                >
                  {item.label}
                  <ChevronDown
                    aria-hidden="true"
                    className={cn(
                      "size-4 transition-transform",
                      openGroup === item.to && "rotate-180",
                    )}
                  />
                </button>
                {openGroup === item.to ? (
                  <div className="absolute left-0 top-full w-80 pt-2">
                    <div className="menu-enter overflow-hidden rounded-2xl border border-line-soft bg-warm-white p-2 shadow-xl shadow-brand-strong/15">
                      <Link
                        to={item.to}
                        className="block rounded-xl px-3 py-2.5 text-sm font-bold text-brand-strong hover:bg-mist/40"
                      >
                        All programmes
                      </Link>
                      {item.children.map((child) => (
                        <Link
                          key={child.to}
                          to={child.to}
                          className="block rounded-xl px-3 py-2.5 transition-colors duration-150 hover:bg-mist/50"
                        >
                          <span className="block text-sm font-bold text-brand-strong">
                            {child.label}
                          </span>
                          <span className="mt-0.5 block text-xs leading-snug text-ink-soft">
                            {child.description}
                          </span>
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : null}
              </div>
            ) : (
              <Link
                key={item.to}
                to={item.to}
                className={cn(
                  "nav-link px-3 py-2 text-sm font-bold transition-colors",
                  isActive(item.to)
                    ? "nav-link-active text-brand"
                    : "text-ink-soft hover:text-brand",
                )}
              >
                {item.label}
              </Link>
            ),
          )}
        </nav>

        <div className="flex items-center gap-2">
          <Button
            asChild
            className="hidden rounded-full bg-brand px-5 text-sm font-extrabold text-primary-foreground shadow-none transition-all duration-200 hover:-translate-y-0.5 hover:bg-brand-strong hover:shadow-lg hover:shadow-brand-strong/25 active:translate-y-0 sm:inline-flex"
          >
            <Link to="/partner">Partner with us</Link>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="text-brand xl:hidden"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
          </Button>
        </div>
      </div>

      {menuOpen ? (
        <nav
          id="mobile-nav"
          className="menu-enter max-h-[calc(100vh-4rem)] overflow-y-auto border-t border-line-soft bg-warm-white px-5 py-4 xl:hidden"
          aria-label="Mobile"
        >
          <div className="mx-auto flex max-w-7xl flex-col">
            {navigation.map((item) => (
              <div key={item.to} className="border-b border-line-soft last:border-b-0">
                <Link
                  to={item.to}
                  className={cn(
                    "block py-3 text-sm font-extrabold",
                    isActive(item.to) ? "text-brand" : "text-brand-strong",
                  )}
                >
                  {item.label}
                </Link>
                {item.children ? (
                  <div className="mb-3 flex flex-col gap-1 border-l-2 border-sun/60 pl-4">
                    {item.children.map((child) => (
                      <Link key={child.to} to={child.to} className="py-1.5 text-sm text-ink-soft">
                        {child.label}
                      </Link>
                    ))}
                  </div>
                ) : null}
              </div>
            ))}
            <Button
              asChild
              className="mt-4 h-11 rounded-full bg-brand font-extrabold text-primary-foreground shadow-none hover:bg-brand-strong"
            >
              <Link to="/partner">Partner with us</Link>
            </Button>
          </div>
        </nav>
      ) : null}
    </header>
  );
}
