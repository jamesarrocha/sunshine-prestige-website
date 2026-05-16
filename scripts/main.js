/* ============================================================
   MAIN — entry point. Wires up all behaviors.
   Loaded LAST so SP_DATA / SP_I18N / SP_RENDER exist.
   ============================================================ */
(() => {
  const $  = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
  const t  = (k) => window.SP_I18N.t(k);
  const SITE = window.SP_DATA.SITE;

  /* ─────────────────────────────────────────────
     SAFARI DETECTION (gradient blobs fallback)
     ───────────────────────────────────────────── */
  const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
  if (isSafari) {
    const blobs = $('.blobs');
    if (blobs) blobs.classList.add('is-safari');
  }

  /* ─────────────────────────────────────────────
     LANGUAGE TOGGLE
     ───────────────────────────────────────────── */
  $$('.lang-toggle button').forEach(btn => {
    btn.addEventListener('click', () => window.SP_I18N.setLocale(btn.dataset.lang));
  });

  /* ─────────────────────────────────────────────
     TOPBAR SCROLL STATE
     ───────────────────────────────────────────── */
  const topbar = $('#topbar');
  if (topbar) {
    const onScroll = () => topbar.classList.toggle('is-scrolled', window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ─────────────────────────────────────────────
     REVEAL-ON-SCROLL OBSERVER
     ───────────────────────────────────────────── */
  let revealObserver;
  function refreshReveals() {
    if (revealObserver) revealObserver.disconnect();
    revealObserver = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('is-visible');
          revealObserver.unobserve(e.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    $$('.reveal:not(.is-visible)').forEach(el => revealObserver.observe(el));
  }

  /* ─────────────────────────────────────────────
     MODAL OPEN / CLOSE (Quote form)
     ───────────────────────────────────────────── */
  const modal       = $('#quote-modal');
  const modalSourceInput = $('#quote-form input[name="source"]');

  function openModal(source = 'unknown') {
    if (!modal) return;
    if (modalSourceInput) modalSourceInput.value = source;
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    setTimeout(() => $('#f-name')?.focus(), 100);
  }
  function closeModal() {
    if (!modal) return;
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    const msg = $('#form-msg');
    if (msg) { msg.className = 'form-msg'; msg.textContent = ''; }
  }

  $$('[data-open-modal]').forEach(b => {
    b.addEventListener('click', () => openModal(b.dataset.openModal || 'unknown'));
  });
  $$('[data-close-modal]').forEach(b => b.addEventListener('click', closeModal));
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && modal?.classList.contains('is-open')) closeModal();
  });

  /* ─────────────────────────────────────────────
     FORM SUBMISSION — Web3Forms (3 forms share logic)
     ───────────────────────────────────────────── */
  async function submitForm({ form, btn, msgEl, successKey, errorKey }) {
    const fd = new FormData(form);
    if (fd.get('botcheck')) return; // honeypot

    msgEl.className = 'form-msg';
    msgEl.textContent = '';
    const originalLabel = btn.textContent;
    btn.disabled = true;
    btn.textContent = t('form.submitting');

    const accessKey = fd.get('access_key');

    // Local dev mode — log to console instead of POSTing
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
      console.info('[Sunshine Prestige · DEV] Lead captured:', Object.fromEntries(fd.entries()));
      await new Promise(r => setTimeout(r, 700));
      msgEl.textContent = t(successKey);
      msgEl.classList.add('is-success');
      form.reset();
      btn.disabled = false;
      btn.textContent = originalLabel;
      return;
    }

    try {
      const res = await fetch('https://sunshine-platform.vercel.app/api/public/contact-form', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(Object.fromEntries(fd.entries())),
      });
      const data = await res.json();
      if (data.ok) {
        msgEl.textContent = t(successKey);
        msgEl.classList.add('is-success');
        form.reset();
      } else {
        throw new Error(data.message || 'Failed');
      }
    } catch (err) {
      console.error(err);
      msgEl.textContent = t(errorKey);
      msgEl.classList.add('is-error');
    } finally {
      btn.disabled = false;
      btn.textContent = originalLabel;
    }
  }

  // 1) MODAL FORM (hero + final-cta + floating button → all open same modal)
  const quoteForm = $('#quote-form');
  if (quoteForm) {
    quoteForm.addEventListener('submit', e => {
      e.preventDefault();
      submitForm({
        form: quoteForm,
        btn: $('#form-submit-btn'),
        msgEl: $('#form-msg'),
        successKey: 'form.success',
        errorKey: 'form.error',
      });
    });
  }

  // 2) INLINE LEAD-GEN form
  const inlineForm = $('#leadgen-form');
  if (inlineForm) {
    inlineForm.addEventListener('submit', e => {
      e.preventDefault();
      submitForm({
        form: inlineForm,
        btn: $('#leadgen-submit-btn'),
        msgEl: $('#leadgen-msg'),
        successKey: 'form.success',
        errorKey: 'form.error',
      });
    });
  }

  // 3) FOOTER mini-form
  const footerForm = $('#footer-form');
  if (footerForm) {
    footerForm.addEventListener('submit', e => {
      e.preventDefault();
      submitForm({
        form: footerForm,
        btn: $('#footer-submit-btn'),
        msgEl: $('#footer-msg'),
        successKey: 'form.success',
        errorKey: 'form.error',
      });
    });
  }

  /* ─────────────────────────────────────────────
     MARQUEE — runs at constant base speed (CSS only)
     ───────────────────────────────────────────── */

  /* ─────────────────────────────────────────────
     FLIP-TEXT — split each [data-flip-text] line into
     two letter layers so CSS can do the hover flip.
     ───────────────────────────────────────────── */
  $$('[data-flip-text]').forEach(line => {
    const text = line.dataset.flipText || '';
    const letters = text.split('');
    const buildLayer = (cls) => {
      const layer = document.createElement('div');
      layer.className = `flip-line__layer ${cls}`;
      letters.forEach((ch, i) => {
        const span = document.createElement('span');
        span.className = 'flip-line__letter';
        span.style.transitionDelay = `${i * 25}ms`;
        span.textContent = ch === ' ' ? ' ' : ch;
        layer.appendChild(span);
      });
      return layer;
    };
    line.innerHTML = '';
    line.appendChild(buildLayer('flip-line__layer--top'));
    line.appendChild(buildLayer('flip-line__layer--bottom'));
  });

  /* ─────────────────────────────────────────────
     GRADIENT BLOBS — pointer-tracking (Final CTA)
     ───────────────────────────────────────────── */
  const blobsContainer = $('.blobs');
  const pointer = $('.blob--pointer');
  if (blobsContainer && pointer) {
    let curX = 0, curY = 0, tgX = 0, tgY = 0;
    blobsContainer.parentElement.addEventListener('mousemove', e => {
      const rect = blobsContainer.getBoundingClientRect();
      tgX = e.clientX - rect.left;
      tgY = e.clientY - rect.top;
    });
    function animate() {
      curX += (tgX - curX) / 20;
      curY += (tgY - curY) / 20;
      pointer.style.transform = `translate(${Math.round(curX)}px, ${Math.round(curY)}px)`;
      requestAnimationFrame(animate);
    }
    animate();
  }

  /* ─────────────────────────────────────────────
     SMOOTH-SCROLL NAV ANCHORS (overrides any CSS)
     ───────────────────────────────────────────── */
  $$('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const id = a.getAttribute('href');
      if (!id || id === '#') return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  /* ─────────────────────────────────────────────
     EXPOSE + INIT
     ───────────────────────────────────────────── */
  window.SP_MAIN = { openModal, closeModal, refreshReveals };

  // Boot sequence:  i18n.apply()  →  triggers render.all()  →  refreshReveals()
  window.SP_I18N.apply();
})();
