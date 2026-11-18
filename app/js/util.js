/* Leseli – shared helpers and the content registry.
   Everything is plain JavaScript (no build step, no internet) so it runs on
   cheap Android phones, inside the Android WebView wrapper, or as a single file. */
'use strict';

/* ---------- content registry ---------- */
const LESELI = {
  version: '1.0.0',
  subjects: [],          // {id,title:{en,st},area,icon,color,blurb}
  lessons: {},           // id -> lesson
  bySubject: {},         // subjectId -> [lessonIds]
  words: [],             // dictionary entries {en,st,cat}
  stories: [],
  checks: null,          // baseline / endline diagnostic
  addSubject(s) { if (!this.subjects.find(x => x.id === s.id)) this.subjects.push(s); this.bySubject[s.id] = this.bySubject[s.id] || []; },
  addLessons(subjectId, list) {
    list.forEach((l, i) => {
      l.subject = subjectId; l.order = l.order ?? (this.bySubject[subjectId].length + i);
      this.lessons[l.id] = l;
      if (!this.bySubject[subjectId].includes(l.id)) this.bySubject[subjectId].push(l.id);
    });
  },
  subject(id) { return this.subjects.find(s => s.id === id); },
  lessonsOf(id) { return (this.bySubject[id] || []).map(x => this.lessons[x]); }
};

/* content-writing helpers (kept tiny so the content files stay readable) */
const L = (en, st) => ({ en, st: st ?? en });
const S = (hEn, hSt, pEn, pSt, extra) => Object.assign({ h: L(hEn, hSt), p: L(pEn, pSt) }, extra || {});
// multiple choice: options can be strings (same in both languages) or [en, st] pairs
const Q = (qEn, qSt, o, a, xEn, xSt) => ({ q: L(qEn, qSt), o: o.map(v => Array.isArray(v) ? L(v[0], v[1]) : L(String(v), String(v))), a, x: xEn ? L(xEn, xSt) : null });
// typed numeric answer
const N = (qEn, qSt, n, xEn, xSt) => ({ q: L(qEn, qSt), n, x: xEn ? L(xEn, xSt) : null });
// true / false
const TF = (qEn, qSt, truth, xEn, xSt) => ({ q: L(qEn, qSt), o: [L('True', "Ke 'nete"), L('False', "Ha se 'nete")], a: truth ? 0 : 1, x: xEn ? L(xEn, xSt) : null });

/* ---------- DOM helper ---------- */
function h(tag, props, ...kids) {
  const el = document.createElement(tag);
  if (props) for (const k in props) {
    const v = props[k];
    if (v === null || v === undefined || v === false) continue;
    if (k === 'class') el.className = v;
    else if (k === 'html') el.innerHTML = v;
    else if (k === 'text') el.textContent = v;
    else if (k === 'style' && typeof v === 'object') Object.assign(el.style, v);
    else if (k.startsWith('on') && typeof v === 'function') el.addEventListener(k.slice(2).toLowerCase(), v);
    else if (k === 'dataset') Object.assign(el.dataset, v);
    else el.setAttribute(k, v === true ? '' : v);
  }
  add(el, kids);
  return el;
}
function add(el, kids) {
  for (const k of kids.flat(Infinity)) {
    if (k === null || k === undefined || k === false) continue;
    el.appendChild(k instanceof Node ? k : document.createTextNode(String(k)));
  }
  return el;
}
function svgEl(markup) { const d = document.createElement('div'); d.innerHTML = markup.trim(); return d.firstChild; }
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

