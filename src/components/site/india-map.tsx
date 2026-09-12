import { useMemo, useState } from "react";

import { cn } from "@/lib/utils";

/**
 * A lightweight, dependency-free locations map.
 *
 * The India outline and every marker are projected from the same equirectangular
 * lon/lat mapping, so pins land where they belong without shipping a map library
 * or tile requests. The outline is a deliberately coarse simplification — it is
 * an orientation device, not a survey boundary.
 */

const LON_MIN = 67;
const LON_MAX = 98;
const LAT_MAX = 37.5;
const LAT_MIN = 6.5;

function project([lon, lat]: readonly [number, number]) {
  const x = ((lon - LON_MIN) / (LON_MAX - LON_MIN)) * 100;
  const y = ((LAT_MAX - lat) / (LAT_MAX - LAT_MIN)) * 100;
  return [x, y] as const;
}

const OUTLINE: ReadonlyArray<readonly [number, number]> = [
  [68.2, 23.8],
  [68.8, 22.2],
  [70.0, 20.8],
  [72.7, 21.0],
  [72.8, 19.1],
  [73.5, 16.0],
  [74.9, 13.0],
  [75.8, 11.5],
  [76.5, 8.9],
  [77.5, 8.1],
  [79.3, 10.3],
  [80.3, 13.1],
  [80.2, 15.9],
  [82.3, 16.9],
  [84.8, 19.3],
  [86.9, 21.6],
  [88.1, 21.7],
  [89.1, 22.0],
  [89.0, 24.5],
  [92.5, 25.0],
  [94.6, 27.0],
  [96.5, 28.5],
  [95.0, 29.0],
  [92.0, 28.0],
  [89.0, 27.5],
  [88.0, 26.5],
  [84.0, 27.3],
  [81.0, 30.3],
  [79.0, 31.0],
  [78.5, 32.6],
  [79.0, 34.5],
  [78.0, 35.5],
  [76.5, 35.9],
  [74.5, 34.6],
  [73.9, 33.2],
  [74.5, 32.5],
  [75.3, 32.0],
  [74.6, 31.0],
  [73.9, 29.9],
  [72.9, 28.0],
  [70.6, 27.9],
  [69.5, 26.5],
  [70.0, 24.3],
];

const outlinePath = `${OUTLINE.map((point, index) => {
  const [x, y] = project(point);
  return `${index === 0 ? "M" : "L"}${x.toFixed(2)} ${y.toFixed(2)}`;
}).join(" ")} Z`;

export type LocationStatus = "delivered" | "launching" | "planned";

export type MapLocation = {
  id: string;
  name: string;
  state: string;
  coords: readonly [number, number];
  status: LocationStatus;
  programme: string;
  detail: string;
};

