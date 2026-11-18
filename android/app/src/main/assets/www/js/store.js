/* Local storage only. Nothing leaves the phone unless a teacher exports it.
   - localStorage: settings, learner nicknames, progress, anonymous usage events (for M&E)
   - IndexedDB: voice recordings (learner questions, teacher narration, voice feedback) */
'use strict';
const KEY = 'leseli.v1';
const DEFAULTS = () => ({
  settings: { lang: 'both', size: 1, contrast: false, easyRead: false, reduceMotion: false, vision: false, hearing: false,
    autoRead: false, rate: 0.9, voiceEn: '', voiceSt: '', firstRun: true },
  learners: [], current: null,
  progress: {},       // learnerId -> {lessons:{id:{read,best,attempts,stars,secs,tool}}, stars, days:[], badges:[], practice:{level,right,wrong}, stories:{}}
  checks: {},         // learnerId -> {baseline:{score,max,date,answers}, endline:{...}}
  events: [],         // {t, l, e, d} anonymous usage log
  feedback: [],       // {t,l,rating,easy,note,audio}
  reports: [],        // content mistake reports
  drawings: [],       // small data-URL thumbnails (capped)
  pin: null, packs: [], device: uid(),
  overrides: {},      // teacher corrections: lessonId -> {sections:{i:{h:{en,st},p:{en,st}}}, title}
  custom: [],         // lessons written by teachers on this phone (shareable as content packs)
  questions: [],      // learners' typed questions for the teacher {id,t,l,text,lesson,answered,reply}
  sus: [],            // teacher usability questionnaire results
  classLog: []        // class-mode sessions {t, lesson, mins, learners}
});
const Store = {
  s: null,
  load() {
    try { const raw = localStorage.getItem(KEY); this.s = raw ? Object.assign(DEFAULTS(), JSON.parse(raw)) : DEFAULTS(); }
    catch (e) { this.s = DEFAULTS(); }
    this.s.settings = Object.assign(DEFAULTS().settings, this.s.settings);
    return this.s;
  },
  save() {
    try { localStorage.setItem(KEY, JSON.stringify(this.s)); }
    catch (e) { // storage full: drop the oldest half of events and drawings and retry
      this.s.events = this.s.events.slice(-Math.floor(this.s.events.length / 2)); this.s.drawings = this.s.drawings.slice(-5);
      try { localStorage.setItem(KEY, JSON.stringify(this.s)); } catch (e2) { console.warn('storage full'); }
    }
  },
  set(k, v) { this.s.settings[k] = v; this.save(); },
  learner() { return this.s.learners.find(l => l.id === this.s.current) || null; },
  lid() { return this.s.current || 'guest'; },
  prog(lid) {
    lid = lid || this.lid();
    const p = this.s.progress[lid] || (this.s.progress[lid] = { lessons: {}, stars: 0, days: [], badges: [], practice: { level: 1, right: 0, wrong: 0 }, stories: {} });
    p.practice = p.practice || { level: 1, right: 0, wrong: 0 }; p.stories = p.stories || {};
    return p;
  },
  lesson(id, lid) { const p = this.prog(lid); return p.lessons[id] || (p.lessons[id] = { read: false, best: 0, attempts: 0, stars: 0, secs: 0, tool: false }); },
  addStars(n) { const p = this.prog(); p.stars += n; this.save(); },
  touchDay() { const p = this.prog(); const d = today(); if (!p.days.includes(d)) { p.days.push(d); if (p.days.length > 400) p.days.shift(); } },
  streak() {
    const days = new Set(this.prog().days); let n = 0; const d = new Date();
    while (days.has(d.toISOString().slice(0, 10))) { n++; d.setDate(d.getDate() - 1); }
    return n;
  },
  log(e, d) {
    this.s.events.push({ t: Date.now(), l: this.lid(), e, d: d || null });
    if (this.s.events.length > 8000) this.s.events.splice(0, 1000);
    this.save();
  },
  addLearner(o) { const l = Object.assign({ id: uid(), created: Date.now(), code: 'L' + String(this.s.learners.length + 1).padStart(2, '0') }, o); this.s.learners.push(l); this.s.current = l.id; this.save(); return l; },
  removeLearner(id) { this.s.learners = this.s.learners.filter(l => l.id !== id); delete this.s.progress[id]; delete this.s.checks[id]; if (this.s.current === id) this.s.current = null; this.save(); },
  badge(id) { const p = this.prog(); if (!p.badges.includes(id)) { p.badges.push(id); this.save(); return true; } return false; }
};

/* ---------- IndexedDB for audio ---------- */
const AudioDB = {
  db: null,
  open() {
    if (this.db) return Promise.resolve(this.db);
    return new Promise((res, rej) => {
      if (!window.indexedDB) return rej(new Error('no indexedDB'));
      const r = indexedDB.open('leseli-audio', 1);
      r.onupgradeneeded = () => { const s = r.result.createObjectStore('clips', { keyPath: 'id' }); s.createIndex('kind', 'kind'); };
      r.onsuccess = () => { this.db = r.result; res(this.db); };
      r.onerror = () => rej(r.error);
    });
  },
  async tx(mode, fn) {
    const db = await this.open();
    return new Promise((res, rej) => { const t = db.transaction('clips', mode); const st = t.objectStore('clips'); const out = fn(st); t.oncomplete = () => res(out && out.result !== undefined ? out.result : out); t.onerror = () => rej(t.error); });
  },
  put(rec) { rec.id = rec.id || uid(); rec.created = rec.created || Date.now(); return this.tx('readwrite', st => st.put(rec)).then(() => rec); },
  get(id) { return this.tx('readonly', st => st.get(id)); },
  del(id) { return this.tx('readwrite', st => st.delete(id)); },
  async all(kind) {
    const db = await this.open();
    return new Promise((res, rej) => {
      const out = []; const t = db.transaction('clips', 'readonly'); const st = t.objectStore('clips');
      const req = kind ? st.index('kind').openCursor(IDBKeyRange.only(kind)) : st.openCursor();
      req.onsuccess = () => { const c = req.result; if (c) { out.push(c.value); c.continue(); } else res(out.sort((a, b) => b.created - a.created)); };
      req.onerror = () => rej(req.error);
    });
  },
  /* teacher narration lookup: key = lessonId + ':' + sectionIndex + ':' + lang */
  narration(key) { return this.all('narration').then(list => list.find(r => r.key === key) || null).catch(() => null); }
};
