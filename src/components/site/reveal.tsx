import { useEffect, useLayoutEffect, useRef, useState } from "react";

/**
 * Scroll-reveal that never hides content it shouldn't.
 *
 * On mount we measure: anything already on screen is marked shown immediately
 * (no flash of hidden content after hydration), and only elements below the
 * fold get the hidden state plus an observer. Server-rendered HTML carries no
 * attribute at all, so a visitor without JS sees the page exactly as written.
 */

type RevealState = "initial" | "hidden" | "shown";

// SSR-safe: useLayoutEffect warns on the server, so fall back to useEffect there.
const useIsomorphicLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;

export function useReveal<T extends HTMLElement>(enabled = true) {
  const ref = useRef<T | null>(null);
  const [state, setState] = useState<RevealState>("initial");

  useIsomorphicLayoutEffect(() => {
    const node = ref.current;
    if (!enabled || !node) return;

    const reduced = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches === true;
    if (reduced || typeof IntersectionObserver === "undefined") {
      setState("shown");
      return;
    }

    // Already in (or near) the viewport at hydration — show it without animating.
    if (node.getBoundingClientRect().top < window.innerHeight * 0.9) {
      setState("shown");
      return;
    }

    setState("hidden");
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setState("shown");
            observer.disconnect();
          }
        }
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.05 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [enabled]);

  return { ref, revealProps: state === "initial" ? {} : { "data-reveal": state } };
}
