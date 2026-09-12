import { createFileRoute, Link } from "@tanstack/react-router";
import { Check, Heart, Plane, Users } from "lucide-react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  GhostLink,
  PageHero,
  PrimaryLink,
  Section,
  SectionHeading,
} from "@/components/site/page-shell";
import { EnquiryForm } from "@/components/site/enquiry-form";
import powderRoomUnit from "@/assets/woloo/powder-room-unit.png";
import { credentials, org } from "@/content/site";

export const Route = createFileRoute("/partner")({
  head: () => ({
    meta: [
      { title: "Partner With Us | Gramonnati Trust" },
      {
        name: "description",
        content:
          "CSR partnership tiers, travel-platform integration, individual giving and volunteering. Gramonnati Trust is CSR-1 registered, 12AA and 80G certified — Schedule VII eligible with 50% tax deduction.",
      },
      { property: "og:title", content: "Partner With Us | Gramonnati Trust" },
    ],
  }),
  component: PartnerPage,
});

const csrTiers = [
  {
    tier: "Mission Partner",
    amount: "₹25 Cr+",
    recognition: "National programme naming rights; flagship co-branding across the network",
  },
  {
    tier: "State Partner",
    amount: "₹5–25 Cr",
    recognition: "State or region-level naming rights; dedicated impact reporting",
  },
  {
    tier: "City / Title Partner",
    amount: "₹2–5 Cr",
    recognition: "Naming rights across a city cluster — for example Puducherry's 10 units",
  },
  {
    tier: "Zone / Unit Sponsor",
    amount: "₹25 L – 1 Cr",
    recognition: "Branding on specific units or zones",
  },
  {
    tier: "Community Partner",
    amount: "₹50 L – 2 Cr",
    recognition: "Gratitude Wall recognition and an ESG report feature",
  },
];

const individualTiers = [
  { amount: "₹40 Lakh+", recognition: "Naming rights on a complete Woloo unit" },
  {
    amount: "₹5 Lakh+",
    recognition: "Name engraved on the Gratitude Wall plus digital recognition",
  },
  { amount: "₹1 Lakh+", recognition: "Listed under Community Champions" },
];

const paths: {
  icon: typeof Users;
  title: string;
  detail: string;
  cta: { label: string; to?: string; href?: string };
}[] = [
  {
    icon: Users,
    title: "For corporates",
    detail:
      "CSR-1 registered, 12AA and 80G certified — every contribution is fully eligible under Schedule VII of the Companies Act, 2013, with 50% tax deduction under Section 80G.",
    cta: { label: "See CSR tiers", href: "#csr" },
  },
  {
    icon: Plane,
    title: "For travel & hospitality brands",
    detail:
      "Integrate the Clean & Divine India ₹10 Guilt-Free Travel contribution into your booking flow via our EPS API, and direct CSR funds to the destinations your customers visit.",
    cta: { label: "Travel partnerships", to: "/programmes/travel-partnerships" },
  },
  {
    icon: Heart,
    title: "For individuals",
    detail:
      "As Woloo units launch in Bengaluru and Puducherry, campaigns will run on FuelADream. Contributions of any size are acknowledged on the Gratitude Wall and eligible for an 80G tax receipt.",
    cta: { label: "See giving tiers", href: "#individuals" },
  },
];

const volunteering = [
  "Spread the word — follow and share our campaigns",
  "Corporate volunteering — team visits once units are operational",
  "Skilled volunteering — design, communications, data and impact-measurement support",
];

