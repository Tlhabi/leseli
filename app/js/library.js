/* Library: word book (dictionary), story books, subject textbooks, games.
   Learners told us they only have textbooks at school (shared 3-4 per book) – the library puts
   readable "textbooks" and story books on any phone at home. */
'use strict';

Screens.library = function (main) {
  add(main, [ut('h1', 'library'), ut('p', 'libraryIntro', { class: 'muted' })]);
  const big = (href, emo, key, sub, col) => h('a', { class: 'book-cover', href, style: { background: col } }, h('span', { class: 'emo', 'aria-hidden': 'true' }, emo), h('b', {}, T(key)), h('small', {}, sub));
  main.appendChild(h('div', { class: 'grid' },
    big('#/dict', '🔤', 'dictionary', (LESELI.words || []).length + ' ' + T('words'), 'linear-gradient(135deg,#c0561a,#e8913a)'),
    big('#/stories', '📖', 'stories', (LESELI.stories || []).length + ' ' + T('books'), 'linear-gradient(135deg,#7b3fb0,#a46bd6)'),
    big('#/textbooks', '📚', 'textbooks', T('grade') + ' 5 – 7', 'linear-gradient(135deg,#0b2e7a,#1f4fb5)'),
    big('#/games', '🎲', 'games', 'Morabaraba · Lilotho', 'linear-gradient(135deg,#00804a,#3aae6f)'),
    big('#/practice', '🧮', 'practice', T('practiceShort'), 'linear-gradient(135deg,#0f7c8c,#2aa6b6)'),
    big('#/proverbs', '💬', 'proverbs', 'Maele · Lilotho', 'linear-gradient(135deg,#c2366b,#e06a94)')));
  return T('library');
};

Screens.textbooks = function (main) {
  add(main, [ut('h1', 'textbooks'), ut('p', 'textbooksIntro', { class: 'muted' })]);
  [5, 6, 7].forEach(g => {
    main.appendChild(h('h2', {}, T('grade') + ' ' + g));
    main.appendChild(h('div', { class: 'grid' }, LESELI.subjects.map(s => h('a', { class: 'book-cover', href: `#/book/${s.id}/${g}`, style: { background: subjColor(s.id), minHeight: '110px' } }, h('span', { class: 'emo', style: { fontSize: '30px' }, html: '' }, icon(s.icon || s.id, null, 34)), h('b', {}, tx(s.title)), h('small', {}, Content.lessons(s.id, g).length + ' ' + T('chapters'))))));
  });
  return T('textbooks');
};

/* a "textbook": every lesson of one subject and grade, as chapters, printable */
Screens.book = function (main, subj, grade) {
  const s = LESELI.subject(subj); grade = +grade || 5; const ls = Content.lessons(subj, grade);
  add(main, [h('div', { class: 'lesson-head', style: { background: subjColor(subj) } }, h('span', { class: 'pill' }, T('textbook') + ' · ' + T('grade') + ' ' + grade), biText('h1', s.title), h('div', { class: 'small' }, tx(s.area)))]);
  const toc = h('section', { class: 'card' }, ut('h2', 'contents'), h('ol', {}, ls.map((l, i) => h('li', {}, h('a', { href: '#ch' + i, onclick: e => { e.preventDefault(); $('#ch' + i).scrollIntoView({ behavior: 'smooth' }); } }, tx(l.title))))));
  add(main, [toc, h('div', { class: 'row' }, h('button', { class: 'btn', onclick: () => window.print() }, icon('print'), T('print')), speakBtn(() => chunksOf(main)))]);
  ls.forEach((l, i) => {
    const ch = h('article', { id: 'ch' + i, style: { scrollMarginTop: '80px' } }, h('h2', { style: { marginTop: '24px', color: subjColor(subj) } }, `${T('chapter')} ${i + 1}: `, tx(l.title)));
    l.sections.forEach(sec => { const c = h('section', { class: 'card' }); if (sec.h) c.appendChild(biText('h3', sec.h)); if (sec.p) c.appendChild(biText('div', sec.p, '', true)); if (sec.ex) c.appendChild(h('div', { class: 'example' }, h('div', { class: 'lbl' }, T('example')), biText('div', sec.ex, '', true))); if (sec.calc) { const r = MS.solve(sec.calc); if (r) c.appendChild(workedBox(r, sec.calc)); } if (sec.fig) c.appendChild(h('figure', { class: 'fig', html: sec.fig })); ch.appendChild(c); });
    if (l.words && l.words.length) ch.appendChild(h('section', { class: 'card' }, ut('h3', 'keyWords'), h('p', {}, l.words.map(w => `${w[1]} – ${w[0]}`).join(' · '))));
    if (l.quiz && l.quiz.length) ch.appendChild(h('section', { class: 'card' }, ut('h3', 'exercise'), h('ol', {}, l.quiz.map(q => h('li', {}, tx(q.q, I18N.content() === 'en' ? 'en' : 'st'), q.o ? h('div', { class: 'small muted' }, q.o.map((o, k) => 'abcd'[k] + ') ' + tx(o, I18N.content() === 'en' ? 'en' : 'st')).join('   ')) : null))), h('a', { class: 'btn small', href: '#/lesson/' + l.id + '/quiz' }, icon('star', null, 16), T('takeQuiz'))));
    main.appendChild(ch);
  });
  Store.log('textbook', { subj, grade });
  return T('textbook');
};

