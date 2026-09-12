import heroTray from "@/assets/gt/hero_tray_loading_dichpally.jpg";
import womenProcessing from "@/assets/gt/tg_05_women_processing.jpg";
import climateImage from "@/assets/gramonnati-climate.jpg";
import livelihoodsImage from "@/assets/gramonnati-livelihoods.jpg";
import powderRoomUnit from "@/assets/woloo/powder-room-unit.png";

export type Programme = {
  slug: string;
  to: string;
  eyebrow: string;
  name: string;
  status: "Launching" | "In development" | "Completed" | "Open for partners";
  summary: string;
  image: string;
  imageAlt: string;
};

export const programmes: Programme[] = [
  {
    slug: "woloo",
    to: "/programmes/woloo",
    eyebrow: "Smart sanitation",
    name: "The Woloo Programme",
    status: "Launching",
    summary:
      "In partnership with Woloo — India's only integrated smart-hygiene platform — Gramonnati will deploy and operate women-run Powder Rooms across Bengaluru, Puducherry and Tamil Nadu's temple towns.",
    image: powderRoomUnit,
    imageAlt: "A Woloo Powder Room unit in the network, decorated for its opening day",
  },
  {
    slug: "clean-divine-india",
    to: "/programmes/clean-divine-india",
    eyebrow: "Guilt-free travel",
    name: "Clean & Divine India",
    status: "Open for partners",
    summary:
      "A ₹10 contribution at checkout, turned into real sanitation and waste-to-resource infrastructure at the destinations India's travellers love most.",
    image: climateImage,
    imageAlt: "A community gathering beside a village water body",
  },
  {
    slug: "travel-partnerships",
    to: "/programmes/travel-partnerships",
    eyebrow: "CSR integration",
    name: "Travel Partnerships",
    status: "Open for partners",
    summary:
      "A ready-to-integrate CSR partnership for OTAs, airlines and hospitality brands — turning every booking into measurable, audited nation-building.",
    image: livelihoodsImage,
    imageAlt: "Women working together at a rural collective",
  },
  {
    slug: "ravi-kiran",
    to: "/programmes/ravi-kiran",
    eyebrow: "2022 – 2023",
    name: "Project Ravi Kiran",
    status: "Completed",
    summary:
      "A CSR-funded solar dehydration initiative across Jammu & Kashmir and Telangana that turned surplus harvest into shelf-stable products — and into livelihoods for rural women.",
    image: heroTray,
    imageAlt: "Women loading trays of sliced produce into solar dryers at Dichpally, Telangana",
  },
];

export const programmeBySlug = Object.fromEntries(programmes.map((p) => [p.slug, p])) as Record<
  string,
  Programme
>;

/* ---------------------------------------------------------------------- */
/* The Woloo Programme                                                     */
/* ---------------------------------------------------------------------- */

export const wolooEcosystem = [
  {
    code: "PR",
    title: "Powder Rooms",
    detail:
      "200 sq ft smart, aspirational toilets with retail — commercially viable and women-centric.",
  },
  {
    code: "IoT",
    title: "Hygiene monitoring",
    detail: "Real-time stink detection, air-quality sensors, usage counters and mobile alerts.",
  },
  {
    code: "APP",
    title: "Loo-Locater service",
    detail: "Find certified washrooms anywhere in India — 1 lakh hosts across 800 cities.",
  },
  {
    code: "RET",
    title: "Hygiene product retail",
    detail: "Women-centric products and services sold in-unit and through the app.",
  },
  {
    code: "SaaS",
    title: "Cleaning task management",
    detail:
      "Digital janitor scheduling, audit trails and a compliance dashboard for facility managers.",
  },
  {
    code: "FM",
    title: "Facility management",
    detail: "Centralised management of multiple toilets — standards, QA and performance data.",
  },
];

