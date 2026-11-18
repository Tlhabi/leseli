/* Teacher area (PIN protected): dashboard, learners, voice-question inbox, record lesson narration
   in the teacher's own Sesotho voice, class mode for teaching from ONE phone, correct/add content,
   share content packs, and the Monitoring & Evaluation (M&E) toolkit with KPIs and exports. */
'use strict';

const Teacher = {
  unlockedUntil: 0,
  unlocked() { return Date.now() < this.unlockedUntil; },
  unlock() { this.unlockedUntil = Date.now() + 20 * 60 * 1000; },
  learnerName(id) { const l = Store.s.learners.find(x => x.id === id); return l ? l.name : (id === 'guest' ? T('guest') : '—'); },
  learnerCode(id) { const l = Store.s.learners.find(x => x.id === id); return l ? l.code : 'G'; },
  /* ---------- KPIs (used on screen and in exports) ---------- */
  kpis() {
    const S = Store.s, now = Date.now(), wk = 7 * 864e5;
    const learners = S.learners;
    const active = learners.filter(l => S.events.some(e => e.l === l.id && now - e.t < wk && ['open_lesson', 'quiz_done', 'practice', 'thuso', 'story'].includes(e.e)));
    const everActive = learners.filter(l => S.events.some(e => e.l === l.id && ['quiz_done', 'practice'].includes(e.e)));
    const quiz = S.events.filter(e => e.e === 'quiz_done');
    const avgQuiz = quiz.length ? quiz.reduce((a, e) => a + e.d.score / e.d.max, 0) / quiz.length : null;
    const hardIds = new Set(Content.all().filter(l => l.hard).map(l => l.id));
    const hardQ = quiz.filter(e => hardIds.has(e.d.id)); const avgHard = hardQ.length ? hardQ.reduce((a, e) => a + e.d.score / e.d.max, 0) / hardQ.length : null;
    const paired = learners.map(l => S.checks[l.id]).filter(c => c && c.baseline && c.endline);
    const base = learners.map(l => S.checks[l.id]).filter(c => c && c.baseline);
    const avg = arr => arr.length ? arr.reduce((a, b) => a + b, 0) / arr.length : null;
    const basePct = avg(base.map(c => c.baseline.score / c.baseline.max)), endPct = avg(paired.map(c => c.endline.score / c.endline.max)), pairBase = avg(paired.map(c => c.baseline.score / c.baseline.max));
    const fb = S.feedback.filter(f => f.rating); const happy = fb.length ? fb.filter(f => f.rating === 3).length / fb.length : null;
    const easyF = S.feedback.filter(f => f.easy); const easy = easyF.length ? easyF.filter(f => f.easy === 3).length / easyF.length : null;
    const sus = avg(S.sus.map(s => s.score));
    const girls = active.filter(l => l.gender === 'f').length, boys = active.filter(l => l.gender === 'm').length;
    const sess = S.events.filter(e => e.e === 'session');
    const access = sess.length ? sess.filter(e => e.d && (e.d.vision || e.d.hearing)).length / sess.length : null;
    const stShare = sess.length ? sess.filter(e => e.d && e.d.lang !== 'en').length / sess.length : null;
    const mins = Math.round(S.events.filter(e => e.e === 'time').reduce((a, e) => a + e.d.secs, 0) / 60);
    const qs = S.questions; const answered = qs.length ? qs.filter(q => q.answered).length / qs.length : null;
    const lessonsDone = learners.reduce((a, l) => a + Object.values((S.progress[l.id] || { lessons: {} }).lessons).filter(x => x.stars > 0).length, 0);
    return { registered: learners.length, active: active.length, everActive: everActive.length, girls, boys, avgQuiz, avgHard, basePct, endPct, pairBase, paired: paired.length, baseN: base.length, happy, easy, fbN: fb.length, sus, susN: S.sus.length, access, stShare, mins, questions: qs.length, answered, lessonsDone, classSessions: S.classLog.length, thuso: S.events.filter(e => e.e === 'thuso').length, practice: S.events.filter(e => e.e === 'practice').length, tts: S.events.filter(e => e.e === 'tts').length };
  }
};
const pct = v => v === null || v === undefined || isNaN(v) ? '–' : Math.round(v * 100) + '%';

Screens.teacher = function (main, sub, arg) {
  if (!Store.s.pin) return pinSetup(main);
  if (!Teacher.unlocked()) return pinEnter(main, sub, arg);
  const subs = { learners: tLearners, inbox: tInbox, narrate: tNarrate, class: tClass, edit: tEdit, create: tCreate, me: tME, sus: tSUS, data: tData, drawings: tDrawings, reports: tReports };
  if (sub && subs[sub]) return subs[sub](main, arg);
  const k = Teacher.kpis();
  add(main, [h('div', { class: 'row between' }, ut('h1', 'teacherArea'), h('button', { class: 'btn small', onclick: () => { Teacher.unlockedUntil = 0; go('who'); } }, icon('lock', null, 16), T('lock'))),
    h('div', { class: 'kpis' }, kpi(k.registered, T('learnersReg')), kpi(k.active, T('activeWeek')), kpi(k.lessonsDone, T('lessonsDone')), kpi(pct(k.avgQuiz), T('avgQuiz')), kpi(k.paired ? '+' + Math.round((k.endPct - k.pairBase) * 100) + ' pp' : pct(k.basePct), k.paired ? T('learningGain') : T('baselineAvg')), kpi(Store.s.questions.filter(q => !q.answered).length, T('questionsWaiting')))]);
  // activity, last 7 days
  const days = Array.from({ length: 7 }, (_, i) => { const d = new Date(); d.setDate(d.getDate() - (6 - i)); return d.toISOString().slice(0, 10); });
  const counts = days.map(d => Store.s.events.filter(e => new Date(e.t).toISOString().slice(0, 10) === d && ['open_lesson', 'quiz_done', 'practice', 'thuso', 'story'].includes(e.e)).length);
  const mx = Math.max(1, ...counts);
  main.appendChild(h('section', { class: 'card' }, ut('h2', 'activity7'), h('div', { class: 'bars', style: { marginBottom: '22px' }, role: 'img', 'aria-label': counts.join(', ') }, counts.map((c, i) => h('div', { style: { height: (c / mx * 100) + '%' } }, h('em', {}, c || ''), h('span', {}, days[i].slice(8)))))));
  const t = (href, emo, key, sub) => h('a', { class: 'lesson-item', href: '#/teacher/' + href }, h('span', { class: 'big-emoji', style: { fontSize: '30px' } }, emo), h('span', { class: 'meta' }, h('b', {}, T(key)), h('small', {}, T(sub))), icon('next'));
  add(main, [t('class', '🧑‍🏫', 'classMode', 'classModeSub'), t('inbox', '🎤', 'inbox', 'inboxSub'), t('narrate', '🎙️', 'narrate', 'narrateSub'), t('learners', '👧🏾', 'learners', 'learnersSub'),
    t('me', '📊', 'mne', 'mneSub'), t('sus', '📝', 'susTitle', 'susSub'), t('edit', '✏️', 'editContent', 'editSub'), t('create', '➕', 'createLesson', 'createSub'), t('reports', '⚑', 'reportsTitle', 'reportsSub'), t('drawings', '🎨', 'drawingsTitle', 'drawingsSub'), t('data', '💾', 'dataTitle', 'dataSub')]);
  return T('teacherArea');
  function kpi(v, l) { return h('div', { class: 'kpi' }, h('b', {}, String(v)), h('small', {}, l)); }
};

