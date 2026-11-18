/* Games – learning through play. Morabaraba is the Basotho/Southern African "cattle" strategy
   game (Grade 6 Creativity: "play advanced versions of indigenous games"). */
'use strict';

const Games = {};

/* ---------- Morabaraba ---------- */
Games.morabaraba = function (main) {
  // points: ring r (0 outer..2 inner), position p (0 TL,1 TM,2 TR,3 MR,4 BR,5 BM,6 BL,7 ML)
  const xy = [];
  [[20, 280], [70, 230], [120, 180]].forEach(([a, b]) => { const m = (a + b) / 2; [[a, a], [m, a], [b, a], [b, m], [b, b], [m, b], [a, b], [a, m]].forEach(p => xy.push(p)); });
  const adj = Array.from({ length: 24 }, () => []);
  const link = (a, b) => { adj[a].push(b); adj[b].push(a); };
  for (let r = 0; r < 3; r++) for (let p = 0; p < 8; p++) link(r * 8 + p, r * 8 + (p + 1) % 8);
  for (let r = 0; r < 2; r++) for (let p = 0; p < 8; p++) link(r * 8 + p, (r + 1) * 8 + p); // includes diagonals at corners (Morabaraba)
  const mills = [];
  for (let r = 0; r < 3; r++) [[0, 1, 2], [2, 3, 4], [4, 5, 6], [6, 7, 0]].forEach(t => mills.push(t.map(p => r * 8 + p)));
  for (let p = 0; p < 8; p++) mills.push([p, 8 + p, 16 + p]);

  let board, hand, onBoard, turn, phase, sel, vsPhone = true, over = false;
  const reset = () => { board = Array(24).fill(0); hand = { 1: 12, 2: 12 }; onBoard = { 1: 0, 2: 0 }; turn = 1; phase = 'play'; sel = null; over = false; draw(); };
  const inMill = (i, b) => mills.some(m => m.includes(i) && m.every(k => b[k] === b[i]));
  const makesMill = (i, who, b, from) => mills.some(m => m.includes(i) && m.every(k => k === i ? true : (k !== from && b[k] === who)));
  const removable = who => { const opp = 3 - who; const all = board.map((v, i) => v === opp ? i : -1).filter(i => i >= 0); const free = all.filter(i => !inMill(i, board)); return free.length ? free : all; };
  const moves = who => {
    const out = []; const flying = hand[who] === 0 && onBoard[who] === 3;
    if (hand[who] > 0) { board.forEach((v, i) => { if (!v) out.push([null, i]); }); return out; }
    board.forEach((v, i) => { if (v !== who) return; (flying ? board.map((x, k) => k) : adj[i]).forEach(k => { if (!board[k]) out.push([i, k]); }); });
    return out;
  };
  const status = h('div', { class: 'card', 'aria-live': 'polite', style: { textAlign: 'center', fontWeight: 700 } });
  const svgBox = h('div', { class: 'board-wrap' });
  const name = w => w === 1 ? tx({ en: 'You (white)', st: 'Uena (tse tšoeu)' }) + (vsPhone ? '' : ' 1') : vsPhone ? tx({ en: 'Phone (black)', st: 'Fono (tse ntšo)' }) : tx({ en: 'Player 2 (black)', st: 'Sebapali sa 2 (tse ntšo)' });
  const say = (en, st) => { status.innerHTML = ''; status.appendChild(h('div', { 'data-read': '', lang: I18N.ui() }, tx({ en, st }))); status.appendChild(h('div', { class: 'small muted' }, `⚪ ${tx({ en: 'in hand', st: 'matsohong' })}: ${hand[1]} · ${tx({ en: 'on board', st: 'boteng' })}: ${onBoard[1]}   ⚫ ${hand[2]} · ${onBoard[2]}`)); };
  const draw = () => {
    let s = `<svg viewBox="0 0 300 300" width="100%" role="img" aria-label="Morabaraba board"><rect width="300" height="300" rx="14" fill="#e9d3a5"/>`;
    [[20, 260], [70, 160], [120, 60]].forEach(([a, w]) => s += `<rect x="${a}" y="${a}" width="${w}" height="${w}" fill="none" stroke="#5b3a12" stroke-width="3"/>`);
    for (let p = 0; p < 8; p++) s += `<line x1="${xy[p][0]}" y1="${xy[p][1]}" x2="${xy[16 + p][0]}" y2="${xy[16 + p][1]}" stroke="#5b3a12" stroke-width="3"/>`;
    xy.forEach(([x, y], i) => {
      const v = board[i];
      s += `<g data-i="${i}" role="button" tabindex="0" aria-label="${i + 1}: ${v === 1 ? 'white' : v === 2 ? 'black' : 'empty'}"><circle cx="${x}" cy="${y}" r="20" fill="transparent"/>` + (v ? `<circle cx="${x}" cy="${y}" r="13" fill="${v === 1 ? '#fff' : '#222'}" stroke="${sel === i ? '#00c26a' : phase === 'remove' && turn === 3 - v && removable(turn).includes(i) ? '#e53935' : '#5b3a12'}" stroke-width="${sel === i || phase === 'remove' ? 5 : 2}"/>` : `<circle cx="${x}" cy="${y}" r="6" fill="#5b3a12"/>`) + '</g>';
    });
    svgBox.innerHTML = s + '</svg>';
    $$('g[data-i]', svgBox).forEach(g => { g.addEventListener('click', () => tap(+g.dataset.i)); g.addEventListener('keydown', e => { if (e.key === 'Enter') tap(+g.dataset.i); }); });
    if (over) return;
    if (phase === 'remove') say(`${name(turn)}: you made a row of 3 (a mill)! Tap a ${turn === 1 ? 'black' : 'white'} cow to take it.`, `${name(turn)}: u entse mola oa 3! Tobetsa khomo ea ${turn === 1 ? 'ntšo' : 'tšoeu'} ho e nka.`);
    else if (hand[turn] > 0) say(`${name(turn)}: place a cow on an empty point.`, `${name(turn)}: beha khomo sebakeng se se nang letho.`);
    else say(`${name(turn)}: ${sel === null ? 'choose one of your cows to move' : 'tap where it should go'}${onBoard[turn] === 3 ? ' (3 cows left: you can FLY anywhere!)' : ''}.`, `${name(turn)}: ${sel === null ? 'khetha khomo ea hau eo u batlang ho e tsamaisa' : 'tobetsa moo e lokelang ho ea teng'}${onBoard[turn] === 3 ? ' (likhomo tse 3 li setse: e ka fofela kae kapa kae!)' : ''}.`);
  };
  const end = winner => { over = true; draw(); react(winner === 1 || !vsPhone); if (winner === 1 || !vsPhone) confetti(); say(`${name(winner)} wins! 🎉`, `${name(winner)} o hlotse! 🎉`); Store.log('game_end', { game: 'morabaraba', win: winner === 1 }); };
  const after = (to, from) => {
    if (makesMill(to, turn, board, -1) && inMill(to, board)) { phase = 'remove'; draw(); if (vsPhone && turn === 2) setTimeout(ai, 600); return; }
    nextTurn();
  };
  const nextTurn = () => {
    turn = 3 - turn; phase = 'play'; sel = null;
    if (hand[1] + hand[2] === 0 && (onBoard[turn] + hand[turn] < 3)) return end(3 - turn);
    if (!moves(turn).length) return end(3 - turn);
    draw(); if (vsPhone && turn === 2) setTimeout(ai, 650);
  };
  const doMove = (from, to) => { if (from === null) { hand[turn]--; onBoard[turn]++; } else board[from] = 0; board[to] = turn; Platform.vibrate(15); after(to, from); };
  const doRemove = i => { board[i] = 0; onBoard[3 - turn]--; react(true); if (hand[3 - turn] === 0 && onBoard[3 - turn] < 3) return end(turn); phase = 'play'; nextTurn(); };
  const tap = i => {
    if (over || (vsPhone && turn === 2)) return;
    if (phase === 'remove') { if (board[i] === 3 - turn && removable(turn).includes(i)) doRemove(i); else toast(tx({ en: 'Choose a cow of the other player that is not in a mill.', st: 'Khetha khomo ea sebapali se seng e seng moleng oa 3.' })); return; }
    if (hand[turn] > 0) { if (!board[i]) doMove(null, i); return; }
    if (board[i] === turn) { sel = i; draw(); return; }
    if (sel !== null && !board[i] && moves(turn).some(([f, t]) => f === sel && t === i)) doMove(sel, i);
  };
  const ai = () => {
    if (over) return;
    if (phase === 'remove') { const opts = removable(2); const danger = opts.filter(i => mills.some(m => m.includes(i) && m.filter(k => board[k] === 1).length === 2)); doRemove(pick(danger.length ? danger : opts)); return; }
    const ms = moves(2);
    const score = ([f, t]) => { const b = board.slice(); if (f !== null) b[f] = 0; b[t] = 2; let s = Math.random(); if (mills.some(m => m.includes(t) && m.every(k => b[k] === 2))) s += 100; const b2 = board.slice(); if (f !== null) b2[f] = 0; b2[t] = 1; if (mills.some(m => m.includes(t) && m.every(k => b2[k] === 1))) s += 50; s += adj[t].length; return s; };
    const best = ms.sort((a, b) => score(b) - score(a))[0];
    if (best) doMove(best[0], best[1]);
  };
  const modeSeg = h('div', { class: 'seg' }, [[true, tx({ en: 'vs phone', st: 'le fono' })], [false, tx({ en: '2 players', st: 'Libapali tse 2' })]].map(([v, n]) => h('button', { 'aria-pressed': String(v === vsPhone), onclick: e => { vsPhone = v; $$('button', modeSeg).forEach(b => b.setAttribute('aria-pressed', 'false')); e.currentTarget.setAttribute('aria-pressed', 'true'); reset(); } }, n)));
  const rules = h('details', { class: 'card' }, h('summary', {}, h('b', {}, tx({ en: 'How to play', st: 'Mokhoa oa ho bapala' }))), biText('div', L('Each player has 12 cows. 1) Take turns placing cows on the points. 2) When all are placed, move a cow along a line to an empty point next to it. 3) Three of your cows in a straight line = a MILL: take one of the other player\'s cows. 4) With only 3 cows left you may FLY to any empty point. 5) A player with fewer than 3 cows, or who cannot move, loses.', 'Sebapali se seng le se seng se na le likhomo tse 12. 1) Le beha likhomo ka ho fapanyetsana. 2) Ha tsohle li behiloe, tsamaisa khomo moleng ho ea sebakeng se se nang letho se haufi. 3) Likhomo tse tharo tsa hau moleng o le mong = MILL: nka khomo e le \'ngoe ea sebapali se seng. 4) Ha u setse le likhomo tse 3 u ka FOFA ho ea kae kapa kae. 5) Ea setseng le likhomo tse ka tlase ho 3, kapa ea sitoang ho tsamaea, oa hloloa.'), '', true));
  add(main, [h('div', { class: 'row between' }, h('h1', { style: { margin: 0 } }, '⚫ Morabaraba'), modeSeg), status, svgBox, h('div', { class: 'row center', style: { marginTop: '10px' } }, h('button', { class: 'btn', onclick: reset }, icon('refresh'), T('newGame'))), rules]);
  reset();
};

