/* Endless maths practice that adapts to the learner.
   3 right in a row -> harder; 2 wrong in a row -> easier. Every wrong answer shows the worked
   solution (MS) so the learner sees HOW. Skills follow the Grade 5-7 syllabus and the topics
   learners told us were hard (addition, subtraction, multiplication, long division, multiples, angles). */
'use strict';

const Skills = {
  add: { g: 5, emo: '➕', name: L('Addition (carrying)', 'Ho kopanya (ho fetisetsa)'),
    gen: lv => { const d = [2, 3, 4, 5, 5, 6][lv - 1] || 5; const a = rnd(10 ** (d - 1), 10 ** d - 1), b = rnd(10 ** (d - 1), 10 ** d - 1); return { q: `${fmt(a)} + ${fmt(b)}`, ans: a + b, solve: () => MS.add(a, b) }; } },
  sub: { g: 5, emo: '➖', name: L('Subtraction (borrowing)', 'Ho tlosa (ho alima)'),
    gen: lv => { const d = [2, 3, 4, 5, 5, 6][lv - 1] || 5; let a = rnd(10 ** (d - 1), 10 ** d - 1), b = rnd(10 ** (d - 2) || 1, a); if (lv >= 4 && Math.random() < .5) a = Math.round(a / 1000) * 1000 || 1000; if (b > a) b = rnd(1, a); return { q: `${fmt(a)} − ${fmt(b)}`, ans: a - b, solve: () => MS.sub(a, b) }; } },
  tables: { g: 5, emo: '✖️', name: L('Times tables', 'Litafole tsa ho atisa'),
    gen: lv => { const a = rnd(2, lv < 3 ? 5 : 10), b = rnd(2, 10 + (lv > 4 ? 2 : 0)); return { q: `${a} × ${b}`, ans: a * b, solve: () => MS.mul(a, b) }; } },
  mul: { g: 5, emo: '🧮', name: L('Long multiplication', 'Ho atisa ho holoanyane'),
    gen: lv => { const a = lv < 3 ? rnd(12, 99) : rnd(100, 999), b = lv < 2 ? rnd(2, 9) : rnd(11, lv < 4 ? 30 : 99); return { q: `${a} × ${b}`, ans: a * b, solve: () => MS.mul(a, b) }; } },
  div: { g: 5, emo: '➗', name: L('Long division', 'Ho arola (long division)'),
    gen: lv => { const d = lv < 3 ? rnd(2, 9) : rnd(2, lv < 5 ? 12 : 25); const q = lv < 2 ? rnd(11, 99) : rnd(100, lv < 4 ? 999 : 9999); const n = d * q; return { q: `${fmt(n)} ÷ ${d}`, ans: q, solve: () => MS.div(n, d) }; } },
  multiples: { g: 5, emo: '🔢', name: L('Multiples', 'Liatiso (multiples)'),
    gen: lv => { const n = rnd(2, 10), k = rnd(2, lv < 3 ? 6 : 12); const opts = shuffle([n * k, n * k + rnd(1, n - 1 || 1), n * k - 1, n * (k + 1) + 1]).filter((v, i, a) => a.indexOf(v) === i); return { q: L(`Which number is a multiple of ${n}?`, `Ke nomoro efe e leng seatiso sa ${n}?`), opts, ans: n * k, solve: () => MS.multiples(n, Math.max(k, 6)) }; } },
  round: { g: 5, emo: '🎯', name: L('Rounding to 1 000', 'Ho potoloha ho 1 000'),
    gen: lv => { const to = lv < 2 ? 10 : lv < 3 ? 100 : 1000; const n = rnd(to * 2, to * 99); return { q: L(`Round ${fmt(n)} to the nearest ${fmt(to)}`, `Potoloha ${fmt(n)} ho ${fmt(to)} e haufi`), ans: Math.round(n / to) * to, solve: () => MS.round(n, to) }; } },
  frac: { g: 5, emo: '🍕', name: L('Adding & subtracting fractions', 'Ho kopanya le ho tlosa likaroloana'),
    gen: lv => { const ds = lv < 2 ? [[4, 4], [5, 5], [8, 8]] : lv < 4 ? [[2, 4], [3, 6], [4, 8], [2, 3], [3, 4]] : [[3, 5], [4, 6], [6, 8], [2, 5]]; const [d1, d2] = pick(ds); let n1 = rnd(1, d1 - 1), n2 = rnd(1, d2 - 1); const op = n1 / d1 > n2 / d2 && Math.random() < .5 ? '-' : '+'; const r = MS.fracOp(MS.fr(n1, d1), MS.fr(n2, d2), op); return { q: `${n1}/${d1} ${op === '-' ? '−' : '+'} ${n2}/${d2}`, ans: r.answer, frac: true, solve: () => r }; } },
  mixed: { g: 5, emo: '🥧', name: L('Mixed fractions', 'Likaroloana tse kopaneng'),
    gen: () => { const d = pick([2, 3, 4, 5, 6, 8]); const a = MS.fr(rnd(1, d - 1), d, rnd(1, 4)), b = MS.fr(rnd(1, d - 1), d, rnd(1, 3)); const op = Math.random() < .5 ? '+' : '-'; const big = op === '-' && (a.w * d + a.n) < (b.w * d + b.n); const [x, y] = big ? [b, a] : [a, b]; const r = MS.fracOp(x, y, op); return { q: `${x.w} ${x.n}/${d} ${op === '-' ? '−' : '+'} ${y.w} ${y.n}/${d}`, ans: r.answer, frac: true, solve: () => r }; } },
  angles: { g: 5, emo: '📐', name: L('Angles in a triangle', 'Likhutlo tsa khutlo-tharo'),
    gen: () => { const a = rnd(20, 100), b = rnd(20, 160 - a); return { q: L(`A triangle has angles ${a}° and ${b}°. What is the third angle?`, `Khutlo-tharo e na le likhutlo tsa ${a}° le ${b}°. Sekhutlo sa boraro ke bokae?`), ans: 180 - a - b, solve: () => MS.triangle(a, b) }; } },
  units: { g: 5, emo: '📏', name: L('cm ↔ m, g ↔ kg', 'cm ↔ m, g ↔ kg'),
    gen: () => { const c = pick([['cm', 'm', 100], ['m', 'cm', 100], ['g', 'kg', 1000], ['kg', 'g', 1000], ['ml', 'l', 1000], ['m', 'km', 1000]]); const big = ['m', 'kg', 'l', 'km'].includes(c[0]) && c[0] !== 'm' || (c[0] === 'm' && c[1] === 'cm'); const v = big ? rnd(1, 9) : rnd(1, 9) * c[2] / pick([1, 2, 4, 10]); const r = MS.convert(v, c[0], c[1]); return { q: `${v} ${c[0]} = ? ${c[1]}`, ans: r.answer, dot: true, solve: () => r }; } },
  money: { g: 5, emo: '💰', name: L('Money (Maloti)', 'Chelete (Maloti)'),
    gen: () => { const item = pick([['bread', 'bohobe', 14], ['milk', 'lebese', 19], ['eggs (6)', 'mahe (6)', 24], ['maize meal 2 kg', 'phofo ea poone 2 kg', 32], ['apple', 'apole', 4], ['pen', 'pene', 6]]); const n = rnd(2, 9); const pay = Math.ceil(item[2] * n / 50) * 50 + (Math.random() < .5 ? 50 : 0); return Math.random() < .5 ? { q: L(`One ${item[0]} costs M${item[2]}. How much do ${n} cost?`, `${item[1]} se le seng se bitsa M${item[2]}. Tse ${n} li bitsa bokae?`), ans: item[2] * n, solve: () => MS.mul(item[2], n) }
      : { q: L(`You buy ${n} × ${item[0]} at M${item[2]} each and pay M${pay}. How much change?`, `U reka ${item[1]} tse ${n} ka M${item[2]} e 'ngoe 'me u lefa M${pay}. U fumana chelete e sala e kae?`), ans: pay - item[2] * n, solve: () => { const a = MS.mul(item[2], n), b = MS.sub(pay, item[2] * n); return { answer: pay - item[2] * n, steps: a.steps.concat(b.steps), layout: b.layout }; } }; } },
  percent: { g: 6, emo: '💯', name: L('Percentages', 'Liphesente'),
    gen: lv => { const p = pick(lv < 3 ? [10, 50, 25] : [5, 10, 15, 20, 25, 30, 40, 75]), of = pick([20, 40, 60, 80, 100, 120, 200, 240, 400]); return { q: L(`${p}% of ${of}`, `${p}% ea ${of}`), ans: p * of / 100, dot: true, solve: () => MS.percent(p, of) }; } },
  hcf: { g: 6, emo: '🔗', name: L('HCF and LCM', 'HCF le LCM'),
    gen: () => { const g = rnd(2, 6), a = g * rnd(2, 6), b = g * rnd(2, 7); const ask = Math.random() < .5 ? 'HCF' : 'LCM'; return { q: L(`${ask} of ${a} and ${b}`, `${ask} ea ${a} le ${b}`), ans: ask === 'HCF' ? MS.gcd(a, b) : MS.lcm(a, b), solve: () => MS.hcfLcm(a, b) }; } },
  integers: { g: 7, emo: '🌡️', name: L('Negative numbers', 'Linomoro tse ka tlase ho 0'),
    gen: () => { const a = rnd(-12, 12), b = rnd(-12, 12), op = pick(['+', '−']); const ans = op === '+' ? a + b : a - b; const s = x => x < 0 ? `(${x})` : x; return { q: `${s(a)} ${op} ${s(b)}`, ans, neg: true, solve: () => ({ answer: ans, steps: [{ en: `Start at ${a} on the number line. ${op === '+' ? (b >= 0 ? 'Adding a positive: move right ' + b : 'Adding a negative: move left ' + (-b)) : (b >= 0 ? 'Subtracting a positive: move left ' + b : 'Subtracting a negative is the same as adding: move right ' + (-b))}. You land on ${ans}.`, st: `Qala ho ${a} moleng oa linomoro. ${op === '+' ? (b >= 0 ? 'Ho kopanya e ntle: ea ka ho le letona ' + b : 'Ho kopanya e mpe: ea ka ho le letšehali ' + (-b)) : (b >= 0 ? 'Ho tlosa e ntle: ea ka ho le letšehali ' + b : 'Ho tlosa e mpe ho tšoana le ho kopanya: ea ka ho le letona ' + (-b))}. U fihla ho ${ans}.` }], layout: '' }) }; } },
  equations: { g: 7, emo: '⚖️', name: L('Solve for x', 'Fumana x'),
    gen: lv => { const x = rnd(1, 15), a = lv < 3 ? 1 : rnd(2, 6), b = rnd(1, 20); const c = a * x + b; return { q: `${a === 1 ? '' : a}x + ${b} = ${c}`, ans: x, solve: () => ({ answer: x, steps: [{ en: `Take ${b} away from both sides: ${a === 1 ? '' : a}x = ${c} − ${b} = ${c - b}.`, st: `Tlosa ${b} mahlakoreng ka bobeli: ${a === 1 ? '' : a}x = ${c} − ${b} = ${c - b}.` }].concat(a > 1 ? [{ en: `Divide both sides by ${a}: x = ${c - b} ÷ ${a} = ${x}.`, st: `Arola mahlakore ka bobeli ka ${a}: x = ${c - b} ÷ ${a} = ${x}.` }] : []).concat([{ en: `Check: ${a} × ${x} + ${b} = ${c} ✓`, st: `Hlahloba: ${a} × ${x} + ${b} = ${c} ✓` }]), layout: '' }) }; } },
  area: { g: 6, emo: '⬛', name: L('Area & perimeter', 'Sebaka le potoloho'),
    gen: () => { const l = rnd(3, 20), w = rnd(2, 15); const isA = Math.random() < .5; return { q: L(`A rectangle is ${l} m long and ${w} m wide. What is its ${isA ? 'area (m²)' : 'perimeter (m)'}?`, `Khutlo-nne e bolelele ba ${l} m le bophara ba ${w} m. ${isA ? 'Sebaka (area) sa eona ke bokae (m²)' : 'Potoloho (perimeter) ea eona ke bokae (m)'}?`), ans: isA ? l * w : 2 * (l + w), solve: () => ({ answer: isA ? l * w : 2 * (l + w), steps: isA ? [{ en: `Area = length × width = ${l} × ${w} = ${l * w} m²`, st: `Sebaka = bolelele × bophara = ${l} × ${w} = ${l * w} m²` }] : [{ en: `Perimeter = 2 × (length + width) = 2 × (${l} + ${w}) = ${2 * (l + w)} m`, st: `Potoloho = 2 × (bolelele + bophara) = 2 × (${l} + ${w}) = ${2 * (l + w)} m` }], layout: '' }) }; } }
};
LESELI.practiceFor = { maths: true };

