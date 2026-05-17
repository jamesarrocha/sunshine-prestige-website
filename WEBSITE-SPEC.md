# Sunshine Website — Spec v1.0

> **Document purpose** — Source of truth for the marketing website at
> [sunshineprestige.com](https://sunshineprestige.com). Read by:
> (a) AI skills that produce landing pages, blog posts, and lead magnets,
> (b) new team members onboarding.
>
> **Last updated:** 2026-05-15
> **Owner:** Sofia Alexander · `info@sophiealexanderco.com`
> **Review cadence:** Monthly — see Section 12 for change-log discipline.

---

## 1. Stack técnico

| Item | Value |
|---|---|
| **Framework** | Vanilla **HTML + CSS + JavaScript** (no React, no Next.js, no Vue) |
| **Build step** | None — pure static files served as-is |
| **Hosting** | Vercel (free tier, Hobby plan) |
| **Production URL** | <https://sunshineprestige.com> · <https://www.sunshineprestige.com> (308 → apex) |
| **Vercel preview URL** | <https://sunshine-prestige-website.vercel.app> (307 → production apex) |
| **CMS / content source** | None — content lives in the repo as flat files (`scripts/i18n.js` for EN/ES copy, `scripts/data.js` for structured data, `index.html` for markup) |
| **Repo URL** | <https://github.com/jamesarrocha/sunshine-prestige-website> |
| **Repo visibility** | Public |
| **Repo owner** | `jamesarrocha` (GitHub) — admin: Sofia Alexander |
| **Domain registrar** | GoDaddy |
| **DNS provider** | GoDaddy (Microsoft 365 / iCloud email records preserved) |
| **SSL** | Auto-issued by Vercel via Let's Encrypt |
| **Fonts** | Google Fonts CDN — Montserrat · Cormorant · Inter |
| **Form handling** | Web3Forms (no own backend) |

**Constraint to know before adding features:** The site is intentionally
vanilla. Do not introduce React, Next.js, Astro, or any framework that
requires a build step without explicit owner approval. Any new feature
must be implementable as static HTML/CSS/JS.

---

## 2. URL structure

### Current (live)

| Pattern | Status |
|---|---|
| `/` | ✅ Live — single-page homepage with all sections |

### Planned (not yet built)

| Pattern | Purpose | Priority |
|---|---|---|
| `/impact-windows-{city}/` | SEO landing pages per city (e.g., `/impact-windows-coral-gables/`) | P1 — Phase 2 |
| `/impact-windows-miami-dade/` | County-level landing | P1 |
| `/impact-windows-broward/` | County-level landing | P1 |
| `/impact-windows-palm-beach/` | County-level landing | P1 |
| `/financing/` | Financing options + application widget | P2 |
| `/cost-calculator/` | Interactive cost estimator | P2 |
| `/about/` | Company story + team + license | P3 |
| `/contact/` | Standalone contact + map embed | P3 |
| `/blog/` | Blog index | P3 |
| `/blog/{slug}/` | Individual blog posts | P3 |
| `/thank-you/` | Post-form-submission confirmation | P3 (currently inline success message used) |
| `/legal/privacy/` · `/legal/terms/` | Compliance pages | P3 |

> **Naming convention** — kebab-case, lowercase, no trailing index file in
> URL (Vercel `cleanUrls: true` is already set in `vercel.json`).

---

## 3. Page inventory

| Route | Purpose | Status | Last update |
|---|---|---|---|
| `/` (homepage) | All-in-one landing: hero, pillars, benefits, lead-gen, gallery, marquee, reviews, process, coverage, warranties, final CTA, footer | ✅ Live | 2026-05-15 |

> **All other routes:** Pendiente. The site is intentionally single-page
> for launch velocity. Multi-page expansion is Phase 2 (see Section 11).

---

## 4. Brand styling aplicado

### ✅ Live & enforced

- **Color palette** — full 9-color system declared in `styles/variables.css`
  (navy / navy-deep / gold / gold-soft / periwinkle / royal / wine / ivory / paper)
- **Typography** — Montserrat (display) + Cormorant (serif italic) + Inter
  (body) loaded via Google Fonts CDN with `preconnect` for perf
- **Signature DNA pattern** — number + gold-bar + title applied to:
  Pillars (Section "Why Us"), Process steps (Section "Our 360° Promise"),
  Form fields (gold-bar accent on every label)
- **Motion** — premium ease-out curve `cubic-bezier(0.16, 1, 0.3, 1)` used
  for all transitions, hover lifts, modal entrances
- **Reveal-on-scroll** — IntersectionObserver-based fade-up applied to
  every major content block
- **Hero animation** — sliding headline (slide-up + stagger), ambient gold
  glow drift
- **Marquee section** — infinite scroll at constant speed (49s / 59s) with
  gold + ivory paired tracks
- **Flip-text section** — letter-by-letter hover flip with 25ms stagger
- **Floating consult button** — sticky bottom-right with revolving text
  around James's avatar
- **Gradient blobs** — Aceternity-style mouse-tracked blobs in Final CTA
  section
- **Zero black rule** — all "black" replaced with navy-deep `#0C1226`; all
  shadows brand-tinted with navy rgba
- **Component spacing** — 999px pill border-radius, generous section
  padding (80px mobile → 140px desktop)

### ⏳ Pendiente

- **City landing page template** — needs its own variant of hero with
  city-specific copy + Florida map illustration
- **Blog post template** — typography hierarchy needs editorial-style
  long-form treatment
- **Cost calculator UI** — needs custom interactive component (sliders,
  output panel) following the DNA pattern
- **Customer portal styling** — handled separately in `sunshine-platform`
  Vercel project; should pull `variables.css` for consistency once cross-
  domain styling strategy is decided

---

## 5. SEO conventions

### ✅ Live

- **Meta description** — single homepage meta in `<head>` of `index.html`
- **Open Graph tags** — `og:title`, `og:description`, `og:type=website`
- **Canonical URL** — `<link rel="canonical" href="https://sunshineprestige.com/" />`
- **`theme-color`** — `#1D284B` (navy)
- **Robots meta** — `index, follow`
- **Language declaration** — `<html lang="en">` (toggles to `es` via JS when ES selected)

### ⏳ Pendiente

| Item | Status | Notes |
|---|---|---|
| Schema.org markup | Pendiente | Need `LocalBusiness`, `Service`, `FAQPage`, `BreadcrumbList` JSON-LD |
| `sitemap.xml` | Pendiente | Generate static file when multi-page launches |
| `robots.txt` | Pendiente | Currently relies on Vercel defaults — should add explicit file |
| OG image | Pendiente | Currently no `og:image` declared — need branded 1200x630 PNG |
| Per-page meta | Pendiente | Will need when /blog and city pages launch |
| Hreflang tags | Pendiente | For EN/ES — currently i18n is client-side only, not crawlable separately |

### Meta description pattern (proposal for new pages)

```
{City/Topic}: {Primary Service}. {Differentiator}. {Trust Signal}.
```

**Example:**
> Impact Windows in Coral Gables: Hurricane-rated, energy-saving windows
> installed by Sunshine Prestige's in-house team. Lifetime workmanship
> guarantee. Free quote in 24 hours.

---

## 6. Forms inventory

| # | Form | Location | Fields | Endpoint | `source` value | Validation | Anti-spam | Confirmation |
|---|---|---|---|---|---|---|---|---|
| 1 | **Quote Modal** | Opens from Hero CTA, Final CTA, Floating Consult button | name, phone, email, county, zip, project | `POST https://api.web3forms.com/submit` | `hero` / `final-cta` / `floating` (set on open) | HTML5 native (`required`, `pattern`, `inputmode`) | Honeypot input `botcheck` (CSS-hidden) | Inline success message in-modal, form resets |
| 2 | **Inline Lead-Gen** | Mid-page section "30-second quote request" | name, email, phone | Same Web3Forms endpoint | `inline-leadgen` | HTML5 native | Honeypot `botcheck` | Inline success below form |
| 3 | **Footer Mini-Form** | Footer "Don't wait for the next storm" | email only | Same Web3Forms endpoint | `footer` | HTML5 native (`type=email`, `required`) | Honeypot `botcheck` | Inline success below input |

### Configuration

- **Web3Forms Access Key:** `2603dc52-1dfc-4416-9fd3-2423404cfe2f`
- **Email destination:** `info@sunshineprestige.com` (GoDaddy Email Essentials alias → `james@sunshineprestige.com`)
- **Subject line pattern:** `New lead — Sunshine Prestige` (Modal) · `New lead (Inline) — Sunshine Prestige` · `New lead (Footer) — Sunshine Prestige`
- **From name:** `sunshineprestige.com`
- **reCAPTCHA:** Not in use (honeypot is sufficient at current lead volume; reconsider if spam exceeds 5% of submissions)

### Source-tracking strategy

Every submission carries a hidden `source` field so James knows which CTA
converted each lead. Future analytics should aggregate by `source` to
identify which placement performs best.

---

## 7. Integraciones activas

| Service | Status | Configuration / notes |
|---|---|---|
| Google Analytics 4 | ❌ Pendiente | Not installed. Recommend adding `gtag.js` via GTM container |
| Google Tag Manager | ❌ Pendiente | Not installed. Should be the entry point for all future tags |
| Meta Pixel (Facebook) | ❌ Pendiente | Not installed |
| Google Business Profile | ✅ Linked | Reviews button + 3 review cards link to `https://www.google.com/maps/place/Sunshine+Prestige+Impact+Windows+and+Doors/...` |
| Klaviyo signup forms | ❌ Pendiente | No email-marketing flow yet |
| WhatsApp widget | ❌ Pendiente | Could be added to floating button area |
| SMS / text-click | ⚠️ Partial | `tel:` links work on mobile; no dedicated SMS endpoint |
| Live chat | ❌ Pendiente | None |
| Web3Forms | ✅ Active | Lead-capture handler — see Section 6 |
| Google Fonts | ✅ Active | Montserrat, Cormorant, Inter served via CDN |
| Vercel Speed Insights | ❌ Pendiente | Free, one-line install — recommend enabling |
| Vercel Web Analytics | ❌ Pendiente | Free privacy-friendly alternative to GA4 — consider before GA4 |

---

## 8. Tracking & analytics

### UTM parameter conventions (proposed — not yet enforced)

```
?utm_source={channel}&utm_medium={type}&utm_campaign={name}&utm_content={creative}
```

**Sources to standardize on:**
- `google` · `facebook` · `instagram` · `email` · `direct-mail` · `referral`

**Mediums:**
- `cpc` · `organic` · `social-paid` · `social-organic` · `email` · `print`

**Examples:**
- `?utm_source=facebook&utm_medium=social-paid&utm_campaign=hurricane-season-2026&utm_content=video-ad-1`
- `?utm_source=google&utm_medium=cpc&utm_campaign=impact-windows-miami&utm_content=exact-match-ad`

### Conversion events tracked

| Event | Status | Trigger |
|---|---|---|
| `form_submit_quote_modal` | Pendiente | Successful POST from Modal form |
| `form_submit_inline_leadgen` | Pendiente | Successful POST from Inline form |
| `form_submit_footer` | Pendiente | Successful POST from Footer form |
| `phone_click` | Pendiente | Any click on a `tel:` link |
| `reviews_click` | Pendiente | Click on Google Reviews badge or review card |
| `scroll_75` | Pendiente | User scrolled 75% of page (engagement signal) |

### GA4 goals / Meta Pixel events

Pendiente — to be set up alongside GA4 / Pixel install.

---

## 9. Deploy pipeline

| Stage | Configuration |
|---|---|
| **Production branch** | `main` |
| **Auto-deploy trigger** | Every push to `main` deploys to production within ~30 sec |
| **Preview deploys** | Every PR / non-`main` branch gets its own preview URL automatically |
| **Build command** | None (static files, no build step) |
| **Output directory** | Root (`./`) |
| **Cache headers** | Configured in `vercel.json` — assets (`.jpg .png .mp4 .webp .woff2`) cached 1 year immutable; `.css .js` cached 1 day with revalidation |
| **Rollback procedure** | Vercel Dashboard → Deployments → previous deploy → **"Promote to Production"** (instant, no DNS change needed) |
| **Deploy frequency** | Multiple times per day during active development; weekly to monthly in steady state |

### Branch strategy

- `main` is always production-deployable
- Feature branches: `feat/{short-name}` or `fix/{short-name}`
- Direct commits to `main` allowed for small fixes (current workflow given solo development)
- PRs preferred for any change touching more than one section

---

## 10. Content management

### How texts are edited

- **Static markup copy** (headlines, footer, legal): edit `index.html` directly
- **Translatable copy** (EN/ES dictionary): edit `scripts/i18n.js` —
  every user-visible string lives here
- **Structured data** (pillars, benefits, projects, reviews, etc.):
  edit `scripts/data.js`
- **Brand tokens** (colors, fonts, easing): edit `styles/variables.css`

All edits go via `git commit` → `git push origin main` → Vercel auto-deploys.

### How to publish a new blog post

Pendiente. Blog infrastructure not yet built. Two options when needed:

1. **Per-post HTML file** at `/blog/{slug}/index.html` (keeps vanilla)
2. **Migrate to a static-site generator** (Astro recommended) if blog grows
   beyond ~20 posts

### How to add a new landing page

1. Create `/{slug}/index.html` (e.g., `/impact-windows-coral-gables/index.html`)
2. Copy `index.html` as starting template
3. Update meta tags, headlines, copy
4. Commit + push to `main`

### Deploy permissions

| Role | Permission |
|---|---|
| Repo write access | `jamesarrocha` (owner) · Sofia (admin) |
| Vercel project access | Same — Sofia + jamesarrocha |
| GoDaddy DNS access | Sofia only |
| Web3Forms dashboard | Sofia |

---

## 11. Roadmap del site

| # | Initiative | Phase | Target | Notes |
|---|---|---|---|---|
| 1 | City-specific SEO landing pages (Miami-Dade, Broward, Palm Beach + top 10 cities) | Phase 2 | Q3 2026 | High SEO value — should be templated, not copy-pasted |
| 2 | Financing page with rate calculator | Phase 2 | Q3 2026 | Lead-gen booster — leverages financing partner data |
| 3 | Interactive cost calculator | Phase 2 | Q3 2026 | Sliders (window count, glass type, finish) → estimated range |
| 4 | Blog setup (`/blog/`) for SEO content marketing | Phase 3 | Q4 2026 | Decide between vanilla HTML files vs migrating to Astro |
| 5 | `/about/` page with full founder story + team | Phase 3 | Q4 2026 | Content currently lives only in homepage — should be expanded |
| 6 | Spanish version SEO-crawlable (currently client-side toggle only) | Phase 3 | Q4 2026 | Either split into `/es/` route tree or add hreflang + server render |
| 7 | Customer portal at `app.sunshineprestige.com` | Phase 2 | In progress | Lives in separate Vercel project `sunshine-platform` |
| 8 | Schema.org JSON-LD markup (LocalBusiness, Service, FAQ) | Phase 2 | Q3 2026 | Quick win, big SEO impact |
| 9 | GA4 + Meta Pixel + GTM setup | Phase 2 | Q3 2026 | Block on knowing what events to track |
| 10 | `/thank-you/` post-submission page (replace inline success) | Phase 3 | Q4 2026 | Better for ad-conversion tracking |
| 11 | Real photo replacements (Gallery Before/After + Lead-Gen collage + Founder photos) | Phase 1 | ASAP | Currently SVG placeholders |
| 12 | LinkedIn social link (when company opens LinkedIn) | Phase 1 | When live | Footer icon removed for now |
| 13 | Sitemap.xml + robots.txt explicit files | Phase 2 | Q3 2026 | Helps crawler discovery once multi-page |
| 14 | OG image generation (1200x630 branded PNG) | Phase 2 | Q3 2026 | Improves social-share previews |

---

## 12. Open questions / decisiones pendientes

| # | Question | Current default | Decision deadline |
|---|---|---|---|
| 1 | Site standalone vs integrated into CRM platform? | **Standalone** — marketing site at `sunshineprestige.com`, CRM at `app.sunshineprestige.com` | Decided ✓ |
| 2 | Partners / B2B aliados page? | Pendiente — not built | Q4 2026 |
| 3 | Customer portal on subdomain or internal route? | **Subdomain** (`app.sunshineprestige.com`) | Decided ✓ |
| 4 | Blog tech: keep vanilla per-file or move to Astro? | Pendiente | Before first blog post |
| 5 | EN/ES strategy: client-toggle (current) or `/es/` URL routes? | Client-toggle for now | Before Spanish SEO push |
| 6 | Analytics stack: GA4 or Vercel Web Analytics (or both)? | Pendiente | Before launching paid ads |
| 7 | Form spam: when do we add reCAPTCHA? | Honeypot only for now | When spam > 5% of submissions |
| 8 | Marketing automation: Klaviyo vs Mailchimp vs CRM-native? | Pendiente | Before launching nurture sequences |
| 9 | Live chat tool: Intercom, Crisp, custom? | None | Q1 2027 |
| 10 | Cost calculator: build in-house or embed (e.g., Calconic)? | Pendiente | Before Phase 2 launch |

---

## 🔄 Change log

| Date | Version | Author | Changes |
|---|---|---|---|
| 2026-05-15 | v1.0 | Sofia · Claude | Initial spec capturing post-launch state |

### Review reminder

**Every month** Sofia should review this doc and update Sections 2, 3, 6,
7, 11, and 12 to reflect any new pages, integrations, or decisions made.
If major architecture changes (framework swap, hosting change, etc.),
bump to v1.1, v1.2, etc.

> 💡 **Reminder mechanism** — can be automated via a scheduled task that
> pings the owner on the 1st of every month with this doc's path. Ask
> Claude to set this up if not already done.

---

*End of Sunshine Website — Spec v1.0*
