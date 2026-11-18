/* Leseli – voice: read-aloud (text-to-speech), listening (speech-to-text) and voice recording.
   Works three ways:
   1. Inside the Leseli Android app  -> uses the phone's own TextToSpeech + SpeechRecognizer
      through the bridge object window.LeseliNative (see android/.../LeseliBridge.java).
   2. In Chrome on Android / any browser -> Web Speech API.
   3. Nothing available -> buttons explain this politely; teachers can record their own voice.
   Sesotho voices are rare on phones. When there is none we use the closest-sounding voice
   (Swahili, Zulu, Xhosa, Setswana...) and re-spell Lesotho orthography the way it is spoken
   (li -> di, ea -> ya, oa -> wa, tš -> tsh) so the words come out much closer to real Sesotho. */
'use strict';

const Native = window.LeseliNative || null;   // injected by the Android app
const Platform = {
  isApp: !!Native,
  vibrate(p) { try { if (Native && Native.vibrate) Native.vibrate(Array.isArray(p) ? p[0] : p); else if (navigator.vibrate) navigator.vibrate(p); } catch (e) {} },
  keepAwake(on) { try { if (Native && Native.keepScreenOn) Native.keepScreenOn(!!on); else if (on && navigator.wakeLock) navigator.wakeLock.request('screen').then(l => { Platform._lock = l; }).catch(() => {}); else if (!on && Platform._lock) { Platform._lock.release(); Platform._lock = null; } } catch (e) {} },
  /* share or save a text file (CSV reports, content packs, corrections) */
  async shareText(filename, text, mime) {
    mime = mime || 'text/plain';
    if (Native && Native.shareText) { Native.shareText(filename, text, mime); return true; }
    try {
      const file = new File([text], filename, { type: mime });
      if (navigator.canShare && navigator.canShare({ files: [file] })) { await navigator.share({ files: [file], title: filename }); return true; }
    } catch (e) { if (e && e.name === 'AbortError') return false; }
    const a = h('a', { href: URL.createObjectURL(new Blob([text], { type: mime })), download: filename });
    document.body.appendChild(a); a.click(); setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 2000);
    return true;
  },
  async shareBlob(filename, blob) {
    if (Native && Native.shareBase64) { const b64 = await blobToB64(blob); Native.shareBase64(filename, blob.type || 'application/octet-stream', b64); return; }
    try { const f = new File([blob], filename, { type: blob.type }); if (navigator.canShare && navigator.canShare({ files: [f] })) return navigator.share({ files: [f] }); } catch (e) {}
    const a = h('a', { href: URL.createObjectURL(blob), download: filename }); document.body.appendChild(a); a.click(); a.remove();
  },
  shareApp() { if (Native && Native.shareApp) Native.shareApp(); },
  version() { try { return Native && Native.appVersion ? Native.appVersion() : 'web'; } catch (e) { return 'web'; } }
};
function blobToB64(blob) { return new Promise(r => { const fr = new FileReader(); fr.onload = () => r(String(fr.result).split(',')[1]); fr.readAsDataURL(blob); }); }

