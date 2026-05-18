# Sunshine Website — Astro Migration Plan v1.0

> **Companion doc to `WEBSITE-SPEC.md`.** This plan moves the marketing
> site from vanilla HTML/CSS/JS to Astro to unlock Phase 2 growth (15
> city landing pages, blog, financing page, cost calculator) without
> the site becoming unmaintainable.
>
> **Owner:** Sofia Alexander · **Author:** Claude · **Date:** 2026-05-17
> **Target completion:** 2026-05-28 (3 days before campaign launch on June 1)

---

## 0. Decisions locked

| # | Decision | Choice |
|---|---|---|
| 1 | EN/ES strategy | **A — URL routing `/es/`** with hreflang |
| 2 | Blog authoring | **B — Notion as CMS** (build-time pull via Notion API) |
| 3 | Cost calculator | **C — Hybrid** (instant client estimate + form CTA to CRM) |
| 4 | Cutover | **A — Same repo, `astro-migration` branch, Vercel preview, merge to main** |
| 5 | Executor | Claude (no separate cost) |
| 6 | Bonus | Calculator fires `fbq('track', 'ViewContent')` mid-funnel for retargeting |

---

## 1. Executive summary

| | |
|---|---|
| **What** | Replace vanilla static site with Astro static site (same output: pure HTML/CSS/JS) |
| **Why** | Phase 2 needs 30-40 pages with shared layouts, type-safe content, EN/ES routing, sitemap, hreflang. Vanilla can't scale to that without manual duplication |
| **Risk level** | Low — Astro outputs static HTML, deploys to Vercel identically, no infra change |
| **Visible to user** | Zero (same domain, same SSL, same content, same speed or faster) |
| **Effort** | 3-4 days of focused work (24-32 hours) |
| **Timeline** | May 18 → May 28, ~10 working days with buffer |
| **Cutover downtime** | Zero (Vercel atomic deploys, preview URL until merged) |
| **Rollback** | Single command (`git revert` + Vercel auto-redeploys old commit) |

---

## 2. Migration plan — 10 phases with explicit commits

Each phase produces 1+ commits to the `astro-migration` branch. Vercel auto-deploys each push as a preview URL. We validate each phase visually before moving to the next. Production (`main`) is untouched until Phase 10.

### Phase 1 — Project scaffold (Day 1 · ~3 hrs)

- Create branch `astro-migration` from `main`
- Move existing files into a temporary `_legacy/` folder (preserves them for reference; ignored by Astro build)
- Run `npm create astro@latest` with template "Minimal"
- Install dependencies: `@astrojs/vercel`, `@astrojs/sitemap`, `@astrojs/mdx`, `@notionhq/client`
- Configure `astro.config.mjs` with Vercel adapter + sitemap + i18n base config
- Verify `npm run dev` serves a blank Astro page locally
- Verify Vercel preview URL builds and serves

**Commit:** `feat(astro): scaffold Astro project with Vercel adapter`

### Phase 2 — Brand styles drop-in (Day 1 · ~1 hr)

The current `styles/*.css` is plain CSS — drops in unchanged. No CSS-in-JS or Tailwind, no migration friction.

- Copy `styles/{reset,variables,globals,animations,components,sections}.css` → `src/styles/`
- Import them in `src/layouts/BaseLayout.astro` so they're global
- Verify in browser: blank page picks up `--gold`, `--navy`, fonts load from Google CDN

**Commit:** `feat(styles): port brand CSS to Astro src/styles, import globally`

### Phase 3 — BaseLayout + Hero (Day 2 · ~3 hrs)

Build the foundational layout and the most-complex section first to flush out issues.

- Create `src/layouts/BaseLayout.astro` with:
  - `<head>` containing meta tags, fonts, brand CSS, Meta Pixel base, domain verification
  - `<body>` with `<slot />` for page content
  - Footer + Floating Consult Button included by default
  - Props for per-page `title`, `description`, `ogImage`, `canonical`, `lang`
- Create `src/components/Hero.astro` with the video bg + headline + CTAs
- Create `src/pages/index.astro` that uses BaseLayout + Hero
- All inline `<script>` blocks become Astro `<script>` blocks (auto-bundled by Astro)