const faqs = [
  {
    q: "Is my contribution eligible for corporate CSR?",
    a: "Yes. Gramonnati Trust holds CSR-1 registration (CSR00017701) with the Ministry of Corporate Affairs, and the work falls under Schedule VII of the Companies Act, 2013 — sanitation, health, women's empowerment, rural development and environmental sustainability.",
  },
  {
    q: "What tax benefit do I get?",
    a: "Donors receive 50% deduction under Section 80G. The Trust's 80G certification is valid in perpetuity from A.Y. 2019-20. An 80G receipt is issued for every contribution, corporate or individual.",
  },
  {
    q: "How do I know the money was spent the way you said it would be?",
    a: "Three ways. An independent annual financial audit; field verification visits available to CSR partners on request; and — once units go live — a unit-level dashboard with footfall, revenue and employment data, plus a CA-audited utilisation report and IRIS+-verified KPIs.",
  },
  {
    q: "Are the Woloo units operating yet?",
    a: "Not under Gramonnati. Woloo has 46 units live elsewhere in its network, but our own first units in Bengaluru have not broken ground. We say so plainly on the programme page — founding partners come in before the first unit goes up, not after.",
  },
  {
    q: "Can we choose where our unit goes?",
    a: "Yes. Unit sponsors select a site, or let us recommend the highest-impact location from the confirmed pipeline. Site selection, naming rights, SDG mapping and the disbursement schedule are all agreed before anything is committed.",
  },
  {
    q: "What does a partnership actually start with?",
    a: "A conversation and a due-diligence pack — non-binding, no commitment. From there: site selection and a customised plan, then groundbreaking with live impact tracking from day one.",
  },
];

function PartnerPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Partner With Us" }]}
        eyebrow="Get involved"
        title="However you give, it builds dignity."
        lede="Whether you're a corporate CSR team, a travel platform, or an individual donor — there's a way to be part of this that fits you."
        image={powderRoomUnit}
        imageAlt="A Woloo Powder Room unit on its opening day"
        actions={
          <>
            <PrimaryLink href="#enquire">Start a conversation</PrimaryLink>
            <GhostLink to="/impact">See the transparency pack</GhostLink>
          </>
        }
      />

      {/* Three paths ---------------------------------------------------- */}
      <Section tone="warm">
        <div className="grid gap-5 lg:grid-cols-3">
          {paths.map((path) => (
            <article
              key={path.title}
              className="flex flex-col rounded-2xl border border-line-soft bg-paper p-6 sm:p-7"
            >
              <span className="grid size-11 place-items-center rounded-xl bg-brand/10 text-brand">
                <path.icon aria-hidden="true" className="size-5" />
              </span>
              <h2 className="display-face mt-5 text-2xl text-brand-strong">{path.title}</h2>
              <p className="mt-4 flex-1 text-sm leading-relaxed text-ink-soft">{path.detail}</p>
              {path.cta.to ? (
                <Link
                  to={path.cta.to}
                  className="mt-6 inline-flex h-10 w-fit items-center rounded-full border border-brand/40 px-5 text-sm font-extrabold text-brand-strong transition-colors hover:bg-brand/10"
                >
                  {path.cta.label}
                </Link>
              ) : (
                <a
                  href={path.cta.href}
                  className="mt-6 inline-flex h-10 w-fit items-center rounded-full border border-brand/40 px-5 text-sm font-extrabold text-brand-strong transition-colors hover:bg-brand/10"
                >
                  {path.cta.label}
                </a>
              )}
            </article>
          ))}
        </div>
      </Section>

      {/* CSR tiers ------------------------------------------------------- */}
      <Section tone="paper" id="csr">
        <SectionHeading
          eyebrow="For corporates — CSR partnerships"
          title="Five tiers, from a city cluster to a national programme."
          lede="Every tier includes 80G certification, CSR-1 documentation, BRSR-ready ESG data, IRIS+-aligned impact reporting and unit-level dashboards."
        />
        <div className="mt-12 overflow-x-auto rounded-2xl border border-line-soft">
          <table className="w-full min-w-[38rem] border-collapse bg-warm-white text-left text-sm">
            <caption className="sr-only">CSR partnership tiers and recognition</caption>
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
              {csrTiers.map((tier) => (
                <tr key={tier.tier}>
                  <th scope="row" className="px-5 py-4 align-top font-extrabold text-brand-strong">
                    {tier.tier}
                  </th>
                  <td className="whitespace-nowrap px-5 py-4 align-top font-bold text-brand">
                    {tier.amount}
                  </td>
                  <td className="px-5 py-4 align-top text-ink-soft">{tier.recognition}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      {/* Individuals ----------------------------------------------------- */}
      <Section tone="brand" id="individuals">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionHeading
              inverted
              eyebrow="For individuals"
              title="The Gratitude Wall."
              lede="Your contribution — large or small — is acknowledged on the Gratitude Wall and is eligible for an 80G tax receipt."
            />
          </div>
          <div className="lg:col-span-7">
            <ul className="divide-y divide-primary-foreground/15 border-y border-primary-foreground/15">
              {individualTiers.map((tier) => (
                <li
                  key={tier.amount}
                  className="flex flex-col gap-2 py-5 sm:flex-row sm:items-center sm:gap-8"
                >
                  <span className="display-face w-32 shrink-0 text-2xl text-sun">
                    {tier.amount}
                  </span>
                  <span className="text-primary-foreground/80">{tier.recognition}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8 rounded-2xl border border-primary-foreground/20 p-6">
              <h3 className="display-face text-xl text-sun">For volunteers & supporters</h3>
              <ul className="mt-4 space-y-2.5 text-sm text-primary-foreground/75">
                {volunteering.map((item) => (
                  <li key={item} className="flex gap-2.5">
                    <Check aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-sun" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Section>

      {/* Tax benefits ---------------------------------------------------- */}
      <Section tone="warm">
        <SectionHeading
          eyebrow="Tax benefits at a glance"
          title="The short version."
          align="center"
        />
        <div className="mx-auto mt-12 grid max-w-4xl gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {credentials.map((item) => (
            <div
              key={item.code}
              className="rounded-2xl border border-line-soft bg-paper p-6 text-center"
            >
              <p className="display-face text-3xl text-brand">{item.code}</p>
              <p className="mt-2 text-sm font-bold text-brand-strong">{item.title}</p>
              <p className="mt-2 text-xs leading-relaxed text-ink-soft">{item.detail}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* FAQ -------------------------------------------------------------- */}
      <Section tone="paper">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <SectionHeading
              eyebrow="Questions partners ask"
              title="The six that come up every time."
              lede={`Anything else — email ${org.partnershipsEmail} or call ${org.phone}.`}
            />
          </div>
          <div className="lg:col-span-8">
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={faq.q} value={`faq-${index}`} className="border-line-soft">
                  <AccordionTrigger className="text-left text-base font-bold text-brand-strong hover:no-underline">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm leading-relaxed text-ink-soft">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </Section>

      {/* Enquiry form ------------------------------------------------------ */}
      <Section tone="brand-strong" id="enquire">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionHeading
              inverted
              eyebrow="Start here"
              title="Tell us what you have in mind."
              lede="A budget range, a city, a timeline — or just a question. Someone from the Trust replies within two working days."
            />
            <dl className="mt-9 space-y-4 text-sm">
              <div>
                <dt className="text-[0.65rem] font-extrabold uppercase tracking-[0.14em] text-sun">
                  Partnerships & CSR
                </dt>
                <dd className="mt-1">
                  <a
                    href={`mailto:${org.partnershipsEmail}`}
                    className="text-primary-foreground/85 hover:text-sun"
                  >
                    {org.partnershipsEmail}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-[0.65rem] font-extrabold uppercase tracking-[0.14em] text-sun">
                  Phone
                </dt>
                <dd className="mt-1">
                  <a
                    href={`tel:${org.phoneHref}`}
                    className="text-primary-foreground/85 hover:text-sun"
                  >
                    {org.phone}
                  </a>
                </dd>
              </div>
            </dl>
          </div>
          <div className="lg:col-span-7">
            <EnquiryForm defaultInterest="CSR Partnership" />
          </div>
        </div>
      </Section>
    </>
  );
}
