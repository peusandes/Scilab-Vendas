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


  /* ---------- Platform stage (sala de projeção · deck auto-avançando) ---------- */
  (function () {
    const stage = document.getElementById('stage');
    if (!stage) return;

    const panes    = Array.from(stage.querySelectorAll('[data-stage-pane]'));
    const captions = Array.from(stage.querySelectorAll('[data-stage-caption]'));
    const tabs     = Array.from(stage.querySelectorAll('[data-stage-chapter]'));
    const bars     = Array.from(stage.querySelectorAll('[data-stage-bar]'));
    const frame    = stage.querySelector('[data-stage-frame]');
    const figEl    = stage.querySelector('[data-stage-fig]');
    const noteEl   = stage.querySelector('[data-stage-note]');
    const ghostEl  = stage.querySelector('[data-stage-ghost]');
    const toggle   = stage.querySelector('[data-stage-toggle]');
    const toggleTx = stage.querySelector('[data-stage-toggle-label]');
    const tablist  = stage.querySelector('[data-stage-tabs]');
    if (!panes.length) return;

    const TOTAL   = panes.length;
    const motionQ = window.matchMedia('(prefers-reduced-motion: reduce)');
    const hoverQ  = window.matchMedia('(hover: hover) and (pointer: fine)');

    let index    = 0;                 /* tela ativa */
    let elapsed  = 0;                 /* ms acumulados na tela ativa */
    let last     = 0;                 /* timestamp do rAF anterior */
    let raf      = 0;
    let ready    = false;             /* segura o corte no primeiro paint */
    let onScreen = false;
    let buried   = document.hidden;
    let held     = false;             /* ponteiro ou foco parado no palco */
    let paused   = false;             /* pausa explícita — WCAG 2.2.2 */
    let manual   = false;             /* movimento reduzido: o usuário pediu ESTE rolo */

    const dwellOf = (i) => parseInt(panes[i].dataset.dwell, 10) || 8000;
    const videoOf = (i) => panes[i].querySelector('video');

    /* a mídia continua rodando enquanto você lê; só o relógio congela */
    const mediaLive = () => onScreen && !buried && !paused && !motionQ.matches;
    const running   = () => mediaLive() && !held;

    /* o iOS respeita a propriedade mais do que o atributo */
    panes.forEach((p, i) => { const v = videoOf(i); if (v) v.muted = true; });

    /* preload="none" é dica; src ausente é garantia. Nenhum byte de vídeo sai
       antes de a tela ser realmente necessária. */
    const wake = (v) => { if (v && !v.src && v.dataset.src) v.src = v.dataset.src; };

    const syncMedia = () => {
      panes.forEach((p, i) => {
        const v = videoOf(i);
        if (!v) return;
        if (i === index && (mediaLive() || (motionQ.matches && manual))) {
          wake(v);
          const req = v.play();
          if (req && req.catch) req.catch(() => {});   /* bloqueado → pôster fica */
        } else {
          v.pause();
          if (i !== index && v.currentTime) { try { v.currentTime = 0; } catch (e) {} }
        }
      });
      /* aquece só o próximo rolo, e só enquanto a seção está viva */
      const nxt = videoOf((index + 1) % TOTAL);
      if (nxt && mediaLive() && !nxt.src) { nxt.preload = 'metadata'; wake(nxt); }
    };

    const paint = () => {
      const now = motionQ.matches ? 1 : Math.min(elapsed / dwellOf(index), 1);
      bars.forEach((b, i) => {
        b.style.transform = 'scaleX(' + (i < index ? 1 : (i > index ? 0 : now)) + ')';
      });
    };

    const setSlide = (i, dir) => {
      stage.classList.toggle('is-back', dir < 0);
      index = ((i % TOTAL) + TOTAL) % TOTAL;
      elapsed = 0;
      manual = false;

      panes.forEach((p, n) => p.classList.toggle('is-active', n === index));
      captions.forEach((c, n) => c.classList.toggle('is-active', n === index));
      tabs.forEach((t, n) => {
        const on = n === index;
        t.classList.toggle('is-active', on);
        t.setAttribute('aria-selected', on ? 'true' : 'false');
        t.tabIndex = on ? 0 : -1;
      });

      const num = String(index + 1).padStart(2, '0');
      if (figEl)   figEl.textContent   = 'FIG. ' + num;
      if (noteEl)  noteEl.textContent  = panes[index].dataset.note || '';
      if (ghostEl) ghostEl.textContent = num;
      if (frame && ready) { frame.classList.remove('is-cut'); void frame.offsetWidth; frame.classList.add('is-cut'); }

      paint();
      syncMedia();
    };

    const tick = (ts) => {
      raf = 0;
      if (!running()) { last = 0; return; }
      if (!last) last = ts;
      elapsed += Math.min(ts - last, 120);   /* absorve o salto de uma aba em 2º plano */
      last = ts;
      if (elapsed >= dwellOf(index)) setSlide(index + 1, 1); else paint();
      raf = requestAnimationFrame(tick);
    };

    const refresh = () => {
      if (running()) {
        if (!raf) { last = 0; raf = requestAnimationFrame(tick); }
      } else if (raf) {
        cancelAnimationFrame(raf); raf = 0; last = 0;
      }
      syncMedia();
      stage.classList.toggle('is-held', !running());
      if (toggle) {
        const v  = videoOf(index);
        const rm = motionQ.matches;
        /* Movimento reduzido: o botão passa a comandar só este rolo — e some na
           tela que não tem rolo. Um controle desabilitado nunca pode ser a única
           coisa visível para quem desligou animação. */
        toggle.hidden = rm && !v;
        const off = rm ? !(v && !v.paused) : paused;
        toggle.setAttribute('aria-pressed', off ? 'true' : 'false');
        if (toggleTx) toggleTx.textContent = off ? 'Reproduzir' : 'Pausar';
      }
    };

    const go = (i, dir) => { setSlide(i, dir); refresh(); };

    /* ---- navegação manual ---- */
    tabs.forEach((t, i) => t.addEventListener('click', () => go(i, i < index ? -1 : 1)));

    if (toggle) toggle.addEventListener('click', () => {
      if (motionQ.matches) {
        const v = videoOf(index);
        if (v) {
          if (v.paused) {
            manual = true;
            wake(v);
            const req = v.play();
            if (req && req.catch) req.catch(() => {});
          } else {
            manual = false;
            v.pause();
          }
        }
        refresh();
        return;
      }
      paused = !paused;
      refresh();
    });

    /* ---- roving tabindex no índice de telas ---- */
    if (tablist) tablist.addEventListener('keydown', (ev) => {
      const step = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[ev.key];
      let target = null;
      if (step) target = ((index + step) % TOTAL + TOTAL) % TOTAL;
      else if (ev.key === 'Home') target = 0;
      else if (ev.key === 'End')  target = TOTAL - 1;
      if (target === null) return;
      ev.preventDefault();
      go(target, step || 1);
      tabs[target].focus();
    });

    /* ---- swipe na moldura (o índice lateral continua rolando normalmente) ---- */
    if (frame) {
      let tx = 0, ty = 0;
      frame.addEventListener('touchstart', (ev) => {
        tx = ev.changedTouches[0].clientX;
        ty = ev.changedTouches[0].clientY;
      }, { passive: true });
      frame.addEventListener('touchend', (ev) => {
        const dx = ev.changedTouches[0].clientX - tx;
        const dy = ev.changedTouches[0].clientY - ty;
        if (Math.abs(dx) > 44 && Math.abs(dx) > Math.abs(dy) * 1.6) {
          go(index + (dx < 0 ? 1 : -1), dx < 0 ? 1 : -1);
        }
      }, { passive: true });
    }

    /* ---- travas: hover para ler, foco para ler, aba em 2º plano ---- */
    const setHold = (on) => { held = on; refresh(); };
    /* só em ponteiro fino: no iOS o pointerenter dispara no toque e o
       pointerleave nunca vem — travaria o deck para o resto da sessão */
    if (hoverQ.matches) {
      stage.addEventListener('pointerenter', () => setHold(true));
      stage.addEventListener('pointerleave', () => setHold(false));
    }
    stage.addEventListener('focusin',  () => setHold(true));
    stage.addEventListener('focusout', (ev) => {
      if (!stage.contains(ev.relatedTarget)) setHold(false);
    });
    document.addEventListener('visibilitychange', () => { buried = document.hidden; refresh(); });

    /* ---- fora da tela, nada decodifica ---- */
    const stageIo = new IntersectionObserver(([entry]) => {
      onScreen = entry.isIntersecting;
      refresh();
    }, { threshold: 0.25 });
    stageIo.observe(stage);

    if (motionQ.addEventListener) motionQ.addEventListener('change', () => { manual = false; refresh(); });

    setSlide(0, 1);
    ready = true;
    refresh();
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
  document.querySelectorAll('.section, .weeks__item, .card, .community__card, .audience__card, .plan, .faq__item, .hero__specimen, .final, .platform__inner, .manifest').forEach((el) => {
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
