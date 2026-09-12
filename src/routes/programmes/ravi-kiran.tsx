import { createFileRoute } from "@tanstack/react-router";
import { Sun } from "lucide-react";

import { StatGrid } from "@/components/site/counter";
import {
  GhostLink,
  PageHero,
  PrimaryLink,
  Section,
  SectionHeading,
} from "@/components/site/page-shell";
import gingerPowder from "@/assets/gt/product_ginger_powder.jpg";
import turmericPowder from "@/assets/gt/product_turmeric_powder.jpg";
import {
  ravikiranHero,
  ravikiranProcess,
  ravikiranSites,
  ravikiranStats,
  ravikiranTimeline,
} from "@/content/programmes";
import { galleryItems } from "@/content/gallery";

export const Route = createFileRoute("/programmes/ravi-kiran")({
  head: () => ({
    meta: [
      { title: "Project Ravi Kiran (2022–2023) | Gramonnati Trust" },
      {
        name: "description",
        content:
          "A CSR-funded solar dehydration initiative with NIIF and Athaang that gave rural women in Jammu & Kashmir and Telangana a zero-energy-cost livelihood — while rescuing tonnes of produce from waste.",
      },
      { property: "og:title", content: "Project Ravi Kiran | Gramonnati Trust" },
    ],
  }),
  component: RaviKiranPage,
});

const jkPhotos = galleryItems.filter((item) => item.category === "ravi-kiran-jk");
const tgPhotos = galleryItems.filter(
  (item) => item.category === "ravi-kiran-tg" && item.id !== "tray-loading",
);

function RaviKiranPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Programmes", to: "/programmes" }, { label: "Project Ravi Kiran" }]}
        eyebrow="Our journey · Past project (2022–2023)"
        title="Turning sunlight and surplus harvest into livelihoods for rural women."
        lede="A CSR-funded solar dehydration initiative that gave rural women in Jammu & Kashmir and Telangana a dignified, zero-energy-cost livelihood — while rescuing tonnes of fruit and vegetables that would otherwise have gone to waste."
        image={ravikiranHero.image}
        imageAlt={ravikiranHero.alt}
        actions={
          <>
            <PrimaryLink to="/programmes">See what we're building now</PrimaryLink>
            <GhostLink to="/gallery">Full photo archive</GhostLink>
          </>
        }
      >
        <dl className="mt-10 grid grid-cols-2 gap-x-6 gap-y-4 border-t border-primary-foreground/20 pt-6 sm:grid-cols-4">
          {[
            ["Locations", "Qazigund, J&K · Dichpally, Telangana"],
            ["Timeline", "Aug 2022 – May 2023"],
            ["CSR Partner", "NIIF / Athaang"],
            ["Brand", "Gratitude Farms"],
          ].map(([label, value]) => (
            <div key={label}>
              <dt className="text-[0.6rem] font-extrabold uppercase tracking-[0.14em] text-sun">
                {label}
              </dt>
              <dd className="mt-1.5 text-sm leading-snug text-primary-foreground/85">{value}</dd>
            </div>
          ))}
        </dl>
      </PageHero>

      <Section tone="warm">
        <StatGrid stats={ravikiranStats} />
      </Section>

      {/* The problem ---------------------------------------------------- */}
      <Section tone="paper">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionHeading
              eyebrow="The problem we set out to solve"
              title="35–40% of India's fruits and vegetables never reach a consumer."
            />
          </div>
          <div className="space-y-5 leading-relaxed text-ink-soft lg:col-span-7">
            <p>
              Across rural India, large quantities of fruit, vegetables and herbs perish every
              season for want of basic preserving, processing and marketing infrastructure — rotting
              in fields, in transit, or in unsold market stock. As that food waste decomposes, it
              releases methane, a greenhouse gas nearly 23 times more potent than CO₂.
            </p>
            <p>
              Project Ravi Kiran was Gramonnati Trust's answer, built around a simple, elegant
              technology: solar dehydration. On an average day, sunlight delivers roughly 1,367
              watts of heat energy per square metre. By drawing warm, dry air across the surface of
              fruits and vegetables, a solar dryer removes 80–90% of their moisture at an ambient
              55–65°C — with zero electricity, zero fuel and zero emissions.
            </p>
            <p className="flex gap-3 rounded-2xl border border-sun/50 bg-sun/10 p-5 text-brand-strong">
              <Sun aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-brand" />
              The result: nutritious, shelf-stable dried produce — and a sustainable livelihood for
              the rural women who run the drying units.
            </p>
          </div>
        </div>
      </Section>

      {/* Two sites ------------------------------------------------------- */}
      <Section tone="brand">
        <SectionHeading
          inverted
          eyebrow="Where we worked"
          title="Two sites, one model."
          lede="Backed by CSR funding from NIIF through its implementation partner Athaang, the Trust signed its MoU on 3 August 2022 and set up solar drying facilities at two very different ends of the country."
        />
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {ravikiranSites.map((site) => (
            <article
              key={site.place}
              className="rounded-2xl border border-primary-foreground/20 bg-brand-strong/40 p-6 sm:p-8"
            >
              <h3 className="display-face text-2xl text-sun">{site.place}</h3>
              <p className="mt-2 text-sm text-primary-foreground/70">{site.where}</p>
              <ul className="mt-6 space-y-3 text-sm leading-relaxed text-primary-foreground/80">
                {site.facts.map((fact) => (
                  <li key={fact} className="flex gap-2.5">
                    <span
                      aria-hidden="true"
                      className="mt-2 size-1.5 shrink-0 rounded-full bg-sun"
                    />
                    {fact}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </Section>

      {/* How it works ---------------------------------------------------- */}
      <Section tone="warm">
        <SectionHeading
          eyebrow="How it works"
          title="From surplus harvest to shelf-stable product."
          lede="Every site ran the same end-to-end value chain — designed so that local women, once trained, could operate and maintain the equipment themselves."
        />
        <ol className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-line-soft bg-line-soft sm:grid-cols-2 lg:grid-cols-3">
          {ravikiranProcess.map((step) => (
            <li key={step.step} className="bg-paper p-6 sm:p-7">
              <span className="display-face text-2xl text-sun">{step.step}</span>
              <h3 className="display-face mt-3 text-xl text-brand-strong">{step.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-ink-soft">{step.detail}</p>
            </li>
          ))}
        </ol>
      </Section>

      {/* J&K photo story ------------------------------------------------- */}
      <Section tone="paper">
        <SectionHeading
          eyebrow="The journey in photos — part 1"
          title="Qazigund, Jammu & Kashmir"
        />
        <div className="mt-10 grid gap-10 lg:grid-cols-12 lg:gap-16">
          <ol className="relative space-y-6 border-l-2 border-line-soft pl-7 lg:col-span-4">
            {ravikiranTimeline.jk.map((entry) => (
              <li key={entry.when} className="relative">
                <span
                  aria-hidden="true"
                  className="absolute -left-[2.15rem] top-1.5 size-3.5 rounded-full border-2 border-sun bg-paper"
                />
                <p className="text-xs font-extrabold uppercase tracking-[0.12em] text-brand">
                  {entry.when}
                </p>
                <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">{entry.what}</p>
              </li>
            ))}
          </ol>

          <div className="grid gap-5 sm:grid-cols-2 lg:col-span-8">
            {jkPhotos.map((photo) => (
              <figure
                key={photo.id}
                className={photo.orientation === "wide" ? "sm:col-span-2" : undefined}
              >
                <div className="overflow-hidden rounded-2xl border border-line-soft bg-mist/40">
                  <img
                    src={photo.src}
                    alt={photo.alt}
                    loading="lazy"
                    className={
                      photo.orientation === "wide"
                        ? "aspect-[16/9] size-full object-cover"
                        : "aspect-[4/3] size-full object-cover"
                    }
                  />
                </div>
                <figcaption className="mt-3 text-xs leading-relaxed text-ink-soft">
                  {photo.caption}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </Section>

      {/* Telangana photo story ------------------------------------------- */}
      <Section tone="warm">
        <SectionHeading
          eyebrow="The journey in photos — part 2"
          title="Dichpally & Nizamabad, Telangana"
        />
        <div className="mt-10 grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="order-2 grid gap-5 sm:grid-cols-2 lg:order-1 lg:col-span-8">
            {tgPhotos.map((photo) => (
              <figure
                key={photo.id}
                className={photo.orientation === "wide" ? "sm:col-span-2" : undefined}
              >
                <div className="overflow-hidden rounded-2xl border border-line-soft bg-mist/40">
                  <img
                    src={photo.src}
                    alt={photo.alt}
                    loading="lazy"
                    className={
                      photo.orientation === "wide"
                        ? "aspect-[16/9] size-full object-cover"
                        : "aspect-[4/3] size-full object-cover"
                    }
                  />
                </div>
                <figcaption className="mt-3 text-xs leading-relaxed text-ink-soft">
                  {photo.caption}
                </figcaption>
              </figure>
            ))}
          </div>

          <ol className="relative order-1 space-y-6 border-l-2 border-line-soft pl-7 lg:order-2 lg:col-span-4">
            {ravikiranTimeline.tg.map((entry) => (
              <li key={entry.when} className="relative">
                <span
                  aria-hidden="true"
                  className="absolute -left-[2.15rem] top-1.5 size-3.5 rounded-full border-2 border-sun bg-warm-white"
                />
                <p className="text-xs font-extrabold uppercase tracking-[0.12em] text-brand">
                  {entry.when}
                </p>
                <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">{entry.what}</p>
              </li>
            ))}
          </ol>
        </div>
      </Section>

      {/* Products --------------------------------------------------------- */}
      <Section tone="paper">
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionHeading
              eyebrow="Gratitude Farms"
              title="What came out the other end."
              lede="Solar-dried powders, no-sugar fruit rolls and energy bars — nutrition-tested, compliance-certified and packaged under the Trust's own brand."
            />
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:col-span-7">
            {[
              {
                src: turmericPowder,
                alt: "A packet of Gratitude Farms solar-dried turmeric powder",
                name: "Solar-dried turmeric powder",
              },
              {
                src: gingerPowder,
                alt: "A packet of Gratitude Farms solar-dried ginger powder",
                name: "Solar-dried ginger powder",
              },
            ].map((product) => (
              <figure
                key={product.name}
                className="overflow-hidden rounded-2xl border border-line-soft bg-warm-white"
              >
                <img
                  src={product.src}
                  alt={product.alt}
                  loading="lazy"
                  className="aspect-square w-full object-contain p-5"
                />
                <figcaption className="border-t border-line-soft px-5 py-4 text-sm font-bold text-brand-strong">
                  {product.name}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </Section>

      {/* Closing ---------------------------------------------------------- */}
      <Section tone="brand-strong">
        <SectionHeading
          inverted
          align="center"
          eyebrow="What it proved"
          title="Sunlight, surplus harvest, and dignified livelihoods."
          lede="Project Ravi Kiran proved that a simple, zero-energy-cost technology — paired with rural women's skill and effort — can turn wasted produce into income, nutrition and dignity. It's a model the Trust continues to draw on as it builds its next generation of community-led infrastructure."
        />
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <PrimaryLink to="/programmes/woloo">See what we're building next</PrimaryLink>
          <GhostLink to="/partner">Partner with us</GhostLink>
        </div>
      </Section>
    </>
  );
}
