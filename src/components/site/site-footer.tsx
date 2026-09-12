import { Link } from "@tanstack/react-router";
import { Mail, MapPin, Phone } from "lucide-react";

import { credentials, navigation, org, socials } from "@/content/site";

import { BrandMark } from "./brand-mark";
import { NewsletterForm } from "./newsletter-form";

const programmeLinks = navigation.find((item) => item.to === "/programmes")?.children ?? [];

export function SiteFooter() {
  return (
    <footer className="bg-brand-strong text-primary-foreground">
      <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-16 lg:px-10">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-4">
            <div className="flex items-center gap-3">
              <BrandMark className="size-10" inverted />
              <div>
                <p className="display-face text-lg">Gramonnati Trust</p>
                <p className="mt-0.5 text-xs text-primary-foreground/60">Dignity, delivered.</p>
              </div>
            </div>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-primary-foreground/70">
              Smart sanitation, circular-waste and livelihood infrastructure across India — built
              and run by women, war widows and ex-servicemen families.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {credentials.slice(0, 3).map((item) => (
                <span
                  key={item.code}
                  className="rounded-full border border-primary-foreground/25 px-3 py-1 text-[0.65rem] font-extrabold uppercase tracking-[0.12em] text-primary-foreground/75"
                >
                  {item.code}
                </span>
              ))}
            </div>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:col-span-3 lg:grid-cols-2">
            <div>
              <p className="text-[0.65rem] font-extrabold uppercase tracking-[0.16em] text-sun">
                Explore
              </p>
              <ul className="mt-4 space-y-2.5 text-sm text-primary-foreground/70">
                {navigation
                  .filter((item) => item.to !== "/contact")
                  .map((item) => (
                    <li key={item.to}>
                      <Link
                        to={item.to}
                        className="transition-colors hover:text-primary-foreground"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
              </ul>
            </div>

            <div>
              <p className="text-[0.65rem] font-extrabold uppercase tracking-[0.16em] text-sun">
                Programmes
              </p>
              <ul className="mt-4 space-y-2.5 text-sm text-primary-foreground/70">
                {programmeLinks.map((item) => (
                  <li key={item.to}>
                    <Link to={item.to} className="transition-colors hover:text-primary-foreground">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:col-span-5">
            <div>
              <p className="text-[0.65rem] font-extrabold uppercase tracking-[0.16em] text-sun">
                Reach us
              </p>
              <ul className="mt-4 space-y-3 text-sm text-primary-foreground/70">
                <li className="flex gap-2.5">
                  <Mail aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-sun" />
                  <a
                    href={`mailto:${org.email}`}
                    className="break-all hover:text-primary-foreground"
                  >
                    {org.email}
                  </a>
                </li>
                <li className="flex gap-2.5">
                  <Phone aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-sun" />
                  <a href={`tel:${org.phoneHref}`} className="hover:text-primary-foreground">
                    {org.phone}
                  </a>
                </li>
                <li className="flex gap-2.5">
                  <MapPin aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-sun" />
                  <span>
                    {org.address.city}, {org.address.country}
                  </span>
                </li>
              </ul>
            </div>
            <div>
              <p className="text-[0.65rem] font-extrabold uppercase tracking-[0.16em] text-sun">
                Quarterly impact updates
              </p>
              <p className="mt-3 text-sm leading-relaxed text-primary-foreground/70">
                Launch news from Bengaluru and Puducherry, field stories and audited numbers. No
                more than four emails a year.
              </p>
              <div className="mt-4">
                <NewsletterForm />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-5 border-t border-primary-foreground/15 pt-6 lg:flex-row lg:items-center lg:justify-between">
          <p className="text-xs text-primary-foreground/50">
            © {new Date().getFullYear()} {org.name} · Registered under the Indian Trusts Act · PAN{" "}
            {org.pan} · CSR-1 {org.registrationCSR.split(" ")[0]}
          </p>
          <ul className="flex flex-wrap gap-x-5 gap-y-2 text-xs font-bold text-primary-foreground/60">
            {socials.map((social) => (
              <li key={social.label}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="transition-colors hover:text-primary-foreground"
                >
                  {social.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
