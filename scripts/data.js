/* ============================================================
   STATIC DATA — used by render.js
   Keep all repeating section content here as arrays so we
   never duplicate markup. Easy to edit in one place.
   ============================================================ */

const SITE = {
  phone: { display: '(305) 898-5167', tel: '+13058985167' },
  email: 'info@sunshineprestige.com',
  reviewsUrl:
    'https://www.google.com/maps/place/Sunshine+Prestige+Impact+Windows+and+Doors/data=!4m2!3m1!1s0x0:0xbd04d28289d25b35?sa=X&ved=1t:2428&hl=en&ictx=111',
  web3formsKey: 'REPLACE_WITH_YOUR_KEY',
};

const PILLARS = [
  { num: '01', titleKey: 'pillar1.t', copyKey: 'pillar1.c' },
  { num: '02', titleKey: 'pillar2.t', copyKey: 'pillar2.c' },
  { num: '03', titleKey: 'pillar3.t', copyKey: 'pillar3.c' },
  { num: '04', titleKey: 'pillar4.t', copyKey: 'pillar4.c' },
  { num: '05', titleKey: 'pillar5.t', copyKey: 'pillar5.c' },
];

/* Benefits — 3 short bullets + stat chip, optional image visual */
const BENEFITS = [
  {
    icon: 'hurricane', titleKey: 'b1.t', statKey: 'b1.s',
    bullets: ['b1.b1', 'b1.b2', 'b1.b3'],
    image: 'assets/img/hurricane-map.png',
    imageAlt: 'South Florida hurricane wind speed zones — 140 to 180 mph',
  },
  {
    icon: 'energy', titleKey: 'b2.t', statKey: 'b2.s',
    bullets: ['b2.b1', 'b2.b2', 'b2.b3'],
    image: 'assets/img/energy-flow.png',
    imageAlt: 'Low-E glass reflects solar heat while letting visible light through',
  },
  {
    icon: 'noise', titleKey: 'b3.t', statKey: 'b3.s',
    bullets: ['b3.b1', 'b3.b2', 'b3.b3'],
  },
  {
    icon: 'shield', titleKey: 'b4.t', statKey: 'b4.s',
    bullets: ['b4.b1', 'b4.b2', 'b4.b3'],
  },
  {
    icon: 'piggy', titleKey: 'b5.t', statKey: 'b5.s',
    bullets: ['b5.b1', 'b5.b2', 'b5.b3'],
  },
  {
    icon: 'home', titleKey: 'b6.t', statKey: 'b6.s',
    bullets: ['b6.b1', 'b6.b2', 'b6.b3'],
  },
];

const ICONS = {
  hurricane: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M12 4c4 0 7 3 7 7 0 0-4-2-7-2s-7 2-7 2c0-4 3-7 7-7z"/><path d="M19 11c0 4-3 7-7 7-4 0-7-3-7-7"/><circle cx="12" cy="12" r="2"/></svg>',
  energy:    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>',
  noise:     '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><line x1="22" y1="9" x2="16" y2="15"/><line x1="16" y1="9" x2="22" y2="15"/></svg>',
  shield:    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/></svg>',
  piggy:     '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M16 9.5C16 8 14.5 7 12 7s-4 1-4 3 2 2.5 4 3 4 1 4 3-1.5 3-4 3-4-1-4-2.5"/><line x1="12" y1="5" x2="12" y2="7"/><line x1="12" y1="17" x2="12" y2="19"/></svg>',
  home:      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12l9-9 9 9"/><path d="M5 10v10h14V10"/><polyline points="9 20 9 14 15 14 15 20"/></svg>',
  map:       '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>',
  check:     '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>',
  hardhat:   '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M3 18h18v-2a8 8 0 0 0-8-8h-2a8 8 0 0 0-8 8v2z"/><path d="M11 8V4h2v4"/><line x1="2" y1="21" x2="22" y2="21"/></svg>',
  flag:      '<svg viewBox="0 0 38 20" preserveAspectRatio="none"><rect width="38" height="20" fill="#B22234"/><rect y="1.54" width="38" height="1.54" fill="#fff"/><rect y="4.62" width="38" height="1.54" fill="#fff"/><rect y="7.69" width="38" height="1.54" fill="#fff"/><rect y="10.77" width="38" height="1.54" fill="#fff"/><rect y="13.85" width="38" height="1.54" fill="#fff"/><rect y="16.92" width="38" height="1.54" fill="#fff"/><rect width="15.2" height="10.77" fill="#3C3B6E"/><g fill="#fff"><circle cx="1.7" cy="1.3" r="0.55"/><circle cx="4.1" cy="1.3" r="0.55"/><circle cx="6.5" cy="1.3" r="0.55"/><circle cx="8.9" cy="1.3" r="0.55"/><circle cx="11.3" cy="1.3" r="0.55"/><circle cx="13.7" cy="1.3" r="0.55"/><circle cx="2.9" cy="2.7" r="0.55"/><circle cx="5.3" cy="2.7" r="0.55"/><circle cx="7.7" cy="2.7" r="0.55"/><circle cx="10.1" cy="2.7" r="0.55"/><circle cx="12.5" cy="2.7" r="0.55"/><circle cx="1.7" cy="4.1" r="0.55"/><circle cx="4.1" cy="4.1" r="0.55"/><circle cx="6.5" cy="4.1" r="0.55"/><circle cx="8.9" cy="4.1" r="0.55"/><circle cx="11.3" cy="4.1" r="0.55"/><circle cx="13.7" cy="4.1" r="0.55"/><circle cx="2.9" cy="5.5" r="0.55"/><circle cx="5.3" cy="5.5" r="0.55"/><circle cx="7.7" cy="5.5" r="0.55"/><circle cx="10.1" cy="5.5" r="0.55"/><circle cx="12.5" cy="5.5" r="0.55"/><circle cx="1.7" cy="6.9" r="0.55"/><circle cx="4.1" cy="6.9" r="0.55"/><circle cx="6.5" cy="6.9" r="0.55"/><circle cx="8.9" cy="6.9" r="0.55"/><circle cx="11.3" cy="6.9" r="0.55"/><circle cx="13.7" cy="6.9" r="0.55"/><circle cx="2.9" cy="8.3" r="0.55"/><circle cx="5.3" cy="8.3" r="0.55"/><circle cx="7.7" cy="8.3" r="0.55"/><circle cx="10.1" cy="8.3" r="0.55"/><circle cx="12.5" cy="8.3" r="0.55"/><circle cx="1.7" cy="9.7" r="0.55"/><circle cx="4.1" cy="9.7" r="0.55"/><circle cx="6.5" cy="9.7" r="0.55"/><circle cx="8.9" cy="9.7" r="0.55"/><circle cx="11.3" cy="9.7" r="0.55"/><circle cx="13.7" cy="9.7" r="0.55"/></g></svg>',
};

