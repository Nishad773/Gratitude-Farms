/**
 * Single source of truth for organisation-level facts that appear across pages.
 * Figures are taken from the Trust's website content blueprint (v2, June 2026),
 * the Trust Profile, and the Gramonnati x Woloo x FuelADream deck.
 */

export const org = {
  name: "Gramonnati Trust",
  tagline: "Dignity, delivered.",
  meaning: "Gramonnati means 'village upliftment'.",
  founded: "5th October 2017",
  foundedPlace: "Puducherry",
  founder: "Maj. Ved Prakash Sharma (Retd.)",
  pan: "AACTG8992R",
  registration12AA: "AACTG8992R/05/18-19/T-0831 (w.e.f. 05.10.2017)",
  registration80G: "URNo. AACTG8992R/05/18-19/T-0831/80G — valid in perpetuity from A.Y. 2019-20",
  registrationCSR: "CSR00017701 (Ministry of Corporate Affairs, Govt. of India)",
  area: "Pan-India, headquartered in Puducherry",
  address: {
    line1: "Flat No. 10, L'Avenir III, No. 108",
    line2: "Papammal Koil Street, Kuruchikuppam",
    city: "Puducherry – 605 012",
    country: "India",
  },
  email: "info@gramonnati.org",
  partnershipsEmail: "ved@gramonnati.org",
  phone: "+91 80959 99776",
  phoneHref: "+918095999776",
  website: "www.gramonnati.org",
} as const;

export const positioning = {
  promise:
    "We started with one village. Today, we're building the infrastructure of dignity for a billion Indians — one rainwater tank, one classroom, one Powder Room at a time.",
  vision:
    "To make every community we work with self-reliant — in water, in sanitation, in livelihoods, and in waste.",
  legacyVision:
    "To create self-reliant, prosperous and sustainable villages where every citizen has equal opportunity, dignity, and access to knowledge and modern systems.",
} as const;

export type MissionPillar = {
  id: string;
  title: string;
  summary: string;
  detail: string;
};

export const missionPillars: MissionPillar[] = [
  {
    id: "livelihoods",
    title: "Dignified Livelihoods",
    summary: "For women, war widows and ex-servicemen families.",
    detail:
      "Stable, respected employment created through enterprise-based community infrastructure — so that the people who served the country, and the women who hold rural households together, have work they can build a life on.",
  },
  {
    id: "sanitation",
    title: "Smart Sanitation",
    summary: "Technology-enabled hygiene infrastructure wherever it is needed.",
    detail:
      "Woloo Powder Rooms and public hygiene facilities at the places India needs them most — pilgrimage towns, highways, railway stations, urban markets and villages.",
  },
  {
    id: "circular",
    title: "Circular Economy",
    summary: "Converting waste into resource and revenue.",
    detail:
      "Waste-to-Pellet (RDF) units, water conservation, afforestation and organic farming — environmental stewardship that pays for the next round of impact rather than depending on it.",
  },
  {
    id: "enterprise",
    title: "Rural & Women's Entrepreneurship",
    summary: "Self-sustaining, community-owned micro-enterprises.",
    detail:
      "Training, financing and mentoring rural women and youth into self-employment and SHG-led micro-enterprises — breaking the cycle of poverty at the household level.",
  },
  {
    id: "transparency",
    title: "Technology, Transparency & Partnerships",
    summary: "Live data, audits, and open collaboration.",
    detail:
      "IoT, apps and live dashboards that make every rupee and every outcome auditable, and long-term partnerships with government, corporates, OTAs and global platforms.",
  },
];

export const credentials = [
  {
    code: "12AA",
    title: "Section 12AA",
    detail: "Registered public charitable trust under the Income Tax Act, valid from 05.10.2017.",
  },
  {
    code: "80G",
    title: "Section 80G(5)(vi)",
    detail: "50% tax deduction for donors. Certificate valid in perpetuity from A.Y. 2019-20.",
  },
  {
    code: "CSR-1",
    title: "CSR Registration",
    detail:
      "Reg. No. CSR00017701 — eligible to receive corporate CSR funds under the Companies Act, 2013.",
  },
  {
    code: "VII",
    title: "Schedule VII eligible",
    detail:
      "Sanitation, health, women's empowerment, rural development and environmental sustainability.",
  },
];

