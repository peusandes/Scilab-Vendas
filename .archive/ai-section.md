# Seção "IA" do SciLab — arquivo para reinstalação futura

Guardado em 2026-04-20 para ser reintroduzido quando o anúncio da ferramenta de IA acontecer. Última versão publicada antes da remoção: commit `84877c5` (pre-remoção).

## Como reinstalar

1. Colar o bloco HTML dentro de `index.html`, logo após a seção `section--team` e antes de `section--community` (ou onde fizer sentido narrativamente — originalmente era seção 03, entre "manifest" e "community").
2. Colar o bloco CSS em `styles.css` no final (ou onde preferir), mantendo a ordem dos blocos `@media` — as regras responsivas vão dentro dos breakpoints existentes.
3. Reincluir o link de nav: `<a href="#ia">IA</a>` dentro do `<nav class="nav__links">`.
4. Reajustar numeração dos `section__kicker` (quando a seção for reinserida, ela volta a ser "03" e as outras deslocam).
5. Reincluir nas outras partes do site, se quiser:
   - Plano (`plan__feats`): `<li><b>✓</b> <strong>Acesso a ferramenta de IA</strong> em beta — deduplicação, gerenciamento, screening e extração <em class="plan__feat-note">· uso cobrado à parte</em></li>`
   - FAQ: item "Como funciona o custo da IA?" com a resposta sobre beta e consumo por uso.
   - Pricing sub: menção "Acesso a uma ferramenta de IA em beta, com consumo cobrado proporcional ao que você processar."

## HTML — seção inteira

```html
<!-- ═══════════ AI ═══════════ -->
<section class="section section--ai" id="ia">
  <div class="ai__badge">
    <span class="ai__badge-dot"></span>
    <span>ACESSO BETA · USO POR CONSUMO</span>
  </div>

  <div class="ai__grid">
    <div class="ai__copy">
      <div class="section__kicker"><span>03</span> / Ferramenta de IA</div>
      <h2 class="section__title ai__title">
        Uma IA que automatiza<br>o trabalho <em>pesado</em>.
      </h2>
      <p class="ai__lede">
        Você terá acesso a uma ferramenta de IA com funções voltadas para revisão sistemática e meta-análise — <strong>deduplicação, gerenciamento de projetos, screening e extração</strong>. Automatiza, com segurança, etapas que o pesquisador normalmente leva semanas fazendo na unha. <strong>Acesso em beta — ainda não totalmente validado</strong>, com <strong>consumo cobrado por uso</strong>, proporcional ao que você realmente processar.
      </p>

      <ul class="ai__features">
        <li>
          <div class="ai__feat-ico"><svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="8" height="8" rx="1.5"/><rect x="13" y="3" width="8" height="8" rx="1.5"/><rect x="3" y="13" width="8" height="8" rx="1.5"/><path d="M13 17h8"/></svg></div>
          <div>
            <h4>Deduplicação</h4>
            <p>RIS, EndNote, CSV, Excel — jogue como estiver. A IA limpa em segundos o que o EndNote demora horas.</p>
          </div>
        </li>
        <li>
          <div class="ai__feat-ico"><svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M5 3h9l5 5v13a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Z"/><path d="M14 3v5h5"/><path d="M8 13h8M8 17h5"/></svg></div>
          <div>
            <h4>Gerenciamento de projetos</h4>
            <p>Cada revisão, seu espaço. Histórico, versões, equipe, critérios de inclusão — tudo ancorado no mesmo lugar.</p>
          </div>
        </li>
        <li>
          <div class="ai__feat-ico"><svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/><path d="M8 11h6M11 8v6"/></svg></div>
          <div>
            <h4>Screening (título + resumo)</h4>
            <p>Triagem apoiada por IA com explicabilidade — você revisa decisões, não confia às cegas.</p>
          </div>
        </li>
        <li>
          <div class="ai__feat-ico"><svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="14" rx="1.5"/><path d="M3 10h18M9 5v14"/></svg></div>
          <div>
            <h4>Extração de dados</h4>
            <p>Baseline, desfechos primários e secundários, eventos adversos — estruturados em planilha pronta para RevMan.</p>
          </div>
        </li>
      </ul>

      <p class="ai__disclaimer">
        Acesso liberado no momento da matrícula. Consumo faturado por uso (processamento de artigo, extração, rodada de screening) — você paga proporcional ao que processar. Transparência total antes de cada execução.
      </p>
    </div>

    <!-- Fake UI demo -->
    <div class="ai__demo" aria-hidden="true">
      <div class="ai__demo-frame">
        <div class="ai__demo-top">
          <div class="ai__demo-dots"><i></i><i></i><i></i></div>
          <div class="ai__demo-url">ferramenta IA · projeto · ultrasound-radius-distal</div>
          <div class="ai__demo-pill">v0</div>
        </div>

        <div class="ai__demo-body">
          <div class="ai__demo-chip">
            <span class="ai__demo-chip-ico">📄</span>
            <span>refs_import.ris</span>
            <span class="ai__demo-chip-sz">3.646 refs</span>
          </div>

          <div class="ai__demo-row">
            <div class="ai__demo-label">Deduplicação</div>
            <div class="ai__demo-bar"><div class="ai__demo-bar-fill" style="--w:100%"></div></div>
            <div class="ai__demo-val">
              <b>–461</b>
              <span>duplicatas</span>
            </div>
          </div>
          <div class="ai__demo-row">
            <div class="ai__demo-label">Screening de título</div>
            <div class="ai__demo-bar"><div class="ai__demo-bar-fill" style="--w:86%"></div></div>
            <div class="ai__demo-val">
              <b>2.767</b>
              <span>excluídos</span>
            </div>
          </div>
          <div class="ai__demo-row">
            <div class="ai__demo-label">Leitura de full-text</div>
            <div class="ai__demo-bar"><div class="ai__demo-bar-fill" style="--w:48%"></div></div>
            <div class="ai__demo-val">
              <b>19</b>
              <span>incluídos</span>
            </div>
          </div>

          <div class="ai__demo-divider"></div>

          <div class="ai__demo-table">
            <div class="ai__demo-table-head">
              <span>Study</span>
              <span>n</span>
              <span>Age</span>
              <span>% F</span>
              <span>RoB</span>
            </div>
            <div class="ai__demo-table-row"><span>Oliveira 2024</span><span>212</span><span>58.4</span><span>54%</span><span class="ai__demo-ok">✓</span></div>
            <div class="ai__demo-table-row"><span>Kim 2022</span><span>287</span><span>61.2</span><span>48%</span><span class="ai__demo-ok">✓</span></div>
            <div class="ai__demo-table-row"><span>Garcia 2023</span><span>144</span><span>55.8</span><span>51%</span><span class="ai__demo-ok">✓</span></div>
            <div class="ai__demo-table-row ai__demo-table-row--scan">
              <span>extraindo…</span>
              <span>—</span><span>—</span><span>—</span><span class="ai__demo-scan"></span>
            </div>
          </div>

          <div class="ai__demo-prompt">
            <span class="ai__demo-prompt-caret">&gt;</span>
            <span class="ai__demo-prompt-text">extrair desfecho primário dos 19 incluídos<span class="ai__demo-prompt-cursor"></span></span>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
```

