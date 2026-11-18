# Leseli · *Ho ithuta ho sa hloke inthanete*

**Offline learning for Grades 5–7 in Sesotho and English, built with Moshoeshoe II Primary School (Maseru, Lesotho).**
DIIC3110 ICT4D group project, Limkokwing University of Creative Technology, 2026. Deliverable B (working solution).

*Leseli* means "light". The app runs on any Android phone (Android 5.0 or newer) with **no internet, no data and no
computer lab**, because that is the situation the school told us about. It is free and open source under the MIT licence.

---

## Why we built it this way (from the needs assessment)

| What the school told us (questionnaire, 30/10/2026) | What Leseli does about it |
|---|---|
| No computers, tablets, projector, printer or radio. Only teachers have phones at school. | It runs on **one Android phone**. **Class mode** lets a teacher teach the whole class from that phone, and several learners can share one phone through **learner profiles**. |
| Electricity only in the office, internet only on phone data, and no budget for data or repairs | **100% offline.** The APK does not even ask for internet permission. Content is about 0.5 MB, and the app can be passed **phone-to-phone over Bluetooth** (Me → Share Leseli). |
| 3–4 learners share one textbook. Books stay at school. | **Textbooks** for every subject and grade, a **word book** with 490+ words, **story books**, and printable chapters. |
| Learners struggle most with **Mathematics and Science** | 22 maths lessons, **endless adaptive practice**, and a **step-by-step solver** (long division, column methods, fractions). Interactive science experiments. |
| Learners named the hard topics: long division ("car method"), multiplication, addition, subtraction, multiples, angles, animal classification, oxygen and gases, English letters, drawing, history | Each one has its own lesson marked ⚑ "learners said this is hard", plus a tool: bus-stop stepper, times-table explorer, protractor, sorting game, candle-and-jar experiment, drawing pad with face and house guides, and a timeline. |
| Material wanted: digital textbooks, worksheets, videos, Sesotho stories. **Language: both.** | Every lesson is in **Sesotho, English or both** (one-tap switch). There are animated tools in place of video (videos would be too big for phones), Sesotho stories, riddles and proverbs. |
| "Be careful of **vulnerable students** and their levels of understanding." Disabled learners need the most support. | **Seeing support** (big text, everything read aloud, TalkBack-friendly), **hearing support** (flash and vibration instead of sound, everything written), easy-read spacing, high contrast, and the teacher's own recorded voice. |
| Teachers: "a little" comfortable with computers, comfortable with smartphones. 6 want training in the school holidays. | Phone-first design, a teacher guide and a **1-hour training plan** in Sesotho and English (`docs/`). |
| Success in 3 months = "improved academic results" | A built-in **starting check and final check** (baseline/endline), **KPIs**, and CSV exports for the M&E report |
| Classmates asked for: AI help in every module, recorded voice questions, notes for every module, books, dictionaries, textbooks | **Thuso**, the offline helper in every lesson, answers maths, words and topic questions. Voice questions are typed by speech recognition or **recorded for the teacher**. There are notes, a dictionary and textbooks. |

## What is inside

- **80 lessons** across all 6 learning areas of the Lesotho Integrated Curriculum, for **Grades 5, 6 and 7** (Grade 5 mapped to the syllabus learning-outcome numbers), with **301 quiz questions**
- **Thuso** 🦉, an offline helper. It is honest about what it is: not a cloud chatbot (a phone without data cannot run one, and children's questions must not leave the phone) but a combination of a step-by-step maths solver, a bilingual dictionary and a search engine over all the lessons. When it cannot help, it saves the question, typed or as a **voice recording**, for the teacher.
- **Read aloud** on every page, with the sentence highlighted as it is read. Most phones have no Sesotho voice, so Leseli uses the closest voice (Swahili, Zulu, …) and **re-spells Lesotho orthography as it is spoken** (*lumela → dumela, joang → jwang, uena → wena*). Teachers can also **record real Sesotho narration**.
- **17 maths practice skills** that adapt as the learner goes (3 right moves the level up, 2 wrong moves it down) and show the full worked solution after a mistake
- **22 interactive tools**: place value, fraction bars, protractor, triangle, times table, column/long-division stepper, symmetry, drawing pad, colour mixing, sorting game, shop (Maloti), thermometer, rain gauge, circle, cuboid, Venn diagram, number line, candle experiment, circuit, profit calculator, balance scale, Sesotho syllable builder
- **Library**: 7 illustrated story books (with comprehension questions), a word book (495 words, 18 categories), 18 textbooks (6 subjects × 3 grades), 18 riddles (*lilotho*) and 10 proverbs (*maele*)
- **Games**: **Morabaraba** (vs the phone or 2 players), riddles, word match, spelling bee, quick maths
- **Teacher area** (PIN): dashboard, learners, voice-question inbox with text or voice replies, recording lessons in the teacher's voice, class mode, correcting any lesson text, writing new lessons and **sharing lesson packs** by WhatsApp or Bluetooth, an M&E toolkit with 9 KPIs, a SUS survey in Sesotho and English, CSV exports, and backup/restore
- **Privacy by design**: nicknames only, a guardian-consent check before a learner is added, no internet permission, and exports that use codes (L01, L02 …) and never names

## Three ways to install

1. **Android app (APK)**: push this folder to GitHub. The workflow in `.github/workflows/android.yml` builds `Leseli.apk` automatically (Actions tab → latest run → *Leseli-APK*). You can also open `android/` in Android Studio and press ▶. Install it on a phone, then share it to other phones from inside the app with Bluetooth.
2. **Web app (PWA)**: GitHub Pages publishes `app/` (`pages.yml`). Open the link once in Chrome on Android and choose *Add to Home screen*. After that it works offline.
3. **One file**: `dist/leseli-offline.html` (about 500 KB) can be sent by WhatsApp and opened in Chrome. This is good for a quick demo. Recordings need option 1 or 2.

To try it on a computer: `cd app && python3 -m http.server 8000`, then open http://localhost:8000 (use the phone view in the browser's developer tools).

## Folder map

```
app/            the whole app (HTML/CSS/JS, no frameworks, no build step needed)
  js/           engine: app shell, speech, maths solver, Thuso, practice, tools, library, games, teacher/M&E
  content/      lessons and books as plain JS data – easy for anyone to edit
android/        Android Studio project (WebView shell + native text-to-speech, speech recognition, sharing)
tools/          build.js (checks content, makes sw.js, copies into Android, single-file version), test-math.js
docs/           user guide, teacher training, technical guide, M&E toolkit, consent forms, Sesotho review checklist
dist/           leseli-offline.html (generated)
.github/        automatic APK build and web publishing
```

## Before the pilot: honest to-do list

- **Sesotho review**: the Sesotho text was written carefully in Lesotho orthography, but it **must be checked by Moshoeshoe II teachers** before use with learners. Use `docs/SESOTHO-REVIEW.md` and the in-app *Teacher area → Correct the lessons*.
- **Build the APK** once through GitHub Actions or Android Studio. It could not be compiled in the environment where it was written. The Java was checked against the Android API signatures, and the web app was tested end-to-end on a 360×740 phone screen.
- **Run the pilot** with 8–15 users and get **guardian consent** (`docs/CONSENT-FORMS.md`) before learners take part.
- Record the real feedback in `CHANGELOG.md` (iteration 3 onward). Do not invent results.

Licence: MIT (code). Lesson text is CC BY 4.0, free to adapt for any school.