function pinSetup(main) {
  add(main, [ut('h1', 'setPin'), ut('p', 'pinWhy', { class: 'muted' })]);
  const a = h('input', { type: 'password', inputmode: 'numeric', maxlength: 6, 'aria-label': 'PIN' }), b = h('input', { type: 'password', inputmode: 'numeric', maxlength: 6, 'aria-label': T('repeatPin') });
  add(main, [h('label', { class: 'field' }, 'PIN'), a, h('label', { class: 'field' }, T('repeatPin')), b, h('button', { class: 'btn primary block', style: { marginTop: '12px' }, onclick: () => { if (!/^\d{4,6}$/.test(a.value)) return toast(T('pin4')); if (a.value !== b.value) return toast(T('pinMismatch')); Store.s.pin = hashPin(a.value); Store.save(); Teacher.unlock(); Store.log('pin_set'); App.render(); } }, T('save'))]);
  return T('teacherArea');
}
function pinEnter(main, sub, arg) {
  add(main, [h('div', { class: 'big-emoji', style: { textAlign: 'center' } }, '🔒'), ut('h1', 'enterPin')]);
  let v = ''; const box = h('div', { class: 'answer-box', 'aria-live': 'polite' }, '• • • •');
  const pad = h('div', { class: 'pad' }, ['1', '2', '3', 'del', '4', '5', '6', 'ok', '7', '8', '9', '0'].map(k => h('button', { class: k === 'ok' ? 'ok' : k === 'del' ? 'del' : '', 'aria-label': k === 'del' ? T('delete') : k === 'ok' ? 'OK' : k, onclick: () => {
    if (k === 'del') v = v.slice(0, -1); else if (k === 'ok') { if (hashPin(v) === Store.s.pin) { Teacher.unlock(); Store.log('teacher_login'); App.render(); return; } toast(T('wrongPin')); react(false); v = ''; } else if (v.length < 6) v += k;
    box.textContent = v ? '•'.repeat(v.length) : '• • • •';
  } }, k === 'del' ? '⌫' : k === 'ok' ? '✓' : k)));
  add(main, [box, pad, h('p', { class: 'small muted', style: { marginTop: '14px' } }, T('forgotPin'))]);
  return T('teacherArea');
}

/* ---------- learners ---------- */
function tLearners(main) {
  add(main, [ut('h1', 'learners')]);
  if (!Store.s.learners.length) { main.appendChild(h('p', { class: 'empty' }, T('noLearners'))); return T('learners'); }
  const rows = Store.s.learners.map(l => {
    const p = Store.s.progress[l.id] || { lessons: {}, stars: 0 }; const done = Object.values(p.lessons).filter(x => x.stars > 0);
    const q = Store.s.events.filter(e => e.l === l.id && e.e === 'quiz_done'); const avg = q.length ? q.reduce((a, e) => a + e.d.score / e.d.max, 0) / q.length : null;
    const c = Store.s.checks[l.id] || {}; const last = Store.s.events.filter(e => e.l === l.id).slice(-1)[0];
    return h('tr', {}, h('td', {}, l.avatar + ' ' + l.name, h('div', { class: 'small muted' }, l.code + ' · ' + T('grade') + ' ' + l.grade + ' · ' + ({ f: '♀', m: '♂' }[l.gender] || '–'))), h('td', {}, done.length), h('td', {}, pct(avg)), h('td', {}, c.baseline ? c.baseline.score + '/' + c.baseline.max : '–'), h('td', {}, c.endline ? c.endline.score + '/' + c.endline.max : '–'), h('td', { class: 'small' }, last ? new Date(last.t).toLocaleDateString() : '–'),
      h('td', {}, h('button', { class: 'btn small warn', 'aria-label': T('delete') + ' ' + l.name, onclick: () => confirmBox(T('deleteLearnerSure') + ' ' + l.name + '?', () => { Store.removeLearner(l.id); App.render(); }) }, icon('trash', null, 16))));
  });
  main.appendChild(h('div', { class: 'card table-wrap' }, h('table', { class: 'data' }, h('tr', {}, ['', T('lessonsDone'), T('avgQuiz'), T('baseline'), T('endline'), T('lastActive'), ''].map(x => h('th', {}, x))), rows)));
  return T('learners');
}

