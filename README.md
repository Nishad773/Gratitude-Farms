# Gramonnati Trust — website

The public website for **Gramonnati Trust**, a public charitable trust registered in
Puducherry (12AA · 80G · CSR-1 `CSR00017701`) that builds smart sanitation,
circular-waste and livelihood infrastructure across India.

## Stack

- **TanStack Start** (file-based routing, SSR) on **Vite 8**
- **React 19** + **TypeScript**
- **Tailwind CSS v4** with a token-based design system in `src/styles.css`
- **shadcn/ui** primitives (`src/components/ui`) + site components (`src/components/site`)
- **nitro** for the deployable server bundle

## Local development

```sh
npm install
npm run dev        # http://localhost:8080
```

Other scripts:

```sh
npm run build      # production build (nitro, cloudflare-module preset by default)
npm run preview    # serve the production build
npm run lint       # eslint
npm run format     # prettier
```

To build for a different host, set a nitro preset:

```sh
NITRO_PRESET=node-server npm run build
```

## Deploy to Vercel

This repository includes `vercel.json`, which builds the app with Nitro's
Vercel preset and produces the Vercel Build Output API bundle.

1. Import `https://github.com/Sainyakrishi/Gratitude-Farms` in Vercel.
2. Keep the framework preset as `Other` (the repository config supplies the build command).
3. Set the root directory to the folder containing `package.json`.
4. Add `ENQUIRY_WEBHOOK_URL` in Vercel's Environment Variables if form submissions should be forwarded.
5. Deploy with the default install command and the build command from `vercel.json`.

For local verification, run `NITRO_PRESET=vercel npm run build`.

## Project layout

```
src/
  assets/            Photography — gt/ (Project Ravi Kiran), woloo/ (programme imagery)
  components/site/   Header, footer, hero, counters, map, forms, gallery pieces
  components/ui/     shadcn/ui primitives
  content/           All page copy and data, in typed modules (single source of truth)
  lib/enquiries.ts   Zod schemas + TanStack server functions for the forms
  routes/            One file per page (see src/routes/README.md for conventions)
```

Copy and figures live in `src/content/` rather than inline in pages, so the Trust's
numbers can be updated in one place. The source documents behind them are the
*Website Content & Strategy Blueprint v2* (June 2026), the Trust Profile, the
Gramonnati × Woloo × FuelADream deck, and the Project Ravi Kiran report.

## Pages

| Route | Page |
| --- | --- |
| `/` | Home |
| `/about` | About Us — story, vision, mission, governance, trustees |
| `/journey` | Our Journey, 2017–present |
| `/programmes` | Programmes overview |
| `/programmes/woloo` | The Woloo Programme |
| `/programmes/clean-divine-india` | Clean & Divine India |
| `/programmes/travel-partnerships` | Travel Partnerships |
| `/programmes/ravi-kiran` | Project Ravi Kiran (2022–2023) |
| `/impact` | Impact & Transparency |
| `/gallery` | Photo gallery |
| `/partner` | Partner With Us |
| `/contact` | Contact + enquiry form |

## Forms

`src/lib/enquiries.ts` defines two TanStack Start server functions:

- `submitEnquiry` — the contact / partnership form (name, organisation, email,
  phone, interest, message, consent)
- `subscribeToUpdates` — the footer newsletter signup

Both validate with Zod on the client *and* the server, return a reference number
to the visitor, and log the submission server-side.

**To deliver submissions somewhere**, set `ENQUIRY_WEBHOOK_URL` in the deployment
environment. Every validated submission is POSTed there as JSON:

```json
{ "kind": "enquiry", "reference": "GT-260912-A7K3D", "name": "...", "email": "...", "...": "..." }
```

Point it at an email relay, a CRM endpoint, or a Zapier/Make webhook. Delivery
failures are logged and never block the visitor's confirmation.