export const powderRoomFeatures = [
  {
    title: "Clean powder room",
    detail:
      "200 sq ft, gender-segregated, auto-flush, sanitised after every use, disability-friendly.",
  },
  {
    title: "Women's safe space",
    detail: "Beauty and changing room, feeding room, baby care and a sanitary napkin dispenser.",
  },
  {
    title: "Café + convenience store",
    detail: "Managed by women's SHGs — personal care products, beverages and snacks.",
  },
  {
    title: "IoT smart monitoring",
    detail: "Stink sensor, air quality, usage counter and real-time alerts via TASQ-Master.",
  },
  {
    title: "WAH-Score hygiene rating",
    detail:
      "India's first people-powered toilet rating — like a credit score, but for cleanliness.",
  },
  {
    title: "Sustainable design",
    detail: "Solar panels, bio-digesters, vertical gardens and zero-waste operations.",
  },
];

export const wolooWorkforce = [
  {
    ratio: "1 per 100 units",
    role: "Zone Commander",
    profile: "Retired woman officer from the Armed Forces",
    duties: [
      "City-level operations and government coordination",
      "SHG training and mentoring",
      "Zero-tolerance hygiene protocol",
      "Government liaison and compliance",
    ],
  },
  {
    ratio: "1 per 10 units",
    role: "Cluster Manager",
    profile: "War widow or family member of an ex-serviceman",
    duties: [
      "Daily management of a 10-unit cluster",
      "Staff supervision and rostering",
      "Supply chain management",
      "Revenue collection and IoT alerts",
    ],
  },
  {
    ratio: "2 per unit",
    role: "Retail & Café Operator",
    profile: "Self-Help Group member",
    duties: [
      "Manages the café counter and store",
      "Sells personal care products",
      "Earns commission plus salary",
      "Pathway to SHG ownership",
    ],
  },
  {
    ratio: "2 per unit",
    role: "Hygiene Attendant",
    profile: "Self-Help Group member",
    duties: [
      "Maintains WAH-standard cleanliness",
      "IoT sensor monitoring",
      "TASQ-Master task tracking",
      "Stable, dignified livelihood",
    ],
  },
];

export const wolooDeploymentSites = [
  {
    number: "01",
    title: "BPCL & HPCL fuel stations",
    note: "First deployment sites",
    detail:
      "A national MoU is signed with Woloo. Bengaluru forecourt sites are being finalised for high impact.",
  },
  {
    number: "02",
    title: "Railway & bus stations",
    note: "High footfall",
    detail:
      "Majestic, KSR and Yeshwantpur see lakhs of daily commuters — women passengers have no safe, clean option on the journey.",
  },
  {
    number: "03",
    title: "Religious & heritage sites",
    note: "Tourist zones",
    detail:
      "Lalbagh, Cubbon Park, temples and markets — destinations with near-zero women's hygiene infrastructure.",
  },
  {
    number: "04",
    title: "Urban markets & hubs",
    note: "Economic centres",
    detail:
      "KR Market, Jayanagar, Koramangala — Bengaluru's commercial heartbeat, with thousands of women vendors every day.",
  },
];

export const unitEconomics = [
  {
    amount: "₹25 Lakh",
    title: "Construction & setup",
    items: [
      "200 sq ft smart hygiene facility at a selected high-footfall site",
      "IoT sensors and stink detection (TASQ-Master)",
      "WAH-Score certification and Loo-Locater listing",
      "Solar panels, bio-digester and accessibility ramps",
    ],
  },
  {
    amount: "₹15 Lakh",
    title: "Operational support, until self-sustaining",
    items: [
      "War-widow cluster operator — 12 months' salary",
      "SHG training and onboarding (4 women per unit)",
      "Café setup, consumables and supply chain",
      "TASQ-Master platform — 12-month subscription",
    ],
  },
];

export const gratitudeTiers = [
  {
    tier: "Corporate Funder",
    amount: "₹40 Lakh+",
    benefits: [
      "Powder Room naming rights, permanently",
      "Premium plaque at site and a Woloo app badge",
      "Live IoT impact dashboard access",
      "Co-branded CSR + BRSR report and carbon credits",
    ],
  },
  {
    tier: "Major Donor",
    amount: "₹5 Lakh+",
    benefits: ["Gold-tier Gratitude Wall plaque", "80G certificate plus annual impact data"],
  },
  {
    tier: "Team / Employee Pool",
    amount: "₹1 Lakh+",
    benefits: ["Silver tier — team name on the Gratitude Wall", "80G for all individual donors"],
  },
];