/* bilingual word book */
Screens.dict = function (main) {
  const words = (LESELI.words || []).slice().sort((a, b) => a.en.localeCompare(b.en));
  const cats = [...new Set(words.map(w => w.cat))].filter(Boolean);
  let cat = null, dir = 'en';
  add(main, [ut('h1', 'dictionary')]);
  const wod = words[Math.floor(Date.now() / 864e5) % words.length];
  if (wod) main.appendChild(h('section', { class: 'card daily' }, h('div', { class: 'big-ic' }, '⭐'), h('div', {}, ut('small', 'wordOfDay', { class: 'muted' }), h('h2', { style: { margin: 0 }, lang: 'st', 'data-read': '' }, wod.st), h('div', { lang: 'en', 'data-read': '' }, wod.en)), h('button', { class: 'btn small', 'aria-label': T('listen'), onclick: () => Speech.speakChunks([{ text: wod.st, lang: 'st' }, { text: wod.en, lang: 'en' }]) }, icon('speaker', null, 18))));
  const inp = h('input', { type: 'search', placeholder: T('searchHint'), 'aria-label': T('search') });
  const seg = h('div', { class: 'seg', style: { margin: '10px 0' } }, [['en', 'English → Sesotho'], ['st', 'Sesotho → English']].map(([v, n]) => h('button', { 'aria-pressed': String(v === dir), onclick: e => { dir = v; $$('button', seg).forEach(b => b.setAttribute('aria-pressed', 'false')); e.currentTarget.setAttribute('aria-pressed', 'true'); draw(); } }, n)));
  const chips = h('div', { class: 'chips' }, h('button', { 'aria-pressed': 'true', onclick: e => setCat(null, e) }, T('all')), cats.map(c => h('button', { 'aria-pressed': 'false', onclick: e => setCat(c, e) }, tx(LESELI.wordCats && LESELI.wordCats[c] || c))));
  const setCat = (c, e) => { cat = c; $$('button', chips).forEach(b => b.setAttribute('aria-pressed', 'false')); e.currentTarget.setAttribute('aria-pressed', 'true'); draw(); };
  const list = h('div', { class: 'card', style: { padding: '4px 12px' } });
  const draw = () => {
    const q = inp.value.trim().toLowerCase(); list.innerHTML = '';
    let res = words.filter(w => (!cat || w.cat === cat) && (!q || w.en.toLowerCase().includes(q) || w.st.toLowerCase().includes(q)));
    if (dir === 'st') res = res.sort((a, b) => a.st.localeCompare(b.st));
    if (!res.length) { list.appendChild(h('p', { class: 'empty' }, T('noResults') + ' – ' + T('askTeacherAdd'))); return; }
    res.slice(0, 200).forEach(w => {
      const [a, b, la, lb] = dir === 'en' ? [w.en, w.st, 'en', 'st'] : [w.st, w.en, 'st', 'en'];
      list.appendChild(h('div', { class: 'dict-row' }, h('div', { class: 'w' }, h('b', { lang: la }, a), h('span', { lang: lb }, b), w.def ? h('div', { class: 'small muted' }, tx(w.def)) : null), w.cat ? h('span', { class: 'pill cat' }, tx(LESELI.wordCats && LESELI.wordCats[w.cat] || w.cat)) : null,
        h('button', { class: 'btn small', 'aria-label': T('listen') + ' ' + a, onclick: () => Speech.speakChunks([{ text: w.st, lang: 'st' }, { text: w.en, lang: 'en' }]) }, icon('speaker', null, 18))));
    });
    if (res.length > 200) list.appendChild(h('p', { class: 'muted small' }, '+' + (res.length - 200)));
  };
  inp.oninput = draw;
  add(main, [inp, seg, chips, list]); draw();
  return T('dictionary');
};

