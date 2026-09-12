import { createFileRoute, Link } from "@tanstack/react-router";
import { AlertCircle, Check, FileText } from "lucide-react";

import { StatGrid } from "@/components/site/counter";
import { IndiaMap } from "@/components/site/india-map";
import {
  GhostLink,
  PageHero,
  PrimaryLink,
  Section,
  SectionHeading,
} from "@/components/site/page-shell";
import tgAerial from "@/assets/gt/tg_06_aerial_drying_yard.jpg";
import { credentials, org } from "@/content/site";

export const Route = createFileRoute("/impact")({
  head: () => ({
    meta: [
      { title: "Impact & Transparency | Gramonnati Trust" },
      {
        name: "description",
        content:
          "See exactly where every rupee goes. Delivered outcomes since 2017, Woloo network numbers, SDG alignment, governance and audit, and a downloadable transparency pack for CSR due diligence.",
      },
      { property: "og:title", content: "Impact & Transparency | Gramonnati Trust" },
    ],
  }),
  component: ImpactPage,
});

const delivered = [
  { value: "8", label: "Years of continuous grassroots work since 2017" },
  {
    value: "5",
    label: "Rooftop rainwater-harvesting systems built in Rajouri-Poonch",
    note: "With TERI, New Delhi",
  },
  {
    value: "4",
    label: "Border-district schools reached by Vidya-Jyoti",
    note: "Two adopted the content fully",
  },
  { value: "20", label: "NCC cadets in the first Udyam cohort, Jabalpur", note: "January 2018" },
  { value: "20", label: "Sarpanches on the Mission Samriddhi Yatra", note: "Rajouri & Poonch" },
  { value: "2", label: "Project Ravi Kiran solar dehydration sites", note: "Qazigund & Dichpally" },
  { value: "45", label: "Rural women targeted for direct livelihood in Ravi Kiran year one" },
  { value: "41", label: "Solar dryers commissioned across both Ravi Kiran sites" },
];

const networkNumbers = [
  { value: "46", label: "Woloo units operational network-wide" },
  { value: "1,77,204", label: "Walk-ins served in January 2026" },
  { value: "1,03,909", label: "Hosts trained and onboarded" },
  { value: "702", label: "Units in the active pipeline" },
];

const sdgs = [
  { code: "SDG 1", name: "No poverty", focus: "Stable incomes for women operators and SHGs" },
  { code: "SDG 3", name: "Good health & well-being", focus: "Hygienic sanitation access" },
  { code: "SDG 4", name: "Quality education", focus: "Vidya-Jyoti digital classrooms" },
  { code: "SDG 5", name: "Gender equality", focus: "Women-led infrastructure and safety" },
  { code: "SDG 6", name: "Clean water & sanitation", focus: "Jal Sanchaya and Woloo" },
  {
    code: "SDG 8",
    name: "Decent work & economic growth",
    focus: "Formal jobs for women, veterans and war widows",
  },
  {
    code: "SDG 11",
    name: "Sustainable cities & communities",
    focus: "Smart, well-located public amenities",
  },
  {
    code: "SDG 12",
    name: "Responsible consumption",
    focus: "Waste-to-resource and solar dehydration",
  },
  { code: "SDG 17", name: "Partnerships for the goals", focus: "Army, TERI, Woloo, AWPO, NIIF" },
];

const governancePoints = [
  "Registered under the Indian Trusts Act — 12AA and 80G certified",
  "CSR-1 registered — eligible for corporate CSR funding under the Companies Act, 2013",
  "Annual independent financial audit; financial year 1 April – 31 March",
  "Field verification visits available on request for CSR partners",
  "BRSR-ready impact data for listed-company reporting",
  "IRIS+-aligned KPIs on every funded unit",
];

const transparencyPack = [
  { title: "Annual reports", detail: "FY2017-18, FY2018-19 and onward." },
  {
    title: "12AA / 80G / CSR-1 certificates",
    detail: "The full registration set for due diligence.",
  },
  { title: "Audited financial statements", detail: "CA-audited, most recent financial year." },
  { title: "Latest impact report", detail: "Programme-by-programme outcomes and utilisation." },
];

function ImpactPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Impact & Transparency" }]}
        eyebrow="Impact & transparency"
        title="See exactly where every rupee goes."
        lede="Real numbers, independent audits, and an honest line between what we have delivered and what is still ahead — because trust is earned, not claimed."
        image={tgAerial}
        imageAlt="Aerial view of rows of solar dryers at the Dichpally drying yard"
        actions={
          <>
            <PrimaryLink to="/contact">Request the transparency pack</PrimaryLink>
            <GhostLink to="/journey">Read the full journey</GhostLink>
          </>
        }
      />

      {/* Delivered ------------------------------------------------------ */}
      <Section tone="warm">
        <SectionHeading
          eyebrow="Delivered by Gramonnati Trust"
          title="What eight years actually produced."
          lede="Every figure below is from a programme the Trust ran directly — Udyam, Vidya-Jyoti, Jal Sanchaya, Sarpanch Yatra and Project Ravi Kiran."
        />
        <StatGrid className="mt-12" stats={delivered} />
      </Section>

      {/* Network numbers ------------------------------------------------ */}
      <Section tone="paper">
        <SectionHeading
          eyebrow="The Woloo network"
          title="The platform we're joining, by the numbers."
        />
        <div className="mt-8 flex gap-4 rounded-2xl border border-sun/50 bg-sun/10 p-5 sm:p-6">
          <AlertCircle aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-brand" />
          <p className="text-sm leading-relaxed text-brand-strong">
            <strong className="font-extrabold">Read these as context, not as our own.</strong> These
            are network-wide Woloo figures. Gramonnati's own units in Bengaluru and Puducherry have
            not yet broken ground — once they do, a live unit-level dashboard will replace this
            section with our own auto-refreshing footfall, revenue and employment data.
          </p>
        </div>
        <StatGrid className="mt-8" stats={networkNumbers} inverted={false} />
      </Section>

      {/* SDGs ----------------------------------------------------------- */}
      <Section tone="brand">
        <SectionHeading
          inverted
          eyebrow="Aligned with the UN Sustainable Development Goals"
          title="Nine goals, mapped programme by programme."
        />
        <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-primary-foreground/20 bg-primary-foreground/20 sm:grid-cols-2 lg:grid-cols-3">
          {sdgs.map((sdg) => (
            <article key={sdg.code} className="bg-brand p-6">
              <span className="display-face text-xl text-sun">{sdg.code}</span>
              <h3 className="mt-2 font-extrabold text-primary-foreground">{sdg.name}</h3>
              <p className="mt-2 text-sm leading-relaxed text-primary-foreground/70">{sdg.focus}</p>
            </article>
          ))}
        </div>
      </Section>

      {/* Governance ------------------------------------------------------ */}
      <Section tone="warm">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionHeading
              eyebrow="Governance, compliance & audit"
              title="Nothing here needs a follow-up email."
            />
            <ul className="mt-8 space-y-3">
              {governancePoints.map((point) => (
                <li key={point} className="flex gap-2.5 text-sm leading-relaxed text-ink-soft">
                  <Check aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-brand" />
                  {point}
                </li>
              ))}
            </ul>
            <dl className="mt-8 grid gap-3 text-xs text-ink-soft">
              <div>
                <dt className="inline font-extrabold text-brand-strong">PAN: </dt>
                <dd className="inline">{org.pan}</dd>
              </div>
              <div>
                <dt className="inline font-extrabold text-brand-strong">12AA: </dt>
                <dd className="inline">{org.registration12AA}</dd>
              </div>
              <div>
                <dt className="inline font-extrabold text-brand-strong">80G: </dt>
                <dd className="inline">{org.registration80G}</dd>
              </div>
              <div>
                <dt className="inline font-extrabold text-brand-strong">CSR-1: </dt>
                <dd className="inline">{org.registrationCSR}</dd>
              </div>
            </dl>
          </div>

          <div className="lg:col-span-7">
            <div className="rounded-2xl border border-line-soft bg-paper p-6 sm:p-8">
              <h3 className="display-face text-2xl text-brand-strong">The transparency pack</h3>
              <p className="mt-3 text-sm leading-relaxed text-ink-soft">
                Pre-packaged for CSR due-diligence teams. Tell us which documents you need and we'll
                send the pack across — usually the same working day.
              </p>
              <ul className="mt-7 divide-y divide-line-soft border-y border-line-soft">
                {transparencyPack.map((item) => (
                  <li key={item.title} className="flex items-start gap-4 py-4">
                    <FileText aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-brand" />
                    <div>
                      <p className="font-bold text-brand-strong">{item.title}</p>
                      <p className="mt-1 text-sm text-ink-soft">{item.detail}</p>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="mt-7 flex flex-wrap gap-3">
                <Link
                  to="/contact"
                  search={{ interest: "Transparency / due-diligence pack" }}
                  className="inline-flex h-11 items-center rounded-full bg-brand px-6 text-sm font-extrabold text-primary-foreground transition-colors hover:bg-brand-strong"
                >
                  Request the pack
                </Link>
                <a
                  href={`mailto:${org.partnershipsEmail}?subject=Transparency%20pack%20request`}
                  className="inline-flex h-11 items-center rounded-full border border-brand/40 px-6 text-sm font-extrabold text-brand-strong transition-colors hover:bg-brand/10"
                >
                  Email {org.partnershipsEmail}
                </a>
              </div>
            </div>

            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {credentials.map((item) => (
                <div
                  key={item.code}
                  className="rounded-xl border border-line-soft bg-paper px-5 py-4"
                >
                  <p className="display-face text-lg text-brand">{item.code}</p>
                  <p className="mt-1 text-xs leading-relaxed text-ink-soft">{item.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* Map ------------------------------------------------------------- */}
      <Section tone="paper">
        <SectionHeading
          eyebrow="Project locations"
          title="Everywhere the Trust has worked, or is about to."
        />
        <div className="mt-12">
          <IndiaMap />
        </div>
      </Section>
    </>
  );
}