/* ---------------------------------------------------------------------- */
/* Clean & Divine India                                                    */
/* ---------------------------------------------------------------------- */

export const cleanDivineStats = [
  { value: "1.44 bn", label: "Pilgrim and leisure visits to India each year" },
  { value: "60%+", label: "High-footfall sites without adequate sanitation" },
  { value: "$53.8 bn", label: "Lost annually to poor sanitation in India" },
  { value: "₹10", label: "The contribution that starts to close the gap" },
];

export const cleanDividePillars = [
  {
    number: "Pillar 1",
    title: "Smart sanitation — Woloo Powder Rooms",
    detail:
      "Clean, safe, pay-and-use sanitation placed at the tourism sites that need it most — staffed by local women and run as micro-enterprises.",
  },
  {
    number: "Pillar 2",
    title: "Waste-to-resource — Pellet / RDF units",
    detail:
      "Waste-to-Pellet (RDF) plants convert local solid waste into refuse-derived fuel, reducing landfill burden at tourist destinations while creating revenue that funds ongoing operations.",
  },
];

export const cleanDivineRoadmap = [
  {
    phase: "Phase 1 — Foundation",
    focus:
      "Pilot integration with one or two travel partners; first units deployed at flagship pilgrimage and tourism sites.",
  },
  {
    phase: "Phase 2 — Scale",
    focus:
      "Expand the partner network across OTAs, airlines and hotel chains; roll units out across the top 20 tourism circuits.",
  },
  {
    phase: "Phase 3 — Sustain",
    focus:
      "Self-sustaining unit operations through retail and advertising revenue; reinvest the surplus into new sites.",
  },
];

export const travelPartnerGains = [
  "A differentiated, story-able sustainability feature embedded directly in the customer journey",
  "Verifiable, audited CSR spend under Schedule VII with 80G tax benefits",
  "BRSR-ready ESG metrics generated automatically from real-world impact data",
  "Co-branded recognition at every funded site — Gratitude Wall, signage and digital screens",
  "A live, shareable impact dashboard for marketing, investor relations and annual reports",
];

export const travelScenarios = [
  {
    scenario: "Conservative",
    optIn: "Low single-digit % of bookings",
    outcome: "Funds 1–2 Powder Room units per year",
  },
  {
    scenario: "Moderate",
    optIn: "Moderate adoption across booking volume",
    outcome: "Funds 4–6 Powder Room units + 1 Pellet unit per year",
  },
  {
    scenario: "Optimistic",
    optIn: "High adoption with platform promotion",
    outcome: "Funds 10+ units across multiple cities per year",
  },
];

export const travelSteps = [
  {
    step: "01",
    title: "Initial discussion",
    detail: "Align on the integration approach and the target geographies.",
  },
  {
    step: "02",
    title: "Pilot",
    detail: "Launch on a subset of routes or destinations, with a live dashboard from day one.",
  },
  {
    step: "03",
    title: "Scale",
    detail: "Expand across the platform, with quarterly impact reporting.",
  },
  {
    step: "04",
    title: "Annual review",
    detail: "A co-branded impact report for your ESG and CSR disclosures.",
  },
];

/* ---------------------------------------------------------------------- */
/* Project Ravi Kiran                                                      */
/* ---------------------------------------------------------------------- */

export const ravikiranStats = [
  { value: "2", label: "Project sites — J&K and Telangana" },
  { value: "~45+", label: "Rural women given direct livelihood (Year 1 target)" },
  { value: "34–58 T", label: "Fruit, veg and herbs solar-dried per year (combined Year-1 plan)" },
  { value: "₹0", label: "Energy cost — 100% solar-powered drying" },
];

