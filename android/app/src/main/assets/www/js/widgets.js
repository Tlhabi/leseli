/* Interactive learning tools that sit inside lessons (section.tool = 'name').
   All are drawn with HTML/SVG, work with touch, need no internet, and every result is also
   written in words (for screen readers and for learners who cannot see colours). */
'use strict';

const Tools = {};
const toolCard = (titleKey, ...kids) => h('div', { class: 'tool' }, h('h3', {}, '🛠️ ', T(titleKey)), ...kids);
const live = () => h('div', { 'aria-live': 'polite', class: 'small', style: { marginTop: '8px' } });
const say2 = (el, en, st) => { el.innerHTML = ''; const m = I18N.content(); if (m !== 'en') el.appendChild(h('div', { lang: 'st', 'data-read': '' }, st)); if (m !== 'st') el.appendChild(h('div', { lang: 'en', 'data-read': '', class: m === 'both' ? 'muted' : '' }, en)); };

/* place value chart */
Tools.placevalue = function (o) {
  const inp = h('input', { type: 'number', value: o.n || 47305, min: 0, max: 9999999, 'aria-label': T('typeNumber') });
  const out = h('div'); const words = live();
  const draw = () => {
    const n = Math.max(0, Math.min(9999999, Math.floor(+inp.value || 0))); const s = String(n); const cols = Math.max(5, s.length);
    const names = [['ones', 'bonngoe'], ['tens', 'mashome'], ['hundreds', 'makholo'], ['thousands', 'likete'], ['ten thousands', 'mashome a likete'], ['hundred thousands', 'makholo a likete'], ['millions', 'limilione']];
    out.innerHTML = '';
    const t = h('table', { class: 'pv-table' }, h('tr', {}, Array.from({ length: cols }, (_, i) => h('th', {}, tx({ en: names[cols - 1 - i][0], st: names[cols - 1 - i][1] })))), h('tr', {}, s.padStart(cols, ' ').split('').map(d => h('td', {}, d.trim() || '0'))));
    out.appendChild(t);
    const parts = s.split('').map((d, i) => +d * 10 ** (s.length - 1 - i)).filter(Boolean);
    say2(words, `${fmt(n)} = ${parts.map(fmt).join(' + ')}`, `${fmt(n)} = ${parts.map(fmt).join(' + ')}`);
  };
  inp.oninput = draw; draw();
  return toolCard('tryIt', inp, out, words);
};

/* fraction bars – see equivalent fractions */
Tools.fractionbars = function () {
  const st = { a: 1, b: 2, c: 2, d: 4 };
  const area = h('div'); const res = live();
  const row = (k1, k2) => { const r = h('div', { class: 'slider-row' }); return r; };
  const bar = (n, d) => h('div', { class: 'fbar', role: 'img', 'aria-label': `${n}/${d}` }, Array.from({ length: d }, (_, i) => h('i', { class: i < n ? 'on' : '' })));
  const ctl = (key, max, label) => h('label', { class: 'slider-row' }, h('span', {}, label), h('input', { type: 'range', min: 1, max, value: st[key], oninput: e => { st[key] = +e.target.value; if (st.a > st.b) st.a = st.b; if (st.c > st.d) st.c = st.d; draw(); } }), h('b', { class: 'v-' + key }));
  const ctrls = h('div', {}, ctl('a', 12, T('top') + ' 1'), ctl('b', 12, T('bottom') + ' 1'), ctl('c', 12, T('top') + ' 2'), ctl('d', 12, T('bottom') + ' 2'));
  const draw = () => {
    area.innerHTML = ''; area.appendChild(h('div', { class: 'big-num', style: { fontSize: '1.3em' } }, `${st.a}/${st.b}`)); area.appendChild(bar(st.a, st.b));
    area.appendChild(h('div', { class: 'big-num', style: { fontSize: '1.3em' } }, `${st.c}/${st.d}`)); area.appendChild(bar(st.c, st.d));
    ['a', 'b', 'c', 'd'].forEach(k => { const e = ctrls.querySelector('.v-' + k); if (e) e.textContent = st[k]; $$('input', ctrls)[['a', 'b', 'c', 'd'].indexOf(k)].value = st[k]; });
    const eq = st.a * st.d === st.c * st.b; const cmp = st.a * st.d > st.c * st.b ? '>' : st.a * st.d < st.c * st.b ? '<' : '=';
    say2(res, eq ? `${st.a}/${st.b} and ${st.c}/${st.d} are EQUIVALENT – the same amount is coloured.` : `${st.a}/${st.b} ${cmp} ${st.c}/${st.d}`, eq ? `${st.a}/${st.b} le ${st.c}/${st.d} LIA LEKANA – ho kentsoe 'mala ka ho lekana.` : `${st.a}/${st.b} ${cmp} ${st.c}/${st.d}`);
    if (eq) res.style.color = 'var(--green)'; else res.style.color = '';
  };
  draw();
  return toolCard('tryIt', area, ctrls, res);
};

