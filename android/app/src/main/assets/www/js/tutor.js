/* Thuso – Leseli's offline helper ("thuso" = help).
   Honest design: this is NOT a cloud chatbot. A phone with no data cannot run one, and learners'
   questions must not leave the phone. Thuso combines small, reliable offline skills:
     1. a step-by-step maths solver (MS.solve) for + − × ÷, fractions, rounding, angles, units, %...
     2. a bilingual word book (English ↔ Sesotho)
     3. a search engine over every lesson in Leseli (both languages) that answers with the best paragraph
     4. "quiz me" from the lesson you are in
     5. if it still cannot help: save the question (typed or voice) for the teacher.
   Every answer can be read aloud. */
'use strict';

const Tutor = {
  index: null,
  stop: new Set('the a an is are was of to in on and or what how why who which do does did can i you me my it this that for with be ke ka ho le la ea oa ba li se sa na eng joang hobaneng mang kae neng hore e a o u re ha me tse tsa please tell explain about thuso nthuse hlalosa bolela'.split(' ')),
  tok(s) { return String(s).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9šé' ]+/g, ' ').split(/\s+/).filter(w => w.length > 1 && !this.stop.has(w)).map(w => w.replace(/(ing|ed|es|s)$/, '')); },
  build() {
    const docs = [];
    Content.all().forEach(l => {
      docs.push({ l, i: -1, text: tx(l.title, 'en') + ' ' + tx(l.title, 'st') + ' ' + (l.words || []).flat().join(' '), boost: 2.2 });
      (l.sections || []).forEach((s, i) => docs.push({ l, i, text: [s.h && s.h.en, s.h && s.h.st, s.p && s.p.en, s.p && s.p.st, s.ex && s.ex.en, s.ex && s.ex.st].join(' '), boost: 1 }));
    });
    const df = {}; docs.forEach(d => { d.tf = {}; this.tok(d.text).forEach(w => d.tf[w] = (d.tf[w] || 0) + 1); Object.keys(d.tf).forEach(w => df[w] = (df[w] || 0) + 1); d.len = Object.values(d.tf).reduce((a, b) => a + b, 0); });
    this.index = { docs, df, N: docs.length };
  },
  rank(q, opts) {
    if (!this.index) this.build();
    opts = opts || {};
    const { docs, df, N } = this.index; const words = this.tok(q); if (!words.length) return [];
    return docs.map(d => {
      let s = 0;
      words.forEach(w => { let tf = d.tf[w] || 0; if (!tf && w.length > 4) { for (const k in d.tf) if (k.startsWith(w.slice(0, 5))) { tf += d.tf[k] * .6; } } if (tf) s += (tf / (tf + 1.2 * (.25 + .75 * d.len / 60))) * Math.log(1 + N / (df[w] || 1)); });
      s *= d.boost; if (opts.subject && d.l.subject === opts.subject) s *= 1.5; if (opts.lesson && d.l.id === opts.lesson) s *= 2; if (opts.grade && d.l.grade === opts.grade) s *= 1.2;
      return { d, s };
    }).filter(x => x.s > .4).sort((a, b) => b.s - a.s);
  },
  search(q, n) { const seen = new Set(), out = []; for (const r of this.rank(q)) { if (seen.has(r.d.l.id)) continue; seen.add(r.d.l.id); out.push({ lesson: r.d.l, score: r.s }); if (out.length >= (n || 5)) break; } return out; },
  isSesotho(q) { const st = (q.toLowerCase().match(/\b(ke|eng|joang|hobaneng|na|ka|ho|ea|oa|li|tsa|mang|kae|nthuse|hlalosa|lumela|kea|ha|ke eng|bolela)\b/g) || []).length; const en = (q.toLowerCase().match(/\b(what|how|why|is|the|a|of|who|where|when|explain|help|can|does)\b/g) || []).length; return st > en; },
  dict(word) {
    const w = word.toLowerCase().trim().replace(/[?.!'"]/g, '');
    const all = LESELI.words || [];
    return all.find(e => e.en.toLowerCase() === w || e.st.toLowerCase() === w) || all.find(e => e.en.toLowerCase().split(/[,/;] ?/).includes(w) || e.st.toLowerCase().split(/[,/;] ?/).includes(w)) || all.find(e => e.en.toLowerCase().startsWith(w) || e.st.toLowerCase().startsWith(w));
  },
  /* answer one message. ctx = {lesson, subject, grade, section}. returns {kind, en, st, steps?, layout?, links?, quiz?} */
  answer(text, ctx) {
    const q = text.trim(); const lq = q.toLowerCase(); ctx = ctx || {};
    const P = (en, st, extra) => Object.assign({ en, st }, extra || {});
    if (!q) return null;
    if (/^(hi|hello|hey|lumela|lumelang|helo|dumela)\b/.test(lq)) return P('Hello! I am Thuso. Ask me about any lesson, a maths sum like "345 x 23" or "625 ÷ 5", or a word to translate.', 'Lumela! Ke nna Thuso. Mpotse ka thuto efe kapa efe, palo e kang "345 x 23" kapa "625 ÷ 5", kapa lentsoe leo u batlang ho le fetolela.', { kind: 'hello' });
    if (/^(thanks|thank you|kea leboha|ke a leboha|rea leboha)/.test(lq)) return P('You are welcome! Keep learning.', 'Ha ho na taba! Tsoela pele ho ithuta.', { kind: 'thanks' });
    if (/^(help|thuso|nthuse|what can you do|o ka etsa eng)\??$/.test(lq)) return P('I can: 1) solve maths step by step (try "4 587 + 9 765", "1/2 + 1/3", "round 45 678", "triangle 50 60", "250 cm to m"); 2) translate words ("water in Sesotho", "pula ke eng ka Senyesemane"); 3) explain lesson topics ("what is oxygen?"); 4) quiz you ("quiz me"). If I cannot help, I will keep your question for your teacher.',
      'Nka: 1) rarolla lipalo mohato ka mohato (leka "4 587 + 9 765", "1/2 + 1/3", "round 45 678", "triangle 50 60"); 2) fetolela mantsoe ("water ka Sesotho", "pula ke eng ka Senyesemane"); 3) hlalosa lithuto ("oksijene ke eng?"); 4) u botsa lipotso ("mpotse"). Haeba ke sitoa, ke tla bolokela mosuoe potso ea hau.', { kind: 'help' });
    // quiz me
    if (/quiz me|test me|ask me|mpotse|nkhahlobe|potso/.test(lq) && !/\d/.test(lq)) {
      const pool = ctx.lesson ? (Content.lesson(ctx.lesson) || {}).quiz : Content.all().filter(l => !ctx.subject || l.subject === ctx.subject).filter(l => l.grade === (ctx.grade || Content.grade())).flatMap(l => l.quiz || []);
      const item = pool && pool.length ? pick(pool) : null;
      if (item) return P('Here is a question for you:', 'Potso ena ke ea hau:', { kind: 'quiz', quiz: item });
    }
    // translation
    let m = lq.match(/^(?:what is |what's )?(.+?) in (sesotho|english|senyesemane)\??$/) || lq.match(/^(?:translate|fetolela)\s+(.+?)$/) || lq.match(/^(.+?) ke eng ka (senyesemane|sesotho)\??$/) || lq.match(/^(?:sesotho|english) (?:for|ea|of) (.+?)\??$/) || lq.match(/^(?:ho thoe'?ng|re re'?ng) (.+?) ka (sesotho|senyesemane)\??$/);
    if (m) {
      const e = this.dict(m[1]);
      if (e) return P(`"${e.en}" in Sesotho is "${e.st}".`, `"${e.en}" ka Sesotho ke "${e.st}".`, { kind: 'word', word: e });
      return P(`I do not have "${m[1]}" in my word book yet. Ask your teacher, and they can add it.`, `Ha ke so be le "${m[1]}" bukeng ea ka ea mantsoe. Botsa mosuoe oa hau.`, { kind: 'unknown' });
    }
    // maths
    if (/\d/.test(q)) {
      const r = MS.solve(q);
      if (r) return P(`The answer is ${r.answer}${r.remainder ? ' remainder ' + r.remainder : ''}. Here is how:`, `Karabo ke ${r.answer}${r.remainder ? ", 'me ho sala " + r.remainder : ''}. Mokhoa ke ona:`, { kind: 'maths', steps: r.steps, layout: r.layout });
    }
    // single word → dictionary first
    if (!/\s/.test(lq.replace(/\?$/, '')) || /^(what does|meaning of|define)\s/.test(lq)) {
      const w = lq.replace(/^(what does|meaning of|define)\s+/, '').replace(/\s*(mean)?\??$/, '');
      const e = this.dict(w);
      if (e) {
        const res = this.rank(w, ctx)[0];
        return P(`"${e.en}" = "${e.st}" in Sesotho.` + (e.def ? ' ' + e.def.en : ''), `"${e.st}" = "${e.en}" ka Senyesemane.` + (e.def ? ' ' + e.def.st : ''), { kind: 'word', word: e, links: res ? [res.d.l] : [] });
      }
    }
    // knowledge search over lessons
    const res = this.rank(q, { lesson: ctx.lesson, subject: ctx.subject, grade: ctx.grade || Content.grade() });
    if (res.length && res[0].s > 1.2) {
      const best = res[0].d; const sec = best.i >= 0 ? best.l.sections[best.i] : best.l.sections[0];
      const links = []; res.forEach(r => { if (!links.includes(r.d.l) && links.length < 3) links.push(r.d.l); });
      const clip = s => { const t = plain(s || ''); return t.length > 520 ? t.slice(0, 500).replace(/\s\S*$/, '') + ' …' : t; };
      return P(clip(sec.p && sec.p.en), clip(sec.p && sec.p.st), { kind: 'explain', head: sec.h, links, lessonId: best.l.id, sectionIndex: best.i });
    }
    return P("I am not sure about that one yet. I can keep your question so your teacher can answer it. You can also type it differently, or use fewer words.",
      "Ha ke na bonnete ka eona. Nka bolokela mosuoe oa hau potso ena hore a e arabe. U ka boela ua e ngola ka tsela e 'ngoe, kapa ka mantsoe a fokolang.", { kind: 'unknown' });
  }
};

/* ---------- Thuso chat screen ---------- */
Screens.thuso = function (main, lessonId, secIdx) {
  const l = lessonId ? Content.lesson(lessonId) : null;
  const ctx = { lesson: l && l.id, subject: l && l.subject, grade: l ? l.grade : Content.grade(), section: secIdx };
  const lang = () => I18N.content() === 'en' ? 'en' : 'st';
  const chat = h('div', { class: 'chat', role: 'log', 'aria-live': 'polite' });
  add(main, [h('div', { class: 'row', style: { marginBottom: '10px' } }, h('span', { class: 'avatar' }, '🦉'), h('div', {}, h('h1', { style: { margin: 0 } }, 'Thuso'), h('div', { class: 'small muted' }, l ? T('askingAbout') + ': ' + tx(l.title) : T('thusoSub')))), chat]);
  const bot = (r) => {
    const both = I18N.content() === 'both';
    const m = h('div', { class: 'msg bot' }, h('div', { class: 'who' }, '🦉 Thuso'));
    if (r.head) m.appendChild(h('b', { lang: lang(), 'data-read': '' }, tx(r.head, lang())));
    m.appendChild(h('div', { lang: lang(), 'data-read': '' }, r[lang()]));
    if (both && r.kind !== 'maths') m.appendChild(h('div', { class: 'small muted', lang: 'en', 'data-read': '' }, r.en));
    if (r.layout) m.appendChild(h('pre', { class: 'calc', 'aria-hidden': 'true' }, r.layout));
    if (r.steps) m.appendChild(h('ol', { class: 'steps' }, r.steps.map(s => h('li', { lang: lang(), 'data-read': '' }, s[lang()], both ? h('div', { class: 'small muted', lang: 'en' }, s.en) : null))));
    const acts = h('div', { class: 'acts' }, speakBtn(() => chunksOf(m), { label: false }));
    if (r.word) acts.appendChild(h('button', { class: 'btn small', onclick: () => Speech.speakChunks([{ text: r.word.st, lang: 'st' }, { text: r.word.en, lang: 'en' }]) }, '🔤 ', T('sayWord')));
    (r.links || []).forEach(x => acts.appendChild(h('a', { class: 'btn small', href: '#/lesson/' + x.id }, icon('book', null, 16), tx(x.title))));
    if (r.kind === 'unknown') acts.appendChild(h('button', { class: 'btn small gold', onclick: e => { saveQ(r.q); e.currentTarget.disabled = true; } }, icon('send', null, 16), T('sendToTeacher')));
    m.appendChild(acts);
    if (r.quiz) {
      const qz = r.quiz, qc = h('div', { class: 'stack', style: { marginTop: '8px' } }, biText('div', qz.q, 'q-text', true));
      if (qz.o) qz.o.forEach((o, k) => qc.appendChild(h('button', { class: 'opt', onclick: e => { $$('.opt', qc).forEach(b => b.disabled = true); const ok = k === qz.a; e.currentTarget.classList.add(ok ? 'right' : 'wrong'); react(ok); bot({ en: ok ? 'Correct! Well done. ' + (qz.x ? qz.x.en : '') : 'Not quite. The answer is: ' + qz.o[qz.a].en + '. ' + (qz.x ? qz.x.en : ''), st: ok ? 'U nepile! ' + (qz.x ? qz.x.st : '') : 'Che. Karabo ke: ' + qz.o[qz.a].st + '. ' + (qz.x ? qz.x.st : ''), kind: 'fb' }); } }, tx(o, lang()))));
      else if (qz.n !== undefined) qc.appendChild(numberPad(v => { const ok = String(v) === String(qz.n); react(ok); bot({ en: ok ? 'Correct!' : 'The answer is ' + qz.n + '.', st: ok ? 'U nepile!' : 'Karabo ke ' + qz.n + '.', kind: 'fb' }); }, { allowFrac: /\//.test(String(qz.n)) }));
      m.appendChild(qc);
    }
    chat.appendChild(m); m.scrollIntoView({ behavior: 'smooth', block: 'end' });
    if (Store.s.settings.autoRead || Store.s.settings.vision) Speech.speakChunks(chunksOf(m));
  };
  const me = t => { chat.appendChild(h('div', { class: 'msg me' }, t)); };
  const ask = t => {
    t = t.trim(); if (!t) return; me(t);
    const r = Tutor.answer(t, ctx); r.q = t;
    Store.log('thuso', { kind: r.kind, lesson: ctx.lesson || null });
    setTimeout(() => { bot(r); Badges.check(); }, 250);
  };
  const saveQ = text => { Store.s.questions.push({ id: uid(), t: Date.now(), l: Store.lid(), text, lesson: ctx.lesson || null, answered: false }); Store.save(); Store.log('teacher_q', { type: 'text' }); toast(T('savedForTeacher')); };
  // greeting
  bot(l ? { en: `Ask me anything about "${tx(l.title, 'en')}". Tap a suggestion or type below.`, st: `Mpotse eng kapa eng ka "${tx(l.title, 'st')}". Tobetsa khothaletso kapa u ngole ka tlase.` }
    : { en: 'Hello! I am Thuso, your helper. I work without internet. Ask me a maths sum, a word, or about any lesson.', st: 'Lumela! Ke nna Thuso, mothusi oa hau. Ke sebetsa ntle le inthanete. Mpotse palo, lentsoe, kapa ka thuto efe kapa efe.' });
  // composer
  const inp = h('input', { type: 'text', placeholder: T('typeQuestion'), 'aria-label': T('typeQuestion'), enterkeyhint: 'send', onkeydown: e => { if (e.key === 'Enter') { ask(inp.value); inp.value = ''; } } });
  const sugg = l ? [...(l.words || []).slice(0, 2).map(w => w[0] + ' in Sesotho'), tx({ en: 'quiz me', st: 'mpotse' }), ...(l.ask || [])]
    : ['345 x 23', '625 ÷ 5', '1/2 + 1/3', tx({ en: 'what is oxygen?', st: 'oksijene ke eng?' }), 'water in Sesotho', tx({ en: 'quiz me', st: 'mpotse' }), 'triangle 50 60', 'round 45 678'];
  const mic = h('button', { class: 'round mic', 'aria-label': T('speakNow') }, icon('mic'));
  mic.onclick = async () => {
    if (Speech.canListen()) {
      mic.classList.add('on'); toast(T('speakNow'));
      try { const t = await Speech.listen(lang()); mic.classList.remove('on'); if (t) ask(t); }
      catch (e) { mic.classList.remove('on'); offerRecord(); }
    } else offerRecord();
  };
  const offerRecord = () => modal((s, close) => add(s, [ut('h2', 'recordQuestion'), ut('p', 'recordWhy', { class: 'muted' }),
    recordButton('tapToRecord', async r => { const rec = await AudioDB.put({ kind: 'question', blob: r.blob, secs: r.secs, l: Store.lid(), lesson: ctx.lesson || null }); Store.s.questions.push({ id: uid(), t: Date.now(), l: Store.lid(), text: '', audio: rec.id, lesson: ctx.lesson || null, answered: false }); Store.save(); Store.log('teacher_q', { type: 'voice' }); close(); toast(T('savedForTeacher')); react(true); }, { cls: 'block primary', max: 60 }),
    h('button', { class: 'btn ghost block', onclick: close, style: { marginTop: '8px' } }, T('cancel'))]));
  main.appendChild(h('div', { class: 'composer' },
    h('div', { class: 'suggest' }, sugg.map(s => h('button', { onclick: () => ask(s) }, s))),
    h('div', { class: 'inner' }, mic, inp, h('button', { class: 'round', 'aria-label': T('send'), onclick: () => { ask(inp.value); inp.value = ''; inp.focus(); } }, icon('send')))));
  return 'Thuso';
};