export const ravikiranProcess = [
  {
    step: "01",
    title: "Sourcing",
    detail:
      "Unsold or surplus fruits, vegetables and herbs purchased directly from local farmers and FPOs.",
  },
  {
    step: "02",
    title: "Pre-processing",
    detail: "Washing, sorting, pulping and slicing — done by trained local women.",
  },
  {
    step: "03",
    title: "Solar drying",
    detail:
      "One to two days in solar dryers at 55–65°C, removing 80–90% of moisture, down to roughly 28% of original weight.",
  },
  {
    step: "04",
    title: "Post-processing",
    detail:
      "Slicing, rolling and shaping into finished formats — including no-sugar fruit rolls and energy bars.",
  },
  {
    step: "05",
    title: "Packaging",
    detail:
      "Nutrition testing, compliance certification and creative packaging under the Gratitude Farms brand.",
  },
  {
    step: "06",
    title: "Marketing & sales",
    detail:
      "Local markets, Army units and establishments, corporate gifting, and bulk and online sales.",
  },
];

export const ravikiranSites = [
  {
    place: "Qazigund, Jammu & Kashmir",
    where: "Village Mandipora, Tehsil Dooru, District Anantnag — 4 km from the Banihal Tunnel",
    facts: [
      "Funds sanctioned: 13 September 2022",
      "Site occupied: 15 December 2022, after surveying 12–15 candidate sites",
      "Soft launch: 11 March 2023, with Athaang GM Mr Aftab Darvesh",
      "Produce: Kashmiri apples, plums, peaches, apricots, pears, walnuts, mushrooms, strawberries, seabuckthorn — through 10+ identified FPOs",
      "Equipment: 20 standard (40 kg) Raheja solar dryers + 4 advanced (75 kg) Sukoon Solutions dryers",
    ],
  },
  {
    place: "Dichpally, Telangana",
    where: "District Nizamabad, Telangana",
    facts: [
      "Funds sanctioned: 7 December 2022",
      "Site leased and prepared: December 2022 – February 2023, converting a former roadside restaurant",
      "Soft launch: 11 March 2023 with a traditional pooja; formal launch: 3 May 2023",
      "Produce: Mangoes, tomatoes, onions, ginger, garlic, guava, banana and local greens — plus moringa, ginger and turmeric powders",
      "Equipment: 15 standard (40 kg) Raheja solar dryers + 2 advanced (200 kg) SEED dryers",
    ],
  },
];

export const ravikiranTimeline = {
  jk: [
    {
      when: "Oct–Nov 2022",
      what: "Visits to apple orchards and selection of potential supply vendors.",
    },
    {
      when: "Dec 2022",
      what: "Site identified and occupied near the Banihal Tunnel; a project manager, supervisor, food technology manager and admin coordinator hired locally.",
    },
    {
      when: "Dec 2022 – Feb 2023",
      what: "Solar dryers manufactured and pre-shipment inspected at Raheja Solar Food Products (Indore) and Sukoon Innovations; heavy Kashmir Valley snow slowed on-site work.",
    },
    {
      when: "Jan–Feb 2023",
      what: "Gramonnati's local team trained in solar drying and food processing in Hyderabad.",
    },
    {
      when: "1–10 Mar 2023",
      what: "Solar dryers installed on site; local women selected and trained.",
    },
    {
      when: "11 Mar 2023",
      what: "Soft launch of the Qazigund facility, with Athaang GM Mr Aftab Darvesh in attendance.",
    },
  ],
  tg: [
    {
      when: "Oct–Dec 2022",
      what: "Leadership site visits; a roadside building in Dichpally leased and identified for conversion into a processing facility.",
    },
    {
      when: "Dec 2022 – Feb 2023",
      what: "Electrification, perimeter walls and interior finishing carried out; solar dryers manufactured and inspected at Raheja Solar Food Products, Indore, and SEED, Hyderabad.",
    },
    {
      when: "Early Mar 2023",
      what: "Solar dryers despatched from Indore and installed on site; local women selected and trained in food processing.",
    },
    { when: "11 Mar 2023", what: "Soft launch, marked with a traditional pooja at the facility." },
    { when: "3 May 2023", what: "Formal launch of Project Ravi Kiran, Dichpally." },
  ],
};

export const ravikiranHero = {
  image: heroTray,
  alt: "Women loading trays of sliced produce into solar dryers at Dichpally",
};
export const ravikiranFeature = {
  image: womenProcessing,
  alt: "Local women washing and slicing fresh tomatoes at the Dichpally facility",
};
