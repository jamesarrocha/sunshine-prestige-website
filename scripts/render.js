/* ============================================================
   RENDER — paints dynamic sections from data.js + i18n.js
   ============================================================ */
(() => {
  const t   = (k) => window.SP_I18N.t(k);
  const D   = window.SP_DATA;
  const esc = (s) => String(s).replace(/[&<>"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));

  function renderTrustStrip() {
    const el = document.getElementById('trust-track');
    if (!el) return;
    const renderItem = (item) => {
      const text = t(item.textKey);
      const isFlag = item.icon === 'flag';
      const iconHtml = isFlag
        ? `<span class="trust-item__flag" aria-hidden="true">${D.ICONS.flag}</span>`
        : `<span class="trust-item__star" aria-hidden="true">✦</span>`;
      const cls = isFlag ? 'trust-item trust-item--highlight' : 'trust-item';
      return `<div class="${cls}">${iconHtml}<span>${esc(text)}</span></div>`;
    };
    el.innerHTML = [...D.TRUST_ITEMS, ...D.TRUST_ITEMS].map(renderItem).join('');
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
    el.innerHTML = D.BENEFITS.map(b => {
      const imageBlock = b.image
        ? `<div class="benefit-card__image">
             <img src="${b.image}" alt="${esc(b.imageAlt || '')}" loading="lazy" />
           </div>`
        : '';
      const visualClass = b.image ? ' benefit-card--with-image' : '';
      return `
        <article class="benefit-card${visualClass} reveal">
          <div class="benefit-card__icon">${D.ICONS[b.icon]}</div>
          <h3 class="benefit-card__title">${t(b.titleKey)}</h3>
          <ul class="benefit-card__bullets">
            ${b.bullets.map(bk => `
              <li>
                <span class="benefit-card__check" aria-hidden="true">${D.ICONS.check}</span>
                <span>${t(bk)}</span>
              </li>
            `).join('')}
          </ul>
          ${imageBlock}
          <span class="benefit-card__stat">${t(b.statKey)}</span>
        </article>
      `;
    }).join('');
  }

  function renderLeadGenCollage() {
    const el = document.getElementById('leadgen-collage');
    if (!el) return;
    el.innerHTML = D.LEADGEN_COLLAGE.map(c => {
      if (c.type === 'stat') {
        return `
          <div class="collage-cell stat-card stat-card--${c.variant}">
            <div class="stat-card__num">${t(c.numKey)}</div>
            <div class="stat-card__label">${t(c.labelKey)}</div>
          </div>`;
      }
      const media = c.image
        ? `<img src="${c.image}" alt="" loading="lazy" />`
        : `<div class="collage-cell__placeholder" aria-hidden="true"></div>`;
      return `
        <div class="collage-cell">
          ${media}
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

  function renderReviews() {
    const el = document.getElementById('reviews-grid');
    if (!el) return;
    const url = D.SITE.reviewsUrl;
    el.innerHTML = D.REVIEWS.map(r => `
      <a class="review-card reveal" href="${url}" target="_blank" rel="noopener" aria-label="${esc(t(r.nameKey))} · ${esc(t('reviews.viaGoogle'))}">
        <div class="review-card__avatar" aria-hidden="true">${r.initial}</div>
        <div class="review-card__name">${esc(t(r.nameKey))}</div>
        <div class="review-card__stars" aria-hidden="true">★★★★★</div>
        <p class="review-card__text">${esc(t(r.textKey))}</p>
        <div class="review-card__source">
          <svg class="review-card__google" viewBox="0 0 48 48" aria-hidden="true">
            <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3c-1.6 4.6-6 8-11.3 8-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 7.9 3l5.7-5.7C34 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.4-.4-3.5z"/>
            <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 16 19 13 24 13c3.1 0 5.8 1.2 7.9 3l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"/>
            <path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35 26.7 36 24 36c-5.3 0-9.7-3.4-11.3-8L6.2 33C9.5 39.5 16.2 44 24 44z"/>
            <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.1-4.1 5.6l6.2 5.2C40 35 44 30 44 24c0-1.3-.1-2.4-.4-3.5z"/>
          </svg>
          <span>${esc(t('reviews.viaGoogle'))}</span>
        </div>
      </a>
    `).join('');
  }

  function renderFloatingText() {
    const el = document.getElementById('floating-text-path');
    if (!el) return;
    el.textContent = t('float.text');
  }

  function renderGoogleBadge() {
    const badge = document.getElementById('hero-google-badge');
    if (!badge) return;
    badge.href = D.SITE.reviewsUrl;
    const ratingEl = badge.querySelector('[data-google-rating]');
    const countEl  = badge.querySelector('[data-google-count]');
    if (ratingEl) ratingEl.textContent = D.SITE.googleRating;
    if (countEl)  countEl.textContent  = D.SITE.googleReviewCount;
  }

  window.SP_RENDER = {
    all() {
      renderTrustStrip();
      renderPillars();
      renderBenefits();
      renderLeadGenCollage();
      renderProcess();
      renderCoverage();
      renderGallery();
      renderReviews();
      renderFloatingText();
      renderGoogleBadge();
      if (window.SP_MAIN && window.SP_MAIN.refreshReveals) window.SP_MAIN.refreshReveals();
    },
  };
})();