/* ---------- Lilotho (riddles) ---------- */
Games.lilotho = function (main) {
  const all = shuffle(LESELI.riddles || []).slice(0, 8); let i = 0, score = 0;
  const box = h('div'); add(main, [h('h1', {}, '🤔 Lilotho'), h('p', { class: 'muted' }, tx({ en: 'Traditional riddles. The asker says "Ka u lotha", you answer "Ka u lotholla!"', st: 'Lilotho tsa setso. Ea lothang o re "Ka u lotha", uena u re "Ka u lotholla!"' })), box]);
  const draw = () => {
    box.innerHTML = '';
    if (i >= all.length) { box.appendChild(h('div', { class: 'card result-big' }, h('div', { class: 'score' }, score + '/' + all.length), h('button', { class: 'btn primary', onclick: () => App.render() }, T('playAgain')))); if (score >= all.length - 1) confetti(); return; }
    const r = all[i];
    const opts = shuffle([r].concat(shuffle((LESELI.riddles || []).filter(x => x !== r)).slice(0, 3)));
    const card = h('section', { class: 'card' }, h('div', { class: 'small muted' }, (i + 1) + ' / ' + all.length), h('p', { 'data-read': '', lang: 'st' }, h('b', {}, 'Ka u lotha: '), r.q.st), h('p', { class: 'small muted', lang: 'en', 'data-read': '' }, r.q.en));
    const o = h('div', { class: 'options' }, opts.map((x, j) => h('button', { class: 'opt', onclick: e => { $$('.opt', o).forEach(b => b.disabled = true); const ok = x === r; if (ok) score++; react(ok); e.currentTarget.classList.add(ok ? 'right' : 'wrong'); o.children[opts.indexOf(r)].classList.add('right'); Speech.say(r.a.st, 'st'); setTimeout(() => { i++; draw(); }, 1800); } }, h('span', { class: 'letter' }, 'ABCD'[j]), h('span', {}, h('span', { lang: 'st' }, x.a.st), h('div', { class: 'small muted', lang: 'en' }, x.a.en)))));
    card.appendChild(o); card.appendChild(speakBtn(() => chunksOf(card)));
    box.appendChild(card);
    if (Store.s.settings.vision) setTimeout(() => Speech.speakChunks(chunksOf(card)), 300);
  };
  draw();
};