/* protractor: drag to make an angle; names the type */
Tools.angle = function () {
  let deg = 50;
  const svg = svgEl(`<svg viewBox="0 0 300 170" width="100%" role="img" aria-label="protractor"><path d="M20 150 A130 130 0 0 1 280 150 Z" fill="#eef3fd" stroke="#1f4fb5" stroke-width="2"/>${Array.from({ length: 19 }, (_, i) => { const a = Math.PI * i / 18, x1 = 150 - 130 * Math.cos(a), y1 = 150 - 130 * Math.sin(a), x2 = 150 - 112 * Math.cos(a), y2 = 150 - 112 * Math.sin(a), tx_ = 150 - 100 * Math.cos(a), ty = 150 - 100 * Math.sin(a); return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="#1f4fb5"/><text x="${tx_}" y="${ty + 4}" font-size="9" text-anchor="middle" fill="#555">${180 - i * 10}</text>`; }).join('')}<line x1="150" y1="150" x2="280" y2="150" stroke="#b3261e" stroke-width="4" stroke-linecap="round"/><line id="arm" x1="150" y1="150" x2="150" y2="20" stroke="#00804a" stroke-width="4" stroke-linecap="round"/><path id="arc" fill="rgba(246,183,60,.5)"/><circle cx="150" cy="150" r="5" fill="#1d1b16"/><text id="lbl" x="150" y="140" font-size="16" font-weight="800" text-anchor="middle" fill="#0b2e7a"></text></svg>`);
  const res = live();
  const slider = h('input', { type: 'range', min: 0, max: 180, value: deg, 'aria-label': T('angle'), oninput: e => { deg = +e.target.value; draw(); } });
  const draw = () => {
    const a = deg * Math.PI / 180, x = 150 + 125 * Math.cos(a), y = 150 - 125 * Math.sin(a);
    const arm = svg.querySelector('#arm'); arm.setAttribute('x2', x); arm.setAttribute('y2', y);
    const r = 40, ax = 150 + r * Math.cos(a), ay = 150 - r * Math.sin(a);
    svg.querySelector('#arc').setAttribute('d', `M150 150 L190 150 A${r} ${r} 0 0 0 ${ax} ${ay} Z`);
    svg.querySelector('#lbl').textContent = deg + '°';
    const type = deg === 0 ? ['zero angle', 'sekhutlo sa 0'] : deg < 90 ? ['ACUTE angle (less than 90°)', 'sekhutlo se SEHLOKO (ka tlase ho 90°)'] : deg === 90 ? ['RIGHT angle (exactly 90°)', 'sekhutlo se TOKILENG (90° hantle)'] : deg < 180 ? ['OBTUSE angle (between 90° and 180°)', 'sekhutlo se SETOMPO (pakeng tsa 90° le 180°)'] : ['STRAIGHT angle (180°)', 'sekhutlo se OTLOLOHILENG (180°)'];
    say2(res, `${deg}° is an ${type[0]}.`, `${deg}° ke ${type[1]}.`);
  };
  const drag = e => { const r = svg.getBoundingClientRect(); const px = (e.clientX - r.left) * 300 / r.width, py = (e.clientY - r.top) * 170 / r.height; let d = Math.round(Math.atan2(150 - py, px - 150) * 180 / Math.PI); deg = Math.max(0, Math.min(180, d < -90 ? 180 : d)); slider.value = deg; draw(); };
  svg.addEventListener('pointerdown', e => { drag(e); svg.setPointerCapture(e.pointerId); svg.onpointermove = drag; });
  svg.addEventListener('pointerup', () => svg.onpointermove = null);
  draw();
  return toolCard('tryIt', svg, slider, res);
};

/* triangle angle sum */
Tools.triangle = function () {
  let a = 60, b = 70; const svgWrap = h('div'); const res = live();
  const draw = () => {
    const c = 180 - a - b; svgWrap.innerHTML = '';
    if (c <= 0) { say2(res, 'These two angles already make 180° or more – that cannot be a triangle!', 'Likhutlo tsena tse peli li se li etsa 180° kapa ho feta – e ke ke ea e-ba khutlo-tharo!'); return; }
    const A = a * Math.PI / 180, B = b * Math.PI / 180, base = 220;
    const t = Math.tan(A), u = Math.tan(B); const px = base * u / (t + u), py = px * t;
    const sc = Math.min(1, 130 / py); const X = 40 + px * sc, Y = 160 - py * sc, W = 40 + base * sc;
    svgWrap.appendChild(svgEl(`<svg viewBox="0 0 300 175" width="100%" role="img" aria-label="triangle"><polygon points="40,160 ${W},160 ${X},${Y}" fill="#fff3d6" stroke="#0b2e7a" stroke-width="3"/><text x="58" y="152" font-size="15" font-weight="800" fill="#1f4fb5">${a}°</text><text x="${W - 46}" y="152" font-size="15" font-weight="800" fill="#00804a">${b}°</text><text x="${X - 14}" y="${Y + 30}" font-size="15" font-weight="800" fill="#b3261e">${c}°</text></svg>`));
    say2(res, `${a}° + ${b}° + ${c}° = 180°`, `${a}° + ${b}° + ${c}° = 180°`);
  };
  const sl = (v, set, lab) => h('label', { class: 'slider-row' }, h('span', {}, lab), h('input', { type: 'range', min: 10, max: 150, value: v, oninput: e => { set(+e.target.value); e.target.parentNode.lastChild.textContent = e.target.value + '°'; draw(); } }), h('b', {}, v + '°'));
  draw();
  return toolCard('tryIt', svgWrap, sl(a, v => a = v, T('angle') + ' A'), sl(b, v => b = v, T('angle') + ' B'), res);
};

/* times-table explorer: tap a number to light up its multiples */
Tools.timestable = function () {
  const g = h('div', { class: 'tt-grid', role: 'grid' }); const res = live(); let sel = null;
  const draw = () => {
    g.innerHTML = '';
    for (let r = 0; r <= 10; r++) for (let c = 0; c <= 10; c++) {
      if (!r && !c) { g.appendChild(h('div', { class: 'h' }, '×')); continue; }
      if (!r || !c) { const n = r || c; g.appendChild(h('div', { class: 'h' + (sel === n ? ' sel' : ''), role: 'button', tabindex: 0, onclick: () => { sel = n; draw(); say2(res, `Multiples of ${n}: ${Array.from({ length: 10 }, (_, i) => n * (i + 1)).join(', ')}`, `Liatiso tsa ${n}: ${Array.from({ length: 10 }, (_, i) => n * (i + 1)).join(', ')}`); } }, n)); continue; }
      g.appendChild(h('div', { class: sel && (r === sel || c === sel) ? 'hl' : '', role: 'gridcell', onclick: () => say2(res, `${r} × ${c} = ${r * c}`, `${r} × ${c} = ${r * c}`) }, r * c));
    }
  };
  draw(); say2(res, 'Tap a blue number to see its multiples. Tap any square to see the sum.', 'Tobetsa nomoro e putsoa ho bona liatiso tsa eona. Tobetsa lebokose ho bona palo.');
  return toolCard('tryIt', g, res);
};

/* step-by-step solver for a chosen operation (used for long division, multiplication ...) */
Tools.stepper = function (o) {
  const op = o.op || '÷';
  const a = h('input', { type: 'number', value: o.a || (op === '÷' ? 7452 : op === '×' ? 345 : op === '−' ? 50213 : 4587), 'aria-label': 'a' });
  const b = h('input', { type: 'number', value: o.b || (op === '÷' ? 6 : op === '×' ? 23 : op === '−' ? 1789 : 9765), 'aria-label': 'b' });
  const out = h('div'); let k = 0, r = null;
  const run = () => {
    const x = Math.abs(Math.floor(+a.value)), y = Math.abs(Math.floor(+b.value)); if (!y && op === '÷') return;
    r = op === '÷' ? MS.div(x, y) : op === '×' ? MS.mul(x, y) : op === '−' ? MS.sub(x, y) : MS.add(x, y); k = 0; show();
  };
  const show = () => {
    out.innerHTML = '';
    if (r.layout) out.appendChild(h('pre', { class: 'calc', 'aria-hidden': 'true' }, k >= r.steps.length - 1 ? r.layout : '…'));
    const ol = h('ol', { class: 'step-list' }); r.steps.slice(0, k + 1).forEach((s, i) => ol.appendChild(h('li', { class: i === k ? 'now' : '', lang: I18N.content() === 'en' ? 'en' : 'st', 'data-read': '' }, tx(s, I18N.content() === 'en' ? 'en' : 'st'))));
    out.appendChild(ol);
    const nx = h('button', { class: 'btn primary', disabled: k >= r.steps.length - 1, onclick: () => { k++; show(); Speech.say(tx(r.steps[k], I18N.content() === 'en' ? 'en' : 'st'), I18N.content() === 'en' ? 'en' : 'st'); } }, T('nextStep'), icon('next'));
    out.appendChild(h('div', { class: 'row' }, nx, h('button', { class: 'btn', onclick: () => { k = r.steps.length - 1; show(); } }, T('showAll'))));
  };
  return toolCard('tryIt', h('div', { class: 'row', style: { flexWrap: 'nowrap' } }, a, h('b', { style: { fontSize: '1.5em' } }, op), b), h('button', { class: 'btn good block', style: { margin: '10px 0' }, onclick: run }, T('solveStepByStep')), out);
};

/* mirror symmetry drawing */
Tools.symmetry = function () {
  const N = 12, on = new Set(); const g = h('div', { class: 'sym-grid', style: { gridTemplateColumns: `repeat(${N}, 1fr)` } }); const res = live();
  const draw = () => { g.innerHTML = ''; for (let r = 0; r < N; r++) for (let c = 0; c < N; c++) { const left = c < N / 2, key = r * N + (left ? c : N - 1 - c); const cell = h('div', { class: (on.has(key) ? (left ? 'on' : 'mir') : '') + (c === N / 2 ? ' axis' : ''), onclick: () => { if (!left) return; on.has(key) ? on.delete(key) : on.add(key); draw(); } }); g.appendChild(cell); } };
  draw(); say2(res, 'Colour squares on the LEFT. The mirror (red line) copies them on the right. That is a line of symmetry.', 'Kenya mebala mabokoseng a ka LETŠEHALI. Seipone (mola o mofubelu) se a kopitsa ka ho le letona. Ona ke mola oa symmetry.');
  return toolCard('tryIt', g, res, h('button', { class: 'btn small', style: { marginTop: '8px' }, onclick: () => { on.clear(); draw(); } }, T('reset')));
};

/* drawing pad with grid + guided shapes (learners said drawing is hard) */
Tools.drawpad = function (o) {
  const cv = h('canvas', { class: 'pad-canvas', width: 600, height: 420, 'aria-label': T('drawHere') });
  const ctx = cv.getContext('2d'); let col = '#1d1b16', size = 4, drawing = false, last = null, grid = true;
  const guide = o.guide || null;
  const bg = () => {
    ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, 600, 420);
    if (grid) { ctx.strokeStyle = '#e6eefc'; ctx.lineWidth = 1; for (let x = 0; x <= 600; x += 50) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, 420); ctx.stroke(); } for (let y = 0; y <= 420; y += 50) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(600, y); ctx.stroke(); } }
    if (guide === 'face') { ctx.strokeStyle = '#f3c9a0'; ctx.setLineDash([8, 8]); ctx.lineWidth = 2; ctx.beginPath(); ctx.ellipse(300, 210, 120, 160, 0, 0, Math.PI * 2); ctx.stroke(); [[300, 50, 300, 370], [180, 190, 420, 190], [200, 270, 400, 270], [210, 320, 390, 320]].forEach(([a, b, c, d]) => { ctx.beginPath(); ctx.moveTo(a, b); ctx.lineTo(c, d); ctx.stroke(); }); ctx.setLineDash([]); }
    if (guide === 'house') { ctx.strokeStyle = '#f3c9a0'; ctx.setLineDash([8, 8]); ctx.lineWidth = 2; ctx.strokeRect(170, 200, 260, 170); ctx.beginPath(); ctx.moveTo(150, 200); ctx.lineTo(300, 80); ctx.lineTo(450, 200); ctx.stroke(); ctx.setLineDash([]); }
  };
  const pos = e => { const r = cv.getBoundingClientRect(); return [(e.clientX - r.left) * 600 / r.width, (e.clientY - r.top) * 420 / r.height]; };
  cv.addEventListener('pointerdown', e => { drawing = true; last = pos(e); cv.setPointerCapture(e.pointerId); });
  cv.addEventListener('pointermove', e => { if (!drawing) return; const p = pos(e); ctx.strokeStyle = col; ctx.lineWidth = size; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(...last); ctx.lineTo(...p); ctx.stroke(); last = p; });
  cv.addEventListener('pointerup', () => drawing = false);
  const colours = ['#1d1b16', '#b3261e', '#f6b73c', '#1f4fb5', '#00804a', '#e8761a', '#7b3fb0', '#8b5a2b', '#ffffff'];
  const sw = h('div', { class: 'swatches', role: 'group', 'aria-label': T('colour') }, colours.map((c, i) => h('button', { style: { background: c }, 'aria-label': ['black', 'red', 'yellow', 'blue', 'green', 'orange', 'purple', 'brown', 'white / eraser'][i], 'aria-pressed': String(c === col), onclick: e => { col = c; size = c === '#ffffff' ? 22 : 4; $$('button', sw).forEach(b => b.setAttribute('aria-pressed', 'false')); e.currentTarget.setAttribute('aria-pressed', 'true'); } })));
  bg();
  return toolCard('drawHere', cv, h('div', { style: { margin: '10px 0' } }, sw),
    h('div', { class: 'row' }, h('button', { class: 'btn small', onclick: bg }, icon('trash', null, 16), T('clear')), h('button', { class: 'btn small', onclick: () => { grid = !grid; bg(); } }, '▦ ', T('grid')),
      h('button', { class: 'btn small', onclick: () => { const d = cv.toDataURL('image/jpeg', .5); Store.s.drawings.push({ t: Date.now(), l: Store.lid(), d }); if (Store.s.drawings.length > 12) Store.s.drawings.shift(); Store.save(); toast(T('saved')); react(true); } }, icon('download', null, 16), T('save'))));
};

/* colour mixing: primary -> secondary */
Tools.colourmix = function () {
  const P = { red: ['#e53935', 'Red', 'Bofubelu'], yellow: ['#fdd835', 'Yellow', 'Bosehla'], blue: ['#1e63d6', 'Blue', 'Boputsoa'] };
  const mix = { 'blue+yellow': ['#2e9d48', 'GREEN', 'BOTALA'], 'red+yellow': ['#f57c00', 'ORANGE', 'LAMUNU'], 'blue+red': ['#7b3fb0', 'PURPLE', 'PERESE'] };
  let pickd = []; const pot = h('div', { style: { width: '120px', height: '120px', borderRadius: '50%', margin: '12px auto', border: '4px solid var(--line)', background: '#fff' } }); const res = live();
  const btns = h('div', { class: 'row center' }, Object.entries(P).map(([k, v]) => h('button', { class: 'btn', style: { background: v[0], color: k === 'yellow' ? '#000' : '#fff', borderColor: v[0] }, onclick: () => { pickd.push(k); if (pickd.length > 2) pickd = [k]; draw(); } }, tx({ en: v[1], st: v[2] }))));
  const draw = () => {
    if (pickd.length === 1) { pot.style.background = P[pickd[0]][0]; say2(res, P[pickd[0]][1] + ' + … ?', P[pickd[0]][2] + ' + … ?'); }
    if (pickd.length === 2) { const key = [...pickd].sort().join('+'); const m = mix[key]; if (m) { pot.style.background = m[0]; say2(res, `${P[pickd[0]][1]} + ${P[pickd[1]][1]} = ${m[1]} (a secondary colour)`, `${P[pickd[0]][2]} + ${P[pickd[1]][2]} = ${m[2]} ('mala oa bobeli)`); react(true); } else { say2(res, 'Same colour twice – pick two different primary colours.', "'Mala o tšoanang habeli – khetha mebala e 'meli e fapaneng."); } }
  };
  say2(res, 'Tap two primary colours to mix them.', "Tobetsa mebala e 'meli ea mantlha ho e kopanya.");
  return toolCard('tryIt', btns, pot, res);
};

