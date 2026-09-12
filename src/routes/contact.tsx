import { createFileRoute } from "@tanstack/react-router";
import { Mail, MapPin, Phone, Globe } from "lucide-react";

import { EnquiryForm } from "@/components/site/enquiry-form";
import { PageHero, Section, SectionHeading } from "@/components/site/page-shell";
import jkLaunch from "@/assets/gt/jk_05_soft_launch.jpg";
import { enquiryInterests, type EnquiryInterest } from "@/lib/enquiries";
import { org, socials } from "@/content/site";

export const Route = createFileRoute("/contact")({
  // `?interest=` lets other pages deep-link into the form with the right option
  // preselected (e.g. the transparency-pack request on /impact).
  validateSearch: (search: Record<string, unknown>): { interest?: EnquiryInterest } => {
    const value = search["interest"];
    return typeof value === "string" && (enquiryInterests as readonly string[]).includes(value)
      ? { interest: value as EnquiryInterest }
      : {};
  },
  head: () => ({
    meta: [
      { title: "Contact Us | Gramonnati Trust" },
      {
        name: "description",
        content:
          "Exploring a CSR partnership, a crowdfunding contribution, a media enquiry or volunteering? Reach Gramonnati Trust at info@gramonnati.org, +91 80959 99776, or through the form.",
      },
      { property: "og:title", content: "Contact Gramonnati Trust" },
    ],
  }),
  component: ContactPage,
});

const channels = [
  {
    icon: Mail,
    label: "General enquiries",
    value: org.email,
    href: `mailto:${org.email}`,
  },
  {
    icon: Mail,
    label: "Partnerships & CSR",
    value: org.partnershipsEmail,
    href: `mailto:${org.partnershipsEmail}`,
  },
  {
    icon: Phone,
    label: "Phone",
    value: org.phone,
    href: `tel:${org.phoneHref}`,
  },
  {
    icon: Globe,
    label: "Website",
    value: org.website,
    href: `https://${org.website}`,
  },
];

function ContactPage() {
  const { interest } = Route.useSearch();

  return (
    <>
      <PageHero
        crumbs={[{ label: "Contact" }]}
        eyebrow="Contact us"
        title="Let's build this together."
        lede="Whether you're exploring a CSR partnership, a crowdfunding contribution, a media enquiry or volunteering — we'd love to hear from you."
        image={jkLaunch}
        imageAlt="The Gramonnati team at the Qazigund facility soft launch"
      />

      <Section tone="warm">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
          {/* Details ------------------------------------------------- */}
          <div className="lg:col-span-4">
            <SectionHeading eyebrow="Reach us" title="Four ways in." />

            <ul className="mt-8 divide-y divide-line-soft border-y border-line-soft">
              {channels.map((channel) => (
                <li key={channel.label} className="flex items-start gap-4 py-4">
                  <span className="mt-0.5 grid size-9 shrink-0 place-items-center rounded-lg bg-brand/10 text-brand">
                    <channel.icon aria-hidden="true" className="size-4" />
                  </span>
                  <div className="min-w-0">
                    <p className="text-[0.65rem] font-extrabold uppercase tracking-[0.12em] text-ink-soft">
                      {channel.label}
                    </p>
                    <a
                      href={channel.href}
                      target={channel.href.startsWith("http") ? "_blank" : undefined}
                      rel={channel.href.startsWith("http") ? "noreferrer noopener" : undefined}
                      className="mt-1 block break-words font-bold text-brand-strong transition-colors hover:text-brand"
                    >
                      {channel.value}
                    </a>
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-8 rounded-2xl border border-line-soft bg-paper p-6">
              <div className="flex items-start gap-3">
                <MapPin aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-brand" />
                <div>
                  <p className="text-[0.65rem] font-extrabold uppercase tracking-[0.12em] text-ink-soft">
                    Registered office
                  </p>
                  <address className="mt-2 not-italic leading-relaxed text-brand-strong">
                    {org.address.line1}
                    <br />
                    {org.address.line2}
                    <br />
                    {org.address.city}
                    <br />
                    {org.address.country}
                  </address>
                </div>
              </div>
              <a
                href="https://www.google.com/maps/search/?api=1&query=Papammal+Koil+Street+Kuruchikuppam+Puducherry+605012"
                target="_blank"
                rel="noreferrer noopener"
                className="mt-5 inline-flex h-10 items-center rounded-full border border-brand/40 px-5 text-sm font-extrabold text-brand-strong transition-colors hover:bg-brand/10"
              >
                Open in Maps
              </a>
            </div>

            <div className="mt-8">
              <p className="text-[0.65rem] font-extrabold uppercase tracking-[0.12em] text-ink-soft">
                Follow us
              </p>
              <ul className="mt-3 flex flex-wrap gap-2">
                {socials.map((social) => (
                  <li key={social.label}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="inline-flex rounded-full border border-line-soft bg-paper px-4 py-2 text-xs font-extrabold text-brand-strong transition-colors hover:border-brand/50 hover:text-brand"
                    >
                      {social.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Form ---------------------------------------------------- */}
          <div className="lg:col-span-8">
            <SectionHeading
              eyebrow="Send us a note"
              title="Tell us a little about you."
              lede="Six fields, and someone from the Trust comes back to you within two working days. You'll get a reference number as soon as it's in."
            />
            <EnquiryForm className="mt-8" defaultInterest={interest ?? "CSR Partnership"} />
          </div>
        </div>
      </Section>
    </>
  );
}