Screens.proverbs = function (main) {
  add(main, [h('h1', {}, tx({ en: 'Proverbs and riddles', st: 'Maele le lilotho' })), ut('p', 'proverbsIntro', { class: 'muted' })]);
  const pc = h('section', { class: 'card' }, h('h2', {}, '💬 ' + tx({ en: 'Proverbs (Maele)', st: 'Maele' })));
  (LESELI.proverbs || []).forEach(p => pc.appendChild(h('div', { class: 'dict-row' }, h('div', { class: 'w' }, h('b', { lang: 'st', 'data-read': '' }, p.st), h('span', { lang: 'en', 'data-read': '' }, p.en)), h('button', { class: 'btn small', 'aria-label': T('listen'), onclick: () => Speech.speakChunks([{ text: p.st, lang: 'st' }, { text: p.en, lang: 'en' }]) }, icon('speaker', null, 18)))));
  main.appendChild(pc);
  main.appendChild(h('a', { class: 'btn primary block', href: '#/game/lilotho' }, '🤔 ', tx({ en: 'Play the riddle game', st: 'Bapala papali ea lilotho' })));
  return tx({ en: 'Proverbs', st: 'Maele' });
};

/* ---------- stories ---------- */
Screens.stories = function (main) {
  add(main, [ut('h1', 'stories'), ut('p', 'storiesIntro', { class: 'muted' })]);
  const cols = ['#7b3fb0', '#c0561a', '#00804a', '#0f7c8c', '#c2366b', '#1f4fb5'];
  const read = Store.prog().stories || {};
  main.appendChild(h('div', { class: 'grid' }, (LESELI.stories || []).map((s, i) => h('a', { class: 'book-cover', href: '#/story/' + s.id, style: { background: cols[i % cols.length] } }, h('span', { class: 'emo', 'aria-hidden': 'true' }, s.cover), h('b', { lang: 'st' }, s.title.st), h('small', { lang: 'en' }, s.title.en), h('small', {}, (s.level ? T('grade') + ' ' + s.level : '') + (read[s.id] ? ' · ✔' : ''))))));
  return T('stories');
};
Screens.story = function (main, id) {
  const s = (LESELI.stories || []).find(x => x.id === id); if (!s) return go('stories');
  let p = 0;
  const wrap = h('div'); main.appendChild(wrap);
  const draw = () => {
    wrap.innerHTML = ''; Speech.stop();
    if (p >= s.pages.length) {
      const pr = Store.prog(); pr.stories[id] = Date.now(); Store.save(); Store.log('story', { id }); const nb = Badges.check();
      add(wrap, [h('div', { class: 'card result-big' }, h('div', { class: 'big-emoji' }, '📕'), ut('h2', 'theEnd'), s.moral ? biText('p', s.moral) : null, nb.map(b => h('p', { class: 'pill' }, b.emo + ' ' + tx(b.name))))]);
      if (s.quiz) { wrap.appendChild(ut('h2', 'storyQuestions')); renderQuiz(wrap, s.quiz, { noShuffle: true, onDone: (sc, max, a, w) => { w.appendChild(h('div', { class: 'card result-big' }, h('div', { class: 'score' }, sc + '/' + max))); react(sc === max); if (sc === max) confetti(); Store.log('story_quiz', { id, score: sc, max }); } }); }
      wrap.appendChild(h('div', { class: 'row', style: { marginTop: '10px' } }, h('button', { class: 'btn', onclick: () => { p = 0; draw(); } }, icon('refresh'), T('readAgain')), h('a', { class: 'btn primary', href: '#/stories' }, T('moreStories'))));
      return;
    }
    const pg = s.pages[p];
    if (p === 0) wrap.appendChild(biText('h1', s.title));
    const card = h('section', { class: 'card story-page' }, h('div', { class: 'story-pic', 'aria-hidden': 'true' }, pg.pic || s.cover), biText('div', { en: pg.en, st: pg.st }, '', true));
    add(wrap, [card,
      h('div', { class: 'row between' }, h('button', { class: 'btn', disabled: p === 0, onclick: () => { p--; draw(); }, 'aria-label': T('back') }, icon('back')), h('span', { class: 'muted' }, `${T('page')} ${p + 1} / ${s.pages.length}`), h('button', { class: 'btn primary', onclick: () => { p++; draw(); }, 'aria-label': T('next') }, icon('next'))),
      h('div', { class: 'row center', style: { marginTop: '10px' } }, speakBtn(() => chunksOf(card)), h('button', { class: 'btn small', onclick: () => { const auto = () => { p++; draw(); if (p < s.pages.length) Speech.speakChunks(chunksOf($('.story-page')), { onEnd: auto }); }; Speech.speakChunks(chunksOf(card), { onEnd: auto }); } }, icon('play', null, 18), T('readWholeBook')))]);
    // swipe to turn pages
    let x0 = null; card.addEventListener('touchstart', e => x0 = e.touches[0].clientX, { passive: true }); card.addEventListener('touchend', e => { if (x0 === null) return; const dx = e.changedTouches[0].clientX - x0; if (Math.abs(dx) > 60) { p = Math.max(0, p + (dx < 0 ? 1 : -1)); draw(); } x0 = null; });
    if (Store.s.settings.autoRead || Store.s.settings.vision) setTimeout(() => Speech.speakChunks(chunksOf(card)), 300);
  };
  draw();
  return tx(s.title);
};