/* generic sorting game: put each item into the right group (animal classes, nutrients, renewable ...) */
Tools.sort = function (o) {
  const items = shuffle(o.items || []); let i = 0, score = 0; const box = h('div'); const res = live();
  const draw = () => {
    box.innerHTML = '';
    if (i >= items.length) { box.appendChild(h('div', { class: 'result-big' }, h('div', { class: 'score' }, `${score}/${items.length}`), h('button', { class: 'btn', onclick: () => { i = 0; score = 0; draw(); } }, T('playAgain')))); if (score === items.length) confetti(); Store.log('tool', { tool: 'sort', score, max: items.length }); return; }
    const it = items[i];
    box.appendChild(h('div', { class: 'sort-card', 'data-read': '', lang: I18N.ui() }, h('span', { class: 'emo', 'aria-hidden': 'true' }, it.emo || '❓'), tx(it)));
    box.appendChild(h('div', { class: 'options' }, o.groups.map(g => h('button', { class: 'opt', onclick: e => {
      const ok = g.id === it.g; if (ok) score++; react(ok); e.currentTarget.classList.add(ok ? 'right' : 'wrong'); $$('.opt', box).forEach(b => b.disabled = true);
      const right = o.groups.find(x => x.id === it.g);
      say2(res, (ok ? '✔ ' : '✘ ') + `${it.en} → ${right.en}. ${it.why ? it.why.en : ''}`, (ok ? '✔ ' : '✘ ') + `${it.st} → ${right.st}. ${it.why ? it.why.st : ''}`);
      setTimeout(() => { i++; draw(); }, ok ? 1300 : 2600);
    } }, g.emo ? h('span', { class: 'letter' }, g.emo) : null, tx(g)))));
    box.appendChild(h('div', { class: 'small muted' }, `${i + 1} / ${items.length}`));
  };
  draw();
  return toolCard('sortGame', box, res);
};

