import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  useRouterState,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import { BackToTop } from "@/components/site/back-to-top";
import { SiteFooter } from "@/components/site/site-footer";
import { SiteHeader } from "@/components/site/site-header";
import { Toaster } from "@/components/ui/sonner";

import appCss from "../styles.css?url";
import { reportClientError } from "../lib/error-reporting";

const SITE_DESCRIPTION =
  "Gramonnati Trust builds smart sanitation, circular-waste and livelihood infrastructure across India — run by women, war widows and ex-servicemen families. 12AA, 80G and CSR-1 registered.";

function NotFoundComponent() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center bg-paper px-5 py-20">
      <div className="max-w-md text-center">
        <p className="eyebrow">Error 404</p>
        <h1 className="display-face mt-4 text-4xl text-brand-strong sm:text-5xl">
          This page has moved on.
        </h1>
        <p className="mt-4 text-sm leading-relaxed text-ink-soft">
          The page you're looking for doesn't exist, or it has been renamed since you last saw it.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            to="/"
            className="inline-flex h-11 items-center justify-center rounded-full bg-brand px-6 text-sm font-extrabold text-primary-foreground transition-colors hover:bg-brand-strong"
          >
            Back to home
          </Link>
          <Link
            to="/programmes"
            className="inline-flex h-11 items-center justify-center rounded-full border border-brand/40 px-6 text-sm font-extrabold text-brand-strong transition-colors hover:bg-brand/10"
          >
            See our programmes
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportClientError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-[70vh] items-center justify-center bg-paper px-5 py-20">
      <div className="max-w-md text-center">
        <p className="eyebrow">Something went wrong</p>
        <h1 className="display-face mt-4 text-3xl text-brand-strong sm:text-4xl">
          This page didn't load.
        </h1>
        <p className="mt-4 text-sm leading-relaxed text-ink-soft">
          Try again in a moment. If it keeps happening, email us at info@gramonnati.org and we'll
          sort it out.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex h-11 items-center justify-center rounded-full bg-brand px-6 text-sm font-extrabold text-primary-foreground transition-colors hover:bg-brand-strong"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex h-11 items-center justify-center rounded-full border border-brand/40 px-6 text-sm font-extrabold text-brand-strong transition-colors hover:bg-brand/10"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Gramonnati Trust | Dignity, delivered" },
      { name: "description", content: SITE_DESCRIPTION },
      { name: "author", content: "Gramonnati Trust" },
      { name: "theme-color", content: "#1d5b4b" },
      { property: "og:site_name", content: "Gramonnati Trust" },
      { property: "og:title", content: "Gramonnati Trust | Dignity, delivered" },
      { property: "og:description", content: SITE_DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "en_IN" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Gramonnati Trust | Dignity, delivered" },
      { name: "twitter:description", content: SITE_DESCRIPTION },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=Manrope:wght@400;500;600;700;800&display=swap",
      },
      { rel: "icon", href: "/favicon.svg", type: "image/svg+xml" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en-IN">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

/**
 * A thin bar across the top while the router is resolving the next route. On a
 * fast local navigation it never gets a chance to show; on a slow one it stops
 * the click from feeling like nothing happened.
 */
function NavigationProgress() {
  const isPending = useRouterState({ select: (state) => state.status === "pending" });

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none fixed inset-x-0 top-0 z-[60] h-0.5 overflow-hidden transition-opacity duration-200 ${
        isPending ? "opacity-100" : "opacity-0"
      }`}
    >
      {isPending ? <div className="nav-progress h-full w-full bg-sun" /> : null}
    </div>
  );
}

/**
 * Smooth-scrolls in-page anchors. `scroll-behavior: smooth` can't be used
 * globally because the router's scroll-to-top on navigation would inherit it
 * and crawl up through the entire page.
 */
function useSmoothAnchors() {
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey) return;

      const anchor = (event.target as HTMLElement | null)?.closest?.('a[href^="#"]');
      if (!(anchor instanceof HTMLAnchorElement)) return;

      const id = anchor.getAttribute("href")?.slice(1);
      if (!id) return;
      const target = document.getElementById(id);
      if (!target) return;

      event.preventDefault();
      const reduced = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches === true;
      target.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" });
      window.history.replaceState(null, "", `#${id}`);
    };

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  // Remounting on pathname change replays the page entrance animation.
  const pathname = useRouterState({ select: (state) => state.location.pathname });

  useSmoothAnchors();

  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex min-h-screen flex-col overflow-x-hidden bg-paper text-foreground">
        <NavigationProgress />
        <SiteHeader />
        <main id="main" className="flex-1">
          {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
          <div key={pathname} className="page-enter">
            <Outlet />
          </div>
        </main>
        <SiteFooter />
        <BackToTop />
        <Toaster />
      </div>
    </QueryClientProvider>
  );
}
