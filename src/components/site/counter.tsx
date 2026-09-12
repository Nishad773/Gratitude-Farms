import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

/**
 * Counts a numeric value up once the element scrolls into view. Values that
 * aren't purely numeric (e.g. "₹3.5 Cr", "1 Lakh+") are rendered as-is after a
 * short fade, so the same component can carry every figure on the page.
 */

function parseValue(value: string) {
  const match = value.match(/^(\D*?)([\d,.]+)(.*)$/s);
  if (!match) return null;
  const prefix = match[1] ?? "";
  const digits = match[2] ?? "";
  const suffix = match[3] ?? "";
  const numeric = Number(digits.replace(/,/g, ""));
  if (!Number.isFinite(numeric)) return null;
  const decimals = digits.includes(".") ? (digits.split(".")[1]?.length ?? 0) : 0;
  const grouped = digits.includes(",");
  return { prefix, suffix, numeric, decimals, grouped };
}

function formatIndian(value: number, decimals: number, grouped: boolean) {
  const fixed = value.toFixed(decimals);
  if (!grouped) return fixed;
  const whole = fixed.split(".")[0] ?? fixed;
  const fraction = fixed.split(".")[1];
  // Indian digit grouping: last three digits, then pairs (1,77,204).
  const last3 = whole.slice(-3);
  const rest = whole.slice(0, -3);
  const head = rest ? `${rest.replace(/\B(?=(\d{2})+(?!\d))/g, ",")},` : "";
  return fraction ? `${head}${last3}.${fraction}` : `${head}${last3}`;
}

export function useInView<T extends HTMLElement>(once = true) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node || typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setInView(true);
            if (once) observer.disconnect();
          } else if (!once) {
            setInView(false);
          }
        }
      },
      { threshold: 0.25 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [once]);

  return { ref, inView };
}

export function CountUp({ value, className }: { value: string; className?: string }) {
  const { ref, inView } = useInView<HTMLSpanElement>();
  const parsed = parseValue(value);
  // Starts at the real figure so SSR and no-JS visitors see the number, not a
  // zero; the animation only rewinds it once we're client-side and in view.
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    if (!parsed || !inView) return;

    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches === true;

    if (reduced) {
      setDisplay(value);
      return;
    }

    const duration = 1400;
    const start = performance.now();
    let frame = 0;

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = parsed.numeric * eased;
      setDisplay(
        `${parsed.prefix}${formatIndian(current, parsed.decimals, parsed.grouped)}${parsed.suffix}`,
      );
      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
    // `parsed` is derived from `value` — re-running on value change is enough.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, value]);

  return (
    <span ref={ref} className={className}>
      {parsed ? display : value}
    </span>
  );
}

export type StatItem = { value: string; label: string; note?: string };

export function StatGrid({
  stats,
  inverted = false,
  columns = 4,
  className,
}: {
  stats: StatItem[];
  inverted?: boolean;
  columns?: 2 | 3 | 4;
  className?: string;
}) {
  const cols = {
    2: "sm:grid-cols-2",
    3: "sm:grid-cols-2 lg:grid-cols-3",
    4: "sm:grid-cols-2 lg:grid-cols-4",
  }[columns];

  return (
    <dl
      className={cn(
        "grid grid-cols-1 gap-px overflow-hidden rounded-2xl border",
        cols,
        inverted
          ? "border-primary-foreground/20 bg-primary-foreground/20"
          : "border-line-soft bg-line-soft",
        className,
      )}
    >
      {stats.map((stat) => (
        <div
          key={stat.label}
          className={cn("px-5 py-7 sm:px-6 sm:py-8", inverted ? "bg-brand" : "bg-warm-white")}
        >
          <dt className="sr-only">{stat.label}</dt>
          <dd>
            <CountUp
              value={stat.value}
              className={cn(
                "display-face block text-3xl sm:text-4xl",
                inverted ? "text-sun" : "text-brand",
              )}
            />
            <span
              className={cn(
                "mt-3 block text-sm leading-snug",
                inverted ? "text-primary-foreground/75" : "text-ink-soft",
              )}
            >
              {stat.label}
            </span>
            {stat.note ? (
              <span
                className={cn(
                  "mt-2 block text-xs",
                  inverted ? "text-primary-foreground/50" : "text-ink-soft/70",
                )}
              >
                {stat.note}
              </span>
            ) : null}
          </dd>
        </div>
      ))}
    </dl>
  );
}