/* ---------- Word match memory ---------- */
Games.match = function (main) {
  const pool = (LESELI.words || []).filter(w => w.en.length < 14 && w.st.length < 14);
  let pairs, open = [], done = 0, tries = 0; const grid = h('div', { class: 'mem-grid' }); const info = h('p', { class: 'muted', 'aria-live': 'polite' });
  const start = () => {
    pairs = shuffle(pool).slice(0, 6); done = 0; tries = 0; open = [];
    const cards = shuffle(pairs.flatMap((w, k) => [{ k, t: w.en, lang: 'en' }, { k, t: w.st, lang: 'st' }]));
    grid.innerHTML = '';
    cards.forEach(c => { const b = h('button', { class: 'mem-card', 'aria-label': T('hiddenCard') }, '?'); b.onclick = () => flip(b, c); grid.appendChild(b); });
    info.textContent = tx({ en: 'Find each English word and its Sesotho partner.', st: 'Fumana lentsoe la Senyesemane le molekane oa lona oa Sesotho.' });
  };
  const flip = (b, c) => {
    if (b.classList.contains('open') || b.classList.contains('done') || open.length === 2) return;
    b.classList.add('open'); b.textContent = c.t; b.setAttribute('aria-label', c.t); Speech.say(c.t, c.lang); open.push([b, c]);
    if (open.length === 2) { tries++; const [[b1, c1], [b2, c2]] = open; if (c1.k === c2.k && c1.lang !== c2.lang) { setTimeout(() => { b1.classList.add('done'); b2.classList.add('done'); open = []; done++; react(true); if (done === 6) { confetti(); info.textContent = tx({ en: `Well done! ${tries} tries.`, st: `U entse hantle! Ka makhetlo a ${tries}.` }); } }, 500); } else setTimeout(() => { [b1, b2].forEach(x => { x.classList.remove('open'); x.textContent = '?'; x.setAttribute('aria-label', T('hiddenCard')); }); open = []; }, 1100); }
  };
  add(main, [h('h1', {}, '🃏 ' + T('wordMatch')), info, grid, h('button', { class: 'btn block', style: { marginTop: '12px' }, onclick: start }, icon('refresh'), T('newGame'))]);
  start();
};