/* ---------- inbox: learners' typed and voice questions ---------- */
function tInbox(main) {
  add(main, [ut('h1', 'inbox'), ut('p', 'inboxSub', { class: 'muted' })]);
  const qs = Store.s.questions.slice().reverse();
  if (!qs.length) main.appendChild(h('p', { class: 'empty' }, T('noQuestions')));
  qs.forEach(q => {
    const l = q.lesson && Content.lesson(q.lesson);
    const reply = h('input', { type: 'text', value: q.reply || '', placeholder: T('typeReply') });
    const c = h('section', { class: 'card', style: { opacity: q.answered ? .7 : 1 } },
      h('div', { class: 'row between' }, h('b', {}, Teacher.learnerName(q.l)), h('span', { class: 'small muted' }, new Date(q.t).toLocaleString())),
      l ? h('div', { class: 'small muted' }, '📘 ' + tx(l.title)) : null,
      q.text ? h('p', {}, '“' + q.text + '”') : null,
      q.audio ? h('button', { class: 'btn small gold', onclick: () => AudioDB.get(q.audio).then(r => r ? Player.play(r.blob) : toast(T('notFound'))) }, icon('play', null, 18), T('listen')) : null,
      h('label', { class: 'field' }, T('reply')), reply,
      h('div', { class: 'row', style: { marginTop: '8px' } },
        recordButton('recordReply', async r => { const rec = await AudioDB.put({ kind: 'reply', blob: r.blob, secs: r.secs }); q.replyAudio = rec.id; q.answered = true; Store.save(); toast(T('saved')); App.render(); }, { cls: 'small' }),
        h('button', { class: 'btn small good', onclick: () => { q.reply = reply.value.trim(); q.answered = true; q.answeredAt = Date.now(); Store.save(); Store.log('teacher_answer'); toast(T('saved')); App.render(); } }, icon('check', null, 16), T('markAnswered')),
        h('button', { class: 'btn small warn', 'aria-label': T('delete'), onclick: () => confirmBox(T('deleteSure'), () => { if (q.audio) AudioDB.del(q.audio); Store.s.questions = Store.s.questions.filter(x => x !== q); Store.save(); App.render(); }) }, icon('trash', null, 16))));
    main.appendChild(c);
  });
  return T('inbox');
}

/* lesson picker used by narration, class mode and editing */
function lessonPicker(main, route) {
  let subj = LESELI.subjects[0].id, g = 5;
  const chips = h('div', { class: 'chips' }, LESELI.subjects.map(s => h('button', { 'aria-pressed': String(s.id === subj), onclick: e => { subj = s.id; $$('button', chips).forEach(b => b.setAttribute('aria-pressed', 'false')); e.currentTarget.setAttribute('aria-pressed', 'true'); draw(); } }, tx(s.title))));
  const gb = h('div', { class: 'gradebar' }, [5, 6, 7].map(n => h('button', { 'aria-pressed': String(n === g), onclick: e => { g = n; $$('button', gb).forEach(b => b.setAttribute('aria-pressed', 'false')); e.currentTarget.setAttribute('aria-pressed', 'true'); draw(); } }, T('grade') + ' ' + n)));
  const list = h('div');
  const draw = () => { list.innerHTML = ''; Content.lessons(subj, g).forEach(l => list.appendChild(h('a', { class: 'lesson-item', href: `#/teacher/${route}/${l.id}` }, h('span', { class: 'num', style: { background: subjColor(l.subject) } }, String(l.grade)), h('span', { class: 'meta' }, h('b', {}, tx(l.title))), icon('next')))); };
  add(main, [chips, gb, list]); draw();
}

/* ---------- narration in the teacher's voice ---------- */
function tNarrate(main, id) {
  if (!id) { add(main, [ut('h1', 'narrate'), ut('p', 'narrateWhy', { class: 'muted' })]); lessonPicker(main, 'narrate'); return T('narrate'); }
  const l = Content.lesson(id);
  add(main, [h('h1', {}, tx(l.title)), ut('p', 'narrateHow', { class: 'muted' })]);
  l.sections.forEach((s, i) => {
    const c = h('section', { class: 'card' }, biText('h3', s.h || L('Section ' + (i + 1))), h('details', {}, h('summary', {}, T('showText')), biText('div', s.p, 'small', true)));
    ['st', 'en'].forEach(lang => {
      const key = `${id}:${i}:${lang}`; const row = h('div', { class: 'row', style: { marginTop: '8px' } }, h('b', { style: { width: '80px' } }, lang === 'st' ? 'Sesotho' : 'English'));
      AudioDB.narration(key).then(r => {
        if (r) add(row, [h('button', { class: 'btn small gold', onclick: () => Player.play(r.blob) }, icon('play', null, 16), r.secs + 's'), h('button', { class: 'btn small warn', 'aria-label': T('delete'), onclick: () => AudioDB.del(r.id).then(() => App.render()) }, icon('trash', null, 16))]);
        row.appendChild(recordButton(r ? 'reRecord' : 'record', async rec => { if (r) await AudioDB.del(r.id); await AudioDB.put({ kind: 'narration', key, blob: rec.blob, secs: rec.secs }); Store.log('narration', { id, i, lang }); toast(T('saved')); App.render(); }, { cls: 'small', max: 180 }));
      });
      c.appendChild(row);
    });
    main.appendChild(c);
  });
  return T('narrate');
}

