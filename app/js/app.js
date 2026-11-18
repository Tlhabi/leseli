/* Leseli – the app shell: router, top bar, home, subjects, lessons, quizzes, "Me", settings.
   Hash routes (#/home, #/lesson/<id> ...) so the Android back button and the browser back button both work. */
'use strict';

Object.assign(ICON, {
  maths: '<path d="M5 4h14v16H5z"/><path d="M8 8h3M9.5 6.5v3M13 8h3M8 14l3 3M11 14l-3 3M13 14.5h3M13 16.5h3"/>',
  science: '<path d="M9 3h6M10 3v6l-5 9a2 2 0 002 3h10a2 2 0 002-3l-5-9V3"/><path d="M7.5 15h9"/>',
  english: '<path d="M4 18L8 6l4 12M5.5 14h5"/><path d="M14 10h4a2 2 0 010 4h-4v-8h3.5a2 2 0 010 4"/>',
  sesotho: '<path d="M12 3L4 17q8 4 16 0z"/><path d="M7 12.5q5 2 10 0M5.6 15q6.4 2.6 12.8 0"/><path d="M12 3v-0"/><circle cx="12" cy="3" r="1.3"/>',
  social: '<circle cx="8" cy="8" r="3"/><circle cx="16.5" cy="9" r="2.5"/><path d="M2.5 20c0-3.5 2.5-6 5.5-6s5.5 2.5 5.5 6M13.5 20c0-2.5 1.2-5 3-5s4 2 4 5"/>',
  creative: '<path d="M14 4l6 6-9 9H5v-6z"/><path d="M12 6l6 6"/><circle cx="7.5" cy="16.5" r="1"/>'
});

/* ---------- small UI helpers ---------- */
function toast(msg, ms) { const t = $('#toast'); t.textContent = msg; t.classList.add('show'); clearTimeout(toast._t); toast._t = setTimeout(() => t.classList.remove('show'), ms || 2600); }
function flash(kind) { const f = $('#flash'); f.className = ''; void f.offsetWidth; f.className = kind; }
function beep(good) {
  if (Store.s.settings.hearing) return;
  try {
    const C = window.AudioContext || window.webkitAudioContext; if (!C) return;
    const ctx = beep.ctx || (beep.ctx = new C()); const o = ctx.createOscillator(), g = ctx.createGain();
    o.connect(g); g.connect(ctx.destination); o.type = 'sine';
    const t = ctx.currentTime; g.gain.setValueAtTime(.0001, t); g.gain.exponentialRampToValueAtTime(.18, t + .02); g.gain.exponentialRampToValueAtTime(.0001, t + (good ? .45 : .35));
    if (good) { o.frequency.setValueAtTime(660, t); o.frequency.setValueAtTime(880, t + .12); } else { o.frequency.setValueAtTime(260, t); o.frequency.setValueAtTime(200, t + .15); }
    o.start(t); o.stop(t + .5);
  } catch (e) {}
}
/* feedback that works for everyone: colour flash + sound + vibration + words */
function react(good) { flash(good ? 'good' : 'bad'); beep(good); Platform.vibrate(good ? 60 : [80, 80, 80]); }
function confetti() {
  if (Store.s.settings.reduceMotion) return;
  const c = h('div', { class: 'confetti', 'aria-hidden': 'true' });
  const cols = ['#f6b73c', '#00804a', '#1f4fb5', '#c2366b', '#fff'];
  for (let i = 0; i < 40; i++) c.appendChild(h('i', { style: { left: Math.random() * 100 + '%', background: pick(cols), animationDelay: Math.random() * .5 + 's' } }));
  document.body.appendChild(c); setTimeout(() => c.remove(), 2400);
}
function modal(build) {
  const m = $('#modal'); m.innerHTML = '';
  const sheet = h('div', { class: 'sheet' }); m.appendChild(sheet); m.hidden = false;
  const close = () => { m.hidden = true; m.innerHTML = ''; document.removeEventListener('keydown', esc); };
  const esc = e => { if (e.key === 'Escape') close(); };
  document.addEventListener('keydown', esc);
  m.onclick = e => { if (e.target === m) close(); };
  build(sheet, close);
  setTimeout(() => { const f = sheet.querySelector('h2, [autofocus], button, input'); f && f.focus(); }, 30);
  return close;
}
function confirmBox(msg, onYes) {
  modal((s, close) => add(s, [h('h2', { tabindex: '-1' }, msg), h('div', { class: 'row end' }, h('button', { class: 'btn', onclick: close }, T('no')), h('button', { class: 'btn warn', onclick: () => { close(); onYes(); } }, T('yes')))]));
}
const go = path => { location.hash = '#/' + path; };
const starStr = n => '★'.repeat(n) + '☆'.repeat(3 - n);
function speakBtn(getChunks, opts) {
  opts = opts || {};
  const b = h('button', { class: 'btn small ' + (opts.cls || ''), type: 'button', 'aria-label': T('readAloud') }, icon('speaker', null, 20), opts.label === false ? null : h('span', {}, T('readAloud')));
  b.onclick = () => {
    if (b.classList.contains('playing')) { Speech.stop(); return; }
    Speech.stop();
    $$('.playing').forEach(x => x.classList.remove('playing'));
    b.classList.add('playing');
    const prev = Speech.onState;
    Speech.onState = on => { if (!on) { b.classList.remove('playing'); Speech.onState = prev; } };
    Speech.speakChunks(getChunks(), {});
    Store.log('tts');
  };
  return b;
}
/* read every element marked data-read inside root */
function chunksOf(root) {
  return $$('[data-read]', root).filter(el => el.offsetParent !== null || el.closest('.class-slide')).map(el => {
    const lang = (el.getAttribute('lang') || (el.closest('[lang]') || {}).lang || 'en').slice(0, 2);
    return { text: el.dataset.read || el.textContent, lang: lang === 'st' ? 'st' : 'en', el };
  }).filter(c => c.text && c.text.trim());
}
function readMain() { Speech.speakChunks(chunksOf($('#main'))); }
/* text element in the interface language, marked for read-aloud */
function ut(tag, key, props) { return h(tag, Object.assign({ 'data-read': '', lang: I18N.ui() }, props || {}), T(key)); }
function lt(tag, o, props) { const lang = typeof o === 'string' ? I18N.ui() : (I18N.content() === 'en' ? 'en' : 'st'); return h(tag, Object.assign({ 'data-read': '', lang }, props || {}), typeof o === 'string' ? o : tx(o, lang)); }
const subjColor = id => `var(--c-${id})`;

/* ---------- content helpers ---------- */
const Content = {
  grade() { const l = Store.learner(); return Store.s.settings.viewGrade || (l && l.grade) || 5; },
  lessons(subject, grade) { return LESELI.lessonsOf(subject).concat(Store.s.custom.filter(c => c.subject === subject)).filter(l => !grade || l.grade === grade).map(Content.apply); },
  lesson(id) { const l = LESELI.lessons[id] || Store.s.custom.find(c => c.id === id); return l ? Content.apply(l) : null; },
  /* teacher corrections are layered on top of the built-in text */
  apply(l) {
    const o = Store.s.overrides[l.id]; if (!o) return l;
    const c = Object.assign({}, l, { sections: l.sections.map((s, i) => { const so = o.sections && o.sections[i]; if (!so) return s; return Object.assign({}, s, { h: Object.assign({}, s.h, so.h || {}), p: Object.assign({}, s.p, so.p || {}) }); }) });
    if (o.title) c.title = Object.assign({}, l.title, o.title);
    return c;
  },
  all() { return Object.values(LESELI.lessons).concat(Store.s.custom).map(Content.apply); }
};