/* ---------- Spelling bee (English letters) ---------- */
Games.spell = function (main) {
  const words = shuffle((LESELI.words || []).filter(w => /^[a-z]{3,8}$/.test(w.en))).slice(0, 10); let i = 0, score = 0, typed = '';
  const box = h('div'); add(main, [h('h1', {}, '🐝 ' + T('spellingBee')), h('p', { class: 'muted' }, tx({ en: 'Listen to the word (and see it in Sesotho). Spell it in English.', st: 'Mamela lentsoe (le ho le bona ka Sesotho). Le pelete ka Senyesemane.' })), box]);
  const draw = () => {
    box.innerHTML = ''; typed = '';
    if (i >= words.length) { box.appendChild(h('div', { class: 'card result-big' }, h('div', { class: 'score' }, score + '/' + words.length), h('button', { class: 'btn primary', onclick: () => { i = 0; score = 0; draw(); } }, T('playAgain')))); return; }
    const w = words[i]; const ans = h('div', { class: 'answer-box', 'aria-live': 'polite' }, '_ '.repeat(w.en.length));
    const hear = () => Speech.speakChunks([{ text: w.en, lang: 'en' }, { text: w.en.split('').join(', '), lang: 'en' }].slice(0, 1));
    const kb = h('div', { class: 'pad', style: { gridTemplateColumns: 'repeat(7,1fr)' } }, 'abcdefghijklmnopqrstuvwxyz'.split('').map(ch => h('button', { style: { fontSize: '1.1em', minHeight: '46px' }, onclick: () => { if (typed.length < w.en.length) { typed += ch; Speech.say(ch, 'en'); ans.textContent = typed + ' ' + '_ '.repeat(w.en.length - typed.length); if (typed.length === w.en.length) check(); } } }, ch)).concat([h('button', { class: 'del', onclick: () => { typed = typed.slice(0, -1); ans.textContent = typed + ' ' + '_ '.repeat(w.en.length - typed.length); } }, '⌫')]));
    const fb = h('div');
    const check = () => { const ok = typed === w.en; if (ok) score++; react(ok); fb.appendChild(h('div', { class: 'feedback ' + (ok ? 'good' : 'bad') }, ok ? '✔ ' : '✘ ', h('b', {}, w.en), ' = ', w.st)); Speech.say(ok ? 'Correct! ' + w.en.split('').join(' ') : 'The spelling is ' + w.en.split('').join(' '), 'en'); setTimeout(() => { i++; draw(); }, 2600); };
    add(box, [h('section', { class: 'card', style: { textAlign: 'center' } }, h('div', { class: 'small muted' }, (i + 1) + ' / ' + words.length), h('button', { class: 'btn primary', onclick: hear }, icon('speaker'), T('listen')), h('p', { lang: 'st', style: { fontSize: '1.3em', fontWeight: 800 } }, w.st), ans, kb, fb)]);
    setTimeout(hear, 300);
  };
  draw();
};

