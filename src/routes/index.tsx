import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowUpRight,
  BadgeCheck,
  Droplets,
  HandHeart,
  Recycle,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

import { CountUp, StatGrid } from "@/components/site/counter";
import { IndiaMap } from "@/components/site/india-map";
import { LogoMarquee } from "@/components/site/logo-marquee";
import {
  GhostLink,
  PrimaryLink,
  Section,
  SectionHeading,
  SolidLink,
} from "@/components/site/page-shell";
import heroCollage from "@/assets/gt/hero_collage.webp";
import { programmes } from "@/content/programmes";
import { credentials, org, partners, positioning } from "@/content/site";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Gramonnati Trust | Dignity, delivered" },
      {
        name: "description",
        content:
          "Smart sanitation, circular-waste and livelihood infrastructure across India — built and run by women, war widows and ex-servicemen families. 12AA, 80G and CSR-1 registered.",
      },
      { property: "og:title", content: "Gramonnati Trust | Dignity, delivered" },
    ],
  }),
  component: HomePage,
});

const heroStats = [
  { value: "8", suffix: "+ years", label: "on the ground since 2017" },
  { value: "46", suffix: "", label: "Woloo units live across the network" },
  { value: "1,03,909", suffix: "", label: "women & veterans engaged" },
  { value: "3", suffix: " registrations", label: "12AA · 80G · CSR-1" },
];

const pillars = [
  {
    icon: ShieldCheck,
    title: "Smart sanitation",
    copy: "Woloo Powder Rooms — clean toilets, a women's safe space, a café and IoT hygiene monitoring, at the places India needs them most.",
  },
  {
    icon: Recycle,
    title: "Circular economy",
    copy: "Waste-to-Pellet (RDF) units that turn tourist and urban waste into industrial fuel — and into revenue that funds the next unit.",
  },
  {
    icon: HandHeart,
    title: "Rural & women's livelihoods",
    copy: "Entrepreneurship, training and dignified employment for rural women, war widows and ex-servicemen families.",
  },
  {
    icon: Sparkles,
    title: "Technology & transparency",
    copy: "Live dashboards, audited reporting and BRSR/SDG-aligned data — so every rupee and every outcome is auditable.",
  },
];

const reasons = [
  {
    title: "Fully compliant",
    detail:
      "12AA, 80G and CSR-1 registered, and Schedule VII eligible — every contribution is tax-deductible and CSR-eligible.",
  },
  {
    title: "Eight years of delivery",
    detail:
      "From rainwater harvesting in the hills of Rajouri-Poonch to solar dehydration in Telangana — a track record, not a pitch.",
  },
  {
    title: "A workforce model worth telling",
    detail:
      "Retired women officers, war widows and SHG women run the infrastructure. Dignity is the product, not the by-product.",
  },
  {
    title: "Transparent by design",
    detail:
      "Independent annual audit, field verification on request, and dashboard-driven impact reporting from day one.",
  },
];