/* ---------- games ---------- */
Screens.games = function (main) {
  add(main, [ut('h1', 'games'), ut('p', 'gamesIntro', { class: 'muted' })]);
  const g = (id, emo, en, st, den, dst) => h('a', { class: 'lesson-item', href: '#/game/' + id }, h('span', { class: 'big-emoji', style: { fontSize: '36px' } }, emo), h('span', { class: 'meta' }, h('b', {}, tx({ en, st })), h('small', {}, tx({ en: den, st: dst }))), icon('next'));
  add(main, [g('morabaraba', '⚫', 'Morabaraba', 'Morabaraba', 'The Basotho strategy game – play the phone or a friend (Grade 6: indigenous games)', 'Papali ea Basotho ea ho nahana – bapala le fono kapa motsoalle'),
    g('lilotho', '🤔', 'Riddles (Lilotho)', 'Lilotho', 'Guess the answers to traditional Sesotho riddles', 'Fumana likarabo tsa lilotho tsa Sesotho'),
    g('match', '🃏', 'Word match', 'Bapisa mantsoe', 'Match English and Sesotho words (memory game)', 'Bapisa mantsoe a Senyesemane le a Sesotho'),
    g('spell', '🐝', 'Spelling bee', 'Ho peleta', 'Listen and spell English words letter by letter', 'Mamela u pelete mantsoe a Senyesemane'),
    g('quickmaths', '⚡', 'Quick maths (60 seconds)', 'Lipalo ka potlako', 'How many can you answer in one minute?', 'U ka araba tse kae ka motsotso o le mong?')]);
  return T('games');
};
Screens.game = function (main, id) {
  Store.log('game', { id }); Badges.check();
  (Games[id] || Games.lilotho)(main);
  return { morabaraba: 'Morabaraba', lilotho: 'Lilotho', match: T('wordMatch'), spell: T('spellingBee'), quickmaths: T('quickMaths') }[id] || T('games');
};