## CSS — base (colar no final do `styles.css`, antes do bloco `RESPONSIVE`)

```css
/* ==========================================================================
   AI SECTION
   ========================================================================== */
.section--ai {
  position: relative;
  background: var(--ink);
  color: var(--paper);
  max-width: none;
  margin: 0;
  padding: clamp(80px, 10vw, 130px) var(--pad-x);
  overflow: hidden;
}
.section--ai::before {
  content: "";
  position: absolute; inset: 0;
  background:
    radial-gradient(700px 400px at 85% 15%, rgba(200, 57, 30, 0.22), transparent 60%),
    radial-gradient(500px 400px at 10% 95%, rgba(200, 138, 46, 0.18), transparent 60%);
  pointer-events: none;
}
.section--ai::after {
  content: "";
  position: absolute; inset: 0;
  background-image:
    linear-gradient(to right, rgba(245,242,234,0.05) 1px, transparent 1px);
  background-size: 48px 48px;
  pointer-events: none;
  opacity: .5;
}
.section--ai > * { position: relative; z-index: 1; }

.ai__badge {
  display: inline-flex; align-items: center; gap: 10px;
  font-family: var(--mono);
  font-size: 10.5px;
  font-weight: 600;
  letter-spacing: 0.22em;
  color: var(--paper);
  padding: 8px 16px;
  border: 1px solid rgba(245,242,234,0.3);
  border-radius: 999px;
  margin: 0 auto clamp(36px, 5vw, 56px);
  max-width: var(--maxw);
  width: max-content;
  background: rgba(245,242,234,0.04);
}
.ai__badge-dot {
  width: 6px; height: 6px; border-radius: 50%;
  background: var(--accent);
  box-shadow: 0 0 0 3px rgba(200,57,30,0.3);
  animation: pulse 2s var(--ease-out) infinite;
}

.ai__grid {
  max-width: var(--maxw);
  margin: 0 auto;
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  gap: clamp(40px, 6vw, 80px);
  align-items: start;
}
.ai__grid .section__kicker { color: rgba(245,242,234,0.6); }
.ai__grid .section__kicker span { color: var(--ochre); }
.ai__title {
  color: var(--paper);
  font-size: clamp(36px, 5vw, 68px);
}
.ai__title em { color: var(--ochre); }
.ai__lede {
  margin: 26px 0 36px;
  max-width: 54ch;
  font-size: 17px;
  line-height: 1.62;
  color: rgba(245,242,234,0.82);
}
.ai__lede strong { color: var(--paper); }

.ai__features {
  display: flex; flex-direction: column;
  gap: 22px;
  border-top: 1px solid rgba(245,242,234,0.14);
  padding-top: 28px;
}
.ai__features li {
  display: grid;
  grid-template-columns: 44px 1fr;
  gap: 16px;
  align-items: start;
}
.ai__feat-ico {
  width: 44px; height: 44px;
  border: 1px solid rgba(245,242,234,0.3);
  border-radius: 6px;
  display: inline-flex; align-items: center; justify-content: center;
  color: var(--ochre);
  background: rgba(245,242,234,0.04);
}
.ai__features h4 {
  font-family: var(--sans);
  font-weight: 600;
  font-size: 17px;
  letter-spacing: -0.012em;
  margin: 4px 0 4px;
  color: var(--paper);
}
.ai__features p {
  margin: 0;
  font-size: 14px;
  line-height: 1.55;
  color: rgba(245,242,234,0.7);
}

.ai__disclaimer {
  margin: 28px 0 0;
  font-family: var(--mono);
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 0.06em;
  color: rgba(245,242,234,0.5);
  line-height: 1.55;
}

/* Fake AI demo frame */
.ai__demo {
  position: relative;
}
.ai__demo-frame {
  background: #071229;
  border: 1px solid rgba(245,242,234,0.18);
  border-radius: 10px;
  overflow: hidden;
  box-shadow:
    0 60px 120px -40px rgba(0,0,0,0.7),
    inset 0 1px 0 rgba(245,242,234,0.05);
  transform: perspective(1400px) rotateY(-3deg) rotateX(1deg);
  transition: transform .6s var(--ease-out);
}
.ai__demo:hover .ai__demo-frame { transform: perspective(1400px) rotateY(0) rotateX(0); }

.ai__demo-top {
  display: flex; align-items: center; gap: 12px;
  padding: 12px 16px;
  background: rgba(245,242,234,0.03);
  border-bottom: 1px solid rgba(245,242,234,0.1);
}
.ai__demo-dots { display: flex; gap: 6px; }
.ai__demo-dots i {
  width: 10px; height: 10px; border-radius: 50%;
  background: rgba(245,242,234,0.2);
  display: inline-block;
}
.ai__demo-dots i:nth-child(1) { background: #FF605C; }
.ai__demo-dots i:nth-child(2) { background: #FFBD44; }
.ai__demo-dots i:nth-child(3) { background: #00CA4E; }
.ai__demo-url {
  flex: 1;
  text-align: center;
  font-family: var(--mono);
  font-size: 11px;
  color: rgba(245,242,234,0.6);
  letter-spacing: 0.02em;
}
.ai__demo-pill {
  font-family: var(--mono);
  font-size: 9.5px;
  font-weight: 600;
  letter-spacing: 0.18em;
  padding: 3px 8px;
  background: var(--accent);
  color: var(--paper);
  border-radius: 3px;
}

.ai__demo-body {
  padding: 20px;
  display: flex; flex-direction: column; gap: 14px;
  font-family: var(--mono);
  font-size: 12px;
  color: rgba(245,242,234,0.85);
}

.ai__demo-chip {
  display: inline-flex; align-items: center; gap: 10px;
  padding: 8px 12px;
  background: rgba(245,242,234,0.06);
  border: 1px solid rgba(245,242,234,0.12);
  border-radius: 4px;
  width: fit-content;
  font-family: var(--mono);
  font-size: 11px;
}
.ai__demo-chip-sz {
  padding: 2px 8px;
  background: rgba(14, 110, 111, 0.25);
  color: #7AD9DA;
  border-radius: 3px;
  font-weight: 500;
}

.ai__demo-row {
  display: grid;
  grid-template-columns: 110px 1fr 90px;
  gap: 12px;
  align-items: center;
  font-size: 11px;
}
.ai__demo-label { color: rgba(245,242,234,0.65); }
.ai__demo-bar {
  height: 6px;
  background: rgba(245,242,234,0.08);
  border-radius: 999px;
  overflow: hidden;
}
.ai__demo-bar-fill {
  height: 100%;
  width: 0;
  background: linear-gradient(90deg, var(--ochre), var(--accent));
  border-radius: 999px;
  animation: fillBar 1.8s var(--ease-out) forwards;
  animation-delay: calc(var(--delay, 0s));
}
.ai__demo-row:nth-child(2) .ai__demo-bar-fill { animation-delay: 0.2s; }
.ai__demo-row:nth-child(3) .ai__demo-bar-fill { animation-delay: 0.5s; }
.ai__demo-row:nth-child(4) .ai__demo-bar-fill { animation-delay: 0.8s; }
@keyframes fillBar { to { width: var(--w, 100%); } }

.ai__demo-val {
  display: flex; align-items: baseline; gap: 4px;
  font-family: var(--mono);
  font-size: 11px;
}
.ai__demo-val b { color: var(--ochre); font-weight: 600; }
.ai__demo-val span { color: rgba(245,242,234,0.5); }

.ai__demo-divider {
  height: 1px;
  background: rgba(245,242,234,0.1);
  margin: 4px 0;
}

.ai__demo-table {
  background: rgba(0,0,0,0.3);
  border: 1px solid rgba(245,242,234,0.08);
  border-radius: 4px;
  font-family: var(--mono);
  font-size: 10.5px;
}
.ai__demo-table-head,
.ai__demo-table-row {
  display: grid;
  grid-template-columns: 1.4fr 0.6fr 0.8fr 0.8fr 0.5fr;
  padding: 9px 12px;
  gap: 10px;
  align-items: center;
}
.ai__demo-table-head {
  color: rgba(245,242,234,0.45);
  font-size: 9.5px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  border-bottom: 1px solid rgba(245,242,234,0.06);
}
.ai__demo-table-row {
  border-top: 1px solid rgba(245,242,234,0.04);
  color: rgba(245,242,234,0.82);
}
.ai__demo-table-row:first-of-type { border-top: none; }
.ai__demo-ok { color: #5ED98B; font-weight: 600; }
.ai__demo-table-row--scan { color: rgba(245,242,234,0.5); position: relative; overflow: hidden; }
.ai__demo-scan {
  position: relative;
  display: block;
  height: 10px;
  width: 100%;
  background: linear-gradient(90deg, transparent, var(--ochre), transparent);
  background-size: 40% 100%;
  background-repeat: no-repeat;
  animation: scan 1.6s linear infinite;
}
@keyframes scan {
  from { background-position: -40% 0; }
  to { background-position: 140% 0; }
}

.ai__demo-prompt {
  display: flex; align-items: center; gap: 8px;
  padding: 10px 12px;
  background: rgba(0,0,0,0.4);
  border: 1px solid rgba(245,242,234,0.1);
  border-radius: 4px;
  font-family: var(--mono);
  font-size: 11.5px;
  color: rgba(245,242,234,0.9);
}
.ai__demo-prompt-caret { color: var(--ochre); font-weight: 600; }
.ai__demo-prompt-cursor {
  display: inline-block;
  width: 7px; height: 14px;
  background: var(--paper);
  margin-left: 2px;
  animation: blink 1s steps(1) infinite;
  vertical-align: -2px;
}
```