function HomePage() {
  return (
    <>
      {/* Hero ---------------------------------------------------------- */}
      <section className="relative isolate overflow-hidden bg-brand-strong text-primary-foreground">
        <img
          src={heroCollage}
          alt="A collage of Gramonnati field work — solar dryers, women processing produce, training sessions and sorting lines"
          className="hero-image absolute inset-0 size-full object-cover object-center opacity-55"
          width={1610}
          height={934}
          loading="eager"
          fetchPriority="high"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-r from-brand-strong via-brand-strong/85 to-brand-strong/30"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-b from-brand-strong/40 via-transparent to-brand-strong"
        />

        <div className="relative mx-auto max-w-7xl px-5 pb-14 pt-16 sm:px-8 sm:pb-20 sm:pt-24 lg:px-10 lg:pb-24 lg:pt-28">
          <p className="eyebrow text-sun">A public charitable trust since 2017</p>
          <h1 className="display-face mt-6 max-w-4xl text-4xl leading-[1.02] text-balance sm:text-6xl lg:text-7xl">
            Dignity, delivered. One Powder Room, one pellet plant, one self-reliant community at a
            time.
          </h1>
          <p className="mt-7 max-w-2xl text-base leading-relaxed text-primary-foreground/80 sm:text-lg">
            Gramonnati Trust builds smart sanitation, circular-waste and livelihood infrastructure
            across India — staffed by women, war widows and ex-servicemen families, and built for
            transparent CSR and crowdfunding partnership.
          </p>

          <div className="mt-9 flex flex-wrap gap-3">
            <PrimaryLink to="/partner">Partner with us</PrimaryLink>
            <GhostLink to="/programmes">Explore our programmes</GhostLink>
            <GhostLink to="/impact">See our impact</GhostLink>
          </div>

          <ul className="mt-10 flex flex-wrap gap-2">
            {credentials.map((item) => (
              <li
                key={item.code}
                className="flex items-center gap-1.5 rounded-full border border-primary-foreground/25 bg-primary-foreground/5 px-3.5 py-1.5 text-[0.66rem] font-extrabold uppercase tracking-[0.12em] text-primary-foreground/80"
              >
                <BadgeCheck aria-hidden="true" className="size-3.5 text-sun" />
                {item.code}
              </li>
            ))}
          </ul>
        </div>

        {/* Impact strip */}
        <div className="relative border-t border-primary-foreground/15 bg-brand-strong/80 backdrop-blur-sm">
          <dl className="mx-auto grid max-w-7xl grid-cols-2 gap-px bg-primary-foreground/10 px-5 sm:px-8 lg:grid-cols-4 lg:px-10">
            {heroStats.map((stat) => (
              <div key={stat.label} className="bg-brand-strong px-2 py-6 sm:px-5 sm:py-7">
                <dt className="sr-only">{stat.label}</dt>
                <dd>
                  <span className="display-face block text-3xl text-sun sm:text-4xl">
                    <CountUp value={stat.value} />
                    {stat.suffix}
                  </span>
                  <span className="mt-2 block text-[0.68rem] font-bold uppercase tracking-[0.1em] leading-snug text-primary-foreground/60">
                    {stat.label}
                  </span>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Positioning --------------------------------------------------- */}
      <Section tone="warm">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <p className="eyebrow">Who we are</p>
            <h2 className="display-face mt-5 text-3xl leading-tight text-brand-strong sm:text-4xl lg:text-[2.9rem]">
              Gramonnati means the rise of the village.
            </h2>
          </div>
          <div className="lg:col-span-7">
            <p className="display-face text-2xl leading-snug text-brand sm:text-[1.75rem]">
              “{positioning.promise}”
            </p>
            <p className="mt-6 max-w-2xl leading-relaxed text-ink-soft">
              Founded on {org.founded} in {org.foundedPlace} by {org.founder}, the Trust began with
              a single conviction: rural India does not need charity, it needs capability. That
              conviction took root in the border districts of Rajouri and Poonch — through digital
              classrooms, rainwater harvesting and entrepreneurship training with the Indian Army
              and TERI — and has since grown into a pan-India movement in sanitation, circular waste
              and dignified livelihoods.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <SolidLink to="/about">Read about the Trust</SolidLink>
              <Link
                to="/journey"
                className="inline-flex h-11 items-center gap-1 rounded-full border border-brand/30 px-6 text-sm font-extrabold text-brand-strong transition-colors hover:bg-brand/10"
              >
                Our journey, 2017 to today <ArrowUpRight aria-hidden="true" className="size-4" />
              </Link>
            </div>
          </div>
        </div>
      </Section>

      {/* Four pillars -------------------------------------------------- */}
      <Section tone="paper">
        <SectionHeading
          eyebrow="What we do"
          title="Four pillars, one operating discipline."
          lede="Identify a real, local problem. Build a simple, technology-enabled solution. Train and employ the community to run it. Measure the outcome honestly."
        />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {pillars.map((pillar) => (
            <article
              key={pillar.title}
              className="rounded-2xl border border-line-soft bg-warm-white p-6 transition-colors hover:border-brand/40"
            >
              <span className="grid size-11 place-items-center rounded-xl bg-brand/10 text-brand">
                <pillar.icon aria-hidden="true" className="size-5" />
              </span>
              <h3 className="display-face mt-5 text-xl text-brand-strong">{pillar.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-ink-soft">{pillar.copy}</p>
            </article>
          ))}
        </div>
      </Section>

      {/* Featured programmes ------------------------------------------- */}
      <Section tone="warm">
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeading
            eyebrow="Our programmes"
            title="One mission. Four frontlines."
            className="max-w-2xl"
          />
          <Link
            to="/programmes"
            className="inline-flex h-11 shrink-0 items-center gap-1 rounded-full border border-brand/30 px-6 text-sm font-extrabold text-brand-strong transition-colors hover:bg-brand/10"
          >
            All programmes <ArrowUpRight aria-hidden="true" className="size-4" />
          </Link>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2">
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
              <div className="flex flex-1 flex-col p-6 sm:p-7">
                <div className="flex items-center justify-between gap-3">
                  <span className="eyebrow">{programme.eyebrow}</span>
                  <span className="rounded-full border border-sun/50 bg-sun/15 px-3 py-1 text-[0.6rem] font-extrabold uppercase tracking-[0.12em] text-brand-strong">
                    {programme.status}
                  </span>
                </div>
                <h3 className="display-face mt-4 text-2xl text-brand-strong">{programme.name}</h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-soft">
                  {programme.summary}
                </p>
                <span className="mt-6 inline-flex items-center gap-1 text-sm font-extrabold text-brand">
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

      {/* Where we work ------------------------------------------------- */}
      <Section tone="paper">
        <SectionHeading
          eyebrow="Where we work"
          title="From the Pir Panjal to the Coromandel coast."
          lede="Every location below is a real project site — delivered, launching, or planned. Select a pin to see what happened there."
        />
        <div className="mt-12">
          <IndiaMap />
        </div>
      </Section>

      {/* Why partner --------------------------------------------------- */}
      <Section tone="brand">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionHeading
              inverted
              eyebrow="Why partner with Gramonnati"
              title="Credible on paper. Proven on the ground."
              lede="Everything a CSR due-diligence team asks for, ready before they ask."
            />
            <div className="mt-9">
              <PrimaryLink to="/partner">Start a partnership</PrimaryLink>
            </div>
          </div>
          <div className="grid gap-px overflow-hidden rounded-2xl border border-primary-foreground/20 bg-primary-foreground/20 sm:grid-cols-2 lg:col-span-7">
            {reasons.map((reason) => (
              <div key={reason.title} className="bg-brand p-6 sm:p-7">
                <h3 className="display-face text-xl text-sun">{reason.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-primary-foreground/75">
                  {reason.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Credentials --------------------------------------------------- */}
      <Section tone="warm">
        <SectionHeading
          eyebrow="Compliance at a glance"
          title="Registered, audited, and CSR-ready."
          align="center"
        />
        <StatGrid
          className="mt-12"
          stats={credentials.map((item) => ({
            value: item.code,
            label: item.title,
            note: item.detail,
          }))}
        />
        <p className="mt-6 text-center text-xs text-ink-soft">
          PAN {org.pan} · {org.registrationCSR} · Independent annual financial audit
        </p>
      </Section>

      {/* Recognition --------------------------------------------------- */}
      <Section tone="paper">
        <SectionHeading
          eyebrow="Recognition & network"
          title="We build with partners who stay."
          align="center"
          lede="Government programmes, research institutions, corporate CSR teams and platforms that have backed the work."
        />
        <div className="mt-10">
          <LogoMarquee items={partners} label="Gramonnati Trust partners" />
        </div>
      </Section>

      {/* Final CTA ----------------------------------------------------- */}
      <section className="bg-sun">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-16 sm:px-8 sm:py-20 lg:grid-cols-12 lg:items-center lg:px-10">
          <div className="lg:col-span-7">
            <p className="eyebrow text-brand-strong">Join the work</p>
            <h2 className="display-face mt-5 max-w-2xl text-3xl leading-tight text-brand-strong sm:text-5xl">
              Every contribution — ₹10 or ₹10 crore — builds dignity somewhere in India.
            </h2>
            <p className="mt-5 max-w-xl leading-relaxed text-brand-strong/75">
              Whether you bring a CSR budget, a booking platform, a team pool or an afternoon a
              month, there is a place for you in this.
            </p>
          </div>
          <div className="flex flex-col gap-3 lg:col-span-4 lg:col-start-9">
            <SolidLink to="/partner">Become a CSR partner</SolidLink>
            <Link
              to="/contact"
              className="inline-flex h-11 items-center justify-center gap-1 rounded-full border border-brand-strong/30 px-6 text-sm font-extrabold text-brand-strong transition-colors hover:bg-brand-strong/10"
            >
              Talk to the team <ArrowUpRight aria-hidden="true" className="size-4" />
            </Link>
            <Link
              to="/impact"
              className="inline-flex h-11 items-center justify-center gap-1 rounded-full border border-brand-strong/30 px-6 text-sm font-extrabold text-brand-strong transition-colors hover:bg-brand-strong/10"
            >
              <Droplets aria-hidden="true" className="size-4" /> See the numbers
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