export const locations: MapLocation[] = [
  {
    id: "rajouri-poonch",
    name: "Rajouri & Poonch",
    state: "Jammu & Kashmir",
    coords: [74.3, 33.4],
    status: "delivered",
    programme: "Vidya-Jyoti · Jal Sanchaya · Sarpanch Yatra",
    detail:
      "Digital classrooms in four Army-run border schools and five rooftop rainwater-harvesting systems, built with TERI.",
  },
  {
    id: "jabalpur",
    name: "Jabalpur",
    state: "Madhya Pradesh",
    coords: [79.95, 23.18],
    status: "delivered",
    programme: "Udyam Programme",
    detail:
      "The first Gramonnati Kendra, opened 26 January 2018 — 20 NCC cadets trained in digital, financial and self-employment skills.",
  },
  {
    id: "qazigund",
    name: "Qazigund, Anantnag",
    state: "Jammu & Kashmir",
    coords: [75.08, 33.63],
    status: "delivered",
    programme: "Project Ravi Kiran",
    detail:
      "A solar dehydration facility 4 km from the Banihal Tunnel — 24 dryers, soft-launched 11 March 2023.",
  },
  {
    id: "dichpally",
    name: "Dichpally, Nizamabad",
    state: "Telangana",
    coords: [78.13, 18.72],
    status: "delivered",
    programme: "Project Ravi Kiran",
    detail:
      "A converted roadside building turned processing facility — 17 dryers, formally launched 3 May 2023.",
  },
  {
    id: "bengaluru",
    name: "Bengaluru",
    state: "Karnataka",
    coords: [77.59, 12.97],
    status: "launching",
    programme: "The Woloo Programme",
    detail:
      "Our first city of deployment — Powder Rooms at BPCL/HPCL forecourts, transit hubs, religious sites and markets.",
  },
  {
    id: "puducherry",
    name: "Puducherry",
    state: "Puducherry",
    coords: [79.81, 11.93],
    status: "launching",
    programme: "The Woloo Programme",
    detail:
      "Home base and the next deployment — Beach Boulevard, White Town, the Auroville corridor and the ECR.",
  },
  {
    id: "mahabalipuram",
    name: "Mahabalipuram",
    state: "Tamil Nadu",
    coords: [80.19, 12.62],
    status: "planned",
    programme: "Woloo · ECR corridor",
    detail:
      "On the 100 km Chennai–Puducherry ECR stretch, a heritage stop with heavy year-round traveller movement.",
  },
  {
    id: "tirupati",
    name: "Tirupati",
    state: "Andhra Pradesh",
    coords: [79.42, 13.63],
    status: "planned",
    programme: "Temple-town circuit",
    detail: "One of the temple towns targeted once the Puducherry model is proven.",
  },
  {
    id: "madurai",
    name: "Madurai",
    state: "Tamil Nadu",
    coords: [78.12, 9.93],
    status: "planned",
    programme: "Temple-town circuit",
    detail:
      "High pilgrim footfall year-round — a priority site for the 100-unit Tamil Nadu deployment.",
  },
  {
    id: "trichy",
    name: "Tiruchirappalli",
    state: "Tamil Nadu",
    coords: [78.7, 10.79],
    status: "planned",
    programme: "Temple-town circuit",
    detail: "Part of the replicable Tier-II/III pilgrimage-city template.",
  },
  {
    id: "thanjavur",
    name: "Thanjavur",
    state: "Tamil Nadu",
    coords: [79.14, 10.79],
    status: "planned",
    programme: "Temple-town circuit",
    detail: "A UNESCO heritage destination on the temple-town circuit.",
  },
  {
    id: "rameswaram",
    name: "Rameswaram",
    state: "Tamil Nadu",
    coords: [79.31, 9.29],
    status: "planned",
    programme: "Temple-town circuit",
    detail: "Island pilgrimage town with concentrated seasonal footfall.",
  },
  {
    id: "chidambaram",
    name: "Chidambaram",
    state: "Tamil Nadu",
    coords: [79.69, 11.4],
    status: "planned",
    programme: "Temple-town circuit",
    detail: "Between Puducherry and Thanjavur on the coastal pilgrimage route.",
  },
  {
    id: "kanyakumari",
    name: "Kanyakumari",
    state: "Tamil Nadu",
    coords: [77.55, 8.08],
    status: "planned",
    programme: "Temple-town circuit",
    detail: "India's southern tip — a year-round leisure and pilgrimage destination.",
  },
];

const filters = [
  { id: "all", label: "All locations" },
  { id: "delivered", label: "Delivered" },
  { id: "launching", label: "Launching" },
  { id: "planned", label: "Planned" },
] as const;

const statusStyles: Record<LocationStatus, { dot: string; chip: string; label: string }> = {
  delivered: {
    dot: "fill-sun stroke-brand-strong",
    chip: "bg-sun/20 text-brand-strong border-sun/50",
    label: "Delivered",
  },
  launching: {
    dot: "fill-leaf stroke-brand-strong",
    chip: "bg-leaf/20 text-brand-strong border-leaf/50",
    label: "Launching",
  },
  planned: {
    dot: "fill-warm-white stroke-brand",
    chip: "bg-mist/50 text-brand-strong border-line-soft",
    label: "Planned",
  },
};

