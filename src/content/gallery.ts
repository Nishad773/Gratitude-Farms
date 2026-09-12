import heroTray from "@/assets/gt/hero_tray_loading_dichpally.jpg";
import jkApples from "@/assets/gt/jk_01_apple_sourcing.jpg";
import jkBefore from "@/assets/gt/jk_02_site_before.jpg";
import jkTraining from "@/assets/gt/jk_03_training_hyderabad.jpg";
import jkSelection from "@/assets/gt/jk_04_beneficiary_selection.jpg";
import jkLaunch from "@/assets/gt/jk_05_soft_launch.jpg";
import gingerPowder from "@/assets/gt/product_ginger_powder.jpg";
import turmericPowder from "@/assets/gt/product_turmeric_powder.jpg";
import tgBefore from "@/assets/gt/tg_01_site_before.jpg";
import tgDryersIndore from "@/assets/gt/tg_02_dryers_indore.jpg";
import tgDespatched from "@/assets/gt/tg_03_dryers_despatched.jpg";
import tgPooja from "@/assets/gt/tg_04_soft_launch_pooja.jpg";
import tgProcessing from "@/assets/gt/tg_05_women_processing.jpg";
import tgAerial from "@/assets/gt/tg_06_aerial_drying_yard.jpg";
import climate from "@/assets/gramonnati-climate.jpg";
import hero from "@/assets/gramonnati-hero.jpg";
import learning from "@/assets/gramonnati-learning.jpg";
import livelihoods from "@/assets/gramonnati-livelihoods.jpg";
import powderRoomSpec from "@/assets/woloo/powder-room-spec.jpg";
import powderRoomUnit from "@/assets/woloo/powder-room-unit.png";
import sanitationImpact from "@/assets/woloo/sanitation-impact.png";
import wolooEcosystemDiagram from "@/assets/woloo/woloo-ecosystem.png";

export const galleryCategories = [
  { id: "all", label: "All" },
  { id: "ravi-kiran-jk", label: "Ravi Kiran — J&K" },
  { id: "ravi-kiran-tg", label: "Ravi Kiran — Telangana" },
  { id: "products", label: "Gratitude Farms products" },
  { id: "woloo", label: "The Woloo Programme" },
  { id: "communities", label: "Communities we serve" },
] as const;

export type GalleryCategory = (typeof galleryCategories)[number]["id"];

export type GalleryItem = {
  id: string;
  src: string;
  alt: string;
  caption: string;
  place: string;
  category: Exclude<GalleryCategory, "all">;
  orientation?: "wide" | "tall";
};

