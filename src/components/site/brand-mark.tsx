import { cn } from "@/lib/utils";

/** The Trust's monogram — a G in gold on the brand green. */
export function BrandMark({
  className,
  inverted = false,
}: {
  className?: string;
  inverted?: boolean;
}) {
  return (
    <svg
      viewBox="0 0 64 64"
      role="img"
      aria-label="Gramonnati Trust"
      className={cn("shrink-0", className)}
    >
      <circle
        cx="32"
        cy="32"
        r="32"
        fill={inverted ? "var(--color-sun)" : "var(--color-brand-strong)"}
      />
      <path
        d="M43 18c-2.6-2.1-6.1-3.3-10.3-3.3-8.2 0-14.1 5.4-14.1 13.4 0 8.2 6 13.5 14.5 13.5 4.5 0 8.2-1.1 10.5-3.1v-9.8H32.1v5.5h5.1v1.2c-1 .5-2.3.8-3.7.8-4.7 0-7.4-3-7.4-8.1 0-4.8 2.5-7.8 6.8-7.8 2.3 0 4.3.7 5.9 2.1z"
        fill={inverted ? "var(--color-brand-strong)" : "var(--color-sun)"}
      />
      <path
        d="M20 48h24"
        stroke={inverted ? "var(--color-brand-strong)" : "var(--color-sun)"}
        strokeWidth="3"
        strokeLinecap="round"
        opacity="0.7"
      />
    </svg>
  );
}