Screens.practice = function (main, skill) {
  if (!skill || !Skills[skill]) {
    add(main, [ut('h1', 'practice'), ut('p', 'practiceIntro', { class: 'muted' })]);
    const g = Content.grade();
    [5, 6, 7].forEach(gr => {
      const list = Object.entries(Skills).filter(([, s]) => s.g === gr); if (!list.length) return;
      main.appendChild(h('h2', {}, T('grade') + ' ' + gr + (gr <= g ? '' : ' ↑')));
      main.appendChild(h('div', { class: 'grid' }, list.map(([id, s]) => { const st = (Store.prog().practice[id] || {}); return h('a', { class: 'tile', href: '#/practice/' + id, style: { minHeight: '104px' } }, h('span', { class: 'big-emoji', style: { fontSize: '30px' } }, s.emo), h('b', {}, tx(s.name)), h('small', {}, st.right ? '✔ ' + st.right + ' · ' + T('level') + ' ' + (st.level || 1) : '')); })));
    });
    return T('practice');
  }
  const S = Skills[skill], p = Store.prog();
  const st = p.practice[skill] || (p.practice[skill] = { level: 1, right: 0, wrong: 0, streak: 0, miss: 0 });
  let total = 0, good = 0;
  add(main, [h('div', { class: 'row between' }, h('h1', { style: { margin: 0 } }, S.emo + ' ' + tx(S.name)))]);
  const info = h('div', { class: 'row', style: { margin: '8px 0 12px' } });
  const area = h('div'); add(main, [info, area]);
  const drawInfo = () => { info.innerHTML = ''; add(info, [h('span', { class: 'pill blue' }, T('level') + ' ' + st.level), h('span', { class: 'pill green' }, '✔ ' + good + '/' + total), h('span', { class: 'pill' }, '🔥 ' + st.streak)]); };
  const next = () => {
    drawInfo(); area.innerHTML = '';
    const item = S.gen(st.level);
    const qObj = typeof item.q === 'string' ? item.q : item.q;
    const card = h('section', { class: 'card' }, typeof qObj === 'string' ? h('div', { class: 'big-num', 'data-read': '', lang: 'en', 'data-read-text': '' }, qObj.replace(/×/g, '×')) : biText('div', qObj, 'q-text'));
    area.appendChild(card);
    const fb = h('div', { 'aria-live': 'assertive' }); area.appendChild(fb);
    const done = (val) => {
      const norm = x => String(x).replace(/\s+/g, ' ').trim().replace(/^(\d+)\s(\d+)\/(\d+)$/, '$1 $2/$3');
      const ok = item.opts ? val === item.ans : (norm(val) === norm(item.ans) || Number(val) === Number(item.ans));
      total++; if (ok) { good++; st.right++; st.streak++; st.miss = 0; Store.addStars(st.streak % 5 === 0 ? 1 : 0); } else { st.wrong++; st.streak = 0; st.miss++; }
      let lvlMsg = null;
      if (ok && st.streak > 0 && st.streak % 3 === 0 && st.level < 6) { st.level++; lvlMsg = T('levelUp'); }
      if (!ok && st.miss >= 2 && st.level > 1) { st.level--; st.miss = 0; lvlMsg = T('levelDown'); }
      p.practice.right = (p.practice.right || 0) + (ok ? 1 : 0);
      Store.log('practice', { skill, ok, level: st.level }); Store.save(); react(ok); Badges.check();
      fb.appendChild(h('div', { class: 'feedback ' + (ok ? 'good' : 'bad') }, icon(ok ? 'check' : 'x'), h('div', {}, ut('div', ok ? 'correct' : 'wrong'), ok ? null : h('div', {}, T('answerIs') + ': ', h('b', {}, String(item.ans))), lvlMsg ? h('div', { class: 'small' }, lvlMsg) : null)));
      if (!ok || Math.random() < .25) fb.appendChild(workedBox(item.solve(), typeof item.q === 'string' ? item.q : null));
      fb.appendChild(h('button', { class: 'btn primary block', onclick: next }, T('next'), icon('next')));
      if (Store.s.settings.autoRead || Store.s.settings.vision) Speech.speakChunks(chunksOf(fb)); else Speech.say(ok ? T('correct') : T('wrong') + ' ' + T('answerIs') + ' ' + item.ans, I18N.ui());
      setTimeout(() => fb.querySelector('.btn.primary').focus(), 60);
    };
    if (item.opts) {
      const o = h('div', { class: 'options' }); item.opts.forEach((v, j) => o.appendChild(h('button', { class: 'opt', onclick: e => { $$('.opt', o).forEach(b => b.disabled = true); e.currentTarget.classList.add(v === item.ans ? 'right' : 'wrong'); done(v); } }, h('span', { class: 'letter' }, 'ABCD'[j]), String(v)))); card.appendChild(o);
    } else card.appendChild(numberPad(done, { allowFrac: item.frac, allowDot: item.dot, allowNeg: item.neg }));
    card.appendChild(h('div', { class: 'sec-tools' }, speakBtn(() => [{ text: (typeof item.q === 'string' ? item.q : tx(item.q, I18N.ui())).replace(/×/g, ' times ').replace(/÷/g, ' divided by ').replace(/−/g, ' minus '), lang: typeof item.q === 'string' ? 'en' : I18N.ui() }]),
      h('button', { class: 'btn small ghost', onclick: () => { fb.innerHTML = ''; fb.appendChild(workedBox(item.solve(), null)); } }, icon('bulb', null, 18), T('showMe'))));
    if (Store.s.settings.vision) card.querySelector('.sec-tools .btn').click();
  };
  next();
  return tx(S.name);
};
