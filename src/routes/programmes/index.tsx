import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";

import {
  GhostLink,
  PageHero,
  PrimaryLink,
  Section,
  SectionHeading,
} from "@/components/site/page-shell";
import { IndiaMap } from "@/components/site/india-map";
import heroImage from "@/assets/gt/tg_05_women_processing.jpg";
import { programmes } from "@/content/programmes";
import { missionPillars } from "@/content/site";

export const Route = createFileRoute("/programmes/")({
  head: () => ({
    meta: [
      { title: "Our Programmes | Gramonnati Trust" },
      {
        name: "description",
        content:
          "The Woloo Programme, Clean & Divine India, Travel Partnerships and Project Ravi Kiran — four frontlines of one mission: infrastructure that serves a real public need, built and run by women and veterans.",
      },
      { property: "og:title", content: "Our Programmes | Gramonnati Trust" },
    ],
  }),
  component: ProgrammesPage,
});

function ProgrammesPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Programmes" }]}
        eyebrow="Our programmes"
        title="One mission. Four frontlines."
        lede="Every Gramonnati programme shares one DNA: infrastructure that serves a real public need, built and run by women and veterans, measured transparently, and designed to become self-sustaining."
        image={heroImage}
        imageAlt="Local women washing and slicing fresh tomatoes at the Dichpally facility"
        actions={
          <>
            <PrimaryLink to="/partner">Partner with a programme</PrimaryLink>
            <GhostLink to="/impact">Impact & transparency</GhostLink>
          </>
        }
      />

      <Section tone="warm">
        <div className="grid gap-6 md:grid-cols-2">
          {programmes.map((programme) => (
            <Link
              key={programme.slug}
              to={programme.to}
              className="group flex flex-col overflow-hidden rounded-2xl border border-line-soft bg-paper transition-all duration-300 hover:-translate-y-1 hover:border-brand/40 hover:shadow-xl hover:shadow-brand-strong/10"
            >
              <div className="aspect-[16/9] overflow-hidden bg-mist/40">
                <img
                  src={programme.image}
                  alt={programme.imageAlt}
                  loading="lazy"
                  className="size-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="flex flex-1 flex-col p-6 sm:p-8">
                <div className="flex items-center justify-between gap-3">
                  <span className="eyebrow">{programme.eyebrow}</span>
                  <span className="rounded-full border border-sun/50 bg-sun/15 px-3 py-1 text-[0.6rem] font-extrabold uppercase tracking-[0.12em] text-brand-strong">
                    {programme.status}
                  </span>
                </div>
                <h2 className="display-face mt-4 text-2xl text-brand-strong sm:text-3xl">
                  {programme.name}
                </h2>
                <p className="mt-4 flex-1 leading-relaxed text-ink-soft">{programme.summary}</p>
                <span className="mt-7 inline-flex items-center gap-1 text-sm font-extrabold text-brand">
                  Learn more
                  <ArrowUpRight
                    aria-hidden="true"
                    className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </Section>

      <Section tone="paper">
        <SectionHeading
          eyebrow="How every programme is built"
          title="Five pillars each programme has to stand on."
          lede="Map any project — current or future — to these five, and you can see immediately what it does and how it will be held to account."
        />
        <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-line-soft bg-line-soft sm:grid-cols-2 lg:grid-cols-3">
          {missionPillars.map((pillar, index) => (
            <article key={pillar.id} className="bg-warm-white p-6 sm:p-7">
              <span className="display-face text-2xl text-sun">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="display-face mt-4 text-xl text-brand-strong">{pillar.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-ink-soft">{pillar.detail}</p>
            </article>
          ))}
          <div className="flex flex-col justify-center bg-brand p-6 sm:p-7">
            <h3 className="display-face text-xl text-sun">Want the detail?</h3>
            <p className="mt-3 text-sm leading-relaxed text-primary-foreground/75">
              Partnership tiers, unit economics and the transparency pack are all a conversation
              away.
            </p>
            <Link
              to="/partner"
              className="mt-5 inline-flex h-10 w-fit items-center gap-1 rounded-full bg-sun px-5 text-sm font-extrabold text-brand-strong transition-colors hover:bg-primary-foreground"
            >
              Partner with us <ArrowUpRight aria-hidden="true" className="size-4" />
            </Link>
          </div>
        </div>
      </Section>

      <Section tone="warm">
        <SectionHeading
          eyebrow="Where we work"
          title="Every site, past and planned."
          lede="Filter by status to see what has been delivered, what is launching now, and what is on the map next."
        />
        <div className="mt-12">
          <IndiaMap />
        </div>
      </Section>
    </>
  );
}