/* ---------- class mode: teach a whole class from one phone ---------- */
function tClass(main, id) {
  if (!id) { add(main, [ut('h1', 'classMode'), ut('p', 'classWhy', { class: 'muted' })]); lessonPicker(main, 'class'); return T('classMode'); }
  const l = Content.lesson(id); const t0 = Date.now();
  const slides = [{ title: true }].concat(l.sections.map(s => ({ s }))).concat((l.quiz || []).map(q => ({ q })));
  let k = 0; document.body.classList.add('hide-nav'); Platform.keepAwake(true);
  const box = h('div', { class: 'class-slide', role: 'dialog', 'aria-label': T('classMode') }); document.body.appendChild(box);
  const close = () => { Speech.stop(); box.remove(); document.body.classList.remove('hide-nav'); Platform.keepAwake(false); modal((s, c) => { const n = h('input', { type: 'number', min: 0, max: 80, placeholder: '0' }); add(s, [ut('h2', 'howManyLearners'), n, h('button', { class: 'btn primary block', style: { marginTop: '10px' }, onclick: () => { Store.s.classLog.push({ t: t0, lesson: id, mins: Math.round((Date.now() - t0) / 60000), learners: +n.value || 0 }); Store.log('class_mode', { id, learners: +n.value || 0 }); Store.save(); c(); go('teacher'); } }, T('save'))]); }); };
  const draw = () => {
    box.innerHTML = ''; const sl = slides[k]; const content = h('div', { class: 'content' });
    if (sl.title) add(content, [h('div', { style: { fontSize: '.6em' } }, tx(LESELI.subject(l.subject).title) + ' · ' + T('grade') + ' ' + l.grade), biText('h2', l.title), h('div', { style: { fontSize: '3em' } }, '📘')]);
    else if (sl.s) { if (sl.s.h) content.appendChild(biText('h2', sl.s.h)); if (sl.s.p) content.appendChild(biText('div', sl.s.p, '', true)); if (sl.s.ex) content.appendChild(h('div', { class: 'example', style: { color: '#1d1b16' } }, biText('div', sl.s.ex, '', true))); if (sl.s.calc) { const r = MS.solve(sl.s.calc); if (r) content.appendChild(h('pre', { class: 'calc' }, r.layout || r.steps.map(x => tx(x, 'st')).join('\n'))); } }
    else if (sl.q) {
      content.appendChild(h('div', { style: { color: '#f6b73c', fontSize: '.7em', fontWeight: 800 } }, T('classQuestion')));
      content.appendChild(biText('div', sl.q.q, '', true));
      const reveal = h('div', { hidden: true, style: { color: '#6dff9c', fontWeight: 800 } }, '✔ ', sl.q.o ? tx(sl.q.o[sl.q.a]) : String(sl.q.n), sl.q.x ? biText('div', sl.q.x, 'small') : null);
      if (sl.q.o) content.appendChild(h('div', { class: 'options' }, sl.q.o.map((o, j) => h('div', { class: 'opt' }, h('span', { class: 'letter' }, 'ABCD'[j]), tx(o)))));
      content.appendChild(h('p', { style: { fontSize: '.6em' } }, T('handsUp')));
      content.appendChild(h('button', { class: 'btn gold', onclick: e => { reveal.hidden = false; e.currentTarget.remove(); react(true); } }, T('revealAnswer')));
      content.appendChild(reveal);
    }
    add(box, [h('div', { class: 'row between' }, h('span', {}, `${k + 1} / ${slides.length}`), h('div', { class: 'row' }, speakBtn(() => chunksOf(content), { label: false }), h('button', { class: 'btn small', onclick: close }, icon('x', null, 18), T('close')))), content,
      h('div', { class: 'nav' }, h('button', { class: 'btn', disabled: k === 0, onclick: () => { k--; draw(); } }, icon('back'), T('back')), h('button', { class: 'btn primary', style: { background: '#f6b73c', color: '#000' }, disabled: k === slides.length - 1, onclick: () => { k++; draw(); } }, T('next'), icon('next'))) ]);
  };
  draw();
  return T('classMode');
}

/* ---------- correct the built-in content ---------- */
function tEdit(main, id) {
  if (!id) {
    add(main, [ut('h1', 'editContent'), ut('p', 'editWhy', { class: 'muted' })]);
    const n = Object.keys(Store.s.overrides).length;
    if (n) main.appendChild(h('section', { class: 'card row between' }, h('span', {}, n + ' ' + T('lessonsCorrected')), h('button', { class: 'btn small', onclick: () => Platform.shareText('leseli-corrections-' + today() + '.json', JSON.stringify({ type: 'leseli-corrections', school: 'Moshoeshoe II Primary', date: today(), overrides: Store.s.overrides, reports: Store.s.reports }, null, 1), 'application/json') }, icon('share', null, 16), T('exportCorrections'))));
    lessonPicker(main, 'edit'); return T('editContent');
  }
  const base = LESELI.lessons[id] || Store.s.custom.find(c => c.id === id); const cur = Content.lesson(id);
  const fields = [];
  add(main, [h('h1', {}, tx(cur.title)), ut('p', 'editHow', { class: 'muted small' })]);
  cur.sections.forEach((s, i) => {
    const c = h('section', { class: 'card' }, h('b', {}, '§' + (i + 1)));
    ['st', 'en'].forEach(lg => {
      const hh = h('input', { type: 'text', value: (s.h && s.h[lg]) || '' }), pp = h('textarea', {}, (s.p && s.p[lg]) || '');
      fields.push({ i, lg, hh, pp });
      add(c, [h('label', { class: 'field' }, (lg === 'st' ? 'Sesotho' : 'English') + ' – ' + T('heading')), hh, h('label', { class: 'field' }, (lg === 'st' ? 'Sesotho' : 'English') + ' – ' + T('text')), pp]);
    });
    main.appendChild(c);
  });
  add(main, [h('div', { class: 'row' }, h('button', { class: 'btn primary', onclick: () => {
    const o = { sections: {} };
    fields.forEach(f => { const b = base.sections[f.i]; const so = o.sections[f.i] || (o.sections[f.i] = { h: {}, p: {} }); if (f.hh.value !== ((b.h && b.h[f.lg]) || '')) so.h[f.lg] = f.hh.value; if (f.pp.value !== ((b.p && b.p[f.lg]) || '')) so.p[f.lg] = f.pp.value; });
    Object.keys(o.sections).forEach(k => { const so = o.sections[k]; if (!Object.keys(so.h).length && !Object.keys(so.p).length) delete o.sections[k]; });
    if (Object.keys(o.sections).length) Store.s.overrides[id] = o; else delete Store.s.overrides[id];
    Store.save(); Tutor.index = null; Store.log('content_edit', { id }); toast(T('saved')); go('lesson/' + id);
  } }, T('save')), Store.s.overrides[id] ? h('button', { class: 'btn warn', onclick: () => { delete Store.s.overrides[id]; Store.save(); Tutor.index = null; App.render(); } }, T('undoChanges')) : null)]);
  return T('editContent');
}