export type Trustee = {
  name: string;
  role: string;
  bio: string;
  initials: string;
};

export const trustees: Trustee[] = [
  {
    name: "Maj. VP Sharma (Retd.)",
    role: "Founder & Managing Trustee",
    bio: "Retired Army Major. Founded Gramonnati in 2017. Architect of the Woloo–Gramonnati partnership and a champion of veteran welfare.",
    initials: "VS",
  },
  {
    name: "Ayushi Sharma",
    role: "Trustee – Women Empowerment",
    bio: "Leads all women empowerment programmes. Manages field operations and the Woloo women-operator model.",
    initials: "AS",
  },
  {
    name: "Brig. Atul Sharma (Retd.)",
    role: "Trustee – Armed Forces Coordination",
    bio: "35 years in Defence ICT. B.Tech. Expertise in large-scale programme management and governance.",
    initials: "AK",
  },
  {
    name: "Shyam Kaluve",
    role: "Trustee – Technology",
    bio: "30+ years in the technology industry, with deep experience delivering CSR projects.",
    initials: "SK",
  },
  {
    name: "Shrihari Allangala",
    role: "Trustee – Finance & Strategy",
    bio: "30+ years in investment banking and private equity. Strengthens Gramonnati for large CSR partnerships.",
    initials: "SA",
  },
  {
    name: "Shri Suresh Narayan Subbarao",
    role: "Founder Trustee",
    bio: "Co-founded the Trust in 2017 alongside Maj. Sharma and Shri Shyamasundar Kaluve.",
    initials: "SS",
  },
];

export const partners = [
  "Woloo",
  "FuelADream",
  "Indian Army — Sadbhavana",
  "TERI, New Delhi",
  "AWPO",
  "AWWA",
  "Mission Samriddhi",
  "NIIF / Athaang",
  "Agastya International Foundation",
];

export const wolooNetworkPartners = [
  "Indian Railways",
  "NHAI",
  "IOCL",
  "BPCL",
  "HPCL",
  "Mumbai Metro",
  "Adani Airports",
  "Gujarat Tourism",
  "Goa Tourism",
  "HUL",
  "PhonePe",
  "Nestlé",
  "P&G",
  "Amazon",
];

export type NavItem = {
  label: string;
  to: string;
  children?: { label: string; to: string; description: string }[];
};

export const navigation: NavItem[] = [
  { label: "About", to: "/about" },
  { label: "Our Journey", to: "/journey" },
  {
    label: "Programmes",
    to: "/programmes",
    children: [
      {
        label: "The Woloo Programme",
        to: "/programmes/woloo",
        description: "Smart, women-run sanitation — Bengaluru first, then Puducherry & Tamil Nadu.",
      },
      {
        label: "Clean & Divine India",
        to: "/programmes/clean-divine-india",
        description: "The ₹10 Guilt-Free Travel initiative for India's most-visited destinations.",
      },
      {
        label: "Travel Partnerships",
        to: "/programmes/travel-partnerships",
        description: "A ready-to-integrate CSR model for OTAs, airlines and hospitality brands.",
      },
      {
        label: "Project Ravi Kiran",
        to: "/programmes/ravi-kiran",
        description: "Solar dehydration livelihoods for rural women in J&K and Telangana.",
      },
    ],
  },
  { label: "Impact", to: "/impact" },
  { label: "Gallery", to: "/gallery" },
  { label: "Partner With Us", to: "/partner" },
  { label: "Contact", to: "/contact" },
];

export const socials = [
  { label: "LinkedIn", href: "https://www.linkedin.com/company/gramonnati-trust" },
  { label: "Instagram", href: "https://www.instagram.com/gramonnatitrust" },
  { label: "Facebook", href: "https://www.facebook.com/gramonnatitrust" },
  { label: "YouTube", href: "https://www.youtube.com/@gramonnatitrust" },
  { label: "X", href: "https://x.com/gramonnatitrust" },
];