**Commit:** `feat(layout): BaseLayout + Hero component renders pixel-perfect`

### Phase 4 — Remaining sections as components (Day 2-3 · ~5 hrs)

Extract each homepage section into its own `.astro` component. Each one is a self-contained chunk of HTML + scoped styles.

```
src/components/
├── Hero.astro
├── Topbar.astro
├── TrustStrip.astro
├── Pillars.astro
├── Benefits.astro
├── LeadGenInline.astro
├── Gallery.astro
├── MarqueeSection.astro
├── FlipTextSection.astro
├── Reviews.astro
├── Process.astro
├── Coverage.astro
├── Warranty.astro
├── FinalCTA.astro
├── Footer.astro
├── QuoteModal.astro
├── FloatingConsultButton.astro
└── LanguageToggle.astro
```

- Each `.astro` file holds the markup that lived inside the corresponding section in old `index.html`
- The `render.js` template-string approach is replaced with Astro's native templating (`{D.PILLARS.map(p => <Pillar />)}`)
- `data.js` becomes `src/data/{pillars,benefits,projects,reviews,counties,countries}.ts` (typed)
- Visual + animation **must match pixel-for-pixel** before commit

**Commit:** `feat(sections): port all 11 sections to Astro components, data.js → typed TS`

### Phase 5 — Interactive JS (Day 3 · ~3 hrs)

Astro supports two script strategies:

| Where the script runs | Astro syntax |
|---|---|
| Once per-component, bundled + minified | `<script>` (top-level in `.astro` file) |
| Inline raw, no bundling | `<script is:inline>` |

Map the existing JS:

| Behavior | Strategy | Location |
|---|---|---|
| Marquee speed | CSS-only, no JS needed | Already in `sections.css` |
| Flip-text letter wrap | `<script>` inside `FlipTextSection.astro` | Bundled per-page |
| Gradient blobs pointer tracking | `<script>` inside `FinalCTA.astro` | Bundled per-page |
| Floating consult button | `<script>` inside `FloatingConsultButton.astro` | Bundled |
| Quote modal open/close | `<script>` inside `QuoteModal.astro` | Bundled |
| Form submit to CRM | `<script>` inside `BaseLayout.astro` (forms exist on every page) | Bundled, global |
| Reveal-on-scroll IntersectionObserver | `<script>` inside `BaseLayout.astro` | Bundled, global |
| Topbar scroll state | `<script>` inside `Topbar.astro` | Bundled |
| Smooth-scroll nav anchors | `<script>` inside `Topbar.astro` | Bundled |
| Meta Pixel events (Lead, Contact) | `<script>` inside `BaseLayout.astro` | Bundled, global |

Astro's bundler tree-shakes unused scripts per-page automatically.

**Commit:** `feat(scripts): port all interactive JS to per-component Astro scripts`

### Phase 6 — i18n with `/es/` routing (Day 4 · ~4 hrs)

This is the largest single behavioral change.

Configure `astro.config.mjs`:

```js
i18n: {
  defaultLocale: 'en',
  locales: ['en', 'es'],
  routing: {
    prefixDefaultLocale: false,  // EN at /, ES at /es/
  },
}
```

URL plan:

```
sunshineprestige.com/              → EN homepage
sunshineprestige.com/es/           → ES homepage
sunshineprestige.com/about/        → EN
sunshineprestige.com/es/about/     → ES
sunshineprestige.com/blog/{slug}/  → EN
sunshineprestige.com/es/blog/{slug}/ → ES (when localized version exists)
```

Migrate `scripts/i18n.js` dictionary → `src/i18n/{en,es}.ts` typed files.

In components, use a `t()` helper that pulls from the dict based on `Astro.currentLocale`:

```astro
---
import { t } from '../i18n/utils';
const lang = Astro.currentLocale;
---
<h1>{t(lang, 'hero.line1')}</h1>
```

Language toggle becomes 2 anchor tags (not JS state):

```astro
<a href={lang === 'es' ? '/' : '/es/'}>
  {lang === 'es' ? 'EN' : 'ES'}
</a>
```

Add hreflang tags in `<head>`:

```html
<link rel="alternate" hreflang="en" href="https://sunshineprestige.com/" />
<link rel="alternate" hreflang="es" href="https://sunshineprestige.com/es/" />
<link rel="alternate" hreflang="x-default" href="https://sunshineprestige.com/" />
```

**Commit:** `feat(i18n): URL-routed EN/ES with hreflang, language toggle as anchors`

### Phase 7 — Content Collections + Notion blog integration (Day 5-6 · ~5 hrs)

Define two collections in `src/content/config.ts`:

```ts
import { defineCollection, z } from 'astro:content';

const cities = defineCollection({
  type: 'data',
  schema: z.object({
    slug: z.string(),
    city: z.string(),
    county: z.enum(['miami-dade', 'broward', 'palm-beach']),
    population: z.number().optional(),
    hurricaneZone: z.string(),
    designSpeedMph: z.number(),
    neighborhoods: z.array(z.string()),
    ogImage: z.string().optional(),
    heroVariant: z.enum(['default', 'storm', 'family']).default('default'),
    metaDescriptionEn: z.string().max(160),
    metaDescriptionEs: z.string().max(160).optional(),
    bodyEn: z.string(),  // long-form rich text
    bodyEs: z.string().optional(),
    publishedAt: z.coerce.date(),
  }),
});

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    excerpt: z.string().max(200),
    author: z.string().default('Sunshine Prestige Team'),
    publishedAt: z.coerce.date(),
    updatedAt: z.coerce.date().optional(),
    coverImage: z.string().optional(),
    tags: z.array(z.string()),
    locale: z.enum(['en', 'es']).default('en'),
    canonicalSlug: z.string().optional(),  // for EN/ES pairs
    notionPageId: z.string(),  // source-of-truth ID
  }),
});

export const collections = { cities, blog };
```

**City pages** are flat data files — easy to author by hand or by an AI skill:

```
src/content/cities/coral-gables.json
src/content/cities/miami-beach.json
src/content/cities/aventura.json
...
```

Build-time generator at `src/pages/impact-windows/[slug].astro`:

```astro
---
import { getCollection } from 'astro:content';
export async function getStaticPaths() {
  const cities = await getCollection('cities');
  return cities.map(c => ({ params: { slug: c.data.slug }, props: c }));
}
---
```

**Blog posts via Notion** — build-time pull, not runtime:

- New Notion database "Sunshine Blog" with properties: Title, Slug, Status, PublishedAt, Author, Excerpt, Cover, Tags, Locale, Body
- Script `scripts/sync-notion-blog.mjs` runs at build:
  1. Pull all `Status = Published` rows from Notion API
  2. Convert each page's body blocks to MDX
  3. Write to `src/content/blog/{slug}.mdx`
- Hooked into `npm run build` as a `prebuild` step
- Vercel rebuild trigger: Notion webhook → Vercel Deploy Hook → automatic redeploy on publish
- Backup: a manual `npm run sync:blog` to force-pull

Sofia/James workflow:
1. Open Notion, write the post
2. Set Status = Published, click Save
3. Notion webhook hits Vercel Deploy Hook
4. Vercel rebuilds in ~30-60 sec
5. Post is live at `sunshineprestige.com/blog/{slug}/`

**Commit:** `feat(content): Cities + Blog collections, Notion sync script, build hook`

### Phase 8 — SEO upgrades (Day 7 · ~3 hrs)

Now that we have multiple pages and i18n, the SEO improvements unlock:

| Feature | How |
|---|---|
| `sitemap.xml` | `@astrojs/sitemap` integration auto-generates from all routes |
| `robots.txt` | Static file at `public/robots.txt`, references sitemap |
| OG images per page | `@vercel/og` for dynamic images, or static per-page PNG in `public/og/` |
| Schema.org JSON-LD | Per-page `<script type="application/ld+json">` rendered server-side. Templates for `LocalBusiness`, `Service`, `Article`, `FAQPage`, `BreadcrumbList` |
| Per-page canonical URLs | Computed in `BaseLayout.astro` from `Astro.url` |
| Per-page meta description | Frontmatter prop, default fallback |
| hreflang | Already added in Phase 6 |

**Commit:** `feat(seo): sitemap, robots, schema templates, per-page meta + OG`

