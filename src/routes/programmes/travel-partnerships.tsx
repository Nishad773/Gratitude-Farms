import { createFileRoute } from "@tanstack/react-router";
import { Check } from "lucide-react";

import {
  GhostLink,
  PageHero,
  PrimaryLink,
  Section,
  SectionHeading,
} from "@/components/site/page-shell";
import livelihoodsImage from "@/assets/gramonnati-livelihoods.jpg";
import { travelPartnerGains, travelScenarios, travelSteps } from "@/content/programmes";

export const Route = createFileRoute("/programmes/travel-partnerships")({
  head: () => ({
    meta: [
      { title: "Travel Partnerships | Gramonnati Trust" },
      {
        name: "description",
        content:
          "A ready-to-integrate CSR partnership for OTAs, airlines and hospitality brands — embed the Clean & Divine India ₹10 Guilt-Free Travel contribution into your booking journey via a lightweight EPS API.",
      },
      { property: "og:title", content: "Travel Partnerships | Gramonnati Trust" },
    ],
  }),
  component: TravelPartnershipsPage,
});

const esgAlignment = [
  "Schedule VII (Companies Act, 2013) — sanitation, women's empowerment, health, livelihoods",
  "UN SDGs 3, 5, 6, 8, 11, 12 and 17",
  "Carbon and waste-diversion metrics from Pellet (RDF) units",
  "BRSR-ready ESG metrics generated automatically from real-world impact data",
];

function TravelPartnershipsPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Programmes", to: "/programmes" }, { label: "Travel Partnerships" }]}
        eyebrow="For OTAs, airlines & hospitality"
        title="Your platform. Our infrastructure. India's cleaner tomorrow."
        lede="A ready-to-integrate CSR partnership for India's leading travel platforms — turning every booking into a contribution toward sanitation and waste infrastructure at the destinations your customers visit."
        image={livelihoodsImage}
        imageAlt="Women working together at a rural collective"
        actions={
          <>
            <PrimaryLink to="/contact">Request the partnership deck</PrimaryLink>
            <GhostLink to="/contact">Schedule a call</GhostLink>
          </>
        }
      />

      {/* The ask -------------------------------------------------------- */}
      <Section tone="warm">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionHeading
              eyebrow="The ask"
              title="One line of integration. One line of impact."
            />
          </div>
          <div className="space-y-5 leading-relaxed text-ink-soft lg:col-span-7">
            <p>
              Gramonnati Trust invites MakeMyTrip — and other OTAs, airlines and hospitality brands
              — to integrate the Clean &amp; Divine India ₹10 Guilt-Free Travel contribution into
              the booking journey, through a lightweight EPS API integration.
            </p>
            <p>
              Alongside it, we invite partners to direct CSR funds toward Woloo Powder Room and
              Waste-to-Pellet units at high-footfall destinations across their customer base — so
              the infrastructure appears exactly where the platform's own travellers are going.
            </p>
            <p className="display-face text-2xl leading-snug text-brand">
              “Near-zero customer friction. Verifiable, audited spend. A story your customers will
              actually want to hear.”
            </p>
          </div>
        </div>
      </Section>

      {/* What partners gain ---------------------------------------------- */}
      <Section tone="paper">
        <SectionHeading
          eyebrow="What travel partners gain"
          title="Five things a CSR and brand team both want."
        />
        <ul className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-line-soft bg-line-soft sm:grid-cols-2 lg:grid-cols-3">
          {travelPartnerGains.map((gain, index) => (
            <li key={gain} className="bg-warm-white p-6 sm:p-7">
              <span className="display-face text-2xl text-sun">
                {String(index + 1).padStart(2, "0")}
              </span>
              <p className="mt-4 leading-relaxed text-brand-strong">{gain}</p>
            </li>
          ))}
          <li className="flex flex-col justify-center bg-brand p-6 sm:p-7">
            <h3 className="display-face text-xl text-sun">Want the numbers?</h3>
            <p className="mt-3 text-sm leading-relaxed text-primary-foreground/75">
              We'll model your booking volumes against the ₹10 mechanism and share a scenario table
              for your own platform.
            </p>
          </li>
        </ul>
      </Section>

      {/* Fund projections ------------------------------------------------ */}
      <Section tone="brand">
        <SectionHeading
          inverted
          eyebrow="Illustrative fund projections"
          title="What opt-in rates translate to."
          lede="Illustrative only — final figures are modelled against your confirmed booking volumes before anything is agreed."
        />
        <div className="mt-12 overflow-x-auto rounded-2xl border border-primary-foreground/20">
          <table className="w-full min-w-[36rem] border-collapse bg-brand-strong/40 text-left text-sm">
            <caption className="sr-only">
              Illustrative annual contribution by opt-in scenario
            </caption>
            <thead>
              <tr className="bg-brand-strong text-primary-foreground">
                <th scope="col" className="px-5 py-4 font-extrabold">
                  Scenario
                </th>
                <th scope="col" className="px-5 py-4 font-extrabold">
                  Assumed opt-in
                </th>
                <th scope="col" className="px-5 py-4 font-extrabold">
                  Illustrative annual contribution
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-primary-foreground/15">
              {travelScenarios.map((row) => (
                <tr key={row.scenario}>
                  <th scope="row" className="px-5 py-4 font-extrabold text-sun">
                    {row.scenario}
                  </th>
                  <td className="px-5 py-4 text-primary-foreground/75">{row.optIn}</td>
                  <td className="px-5 py-4 text-primary-foreground/90">{row.outcome}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      {/* Alignment ------------------------------------------------------- */}
      <Section tone="warm">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <SectionHeading
            eyebrow="Alignment with your ESG commitments"
            title="It maps onto the frameworks you already report against."
            className="lg:col-span-5"
          />
          <ul className="grid gap-4 lg:col-span-7">
            {esgAlignment.map((item) => (
              <li
                key={item}
                className="flex gap-3 rounded-xl border border-line-soft bg-paper px-5 py-4 text-sm leading-relaxed text-ink-soft"
              >
                <Check aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-brand" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {/* Get started ----------------------------------------------------- */}
      <Section tone="paper">
        <SectionHeading eyebrow="Get started" title="Four steps, no commitment at the first one." />
        <ol className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {travelSteps.map((step) => (
            <li key={step.step} className="rounded-2xl border border-line-soft bg-warm-white p-6">
              <span className="display-face text-3xl text-sun">{step.step}</span>
              <h3 className="display-face mt-4 text-xl text-brand-strong">{step.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-ink-soft">{step.detail}</p>
            </li>
          ))}
        </ol>
        <div className="mt-12 flex flex-wrap gap-3">
          <PrimaryLink to="/contact">Start the conversation</PrimaryLink>
          <GhostLink
            to="/programmes/clean-divine-india"
            className="border-brand/40 text-brand-strong hover:bg-brand/10 hover:text-brand-strong"
          >
            Read the Clean &amp; Divine India model
          </GhostLink>
        </div>
      </Section>
    </>
  );
}