export function IndiaMap() {
  const [filter, setFilter] = useState<(typeof filters)[number]["id"]>("all");
  const [activeId, setActiveId] = useState<string>("bengaluru");

  const visible = useMemo(
    () => (filter === "all" ? locations : locations.filter((item) => item.status === filter)),
    [filter],
  );

  const active = useMemo(
    () => visible.find((item) => item.id === activeId) ?? visible[0],
    [visible, activeId],
  );

  return (
    <div className="grid gap-8 lg:grid-cols-12 lg:gap-10">
      <div className="lg:col-span-7">
        <div
          role="group"
          aria-label="Filter locations by status"
          className="mb-5 flex flex-wrap gap-2"
        >
          {filters.map((item) => (
            <button
              key={item.id}
              type="button"
              data-filter={item.id}
              aria-pressed={filter === item.id}
              onClick={() => setFilter(item.id)}
              className={cn(
                "rounded-full border px-4 py-1.5 text-xs font-extrabold uppercase tracking-[0.1em] transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0",
                filter === item.id
                  ? "border-brand bg-brand text-primary-foreground"
                  : "border-line-soft bg-warm-white text-ink-soft hover:border-brand/50 hover:text-brand",
              )}
            >
              {item.label}
            </button>
          ))}
        </div>

        <div className="overflow-hidden rounded-2xl border border-line-soft bg-warm-white p-4 sm:p-6">
          <svg
            viewBox="-4 -4 108 108"
            className="mx-auto block h-auto w-full max-w-md"
            role="img"
            aria-label={`Map of India showing ${visible.length} Gramonnati Trust project locations`}
          >
            <path
              d={outlinePath}
              className="fill-mist/45 stroke-brand/35"
              strokeWidth="0.6"
              strokeLinejoin="round"
            />
            {visible.map((item) => {
              const [x, y] = project(item.coords);
              const isActive = active?.id === item.id;
              return (
                <g key={item.id}>
                  {isActive ? (
                    <circle cx={x} cy={y} r="4" className="fill-brand/20">
                      <animate
                        attributeName="r"
                        values="2.5;5;2.5"
                        dur="2.4s"
                        repeatCount="indefinite"
                      />
                    </circle>
                  ) : null}
                  <circle
                    data-location={item.id}
                    data-status={item.status}
                    cx={x}
                    cy={y}
                    r={isActive ? 2.4 : 1.7}
                    strokeWidth="0.5"
                    className={cn(statusStyles[item.status].dot, "cursor-pointer transition-all")}
                    onClick={() => setActiveId(item.id)}
                    onMouseEnter={() => setActiveId(item.id)}
                    tabIndex={0}
                    role="button"
                    aria-label={`${item.name}, ${item.state} — ${statusStyles[item.status].label}`}
                    onKeyDown={(event) => {
                      if (event.key === "Enter" || event.key === " ") {
                        event.preventDefault();
                        setActiveId(item.id);
                      }
                    }}
                  />
                </g>
              );
            })}
          </svg>

          <ul className="mt-4 flex flex-wrap justify-center gap-x-5 gap-y-2 text-xs font-bold text-ink-soft">
            {(Object.keys(statusStyles) as LocationStatus[]).map((status) => (
              <li key={status} className="flex items-center gap-1.5">
                <span
                  aria-hidden="true"
                  className={cn(
                    "size-2.5 rounded-full border",
                    status === "delivered" && "border-brand-strong bg-sun",
                    status === "launching" && "border-brand-strong bg-leaf",
                    status === "planned" && "border-brand bg-warm-white",
                  )}
                />
                {statusStyles[status].label}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="lg:col-span-5">
        {active ? (
          <div
            key={active.id}
            className="swap-enter rounded-2xl border border-line-soft bg-warm-white p-6 sm:p-7"
          >
            <span
              className={cn(
                "inline-block rounded-full border px-3 py-1 text-[0.62rem] font-extrabold uppercase tracking-[0.12em]",
                statusStyles[active.status].chip,
              )}
            >
              {statusStyles[active.status].label}
            </span>
            <h3 className="display-face mt-4 text-2xl text-brand-strong">{active.name}</h3>
            <p className="mt-1 text-xs font-extrabold uppercase tracking-[0.12em] text-ink-soft">
              {active.state} · {active.programme}
            </p>
            <p className="mt-4 text-sm leading-relaxed text-ink-soft">{active.detail}</p>
          </div>
        ) : null}

        <p className="mt-5 text-xs font-extrabold uppercase tracking-[0.12em] text-ink-soft">
          {visible.length} {visible.length === 1 ? "location" : "locations"}
        </p>
      </div>

      {/* Every location, laid out in the page flow — no panel to scroll inside. */}
      <ul className="grid gap-3 sm:grid-cols-2 lg:col-span-12 lg:grid-cols-3 xl:grid-cols-4">
        {visible.map((item) => (
          <li key={item.id} data-location={item.id} data-status={item.status}>
            <button
              type="button"
              data-select-location={item.id}
              onClick={() => setActiveId(item.id)}
              aria-current={active?.id === item.id ? "true" : undefined}
              className={cn(
                "flex h-full w-full items-start justify-between gap-3 rounded-xl border px-4 py-3.5 text-left transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md hover:shadow-brand-strong/10",
                active?.id === item.id
                  ? "border-brand bg-mist/50"
                  : "border-line-soft bg-warm-white hover:border-brand/40",
              )}
            >
              <span className="min-w-0">
                <span className="block text-sm font-bold text-brand-strong">{item.name}</span>
                <span className="mt-0.5 block text-xs text-ink-soft">{item.state}</span>
              </span>
              <span
                aria-hidden="true"
                className={cn(
                  "mt-1 size-2.5 shrink-0 rounded-full border",
                  item.status === "delivered" && "border-brand-strong bg-sun",
                  item.status === "launching" && "border-brand-strong bg-leaf",
                  item.status === "planned" && "border-brand bg-warm-white",
                )}
              />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