### Phase 9 — Cost calculator (Day 7-8 · ~4 hrs)

Hybrid calculator at `/cost-calculator/` (and `/es/cost-calculator/`):

**UI:**
- 5 slider inputs: # of windows, # of doors, glass tier (standard/low-E/custom), home age, frame finish
- Live computed price range as user changes sliders
- "Get exact quote" CTA below the range → opens existing QuoteModal pre-filled with calculator state

**Math (client-side, no backend):**
- Static price multipliers in `src/data/calculator-pricing.ts`
- Range computed as `(low_bound, high_bound)` to account for project variance
- Re-runs on every slider input event

**Meta Pixel mid-funnel signal (per your suggestion):**

```js
// Fires when user has touched all 5 inputs AND seen the range
function onCalculatorComplete(rangeLow, rangeHigh) {
  const midpoint = Math.round((rangeLow + rangeHigh) / 2);
  if (typeof fbq === 'function') {
    fbq('track', 'ViewContent', {
      content_name: 'Cost Calculator Completed',
      content_category: 'Calculator',
      estimated_value: midpoint,
      currency: 'USD',
    });
  }
}
```

This event is debounced (5-second cooldown) so users sliding back and forth don't fire 50 events. One event per "I saw a price" moment.

**Custom Audience use case** *(for the Meta Ads team):*
- "Users who completed calculator in last 30 days" = warm retargeting pool
- "Users who completed AND estimated_value > $15K" = high-intent segment
- "Users who completed but did NOT submit Lead form" = abandoned-funnel retargeting

**Commit:** `feat(calculator): hybrid cost calculator with ViewContent pixel signal`

### Phase 10 — Testing + cutover (Day 9-11 · ~6 hrs)

**Pre-cutover validation (on preview URL):**

| Check | Tool | Pass criteria |
|---|---|---|
| Visual diff vs production | Manual side-by-side at 360px, 768px, 1280px, 1920px | Zero perceivable difference on homepage |
| Lighthouse | Chrome DevTools | Performance ≥ 95, SEO 100, Accessibility ≥ 95, Best Practices 100 |
| Form submission | Test submit on each of the 3 forms | Lead arrives in CRM, Pixel `Lead` event fires |
| Phone link clicks | Pixel Helper | `Contact` event fires |
| EN/ES routing | Click language toggle from every page | Stays on equivalent URL in other lang |
| `sitemap.xml` validity | Online sitemap validator | All routes present, valid XML |
| Hreflang | Google Rich Results test | No errors |
| Schema markup | Google Rich Results test | LocalBusiness, Article schemas valid |
| Cross-browser | Chrome, Safari, Firefox, Edge | Identical render |
| Mobile devices | iPhone Safari, Android Chrome | Identical render |

**Cutover steps (5 minutes):**

1. Final preview URL approval from Sofia
2. Merge `astro-migration` → `main` via PR
3. Vercel auto-deploys main within ~60 sec
4. Hard refresh `sunshineprestige.com` to confirm new build serves
5. Quick smoke-test on phone: load page, submit form, verify Pixel events
6. Done. Old vanilla code lives in git history forever.

**Commit:** `chore: cutover Astro to production via main branch merge`

---

## 3. Effort estimate per phase

| Phase | Hours | Days (8h/day) |
|---|---|---|
| 1. Project scaffold | 3 | 0.4 |
| 2. Brand styles drop-in | 1 | 0.1 |
| 3. BaseLayout + Hero | 3 | 0.4 |
| 4. Remaining sections | 5 | 0.6 |
| 5. Interactive JS | 3 | 0.4 |
| 6. i18n /es/ routing | 4 | 0.5 |
| 7. Content Collections + Notion | 5 | 0.6 |
| 8. SEO upgrades | 3 | 0.4 |
| 9. Cost calculator | 4 | 0.5 |
| 10. Testing + cutover | 6 | 0.75 |
| **Subtotal** | **37 hrs** | **4.6 days** |
| Buffer (15%) | 5.5 hrs | 0.7 |
| **TOTAL** | **42.5 hrs** | **~5.3 days** |

**Realistic calendar with ~6 hrs/day actual focus time:**
~7 calendar days of work (with normal pauses, validations, your feedback cycles).