const PROCESS_PHASES = [
  {
    tagKey: 'phase1.tag', titleKey: 'phase1.title',
    steps: [
      { num: '01', titleKey: 'step1.t',  copyKey: 'step1.c' },
      { num: '02', titleKey: 'step2.t',  copyKey: 'step2.c' },
      { num: '03', titleKey: 'step3.t',  copyKey: 'step3.c' },
      { num: '04', titleKey: 'step4.t',  copyKey: 'step4.c' },
    ],
  },
  {
    tagKey: 'phase2.tag', titleKey: 'phase2.title',
    steps: [
      { num: '05', titleKey: 'step5.t',  copyKey: 'step5.c' },
      { num: '06', titleKey: 'step6.t',  copyKey: 'step6.c' },
      { num: '07', titleKey: 'step7.t',  copyKey: 'step7.c' },
      { num: '08', titleKey: 'step8.t',  copyKey: 'step8.c' },
    ],
  },
  {
    tagKey: 'phase3.tag', titleKey: 'phase3.title',
    steps: [
      { num: '09', titleKey: 'step9.t',  copyKey: 'step9.c' },
      { num: '10', titleKey: 'step10.t', copyKey: 'step10.c' },
    ],
  },
];

const COUNTIES = [
  { nameKey: 'cty1.name', subKey: 'cty1.sub', citiesKey: 'cty1.cities' },
  { nameKey: 'cty2.name', subKey: 'cty2.sub', citiesKey: 'cty2.cities' },
  { nameKey: 'cty3.name', subKey: 'cty3.sub', citiesKey: 'cty3.cities' },
];

const PROJECTS = [
  { locationKey: 'prj1.loc', titleKey: 'prj1.t', metaKey: 'prj1.m', chips: ['prj1.c1', 'prj1.c2'] },
  { locationKey: 'prj2.loc', titleKey: 'prj2.t', metaKey: 'prj2.m', chips: ['prj2.c1', 'prj2.c2'] },
  { locationKey: 'prj3.loc', titleKey: 'prj3.t', metaKey: 'prj3.m', chips: ['prj3.c1', 'prj3.c2'] },
];

/* Google Reviews (hardcoded — update when new ones arrive) */
const REVIEWS = [
  { initial: 'M', nameKey: 'rev1.name', textKey: 'rev1.text' },
  { initial: 'A', nameKey: 'rev2.name', textKey: 'rev2.text' },
  { initial: 'H', nameKey: 'rev3.name', textKey: 'rev3.text' },
];

const LEADGEN_COLLAGE = [
  { type: 'stat', variant: 'gold',       numKey: 'lstat1.n', labelKey: 'lstat1.l' },
  { type: 'placeholder', labelKey: 'lcol1.label' },
  { type: 'placeholder', labelKey: 'lcol2.label' },
  { type: 'stat', variant: 'periwinkle', numKey: 'lstat2.n', labelKey: 'lstat2.l' },
  { type: 'stat', variant: 'wine',       numKey: 'lstat3.n', labelKey: 'lstat3.l' },
  { type: 'placeholder', labelKey: 'lcol3.label' },
];

/* Trust strip items — with optional icon override (e.g. flag for USA-Made) */
const TRUST_ITEMS = [
  { textKey: 'trust.usa',       icon: 'flag' },
  { textKey: 'trust.inhouse' },
  { textKey: 'trust.financing' },
  { textKey: 'trust.counties' },
  { textKey: 'trust.licensed' },
];

/* expose to window for other scripts */
window.SP_DATA = {
  SITE, PILLARS, BENEFITS, ICONS, PROCESS_PHASES,
  COUNTIES, PROJECTS, REVIEWS, LEADGEN_COLLAGE, TRUST_ITEMS,
};
