import { createFileRoute } from "@tanstack/react-router";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";

import { GhostLink, PageHero, PrimaryLink, Section } from "@/components/site/page-shell";
import tgPooja from "@/assets/gt/tg_04_soft_launch_pooja.jpg";
import { galleryCategories, galleryItems, type GalleryCategory } from "@/content/gallery";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Photo Gallery | Gramonnati Trust" },
      {
        name: "description",
        content:
          "Field photography from Project Ravi Kiran in Jammu & Kashmir and Telangana, the Gratitude Farms product range, the Woloo Powder Room, and the communities behind every programme.",
      },
      { property: "og:title", content: "Photo Gallery | Gramonnati Trust" },
    ],
  }),
  component: GalleryPage,
});

function GalleryPage() {
  const [category, setCategory] = useState<GalleryCategory>("all");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const visible = useMemo(
    () =>
      category === "all" ? galleryItems : galleryItems.filter((item) => item.category === category),
    [category],
  );

  const close = useCallback(() => setLightboxIndex(null), []);
  const step = useCallback(
    (delta: number) =>
      setLightboxIndex((current) =>
        current === null ? null : (current + delta + visible.length) % visible.length,
      ),
    [visible.length],
  );

  useEffect(() => {
    if (lightboxIndex === null) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
      if (event.key === "ArrowRight") step(1);
      if (event.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [lightboxIndex, close, step]);

  const active = lightboxIndex === null ? null : visible[lightboxIndex];

  return (
    <>
      <PageHero
        crumbs={[{ label: "Gallery" }]}
        eyebrow="Photo archive"
        title="The work, as it actually looked."
        lede="Field photography from Project Ravi Kiran in Jammu & Kashmir and Telangana, the Gratitude Farms product range, the Woloo Powder Room model, and the communities every programme exists for."
        image={tgPooja}
        imageAlt="A traditional pooja marking the start of operations at the Dichpally facility"
        actions={
          <>
            <PrimaryLink to="/programmes/ravi-kiran">The Ravi Kiran story</PrimaryLink>
            <GhostLink to="/journey">Our journey</GhostLink>
          </>
        }
      />

      <Section tone="warm">
        <div role="group" aria-label="Filter photos by programme" className="flex flex-wrap gap-2">
          {galleryCategories.map((item) => {
            const count =
              item.id === "all"
                ? galleryItems.length
                : galleryItems.filter((photo) => photo.category === item.id).length;
            return (
              <button
                key={item.id}
                type="button"
                data-filter={item.id}
                aria-pressed={category === item.id}
                onClick={() => {
                  setCategory(item.id);
                  setLightboxIndex(null);
                }}
                className={cn(
                  "rounded-full border px-4 py-2 text-xs font-extrabold uppercase tracking-[0.08em] transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0",
                  category === item.id
                    ? "border-brand bg-brand text-primary-foreground"
                    : "border-line-soft bg-paper text-ink-soft hover:border-brand/50 hover:text-brand",
                )}
              >
                {item.label}
                <span className="ml-2 opacity-60">{count}</span>
              </button>
            );
          })}
        </div>

        <div className="mt-10 grid items-start gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((item, index) => (
            <figure
              key={item.id}
              data-category={item.category}
              className="group flex flex-col overflow-hidden rounded-2xl border border-line-soft bg-paper transition-all duration-300 hover:-translate-y-1 hover:border-brand/40 hover:shadow-lg hover:shadow-brand-strong/10"
            >
              <button
                type="button"
                onClick={() => setLightboxIndex(index)}
                className="block overflow-hidden bg-mist/40 text-left"
                aria-label={`Open larger view: ${item.caption}`}
              >
                <img
                  src={item.src}
                  alt={item.alt}
                  loading="lazy"
                  className="aspect-[4/3] size-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </button>
              <figcaption className="flex flex-1 flex-col p-5">
                <p className="text-sm leading-relaxed text-brand-strong">{item.caption}</p>
                <p className="mt-3 text-[0.65rem] font-extrabold uppercase tracking-[0.12em] text-ink-soft">
                  {item.place}
                </p>
              </figcaption>
            </figure>
          ))}
        </div>

        {visible.length === 0 ? (
          <p className="mt-10 text-center text-sm text-ink-soft">
            No photographs in this category yet.
          </p>
        ) : null}
      </Section>

      {/* Lightbox -------------------------------------------------------- */}
      {active ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={active.caption}
          className="lightbox-enter fixed inset-0 z-[60] flex flex-col bg-brand-strong/95 p-4 backdrop-blur-sm sm:p-8"
          onClick={close}
        >
          <div className="flex justify-end">
            <button
              type="button"
              onClick={close}
              aria-label="Close"
              className="grid size-10 place-items-center rounded-full bg-primary-foreground/10 text-primary-foreground transition-colors hover:bg-primary-foreground/20"
            >
              <X aria-hidden="true" className="size-5" />
            </button>
          </div>

          <div
            className="flex min-h-0 flex-1 items-center gap-2 sm:gap-4"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => step(-1)}
              aria-label="Previous photo"
              className="grid size-10 shrink-0 place-items-center rounded-full bg-primary-foreground/10 text-primary-foreground transition-colors hover:bg-primary-foreground/20"
            >
              <ChevronLeft aria-hidden="true" className="size-5" />
            </button>

            <figure className="flex min-h-0 flex-1 flex-col items-center">
              <img
                key={active.id}
                src={active.src}
                alt={active.alt}
                className="lightbox-image max-h-[70vh] w-auto max-w-full rounded-xl object-contain"
              />
              <figcaption className="mt-4 max-w-2xl text-center text-sm leading-relaxed text-primary-foreground/85">
                {active.caption}
                <span className="mt-2 block text-[0.65rem] font-extrabold uppercase tracking-[0.12em] text-sun">
                  {active.place} · {lightboxIndex! + 1} of {visible.length}
                </span>
              </figcaption>
            </figure>

            <button
              type="button"
              onClick={() => step(1)}
              aria-label="Next photo"
              className="grid size-10 shrink-0 place-items-center rounded-full bg-primary-foreground/10 text-primary-foreground transition-colors hover:bg-primary-foreground/20"
            >
              <ChevronRight aria-hidden="true" className="size-5" />
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
}