/* little shop: buy items, get change (Maloti and lisente) */
Tools.shop = function () {
  const goods = [['🍞', 'Bread', 'Bohobe', 14.5], ['🥛', 'Milk 1 l', 'Lebese 1 l', 18], ['🥚', '6 eggs', 'Mahe a 6', 21], ['🌽', 'Maize meal 2.5 kg', 'Phofo 2.5 kg', 32.5], ['🍎', 'Apple', 'Apole', 4], ['✏️', 'Pencil', 'Pensele', 3.5], ['📓', 'Exercise book', 'Buka ea ho ngolla', 12]];
  const cart = {}; const list = h('div'); const tot = h('div', { class: 'big-num' }); const pay = h('select', { 'aria-label': T('pay') }, [20, 50, 100, 200].map(v => h('option', { value: v }, 'M' + v))); const res = live();
  const M = v => 'M' + v.toFixed(2);
  const draw = () => {
    list.innerHTML = ''; let t = 0;
    goods.forEach((g, k) => { const n = cart[k] || 0; t += n * g[3]; list.appendChild(h('div', { class: 'dict-row' }, h('span', { style: { fontSize: '28px' } }, g[0]), h('div', { class: 'w' }, h('b', {}, tx({ en: g[1], st: g[2] })), h('span', {}, M(g[3]))), h('button', { class: 'btn small', 'aria-label': '−', onclick: () => { cart[k] = Math.max(0, n - 1); draw(); } }, '−'), h('b', { style: { width: '24px', textAlign: 'center' } }, n), h('button', { class: 'btn small', 'aria-label': '+', onclick: () => { cart[k] = n + 1; draw(); } }, '+'))); });
    tot.textContent = M(t); tot.dataset.t = t; check();
  };
  const check = () => { const t = +tot.dataset.t, p = +pay.value; if (!t) return say2(res, 'Add things to your basket.', 'Kenya lintho basketeng.'); if (p < t) return say2(res, `M${p} is not enough. You need ${M(t - p)} more.`, `M${p} ha e lekane. U hloka ${M(t - p)} e eketsehileng.`); say2(res, `You pay M${p}. Change = M${p} − ${M(t)} = ${M(p - t)}`, `U lefa M${p}. Chelete e salang = M${p} − ${M(t)} = ${M(p - t)}`); };
  pay.onchange = check; draw();
  return toolCard('shopGame', list, h('div', { class: 'row between', style: { marginTop: '10px' } }, h('b', {}, T('total')), tot), h('label', { class: 'field' }, T('pay')), pay, res);
};

