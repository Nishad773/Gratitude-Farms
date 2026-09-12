import { Link } from "@tanstack/react-router";
import { ArrowUpRight, ChevronRight } from "lucide-react";
import type { ReactNode } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import { useReveal } from "./reveal";

/* ------------------------------------------------------------------ */
/* Section wrapper                                                     */
/* ------------------------------------------------------------------ */

type Tone = "paper" | "warm" | "brand" | "brand-strong" | "sun" | "mist";

const toneClass: Record<Tone, string> = {
  paper: "bg-paper text-foreground",
  warm: "bg-warm-white text-foreground",
  brand: "bg-brand text-primary-foreground",
  "brand-strong": "bg-brand-strong text-primary-foreground",
  sun: "bg-sun text-brand-strong",
  mist: "bg-mist/40 text-foreground",
};

export function Section({
  id,
  tone = "paper",
  className,
  innerClassName,
  reveal = true,
  children,
}: {
  id?: string;
  tone?: Tone;
  className?: string;
  /** Overrides the default vertical rhythm on the inner container. */
  innerClassName?: string;
  /** Set false to opt a section out of the scroll-reveal entrance. */
  reveal?: boolean;
  children: ReactNode;
}) {
  const { ref, revealProps } = useReveal<HTMLDivElement>(reveal);

  return (
    <section id={id} className={cn(toneClass[tone], className)}>
      <div
        ref={ref}
        {...revealProps}
        className={cn(
          "mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20 lg:px-10 lg:py-24",
          innerClassName,
        )}
      >
        {children}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Section heading                                                     */
/* ------------------------------------------------------------------ */

export function SectionHeading({
  eyebrow,
  title,
  lede,
  align = "left",
  inverted = false,
  className,
}: {
  eyebrow?: string;
  title: ReactNode;
  lede?: ReactNode;
  align?: "left" | "center";
  inverted?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn(align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl", className)}
    >
      {eyebrow ? <p className={cn("eyebrow", inverted && "text-sun")}>{eyebrow}</p> : null}
      <h2
        className={cn(
          "display-face mt-4 text-3xl leading-[1.1] text-balance sm:text-4xl lg:text-[2.9rem]",
          inverted ? "text-primary-foreground" : "text-brand-strong",
        )}
      >
        {title}
      </h2>
      {lede ? (
        <p
          className={cn(
            "mt-5 text-base leading-relaxed sm:text-lg",
            inverted ? "text-primary-foreground/75" : "text-ink-soft",
          )}
        >
          {lede}
        </p>
      ) : null}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Page hero                                                           */
/* ------------------------------------------------------------------ */

export type Crumb = { label: string; to?: string };

export function PageHero({
  eyebrow,
  title,
  lede,
  crumbs,
  image,
  imageAlt,
  actions,
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  lede?: ReactNode;
  crumbs?: Crumb[];
  image?: string;
  imageAlt?: string;
  actions?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <section className="relative isolate overflow-hidden bg-brand-strong text-primary-foreground">
      {image ? (
        <>
          <img
            src={image}
            alt={imageAlt ?? ""}
            className="hero-image absolute inset-0 size-full object-cover opacity-55"
            loading="eager"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-r from-brand-strong via-brand-strong/88 to-brand-strong/45"
          />
        </>
      ) : null}

      <div className="relative mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-20 lg:px-10 lg:py-24">
        {crumbs?.length ? (
          <nav aria-label="Breadcrumb" className="hero-enter mb-7">
            <ol className="flex flex-wrap items-center gap-1 text-xs font-bold text-primary-foreground/55">
              <li>
                <Link to="/" className="hover:text-sun">
                  Home
                </Link>
              </li>
              {crumbs.map((crumb) => (
                <li key={crumb.label} className="flex items-center gap-1">
                  <ChevronRight aria-hidden="true" className="size-3.5" />
                  {crumb.to ? (
                    <Link to={crumb.to} className="hover:text-sun">
                      {crumb.label}
                    </Link>
                  ) : (
                    <span className="text-primary-foreground/80">{crumb.label}</span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        ) : null}

        <p className="hero-enter eyebrow text-sun" style={{ animationDelay: "60ms" }}>
          {eyebrow}
        </p>
        <h1
          className="hero-enter display-face mt-5 max-w-4xl text-4xl leading-[1.05] text-balance sm:text-5xl lg:text-6xl"
          style={{ animationDelay: "120ms" }}
        >
          {title}
        </h1>
        {lede ? (
          <p
            className="hero-enter mt-6 max-w-2xl text-base leading-relaxed text-primary-foreground/80 sm:text-lg"
            style={{ animationDelay: "200ms" }}
          >
            {lede}
          </p>
        ) : null}
        {actions ? (
          <div className="hero-enter mt-8 flex flex-wrap gap-3" style={{ animationDelay: "280ms" }}>
            {actions}
          </div>
        ) : null}
        {children ? (
          <div className="hero-enter" style={{ animationDelay: "340ms" }}>
            {children}
          </div>
        ) : null}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Buttons                                                             */
/* ------------------------------------------------------------------ */

export function PrimaryLink({
  to,
  href,
  children,
  className,
}: {
  to?: string;
  href?: string;
  children: ReactNode;
  className?: string;
}) {
  const classes = cn(
    "h-11 rounded-full bg-sun px-6 font-extrabold text-brand-strong shadow-none transition-all duration-200 hover:-translate-y-0.5 hover:bg-primary-foreground hover:shadow-lg hover:shadow-brand-strong/20 active:translate-y-0",
    className,
  );
  return (
    <Button asChild className={classes}>
      {to ? (
        <Link to={to}>
          {children} <ArrowUpRight aria-hidden="true" />
        </Link>
      ) : (
        <a href={href}>
          {children} <ArrowUpRight aria-hidden="true" />
        </a>
      )}
    </Button>
  );
}

export function GhostLink({
  to,
  href,
  children,
  className,
}: {
  to?: string;
  href?: string;
  children: ReactNode;
  className?: string;
}) {
  const classes = cn(
    "h-11 rounded-full border-primary-foreground/40 bg-transparent px-6 font-extrabold text-primary-foreground shadow-none transition-all duration-200 hover:-translate-y-0.5 hover:border-primary-foreground/70 hover:bg-primary-foreground/10 hover:text-primary-foreground active:translate-y-0",
    className,
  );
  return (
    <Button asChild variant="outline" className={classes}>
      {to ? <Link to={to}>{children}</Link> : <a href={href}>{children}</a>}
    </Button>
  );
}

export function SolidLink({
  to,
  href,
  children,
  className,
}: {
  to?: string;
  href?: string;
  children: ReactNode;
  className?: string;
}) {
  const classes = cn(
    "h-11 rounded-full bg-brand px-6 font-extrabold text-primary-foreground shadow-none transition-all duration-200 hover:-translate-y-0.5 hover:bg-brand-strong hover:shadow-lg hover:shadow-brand-strong/25 active:translate-y-0",
    className,
  );
  return (
    <Button asChild className={classes}>
      {to ? (
        <Link to={to}>
          {children} <ArrowUpRight aria-hidden="true" />
        </Link>
      ) : (
        <a href={href}>
          {children} <ArrowUpRight aria-hidden="true" />
        </a>
      )}
    </Button>
  );
}