## CSS responsivo — colar dentro dos respectivos blocos `@media`

### Dentro do `@media (max-width: 1100px)`
```css
.ai__grid { grid-template-columns: 1fr; gap: 44px; }
.ai__demo-frame { transform: none; }
```

### Dentro do `@media (max-width: 560px)`
```css
.section--ai { padding: 72px var(--pad-x); }
.ai__lede { font-size: 15.5px; margin: 22px 0 28px; }
.ai__features { gap: 18px; padding-top: 22px; }
.ai__features li { grid-template-columns: 36px 1fr; gap: 12px; }
.ai__feat-ico { width: 36px; height: 36px; }
.ai__features h4 { font-size: 15.5px; }
.ai__demo-body { padding: 14px; gap: 10px; font-size: 11px; }
.ai__demo-row { grid-template-columns: 84px 1fr 60px; gap: 8px; font-size: 10px; }
.ai__demo-chip { font-size: 10px; padding: 6px 10px; }
.ai__demo-table-head,
.ai__demo-table-row { grid-template-columns: 1.2fr 0.5fr 0.7fr 0.7fr 0.4fr; font-size: 9px; padding: 7px 10px; gap: 6px; }
.ai__demo-table-head { font-size: 8.5px; }
.ai__demo-prompt { padding: 8px 10px; font-size: 10.5px; }
.ai__disclaimer { font-size: 10.5px; }
```

## Checklist para a remoção (quando for pedido)

- [ ] Remover seção `section--ai` inteira em `index.html`
- [ ] Remover `<a href="#ia">IA</a>` de `.nav__links`
- [ ] Remover CSS `.section--ai` e `.ai__*` em `styles.css` (base + responsivos em 1100px e 560px)
- [ ] Remover o item de IA de `.plan__feats`
- [ ] Remover a FAQ "Como funciona o custo da IA?"
- [ ] Tirar a menção à IA do `.section__sub` em `#precos`
- [ ] Renumerar `section__kicker` (04 → 03 em Comunidade; 05 → 04 Professor; 06 → 05 Preço; 07 → 06 FAQ)
