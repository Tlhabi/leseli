# Leseli – Technical documentation

Written so the school, or any future student team, can keep Leseli running after the course.

## 1. Architecture

```
┌───────────────── Android phone (Android 5.0+) ─────────────────┐
│  Leseli APK (android/)                                          │
│  ┌──────────────┐   window.LeseliNative (LeseliBridge.java)     │
│  │ WebView      │ ─ text-to-speech, speech recognition,         │
│  │ (app/ served │   share files/APK, vibrate, keep screen on    │
│  │ from assets  │                                               │
│  │ via WebView- │   storage: localStorage (settings, progress,  │
│  │ AssetLoader) │   events) + IndexedDB (voice recordings)       │
│  └──────────────┘                                               │
│  NO INTERNET PERMISSION                                         │
└─────────────────────────────────────────────────────────────────┘
The same app/ folder also runs as a PWA (service worker sw.js) or as one HTML file (dist/).
```

* **No framework and no build step.** Plain HTML, CSS and JavaScript (ES2017) keep it small (about 0.5 MB), fast on cheap phones, and easy for a diploma student to change.
* Content is in **JavaScript files** (`app/content/*.js`), not JSON, so it loads from `file://` and from Android assets without any server.
* Hash routing (`#/lesson/m5-div`) means the Android back button and the browser back button both work.

## 2. Files

| File | Purpose |
|---|---|
| `js/util.js` | Content registry `LESELI`, helpers `L S Q N TF`, DOM helper `h()`, mini-markdown `rich()`, icons |
| `js/i18n.js` | All interface text in English and Sesotho (`STR`), `T()`, bilingual rendering `biText()` |
| `js/store.js` | Local data (`Store`) and audio storage (`AudioDB`, IndexedDB) |
| `js/speech.js` | `Platform` (native bridge or browser), `Speech` (TTS with the Sesotho re-spelling fallback, speech recognition), `Recorder`, `Player` |
| `js/mathsteps.js` | `MS`: worked solutions (add/sub/mul/long division/fractions/rounding/…) and a text parser `MS.solve()` |
| `js/app.js` | Shell, router, home, subjects, lesson, quiz, number pad, badges, me, settings, feedback |
| `js/widgets.js` | 22 interactive tools (`Tools.*`) used by `section.tool` |
| `js/practice.js` | 17 adaptive practice skills (`Skills.*`) |
| `js/tutor.js` | Thuso: intents, BM25-style search over all lessons, dictionary, quiz, voice questions |
| `js/library.js`, `js/games.js` | Library, textbooks, dictionary, stories; Morabaraba (with AI), riddles, memory, spelling, quick maths |
| `js/teacher.js` | PIN, dashboard, learners, inbox, narration, class mode, corrections, lesson packs, M&E/KPIs, SUS, exports, checks |
| `content/*.js` | Lessons (6 subjects × 3 grades), dictionary, stories, riddles/proverbs, baseline/endline checks |

## 3. Adding or changing content

Each lesson is one object:

```js
{ id: 'm5-div', grade: 5, outcome: 'LO 24', hard: true,
  title: L(`English title`, `Sehlooho sa Sesotho`),
  sections: [ S(`Heading`, `Sehlooho`, `Text with **bold**, *italic*, lists "- "`, `Mongolo…`,
                { calc: '7452 / 6', tool: 'stepper', toolOpts: { op: '÷' }, tip: L(`…`, `…`), ex: L(`…`, `…`), fig: '<svg…>' }) ],
  words: [['divide', 'arola']],
  quiz: [ Q(`Question?`, `Potso?`, [['right', 'nepahetse'], ['wrong', 'fosahetse']], 0, `why`, `hobaneng`),
          N(`84 ÷ 4 = ?`, `84 ÷ 4 = ?`, 21),  TF(`Statement`, `Polelo`, true) ],
  practice: 'div' }
```

Then run `node tools/build.js`. It checks every lesson (ids, titles in both languages, quiz answers) and repackages everything.
Teachers without a computer can use **Teacher area → Correct the lessons / Write a new lesson** and send the file to the team.

## 4. Building

```bash
node tools/build.js          # check content, write app/sw.js, copy into android/, make dist/leseli-offline.html
node tools/test-math.js      # 12 000 random checks of the maths engine
cd android && ./gradlew assembleDebug     # needs Android SDK (Android Studio installs it); gradle copies ../app automatically
```

**Without Android Studio:** push to GitHub. `.github/workflows/android.yml` builds `Leseli-debug.apk` and `Leseli.apk`, and `pages.yml` publishes the PWA.

**Release signing (once):**
```bash
keytool -genkey -v -keystore leseli.jks -keyalg RSA -keysize 2048 -validity 10000 -alias leseli
```
Then create `android/keystore.properties` (do not commit it) containing `storeFile=../leseli.jks`, `storePassword=…`, `keyAlias=leseli` and `keyPassword=…`. Keep the keystore safe: updates must be signed with the same key.

## 5. Data model (localStorage key `leseli.v1`)

`settings` · `learners[{id,name,avatar,grade,gender,code,consent}]` · `progress[learnerId]{lessons{id:{read,best,stars,attempts,secs}},stars,days,badges,practice,stories}` ·
`checks[learnerId]{baseline,endline}` · `events[{t,l,e,d}]` (anonymous usage log, capped at 8 000) · `feedback` · `questions` · `reports` · `overrides` · `custom` · `sus` · `classLog` · `pin` (FNV hash) ·
IndexedDB `leseli-audio/clips{id,kind:'question'|'reply'|'narration'|'feedback',blob,secs,key}`.

## 6. Privacy and security

* The APK requests only `RECORD_AUDIO` and `VIBRATE`. It has **no INTERNET permission**, so data cannot leave except through a file a teacher chooses to share.
* Exports use learner codes. The backup file contains nicknames, and the app warns about this.
* The PIN is hashed. It protects against curious learners, not against a determined attacker. Do not store sensitive data.

## 7. Known limitations

* Sesotho TTS voices are rare. The fallback voice is understandable but not native. Teacher narration is the real fix.
* Speech recognition for Sesotho is rarely available offline, so the app falls back to recording for the teacher.
* Thuso cannot answer questions outside the content. It says so and forwards the question to the teacher.
* Data lives on one phone. A phone that is lost or reset loses its data, so make the monthly backup.