---

## 4. Calendar — concrete dates

| Phase | Calendar dates | Deliverable |
|---|---|---|
| 1 | **May 18 (Mon)** | Astro scaffold + Vercel preview URL live |
| 2 | **May 18 (Mon)** | Brand CSS in Astro, fonts rendering |
| 3 | **May 19 (Tue)** | Hero pixel-perfect on preview |
| 4 | **May 20-21 (Wed-Thu)** | All 11 sections ported |
| 5 | **May 22 (Fri)** | All interactive JS working |
| 6 | **May 25 (Mon)** | EN/ES URL routing live + hreflang |
| 7 | **May 26 (Tue)** | Notion blog integration tested end-to-end |
| 8 | **May 26 (Tue)** | SEO files + schema |
| 9 | **May 27 (Wed)** | Cost calculator + ViewContent pixel |
| 10a | **May 27-28 (Wed-Thu)** | Cross-browser testing + Lighthouse |
| 10b | **May 28 (Thu) PM** | Sofia final review |
| Cutover | **May 29 (Fri)** | Merge to main, production live on Astro |
| Buffer | **May 30 — Jun 1** | Monitor + minor fixes before campaign launch |
| Campaign launch | **Jun 1** | Hurricane season ads start on stable Astro foundation |

> **3-day safety buffer between cutover and campaign launch.** If anything
> wobbles after cutover, we have time to fix or roll back before paid
> traffic hits.

---

## 5. Proposed repo structure (after migration)

```
sunshine-prestige-website/
├── astro.config.mjs              # i18n, sitemap, vercel adapter, mdx
├── tsconfig.json
├── package.json
├── vercel.json                   # cache headers (preserved)
├── public/
│   ├── og/                       # static OG images per route
│   ├── assets/                   # video, posters, logo
│   └── robots.txt
├── src/
│   ├── pages/
│   │   ├── index.astro           # EN homepage
│   │   ├── about.astro
│   │   ├── contact.astro
│   │   ├── financing.astro
│   │   ├── cost-calculator.astro
│   │   ├── impact-windows/
│   │   │   └── [slug].astro      # dynamic city pages
│   │   ├── blog/
│   │   │   ├── index.astro       # blog list
│   │   │   └── [slug].astro      # individual post
│   │   └── es/                   # mirror of EN tree
│   │       ├── index.astro
│   │       ├── about.astro
│   │       └── ...
│   ├── layouts/
│   │   ├── BaseLayout.astro
│   │   ├── CityLayout.astro
│   │   └── BlogLayout.astro
│   ├── components/
│   │   ├── Hero.astro
│   │   ├── Topbar.astro
│   │   ├── ... (one per section)
│   │   └── ui/
│   │       ├── Button.astro
│   │       └── FormField.astro
│   ├── content/
│   │   ├── config.ts             # collection schemas
│   │   ├── cities/*.json         # 15+ city data files
│   │   └── blog/*.mdx            # generated by Notion sync
│   ├── data/                     # static data (typed)
│   │   ├── pillars.ts
│   │   ├── benefits.ts
│   │   ├── reviews.ts
│   │   └── calculator-pricing.ts
│   ├── i18n/
│   │   ├── en.ts                 # EN dictionary
│   │   ├── es.ts                 # ES dictionary
│   │   └── utils.ts              # t() helper
│   ├── scripts/                  # build-time scripts
│   │   └── sync-notion-blog.mjs
│   └── styles/
│       ├── reset.css
│       ├── variables.css         # brand tokens (untouched)
│       ├── globals.css
│       ├── animations.css
│       ├── components.css
│       └── sections.css
├── _legacy/                      # old vanilla files (gitignored after Phase 10)
├── WEBSITE-SPEC.md               # source-of-truth spec (already exists)
├── MIGRATION-PLAN-ASTRO.md       # this doc
├── Sunshine-Prestige-Brand-Manual.pdf
└── README.md
```

---

## 6. Risk analysis + mitigations

| # | Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|---|
| 1 | i18n migration introduces subtle copy bugs (typos, missing keys) | Medium | Low — copy stays in dict, just routed differently | Diff old `i18n.js` keys vs new `en.ts`/`es.ts` programmatically, fail build on missing keys |
| 2 | JS interactivity breaks during component re-architecture | Medium | Medium — could ship with broken modal or marquee | Test every interaction on preview URL before cutover. Specific test scenarios in Phase 10 |
| 3 | Notion API rate limit hit during build | Low | Low — blog post not appearing | Cache Notion responses with 5-min TTL, retry with backoff, fail gracefully (use last good snapshot) |
| 4 | Vercel build timeout (if Notion pull is slow) | Low | Medium — deployment fails | Run Notion sync as separate prebuild step with its own timeout, commit MDX to repo so Vercel doesn't need Notion at build |
| 5 | Browser cache serves stale assets during cutover | Low | Low — temporary visual oddity | Vercel uses content-hashed asset URLs by default; old cached HTML still pulls correct CSS |
| 6 | DNS / domain breaks during cutover | Near zero | High | NO DNS changes in this migration. Same domain, same Vercel project, just new build |
| 7 | Lighthouse score regresses vs vanilla | Low | Medium — bad for SEO | Run Lighthouse before each major commit. Astro typically scores HIGHER than vanilla because of better resource hints + image optimization |
| 8 | Meta Pixel events stop firing after migration | Medium | High — ad campaigns can't optimize | Phase 10 testing explicitly validates Lead, Contact, PageView, ViewContent firings. Pixel Helper verification required before cutover |
| 9 | Form submissions stop reaching CRM | Low | Critical — leads lost | Phase 10 includes submitting a real test lead through each form. Smoke test post-cutover within 5 min |
| 10 | Sofia / James can't edit content easily | Medium | Medium — adoption suffers | Notion CMS reduces friction for blog. City pages stay as JSON files (simple to edit, AI skills can write them). Train Sofia on the new workflow in Phase 10 |

---

## 7. Rollback plan

If something critical breaks post-cutover, rollback is **a single command**:

```bash
git revert <merge-commit-sha>
git push origin main
# Vercel auto-deploys the pre-merge state within ~60 sec
```

The old vanilla code lives in git history. The `astro-migration` branch is preserved.
Production is back to vanilla in under 2 minutes.

**Triggers for rollback:**
- Forms stop accepting submissions (verified via CRM not receiving leads for >15 min)
- Lighthouse drops below 90 on any core metric
- Meta Pixel stops firing on any of: PageView, Lead, Contact
- Visual regression visible to users (broken layout, missing section)
- 500-level errors on Vercel

**Triggers for fix-forward (not rollback):**
- Minor visual issue affecting 1 section
- Cosmetic content typo
- Performance regression < 5% on Lighthouse
- Single-browser-only bug

---

## 8. Cost calculator detailed spec

### UI layout

```
┌─────────────────────────────────────────────────┐
│                                                  │
│         COST CALCULATOR                          │
│         Get an instant estimate.                 │
│                                                  │
│         No personal info needed.                 │
│                                                  │
├─────────────────────────────────────────────────┤
│                                                  │
│   How many windows?            [ slider 1-30 ]   │
│   How many doors?              [ slider 0-10 ]   │
│   Glass tier?                  [ radio 3 ]       │
│   Home age?                    [ radio 3 ]       │
│   Frame finish?                [ radio 4 ]       │
│                                                  │
├─────────────────────────────────────────────────┤
│                                                  │
│         ESTIMATED RANGE                          │
│                                                  │
│         $14,000 — $22,000                        │
│                                                  │
│         For a typical Coral Gables install       │
│                                                  │
├─────────────────────────────────────────────────┤
│                                                  │
│      [ GET EXACT QUOTE — TALK TO JAMES ]         │
│                                                  │
└─────────────────────────────────────────────────┘
```

### Pricing model (transparent, in `calculator-pricing.ts`)

```ts
export const PRICING = {
  basePerWindow: { standard: 650, lowE: 850, custom: 1200 },
  basePerDoor:   { standard: 1800, lowE: 2400, custom: 3500 },
  homeAgeMultiplier: { lt10: 1.0, lt30: 1.1, gt30: 1.25 },  // older = more retrofit work
  frameFinishMultiplier: { white: 1.0, bronze: 1.08, custom: 1.20, woodGrain: 1.30 },
  installationOverhead: 0.18,   // 18% of materials
  rangeSpread: 0.20,            // ±20% to account for site variance
};
```