/* ---------- teachers write their own lessons; share as packs via WhatsApp / Bluetooth ---------- */
function tCreate(main) {
  add(main, [ut('h1', 'createLesson'), ut('p', 'createWhy', { class: 'muted' })]);
  if (Store.s.custom.length) {
    const c = h('section', { class: 'card' }, ut('h2', 'myLessons'));
    Store.s.custom.forEach(l => c.appendChild(h('div', { class: 'dict-row' }, h('div', { class: 'w' }, h('b', {}, tx(l.title)), h('span', {}, tx(LESELI.subject(l.subject).title) + ' · ' + T('grade') + ' ' + l.grade)), h('a', { class: 'btn small', href: '#/lesson/' + l.id }, icon('eye', null, 16)), h('button', { class: 'btn small warn', 'aria-label': T('delete'), onclick: () => confirmBox(T('deleteSure'), () => { Store.s.custom = Store.s.custom.filter(x => x !== l); Store.save(); Tutor.index = null; App.render(); }) }, icon('trash', null, 16)))));
    c.appendChild(h('button', { class: 'btn block', onclick: () => Platform.shareText('leseli-pack-' + today() + '.json', JSON.stringify({ type: 'leseli-pack', v: 1, from: 'Moshoeshoe II Primary', lessons: Store.s.custom }, null, 1), 'application/json') }, icon('share'), T('sharePack')));
    main.appendChild(c);
  }
  const file = h('input', { type: 'file', accept: '.json,application/json', style: { display: 'none' }, onchange: e => { const f = e.target.files[0]; if (!f) return; const r = new FileReader(); r.onload = () => { try { const d = JSON.parse(r.result); if (d.type !== 'leseli-pack') throw 0; let n = 0; d.lessons.forEach(l => { if (!Store.s.custom.find(x => x.id === l.id)) { l.custom = true; Store.s.custom.push(l); n++; } }); Store.save(); Tutor.index = null; toast(n + ' ' + T('lessonsAdded')); App.render(); } catch (err) { toast(T('badFile')); } }; r.readAsText(f); } });
  main.appendChild(h('button', { class: 'btn block', style: { marginBottom: '14px' }, onclick: () => file.click() }, icon('upload'), T('importPack')));
  main.appendChild(file);
  // form
  let subj = 'maths', g = 5;
  const f = h('section', { class: 'card' }, ut('h2', 'newLesson'));
  const sel = h('select', { onchange: e => subj = e.target.value }, LESELI.subjects.map(s => h('option', { value: s.id }, tx(s.title))));
  const gs = h('select', { onchange: e => g = +e.target.value }, [5, 6, 7].map(n => h('option', { value: n }, T('grade') + ' ' + n)));
  const tSt = h('input', { type: 'text', placeholder: 'Sehlooho (Sesotho)' }), tEn = h('input', { type: 'text', placeholder: 'Title (English)' });
  const secs = [0, 1, 2].map(i => ({ hSt: h('input', { type: 'text', placeholder: `Sehlooho ${i + 1}` }), pSt: h('textarea', { placeholder: 'Litaba ka Sesotho…' }), hEn: h('input', { type: 'text', placeholder: `Heading ${i + 1}` }), pEn: h('textarea', { placeholder: 'Text in English…' }) }));
  const qs = [0, 1, 2, 3, 4].map(i => ({ q: h('input', { type: 'text', placeholder: `${T('question')} ${i + 1}` }), a: h('input', { type: 'text', placeholder: '✔ ' + T('rightAnswer') }), b: h('input', { type: 'text', placeholder: '✘ ' + T('wrongAnswer') }), c: h('input', { type: 'text', placeholder: '✘ ' + T('wrongAnswer') }) }));
  add(f, [h('label', { class: 'field' }, T('subject')), sel, h('label', { class: 'field' }, T('grade')), gs, h('label', { class: 'field' }, T('title')), tSt, tEn,
    ...secs.map((s, i) => h('details', { open: i === 0, class: 'card flat', style: { marginTop: '10px' } }, h('summary', {}, h('b', {}, T('part') + ' ' + (i + 1))), s.hSt, s.pSt, s.hEn, s.pEn)),
    h('details', { class: 'card flat', style: { marginTop: '10px' } }, h('summary', {}, h('b', {}, T('quiz'))), ...qs.map(q => h('div', { style: { margin: '8px 0' } }, q.q, q.a, q.b, q.c))),
    h('button', { class: 'btn primary block', style: { marginTop: '12px' }, onclick: () => {
      if (!tSt.value.trim() && !tEn.value.trim()) return toast(T('title'));
      const sections = secs.filter(s => s.pSt.value.trim() || s.pEn.value.trim()).map(s => S(s.hEn.value || s.hSt.value, s.hSt.value || s.hEn.value, s.pEn.value || s.pSt.value, s.pSt.value || s.pEn.value));
      if (!sections.length) return toast(T('addText'));
      const quiz = qs.filter(q => q.q.value.trim() && q.a.value.trim() && q.b.value.trim()).map(q => Q(q.q.value, q.q.value, [q.a.value, q.b.value].concat(q.c.value.trim() ? [q.c.value] : []), 0));
      const l = { id: 'custom-' + uid(), custom: true, subject: subj, grade: g, title: L(tEn.value || tSt.value, tSt.value || tEn.value), sections, quiz, words: [], author: 'teacher', created: Date.now() };
      Store.s.custom.push(l); Store.save(); Tutor.index = null; Store.log('lesson_created', { subj, g }); toast(T('saved')); go('lesson/' + l.id);
    } }, T('save'))]);
  main.appendChild(f);
  return T('createLesson');
}

