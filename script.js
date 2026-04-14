/* ==========================================================================
   SCILAB — Sales page interactions
   ========================================================================== */

(function () {
  'use strict';

  /* ---------- Countdown to 2026-04-20 23:59:59 (São Paulo, BRT = UTC-3) ---------- */
  const DEADLINE = new Date('2026-04-20T23:59:59-03:00').getTime();

  const pad = (n) => String(n).padStart(2, '0');

  const heroEl  = document.querySelector('[data-countdown-hero]');
  const copyEl  = document.querySelector('[data-countdown-copy]');
  const bigEl   = document.querySelector('[data-countdown-big]');
  const finalEl = document.querySelector('[data-countdown-final]');
  const dEl = document.querySelector('[data-cd-dd]');
  const hEl = document.querySelector('[data-cd-hh]');
  const mEl = document.querySelector('[data-cd-mm]');
  const sEl = document.querySelector('[data-cd-ss]');
  const panelEl = document.querySelector('[data-countdown-panel]');

  let expiredPainted = false;

  const paintExpired = () => {
    if (expiredPainted) return;
    expiredPainted = true;
    if (heroEl) heroEl.parentElement.textContent = 'Lançamento encerrado — inscrições em preço regular';
    if (copyEl) copyEl.innerHTML = 'A oferta de lançamento foi encerrada. Inscrições seguem abertas em <b>preço regular</b>.';
    if (finalEl) finalEl.textContent = 'inscrições em preço regular';
    [dEl, hEl, mEl, sEl].forEach(n => { if (n) n.textContent = '00'; });
    if (panelEl) panelEl.classList.add('is-expired');
  };

  const tick = () => {
    const now = Date.now();
    let delta = DEADLINE - now;
    if (delta <= 0) { paintExpired(); return; }

    const dd = Math.floor(delta / 86400000); delta -= dd * 86400000;
    const hh = Math.floor(delta / 3600000);  delta -= hh * 3600000;
    const mm = Math.floor(delta / 60000);    delta -= mm * 60000;
    const ss = Math.floor(delta / 1000);

    if (heroEl)  heroEl.textContent  = `${pad(dd)}d ${pad(hh)}h ${pad(mm)}min`;
    if (bigEl)   bigEl.textContent   = `${dd} dia${dd !== 1 ? 's' : ''} · ${pad(hh)}h · ${pad(mm)}min · ${pad(ss)}s`;
    if (finalEl) finalEl.textContent = `${dd}d · ${pad(hh)}h · ${pad(mm)}min`;
    if (dEl) dEl.textContent = pad(dd);
    if (hEl) hEl.textContent = pad(hh);
    if (mEl) mEl.textContent = pad(mm);
    if (sEl) sEl.textContent = pad(ss);
  };

  tick();
  setInterval(tick, 1000);


  /* ---------- Module progress tracker ---------- */
  (function () {
    const progress = document.getElementById('progress');
    if (!progress) return;

    const fill    = progress.querySelector('[data-progress-fill]');
    const phaseEl = progress.querySelector('[data-progress-phase]');
    const labelEl = progress.querySelector('[data-progress-label]');
    const numEl   = progress.querySelector('[data-progress-num]');
    const ticks   = progress.querySelectorAll('[data-progress-tick]');
    const items   = document.querySelectorAll('.modules__item');
    const total   = items.length;

    const setModule = (el) => {
      if (!el) return;
      const n = parseInt(el.dataset.module, 10);
      const phase = el.dataset.phase;
      const label = el.dataset.label;

      if (fill) fill.style.width = (n / total * 100) + '%';
      if (phaseEl) phaseEl.textContent = phase;
      if (labelEl) labelEl.innerHTML = label;
      if (numEl) numEl.textContent = String(n).padStart(2, '0');

      ticks.forEach((t) => {
        const tn = parseInt(t.dataset.progressTick, 10);
        t.classList.toggle('is-active', tn <= n);
      });
      items.forEach((it) => it.classList.toggle('is-active', it === el));
    };

    setModule(items[items.length - 1]);

    items.forEach((it) => {
      it.addEventListener('mouseenter', () => setModule(it));
      it.addEventListener('focusin',    () => setModule(it));
      it.addEventListener('click',      () => setModule(it));
    });

    const cardIo = new IntersectionObserver((entries) => {
      let best = null;
      entries.forEach((e) => {
        if (e.isIntersecting) {
          if (!best || e.intersectionRatio > best.intersectionRatio) best = e;
        }
      });
      if (best) setModule(best.target);
    }, {
      threshold: [0.5, 0.75, 0.95],
      rootMargin: '-30% 0px -30% 0px'
    });
    items.forEach((it) => cardIo.observe(it));

    /* Auto sweep on first view */
    let played = false;
    const sectionIo = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting && !played) {
          played = true;
          let i = 0;
          const step = () => {
            if (i < items.length) {
              setModule(items[i]);
              i++;
              setTimeout(step, 240);
            }
          };
          setTimeout(step, 220);
        }
      });
    }, { threshold: 0.3 });
    const section = document.querySelector('.section--modules');
    if (section) sectionIo.observe(section);

    /* Sticky pin detection */
    const sensor = document.createElement('div');
    sensor.style.cssText = 'height:1px;width:100%;pointer-events:none';
    progress.parentNode.insertBefore(sensor, progress);
    const pinIo = new IntersectionObserver(([entry]) => {
      progress.classList.toggle('is-pinned', !entry.isIntersecting && entry.boundingClientRect.top < 0);
    }, { threshold: [0], rootMargin: '-96px 0px 0px 0px' });
    pinIo.observe(sensor);
  })();


  /* ---------- Card tap toggle ---------- */
  document.querySelectorAll('.team .card').forEach((c) => {
    c.addEventListener('click', (ev) => {
      if (ev.target.closest('a')) return;
      document.querySelectorAll('.team .card.is-tapped').forEach((x) => {
        if (x !== c) x.classList.remove('is-tapped');
      });
      c.classList.toggle('is-tapped');
    });
  });


  /* ---------- Reveal on scroll ---------- */
  const revealIo = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add('is-in');
        revealIo.unobserve(e.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });
  document.querySelectorAll('.section, .modules__item, .card, .community__card, .audience__card, .plan, .faq__item, .hero__specimen, .ai__demo, .final').forEach((el) => {
    el.classList.add('reveal');
    revealIo.observe(el);
  });


  /* ---------- Smooth anchor scroll ---------- */
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener('click', (ev) => {
      const id = a.getAttribute('href');
      if (id && id.length > 1) {
        const t = document.querySelector(id);
        if (t) {
          ev.preventDefault();
          t.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    });
  });


  /* ---------- FAQ: close siblings when one opens ---------- */
  const faqItems = document.querySelectorAll('.faq__item');
  faqItems.forEach((item) => {
    item.addEventListener('toggle', () => {
      if (item.open) {
        faqItems.forEach((other) => { if (other !== item) other.open = false; });
      }
    });
  });

})();