export const galleryItems: GalleryItem[] = [
  {
    id: "tray-loading",
    src: heroTray,
    alt: "Women in hairnets loading trays of sliced produce into solar dryers at dusk",
    caption: "Loading the dryers at the end of the day's slicing.",
    place: "Dichpally, Telangana",
    category: "ravi-kiran-tg",
    orientation: "wide",
  },
  {
    id: "jk-apples",
    src: jkApples,
    alt: "Sorting and grading Kashmir apples at a collection point",
    caption: "Sourcing and grading. Apples sorted at a local collection point, October 2022.",
    place: "Anantnag, Jammu & Kashmir",
    category: "ravi-kiran-jk",
  },
  {
    id: "jk-before",
    src: jkBefore,
    alt: "The open ground identified for the Qazigund drying yard, before construction",
    caption: "Before. The open ground identified for the Qazigund drying yard.",
    place: "Qazigund, Jammu & Kashmir",
    category: "ravi-kiran-jk",
  },
  {
    id: "jk-training",
    src: jkTraining,
    alt: "A solar-drying and food-processing training session in progress",
    caption: "Building skills. Solar-drying and food-processing training, Hyderabad, Jan–Feb 2023.",
    place: "Hyderabad, Telangana",
    category: "ravi-kiran-jk",
  },
  {
    id: "jk-selection",
    src: jkSelection,
    alt: "Local women being interviewed and selected for training",
    caption: "Selecting the team. Local women interviewed and selected for training.",
    place: "Qazigund, Jammu & Kashmir",
    category: "ravi-kiran-jk",
  },
  {
    id: "jk-launch",
    src: jkLaunch,
    alt: "The Gramonnati team briefing Athaang's General Manager at the Qazigund soft launch",
    caption: "Soft launch, 11 March 2023. The team briefs Athaang's GM, Mr Aftab Darvesh.",
    place: "Qazigund, Jammu & Kashmir",
    category: "ravi-kiran-jk",
    orientation: "wide",
  },
  {
    id: "tg-before",
    src: tgBefore,
    alt: "The roadside building in Dichpally earmarked for conversion into a processing facility",
    caption: "Before. The roadside building in Dichpally, earmarked for conversion.",
    place: "Dichpally, Telangana",
    category: "ravi-kiran-tg",
  },
  {
    id: "tg-indore",
    src: tgDryersIndore,
    alt: "Solar dryer components being loaded for transport at Indore",
    caption: "Built and inspected. Solar dryer components loaded for transport, Indore.",
    place: "Indore, Madhya Pradesh",
    category: "ravi-kiran-tg",
  },
  {
    id: "tg-despatched",
    src: tgDespatched,
    alt: "A truck of solar dryers despatched from Indore",
    caption: "On the way. Solar dryers despatched from Indore, March 2023.",
    place: "Indore, Madhya Pradesh",
    category: "ravi-kiran-tg",
  },
  {
    id: "tg-pooja",
    src: tgPooja,
    alt: "A traditional pooja marking the start of operations at the Dichpally facility",
    caption: "Soft launch, 11 March 2023. A traditional pooja marks the start of operations.",
    place: "Dichpally, Telangana",
    category: "ravi-kiran-tg",
  },
  {
    id: "tg-processing",
    src: tgProcessing,
    alt: "Local women washing and slicing fresh tomatoes ahead of solar drying",
    caption: "At work. Local women washing and slicing fresh tomatoes ahead of solar drying.",
    place: "Dichpally, Telangana",
    category: "ravi-kiran-tg",
  },
  {
    id: "tg-aerial",
    src: tgAerial,
    alt: "Aerial view of rows of solar dryers in operation at the Dichpally drying yard",
    caption: "The drying yard, from above. Rows of solar dryers in operation at Dichpally.",
    place: "Dichpally, Telangana",
    category: "ravi-kiran-tg",
    orientation: "wide",
  },
  {
    id: "turmeric",
    src: turmericPowder,
    alt: "A packet of Gratitude Farms solar-dried turmeric powder",
    caption: "Gratitude Farms solar-dried turmeric powder.",
    place: "Gratitude Farms",
    category: "products",
  },
  {
    id: "ginger",
    src: gingerPowder,
    alt: "A packet of Gratitude Farms solar-dried ginger powder",
    caption: "Gratitude Farms solar-dried ginger powder.",
    place: "Gratitude Farms",
    category: "products",
  },
  {
    id: "woloo-unit",
    src: powderRoomUnit,
    alt: "A Woloo Powder Room unit decorated with marigold garlands on its opening day",
    caption:
      "A Woloo Powder Room in the network on its opening day — café counter, retail and safe space in 200 sq ft.",
    place: "Woloo network",
    category: "woloo",
  },
  {
    id: "woloo-spec",
    src: powderRoomSpec,
    alt: "Design renders and a feature list for the Woloo Powder Room unit",
    caption:
      "The Powder Room specification — clean toilets, beauty and changing room, feeding room, café and convenience shop.",
    place: "Woloo",
    category: "woloo",
    orientation: "wide",
  },
  {
    id: "woloo-ecosystem",
    src: wolooEcosystemDiagram,
    alt: "Diagram of the six interconnected Woloo services around a central platform",
    caption:
      "Six interconnected services: Powder Rooms, IoT hygiene monitoring, Loo-Locater, retail, cleaning SaaS and facility management.",
    place: "Woloo",
    category: "woloo",
    orientation: "wide",
  },
  {
    id: "sanitation-impact",
    src: sanitationImpact,
    alt: "A photo collage of women and children alongside the message that improved sanitation transforms health, education and economic outcomes",
    caption:
      "Why sanitation is never only about sanitation — health, life expectancy, education and economic growth all move with it.",
    place: "India",
    category: "woloo",
    orientation: "wide",
  },
  {
    id: "communities-hero",
    src: hero,
    alt: "A woman carrying a water pot walks a village path with schoolchildren",
    caption: "The households at the centre of every programme we run.",
    place: "Rural South India",
    category: "communities",
    orientation: "wide",
  },
  {
    id: "communities-learning",
    src: learning,
    alt: "Children reading together in a village learning room",
    caption: "Learning: the thread running from Udyam and Vidya-Jyoti to every programme since.",
    place: "Rural India",
    category: "communities",
  },
  {
    id: "communities-livelihoods",
    src: livelihoods,
    alt: "Women sorting produce together at a community collective",
    caption: "Livelihoods built around women's collectives and self-help groups.",
    place: "Rural India",
    category: "communities",
  },
  {
    id: "communities-climate",
    src: climate,
    alt: "Community members planting native trees beside a village pond",
    caption: "Water stewardship and native planting — the Jal Sanchaya lineage.",
    place: "Rural India",
    category: "communities",
  },
];
