import { createFileRoute } from "@tanstack/react-router";
import { Check, IndianRupee, QrCode, Ticket } from "lucide-react";

import { StatGrid } from "@/components/site/counter";
import {
  GhostLink,
  PageHero,
  PrimaryLink,
  Section,
  SectionHeading,
} from "@/components/site/page-shell";
import climateImage from "@/assets/gramonnati-climate.jpg";
import powderRoomUnit from "@/assets/woloo/powder-room-unit.png";
import { cleanDividePillars, cleanDivineRoadmap, cleanDivineStats } from "@/content/programmes";

export const Route = createFileRoute("/programmes/clean-divine-india")({
  head: () => ({
    meta: [
      { title: "Clean & Divine India — Guilt-Free Travel | Gramonnati Trust" },
      {
        name: "description",
        content:
          "A ₹10 contribution at checkout, turned into sanitation and waste-to-resource infrastructure at India's most-visited destinations. Aligned with Swachh Bharat 2.0 and UN SDGs 3, 5, 6, 8, 11, 12 and 17.",
      },
      { property: "og:title", content: "Clean & Divine India | Gramonnati Trust" },
    ],
  }),
  component: CleanDivinePage,
});

const mechanism = [
  {
    icon: Ticket,
    step: "At checkout",
    detail:
      "A traveller booking a flight, hotel or holiday is offered a ₹10 'Guilt-Free Travel' contribution — opt-in or opt-out, embedded through a simple EPS API.",
  },
  {
    icon: IndianRupee,
    step: "Tagged to a destination",
    detail:
      "The contribution is tagged to the destination being booked, so funds flow to the place that traveller is about to visit.",
  },
  {
    icon: QrCode,
    step: "Visible on the ground",
    detail:
      "A QR-coded live impact dashboard at each funded site shows what was built, who runs it, and how many people it has served.",
  },
];

const alignment = [
  "Swachh Bharat Mission 2.0 — sanitation and waste management at scale",
  "The PRASHAD pilgrimage infrastructure scheme",
  "EPR plastic-waste rules and the National Tourism Policy 2022",
  "UN SDGs 3, 5, 6, 8, 11, 12 and 17",
  "ESG/BRSR reporting for travel-sector corporates",
];

const whyPartners = [
  "Near-zero customer friction — a ₹10 opt-in, seamlessly embedded at checkout",
  "Tangible, location-linked impact your customers can see and feel proud of",
  "Ready-made ESG/CSR storytelling for your brand and investor reporting",
  "A live dashboard showing funds raised, units built, and people served",
];