### Pixel event firing logic

```js
let calculatorState = { windows: null, doors: null, tier: null, age: null, finish: null };
let lastFiredAt = 0;
const COOLDOWN_MS = 5000;

function onInputChange(field, value) {
  calculatorState[field] = value;
  renderRange();

  // Fire ViewContent when all 5 are set, debounced
  const allSet = Object.values(calculatorState).every(v => v !== null);
  if (allSet && Date.now() - lastFiredAt > COOLDOWN_MS) {
    const { low, high } = computeRange(calculatorState);
    if (typeof fbq === 'function') {
      fbq('track', 'ViewContent', {
        content_name: 'Cost Calculator Completed',
        content_category: 'Calculator',
        estimated_value: Math.round((low + high) / 2),
        currency: 'USD',
      });
    }
    lastFiredAt = Date.now();
  }
}
```

### "Get exact quote" CTA behavior

Opens the existing `QuoteModal` pre-filled with:
- Hidden field `source` = `cost-calculator`
- Hidden field `calculator_estimate` = `$14000-$22000`
- Hidden field `calculator_inputs` = JSON of all 5 selections
- Form posts to CRM endpoint as usual

CRM team can now see: lead came from calculator, here's what they estimated, here's their preferences. Sales has cold call context.

---

## 9. Notion blog integration — detailed

### Notion database setup (Sofia does this once)

Create database "Sunshine Blog" in Sofia's Notion workspace with:

| Property | Type | Required | Notes |
|---|---|---|---|
| Title | Title | ✓ | The post title |
| Slug | Text | ✓ | URL slug (e.g. `hurricane-prep-checklist`) |
| Status | Select | ✓ | Draft / Published / Archived |
| PublishedAt | Date | ✓ | Used for sort + URL filtering |
| Author | Text | ✓ | Default "Sunshine Prestige Team" |
| Excerpt | Text | ✓ | ≤200 chars for SEO meta + card preview |
| Cover | Files | – | Optional hero image |
| Tags | Multi-select | – | hurricane / energy / financing / etc. |
| Locale | Select | ✓ | en / es |
| CanonicalSlug | Text | – | Link EN ↔ ES versions of same post |

### Integration architecture

```
[Sofia writes in Notion]
        ↓
[Status = Published]
        ↓
[Notion webhook → Vercel Deploy Hook]
        ↓
[Vercel rebuild starts]
        ↓
[npm run build executes prebuild: sync-notion-blog.mjs]
        ↓
[Script pulls all Status=Published rows]
        ↓
[Each row → src/content/blog/{slug}.mdx file]
        ↓
[Astro Content Collections picks them up]
        ↓
[Static HTML generated for /blog/{slug}/]
        ↓
[Vercel publishes new deploy]
        ↓
[Post live in ~60 sec]
```

### Environment variables (Vercel)

```
NOTION_API_KEY      = secret_xxx
NOTION_DATABASE_ID  = uuid-of-the-blog-database
```

### Manual sync command (for testing)

```bash
npm run sync:blog
# pulls latest Notion state into src/content/blog/
```

---

## 10. Brand bible / spec impact

After migration completes, `WEBSITE-SPEC.md` gets a **v2.0 bump** to reflect:

| Section | Change |
|---|---|
| §1 Stack técnico | Vanilla → Astro 5+ |
| §2 URL structure | All planned routes now live |
| §3 Page inventory | Many new entries |
| §4 Brand styling | Still 100% applied (zero visual change) |
| §5 SEO conventions | All "Pendiente" items now ✅ |
| §6 Forms inventory | No change (same endpoint, same payload) |
| §7 Integraciones | Add Notion API to active list |
| §8 Tracking | Add ViewContent (calculator) event |
| §10 Content management | Document Notion blog workflow + City page workflow |
| §11 Roadmap | Many items move from "Pendiente" to "Live" |

The monthly auto-review routine continues running — no changes to that.

---

## 11. Open questions / things I need Sofia to do

### Before Phase 1

