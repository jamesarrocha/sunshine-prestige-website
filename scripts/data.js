/* ============================================================
   STATIC DATA — used by render.js
   Keep all repeating section content here as arrays so we
   never duplicate markup. Easy to edit in one place.
   ============================================================ */

const SITE = {
  phone: { display: '(555) 123-4567', tel: '+15551234567' },
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

const BENEFITS = [
  { icon: 'hurricane', titleKey: 'b1.t', copyKey: 'b1.c', statKey: 'b1.s' },
  { icon: 'energy',    titleKey: 'b2.t', copyKey: 'b2.c', statKey: 'b2.s' },
  { icon: 'noise',     titleKey: 'b3.t', copyKey: 'b3.c', statKey: 'b3.s' },
  { icon: 'shield',    titleKey: 'b4.t', copyKey: 'b4.c', statKey: 'b4.s' },
  { icon: 'piggy',     titleKey: 'b5.t', copyKey: 'b5.c', statKey: 'b5.s' },
  { icon: 'home',      titleKey: 'b6.t', copyKey: 'b6.c', statKey: 'b6.s' },
];

const ICONS = {
  hurricane: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 4c4 0 7 3 7 7 0 0-4-2-7-2s-7 2-7 2c0-4 3-7 7-7z"/><path d="M19 11c0 4-3 7-7 7-4 0-7-3-7-7"/><circle cx="12" cy="12" r="2"/></svg>',
  energy:    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>',
  noise:     '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><line x1="22" y1="9" x2="16" y2="15"/><line x1="16" y1="9" x2="22" y2="15"/></svg>',
  shield:    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/></svg>',
  piggy:     '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M16 9.5C16 8 14.5 7 12 7s-4 1-4 3 2 2.5 4 3 4 1 4 3-1.5 3-4 3-4-1-4-2.5"/><line x1="12" y1="5" x2="12" y2="7"/><line x1="12" y1="17" x2="12" y2="19"/></svg>',
  home:      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12l9-9 9 9"/><path d="M5 10v10h14V10"/><polyline points="9 20 9 14 15 14 15 20"/><polyline points="7 4 7 1 10 1"/></svg>',
  map:       '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>',
  user:      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>',
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

/* Founder collage cells: alternates image placeholders + stat cards.
   Replace `placeholder: true` cells with <img src="/assets/img/founder/..."> markup later. */
const FOUNDER_COLLAGE = [
  { type: 'placeholder', labelKey: 'fcol1.label' },                                  // James photo
  { type: 'stat', variant: 'gold',     numKey: 'fstat1.n', labelKey: 'fstat1.l' },   // 20+ years
  { type: 'placeholder', labelKey: 'fcol2.label' },                                  // Install team
  { type: 'stat', variant: 'navy',     numKey: 'fstat2.n', labelKey: 'fstat2.l' },   // MBA
  { type: 'placeholder', labelKey: 'fcol3.label' },                                  // Finished home
  { type: 'stat', variant: 'royal',    numKey: 'fstat3.n', labelKey: 'fstat3.l' },   // 3 counties
];

const LEADGEN_COLLAGE = [
  { type: 'stat', variant: 'gold',       numKey: 'lstat1.n', labelKey: 'lstat1.l' },   // ±100 PSF
  { type: 'placeholder', labelKey: 'lcol1.label' },                                    // Install in progress
  { type: 'placeholder', labelKey: 'lcol2.label' },                                    // Family inside
  { type: 'stat', variant: 'periwinkle', numKey: 'lstat2.n', labelKey: 'lstat2.l' },   // 24h response
  { type: 'stat', variant: 'wine',       numKey: 'lstat3.n', labelKey: 'lstat3.l' },   // Lifetime guar.
  { type: 'placeholder', labelKey: 'lcol3.label' },                                    // Laminated glass
];

/* expose to window for other scripts */
window.SP_DATA = { SITE, PILLARS, BENEFITS, ICONS, PROCESS_PHASES, COUNTIES, PROJECTS, FOUNDER_COLLAGE, LEADGEN_COLLAGE };