function CleanDivinePage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Programmes", to: "/programmes" }, { label: "Clean & Divine India" }]}
        eyebrow="The Guilt-Free Travel initiative"
        title="Travel guilt-free. Leave India cleaner than you found it."
        lede="For every traveller, a contribution of just ₹10 funds real sanitation and waste-management infrastructure at the destinations India's tourists love most."
        image={climateImage}
        imageAlt="A community gathering beside a village water body"
        actions={
          <>
            <PrimaryLink to="/programmes/travel-partnerships">
              Partner your travel brand
            </PrimaryLink>
            <GhostLink href="#mechanism">Learn the ₹10 model</GhostLink>
          </>
        }
      />

      {/* The problem ---------------------------------------------------- */}
      <Section tone="warm">
        <SectionHeading
          eyebrow="The problem we're solving"
          title="India's tourism-waste nexus."
          lede="India welcomes over 1.44 billion domestic and international pilgrim and leisure visits a year — yet more than 60% of high-footfall tourist and religious sites lack adequate sanitation and waste-management infrastructure. The result damages India's heritage sites, its public health, and its global image."
        />
        <StatGrid className="mt-12" stats={cleanDivineStats} />
      </Section>

      {/* Two pillars ---------------------------------------------------- */}
      <Section tone="paper">
        <SectionHeading
          eyebrow="Two pillars"
          title="Dignity at one end. Circularity at the other."
          lede="Every funded destination gets both — a Powder Room that serves people, and a pellet plant that pays for the operation."
        />
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {cleanDividePillars.map((pillar) => (
            <article
              key={pillar.number}
              className="flex flex-col overflow-hidden rounded-2xl border border-line-soft bg-warm-white"
            >
              <div className="p-6 sm:p-8">
                <span className="eyebrow">{pillar.number}</span>
                <h3 className="display-face mt-4 text-2xl text-brand-strong">{pillar.title}</h3>
                <p className="mt-4 leading-relaxed text-ink-soft">{pillar.detail}</p>
              </div>
            </article>
          ))}
        </div>

        <figure className="mt-10 grid gap-6 rounded-2xl border border-line-soft bg-warm-white p-6 sm:grid-cols-5 sm:p-8">
          <div className="overflow-hidden rounded-xl sm:col-span-2">
            <img
              src={powderRoomUnit}
              alt="A Woloo Powder Room unit on its opening day"
              loading="lazy"
              className="size-full object-cover"
            />
          </div>
          <figcaption className="sm:col-span-3">
            <h3 className="display-face text-xl text-brand-strong">
              What a funded site looks like
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-ink-soft">
              Unit A is a Woloo Powder Room — a smart sanitation facility, women-operated, at
              ₹25,00,000 to build and ₹15,00,000 a year to run until it is self-sustaining. Unit B
              is a Waste-to-Pellet (RDF) plant that converts local waste into refuse-derived fuel
              sold to industry. Both are operated entirely by war widows and ex-servicemen.
            </p>
          </figcaption>
        </figure>
      </Section>

      {/* The mechanism --------------------------------------------------- */}
      <Section tone="brand" id="mechanism">
        <SectionHeading
          inverted
          eyebrow="The ₹10 mechanism"
          title="Small enough to say yes to. Large enough to build with."
          lede="Built for integration with online travel agents, airlines, hotels and booking platforms via a simple EPS API. At scale, even modest adoption rates generate substantial, predictable funding."
        />
        <ol className="mt-12 grid gap-5 md:grid-cols-3">
          {mechanism.map((item, index) => (
            <li
              key={item.step}
              className="rounded-2xl border border-primary-foreground/20 bg-brand-strong/40 p-6"
            >
              <div className="flex items-center justify-between">
                <span className="grid size-11 place-items-center rounded-xl bg-sun/20 text-sun">
                  <item.icon aria-hidden="true" className="size-5" />
                </span>
                <span className="display-face text-2xl text-sun/60">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>
              <h3 className="display-face mt-5 text-xl text-primary-foreground">{item.step}</h3>
              <p className="mt-3 text-sm leading-relaxed text-primary-foreground/75">
                {item.detail}
              </p>
            </li>
          ))}
        </ol>

        <div className="mt-10 rounded-2xl border border-sun/40 bg-sun/10 p-6 sm:p-8">
          <p className="text-sm font-extrabold uppercase tracking-[0.12em] text-sun">
            At moderate uptake
          </p>
          <p className="mt-4 text-lg leading-relaxed text-primary-foreground/90">
            A 20% opt-in on roughly 50 million annual transactions on a single large platform
            unlocks a <strong className="text-sun">₹10 crore-a-year Clean Destination Fund</strong>{" "}
            — enough for 6 pellet plants and 33 Powder Rooms, creating 120+ ex-servicemen jobs and
            around 100 war-widow livelihoods.
          </p>
        </div>
      </Section>

      {/* Roadmap --------------------------------------------------------- */}
      <Section tone="warm">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionHeading eyebrow="Implementation roadmap" title="Pilot. Scale. Sustain." />
            <ul className="mt-8 space-y-3">
              {alignment.map((item) => (
                <li key={item} className="flex gap-2.5 text-sm leading-relaxed text-ink-soft">
                  <Check aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-brand" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <ol className="divide-y divide-line-soft border-y border-line-soft lg:col-span-7">
            {cleanDivineRoadmap.map((phase) => (
              <li key={phase.phase} className="py-6">
                <h3 className="display-face text-xl text-brand-strong sm:text-2xl">
                  {phase.phase}
                </h3>
                <p className="mt-3 leading-relaxed text-ink-soft">{phase.focus}</p>
              </li>
            ))}
          </ol>
        </div>
      </Section>

      {/* Why partners choose --------------------------------------------- */}
      <Section tone="brand-strong">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <SectionHeading
            inverted
            eyebrow="Why travel partners choose this"
            title="A sustainability feature that lives inside the product."
            className="lg:col-span-5"
          />
          <ul className="grid gap-4 lg:col-span-7">
            {whyPartners.map((item) => (
              <li
                key={item}
                className="flex gap-3 rounded-xl border border-primary-foreground/15 bg-brand/40 px-5 py-4 text-sm leading-relaxed text-primary-foreground/80"
              >
                <Check aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-sun" />
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-12 flex flex-wrap gap-3">
          <PrimaryLink to="/programmes/travel-partnerships">See the partnership model</PrimaryLink>
          <GhostLink to="/contact">Request the deck</GhostLink>
        </div>
      </Section>
    </>
  );
}
