import { createFileRoute } from "@tanstack/react-router";
import { BadgeCheck } from "lucide-react";

import {
  GhostLink,
  PageHero,
  PrimaryLink,
  Section,
  SectionHeading,
  SolidLink,
} from "@/components/site/page-shell";
import heroImage from "@/assets/gramonnati-hero.jpg";
import { credentials, missionPillars, org, positioning, trustees } from "@/content/site";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us | Gramonnati Trust" },
      {
        name: "description",
        content:
          "Founded in Puducherry in 2017 by Maj. Ved Prakash Sharma (Retd.), Gramonnati Trust is a 12AA, 80G and CSR-1 registered public charitable trust. Our story, vision, mission, governance and trustees.",
      },
      { property: "og:title", content: "About Gramonnati Trust" },
    ],
  }),
  component: AboutPage,
});

const governance = [
  { label: "Founded", value: `${org.founded}, ${org.foundedPlace}, as a public charitable trust` },
  { label: "Founder & Chairman", value: org.founder },
  { label: "PAN", value: org.pan },
  { label: "12AA registration", value: org.registration12AA },
  { label: "80G certification", value: org.registration80G },
  { label: "CSR registration", value: org.registrationCSR },
  { label: "Area of operation", value: `${org.area}; legacy programmes in Jammu & Kashmir` },
  {
    label: "Audit",
    value: "Independent annual financial audit; financial year 1 April – 31 March",
  },
  {
    label: "Registered office",
    value: `${org.address.line1}, ${org.address.line2}, ${org.address.city}`,
  },
];

function AboutPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "About Us" }]}
        eyebrow="About the Trust"
        title="Rural India does not need charity. It needs capability."
        lede="That conviction has shaped every programme since 2017 — from a single Kendra in Jabalpur to a national sanitation and circular-waste movement."
        image={heroImage}
        imageAlt="A woman carrying a water pot walks a village path with schoolchildren"
        actions={
          <>
            <PrimaryLink to="/journey">Read our full journey</PrimaryLink>
            <GhostLink to="/partner">Partner with us</GhostLink>
          </>
        }
      />

      {/* Our story ------------------------------------------------------ */}
      <Section tone="warm">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <SectionHeading
              eyebrow="Our story"
              title="Two careers left behind, and a village-sized idea."
            />
          </div>
          <div className="space-y-5 leading-relaxed text-ink-soft lg:col-span-8">
            <p>
              Gramonnati Trust was founded on {org.founded} in {org.foundedPlace} by {org.founder}{" "}
              and a fellow Cisco Systems colleague, both leaving stable corporate careers to pursue
              social entrepreneurship. The mission they set themselves was audacious: develop 10,000
              rural entrepreneurs within five years.
            </p>
            <p>
              That mission first took root in the border districts of Rajouri and Poonch in Jammu &
              Kashmir — through digital classrooms, rainwater harvesting, and entrepreneurship
              training delivered in partnership with the Indian Army and TERI, New Delhi. Since
              2022, Gramonnati has evolved that same grassroots discipline into a new frontier:
              smart sanitation and circular-waste infrastructure through the Woloo Programme and
              Clean & Divine India — built, once again, by the people most often overlooked.
            </p>
            <p className="display-face text-2xl leading-snug text-brand">“{positioning.promise}”</p>
            <p>
              The pattern has held for eight years: start small and local — one Kendra, one
              rainwater tank — prove the model rigorously, then scale through partnership. Bengaluru
              and Puducherry are not isolated campaigns. They are the next chapter of a track
              record.
            </p>
          </div>
        </div>
      </Section>

      {/* Vision & mission ----------------------------------------------- */}
      <Section tone="brand">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <p className="eyebrow text-sun">Our vision</p>
            <p className="display-face mt-6 text-3xl leading-snug text-primary-foreground sm:text-4xl">
              “{positioning.vision}”
            </p>
            <div className="mt-8 rounded-2xl border border-primary-foreground/20 p-5">
              <p className="text-[0.65rem] font-extrabold uppercase tracking-[0.14em] text-sun">
                Our founding vision, 2017
              </p>
              <p className="mt-3 text-sm leading-relaxed text-primary-foreground/70">
                “{positioning.legacyVision}”
              </p>
            </div>
          </div>

          <div className="lg:col-span-7">
            <p className="eyebrow text-sun">Our mission — five pillars</p>
            <ol className="mt-6 divide-y divide-primary-foreground/15 border-y border-primary-foreground/15">
              {missionPillars.map((pillar, index) => (
                <li key={pillar.id} className="flex gap-5 py-6">
                  <span className="display-face text-2xl text-sun">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="display-face text-xl text-primary-foreground">{pillar.title}</h3>
                    <p className="mt-1 text-sm font-bold text-sun/80">{pillar.summary}</p>
                    <p className="mt-3 text-sm leading-relaxed text-primary-foreground/70">
                      {pillar.detail}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </Section>

      {/* Governance ------------------------------------------------------ */}
      <Section tone="paper">
        <SectionHeading
          eyebrow="Governance & credentials"
          title="The paperwork, in full."
          lede="The Trust is irrevocable, operates without profit motive, and applies its income solely to its charitable objects — no benefit accrues to any trustee or member."
        />

        <div className="mt-12 grid gap-10 lg:grid-cols-12 lg:gap-16">
          <dl className="divide-y divide-line-soft border-y border-line-soft lg:col-span-7">
            {governance.map((row) => (
              <div key={row.label} className="grid gap-1 py-4 sm:grid-cols-3 sm:gap-6">
                <dt className="text-xs font-extrabold uppercase tracking-[0.12em] text-ink-soft">
                  {row.label}
                </dt>
                <dd className="text-sm leading-relaxed text-brand-strong sm:col-span-2">
                  {row.value}
                </dd>
              </div>
            ))}
          </dl>

          <div className="lg:col-span-5">
            <div className="rounded-2xl border border-line-soft bg-warm-white p-6 sm:p-7">
              <h3 className="display-face text-xl text-brand-strong">Statutory compliance</h3>
              <ul className="mt-5 space-y-4">
                {credentials.map((item) => (
                  <li key={item.code} className="flex gap-3">
                    <BadgeCheck aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-brand" />
                    <div>
                      <p className="text-sm font-bold text-brand-strong">{item.title}</p>
                      <p className="mt-1 text-xs leading-relaxed text-ink-soft">{item.detail}</p>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="mt-7">
                <SolidLink to="/impact">Impact & transparency</SolidLink>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Trustees --------------------------------------------------------- */}
      <Section tone="warm">
        <SectionHeading
          eyebrow="Board of trustees"
          title="Military discipline, corporate depth, grassroots reach."
          lede="The Trust is governed by a Board of Trustees under the oversight of the Chairman and Managing Trustee."
        />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {trustees.map((trustee) => (
            <article
              key={trustee.name}
              className="rounded-2xl border border-line-soft bg-paper p-6"
            >
              <span className="display-face grid size-12 place-items-center rounded-full bg-brand text-lg text-primary-foreground">
                {trustee.initials}
              </span>
              <h3 className="display-face mt-5 text-xl text-brand-strong">{trustee.name}</h3>
              <p className="mt-1 text-xs font-extrabold uppercase tracking-[0.1em] text-brand">
                {trustee.role}
              </p>
              <p className="mt-4 text-sm leading-relaxed text-ink-soft">{trustee.bio}</p>
            </article>
          ))}
        </div>
      </Section>

      {/* CTA -------------------------------------------------------------- */}
      <Section tone="brand-strong">
        <div className="grid items-center gap-8 lg:grid-cols-12">
          <SectionHeading
            inverted
            eyebrow="Next step"
            title="Come and see it for yourself."
            lede="Field verification visits are available to CSR partners on request — and the full transparency pack is a single conversation away."
            className="lg:col-span-7"
          />
          <div className="flex flex-wrap gap-3 lg:col-span-5 lg:justify-end">
            <PrimaryLink to="/contact">Talk to the team</PrimaryLink>
            <GhostLink to="/partner">Partnership tiers</GhostLink>
          </div>
        </div>
      </Section>
    </>
  );
}