/* ---------- M&E: KPIs, results framework, exports ---------- */
function tME(main) {
  const k = Teacher.kpis();
  add(main, [ut('h1', 'mne'), ut('p', 'mneWhy', { class: 'muted' })]);
  const rows = [
    ['KPI 1 · Reach', 'Learners using Leseli this week / registered', `${k.active} / ${k.registered}`],
    ['KPI 2 · Inclusion (gender)', 'Active learners who are girls : boys', `${k.girls} : ${k.boys}`],
    ['KPI 3 · Inclusion (disability & language)', 'Sessions with seeing/hearing support on · sessions in Sesotho', `${pct(k.access)} · ${pct(k.stShare)}`],
    ['KPI 4 · Usability (learners)', 'Happy face 😀 / "easy to use: yes"', `${pct(k.happy)} / ${pct(k.easy)} (n=${k.fbN})`],
    ['KPI 5 · Usability (teachers)', 'System Usability Scale score (0–100, 68 = average)', k.sus ? Math.round(k.sus) + ` (n=${k.susN})` : '–'],
    ['KPI 6 · Learning outcome', 'Starting check → final check (same learners)', k.paired ? `${pct(k.pairBase)} → ${pct(k.endPct)} (+${Math.round((k.endPct - k.pairBase) * 100)} pp, n=${k.paired})` : `baseline ${pct(k.basePct)} (n=${k.baseN}), final not yet`],
    ['KPI 7 · Hard topics', 'Average quiz score on topics learners said were hard', pct(k.avgHard)],
    ['KPI 8 · Engagement', 'Lessons completed · minutes reading · practice answers · Thuso questions', `${k.lessonsDone} · ${k.mins} · ${k.practice} · ${k.thuso}`],
    ['KPI 9 · Teacher support', 'Class-mode lessons · learner questions answered', `${k.classSessions} · ${pct(k.answered)} of ${k.questions}`]
  ];
  main.appendChild(h('div', { class: 'card table-wrap' }, h('table', { class: 'data' }, h('tr', {}, h('th', {}, 'KPI'), h('th', {}, T('measure')), h('th', {}, T('value'))), rows.map(r => h('tr', {}, h('td', {}, h('b', {}, r[0])), h('td', { class: 'small' }, r[1]), h('td', {}, h('b', {}, r[2])))))));
  // results framework
  main.appendChild(h('section', { class: 'card' }, ut('h2', 'resultsFramework'), h('ol', { class: 'small' },
    h('li', {}, h('b', {}, 'Inputs: '), "Teachers' and families' Android phones, Leseli app (free, offline), 1 training session, teacher time."),
    h('li', {}, h('b', {}, 'Activities: '), 'Learners study lessons, practise maths, read stories, ask Thuso; teachers use class mode, answer voice questions, record Sesotho narration.'),
    h('li', {}, h('b', {}, 'Outputs: '), 'Lessons completed, practice answered, questions answered (KPI 1, 8, 9).'),
    h('li', {}, h('b', {}, 'Outcomes: '), 'Better scores on hard topics (KPI 6, 7); learners able to study at home; inclusive use (KPI 2, 3); easy to use (KPI 4, 5).'),
    h('li', {}, h('b', {}, 'Impact / SDG: '), 'SDG 4.1 & 4.5 (quality, inclusive primary education), SDG 4.a (inclusive learning for learners with disabilities), SDG 5.1 (girls equal access), SDG 10.2 (inclusion), SDG 9.c (access to ICT).'))));
  // item analysis on starting/final check
  const items = {}; Object.values(Store.s.checks).forEach(c => ['baseline', 'endline'].forEach(kd => { if (c[kd] && c[kd].answers) c[kd].answers.forEach((a, i) => { const key = c[kd].grade + ':' + i; items[key] = items[key] || { b: [0, 0], e: [0, 0] }; items[key][kd[0]][0] += a; items[key][kd[0]][1]++; }); }));
  if (Object.keys(items).length) main.appendChild(h('section', { class: 'card table-wrap' }, ut('h2', 'itemAnalysis'), h('table', { class: 'data' }, h('tr', {}, h('th', {}, T('question')), h('th', {}, T('baseline')), h('th', {}, T('endline'))), Object.entries(items).sort().map(([key, v]) => h('tr', {}, h('td', {}, 'G' + key.replace(':', ' · Q') .replace(/Q(\d+)/, (m, n) => 'Q' + (+n + 1))), h('td', {}, v.b[1] ? pct(v.b[0] / v.b[1]) : '–'), h('td', {}, v.e[1] ? pct(v.e[0] / v.e[1]) : '–'))))));
  // feedback notes
  const notes = Store.s.feedback.filter(f => f.note || f.audio);
  if (notes.length) main.appendChild(h('section', { class: 'card' }, ut('h2', 'learnerComments'), notes.slice(-15).reverse().map(f => h('div', { class: 'dict-row' }, h('div', { class: 'w' }, h('b', {}, ['', '😞', '😐', '😀'][f.rating || 0] + ' ' + (f.note || '🎤')), h('span', { class: 'small' }, new Date(f.t).toLocaleDateString() + ' · ' + T('grade') + ' ' + (f.grade || '–'))), f.audio ? h('button', { class: 'btn small', onclick: () => AudioDB.get(f.audio).then(r => r && Player.play(r.blob)) }, icon('play', null, 16)) : null))));
  add(main, [h('section', { class: 'card stack' }, ut('h2', 'exportData'), ut('p', 'exportWhy', { class: 'small muted' }),
    h('button', { class: 'btn block', onclick: () => Platform.shareText('leseli-summary-' + today() + '.txt', summaryText(k)) }, icon('share'), T('shareSummary')),
    h('button', { class: 'btn block', onclick: () => Platform.shareText('leseli-learners-' + today() + '.csv', learnersCSV(), 'text/csv') }, icon('download'), T('learnersCsv')),
    h('button', { class: 'btn block', onclick: () => Platform.shareText('leseli-events-' + today() + '.csv', eventsCSV(), 'text/csv') }, icon('download'), T('eventsCsv')),
    h('button', { class: 'btn block', onclick: () => Platform.shareText('leseli-feedback-' + today() + '.csv', feedbackCSV(), 'text/csv') }, icon('download'), T('feedbackCsv')))]);
  return T('mne');
}
const csv = rows => rows.map(r => r.map(v => { const s = v === null || v === undefined ? '' : String(v); return /[",\n]/.test(s) ? '"' + s.replace(/"/g, '""') + '"' : s; }).join(',')).join('\n');
function learnersCSV() {
  return csv([['code', 'grade', 'gender', 'lessons_done', 'quiz_attempts', 'avg_quiz_pct', 'stars', 'practice_right', 'baseline', 'baseline_max', 'endline', 'endline_max', 'minutes', 'days_active', 'thuso_questions', 'teacher_questions']].concat(Store.s.learners.map(l => {
    const p = Store.s.progress[l.id] || { lessons: {}, stars: 0, days: [], practice: {} }; const q = Store.s.events.filter(e => e.l === l.id && e.e === 'quiz_done'); const c = Store.s.checks[l.id] || {};
    return [l.code, l.grade, l.gender || '', Object.values(p.lessons).filter(x => x.stars > 0).length, q.length, q.length ? Math.round(q.reduce((a, e) => a + e.d.score / e.d.max, 0) / q.length * 100) : '', p.stars, (p.practice || {}).right || 0, c.baseline ? c.baseline.score : '', c.baseline ? c.baseline.max : '', c.endline ? c.endline.score : '', c.endline ? c.endline.max : '',
      Math.round(Store.s.events.filter(e => e.l === l.id && e.e === 'time').reduce((a, e) => a + e.d.secs, 0) / 60), (p.days || []).length, Store.s.events.filter(e => e.l === l.id && e.e === 'thuso').length, Store.s.questions.filter(x => x.l === l.id).length];
  })));
}
function eventsCSV() { return csv([['time', 'learner_code', 'event', 'details']].concat(Store.s.events.map(e => [new Date(e.t).toISOString(), Teacher.learnerCode(e.l), e.e, e.d ? JSON.stringify(e.d) : '']))); }
function feedbackCSV() { return csv([['time', 'learner_code', 'grade', 'gender', 'rating_1to3', 'easy_1to3', 'note', 'vision_mode', 'hearing_mode']].concat(Store.s.feedback.map(f => [new Date(f.t).toISOString(), Teacher.learnerCode(f.l), f.grade || '', f.gender || '', f.rating || '', f.easy || '', f.note || '', f.vision ? 1 : 0, f.hearing ? 1 : 0])).concat([[], ['teacher_SUS', 'score', 'answers']]).concat(Store.s.sus.map(s => [new Date(s.t).toISOString(), s.score, s.answers.join(' ')]))); }
function summaryText(k) {
  return `LESELI – Moshoeshoe II Primary School – M&E summary (${today()})\n` +
    `Learners registered: ${k.registered}; active this week: ${k.active} (girls ${k.girls}, boys ${k.boys})\n` +
    `Lessons completed: ${k.lessonsDone}; minutes reading lessons: ${k.mins}; practice answers: ${k.practice}; Thuso questions: ${k.thuso}\n` +
    `Average quiz score: ${pct(k.avgQuiz)}; on 'hard' topics: ${pct(k.avgHard)}\n` +
    `Starting check: ${pct(k.basePct)} (n=${k.baseN}); paired final check: ${k.paired ? pct(k.pairBase) + ' -> ' + pct(k.endPct) + ' (n=' + k.paired + ')' : 'not yet'}\n` +
    `Learner happiness: ${pct(k.happy)} happy; easy to use: ${pct(k.easy)} (n=${k.fbN}); teacher SUS: ${k.sus ? Math.round(k.sus) : '-'} (n=${k.susN})\n` +
    `Accessibility features used in ${pct(k.access)} of sessions; Sesotho used in ${pct(k.stShare)} of sessions\n` +
    `Class-mode lessons: ${k.classSessions}; learner questions answered: ${pct(k.answered)} of ${k.questions}\n` +
    `(No names included. Learner codes only.)`;
}

/* ---------- System Usability Scale for teachers (Sesotho + English) ---------- */
function tSUS(main) {
  const items = [
    L('I think that I would like to use Leseli often.', 'Ke nahana hore nka rata ho sebelisa Leseli khafetsa.'),
    L('I found Leseli unnecessarily complex.', 'Ke fumane Leseli e rarahane ho feta tlhokahalo.'),
    L('I thought Leseli was easy to use.', 'Ke nahanne hore Leseli e bonolo ho e sebelisa.'),
    L('I think I would need help from a technical person to use Leseli.', 'Ke nahana hore nka hloka thuso ea setsebi ho sebelisa Leseli.'),
    L('The parts of Leseli work well together.', 'Likarolo tsa Leseli li sebetsa hantle hammoho.'),
    L('There was too much inconsistency in Leseli.', 'Ho ne ho e-na le ho se tsitse ho hongata ho Leseli.'),
    L('Most people would learn to use Leseli very quickly.', 'Batho ba bangata ba ka ithuta ho sebelisa Leseli kapele haholo.'),
    L('I found Leseli very awkward to use.', 'Ke fumane Leseli e le thata haholo ho e sebelisa.'),
    L('I felt very confident using Leseli.', 'Ke ikutloile ke na le boitšepo bo boholo ha ke sebelisa Leseli.'),
    L('I needed to learn a lot of things before I could get going with Leseli.', 'Ke ile ka hloka ho ithuta lintho tse ngata pele ke qala ho sebelisa Leseli.')];
  const ans = Array(10).fill(0);
  add(main, [ut('h1', 'susTitle'), ut('p', 'susWhy', { class: 'muted' })]);
  items.forEach((it, i) => { const seg = h('div', { class: 'seg', style: { display: 'flex' } }, [1, 2, 3, 4, 5].map(v => h('button', { style: { flex: 1 }, 'aria-pressed': 'false', 'aria-label': v + '/5', onclick: e => { ans[i] = v; $$('button', seg).forEach(b => b.setAttribute('aria-pressed', 'false')); e.currentTarget.setAttribute('aria-pressed', 'true'); } }, v))); main.appendChild(h('section', { class: 'card' }, h('b', {}, (i + 1) + '. '), biText('span', it), h('div', { class: 'row between small muted', style: { margin: '6px 0' } }, h('span', {}, tx({ en: '1 = strongly disagree', st: '1 = ha ke lumele ho hang' })), h('span', {}, tx({ en: '5 = strongly agree', st: '5 = ke lumela haholo' }))), seg)); });
  main.appendChild(h('button', { class: 'btn primary block', onclick: () => {
    if (ans.includes(0)) return toast(T('answerAll'));
    const score = ans.reduce((a, v, i) => a + (i % 2 === 0 ? v - 1 : 5 - v), 0) * 2.5;
    Store.s.sus.push({ t: Date.now(), score, answers: ans }); Store.log('sus', { score }); Store.save();
    modal((s, c) => add(s, [h('h2', {}, 'SUS = ' + score), h('p', {}, score >= 68 ? tx({ en: 'Above average usability. Thank you!', st: 'Ho sebelisoa ho hantle ho feta karolelano. Kea leboha!' }) : tx({ en: 'Below average – please also tell the team what was hard.', st: 'Ka tlase ho karolelano – ka kopo bolella sehlopha se neng se le thata.' })), h('button', { class: 'btn primary block', onclick: () => { c(); go('teacher'); } }, T('done'))]));
  } }, T('send')));
  return T('susTitle');
}

function tReports(main) {
  add(main, [ut('h1', 'reportsTitle')]);
  if (!Store.s.reports.length) main.appendChild(h('p', { class: 'empty' }, T('nothingYet')));
  Store.s.reports.slice().reverse().forEach(r => { const l = Content.lesson(r.lesson); main.appendChild(h('section', { class: 'card' }, h('b', {}, l ? tx(l.title) : r.lesson), h('p', {}, r.text), h('div', { class: 'row' }, l ? h('a', { class: 'btn small', href: '#/teacher/edit/' + r.lesson }, icon('pencil', null, 16), T('editContent')) : null, h('button', { class: 'btn small warn', onclick: () => { Store.s.reports = Store.s.reports.filter(x => x !== r); Store.save(); App.render(); } }, icon('trash', null, 16))))); });
  return T('reportsTitle');
}
function tDrawings(main) {
  add(main, [ut('h1', 'drawingsTitle')]);
  if (!Store.s.drawings.length) main.appendChild(h('p', { class: 'empty' }, T('nothingYet')));
  main.appendChild(h('div', { class: 'grid' }, Store.s.drawings.slice().reverse().map(d => h('figure', { class: 'card', style: { margin: 0, padding: '6px' } }, h('img', { src: d.d, alt: 'drawing', style: { width: '100%', borderRadius: '8px' } }), h('figcaption', { class: 'small' }, Teacher.learnerName(d.l) + ' · ' + new Date(d.t).toLocaleDateString())))));
  return T('drawingsTitle');
}

/* ---------- backup / restore / PIN ---------- */
function tData(main) {
  add(main, [ut('h1', 'dataTitle'), ut('p', 'dataWhy', { class: 'muted' })]);
  const file = h('input', { type: 'file', accept: '.json,application/json', style: { display: 'none' }, onchange: e => { const f = e.target.files[0]; if (!f) return; const r = new FileReader(); r.onload = () => { try { const d = JSON.parse(r.result); if (!d.learners || !d.settings) throw 0; confirmBox(T('restoreSure'), () => { Store.s = Object.assign(Store.s, d); Store.save(); toast(T('saved')); App.applySettings(); go('teacher'); }); } catch (err) { toast(T('badFile')); } }; r.readAsText(f); } });
  add(main, [h('section', { class: 'card stack' },
    h('button', { class: 'btn block', onclick: () => Platform.shareText('leseli-backup-' + today() + '.json', JSON.stringify(Store.s), 'application/json') }, icon('download'), T('backup')),
    h('button', { class: 'btn block', onclick: () => file.click() }, icon('upload'), T('restore')), file,
    h('button', { class: 'btn block', onclick: () => { Store.s.pin = null; Store.save(); App.render(); } }, icon('lock'), T('changePin')),
    h('button', { class: 'btn warn block', onclick: () => confirmBox(T('wipeSure'), () => { localStorage.clear(); try { indexedDB.deleteDatabase('leseli-audio'); } catch (e) {} location.hash = ''; location.reload(); }) }, icon('trash'), T('wipeAll'))),
    h('section', { class: 'card small' }, h('b', {}, T('storageUsed') + ': '), Math.round(JSON.stringify(Store.s).length / 1024) + ' KB · ' + Store.s.events.length + ' ' + T('events'))]);
  return T('dataTitle');
}

/* ---------- starting check / final check (baseline & endline for M&E) ---------- */
const Checks = {
  run(main, kind) {
    const l = Store.learner(); const g = l ? l.grade : Content.grade();
    const qs = (LESELI.checks || {})[g] || [];
    add(main, [h('h1', {}, (kind === 'baseline' ? '📝 ' : '🏁 ') + T(kind)), ut('p', 'checkIntro', { class: 'muted' })]);
    if (!Store.s.current) { main.appendChild(h('p', { class: 'card' }, T('checkNeedsLearner'))); return; }
    const prev = (Store.s.checks[Store.lid()] || {})[kind];
    if (prev) main.appendChild(h('p', { class: 'pill' }, T('doneBefore') + ': ' + prev.score + '/' + prev.max));
    const startBtn = h('button', { class: 'btn primary block', onclick: () => {
      startBtn.remove();
      renderQuiz(main, qs, { noShuffle: true, max: 99, onDone: (score, max, answers, wrap) => {
        const c = Store.s.checks[Store.lid()] || (Store.s.checks[Store.lid()] = {});
        c[kind] = { score, max, answers, grade: g, date: Date.now() }; Store.log('check', { kind, score, max, grade: g }); Store.save();
        wrap.appendChild(h('section', { class: 'card result-big' }, ut('h2', 'thanks'), h('div', { class: 'score' }, score + '/' + max), ut('p', kind === 'baseline' ? 'baselineDone' : 'endlineDone')));
        if (kind === 'endline' && c.baseline) wrap.appendChild(h('p', { class: 'card', style: { textAlign: 'center', fontWeight: 800 } }, T('baseline') + ' ' + c.baseline.score + ' → ' + T('endline') + ' ' + score));
        wrap.appendChild(h('a', { class: 'btn primary block', href: '#/home' }, T('home')));
        confetti();
      } });
    } }, T('start'));
    main.appendChild(startBtn);
  }
};
