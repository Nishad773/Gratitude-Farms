import { createFileRoute } from "@tanstack/react-router";
import { AlertCircle, Check } from "lucide-react";

import { StatGrid } from "@/components/site/counter";
import { LogoMarquee } from "@/components/site/logo-marquee";
import {
  GhostLink,
  PageHero,
  PrimaryLink,
  Section,
  SectionHeading,
  SolidLink,
} from "@/components/site/page-shell";
import powderRoomUnit from "@/assets/woloo/powder-room-unit.png";
import wolooEcosystemDiagram from "@/assets/woloo/woloo-ecosystem.png";
import sanitationImpact from "@/assets/woloo/sanitation-impact.png";
import powderRoomSpec from "@/assets/woloo/powder-room-spec.jpg";
import {
  gratitudeTiers,
  powderRoomFeatures,
  unitEconomics,
  wolooDeploymentSites,
  wolooEcosystem,
  wolooWorkforce,
} from "@/content/programmes";
import { wolooNetworkPartners } from "@/content/site";

export const Route = createFileRoute("/programmes/woloo")({
  head: () => ({
    meta: [
      { title: "The Woloo Programme | Gramonnati Trust" },
      {
        name: "description",
        content:
          "Smart, women-run sanitation coming to Bengaluru, Puducherry and Tamil Nadu's temple towns. ₹40 lakh builds one complete Powder Room — 500+ women served daily and 4 dignified jobs.",
      },
      { property: "og:title", content: "The Woloo Programme | Gramonnati Trust" },
    ],
  }),
  component: WolooPage,
});

const networkNumbers = [
  {
    value: "46",
    label: "Powder Rooms live across the Woloo network",
    note: "NHAI · Railways · Municipalities",
  },
  {
    value: "1,77,204",
    label: "Women walk-ins recorded in January 2026",
    note: "10x growth since April",
  },
  { value: "1,03,909", label: "Toilet hosts onboarded", note: "800 cities · 10,000 pincodes" },
  { value: "702", label: "Confirmed pipeline sites", note: "Petrol pumps · Railways · Tourism" },
];

const problemStats = [
  { value: "150", label: "Million+ women in India without safe toilet access" },
  { value: "12", label: "Million+ Bengaluru residents with near-zero hygienic public options" },
  {
    value: "53.8",
    label: "Billion USD lost annually to poor sanitation in India",
    note: "World Bank",
  },
];

const esgPoints = [
  "Schedule VII compliant (Companies Act 2013) — sanitation, health, women's empowerment, livelihood",
  "80G — 50% tax deduction on donations; CSR-1 registered for corporate CSR eligibility",
  "BRSR-ready impact reporting designed in from the start",
  "India CCTS-compatible MRV data and verifiable carbon credits per unit",
  "A live launch dashboard — site readiness, construction progress and go-live dates",
  "Annual CA-audited utilisation report with IRIS+ verified KPIs",
];

function WolooPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Programmes", to: "/programmes" }, { label: "The Woloo Programme" }]}
        eyebrow="Coming soon — Bengaluru first"
        title="Smart, women-run sanitation. Not a toilet — a transformation."
        lede="Gramonnati Trust has partnered with Woloo — India's smart-hygiene platform, featured on Shark Tank India 2022 — to bring dignified, technology-enabled sanitation to Bengaluru, Puducherry and Tamil Nadu's temple towns. Our first units launch shortly."
        image={powderRoomUnit}
        imageAlt="A Woloo Powder Room unit decorated for its opening day"
        actions={
          <>
            <PrimaryLink to="/partner">Be a founding partner</PrimaryLink>
            <GhostLink to="/contact">Get notified at launch</GhostLink>
          </>
        }
      />

      {/* Honesty note --------------------------------------------------- */}
      <Section tone="warm" innerClassName="py-10 sm:py-12 lg:py-12">
        <div className="flex gap-4 rounded-2xl border border-sun/50 bg-sun/10 p-5 sm:p-6">
          <AlertCircle aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-brand" />
          <p className="text-sm leading-relaxed text-brand-strong">
            <strong className="font-extrabold">Where this stands today.</strong> Gramonnati has not
            yet broken ground on its own Woloo units — and we are telling that story honestly. The
            numbers on this page marked “network” are Woloo's, proven across 46 operating units
            elsewhere in India. Our first project is about to come up in Bengaluru, and we are
            inviting partners to join at the ground floor.
          </p>
        </div>
      </Section>

      {/* The problem ---------------------------------------------------- */}
      <Section tone="paper">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionHeading
              eyebrow="The problem"
              title="India's sanitation crisis — and women pay the price."
            />
            <blockquote className="mt-7 border-l-4 border-sun pl-5 text-lg leading-relaxed text-brand-strong">
              “Every day, many women are forced to choose between their safety and their basic
              needs. That is not a personal problem. It is a public infrastructure failure.”
            </blockquote>
            <p className="mt-6 leading-relaxed text-ink-soft">
              Women reduce water intake, skip meals and avoid travel — all to manage sanitation
              deprivation.
            </p>
          </div>
          <div className="lg:col-span-7">
            <StatGrid stats={problemStats} columns={3} />
            <figure className="mt-6 overflow-hidden rounded-2xl border border-line-soft">
              <img
                src={sanitationImpact}
                alt="A photo collage of women and children with the message that improved sanitation transforms health, life expectancy, education and economic growth"
                loading="lazy"
                className="w-full"
              />
              <figcaption className="bg-warm-white px-5 py-3 text-xs leading-relaxed text-ink-soft">
                Sanitation is never only about sanitation — health, life expectancy, education and
                economic growth all move with it.
              </figcaption>
            </figure>
          </div>
        </div>
      </Section>

      {/* Ecosystem ------------------------------------------------------ */}
      <Section tone="brand">
        <SectionHeading
          inverted
          eyebrow="The Woloo ecosystem"
          title="India's only integrated smart-hygiene platform."
          lede="Six interconnected services — monitor, manage, monetise — that turn a public toilet into a viable, accountable piece of infrastructure."
        />
        <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-primary-foreground/20 bg-primary-foreground/20 sm:grid-cols-2 lg:grid-cols-3">
          {wolooEcosystem.map((item) => (
            <article key={item.code} className="bg-brand p-6 sm:p-7">
              <span className="inline-block rounded-lg bg-sun/20 px-2.5 py-1 text-xs font-extrabold tracking-wide text-sun">
                {item.code}
              </span>
              <h3 className="display-face mt-4 text-xl text-primary-foreground">{item.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-primary-foreground/75">
                {item.detail}
              </p>
            </article>
          ))}
        </div>
        <figure className="mt-10 overflow-hidden rounded-2xl border border-primary-foreground/20 bg-warm-white">
          <img
            src={wolooEcosystemDiagram}
            alt="Diagram of the six interconnected Woloo services arranged around a central platform"
            loading="lazy"
            className="w-full"
          />
        </figure>
      </Section>

      {/* The unit ------------------------------------------------------- */}
      <Section tone="warm">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionHeading
              eyebrow="The Powder Room"
              title="200 square feet that change a woman's day."
              lede="Solar-powered, IoT-monitored, SHG-operated — and designed to be somewhere a woman actually wants to stop."
            />
            <figure className="mt-8 overflow-hidden rounded-2xl border border-line-soft">
              <img
                src={powderRoomSpec}
                alt="Design renders and feature list for the Woloo Powder Room unit"
                loading="lazy"
                className="w-full"
              />
            </figure>
          </div>
          <div className="lg:col-span-7">
            <ul className="divide-y divide-line-soft border-y border-line-soft">
              {powderRoomFeatures.map((feature) => (
                <li key={feature.title} className="flex gap-4 py-5">
                  <Check aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-brand" />
                  <div>
                    <h3 className="font-extrabold text-brand-strong">{feature.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">{feature.detail}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* Proven at scale ------------------------------------------------ */}
      <Section tone="paper">
        <SectionHeading
          eyebrow="Proven at scale — network-wide"
          title="Beyond concept stage."
          lede="Government mandates, paying customers and physical infrastructure already operating across the Woloo network."
        />
        <StatGrid className="mt-12" stats={networkNumbers} />
        <p className="mt-8 text-xs font-extrabold uppercase tracking-[0.12em] text-ink-soft">
          Trusted by
        </p>
        <div className="mt-4">
          <LogoMarquee
            items={wolooNetworkPartners}
            label="Organisations working with the Woloo network"
          />
        </div>
      </Section>

      {/* Where we're headed --------------------------------------------- */}
      <Section tone="warm">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionHeading
              eyebrow="Where we're headed first"
              title="Bengaluru, then Puducherry and the temple towns."
            />
            <div className="mt-7 space-y-5 leading-relaxed text-ink-soft">
              <p>
                Bengaluru is our first city of deployment. Plans are underway to bring Woloo's smart
                Powder Rooms to the city's fuel retail outlets, transit hubs, religious sites and
                markets — closing a real, daily gap for working women, commuters and market-goers.
              </p>
              <p>
                Once Bengaluru starts, Gramonnati is planning a 100-unit deployment across
                Puducherry and Tamil Nadu's major temple towns — Madurai, Tirupati, Trichy,
                Rameswaram, Thanjavur, Chidambaram and Kanyakumari among them. The goal: prove a
                replicable model in Puducherry, then scale it as a template other Tier-II/III
                pilgrimage cities can adopt.
              </p>
            </div>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:col-span-7">
            {wolooDeploymentSites.map((site) => (
              <article
                key={site.number}
                className="rounded-2xl border border-line-soft bg-paper p-6"
              >
                <div className="flex items-baseline justify-between gap-3">
                  <span className="display-face text-2xl text-sun">{site.number}</span>
                  <span className="text-[0.6rem] font-extrabold uppercase tracking-[0.12em] text-brand">
                    {site.note}
                  </span>
                </div>
                <h3 className="display-face mt-4 text-xl text-brand-strong">{site.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-soft">{site.detail}</p>
              </article>
            ))}
          </div>
        </div>
      </Section>

      {/* Workforce ------------------------------------------------------ */}
      <Section tone="brand-strong">
        <SectionHeading
          inverted
          eyebrow="The force behind the mission"
          title="From defending the nation in uniform to serving it through Swachh Bharat."
          lede="Every unit under Gramonnati will be staffed by the people who have earned, and too rarely received, dignified employment — in partnership with AWPO and the Army Wives Welfare Association (AWWA)."
        />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {wolooWorkforce.map((role) => (
            <article
              key={role.role}
              className="flex flex-col rounded-2xl border border-primary-foreground/20 bg-brand p-6"
            >
              <span className="text-[0.6rem] font-extrabold uppercase tracking-[0.12em] text-sun">
                {role.ratio}
              </span>
              <h3 className="display-face mt-3 text-xl text-primary-foreground">{role.role}</h3>
              <p className="mt-2 text-xs font-bold text-sun/80">{role.profile}</p>
              <ul className="mt-5 space-y-2.5 text-sm leading-relaxed text-primary-foreground/70">
                {role.duties.map((duty) => (
                  <li key={duty} className="flex gap-2">
                    <span
                      aria-hidden="true"
                      className="mt-1.5 size-1.5 shrink-0 rounded-full bg-sun"
                    />
                    {duty}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
        <p className="mt-10 text-center text-lg text-primary-foreground/85">
          Your ₹40 lakh funds infrastructure. It also funds dignity — for those who already gave
          everything to this country. <span className="display-face text-sun">Jai Hind.</span>
        </p>
      </Section>

      {/* Unit economics ------------------------------------------------- */}
      <Section tone="paper">
        <SectionHeading
          eyebrow="What ₹40 lakh builds"
          title="One complete, operational Powder Room."
          lede="Serving 500+ women daily, creating 4 dignified jobs, generating carbon credits — and self-sustaining within 12 to 18 months."
        />
        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {unitEconomics.map((block) => (
            <article
              key={block.title}
              className="rounded-2xl border border-line-soft bg-warm-white p-6 sm:p-8"
            >
              <p className="display-face text-4xl text-brand">{block.amount}</p>
              <h3 className="mt-2 font-extrabold text-brand-strong">{block.title}</h3>
              <ul className="mt-5 space-y-3 text-sm leading-relaxed text-ink-soft">
                {block.items.map((item) => (
                  <li key={item} className="flex gap-2.5">
                    <Check aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-brand" />
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <div className="mt-12 overflow-x-auto rounded-2xl border border-line-soft">
          <table className="w-full min-w-[36rem] border-collapse bg-warm-white text-left text-sm">
            <caption className="sr-only">Gratitude Wall recognition tiers</caption>
            <thead>
              <tr className="bg-brand text-primary-foreground">
                <th scope="col" className="px-5 py-4 font-extrabold">
                  Tier
                </th>
                <th scope="col" className="px-5 py-4 font-extrabold">
                  Contribution
                </th>
                <th scope="col" className="px-5 py-4 font-extrabold">
                  Recognition
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line-soft">
              {gratitudeTiers.map((tier) => (
                <tr key={tier.tier}>
                  <th scope="row" className="px-5 py-4 align-top font-extrabold text-brand-strong">
                    {tier.tier}
                  </th>
                  <td className="whitespace-nowrap px-5 py-4 align-top font-bold text-brand">
                    {tier.amount}
                  </td>
                  <td className="px-5 py-4 align-top text-ink-soft">
                    <ul className="space-y-1.5">
                      {tier.benefits.map((benefit) => (
                        <li key={benefit} className="flex gap-2">
                          <Check aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-brand" />
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      {/* ESG ------------------------------------------------------------ */}
      <Section tone="warm">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionHeading
              eyebrow="Built for ESG & CSR reporting"
              title="Reporting-ready from day one."
              lede="Not retrofitted once a partner asks — designed into the programme before the first unit goes up."
            />
            <div className="mt-8 flex flex-wrap gap-3">
              <SolidLink to="/partner">Founding partner tiers</SolidLink>
            </div>
          </div>
          <ul className="grid gap-4 lg:col-span-7">
            {esgPoints.map((point) => (
              <li
                key={point}
                className="flex gap-3 rounded-xl border border-line-soft bg-paper px-5 py-4 text-sm leading-relaxed text-ink-soft"
              >
                <Check aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-brand" />
                {point}
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {/* Stay connected -------------------------------------------------- */}
      <Section tone="brand">
        <SectionHeading
          inverted
          align="center"
          eyebrow="Stay connected"
          title="Be first to know when our first unit goes live."
          lede="Register your interest as a founding partner. We'll share confirmed sites and timelines as the Bengaluru and Puducherry plans firm up."
        />
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <PrimaryLink to="/contact">Register your interest</PrimaryLink>
          <GhostLink to="/partner">See partnership tiers</GhostLink>
        </div>
      </Section>
    </>
  );
}
