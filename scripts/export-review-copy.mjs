/**
 * Exports the whole site as ONE self-contained .html file for offline review.
 *
 *   npm run build && npm run export:review
 *
 * It drives the real, hydrated app in headless Chrome rather than hand-writing a
 * second copy of the site — so the export can't drift from what's actually
 * built. Per page it:
 *
 *   1. loads the route and waits for hydration,
 *   2. flattens the two Radix widgets whose content only exists on demand (the
 *      FAQ accordion and the interest picker) into plain markup, so every word
 *      of copy ends up in the file,
 *   3. lifts <main> out and keeps one shared header/footer.
 *
 * Styles come from the production build. Images are deduplicated, recompressed
 * through the browser's own canvas, and embedded once each as data URIs. A small
 * vanilla runtime restores the interactions (routing, menus, reveal, counters,
 * gallery, map, accordion, forms).
 *
 * Usage: node scripts/export-review-copy.mjs [--out <file>] [--port <n>]
 *                                            [--max-width <px>] [--quality <0-1>]
 */

import { spawn } from "node:child_process";
import { mkdirSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { setTimeout as sleep } from "node:timers/promises";

const args = process.argv.slice(2);
const readArg = (flag, fallback) => {
  const i = args.indexOf(flag);
  return i === -1 ? fallback : args[i + 1];
};

const OUT = resolve(readArg("--out", "review/gramonnati-trust-website-review.html"));
const PORT = Number(readArg("--port", "4178"));
const CDP_PORT = Number(readArg("--cdp", "9411"));
const MAX_WIDTH = Number(readArg("--max-width", "1600"));
const QUALITY = Number(readArg("--quality", "0.84"));
const BASE = `http://localhost:${PORT}`;
const BUILT_ASSETS = resolve(".output/public/assets");

const ROUTES = [
  { path: "/", label: "Home" },
  { path: "/about", label: "About Us" },
  { path: "/journey", label: "Our Journey" },
  { path: "/programmes", label: "Programmes" },
  { path: "/programmes/woloo", label: "The Woloo Programme" },
  { path: "/programmes/clean-divine-india", label: "Clean & Divine India" },
  { path: "/programmes/travel-partnerships", label: "Travel Partnerships" },
  { path: "/programmes/ravi-kiran", label: "Project Ravi Kiran" },
  { path: "/impact", label: "Impact & Transparency" },
  { path: "/gallery", label: "Gallery" },
  { path: "/partner", label: "Partner With Us" },
  { path: "/contact", label: "Contact" },
];

const CHROME_CANDIDATES = [
  "C:/Program Files/Google/Chrome/Application/chrome.exe",
  "C:/Program Files (x86)/Google/Chrome/Application/chrome.exe",
  "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  "google-chrome",
  "chromium",
];

function findChrome() {
  for (const candidate of CHROME_CANDIDATES) {
    try {
      readFileSync(candidate);
      return candidate;
    } catch {
      /* not a readable file — try the next one */
    }
  }
  return CHROME_CANDIDATES.at(-1);
}

async function waitFor(url, label, attempts = 120) {
  for (let i = 0; i < attempts; i++) {
    try {
      if ((await fetch(url)).ok) return;
    } catch {
      /* not up yet */
    }
    await sleep(400);
  }
  throw new Error(`${label} never became ready at ${url}`);
}

/* ------------------------------------------------------------------ */
/* Servers                                                             */
/* ------------------------------------------------------------------ */

// The nitro build targets a serverless runtime, so `vite preview` can't serve
// it. The dev server renders identical markup; the minified CSS is read off the
// build output, so nothing about the export is really "dev mode".
console.log(`• starting dev server on :${PORT}`);
const server = spawn(
  process.platform === "win32" ? "npx.cmd" : "npx",
  ["vite", "dev", "--port", String(PORT), "--strictPort"],
  { stdio: "ignore", shell: process.platform === "win32" },
);
await waitFor(BASE + "/", "dev server");

console.log("• launching headless browser");
const chrome = spawn(
  findChrome(),
  [
    "--headless=new",
    "--disable-gpu",
    `--remote-debugging-port=${CDP_PORT}`,
    "--no-first-run",
    "--no-default-browser-check",
    "--user-data-dir=" + (process.env.TEMP ?? "/tmp") + "/gt-export-profile",
  ],
  { stdio: "ignore" },
);

function shutdown() {
  try {
    chrome.kill();
  } catch {
    /* already gone */
  }
  try {
    server.kill();
  } catch {
    /* already gone */
  }
}
process.on("exit", shutdown);

async function debuggerUrl() {
  for (let i = 0; i < 120; i++) {
    try {
      const res = await fetch(`http://127.0.0.1:${CDP_PORT}/json/version`);
      return (await res.json()).webSocketDebuggerUrl;
    } catch {
      await sleep(400);
    }
  }
  throw new Error("headless browser never became ready");
}

const ws = new WebSocket(await debuggerUrl());
await new Promise((res) => (ws.onopen = res));

let messageId = 0;
const pending = new Map();
ws.onmessage = (event) => {
  const msg = JSON.parse(event.data);
  if (msg.id && pending.has(msg.id)) {
    pending.get(msg.id)(msg);
    pending.delete(msg.id);
  }
};
function send(method, params = {}, sessionId) {
  const id = ++messageId;
  ws.send(JSON.stringify({ id, method, params, ...(sessionId ? { sessionId } : {}) }));
  return new Promise((res) => pending.set(id, res));
}

const { result: { targetId } } = await send("Target.createTarget", { url: "about:blank" });
const { result: { sessionId } } = await send("Target.attachToTarget", { targetId, flatten: true });
await send("Page.enable", {}, sessionId);
await send("Runtime.enable", {}, sessionId);
await send(
  "Emulation.setDeviceMetricsOverride",
  { width: 1440, height: 1000, deviceScaleFactor: 1, mobile: false },
  sessionId,
);

async function evaluate(expression) {
  const res = await send(
    "Runtime.evaluate",
    { expression, returnByValue: true, awaitPromise: true },
    sessionId,
  );
  const thrown = res.result?.exceptionDetails;
  if (thrown) throw new Error(thrown.exception?.description ?? "page script failed");
  return res.result?.result?.value;
}

/* ------------------------------------------------------------------ */
/* In-page preparation                                                 */
/* ------------------------------------------------------------------ */

/**
 * Runs inside the page. Radix keeps collapsed accordion panels and unopened
 * select options out of the DOM entirely, so this opens them, harvests the
 * copy, and rewrites both as plain markup the export's own script can drive.
 */
const PREPARE = String.raw`(async () => {
  const wait = (ms) => new Promise((r) => setTimeout(r, ms));

  // --- FAQ accordion --------------------------------------------------
  for (const root of document.querySelectorAll('[data-slot="accordion"]')) {
    const items = [];
    for (const trigger of root.querySelectorAll('button[aria-expanded]')) {
      trigger.click();
      await wait(420);
      const region = document.getElementById(trigger.getAttribute("aria-controls") ?? "");
      items.push({
        question: trigger.textContent.trim(),
        answer: region ? region.textContent.trim() : "",
      });
      trigger.click();
      await wait(220);
    }

    root.replaceChildren(
      ...items.map(({ question, answer }, index) => {
        const wrapper = document.createElement("div");
        wrapper.className = "border-b border-line-soft";
        wrapper.setAttribute("data-faq-item", "");
        wrapper.innerHTML =
          '<h3 class="flex"><button type="button" data-faq-trigger aria-expanded="false"' +
          ' aria-controls="faq-panel-' + index + '"' +
          ' class="flex flex-1 cursor-pointer items-center justify-between gap-4 py-4 text-left text-base font-bold text-brand-strong transition-all">' +
          '<span></span>' +
          '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none"' +
          ' stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"' +
          ' class="shrink-0 text-brand transition-transform duration-200" aria-hidden="true">' +
          '<path d="m6 9 6 6 6-6"></path></svg></button></h3>' +
          '<div id="faq-panel-' + index + '" data-faq-panel hidden' +
          ' class="overflow-hidden pb-5 pr-8 text-sm leading-relaxed text-ink-soft"><p></p></div>';
        wrapper.querySelector("button > span").textContent = question;
        wrapper.querySelector("[data-faq-panel] p").textContent = answer;
        return wrapper;
      }),
    );
  }

  // --- interest picker -> native <select> ------------------------------
  for (const trigger of document.querySelectorAll('[data-slot="select-trigger"]')) {
    trigger.click();
    await wait(350);
    const options = [...document.querySelectorAll('[data-slot="select-item"]')].map((el) =>
      el.textContent.trim(),
    );
    document.body.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape", bubbles: true }));
    await wait(250);
    if (!options.length) continue;

    const select = document.createElement("select");
    select.id = trigger.id || "interest";
    select.name = "interest";
    select.className =
      "h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs " +
      "outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50";
    for (const option of options) {
      const el = document.createElement("option");
      el.value = option;
      el.textContent = option;
      select.append(el);
    }
    trigger.replaceWith(select);
  }

  // --- tidy up ---------------------------------------------------------
  // Reveal wrappers are re-driven by the export's own observer.
  document.querySelectorAll("[data-reveal]").forEach((el) => el.removeAttribute("data-reveal"));
  // Lazy loading inside a hidden page never triggers; the images are inlined anyway.
  document.querySelectorAll("img[loading=lazy]").forEach((el) => el.removeAttribute("loading"));
  // Radix leaves scroll-locking styles behind after the select closes.
  document.body.removeAttribute("style");
  document.body.removeAttribute("data-scroll-locked");

  return {
    main: document.querySelector("main").innerHTML,
    header: document.querySelector("header").outerHTML,
    footer: document.querySelector("footer").outerHTML,
    title: document.title,
    description: document.querySelector('meta[name="description"]')?.content ?? "",
  };
})()`;

/** Polls in-page until the shell has rendered and React has hydrated. */
async function waitForHydration(path) {
  for (let i = 0; i < 60; i++) {
    const ready = await evaluate(`(() => {
      const main = document.querySelector("main");
      return !!(document.querySelector("header") && document.querySelector("footer") &&
                main && main.children.length > 0 && document.readyState === "complete");
    })()`);
    if (ready) {
      // Radix widgets need a beat after hydration before they respond to clicks.
      await sleep(700);
      return;
    }
    await sleep(400);
  }
  throw new Error(`${path} never finished rendering`);
}

/* ------------------------------------------------------------------ */
/* Collect every page                                                  */
/* ------------------------------------------------------------------ */

// Warm the dev server so first-request compilation doesn't race the capture.
for (const route of ROUTES) await fetch(BASE + route.path).then((r) => r.text());

const pages = [];
let shell = null;

for (const route of ROUTES) {
  process.stdout.write(`• capturing ${route.path} `);
  await send("Page.navigate", { url: BASE + route.path }, sessionId);
  await waitForHydration(route.path);
  const captured = await evaluate(PREPARE);
  shell ??= { header: captured.header, footer: captured.footer };
  pages.push({ ...route, ...captured });
  console.log(`(${Math.round(captured.main.length / 1024)} KB)`);
}

/* ------------------------------------------------------------------ */
/* Stylesheet                                                          */
/* ------------------------------------------------------------------ */

console.log("• reading built stylesheet");
let cssFiles = [];
try {
  cssFiles = readdirSync(BUILT_ASSETS).filter((name) => name.endsWith(".css"));
} catch {
  /* reported below */
}
if (!cssFiles.length) {
  throw new Error(`No built stylesheet in ${BUILT_ASSETS}. Run \`npm run build\` before exporting.`);
}
const css = cssFiles.map((name) => readFileSync(resolve(BUILT_ASSETS, name), "utf8")).join("\n");
console.log(`  ${cssFiles.join(", ")} (${Math.round(css.length / 1024)} KB, minified)`);

/* ------------------------------------------------------------------ */
/* Images: deduplicate, recompress, embed once each                    */
/* ------------------------------------------------------------------ */

const assetPattern = /\/[\w./@-]+\.(?:jpg|jpeg|png|webp|avif|gif)/gi;
const allMarkup = pages.map((p) => p.main).join("") + shell.header + shell.footer + css;
const assetPaths = [...new Set(allMarkup.match(assetPattern) ?? [])];

/**
 * Recompresses through the browser's canvas — no native image dependency, and
 * Chrome is already running. Photographs at review size don't need 4000px
 * originals, and the PNG diagrams are far smaller as JPEG.
 */
const OPTIMISE = (url) => String.raw`(async () => {
  const load = (src) => new Promise((res, rej) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => res(img);
    img.onerror = () => rej(new Error("could not load " + src));
    img.src = src;
  });

  const img = await load(${JSON.stringify(url)});
  const scale = Math.min(1, ${MAX_WIDTH} / img.naturalWidth);
  const canvas = document.createElement("canvas");
  canvas.width = Math.max(1, Math.round(img.naturalWidth * scale));
  canvas.height = Math.max(1, Math.round(img.naturalHeight * scale));
  const ctx = canvas.getContext("2d");
  ctx.imageSmoothingQuality = "high";
  // JPEG has no alpha; flatten onto white so PNG diagrams keep their background.
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  return {
    uri: canvas.toDataURL("image/jpeg", ${QUALITY}),
    width: canvas.width,
    height: canvas.height,
  };
})()`;

console.log(`• embedding ${assetPaths.length} images (max ${MAX_WIDTH}px, q${QUALITY})`);
const images = new Map();
let originalBytes = 0;
let embeddedBytes = 0;

for (const [index, path] of assetPaths.entries()) {
  const url = BASE + path;
  const head = await fetch(url);
  if (!head.ok) {
    console.warn(`  ! skipped ${path} (${head.status})`);
    continue;
  }
  originalBytes += (await head.arrayBuffer()).byteLength;

  let result;
  try {
    result = await evaluate(OPTIMISE(url));
  } catch (error) {
    console.warn(`  ! could not recompress ${path}: ${error.message}`);
    continue;
  }
  embeddedBytes += result.uri.length;
  images.set(path, { key: `i${index}`, uri: result.uri });
}

console.log(
  `  ${(originalBytes / 1024 / 1024).toFixed(1)} MB source → ` +
    `${(embeddedBytes / 1024 / 1024).toFixed(1)} MB embedded (each image stored once)`,
);

ws.close();
chrome.kill();
server.kill();

/**
 * Swaps every image reference for a short key. The data URIs live once in a
 * JSON block at the end of the document and the runtime assigns them on load,
 * so an image used on five pages is stored once, not five times.
 */
function keyImages(markup) {
  let out = markup;
  for (const [path, { key }] of images) {
    out = out.split(`src="${path}"`).join(`src="" data-img="${key}"`);
    out = out.split(path).join(`#${key}`);
  }
  return out;
}

const imageMap = Object.fromEntries([...images.values()].map(({ key, uri }) => [key, uri]));

/* ------------------------------------------------------------------ */
/* Compose the single file                                             */
/* ------------------------------------------------------------------ */

const runtime = readFileSync(new URL("./review-copy-runtime.js", import.meta.url), "utf8");

const escapeAttr = (value) => value.replace(/&/g, "&amp;").replace(/"/g, "&quot;");
const escapeHtml = (value) =>
  value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

const pageMarkup = pages
  .map(
    (page, index) =>
      `<div class="gt-page" data-route="${escapeAttr(page.path)}" data-title="${escapeAttr(
        page.title,
      )}" data-label="${escapeAttr(page.label)}"${index === 0 ? "" : " hidden"}>${keyImages(
        page.main,
      )}</div>`,
  )
  .join("\n");

const generatedOn = new Date().toLocaleDateString("en-GB", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

const html = `<!doctype html>
<html lang="en-IN">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Gramonnati Trust — website review copy</title>
    <meta name="description" content="${escapeAttr(pages[0].description)}" />
    <meta name="robots" content="noindex, nofollow" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      rel="stylesheet"
      href="https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=Manrope:wght@400;500;600;700;800&display=swap"
    />
    <style>
${css}
    </style>
    <style>
      /* Review-copy chrome — not part of the real site. */
      .gt-review-bar {
        align-items: center;
        background: var(--color-brand-strong);
        color: var(--color-primary-foreground);
        display: flex;
        flex-wrap: wrap;
        font-family: var(--font-body);
        font-size: 0.78rem;
        gap: 0.75rem;
        justify-content: center;
        padding: 0.55rem 1rem;
        text-align: center;
      }
      .gt-review-bar strong { color: var(--color-sun); }
      .gt-review-bar button {
        background: transparent;
        border: 1px solid rgb(255 255 255 / 0.35);
        border-radius: 999px;
        color: inherit;
        cursor: pointer;
        font: inherit;
        padding: 0.15rem 0.7rem;
      }
      .gt-review-bar[hidden],
      .gt-page[hidden] { display: none; }
      img[data-img] { background: var(--color-mist); }
    </style>
  </head>
  <body>
    <div class="gt-review-bar" id="gt-review-bar">
      <span>
        <strong>Static review copy</strong> — Gramonnati Trust website, ${escapeHtml(generatedOn)}.
        Every page and interaction works offline; forms show their confirmation but don't send.
      </span>
      <button type="button" id="gt-review-dismiss">Hide this note</button>
    </div>

    <div class="flex min-h-screen flex-col overflow-x-hidden bg-paper text-foreground">
      ${keyImages(shell.header)}
      <main id="main" class="flex-1">
${pageMarkup}
      </main>
      ${keyImages(shell.footer)}
    </div>

    <script type="application/json" id="gt-images">
${JSON.stringify(imageMap)}
    </script>
    <script>
${runtime}
    </script>
  </body>
</html>
`;

mkdirSync(dirname(OUT), { recursive: true });
writeFileSync(OUT, html, "utf8");

const megabytes = (Buffer.byteLength(html) / 1024 / 1024).toFixed(1);
console.log(`\n✔ ${OUT}`);
console.log(`  ${pages.length} pages · ${images.size} images · ${megabytes} MB`);
console.log("  Open it in any browser, or send it as an attachment.");