/* thermometer reading */
Tools.thermometer = function () {
  let t = 18; const svg = h('div'); const res = live();
  const sl = h('input', { type: 'range', min: -10, max: 40, value: t, 'aria-label': '°C', oninput: e => { t = +e.target.value; draw(); } });
  const draw = () => {
    const y = 200 - (t + 10) * 3.4;
    svg.innerHTML = `<svg viewBox="0 0 140 240" width="140" style="display:block;margin:0 auto" aria-hidden="true"><rect x="58" y="20" width="24" height="190" rx="12" fill="#fff" stroke="#555" stroke-width="2"/><rect x="63" y="${y}" width="14" height="${210 - y}" fill="#e53935"/><circle cx="70" cy="215" r="18" fill="#e53935" stroke="#555" stroke-width="2"/>${Array.from({ length: 11 }, (_, i) => { const v = -10 + i * 5, yy = 200 - (v + 10) * 3.4; return `<line x1="82" y1="${yy}" x2="${v % 10 ? 88 : 94}" y2="${yy}" stroke="#555"/><text x="98" y="${yy + 4}" font-size="11">${v}</text>`; }).join('')}</svg>`;
    const feel = t <= 0 ? ['freezing – water turns to ice, snow on the mountains', 'ho hatsela haholo – metsi a fetoha leqhoa, lehloa lithabeng'] : t < 12 ? ['cold – wear a jersey', 'ho bata – apara jesi'] : t < 25 ? ['warm, pleasant', 'ho futhumetse hantle'] : ['hot – drink water, stay in the shade', 'ho chesa – noa metsi, lula moriting'];
    say2(res, `${t} °C: ${feel[0]}`, `${t} °C: ${feel[1]}`);
  };
  draw();
  return toolCard('tryIt', svg, sl, res);
};

/* circle: circumference */
Tools.circle = function () {
  let r = 7; const svg = h('div'); const res = live();
  const draw = () => { const R = 20 + r * 4; svg.innerHTML = `<svg viewBox="0 0 220 220" width="200" style="display:block;margin:0 auto" aria-hidden="true"><circle cx="110" cy="110" r="${R}" fill="#eef3fd" stroke="#1f4fb5" stroke-width="4"/><line x1="110" y1="110" x2="${110 + R}" y2="110" stroke="#b3261e" stroke-width="3"/><text x="${110 + R / 2}" y="104" font-size="13" text-anchor="middle" fill="#b3261e" font-weight="800">r=${r}</text></svg>`; const c = Math.round(2 * Math.PI * r * 100) / 100; say2(res, `Diameter = 2 × ${r} = ${2 * r} cm. Circumference = π × ${2 * r} ≈ ${c} cm${r % 7 === 0 ? ' (with 22/7: ' + (44 * r / 7) + ' cm)' : ''}`, `Bophara = 2 × ${r} = ${2 * r} cm. Potoloho = π × ${2 * r} ≈ ${c} cm${r % 7 === 0 ? ' (ka 22/7: ' + (44 * r / 7) + ' cm)' : ''}`); };
  draw();
  return toolCard('tryIt', svg, h('label', { class: 'slider-row' }, h('span', {}, 'r (cm)'), h('input', { type: 'range', min: 1, max: 21, value: r, oninput: e => { r = +e.target.value; e.target.nextSibling.textContent = r; draw(); } }), h('b', {}, r)), res);
};

