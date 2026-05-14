# Sunshine Prestige — Impact Windows & Doors

Official website for **Sunshine Prestige**, serving Miami-Dade, Broward, and Palm Beach. **Built to protect what matters most.**

## Stack

- **Vanilla HTML + CSS + JavaScript** (no build step)
- Fonts loaded from Google Fonts CDN: Montserrat · Cormorant · Inter
- Form handling via **Web3Forms** (free, no backend)
- Deployed to **Vercel** · custom domain via **GoDaddy**

## Local preview

```bash
# any static server works — pick one:
python3 -m http.server 5500
# or:  npx serve .
# or:  open index.html in Chrome (some autoplay may need a server)
```

Then open <http://localhost:5500>.

## Project structure

```
sunshine-prestige-website/
├── index.html                  # homepage
├── styles/
│   ├── reset.css               # minimal reset
│   ├── variables.css           # brand tokens — edit colors HERE
│   ├── globals.css             # body, typography, utilities
│   ├── animations.css          # all @keyframes
│   ├── components.css          # buttons, modal, forms, cards, logo
│   └── sections.css            # hero, pillars, benefits, founder, etc.
├── scripts/
│   ├── data.js                 # pillars, benefits, projects, copy keys
│   ├── i18n.js                 # EN/ES dictionary + applyTranslations
│   ├── render.js               # paints dynamic sections
│   └── main.js                 # entry — modal, forms, scroll, blobs
├── assets/
│   ├── video/hero.mp4
│   └── img/
│       ├── hero-poster.jpg
│       ├── collage/            # (drop lead-gen collage photos here)
│       ├── projects/           # (drop before/after photos here)
│       └── founder/            # (drop James photos here)
├── vercel.json                 # cache headers + clean URLs
└── README.md
```

## To customize before launch

1. **Phone number** — edit `scripts/data.js` → `SITE.phone` and update `tel:` links in `index.html`
2. **Web3Forms access key** — replace every `REPLACE_WITH_YOUR_KEY` with your real key
   - In `index.html` there are 3 forms (modal, inline, footer)
   - Sign up free at <https://web3forms.com>
3. **Google Reviews URL** — already wired ✓
4. **Logo** — currently a faithful SVG recreation. Drop the official SVG into `assets/img/logo.svg` and swap the inline SVG markup
5. **Real photos**:
   - Founder collage → `assets/img/founder/` + edit `data.js`
   - Lead-gen collage → `assets/img/collage/`
   - Before/After → `assets/img/projects/`
6. **License number** — in `index.html` footer (`#XXXXXXX`)

## Lead capture map

| # | Touchpoint | Form type | Fields | `source` value |
|---|---|---|---|---|
| 1 | Hero "Get a Free Quote" | Modal (full) | name, phone, email, county, ZIP, project | `hero` |
| 2 | Floating consult button | Modal (full) | same | `floating` |
| 3 | Inline lead-gen section | Quick | name, email, phone | `inline-leadgen` |
| 4 | Footer mini-form | Email-only | email | `footer` |
| 5 | Final CTA | Modal (full) | same | `final-cta` |

Every submission carries a hidden `source` field so you know which CTA converted each lead.

## Deploy

1. Push to GitHub (rama `main`)
2. Import the repo in Vercel — it auto-deploys
3. In Vercel project settings → Domains → add `sunshineprestige.com`
4. In GoDaddy DNS:
   - Apex `@` → A record → `76.76.21.21`
   - `www` → CNAME → `cname.vercel-dns.com`

---

© Sunshine Prestige Impact Windows & Doors.
