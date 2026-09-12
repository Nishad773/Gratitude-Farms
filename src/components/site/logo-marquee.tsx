import { cn } from "@/lib/utils";

/**
 * A continuously scrolling strip of partner names. The list is rendered twice so
 * the translate animation loops seamlessly; the duplicate is hidden from
 * assistive tech. Pauses on hover and respects prefers-reduced-motion.
 */
export function LogoMarquee({
  items,
  label,
  inverted = false,
}: {
  items: string[];
  label: string;
  inverted?: boolean;
}) {
  return (
    <div className="group relative overflow-hidden" aria-label={label} role="group">
      <div
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r sm:w-24",
          inverted ? "from-brand-strong" : "from-paper",
        )}
      />
      <div
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l sm:w-24",
          inverted ? "from-brand-strong" : "from-paper",
        )}
      />
      <ul className="marquee-track flex w-max items-center gap-3 py-2">
        {[0, 1].map((copy) => (
          <li key={copy} aria-hidden={copy === 1} className="contents">
            {items.map((item) => (
              <span
                key={`${copy}-${item}`}
                className={cn(
                  "whitespace-nowrap rounded-full border px-5 py-2.5 text-sm font-bold",
                  inverted
                    ? "border-primary-foreground/20 bg-primary-foreground/5 text-primary-foreground/80"
                    : "border-line-soft bg-warm-white text-brand-strong",
                )}
              >
                {item}
              </span>
            ))}
          </li>
        ))}
      </ul>
    </div>
  );
}