/* cuboid volume with stacked cubes */
Tools.cuboid = function () {
  const d = { l: 4, w: 3, h: 2 }; const svg = h('div'); const res = live();
  const draw = () => {
    const s = 16, ox = 40, oy = 170; let out = '';
    const iso = (x, y, z) => [ox + (x - y) * s * .87 + d.w * s * .87, oy - (x + y) * s * .5 - z * s];
    for (let z = 0; z < d.h; z++) for (let y = d.w - 1; y >= 0; y--) for (let x = d.l - 1; x >= 0; x--) {
      const p = (a, b, c) => iso(a, b, c).join(',');
      out += `<polygon points="${p(x, y, z + 1)} ${p(x + 1, y, z + 1)} ${p(x + 1, y + 1, z + 1)} ${p(x, y + 1, z + 1)}" fill="#f6b73c" stroke="#7a4b12" stroke-width=".8"/><polygon points="${p(x, y, z)} ${p(x + 1, y, z)} ${p(x + 1, y, z + 1)} ${p(x, y, z + 1)}" fill="#1f4fb5" stroke="#0b2e7a" stroke-width=".8"/><polygon points="${p(x, y, z)} ${p(x, y + 1, z)} ${p(x, y + 1, z + 1)} ${p(x, y, z + 1)}" fill="#4f7bd6" stroke="#0b2e7a" stroke-width=".8"/>`;
    }
    svg.innerHTML = `<svg viewBox="0 0 300 200" width="100%" aria-hidden="true">${out}</svg>`;
    say2(res, `${d.l} × ${d.w} × ${d.h} = ${d.l * d.w * d.h} cubes (cubic units)`, `${d.l} × ${d.w} × ${d.h} = ${d.l * d.w * d.h} likubiki`);
  };
  const sl = (k, lab) => h('label', { class: 'slider-row' }, h('span', {}, lab), h('input', { type: 'range', min: 1, max: 6, value: d[k], oninput: e => { d[k] = +e.target.value; e.target.nextSibling.textContent = d[k]; draw(); } }), h('b', {}, d[k]));
  draw();
  return toolCard('tryIt', svg, sl('l', tx({ en: 'length', st: 'bolelele' })), sl('w', tx({ en: 'width', st: 'bophara' })), sl('h', tx({ en: 'height', st: 'bophahamo' })), res);
};

/* Venn diagram: sets, intersection ∩, union ∪ */
Tools.venn = function (o) {
  const A = o.A || ['Lerato', 'Thabo', 'Palesa', 'Neo', 'Mpho'], B = o.B || ['Neo', 'Mpho', 'Teboho', 'Lineo'];
  const la = o.la || L('Football', 'Bolo ea maoto'), lb = o.lb || L('Netball', 'Netball');
  const both = A.filter(x => B.includes(x)), onlyA = A.filter(x => !B.includes(x)), onlyB = B.filter(x => !A.includes(x));
  const svg = svgEl(`<svg viewBox="0 0 320 200" width="100%" role="img" aria-label="Venn diagram"><rect x="2" y="2" width="316" height="196" rx="10" fill="#fff" stroke="#ccc"/><circle cx="120" cy="105" r="80" fill="rgba(31,79,181,.18)" stroke="#1f4fb5" stroke-width="2"/><circle cx="200" cy="105" r="80" fill="rgba(246,183,60,.3)" stroke="#c88a00" stroke-width="2"/><text x="70" y="22" font-size="13" font-weight="800" fill="#1f4fb5">A: ${esc(tx(la))}</text><text x="190" y="22" font-size="13" font-weight="800" fill="#8a5a00">B: ${esc(tx(lb))}</text>${onlyA.map((n, i) => `<text x="85" y="${70 + i * 18}" font-size="12" text-anchor="middle">${esc(n)}</text>`).join('')}${both.map((n, i) => `<text x="160" y="${90 + i * 18}" font-size="12" text-anchor="middle" font-weight="800">${esc(n)}</text>`).join('')}${onlyB.map((n, i) => `<text x="238" y="${70 + i * 18}" font-size="12" text-anchor="middle">${esc(n)}</text>`).join('')}</svg>`);
  const res = live();
  const show = k => k === 'i' ? say2(res, `A ∩ B (in BOTH sets) = { ${both.join(', ')} }`, `A ∩ B (ho li-set KA BOBELI) = { ${both.join(', ')} }`) : say2(res, `A ∪ B (ALL members, each written once) = { ${A.concat(onlyB).join(', ')} }`, `A ∪ B (litho TSOHLE, e 'ngoe le e 'ngoe hang feela) = { ${A.concat(onlyB).join(', ')} }`);
  return toolCard('tryIt', svg, h('div', { class: 'row' }, h('button', { class: 'btn', onclick: () => show('i') }, 'A ∩ B'), h('button', { class: 'btn', onclick: () => show('u') }, 'A ∪ B')), res);
};

/* number line for negative numbers */
Tools.numberline = function () {
  let pos = 0; const svg = h('div'); const res = live();
  const draw = () => { svg.innerHTML = `<svg viewBox="0 0 320 70" width="100%" aria-hidden="true"><line x1="10" y1="40" x2="310" y2="40" stroke="#333" stroke-width="2"/>${Array.from({ length: 21 }, (_, i) => { const v = i - 10, x = 10 + i * 15; return `<line x1="${x}" y1="34" x2="${x}" y2="46" stroke="#333"/><text x="${x}" y="62" font-size="9" text-anchor="middle" fill="${v < 0 ? '#b3261e' : v > 0 ? '#1f4fb5' : '#000'}">${v}</text>`; }).join('')}<circle cx="${10 + (pos + 10) * 15}" cy="40" r="8" fill="#00804a"/></svg>`; say2(res, `You are on ${pos}. ${pos < 0 ? 'Negative: below zero (like −5 °C on a cold Lesotho winter night).' : pos > 0 ? 'Positive: above zero.' : 'Zero.'}`, `U ho ${pos}. ${pos < 0 ? "Ka tlase ho zero (joaloka −5 °C bosiung ba mariha a Lesotho)." : pos > 0 ? 'Ka holimo ho zero.' : 'Zero.'}`); };
  draw();
  return toolCard('tryIt', svg, h('div', { class: 'row center' }, [-5, -1, 1, 5].map(v => h('button', { class: 'btn', onclick: () => { pos = Math.max(-10, Math.min(10, pos + v)); draw(); } }, (v > 0 ? '+' : '') + v))), res);
};

