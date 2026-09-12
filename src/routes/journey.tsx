import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";

import {
  GhostLink,
  PageHero,
  PrimaryLink,
  Section,
  SectionHeading,
} from "@/components/site/page-shell";
import learningImage from "@/assets/gramonnati-learning.jpg";
import climateImage from "@/assets/gramonnati-climate.jpg";
import livelihoodsImage from "@/assets/gramonnati-livelihoods.jpg";
import ravikiranImage from "@/assets/gt/tg_06_aerial_drying_yard.jpg";
import jkTraining from "@/assets/gt/jk_03_training_hyderabad.jpg";

export const Route = createFileRoute("/journey")({
  head: () => ({
    meta: [
      { title: "Our Journey, 2017–Present | Gramonnati Trust" },
      {
        name: "description",
        content:
          "From the Udyam Programme in Jabalpur and Vidya-Jyoti and Jal Sanchaya in Rajouri-Poonch, to Project Ravi Kiran and the pivot into smart sanitation — eight years of grassroots transformation.",
      },
      { property: "og:title", content: "Our Journey | Gramonnati Trust" },
    ],
  }),
  component: JourneyPage,
});

type Era = {
  period: string;
  title: string;
  intro: string;
  image?: string;
  imageAlt?: string;
  caption?: string;
  chapters: { name: string; body: string; note?: string }[];
  link?: { label: string; to: string };
};

const eras: Era[] = [
  {
    period: "2017 – 18",
    title: "The foundation year",
    intro:
      "Gramonnati Trust was born when its co-founders left their corporate careers at Cisco Systems in 2017, setting themselves the goal of developing 10,000 rural entrepreneurs within five years. The Trust based itself in Puducherry and chose to begin its grassroots work in the border districts of Rajouri and Poonch, Jammu & Kashmir.",
    image: livelihoodsImage,
    imageAlt: "Rural women working together at a community enterprise",
    caption: "Udyam — the path-to-entrepreneurship model that started everything.",
    chapters: [
      {
        name: "The Udyam Programme",
        body: "Udyam — the flagship path-to-entrepreneurship programme for youth, women and ex-soldiers — launched on 26 January 2018 with the opening of the Jabalpur Gramonnati Kendra at LS Jha Model School. Twenty aspirational NCC cadets from nearby villages were shortlisted for foundational training in digital literacy, financial literacy and self-employment skills, supported by broadband internet, video-conferencing and trainers from Prep My Skills.",
      },
      {
        name: "Sumita and Sunmeet",
        body: "Two trainees were groomed as Spoken English instructors and went on to design and deliver a 50-hour Spoken English course — first for local children, and later for soldiers of the 1 Signal Training Centre, Jabalpur.",
      },
      {
        name: "What we learned",
        body: "Changing the mindset of youth and their families toward entrepreneurship — and giving young people clearer guidance on their future options — emerged as the programme's central, ongoing challenge.",
        note: "Key learning",
      },
    ],
  },
  {
    period: "2018 – 19",
    title: "Deepening impact in Jammu & Kashmir",
    intro:
      "In its second year, Gramonnati expanded from a single Kendra into a multi-programme presence across the border districts of Rajouri and Poonch, working closely with the Indian Army and TERI, New Delhi.",
    image: learningImage,
    imageAlt: "Children learning together in a village classroom",
    caption: "A Vidya-Jyoti digital classroom session in a border-district school, Rajouri-Poonch.",
    chapters: [
      {
        name: "Vidya-Jyoti — transforming rural education",
        body: "Technology-enabled learning for rural schools in J&K's border districts — high-quality video content in Maths, Science and English, live digital classes over video-conference, and structured teacher training. The programme launched in September 2018 as a pilot in four Army-run schools, with two fully adopting the multimodal content into daily teaching. Six teachers from three border-district schools were sent on a training tour to the Agastya International Foundation, organised with the Indian Army's support.",
      },
      {
        name: "Jal Sanchaya — solving the water problem",
        body: "Chronic water scarcity in the upper reaches of the Rajouri-Poonch hills, tackled through low-cost rainwater harvesting developed with TERI, New Delhi — and designed to build local rural entrepreneurs in water solutions along the way. After identifying five priority locations with TERI and local Army units, the first rooftop system was completed in October 2018 at Model Academy, Sagra, Poonch district — built in three days and filled to capacity within five days of monsoon rain. Four more systems followed, training 6–8 local people in installation at each site.",
      },
      {
        name: "Sarpanch Yatra — Mission Samriddhi",
        body: "In consultation with the Indian Army's Sadbhavana programme and the civil authorities of Rajouri and Poonch, Gramonnati and Mission Samriddhi jointly designed an educational and experiential tour for 20 sarpanches to India's model villages — with sessions on design thinking, grassroots leadership, and profitable organic farming on small landholdings.",
      },
    ],
  },
  {
    period: "2022 – 23",
    title: "Project Ravi Kiran",
    intro:
      "A CSR-funded solar dehydration initiative, backed by NIIF through its implementation partner Athaang, that gave rural women in Jammu & Kashmir and Telangana a dignified, zero-energy-cost livelihood — while rescuing tonnes of fruit and vegetables that would otherwise have gone to waste.",
    image: ravikiranImage,
    imageAlt: "Aerial view of rows of solar dryers at the Dichpally drying yard",
    caption:
      "The drying yard, from above. Rows of solar dryers in operation at Dichpally, Telangana.",
    chapters: [
      {
        name: "Two sites, one model",
        body: "Facilities at Qazigund in Anantnag district, Jammu & Kashmir, and Dichpally in Nizamabad district, Telangana — both running the same end-to-end value chain, from sourcing surplus harvest through solar drying to packaging under the Gratitude Farms brand.",
      },
      {
        name: "Zero energy cost",
        body: "Solar dryers remove 80–90% of moisture at 55–65°C using nothing but sunlight — roughly 1,367 watts per square metre on an average day. No electricity, no fuel, no emissions, and produce that would otherwise rot turned into shelf-stable food.",
      },
    ],
    link: { label: "The full Project Ravi Kiran story", to: "/programmes/ravi-kiran" },
  },
  {
    period: "2022 – Present",
    title: "The smart sanitation pivot",
    intro:
      "Building on eight years of rural development experience, Gramonnati extended its mission into smart sanitation and circular-waste infrastructure — partnering with Woloo and launching Clean & Divine India. The same workforce philosophy that powered the Udyam Programme now anchors the Woloo Programme's staffing model of ex-servicemen families, war widows and women's Self-Help Groups.",
    image: climateImage,
    imageAlt: "Community members at work beside a village water body",
    caption: "The same discipline, applied to a new frontier.",
    chapters: [
      {
        name: "The Woloo Programme",
        body: "A partnership with Woloo — India's only integrated smart-hygiene platform, featured on Shark Tank India 2022 — to deploy and operate women-run Powder Rooms. Bengaluru is the first city of deployment; Puducherry and Tamil Nadu's temple towns follow.",
      },
      {
        name: "Clean & Divine India",
        body: "A ₹10 voluntary contribution embedded at checkout on travel platforms, funding Woloo Powder Rooms and Waste-to-Pellet units at India's highest-footfall destinations — operated by war widows and ex-servicemen.",
      },
    ],
    link: { label: "See the programmes", to: "/programmes" },
  },
];

function JourneyPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Our Journey" }]}
        eyebrow="2017 – Present"
        title="From rainwater tanks in the Pir Panjal to smart sanitation nationwide."
        lede="Eight years of the same discipline: identify a real, local problem; build a simple, technology-enabled solution; train and employ the community to run it; and measure the outcome honestly."
        image={jkTraining}
        imageAlt="A solar-drying and food-processing training session in progress"
        actions={
          <>
            <PrimaryLink to="/programmes">Where we are today</PrimaryLink>
            <GhostLink to="/gallery">Photo archive</GhostLink>
          </>
        }
      />

      {eras.map((era, index) => (
        <Section key={era.period} tone={index % 2 === 0 ? "warm" : "paper"}>
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <p className="display-face text-5xl text-sun sm:text-6xl">{era.period}</p>
              <h2 className="display-face mt-4 text-3xl leading-tight text-brand-strong sm:text-4xl">
                {era.title}
              </h2>
              <p className="mt-5 leading-relaxed text-ink-soft">{era.intro}</p>

              {era.image ? (
                <figure className="mt-8">
                  <div className="overflow-hidden rounded-2xl border border-line-soft bg-mist/40">
                    <img
                      src={era.image}
                      alt={era.imageAlt ?? ""}
                      loading="lazy"
                      className="aspect-[4/3] size-full object-cover"
                    />
                  </div>
                  {era.caption ? (
                    <figcaption className="mt-3 text-xs leading-relaxed text-ink-soft">
                      {era.caption}
                    </figcaption>
                  ) : null}
                </figure>
              ) : null}

              {era.link ? (
                <Link
                  to={era.link.to}
                  className="mt-7 inline-flex h-11 items-center gap-1 rounded-full bg-brand px-6 text-sm font-extrabold text-primary-foreground transition-colors hover:bg-brand-strong"
                >
                  {era.link.label} <ArrowUpRight aria-hidden="true" className="size-4" />
                </Link>
              ) : null}
            </div>

            <div className="lg:col-span-7">
              <ol className="relative space-y-8 border-l-2 border-line-soft pl-7">
                {era.chapters.map((chapter) => (
                  <li key={chapter.name} className="relative">
                    <span
                      aria-hidden="true"
                      className="absolute -left-[2.15rem] top-1.5 size-3.5 rounded-full border-2 border-sun bg-paper"
                    />
                    {chapter.note ? (
                      <p className="text-[0.62rem] font-extrabold uppercase tracking-[0.14em] text-sun">
                        {chapter.note}
                      </p>
                    ) : null}
                    <h3 className="display-face text-xl text-brand-strong sm:text-2xl">
                      {chapter.name}
                    </h3>
                    <p className="mt-3 leading-relaxed text-ink-soft">{chapter.body}</p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </Section>
      ))}

      <Section tone="brand">
        <SectionHeading
          inverted
          align="center"
          eyebrow="Looking back, looking forward"
          title="Things that last are built slowly, then all at once."
          lede="From a single Kendra in Jabalpur and rainwater tanks in the hills of Poonch, to a nationally scaling smart-sanitation movement — that discipline is the foundation for everything that follows."
        />
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <PrimaryLink to="/partner">Be part of the next chapter</PrimaryLink>
          <GhostLink to="/impact">See the numbers</GhostLink>
        </div>
      </Section>
    </>
  );
}