/* very small markup: **bold**, `code`, lines starting "- " become lists, blank line = new paragraph */
function rich(text) {
  const blocks = String(text).split(/\n\s*\n/);
  return blocks.map(b => {
    const lines = b.split('\n');
    if (lines.every(l => /^\s*[-•]\s+/.test(l))) {
      return '<ul>' + lines.map(l => '<li>' + inline(l.replace(/^\s*[-•]\s+/, '')) + '</li>').join('') + '</ul>';
    }
    if (lines.every(l => /^\s*\d+[.)]\s+/.test(l))) {
      return '<ol>' + lines.map(l => '<li>' + inline(l.replace(/^\s*\d+[.)]\s+/, '')) + '</li>').join('') + '</ol>';
    }
    return '<p>' + lines.map(inline).join('<br>') + '</p>';
  }).join('');
  function inline(s) {
    return esc(s).replace(/\*\*(.+?)\*\*/g, '<b>$1</b>').replace(/(^|[^*\w])\*([^*\n]+?)\*(?=[^*\w]|$)/g, '$1<i>$2</i>').replace(/`(.+?)`/g, '<code>$1</code>');
  }
}
const plain = text => String(text).replace(/\*\*|\*|`/g, '').replace(/^\s*[-•]\s+/gm, '').replace(/\s+/g, ' ').trim();
const splitSentences = text => plain(text).match(/[^.!?]+[.!?]*\s*/g)?.map(s => s.trim()).filter(Boolean) || [];

/* ---------- misc ---------- */
const uid = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
const rnd = (a, b) => a + Math.floor(Math.random() * (b - a + 1));
const pick = arr => arr[Math.floor(Math.random() * arr.length)];
const shuffle = arr => { const a = arr.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
const fmt = n => Number(n).toLocaleString('en-ZA').replace(/,/g, ' ').replace(/ /g, ' ');
const today = () => new Date().toISOString().slice(0, 10);
function hashPin(pin) { let x = 2166136261; for (const c of 'leseli:' + pin) { x ^= c.charCodeAt(0); x = Math.imul(x, 16777619); } return (x >>> 0).toString(16); }
function vibrate(p) { try { if (navigator.vibrate) navigator.vibrate(p); } catch (e) {} }

/* ---------- icons (simple line icons, drawn for Leseli) ---------- */
const ICON = {
  home: '<path d="M3 11l9-8 9 8"/><path d="M5 10v10h5v-6h4v6h5V10"/>',
  book: '<path d="M4 4h6a3 3 0 013 3v13a2 2 0 00-2-2H4z"/><path d="M20 4h-6a3 3 0 00-3 3v13a2 2 0 012-2h7z"/>',
  library: '<path d="M4 3h4v18H4zM10 3h4v18h-4z"/><path d="M16 4l4 1-3 16-4-1z"/>',
  chat: '<path d="M4 5h16v11H9l-5 4z"/><circle cx="9" cy="10.5" r=".8"/><circle cx="12" cy="10.5" r=".8"/><circle cx="15" cy="10.5" r=".8"/>',
  user: '<circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 4-6 8-6s8 2 8 6"/>',
  speaker: '<path d="M4 9h4l5-4v14l-5-4H4z"/><path d="M16 9a4 4 0 010 6M18.5 6.5a8 8 0 010 11"/>',
  stop: '<rect x="6" y="6" width="12" height="12" rx="2"/>',
  mic: '<rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0014 0M12 18v3"/>',
  gear: '<circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M4.9 19.1L7 17M17 7l2.1-2.1"/>',
  back: '<path d="M15 5l-7 7 7 7"/>',
  next: '<path d="M9 5l7 7-7 7"/>',
  star: '<path d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9z"/>',
  check: '<path d="M4 12l5 5L20 6"/>',
  x: '<path d="M6 6l12 12M18 6L6 18"/>',
  play: '<path d="M7 4l13 8-13 8z"/>',
  pause: '<path d="M7 4h3v16H7zM14 4h3v16h-3z"/>',
  rec: '<circle cx="12" cy="12" r="6"/>',
  search: '<circle cx="11" cy="11" r="6"/><path d="M20 20l-4.5-4.5"/>',
  print: '<path d="M6 9V3h12v6M6 18H4v-7h16v7h-2"/><rect x="6" y="14" width="12" height="7"/>',
  download: '<path d="M12 3v12M7 10l5 5 5-5M4 20h16"/>',
  upload: '<path d="M12 21V9M7 14l5-5 5 5M4 4h16"/>',
  lock: '<rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V7a4 4 0 018 0v4"/>',
  globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18"/>',
  eye: '<path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',
  ear: '<path d="M7 10a5 5 0 0110 0c0 4-4 4-4 8a3 3 0 01-6 0"/><path d="M10 10a2 2 0 014 0"/>',
  text: '<path d="M4 7V5h10v2M9 5v14M7 19h4M14 12h6M17 12v7M15.5 19h3"/>',
  bulb: '<path d="M9 18h6M10 21h4M12 3a6 6 0 00-4 10.5c1 1 1.5 2 1.5 3h5c0-1 .5-2 1.5-3A6 6 0 0012 3z"/>',
  game: '<rect x="3" y="7" width="18" height="11" rx="4"/><path d="M8 10v5M5.5 12.5h5M15 11h.01M17.5 13.5h.01"/>',
  chart: '<path d="M4 20V4M4 20h16M8 16v-5M12 16V8M16 16v-3"/>',
  pencil: '<path d="M4 20l1-5L16 4l4 4L9 19z"/><path d="M14 6l4 4"/>',
  trash: '<path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13"/>',
  heart: '<path d="M12 20s-8-5-8-11a4.5 4.5 0 018-3 4.5 4.5 0 018 3c0 6-8 11-8 11z"/>',
  flag: '<path d="M5 21V4M5 4h12l-2 4 2 4H5"/>',
  help: '<circle cx="12" cy="12" r="9"/><path d="M9.5 9.5a2.5 2.5 0 015 0c0 2-2.5 2-2.5 4M12 17h.01"/>',
  share: '<circle cx="6" cy="12" r="2.5"/><circle cx="18" cy="6" r="2.5"/><circle cx="18" cy="18" r="2.5"/><path d="M8.2 10.8l7.6-3.6M8.2 13.2l7.6 3.6"/>',
  refresh: '<path d="M20 11a8 8 0 10-2.3 5.7M20 4v7h-7"/>',
  send: '<path d="M4 12l16-8-6 16-2-7z"/>',
  hand: '<path d="M8 13V5a1.5 1.5 0 013 0v6M11 11V4a1.5 1.5 0 013 0v7M14 11V5.5a1.5 1.5 0 013 0V14c0 4-3 7-7 7-3 0-5-2-6-4l-2-4a1.5 1.5 0 012.5-1.5L8 13"/>',
  plus: '<path d="M12 5v14M5 12h14"/>'
};
function icon(name, label, size) {
  const s = size || 24;
  return svgEl(`<svg class="ic" width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" ${label ? `role="img" aria-label="${esc(label)}"` : 'aria-hidden="true"'}>${ICON[name] || ''}</svg>`);
}

/* the Leseli logo: a mokorotlo (Basotho hat) with rays of light */
const LOGO = `<svg viewBox="0 0 64 64" aria-hidden="true"><g stroke="#f6b73c" stroke-width="3" stroke-linecap="round"><path d="M32 4v7M12 12l5 5M52 12l-5 5M4 30h7M53 30h7"/></g><path d="M32 14 L14 48 Q32 56 50 48 Z" fill="#f6b73c" stroke="#7a4b12" stroke-width="2"/><path d="M20 37 Q32 42 44 37" stroke="#7a4b12" stroke-width="2.4" fill="none"/><path d="M17 43 Q32 49 47 43" stroke="#7a4b12" stroke-width="2.4" fill="none"/><path d="M28 18 Q32 12 36 18 Q32 16 28 18z" fill="#7a4b12"/><circle cx="32" cy="12" r="3" fill="#7a4b12"/></svg>`;