/* candle and jar: oxygen supports burning */
Tools.candle = function () {
  const svg = h('div'); const res = live(); let timer = null;
  const draw = (jar, flame) => { svg.innerHTML = `<svg viewBox="0 0 200 200" width="180" style="display:block;margin:0 auto" aria-hidden="true"><rect x="40" y="180" width="120" height="8" fill="#8b5a2b"/><rect x="88" y="120" width="24" height="60" fill="#fff8e1" stroke="#c9b37a"/><line x1="100" y1="120" x2="100" y2="112" stroke="#333" stroke-width="2"/>${flame > 0 ? `<ellipse cx="100" cy="${102}" rx="${6 * flame}" ry="${14 * flame}" fill="#ffb300"/><ellipse cx="100" cy="105" rx="${3 * flame}" ry="${7 * flame}" fill="#fff59d"/>` : '<path d="M100 110 q6 -14 0 -26 q-6 -10 2 -20" stroke="#999" fill="none" stroke-width="2"/>'}${jar ? `<path d="M${100 - jar} 180 V${80 - jar / 3} q0 -12 12 -12 h${2 * jar - 24} q12 0 12 12 V180" fill="rgba(160,200,255,.25)" stroke="#6b8fc7" stroke-width="3"/>` : ''}</svg>`; };
  const run = size => {
    clearInterval(timer); let f = 1; const secs = size === 'big' ? 9 : 4; let t = 0; draw(size === 'big' ? 60 : 36, f);
    say2(res, 'The jar is over the candle. The flame is using up the oxygen inside…', 'Nkho e koahetse kerese. Lelakabe le sebelisa oksijene e ka hare…');
    timer = setInterval(() => { t += .5; f = Math.max(0, 1 - Math.pow(t / secs, 3)); draw(size === 'big' ? 60 : 36, f); if (f <= 0) { clearInterval(timer); say2(res, `The candle went out after about ${secs} seconds. Fire needs OXYGEN. A ${size === 'big' ? 'BIG jar has more air, so it burned longer' : 'SMALL jar has less air, so it went out quickly'}.`, `Kerese e timile ka mor'a metsotsoana e ka bang ${secs}. Mollo o hloka OKSIJENE. ${size === 'big' ? 'Nkho e KHOLO e na le moea o mongata, kahoo e tukile nako e telele' : "Nkho e NYANE e na le moea o fokolang, kahoo e timile kapele"}.`); } }, 500);
  };
  draw(0, 1);
  return toolCard('experiment', svg, h('div', { class: 'row center' }, h('button', { class: 'btn', onclick: () => run('small') }, tx({ en: 'Small jar', st: 'Nkho e nyane' })), h('button', { class: 'btn', onclick: () => run('big') }, tx({ en: 'Big jar', st: 'Nkho e kholo' })), h('button', { class: 'btn ghost', onclick: () => { clearInterval(timer); draw(0, 1); res.innerHTML = ''; } }, T('reset'))), res);
};

/* simple electric circuit */
Tools.circuit = function () {
  let on = false; const svg = h('div'); const res = live();
  const draw = () => { svg.innerHTML = `<svg viewBox="0 0 260 170" width="100%" aria-hidden="true"><rect x="30" y="30" width="200" height="110" fill="none" stroke="${on ? '#e8761a' : '#555'}" stroke-width="4" stroke-dasharray="${on ? '0' : '0'}"/><rect x="15" y="65" width="30" height="40" fill="#333"/><rect x="22" y="58" width="16" height="7" fill="#999"/><text x="30" y="125" font-size="11" text-anchor="middle">🔋</text><circle cx="130" cy="30" r="18" fill="${on ? '#ffeb3b' : '#eee'}" stroke="#555" stroke-width="2"/>${on ? '<circle cx="130" cy="30" r="30" fill="rgba(255,235,59,.35)"/>' : ''}<line x1="110" y1="140" x2="${on ? 150 : 145}" y2="${on ? 140 : 118}" stroke="#555" stroke-width="5" stroke-linecap="round"/><rect x="100" y="132" width="60" height="16" fill="#fff"/><line x1="105" y1="140" x2="${on ? 155 : 148}" y2="${on ? 140 : 116}" stroke="#1f4fb5" stroke-width="5" stroke-linecap="round"/><circle cx="105" cy="140" r="5" fill="#1f4fb5"/><circle cx="155" cy="140" r="5" fill="#1f4fb5"/></svg>`; say2(res, on ? 'Switch CLOSED: the circuit is complete, electricity flows, the bulb lights.' : 'Switch OPEN: there is a gap, electricity cannot flow, the bulb is off.', on ? 'Switch E KOALIEHILE: potoloho e felletse, motlakase oa phalla, bolebe boa khanya.' : 'Switch E BULEHILE: ho na le sekheo, motlakase o ke ke oa phalla, bolebe bo timile.'); };
  draw();
  return toolCard('tryIt', svg, h('button', { class: 'btn primary block', onclick: () => { on = !on; draw(); Platform.vibrate(20); } }, tx({ en: 'Press the switch', st: 'Tobetsa switch' })), res);
};