/* ---------- Sesotho pronunciation helper ---------- */
function sesothoSay(text) {
  return String(text)
    .replace(/[‘’`']/g, '')
    .replace(/tš/gi, 'tsh').replace(/š/gi, 'sh')
    .replace(/\bl(?=[iu])/gi, 'd').replace(/([aeiou\s])l(?=[iu])/gi, '$1d')    // li, lu -> di, du
    .replace(/ea/gi, 'ya').replace(/oa/gi, 'wa').replace(/oe/gi, 'we').replace(/ue/gi, 'we')
    .replace(/\bo(?=[aeiu])/gi, 'w');
}

const Speech = {
  queue: [], token: 0, speaking: false, onState: null, nativeCb: {},
  voices: [],
  /* language order to try for each content language */
  prefs: { st: ['st', 'st-ZA', 'st-LS', 'sw', 'zu', 'xh', 'tn', 'nso', 'en-ZA', 'en'], en: ['en-ZA', 'en-GB', 'en-US', 'en'] },
  init() {
    if ('speechSynthesis' in window) {
      const load = () => { this.voices = speechSynthesis.getVoices() || []; };
      load(); try { speechSynthesis.addEventListener('voiceschanged', load); } catch (e) { speechSynthesis.onvoiceschanged = load; }
    }
    window.LeseliBridge = window.LeseliBridge || {};
    window.LeseliBridge.onSpeech = (id, ev) => { const cb = this.nativeCb[id]; if (cb && (ev === 'done' || ev === 'error')) { delete this.nativeCb[id]; cb(ev); } };
  },
  available() { return !!(Native && Native.speak) || 'speechSynthesis' in window; },
  /* which real voice will be used for Sesotho: 'st' (true Sesotho), other code (stand-in), or null */
  stVoiceInfo() {
    if (Native && Native.bestLang) { try { return Native.bestLang(JSON.stringify(this.prefs.st)); } catch (e) {} }
    const v = this.pickVoice('st'); return v ? v.lang : null;
  },
  pickVoice(lang) {
    const want = Store.s.settings[lang === 'en' ? 'voiceEn' : 'voiceSt'];
    if (want) { const v = this.voices.find(v => v.name === want); if (v) return v; }
    for (const code of this.prefs[lang] || this.prefs.en) {
      const c = code.toLowerCase();
      const v = this.voices.find(v => v.lang.toLowerCase().replace('_', '-') === c) || this.voices.find(v => v.lang.toLowerCase().startsWith(c.split('-')[0] + (c.includes('-') ? '-' : '')));
      if (v) return v;
    }
    return this.voices[0] || null;
  },
  /* speak a list of {text, lang, el} chunks in order, highlighting each element */
  speakChunks(chunks, opts) {
    this.stop();
    if (!this.available()) { toast(T('noVoice')); return; }
    const my = ++this.token; this.speaking = true; this.onState && this.onState(true);
    let i = 0;
    const nextOne = () => {
      if (my !== this.token) return;
      $$('.reading').forEach(e => e.classList.remove('reading'));
      if (i >= chunks.length) { this.speaking = false; this.onState && this.onState(false); opts && opts.onEnd && opts.onEnd(); return; }
      const c = chunks[i++];
      if (c.el) { c.el.classList.add('reading'); try { c.el.scrollIntoView({ block: 'center', behavior: Store.s.settings.reduceMotion ? 'auto' : 'smooth' }); } catch (e) {} }
      this._one(c.text, c.lang || 'en', nextOne);
    };
    nextOne();
  },
  say(text, lang, onEnd) { this.speakChunks(splitSentences(text).map(t => ({ text: t, lang })), { onEnd }); },
  _one(text, lang, done) {
    const st = lang === 'st';
    const rate = Store.s.settings.rate || 0.9;
    if (Native && Native.speak) {
      const id = 'u' + uid();
      this.nativeCb[id] = () => done();
      const sayText = st && !(Native.hasTrueSesotho && Native.hasTrueSesotho()) ? sesothoSay(text) : text;
      try { Native.speak(sayText, JSON.stringify(this.prefs[st ? 'st' : 'en']), rate, id); } catch (e) { done(); }
      return;
    }
    try {
      const u = new SpeechSynthesisUtterance();
      const v = this.pickVoice(st ? 'st' : 'en');
      const trueSt = v && /^st/i.test(v.lang);
      u.text = st && !trueSt ? sesothoSay(text) : text;
      if (v) { u.voice = v; u.lang = v.lang; }
      u.rate = rate; u.pitch = 1;
      let finished = false; const fin = () => { if (!finished) { finished = true; done(); } };
      u.onend = fin; u.onerror = fin;
      speechSynthesis.speak(u);
      // Android Chrome sometimes never fires onend: guard with a timer based on length
      setTimeout(fin, 1500 + text.length * 110 / rate);
    } catch (e) { done(); }
  },
  stop() {
    this.token++; this.speaking = false;
    try { if (Native && Native.stop) Native.stop(); else if ('speechSynthesis' in window) speechSynthesis.cancel(); } catch (e) {}
    $$('.reading').forEach(e => e.classList.remove('reading'));
    Player.stop();
    this.onState && this.onState(false);
  },

  /* ---------- listening (speech to text) ---------- */
  canListen() { return !!(Native && Native.listen) || !!(window.SpeechRecognition || window.webkitSpeechRecognition); },
  listen(lang) {
    return new Promise((resolve, reject) => {
      if (Native && Native.listen) {
        window.LeseliBridge.onListen = (text, err) => err ? reject(new Error(err)) : resolve(text || '');
        try { Native.listen(lang === 'st' ? 'st-ZA' : 'en-ZA'); } catch (e) { reject(e); }
        return;
      }
      const R = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (!R) return reject(new Error('unsupported'));
      const r = new R(); r.lang = lang === 'st' ? 'st-ZA' : 'en-ZA'; r.interimResults = false; r.maxAlternatives = 1;
      let got = false;
      r.onresult = e => { got = true; resolve(e.results[0][0].transcript); };
      r.onerror = e => reject(new Error(e.error || 'error'));
      r.onend = () => { if (!got) reject(new Error('no-speech')); };
      try { r.start(); } catch (e) { reject(e); }
    });
  }
};

/* ---------- recording voice (questions for the teacher, teacher narration, feedback) ---------- */
const Recorder = {
  rec: null, chunks: [], stream: null, started: 0,
  supported() { return !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia && window.MediaRecorder); },
  async start() {
    Speech.stop();
    this.stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const type = ['audio/webm;codecs=opus', 'audio/webm', 'audio/ogg', 'audio/mp4'].find(t => MediaRecorder.isTypeSupported && MediaRecorder.isTypeSupported(t));
    this.rec = new MediaRecorder(this.stream, type ? { mimeType: type, audioBitsPerSecond: 24000 } : undefined);
    this.chunks = []; this.started = Date.now();
    this.rec.ondataavailable = e => { if (e.data && e.data.size) this.chunks.push(e.data); };
    this.rec.start();
  },
  stop() {
    return new Promise(res => {
      if (!this.rec) return res(null);
      this.rec.onstop = () => {
        const blob = new Blob(this.chunks, { type: this.rec.mimeType || 'audio/webm' });
        const secs = Math.round((Date.now() - this.started) / 1000);
        this.stream.getTracks().forEach(t => t.stop()); this.rec = null; this.stream = null;
        res({ blob, secs });
      };
      this.rec.stop();
    });
  }
};

/* a single shared audio player for recordings */
const Player = {
  a: null, url: null,
  play(blob, onEnd) {
    this.stop();
    this.url = URL.createObjectURL(blob); this.a = new Audio(this.url);
    this.a.onended = () => { this.stop(); onEnd && onEnd(); };
    this.a.play().catch(() => { onEnd && onEnd(); });
  },
  stop() { if (this.a) { try { this.a.pause(); } catch (e) {} this.a = null; } if (this.url) { URL.revokeObjectURL(this.url); this.url = null; } }
};

/* A record button widget. onSaved({blob,secs}) */
function recordButton(labelKey, onSaved, opts) {
  opts = opts || {};
  const b = h('button', { class: 'btn rec-btn ' + (opts.cls || ''), type: 'button' }, icon('mic'), h('span', {}, T(labelKey)));
  let on = false, timer = null;
  b.addEventListener('click', async () => {
    if (!Recorder.supported()) { toast(T('noRecord')); return; }
    if (!on) {
      try { await Recorder.start(); } catch (e) { toast(T('micBlocked')); return; }
      on = true; b.classList.add('on'); b.setAttribute('aria-pressed', 'true');
      const t0 = Date.now(); const span = b.querySelector('span');
      timer = setInterval(() => { span.textContent = T('recording') + ' ' + Math.round((Date.now() - t0) / 1000) + 's'; if (Date.now() - t0 > (opts.max || 90) * 1000) b.click(); }, 500);
      Platform.vibrate(40);
    } else {
      clearInterval(timer); on = false; b.classList.remove('on'); b.setAttribute('aria-pressed', 'false');
      b.querySelector('span').textContent = T(labelKey);
      const r = await Recorder.stop(); Platform.vibrate([30, 60, 30]);
      if (r && r.blob.size > 500) onSaved(r);
    }
  });
  return b;
}
