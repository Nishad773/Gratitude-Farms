# Gramonnati Trust website — working notes

## Content

All page copy and figures live in `src/content/`. Do not hard-code the Trust's
numbers, registrations or contact details into a route file — import them from
`src/content/site.ts` (organisation facts) or the relevant content module.

Be careful with attribution on Woloo figures. Gramonnati has **not yet deployed
its own Woloo units**; the 46-units / 1,77,204-walk-ins numbers are network-wide
Woloo figures. Pages that quote them must say so, as `/programmes/woloo` and
`/impact` currently do.

## Routing

File-based routing via TanStack Start — see `src/routes/README.md`.
`src/routeTree.gen.ts` is generated; do not edit it by hand.

## Styling

Tailwind v4 with semantic tokens defined in `src/styles.css` (`brand`,
`brand-strong`, `sun`, `leaf`, `paper`, `warm-white`, `ink-soft`, `line-soft`,
`mist`). Use those rather than raw colour values. Two custom utilities:
`display-face` (DM Serif Display) and `eyebrow`.

## Forms

`src/lib/enquiries.ts` holds the Zod schemas and the server functions. Wire real
delivery by setting `ENQUIRY_WEBHOOK_URL` — no code change needed.