/* profit calculator for small business (entrepreneurship) */
Tools.profit = function () {
  const f = { cost: 60, n: 12, price: 8 }; const res = live();
  const inp = (k, lab) => h('label', { class: 'slider-row' }, h('span', { class: 'small' }, lab), h('input', { type: 'number', value: f[k], min: 0, oninput: e => { f[k] = +e.target.value || 0; calc(); } }), h('span'));
  const calc = () => { const inc = f.n * f.price, p = inc - f.cost; say2(res, `Income = ${f.n} × M${f.price} = M${inc}. ${p >= 0 ? 'Profit' : 'Loss'} = M${inc} − M${f.cost} = M${Math.abs(p)}. ${p < 0 ? 'Raise the price or lower your costs.' : ''}`, `Chelete e kenang = ${f.n} × M${f.price} = M${inc}. ${p >= 0 ? 'Phaello' : 'Tahlehelo'} = M${inc} − M${f.cost} = M${Math.abs(p)}. ${p < 0 ? 'Nyolla theko kapa u fokotse litšenyehelo.' : ''}`); res.style.color = p >= 0 ? 'var(--green)' : 'var(--red)'; };
  calc();
  return toolCard('tryIt', inp('cost', tx({ en: 'Cost of materials (M)', st: 'Litšenyehelo (M)' })), inp('n', tx({ en: 'Items made', st: 'Lintho tse entsoeng' })), inp('price', tx({ en: 'Price each (M)', st: 'Theko e le ngoe (M)' })), res);
};

/* balance scale for equations */
Tools.balance = function () {
  const x = rnd(2, 9), b = rnd(1, 9); let guess = 1; const svg = h('div'); const res = live();
  const draw = () => { const left = guess + b, right = x + b, tilt = Math.max(-12, Math.min(12, (right - left) * 3)); svg.innerHTML = `<svg viewBox="0 0 300 160" width="100%" aria-hidden="true"><polygon points="150,150 135,120 165,120" fill="#555"/><g transform="rotate(${tilt} 150 70)"><line x1="40" y1="70" x2="260" y2="70" stroke="#333" stroke-width="5"/><rect x="40" y="40" width="70" height="28" rx="6" fill="#1f4fb5"/><text x="75" y="59" fill="#fff" text-anchor="middle" font-weight="800">x + ${b}</text><rect x="190" y="40" width="70" height="28" rx="6" fill="#f6b73c"/><text x="225" y="59" text-anchor="middle" font-weight="800">${x + b}</text></g><line x1="150" y1="70" x2="150" y2="122" stroke="#333" stroke-width="4"/></svg>`; say2(res, `If x = ${guess}: ${guess} + ${b} = ${left} ${left === right ? '= ' + right + '. BALANCED! x = ' + x : left < right ? '< ' + right + ' (too light)' : '> ' + right + ' (too heavy)'}`, `Haeba x = ${guess}: ${guess} + ${b} = ${left} ${left === right ? '= ' + right + '. E LEKANE! x = ' + x : left < right ? '< ' + right + ' (e bobebe haholo)' : '> ' + right + ' (e boima haholo)'}`); if (left === right) react(true); };
  draw();
  return toolCard('tryIt', svg, h('label', { class: 'slider-row' }, h('span', {}, 'x ='), h('input', { type: 'range', min: 0, max: 15, value: guess, oninput: e => { guess = +e.target.value; e.target.nextSibling.textContent = guess; draw(); } }), h('b', {}, guess)), res);
};

/* rain gauge reading */
Tools.raingauge = function () {
  const days = [['Mon', 'Mantaha', rnd(0, 12)], ['Tue', 'Labobeli', rnd(0, 25)], ['Wed', 'Laboraro', rnd(0, 5)], ['Thu', 'Labone', rnd(0, 30)], ['Fri', 'Labohlano', rnd(0, 10)]];
  const tot = days.reduce((a, d) => a + d[2], 0); const res = live();
  const bars = h('div', { class: 'bars', style: { marginBottom: '26px' } }, days.map(d => h('div', { style: { height: (d[2] * 3 + 2) + 'px' } }, h('em', {}, d[2]), h('span', {}, tx({ en: d[0], st: d[1].slice(0, 4) })))));
  say2(res, `Rain in mm each day. Total for the week = ${days.map(d => d[2]).join(' + ')} = ${tot} mm. Wettest day: ${days.reduce((a, b) => b[2] > a[2] ? b : a)[0]}.`, `Pula ka mm letsatsi le leng le le leng. Kakaretso ea beke = ${days.map(d => d[2]).join(' + ')} = ${tot} mm. Letsatsi le nang le pula e ngata: ${days.reduce((a, b) => b[2] > a[2] ? b : a)[1]}.`);
  return toolCard('tryIt', bars, res);
};

/* syllable builder for Sesotho reading (ho bopa mantsoe) */
Tools.syllables = function (o) {
  const parts = o.parts || ['ba', 'na', 'ntja', 'ko', 'lo', 'me', 'ho', 'pe', 'li', 'tšo', 'a', 'mo'];
  let word = []; const out = h('div', { class: 'big-num', 'aria-live': 'polite' }, '…');
  const known = (LESELI.words || []).map(w => w.st.toLowerCase());
  const res = live();
  const draw = () => { const w = word.join(''); out.textContent = w || '…'; if (known.includes(w)) { const e = LESELI.words.find(x => x.st.toLowerCase() === w); say2(res, `✔ "${w}" = ${e.en}`, `✔ "${w}" ke lentsoe! (${e.en})`); react(true); } else res.innerHTML = ''; };
  return toolCard('tryIt', out, h('div', { class: 'row center' }, parts.map(p => h('button', { class: 'btn', onclick: () => { word.push(p); Speech.say(word.join(''), 'st'); draw(); } }, p))), h('div', { class: 'row center', style: { marginTop: '8px' } }, h('button', { class: 'btn small', onclick: () => { word.pop(); draw(); } }, '⌫'), h('button', { class: 'btn small', onclick: () => { word = []; draw(); } }, T('clear'))), res);
};