/* ---------- shell ---------- */
const App = {
  route: '', params: [], started: Date.now(), lessonTimer: null,
  init() {
    Store.load(); Speech.init();
    this.applySettings();
    window.addEventListener('hashchange', () => this.render());
    window.LeseliBridge = window.LeseliBridge || {};
    window.LeseliBridge.back = () => { if ($('#modal').hidden === false) { $('#modal').hidden = true; return true; } if ($('.class-slide')) { $('.class-slide').remove(); document.body.classList.remove('hide-nav'); return true; } if (location.hash && !/^#\/(home|who|welcome)?$/.test(location.hash)) { history.back(); return true; } return false; };
    Store.touchDay();
    Store.log('session', { lang: Store.s.settings.lang, vision: Store.s.settings.vision, hearing: Store.s.settings.hearing, app: Platform.isApp });
    if (Store.s.settings.firstRun) location.hash = '#/welcome';
    else if (!location.hash || location.hash === '#/') location.hash = Store.s.current ? '#/home' : '#/who';
    this.render();
    if (!Platform.isApp && 'serviceWorker' in navigator && location.protocol.startsWith('http')) navigator.serviceWorker.register('sw.js').catch(() => {});
  },
  applySettings() {
    const s = Store.s.settings, b = document.body;
    b.classList.remove('size-0', 'size-1', 'size-2', 'size-3'); b.classList.add('size-' + (s.vision ? Math.max(2, s.size) : s.size));
    b.classList.toggle('contrast', !!s.contrast); b.classList.toggle('easy', !!s.easyRead);
    b.classList.toggle('motion-off', !!s.reduceMotion); b.classList.toggle('hearing', !!s.hearing); b.classList.toggle('vision', !!s.vision);
    document.documentElement.lang = I18N.ui();
  },
  render() {
    Speech.stop(); this.stopLessonTimer();
    if ($('.class-slide')) { $$('.class-slide').forEach(e => e.remove()); Platform.keepAwake(false); }
    if (!$('#modal').hidden) { $('#modal').hidden = true; $('#modal').innerHTML = ''; }
    const parts = (location.hash.replace(/^#\/?/, '') || 'home').split('/');
    this.route = parts[0]; this.params = parts.slice(1).map(decodeURIComponent);
    const main = $('#main'); main.innerHTML = ''; window.scrollTo(0, 0);
    document.body.classList.remove('hide-nav');
    const screen = Screens[this.route] || Screens.home;
    if (!['welcome', 'who'].includes(this.route) && !Store.s.current && !Store.s.guest && this.route !== 'teacher') { location.replace('#/who'); return; }
    const title = screen.call(Screens, main, ...this.params);
    this.topbar(title);
    this.nav();
    const h1 = main.querySelector('h1'); if (h1) { h1.setAttribute('tabindex', '-1'); setTimeout(() => h1.focus({ preventScroll: true }), 40); }
    if ((Store.s.settings.autoRead || Store.s.settings.vision) && !['thuso', 'quiz', 'practice'].includes(this.route)) setTimeout(readMain, 500);
  },
  topbar(title) {
    const tb = $('#topbar'); tb.innerHTML = '';
    const root = ['home', 'who', 'welcome'].includes(this.route);
    if (!root) tb.appendChild(h('button', { class: 'tb-btn', 'aria-label': T('back'), onclick: () => history.length > 1 ? history.back() : go('home') }, icon('back')));
    tb.appendChild(h('div', { class: 'title' }, root ? svgEl(LOGO) : null, h('span', {}, title || 'Leseli')));
    if (this.route === 'welcome') return;
    const read = h('button', { class: 'tb-btn', 'aria-label': T('readAloud'), 'aria-pressed': 'false' }, icon('speaker'));
    read.onclick = () => { if (Speech.speaking) Speech.stop(); else { readMain(); Store.log('tts', { page: this.route }); } };
    Speech.onState = on => read.setAttribute('aria-pressed', on ? 'true' : 'false');
    const lang = h('button', { class: 'tb-btn', 'aria-label': T('language') }, { st: 'ST', en: 'EN', both: 'ST+EN' }[Store.s.settings.lang]);
    lang.onclick = () => { const order = ['both', 'st', 'en']; const s = Store.s.settings; Store.set('lang', order[(order.indexOf(s.lang) + 1) % 3]); this.applySettings(); this.render(); toast(T('language') + ': ' + { st: 'Sesotho', en: 'English', both: 'Sesotho + English' }[Store.s.settings.lang]); };
    add(tb, [read, lang]);
  },
  nav() {
    const n = $('#bottomnav'); n.innerHTML = '';
    if (['welcome', 'who'].includes(this.route)) { document.body.classList.add('hide-nav'); return; }
    const items = [['home', 'home', 'home'], ['learn', 'book', 'learn'], ['thuso', 'chat', 'thuso'], ['library', 'library', 'library'], ['me', 'user', 'me']];
    const map = { subject: 'learn', lesson: 'learn', quiz: 'learn', practice: 'learn', tool: 'learn', dict: 'library', stories: 'library', story: 'library', book: 'library', games: 'library', game: 'library', settings: 'me', check: 'me', feedback: 'me', teacher: 'me', help: 'me' };
    const cur = map[this.route] || this.route;
    items.forEach(([r, ic, key]) => n.appendChild(h('a', { href: '#/' + r, 'aria-current': cur === r ? 'page' : null }, icon(ic), h('span', {}, T(key)))));
  },
  startLessonTimer(id) { this.lessonTimer = { id, t: Date.now() }; },
  stopLessonTimer() {
    const lt = this.lessonTimer; if (!lt) return; this.lessonTimer = null;
    const secs = Math.min(1800, Math.round((Date.now() - lt.t) / 1000)); if (secs < 3) return;
    const p = Store.lesson(lt.id); p.secs = (p.secs || 0) + secs; Store.log('time', { id: lt.id, secs });
  }
};

/* ---------- screens ---------- */
const AVATARS = ['🐄', '🐑', '🐐', '🐎', '🐕', '🐈', '🦅', '🐓', '🦁', '🐘', '🦒', '🐢', '🐇', '🦋', '🐝', '🌻', '⚽', '⭐', '🌙', '🏔️'];
const Screens = {
  /* first run: language, accessibility, privacy */
  welcome(main) {
    document.body.classList.add('hide-nav');
    const s = Store.s.settings; let step = 0;
    const wrap = h('div', { class: 'welcome' }); main.appendChild(wrap);
    const draw = () => {
      wrap.innerHTML = '';
      if (step === 0) {
        add(wrap, [h('div', { class: 'logo', html: LOGO }), h('h1', { style: { textAlign: 'center' } }, 'Leseli'),
          h('p', { class: 'muted', style: { textAlign: 'center' } }, 'Ho ithuta ho sa hloke inthanete · Learning without internet'),
          h('h2', {}, 'Khetha puo · Choose a language'),
          ...[['both', '🇱🇸 + 🇬🇧', 'Sesotho le Senyesemane', 'Sesotho and English together'], ['st', '🇱🇸', 'Sesotho feela', 'Sesotho only'], ['en', '🇬🇧', 'English only', 'Senyesemane feela']].map(([v, f, a, b]) =>
            h('button', { class: 'choice', 'aria-pressed': s.lang === v ? 'true' : 'false', onclick: () => { Store.set('lang', v); App.applySettings(); step = 1; draw(); } }, h('span', { class: 'big-emoji', style: { fontSize: '30px' } }, f), h('span', {}, a, h('small', {}, b))))]);
        Speech.say('Lumela! Khetha puo. Hello! Choose a language.', 'st');
      } else if (step === 1) {
        add(wrap, [h('h1', {}, T('helpUs')), h('p', { class: 'muted' }, T('helpUsSub')),
          h('button', { class: 'choice', 'aria-pressed': String(!!s.vision), onclick: e => { Store.set('vision', !s.vision); Store.set('autoRead', s.vision); e.currentTarget.setAttribute('aria-pressed', String(s.vision)); App.applySettings(); if (s.vision) Speech.say(tx({ en: 'Seeing support is on. I will read every page to you.', st: 'Thuso ea ho bona e butsoe. Ke tla u balla leqephe le leng le le leng.' }), I18N.ui()); } }, icon('eye'), h('span', {}, T('visionMode'), h('small', {}, T('visionDesc')))),
          h('button', { class: 'choice', 'aria-pressed': String(!!s.hearing), onclick: e => { Store.set('hearing', !s.hearing); e.currentTarget.setAttribute('aria-pressed', String(s.hearing)); App.applySettings(); flash('good'); Platform.vibrate(80); } }, icon('ear'), h('span', {}, T('hearingMode'), h('small', {}, T('hearingDesc')))),
          h('button', { class: 'choice', 'aria-pressed': String(s.size >= 2), onclick: e => { Store.set('size', s.size >= 2 ? 1 : 2); e.currentTarget.setAttribute('aria-pressed', String(s.size >= 2)); App.applySettings(); } }, icon('text'), h('span', {}, T('bigText'), h('small', {}, T('bigTextDesc')))),
          h('button', { class: 'btn primary block', onclick: () => { step = 2; draw(); } }, T('next'), icon('next'))]);
      } else {
        add(wrap, [h('div', { class: 'big-emoji', style: { textAlign: 'center' } }, '🔒'), h('h1', {}, T('privacyTitle')),
          h('div', { class: 'card' }, h('ul', {}, ...['privacy1', 'privacy2', 'privacy3', 'privacy4'].map(k => ut('li', k)))),
          h('button', { class: 'btn primary block', onclick: () => { Store.set('firstRun', false); Store.log('onboarded', { lang: s.lang, vision: s.vision, hearing: s.hearing }); go('who'); } }, T('iUnderstand'))]);
      }
      const h1 = wrap.querySelector('h1, h2'); h1 && h1.setAttribute('tabindex', '-1'); h1 && h1.focus();
    };
    draw();
    return 'Leseli';
  },

  /* choose learner on a shared phone */
  who(main) {
    add(main, [h('div', { style: { textAlign: 'center', marginTop: '10px' } }, h('div', { html: LOGO, style: { width: '72px', margin: '0 auto' } }), ut('h1', 'whoIsLearning'))]);
    const list = h('div', { class: 'grid' });
    Store.s.learners.forEach(l => list.appendChild(h('button', { class: 'tile', style: { alignItems: 'center', textAlign: 'center' }, onclick: () => { Store.s.current = l.id; Store.s.guest = false; Store.s.settings.viewGrade = null; Store.save(); Store.touchDay(); Store.log('login'); go('home'); } },
      h('span', { class: 'avatar big' }, l.avatar), h('b', {}, l.name), h('small', {}, T('grade') + ' ' + l.grade + ' · ★ ' + Store.prog(l.id).stars))));
    list.appendChild(h('button', { class: 'tile', style: { alignItems: 'center', justifyContent: 'center', borderStyle: 'dashed' }, onclick: () => addLearner() }, h('span', { class: 'avatar big' }, '+'), h('b', {}, T('addLearner'))));
    main.appendChild(list);
    add(main, [h('div', { class: 'hr' }), h('div', { class: 'row center' },
      h('button', { class: 'btn', onclick: () => { Store.s.current = null; Store.s.guest = true; Store.save(); go('home'); } }, icon('user'), T('guest')),
      h('button', { class: 'btn', onclick: () => go('teacher') }, icon('lock'), T('teacher'))),
      h('p', { class: 'muted small', style: { textAlign: 'center' } }, T('privacy'))]);
    return T('whoIsLearning');
  },

  home(main) {
    const l = Store.learner(), g = Content.grade(), p = Store.prog();
    const hr = new Date().getHours();
    add(main, [h('section', { class: 'hero' },
      h('div', { class: 'row' }, h('span', { class: 'avatar' }, l ? l.avatar : '🙂'), h('div', {}, h('h1', { 'data-read': '', lang: I18N.ui() }, (hr < 12 ? T('greetMorning') : hr < 17 ? T('greetDay') : T('greetEvening')) + (l ? ', ' + l.name : '') + '!'), h('div', { class: 'small', style: { opacity: .9 } }, T('offlineReady')))),
      h('div', { class: 'stats' }, h('span', {}, icon('star', null, 20), p.stars + ' ' + T('stars')), h('span', {}, '🔥 ' + Store.streak() + ' ' + T('streak'))))]);
    // grade switcher
    main.appendChild(h('div', { class: 'gradebar', role: 'group', 'aria-label': T('grade') }, [5, 6, 7].map(n => h('button', { 'aria-pressed': String(g === n), onclick: () => { Store.s.settings.viewGrade = n; Store.save(); App.render(); } }, T('grade') + ' ' + n))));
    // continue learning
    const last = [...Store.s.events].reverse().find(e => e.l === Store.lid() && e.e === 'open_lesson');
    const lastL = last && Content.lesson(last.d.id);
    if (lastL) main.appendChild(h('a', { class: 'lesson-item', href: '#/lesson/' + lastL.id }, h('span', { class: 'num', style: { background: subjColor(lastL.subject) } }, icon('play', null, 20)), h('span', { class: 'meta' }, h('small', {}, T('continueLearning')), lt('b', lastL.title)), icon('next')));
    // subjects
    main.appendChild(ut('h2', 'subjects'));
    main.appendChild(subjectGrid(g));
    // daily challenge: riddle / proverb / word
    const day = Math.floor(Date.now() / 864e5);
    const rid = LESELI.riddles && LESELI.riddles[day % LESELI.riddles.length];
    const prov = LESELI.proverbs && LESELI.proverbs[day % LESELI.proverbs.length];
    if (rid) {
      const ans = h('div', { hidden: true, class: 'tip' }, h('b', { 'data-read': '', lang: 'st' }, rid.a.st), h('div', { class: 'small muted', lang: 'en', 'data-read': '' }, rid.a.en));
      main.appendChild(h('section', { class: 'card daily' }, h('div', { class: 'big-ic' }, '🤔'), h('div', { style: { flex: 1 } }, ut('h3', 'riddleOfDay'),
        h('p', { 'data-read': '', lang: 'st' }, h('b', {}, 'Ka u lotha: '), rid.q.st), h('p', { class: 'small muted', lang: 'en', 'data-read': '' }, rid.q.en), ans,
        h('button', { class: 'btn small', onclick: e => { ans.hidden = false; e.currentTarget.remove(); Speech.say(rid.a.st, 'st'); } }, T('showAnswer')))));
    }
    if (prov) main.appendChild(h('section', { class: 'card daily' }, h('div', { class: 'big-ic' }, '💬'), h('div', { style: { flex: 1 } }, ut('h3', 'proverbOfDay'), h('p', { 'data-read': '', lang: 'st' }, h('b', {}, prov.st)), h('p', { class: 'small muted', lang: 'en', 'data-read': '' }, prov.en))));
    // quick links
    main.appendChild(h('div', { class: 'grid' },
      quick('practice', 'maths', 'practice', 'var(--c-maths)'), quick('thuso', 'chat', 'thuso', 'var(--green)'),
      quick('stories', 'book', 'stories', 'var(--c-sesotho)'), quick('games', 'game', 'games', 'var(--c-creative)')));
    // starting check reminder
    if (Store.s.current && !(Store.s.checks[Store.lid()] || {}).baseline) main.appendChild(h('a', { class: 'card', href: '#/check/baseline', style: { display: 'block', textDecoration: 'none', color: 'inherit', borderColor: 'var(--gold)' } }, ut('b', 'baseline'), ut('p', 'checkIntro', { class: 'small muted' })));
    return 'Leseli';
    function quick(route, ic, key, col) { return h('a', { class: 'tile', href: '#/' + route, style: { minHeight: '96px' } }, h('span', { class: 'tile-ic', style: { background: col } }, icon(ic)), h('b', {}, T(key))); }
  },

  learn(main) {
    const g = Content.grade();
    main.appendChild(ut('h1', 'subjects'));
    main.appendChild(h('div', { class: 'gradebar' }, [5, 6, 7].map(n => h('button', { 'aria-pressed': String(g === n), onclick: () => { Store.s.settings.viewGrade = n; Store.save(); App.render(); } }, T('grade') + ' ' + n))));
    main.appendChild(subjectGrid(g));
    main.appendChild(h('div', { class: 'card' }, ut('h2', 'searchAll'), searchBox()));
    return T('learn');
  },

  subject(main, id) {
    const sub = LESELI.subject(id); if (!sub) return go('learn');
    const g = Content.grade(); const list = Content.lessons(id, g);
    add(main, [h('div', { class: 'lesson-head', style: { background: subjColor(id) } }, h('span', { class: 'pill' }, T('grade') + ' ' + g), biText('h1', sub.title), h('div', { class: 'small', style: { opacity: .9 } }, tx(sub.area)))]);
    main.appendChild(h('div', { class: 'gradebar' }, [5, 6, 7].map(n => h('button', { 'aria-pressed': String(g === n), onclick: () => { Store.s.settings.viewGrade = n; Store.save(); App.render(); } }, T('grade') + ' ' + n))));
    if (!list.length) main.appendChild(h('p', { class: 'empty' }, T('noLessons')));
    list.forEach((l, i) => {
      const pr = Store.lesson(l.id); const done = pr.stars > 0;
      main.appendChild(h('a', { class: 'lesson-item', href: '#/lesson/' + l.id },
        h('span', { class: 'num' + (done ? ' done' : ''), style: { background: subjColor(id) } }, done ? icon('check', null, 20) : String(i + 1)),
        h('span', { class: 'meta' }, lt('b', l.title), h('small', {}, (l.outcome ? T('syllabus') + ' ' + l.outcome + ' · ' : '') + (l.custom ? '✎ ' + T('byTeacher') + ' · ' : '') + (l.hard ? '⚑ ' + T('hardShort') : (pr.read ? T('inProgress') : T('notStarted'))))),
        h('span', { class: 'stars', 'aria-label': pr.stars + ' ' + T('stars') }, starStr(pr.stars))));
    });
    if (LESELI.practiceFor && LESELI.practiceFor[id]) main.appendChild(h('a', { class: 'btn primary block', href: '#/practice' }, icon('maths'), T('practice')));
    main.appendChild(h('a', { class: 'btn block', href: `#/book/${id}/${g}`, style: { marginTop: '10px' } }, icon('book'), T('openTextbook')));
    return tx(sub.title);
  },

  lesson(main, id, tab) {
    const l = Content.lesson(id); if (!l) { go('learn'); return; }
    tab = tab || 'notes';
    const pr = Store.lesson(id); if (!pr.read) { pr.read = true; Store.save(); }
    Store.log('open_lesson', { id }); App.startLessonTimer(id);
    const sub = LESELI.subject(l.subject);
    add(main, [h('div', { class: 'lesson-head', style: { background: subjColor(l.subject) } },
      h('div', { class: 'row' }, h('span', { class: 'pill' }, tx(sub.title)), h('span', { class: 'pill' }, T('grade') + ' ' + l.grade), l.outcome ? h('span', { class: 'pill' }, T('syllabus') + ' ' + l.outcome) : null),
      biText('h1', l.title))]);
    if (l.hard) main.appendChild(h('div', { class: 'hard-flag' }, '⚑', ut('span', 'learnersSay')));
    const tabs = [['notes', 'book', 'notes'], ['words', 'text', 'keyWords'], ['quiz', 'star', 'quiz']];
    main.appendChild(h('div', { class: 'tabs', role: 'tablist' }, tabs.filter(t => t[0] !== 'words' || (l.words && l.words.length)).map(([k, ic, key]) => h('button', { role: 'tab', 'aria-selected': String(tab === k), onclick: () => location.replace(`#/lesson/${id}/${k}`) }, icon(ic, null, 18), T(key))),
      h('button', { role: 'tab', 'aria-selected': 'false', onclick: () => go('thuso/' + id) }, icon('chat', null, 18), T('thuso'))));
    const body = h('div'); main.appendChild(body);
    if (tab === 'notes') renderNotes(body, l);
    else if (tab === 'words') renderWords(body, l);
    else if (tab === 'quiz') renderQuiz(body, l.quiz || [], { id, title: l.title });
    return tx(l.title);
  },

  quiz(main, id) { const l = Content.lesson(id); renderQuiz(main, l.quiz, { id, title: l.title }); return T('quiz'); },

  me(main) {
    const l = Store.learner(), p = Store.prog();
    add(main, [h('div', { class: 'card row' }, h('span', { class: 'avatar big' }, l ? l.avatar : '🙂'), h('div', { style: { flex: 1 } }, h('h1', { style: { margin: 0 } }, l ? l.name : T('guest')), h('div', { class: 'muted' }, l ? T('grade') + ' ' + l.grade : ''), h('div', {}, '★ ' + p.stars + ' · 🔥 ' + Store.streak()))),
      h('button', { class: 'btn block', onclick: () => { Store.s.current = null; Store.s.guest = false; Store.save(); go('who'); } }, icon('refresh'), T('switchLearner'))]);
    // progress by subject
    const g = Content.grade();
    const card = h('section', { class: 'card' }, ut('h2', 'progress'));
    LESELI.subjects.forEach(s => {
      const ls = Content.lessons(s.id, g); const done = ls.filter(x => Store.lesson(x.id).stars > 0).length;
      card.appendChild(h('div', { style: { margin: '8px 0' } }, h('div', { class: 'row between small' }, h('span', {}, tx(s.title)), h('span', {}, done + '/' + ls.length)), h('div', { class: 'progress-line' }, h('i', { style: { width: (ls.length ? done / ls.length * 100 : 0) + '%', background: subjColor(s.id) } }))));
    });
    main.appendChild(card);
    // badges
    const bc = h('section', { class: 'card' }, ut('h2', 'badges'));
    const all = Badges.list();
    bc.appendChild(h('div', { class: 'grid' }, all.map(b => h('div', { class: 'tile', style: { minHeight: '90px', opacity: p.badges.includes(b.id) ? 1 : .4, alignItems: 'center', textAlign: 'center' }, 'aria-label': tx(b.name) + (p.badges.includes(b.id) ? '' : ' (' + T('locked') + ')') }, h('span', { class: 'big-emoji', style: { fontSize: '34px' } }, b.emo), h('small', {}, tx(b.name))))));
    main.appendChild(bc);
    // teacher answers to my questions
    const mine = Store.s.questions.filter(q => q.l === Store.lid());
    if (mine.length) {
      const qc = h('section', { class: 'card' }, ut('h2', 'myQuestions'));
      mine.slice(-8).reverse().forEach(q => qc.appendChild(h('div', { class: 'dict-row' }, h('div', { class: 'w' }, h('b', {}, q.text || '🎤 ' + T('voiceQuestion')), h('span', {}, q.reply ? '✔ ' + q.reply : (q.answered ? T('answered') : T('waiting')))), q.replyAudio ? h('button', { class: 'btn small', onclick: () => AudioDB.get(q.replyAudio).then(r => r && Player.play(r.blob)) }, icon('play', null, 18)) : null)));
      main.appendChild(qc);
    }
    const ck = Store.s.checks[Store.lid()] || {};
    main.appendChild(h('section', { class: 'card stack' },
      h('a', { class: 'btn block', href: '#/check/baseline' }, '📝 ', T('baseline'), ck.baseline ? ` (${ck.baseline.score}/${ck.baseline.max})` : ''),
      h('a', { class: 'btn block', href: '#/check/endline' }, '🏁 ', T('endline'), ck.endline ? ` (${ck.endline.score}/${ck.endline.max})` : ''),
      h('a', { class: 'btn block', href: '#/feedback' }, icon('heart'), T('feedback')),
      h('a', { class: 'btn block', href: '#/settings' }, icon('gear'), T('settings')),
      h('a', { class: 'btn block', href: '#/help' }, icon('help'), T('help')),
      h('a', { class: 'btn block', href: '#/teacher' }, icon('lock'), T('teacherArea')),
      Platform.isApp ? h('button', { class: 'btn block', onclick: () => Platform.shareApp() }, icon('share'), T('shareApp')) : null));
    return T('me');
  },

  settings(main) {
    const s = Store.s.settings;
    const sw = (key, ic, label, desc, after) => h('label', { class: 'switch' }, icon(ic), h('span', { style: { flex: 1 } }, h('b', {}, T(label)), desc ? h('div', { class: 'small muted' }, T(desc)) : null),
      h('input', { type: 'checkbox', checked: !!s[key], onchange: e => { Store.set(key, e.target.checked); after && after(e.target.checked); App.applySettings(); } }));
    add(main, [ut('h1', 'settings'),
      h('section', { class: 'card' }, ut('h2', 'language'), h('div', { class: 'seg', role: 'group' }, [['both', 'Sesotho + English'], ['st', 'Sesotho'], ['en', 'English']].map(([v, n]) => h('button', { 'aria-pressed': String(s.lang === v), onclick: () => { Store.set('lang', v); App.applySettings(); App.render(); } }, n)))),
      h('section', { class: 'card' }, ut('h2', 'access'),
        sw('vision', 'eye', 'visionMode', 'visionDesc', on => { if (on) Store.set('autoRead', true); }),
        sw('hearing', 'ear', 'hearingMode', 'hearingDesc'),
        sw('autoRead', 'speaker', 'autoRead'), sw('contrast', 'eye', 'contrast'), sw('easyRead', 'text', 'easyRead'), sw('reduceMotion', 'pause', 'reduceMotion'),
        h('label', { class: 'field' }, T('textSize')),
        h('div', { class: 'seg' }, [0, 1, 2, 3].map(n => h('button', { 'aria-pressed': String(s.size === n), 'aria-label': T('textSize') + ' ' + (n + 1), style: { fontSize: (14 + n * 3) + 'px' }, onclick: () => { Store.set('size', n); App.applySettings(); App.render(); } }, 'A')))),
      voiceCard(),
      h('section', { class: 'card' }, ut('h2', 'aboutData'), ut('p', 'privacy', { class: 'small' }),
        h('button', { class: 'btn warn', onclick: () => confirmBox(T('resetSure'), () => { Store.removeLearner(Store.lid()); go('who'); }) }, icon('trash'), T('deleteMe'))),
      h('p', { class: 'muted small' }, 'Leseli ' + LESELI.version + ' · ' + Platform.version() + ' · ' + T('openSource'))]);
    return T('settings');
    function voiceCard() {
      const c = h('section', { class: 'card' }, ut('h2', 'voice'));
      c.appendChild(h('label', { class: 'field' }, T('speechRate')));
      c.appendChild(h('input', { type: 'range', min: '0.5', max: '1.4', step: '0.1', value: s.rate, 'aria-label': T('speechRate'), onchange: e => Store.set('rate', +e.target.value) }));
      const info = Speech.stVoiceInfo();
      c.appendChild(h('p', { class: 'small tip' }, info && /^st/i.test(info) ? T('stVoiceFound') : T('noStVoice') + (info ? ' (' + info + ')' : '')));
      if (!Platform.isApp && Speech.voices.length) {
        ['en', 'st'].forEach(lg => {
          c.appendChild(h('label', { class: 'field' }, T('voiceFor') + ' ' + (lg === 'en' ? 'English' : 'Sesotho')));
          const sel = h('select', { onchange: e => Store.set(lg === 'en' ? 'voiceEn' : 'voiceSt', e.target.value) }, h('option', { value: '' }, T('automatic')), Speech.voices.map(v => h('option', { value: v.name, selected: s[lg === 'en' ? 'voiceEn' : 'voiceSt'] === v.name }, v.name + ' (' + v.lang + ')')));
          c.appendChild(sel);
        });
      }
      c.appendChild(h('div', { class: 'row', style: { marginTop: '10px' } }, h('button', { class: 'btn small', onclick: () => Speech.say('Lumela! Ke Leseli. Ke tla u thusa ho ithuta.', 'st') }, icon('play', null, 18), 'Sesotho'), h('button', { class: 'btn small', onclick: () => Speech.say('Hello! I am Leseli. I will help you learn.', 'en') }, icon('play', null, 18), 'English')));
      return c;
    }
  },

  help(main) {
    add(main, [ut('h1', 'help')]);
    (LESELI.help || []).forEach(sec => { const c = h('section', { class: 'card' }, h('div', { class: 'big-emoji', style: { fontSize: '34px' } }, sec.emo), biText('h2', sec.h), biText('div', sec.p, '', true)); main.appendChild(c); });
    return T('help');
  },

  feedback(main) {
    let rating = null, easy = null, audio = null;
    add(main, [ut('h1', 'feedback'), ut('p', 'feedbackWhy', { class: 'muted' })]);
    const faces = h('div', { class: 'row center', role: 'group', 'aria-label': T('howWasIt') }, [['😞', 1, 'sad'], ['😐', 2, 'okay'], ['😀', 3, 'happy']].map(([f, v, k]) => h('button', { class: 'choice', style: { width: 'auto', fontSize: '44px', flexDirection: 'column', minWidth: '90px' }, 'aria-pressed': 'false', 'aria-label': T(k), onclick: e => { rating = v; $$('button', faces).forEach(b => b.setAttribute('aria-pressed', 'false')); e.currentTarget.setAttribute('aria-pressed', 'true'); } }, f, h('small', { style: { fontSize: '13px' } }, T(k)))));
    const easyRow = h('div', { class: 'seg' }, [['yes', 3], ['aBit', 2], ['no', 1]].map(([k, v]) => h('button', { 'aria-pressed': 'false', onclick: e => { easy = v; $$('button', easyRow).forEach(b => b.setAttribute('aria-pressed', 'false')); e.currentTarget.setAttribute('aria-pressed', 'true'); } }, T(k))));
    const note = h('textarea', { placeholder: T('whatToChange'), 'aria-label': T('whatToChange') });
    add(main, [h('section', { class: 'card' }, ut('h2', 'howWasIt'), faces), h('section', { class: 'card' }, ut('h2', 'wasEasy'), easyRow),
      h('section', { class: 'card' }, ut('h2', 'whatToChange'), note, h('div', { style: { marginTop: '8px' } }, recordButton('orRecord', r => { audio = r; toast(T('saved')); }))),
      h('button', { class: 'btn primary block', onclick: async () => {
        if (!rating && !easy && !note.value && !audio) { toast(T('pickOne')); return; }
        let aid = null; if (audio) { const rec = await AudioDB.put({ kind: 'feedback', blob: audio.blob, secs: audio.secs, l: Store.lid() }); aid = rec.id; }
        const l = Store.learner();
        Store.s.feedback.push({ t: Date.now(), l: Store.lid(), rating, easy, note: note.value.trim(), audio: aid, gender: l && l.gender, vision: Store.s.settings.vision, hearing: Store.s.settings.hearing, grade: l && l.grade });
        Store.log('feedback', { rating, easy }); Store.save(); toast(T('thanks')); react(true); go('me');
      } }, T('send'))]);
    return T('feedback');
  },

  check(main, kind) { Checks.run(main, kind); return T(kind); }
};

function subjectGrid(g) {
  return h('div', { class: 'grid' }, LESELI.subjects.map(s => {
    const ls = Content.lessons(s.id, g); const done = ls.filter(x => Store.lesson(x.id).stars > 0).length;
    return h('a', { class: 'tile', href: '#/subject/' + s.id, 'aria-label': tx(s.title) + ', ' + done + '/' + ls.length },
      h('span', { class: 'tile-ic', style: { background: subjColor(s.id) } }, icon(s.icon || s.id, null, 28)),
      h('b', {}, tx(s.title)), h('small', {}, ls.length + ' ' + T('lessons').toLowerCase()),
      h('span', { class: 'bar' }, h('i', { style: { width: (ls.length ? done / ls.length * 100 : 0) + '%' } })));
  }));
}

function searchBox() {
  const out = h('div', { 'aria-live': 'polite' });
  const inp = h('input', { type: 'search', placeholder: T('searchHint'), 'aria-label': T('search'), oninput: () => {
    out.innerHTML = ''; const q = inp.value.trim(); if (q.length < 2) return;
    const hits = Tutor.search(q, 8);
    if (!hits.length) out.appendChild(h('p', { class: 'muted' }, T('noResults')));
    hits.forEach(hh => out.appendChild(h('a', { class: 'lesson-item', href: '#/lesson/' + hh.lesson.id }, h('span', { class: 'num', style: { background: subjColor(hh.lesson.subject) } }, String(hh.lesson.grade)), h('span', { class: 'meta' }, h('b', {}, tx(hh.lesson.title)), h('small', {}, tx(LESELI.subject(hh.lesson.subject).title))))));
  } });
  return h('div', {}, inp, out);
}

/* ---------- lesson notes ---------- */
function renderNotes(body, l) {
  l.sections.forEach((s, i) => {
    const c = h('section', { class: 'card section' });
    if (s.h) c.appendChild(biText('h2', s.h));
    if (s.p) c.appendChild(biText('div', s.p, '', true));
    if (s.ex) c.appendChild(h('div', { class: 'example' }, h('div', { class: 'lbl' }, T('example')), biText('div', s.ex, '', true)));
    if (s.calc) { const r = MS.solve(s.calc); if (r) c.appendChild(workedBox(r, s.calc)); }
    if (s.fig) c.appendChild(h('figure', { class: 'fig', html: s.fig }));
    if (s.tip) c.appendChild(h('div', { class: 'tip' }, '💡 ', biText('span', s.tip)));
    if (s.tool && Tools[s.tool]) { try { c.appendChild(Tools[s.tool](s.toolOpts || {})); } catch (e) { console.warn(e); } }
    const tools = h('div', { class: 'sec-tools' }, speakBtn(() => chunksOf(c)));
    // teacher narration recorded on this phone
    const lang = I18N.content() === 'en' ? 'en' : 'st';
    AudioDB.narration(`${l.id}:${i}:${lang}`).then(r => { if (r) tools.insertBefore(h('button', { class: 'btn small gold', onclick: () => Player.play(r.blob) }, icon('play', null, 18), T('teacherVoice')), tools.firstChild); });
    tools.appendChild(h('button', { class: 'btn small ghost', onclick: () => go('thuso/' + l.id + '/' + i) }, icon('chat', null, 18), T('askAbout')));
    c.appendChild(tools);
    body.appendChild(c);
  });
  if (l.practice) body.appendChild(h('a', { class: 'btn block', href: '#/practice/' + l.practice, style: { marginBottom: '10px' } }, icon('maths'), T('practiceThis')));
  body.appendChild(h('button', { class: 'btn primary block', onclick: () => location.replace(`#/lesson/${l.id}/quiz`) }, icon('star'), T('takeQuiz')));
  body.appendChild(h('button', { class: 'btn ghost block small', style: { marginTop: '10px' }, onclick: () => reportMistake(l) }, icon('flag', null, 18), T('reportMistake')));
}
function workedBox(r, label) {
  const lang = I18N.content();
  const box = h('div', { class: 'example' }, h('div', { class: 'lbl' }, T('workedExample') + (label ? ': ' + label.replace(/\*/g, '×') : '')));
  if (r.layout) box.appendChild(h('pre', { class: 'calc', 'aria-hidden': 'true' }, r.layout));
  const ol = h('ol', { class: 'steps step-list' });
  r.steps.forEach(st => ol.appendChild(h('li', {}, lang === 'en' ? h('span', { lang: 'en', 'data-read': '' }, st.en) : h('span', {}, h('span', { lang: 'st', 'data-read': '' }, st.st), lang === 'both' ? h('div', { class: 'small muted', lang: 'en', 'data-read': '' }, st.en) : null))));
  box.appendChild(ol);
  return box;
}
function renderWords(body, l) {
  const grid = h('div', { class: 'words' });
  (l.words || []).forEach(([en, st]) => grid.appendChild(h('button', { class: 'word', onclick: () => Speech.speakChunks([{ text: st, lang: 'st' }, { text: en, lang: 'en' }]) }, h('b', { lang: 'st' }, st), h('span', { lang: 'en' }, en), icon('speaker', null, 16))));
  body.appendChild(h('section', { class: 'card' }, ut('p', 'tapWord', { class: 'muted small' }), grid));
}
function reportMistake(l) {
  modal((s, close) => {
    const t = h('textarea', { placeholder: T('whatIsWrong') });
    add(s, [ut('h2', 'reportMistake'), ut('p', 'reportWhy', { class: 'small muted' }), t, h('div', { class: 'row end', style: { marginTop: '10px' } }, h('button', { class: 'btn', onclick: close }, T('cancel')), h('button', { class: 'btn primary', onclick: () => { if (!t.value.trim()) return; Store.s.reports.push({ t: Date.now(), lesson: l.id, text: t.value.trim(), l: Store.lid() }); Store.save(); close(); toast(T('thanks')); } }, T('send')))]);
  });
}

/* ---------- quiz ---------- */
function renderQuiz(body, questions, meta) {
  if (!questions || !questions.length) { body.appendChild(h('p', { class: 'empty' }, T('noQuiz'))); return; }
  const qs = meta.noShuffle ? questions : shuffle(questions).slice(0, meta.max || 8);
  let i = 0, score = 0; const answers = [];
  const wrap = h('div'); body.appendChild(wrap);
  const lang = I18N.content();
  const draw = () => {
    wrap.innerHTML = '';
    if (i >= qs.length) return finish();
    const q = qs[i];
    wrap.appendChild(h('div', { class: 'q-progress', role: 'progressbar', 'aria-valuenow': i, 'aria-valuemax': qs.length }, h('i', { style: { width: (i / qs.length * 100) + '%' } })));
    wrap.appendChild(h('div', { class: 'small muted' }, `${T('question')} ${i + 1} / ${qs.length}`));
    const card = h('section', { class: 'card' }, biText('div', q.q, 'q-text', true));
    wrap.appendChild(card);
    const fb = h('div', { 'aria-live': 'assertive' });
    const after = (ok, correctText) => {
      if (ok) score++; answers.push(ok ? 1 : 0); react(ok);
      fb.innerHTML = '';
      fb.appendChild(h('div', { class: 'feedback ' + (ok ? 'good' : 'bad') }, icon(ok ? 'check' : 'x'), h('div', {}, ut('div', ok ? 'correct' : 'wrong'), !ok ? h('div', { 'data-read': '', lang: I18N.ui() }, T('answerIs') + ': ' + correctText) : null, q.x ? biText('div', q.x, 'small') : null)));
      fb.appendChild(h('button', { class: 'btn primary block', onclick: () => { i++; draw(); } }, i + 1 < qs.length ? T('next') : T('seeScore'), icon('next')));
      if (Store.s.settings.autoRead || Store.s.settings.vision) Speech.speakChunks(chunksOf(fb)); else Speech.say((ok ? T('correct') : T('wrong')), I18N.ui());
      setTimeout(() => fb.querySelector('.btn').focus(), 50);
    };
    if (q.o) {
      const opts = h('div', { class: 'options', role: 'group' });
      const order = q.keepOrder || q.o.length === 2 ? q.o.map((_, k) => k) : shuffle(q.o.map((_, k) => k));
      order.forEach((k, j) => {
        const [a, b] = tx2(q.o[k]);
        const btn = h('button', { class: 'opt', 'data-read': '', lang: lang === 'en' ? 'en' : 'st' }, h('span', { class: 'letter', 'aria-hidden': 'true' }, 'ABCDEF'[j]), h('span', {}, a, b ? h('div', { class: 'small muted', lang: 'en' }, b) : null));
        btn.onclick = () => {
          $$('.opt', opts).forEach(x => x.disabled = true);
          const ok = k === q.a; btn.classList.add(ok ? 'right' : 'wrong');
          opts.children[order.indexOf(q.a)].classList.add('right');
          after(ok, tx(q.o[q.a], lang === 'en' ? 'en' : 'st'));
        };
        opts.appendChild(btn);
      });
      card.appendChild(opts);
    } else if (q.n !== undefined) {
      card.appendChild(numberPad(val => after(String(val).trim().replace(/\s+/g, ' ') === String(q.n) || (!isNaN(+q.n) && +val === +q.n), String(q.n)), { allowFrac: /\//.test(String(q.n)), allowDot: /\./.test(String(q.n)), allowNeg: String(q.n).startsWith('-') }));
    }
    card.appendChild(h('div', { class: 'sec-tools' }, speakBtn(() => chunksOf(card))));
    wrap.appendChild(fb);
    if (Store.s.settings.autoRead || Store.s.settings.vision) setTimeout(() => Speech.speakChunks(chunksOf(card)), 300);
  };
  const finish = () => {
    const max = qs.length, pct = score / max, stars = pct >= .9 ? 3 : pct >= .7 ? 2 : pct >= .5 ? 1 : 0;
    if (meta.onDone) return meta.onDone(score, max, answers, wrap);
    const pr = Store.lesson(meta.id); pr.attempts++; const before = pr.stars;
    if (score > pr.best) pr.best = score; pr.max = max; if (stars > pr.stars) { Store.addStars(stars - pr.stars); pr.stars = stars; }
    Store.log('quiz_done', { id: meta.id, score, max }); Store.save();
    const newB = Badges.check();
    if (stars >= 2) confetti();
    wrap.appendChild(h('section', { class: 'card result-big' }, ut('h2', 'yourScore'), h('div', { class: 'score' }, `${score}/${max}`), h('div', { class: 'stars', 'aria-label': stars + ' ' + T('stars') }, starStr(stars)),
      ut('p', stars === 3 ? 'excellent' : stars >= 1 ? 'goodWork' : 'keepTrying'),
      newB.map(b => h('p', { class: 'pill' }, b.emo + ' ' + T('newBadge') + ': ' + tx(b.name)))));
    add(wrap, [h('div', { class: 'stack' },
      h('button', { class: 'btn block', onclick: () => { i = 0; score = 0; answers.length = 0; draw(); } }, icon('refresh'), T('tryAgain')),
      h('button', { class: 'btn block', onclick: () => location.replace(`#/lesson/${meta.id}/notes`) }, icon('book'), T('notes')),
      nextLessonBtn(meta.id))]);
    Speech.say(T('yourScore') + ' ' + score + ' / ' + max + '. ' + T(stars === 3 ? 'excellent' : stars >= 1 ? 'goodWork' : 'keepTrying'), I18N.ui());
    if (before === 0 && stars > 0 && Store.s.current && Math.random() < .35) setTimeout(() => quickFeedback(meta.id), 1500);
  };
  draw();
}
function nextLessonBtn(id) {
  const l = Content.lesson(id); if (!l) return null;
  const list = Content.lessons(l.subject, l.grade); const k = list.findIndex(x => x.id === id);
  const n = list[k + 1]; if (!n) return h('a', { class: 'btn primary block', href: '#/subject/' + l.subject }, T('backToSubject'));
  return h('a', { class: 'btn primary block', href: '#/lesson/' + n.id }, T('nextLesson'), ': ', tx(n.title), icon('next'));
}
function quickFeedback(id) {
  modal((s, close) => add(s, [ut('h2', 'howWasIt'), h('div', { class: 'row center' }, [['😞', 1], ['😐', 2], ['😀', 3]].map(([f, v]) => h('button', { class: 'choice', style: { width: 'auto', fontSize: '44px' }, 'aria-label': T(['', 'sad', 'okay', 'happy'][v]), onclick: () => { const l = Store.learner(); Store.s.feedback.push({ t: Date.now(), l: Store.lid(), rating: v, lesson: id, gender: l && l.gender, grade: l && l.grade, quick: true }); Store.log('feedback', { rating: v, quick: true }); Store.save(); close(); toast(T('thanks')); } }, f))), h('button', { class: 'btn ghost block', onclick: close }, T('notNow'))]));
}

/* number pad with optional fraction "/" and space for mixed numbers */
function numberPad(onOk, opts) {
  opts = opts || {}; let val = '';
  const box = h('div', { class: 'answer-box', role: 'textbox', 'aria-live': 'polite', 'aria-label': T('yourAnswer') }, '?');
  const set = v => { val = v; box.textContent = val || '?'; };
  const keys = ['7', '8', '9', 'del', '4', '5', '6', 'ok', '1', '2', '3', '0', opts.allowFrac ? '/' : opts.allowDot ? '.' : opts.allowNeg ? '-' : '00', opts.allowFrac ? '␣' : null].filter(Boolean);
  const pad = h('div', { class: 'pad' });
  keys.forEach(k => pad.appendChild(h('button', { type: 'button', class: k === 'ok' ? 'ok' : k === 'del' ? 'del' : '', 'aria-label': k === 'del' ? T('delete') : k === 'ok' ? T('check') : k === '␣' ? T('space') : k, onclick: () => {
    if (k === 'del') set(val.slice(0, -1)); else if (k === 'ok') { if (val) { $$('button', pad).forEach(b => b.disabled = true); onOk(val.trim()); } }
    else if (val.length < 12) set(val + (k === '␣' ? ' ' : k));
    Platform.vibrate(10);
  } }, k === 'del' ? '⌫' : k === 'ok' ? '✓' : k)));
  // physical keyboard support
  const kb = e => { if (!document.body.contains(pad)) { document.removeEventListener('keydown', kb); return; } if (/^[0-9/.\- ]$/.test(e.key)) set(val + e.key); else if (e.key === 'Backspace') set(val.slice(0, -1)); else if (e.key === 'Enter' && val) pad.querySelector('.ok').click(); };
  document.addEventListener('keydown', kb);
  return h('div', {}, box, pad);
}

/* ---------- badges ---------- */
const Badges = {
  list() {
    return [
      { id: 'first', emo: '🌱', name: L('First lesson', 'Thuto ea pele'), test: p => Object.values(p.lessons).some(x => x.stars > 0) },
      { id: 'five', emo: '📚', name: L('5 lessons', 'Lithuto tse 5'), test: p => Object.values(p.lessons).filter(x => x.stars > 0).length >= 5 },
      { id: 'twenty', emo: '🏔️', name: L('20 lessons', 'Lithuto tse 20'), test: p => Object.values(p.lessons).filter(x => x.stars > 0).length >= 20 },
      { id: 'perfect', emo: '🌟', name: L('3 stars', 'Linaleli tse 3'), test: p => Object.values(p.lessons).some(x => x.stars === 3) },
      { id: 'maths', emo: '🧮', name: L('Maths star (50 right)', 'Naleli ea lipalo'), test: p => (p.practice.right || 0) >= 50 },
      { id: 'reader', emo: '📖', name: L('Reader (3 stories)', 'Sebali (lipale tse 3)'), test: p => Object.keys(p.stories || {}).length >= 3 },
      { id: 'streak3', emo: '🔥', name: L('3 days in a row', 'Matsatsi a 3'), test: () => Store.streak() >= 3 },
      { id: 'curious', emo: '❓', name: L('Curious (10 questions)', 'Ea botsang (lipotso tse 10)'), test: () => Store.s.events.filter(e => e.e === 'thuso' && e.l === Store.lid()).length >= 10 },
      { id: 'player', emo: '🎲', name: L('Game player', 'Sebapali'), test: () => Store.s.events.some(e => e.e === 'game' && e.l === Store.lid()) }
    ];
  },
  check() { const p = Store.prog(); const got = []; this.list().forEach(b => { if (!p.badges.includes(b.id) && b.test(p)) { Store.badge(b.id); got.push(b); } }); return got; }
};

/* ---------- add learner ---------- */
function addLearner() {
  modal((s, close) => {
    let av = pick(AVATARS), grade = 5, gender = null;
    const name = h('input', { type: 'text', maxlength: 16, autocomplete: 'off', 'aria-label': T('nickname') });
    const avs = h('div', { class: 'avatars', role: 'group', 'aria-label': T('pickAvatar') }, AVATARS.map(a => h('button', { 'aria-pressed': String(a === av), onclick: e => { av = a; $$('button', avs).forEach(b => b.setAttribute('aria-pressed', 'false')); e.currentTarget.setAttribute('aria-pressed', 'true'); } }, a)));
    const gr = h('div', { class: 'gradebar' }, [5, 6, 7].map(n => h('button', { 'aria-pressed': String(n === grade), onclick: e => { grade = n; $$('button', gr).forEach(b => b.setAttribute('aria-pressed', 'false')); e.currentTarget.setAttribute('aria-pressed', 'true'); } }, String(n))));
    const gd = h('div', { class: 'seg' }, [['girl', 'f'], ['boy', 'm'], ['noSay', 'x']].map(([k, v]) => h('button', { 'aria-pressed': 'false', onclick: e => { gender = v; $$('button', gd).forEach(b => b.setAttribute('aria-pressed', 'false')); e.currentTarget.setAttribute('aria-pressed', 'true'); } }, T(k))));
    const consent = h('input', { type: 'checkbox' });
    add(s, [ut('h2', 'addLearner'), h('label', { class: 'field' }, T('nickname')), name, h('label', { class: 'field' }, T('pickAvatar')), avs, h('label', { class: 'field' }, T('grade')), gr,
      h('label', { class: 'field' }, T('iAm')), gd,
      h('label', { class: 'switch' }, h('span', { class: 'small' }, T('consentLine')), consent),
      h('div', { class: 'row end', style: { marginTop: '12px' } }, h('button', { class: 'btn', onclick: close }, T('cancel')), h('button', { class: 'btn primary', onclick: () => {
        const n = name.value.trim(); if (!n) { name.focus(); toast(T('nickname')); return; }
        if (!consent.checked) { toast(T('consentNeeded')); return; }
        Store.addLearner({ name: n.slice(0, 16), avatar: av, grade, gender, consent: Date.now() }); Store.s.guest = false; Store.s.settings.viewGrade = null; Store.save();
        Store.log('learner_added', { grade, gender }); close(); go('home');
      } }, T('save')))]);
  });
}

document.addEventListener('DOMContentLoaded', () => App.init());
