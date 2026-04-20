/* ==========================================================================
   SCILAB — Sales page interactions
   ========================================================================== */

(function () {
  'use strict';

  /* ---------- Week progress tracker (12 weeks · 6 phases) ---------- */
  (function () {
    const progress = document.getElementById('progress');
    if (!progress) return;

    const TOTAL_WEEKS = 12;

    const fill    = progress.querySelector('[data-progress-fill]');
    const phaseEl = progress.querySelector('[data-progress-phase]');
    const labelEl = progress.querySelector('[data-progress-label]');
    const numEl   = progress.querySelector('[data-progress-num]');
    const ticks   = progress.querySelectorAll('[data-progress-tick]');
    const items   = document.querySelectorAll('.weeks__item');

    const setPhase = (el) => {
      if (!el) return;
      const end = parseInt(el.dataset.end, 10);
      const phase = el.dataset.phase;
      const label = el.dataset.label;

      if (fill) fill.style.width = (end / TOTAL_WEEKS * 100) + '%';
      if (phaseEl) phaseEl.textContent = phase;
      if (labelEl) labelEl.innerHTML = label;
      if (numEl) numEl.textContent = String(end).padStart(2, '0');

      ticks.forEach((t) => {
        const tn = parseInt(t.dataset.progressTick, 10);
        t.classList.toggle('is-active', tn <= end);
      });
      items.forEach((it) => it.classList.toggle('is-active', it === el));
    };

    setPhase(items[items.length - 1]);

    items.forEach((it) => {
      it.addEventListener('mouseenter', () => setPhase(it));
      it.addEventListener('focusin',    () => setPhase(it));
      it.addEventListener('click',      () => setPhase(it));
    });

    const cardIo = new IntersectionObserver((entries) => {
      let best = null;
      entries.forEach((e) => {
        if (e.isIntersecting) {
          if (!best || e.intersectionRatio > best.intersectionRatio) best = e;
        }
      });
      if (best) setPhase(best.target);
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
              setPhase(items[i]);
              i++;
              setTimeout(step, 280);
            }
          };
          setTimeout(step, 220);
        }
      });
    }, { threshold: 0.3 });
    const section = document.querySelector('.section--weeks');
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
  document.querySelectorAll('.section, .weeks__item, .card, .community__card, .audience__card, .plan, .faq__item, .hero__specimen, .ai__demo, .final, .manifest').forEach((el) => {
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