- [ ] Confirm Notion workspace where the blog database will live
- [ ] Generate Notion API integration key + share `NOTION_API_KEY` to add to Vercel env
- [ ] (Optional) provide first 1-2 sample blog posts so we can validate end-to-end during Phase 7

### Before Phase 9 (cost calculator)

- [ ] Approve the pricing assumptions in `PRICING` constants (or provide your actual numbers)
- [ ] Decide the calculator slug — `/cost-calculator/`, `/estimate/`, `/get-pricing/`?

### Before Phase 10 (cutover)

- [ ] Final visual approval of preview URL
- [ ] Confirm 60 min window when you're available to monitor post-cutover

### Optional Phase 11 (post-launch)

- [ ] City page content for top 5 cities (so we have something to publish day 1 of Phase 2)
- [ ] First 3 blog posts to seed the blog

---

## 12. Why this is the right time (and the right tool)

### Why now?

| Force | Argument |
|---|---|
| **Campaigns start June 1** | Stable platform must be in place. Migrating during campaigns = mid-flight engine swap. Migrating now = pre-launch foundation work. |
| **Pixel is live, domain verified** | Both major Meta dependencies installed AND tested. Migration won't disrupt them — they survive any code refactor. |
| **Phase 2 is 6 weeks away** | Doing this now means 6 weeks of Astro stability before adding 15 city pages. Doing it later means doing both at once = compounded risk. |
| **Hurricane season alignment** | Customer urgency peaks June-November. The site needs to scale content (city pages, blog) during this window. Phase 2 must launch on a stack that supports it. |
| **No technical debt yet** | Site is 14 days old. Migration cost is at its absolute lowest. Every week of delay = more vanilla content to migrate. |

### Why Astro specifically (vs Next.js, Hugo, Eleventy)?

| | Astro | Next.js | Hugo | Eleventy |
|---|---|---|---|---|
| Static HTML output by default | ✅ | ⚠️ Hybrid | ✅ | ✅ |
| Component model (not just templates) | ✅ | ✅ | ❌ | ⚠️ |
| Built-in TypeScript | ✅ | ✅ | ❌ | ⚠️ |
| Built-in i18n routing | ✅ | ⚠️ Plugin | ✅ | ❌ |
| Migration from vanilla = drop-in | ✅ | ❌ React-shaped | ❌ Go templates | ⚠️ |
| Zero JS bundle by default | ✅ | ❌ Ships React runtime | ✅ | ✅ |
| Build speed | Fast | Slower | Fastest | Fast |
| MDX support | ✅ | ✅ | ❌ | ⚠️ |
| Image optimization | ✅ Built-in | ✅ Built-in | ⚠️ | ❌ |
| Vercel deploy | ✅ Native | ✅ Native | ✅ | ✅ |

**Astro wins on this specific use case:** marketing site that needs to grow into a content site, must remain static HTML, must preserve vanilla animations, must add type-safe blog + i18n routing.

---

## 13. Cost

**$0 separately billable.** This migration is continuation of the existing engagement. You pay for Claude usage as normal; no project fee, no hourly rate.

If at any point you want a second pair of eyes (senior frontend dev to review the migration), I can recommend a freelancer or you can hire one — but I'd suggest waiting until Phase 10 (right before cutover) for an outside review rather than during build.

---

## 14. Change log

| Date | Version | Author | Changes |
|---|---|---|---|
| 2026-05-17 | v1.0 | Sofia · Claude | Initial migration plan locked, all 6 decisions approved, calendar set |

---

## 🎯 Final approval needed from Sofia

Before I touch any code, please confirm:

- [ ] **A) Calendar approved** — start May 18 (tomorrow Monday), cutover May 29, campaigns June 1
- [ ] **B) All 10 phases approved** as described above
- [ ] **C) Notion CMS workflow approved** — Sofia will set up the Notion database before Phase 7
- [ ] **D) Cost calculator pricing approved** as a starting assumption (refinable later)
- [ ] **E) Rollback plan understood** and acceptable
- [ ] **F) Authorization to create `astro-migration` branch and start Phase 1 on May 18**

Reply with **"Approved — empieza Phase 1 mañana"** or list specific items to renegotiate.

---

*End of MIGRATION-PLAN-ASTRO.md v1.0*
