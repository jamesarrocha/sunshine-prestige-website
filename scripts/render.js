/* ============================================================
   RENDER — paints dynamic sections from data.js + i18n.js
   ============================================================ */
(() => {
  const t   = (k) => window.SP_I18N.t(k);
  const D   = window.SP_DATA;
  const esc = (s) => String(s).replace(/[&<>"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));

  function renderTrustStrip() {
    const items = [t('trust.usa'), t('trust.financing'), t('trust.counties'), t('trust.licensed'), t('trust.warranty')];
    const html = [...items, ...items].map(text => `
      <div class="trust-item">
        <span class="trust-item__star" aria-hidden="true">✦</span>
        <span>${esc(text)}</span>
      </div>
    `).join('');
    const el = document.getElementById('trust-track');
    if (el) el.innerHTML = html;
  }

  function renderPillars() {
    const el = document.getElementById('pillars-list');
    if (!el) return;
    el.innerHTML = D.PILLARS.map(p => `
      <li class="pillar reveal">
        <div class="pillar__num">${p.num}</div>
        <div class="pillar__bar" aria-hidden="true"></div>
        <div class="pillar__body">
          <h3 class="pillar__title">${t(p.titleKey)}</h3>
          <p class="pillar__copy">${t(p.copyKey)}</p>
        </div>
      </li>
    `).join('');
  }

  function renderBenefits() {
    const el = document.getElementById('benefits-grid');
    if (!el) return;
    el.innerHTML = D.BENEFITS.map(b => `
      <article class="benefit-card reveal">
        <div class="benefit-card__icon">${D.ICONS[b.icon]}</div>
        <h3 class="benefit-card__title">${t(b.titleKey)}</h3>
        <p class="benefit-card__copy">${t(b.copyKey)}</p>
        <span class="benefit-card__stat">${t(b.statKey)}</span>
      </article>
    `).join('');
  }

  function renderCollage(targetId, cells) {
    const el = document.getElementById(targetId);
    if (!el) return;
    el.innerHTML = cells.map(c => {
      if (c.type === 'stat') {
        return `
          <div class="collage-cell stat-card stat-card--${c.variant}">
            <div class="stat-card__num">${t(c.numKey)}</div>
            <div class="stat-card__label">${t(c.labelKey)}</div>
          </div>`;
      }
      return `
        <div class="collage-cell">
          <div class="collage-cell__placeholder" aria-hidden="true"></div>
          <span class="collage-cell__label">${t(c.labelKey)}</span>
        </div>`;
    }).join('');
  }

  function renderProcess() {
    const el = document.getElementById('process-phases');
    if (!el) return;
    el.innerHTML = D.PROCESS_PHASES.map(phase => `
      <div class="reveal">
        <header class="phase__header">
          <span class="phase__tag">${t(phase.tagKey)}</span>
          <h3 class="phase__title">${t(phase.titleKey)}</h3>
        </header>
        <ol class="phase__steps">
          ${phase.steps.map(s => `
            <li class="step">
              <div class="step__num">${s.num}</div>
              <div class="step__body">
                <h4 class="step__title">${t(s.titleKey)}</h4>
                <p class="step__copy">${t(s.copyKey)}</p>
              </div>
            </li>
          `).join('')}
        </ol>
      </div>
    `).join('');
  }

  function renderCoverage() {
    const el = document.getElementById('coverage-grid');
    if (!el) return;
    el.innerHTML = D.COUNTIES.map(c => `
      <article class="county-card reveal">
        <div class="county-card__icon">${D.ICONS.map}</div>
        <div class="county-card__name">${t(c.nameKey)}</div>
        <div class="county-card__sub">${t(c.subKey)}</div>
        <p class="county-card__cities">${t(c.citiesKey)}</p>
      </article>
    `).join('');
  }

  function renderGallery() {
    const el = document.getElementById('gallery-grid');
    if (!el) return;
    el.innerHTML = D.PROJECTS.map(p => `
      <article class="project-card reveal">
        <div class="project-card__split" aria-hidden="true">
          <div class="project-card__pane project-card__pane--before">
            <div class="project-card__window project-card__window--old"></div>
            <span class="project-card__label">${t('gallery.before')}</span>
          </div>
          <div class="project-card__pane project-card__pane--after">
            <div class="project-card__window project-card__window--new"></div>
            <span class="project-card__label">${t('gallery.after')}</span>
          </div>
        </div>
        <div class="project-card__body">
          <div class="project-card__location">${t(p.locationKey)}</div>
          <h3 class="project-card__title">${t(p.titleKey)}</h3>
          <p class="project-card__meta">${t(p.metaKey)}</p>
          <div class="project-card__chips">
            ${p.chips.map(ck => `<span class="project-card__chip">${t(ck)}</span>`).join('')}
          </div>
        </div>
      </article>
    `).join('');
  }

  function renderFloatingText() {
    const el = document.getElementById('floating-text-path');
    if (!el) return;
    el.textContent = t('float.text');
  }

  window.SP_RENDER = {
    all() {
      renderTrustStrip();
      renderPillars();
      renderBenefits();
      renderCollage('founder-collage',  D.FOUNDER_COLLAGE);
      renderCollage('leadgen-collage',  D.LEADGEN_COLLAGE);
      renderProcess();
      renderCoverage();
      renderGallery();
      renderFloatingText();
      if (window.SP_MAIN && window.SP_MAIN.refreshReveals) window.SP_MAIN.refreshReveals();
    },
  };
})();