/* ---------- Quick maths ---------- */
Games.quickmaths = function (main) {
  let score = 0, left = 60, timer = null, cur = null;
  const box = h('div'); add(main, [h('h1', {}, '⚡ ' + T('quickMaths')), box]);
  const gen = () => { const op = pick(['+', '−', '×', '÷']); let a = rnd(2, 12), b = rnd(2, 12); if (op === '+') { a = rnd(10, 99); b = rnd(10, 99); return [`${a} + ${b}`, a + b]; } if (op === '−') { a = rnd(20, 99); b = rnd(1, a); return [`${a} − ${b}`, a - b]; } if (op === '×') return [`${a} × ${b}`, a * b]; return [`${a * b} ÷ ${a}`, b]; };
  const start = () => {
    score = 0; left = 60; box.innerHTML = ''; const t = h('div', { class: 'pill red', style: { fontSize: '1.1em' } }); const s = h('div', { class: 'pill green', style: { fontSize: '1.1em' } }); const q = h('div', { class: 'big-num', 'aria-live': 'polite' });
    const ask = () => { cur = gen(); q.textContent = cur[0] + ' = ?'; };
    const pad = numberPadReusable(v => { const ok = +v === cur[1]; if (ok) score++; react(ok); s.textContent = '✔ ' + score; ask(); });
    add(box, [h('div', { class: 'row between' }, t, s), h('section', { class: 'card' }, q, pad)]); ask();
    s.textContent = '✔ 0'; t.textContent = '⏱ 60';
    timer = setInterval(() => { left--; t.textContent = '⏱ ' + left; if (left <= 0 || !document.body.contains(box)) { clearInterval(timer); finish(); } }, 1000);
  };
  const finish = () => { if (!document.body.contains(box)) return; const best = Math.max(score, Store.prog().qmBest || 0); Store.prog().qmBest = best; Store.save(); Store.log('game_end', { game: 'quickmaths', score }); box.innerHTML = ''; add(box, [h('div', { class: 'card result-big' }, h('div', { class: 'score' }, score), h('p', {}, tx({ en: 'Best: ', st: 'E molemo ka ho fetisisa: ' }) + best), h('button', { class: 'btn primary', onclick: start }, T('playAgain')))]); if (score >= 10) confetti(); };
  box.appendChild(h('button', { class: 'btn primary block', onclick: start }, icon('play'), T('start')));
};
function numberPadReusable(onOk) {
  let val = ''; const box = h('div', { class: 'answer-box' }, '?');
  const pad = h('div', { class: 'pad' }, ['7', '8', '9', 'del', '4', '5', '6', 'ok', '1', '2', '3', '0'].map(k => h('button', { class: k === 'ok' ? 'ok' : k === 'del' ? 'del' : '', onclick: () => { if (k === 'del') val = val.slice(0, -1); else if (k === 'ok') { if (val) onOk(val); val = ''; } else if (val.length < 6) val += k; box.textContent = val || '?'; } }, k === 'del' ? '⌫' : k === 'ok' ? '✓' : k)));
  return h('div', {}, box, pad);
}
