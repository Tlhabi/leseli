/* English – Grades 5–7. Grade 5 outcomes from syllabus pages 30–31 (Study skills, Language structure,
   Language use). A learner said "letters" (spelling/capital letters) are hard. Explanations are given in
   Sesotho too, so learners understand the English rule in their home language. */
'use strict';
LESELI.addLessons('english', [
/* ======================= GRADE 5 ======================= */
{ id: 'e5-nouns', grade: 5, outcome: 'LO 9, 10, 11', title: L(`Nouns: proper, common, compound, plural`, `Mabitso (nouns): a ikhethileng, a tloaelehileng, a kopantsoeng, bongata`),
  sections: [
    S(`Common and proper nouns`, `Mabitso a tloaelehileng le a ikhethileng`, `A **noun** names a person, place, animal or thing. **Common nouns** are general: *girl, river, school*. **Proper nouns** are special names and always start with a **capital letter**: *Palesa, the Senqu River, Moshoeshoe II Primary School, Monday, Lesotho*.`, `**Noun** (lebitso) le reha motho, sebaka, phoofolo kapa ntho. **Common nouns** a akaretsang: *girl, river, school*. **Proper nouns** ke mabitso a ikhethileng 'me kamehla a qala ka **tlhaku e kholo**: *Palesa, the Senqu River, Moshoeshoe II Primary School, Monday, Lesotho*.`),
    S(`Compound nouns`, `Mabitso a kopantsoeng`, `Two words joined to make one noun: *foot + ball = football*, *class + room = classroom*, *sun + flower = sunflower*, *bus stop*, *mother-in-law*.`, `Mantsoe a mabeli a kopantsoeng ho etsa lebitso le le leng: *foot + ball = football*, *class + room = classroom*, *sun + flower = sunflower*, *bus stop*, *mother-in-law*.`),
    S(`Singular and plural`, `Bonngoe le bongata`, `Most nouns add **-s**: book → books. Words ending in s, x, sh, ch add **-es**: box → boxes, church → churches. Consonant + y → **-ies**: baby → babies. Some are irregular: child → **children**, man → **men**, woman → **women**, tooth → **teeth**, mouse → **mice**, sheep → **sheep**.`, `Mabitso a mangata a eketsa **-s**: book → books. A felang ka s, x, sh, ch a eketsa **-es**: box → boxes. Konsonante + y → **-ies**: baby → babies. A mang ha a latele molao: child → **children**, man → **men**, woman → **women**, tooth → **teeth**, mouse → **mice**, sheep → **sheep**.`)
  ],
  words: [['noun', 'lebitso'], ['capital letter', 'tlhaku e kholo'], ['plural', 'bongata'], ['singular', 'bonngoe'], ['child / children', 'ngoana / bana']],
  quiz: [
    Q(`Which is a proper noun?`, `Ke efe e leng proper noun?`, ['Maseru', 'city', 'teacher', 'mountain'], 0),
    Q(`The plural of "child" is…`, `Bongata ba "child" ke…`, ['childs', 'children', 'childes', 'childrens'], 1),
    Q(`The plural of "box" is…`, `Bongata ba "box" ke…`, ['boxs', 'boxes', 'boxies', 'box'], 1),
    Q(`Which is a compound noun?`, `Ke efe e leng compound noun?`, ['classroom', 'class', 'quickly', 'blue'], 0),
    Q(`Choose the correct sentence.`, `Khetha polelo e nepahetseng.`, ['we live in lesotho.', 'We live in Lesotho.', 'We live in lesotho.', 'we live in Lesotho.'], 1)
  ] },

{ id: 'e5-tenses', grade: 5, outcome: 'LO 12', title: L(`Past, present and future tenses`, `Linako tsa leetsi: e fetileng, ea joale le e tlang`),
  sections: [
    S(`Three times`, `Linako tse tharo`, `- **Present**: now or every day — *I **walk** to school. She **walks** to school.*\n- **Past**: already happened — *I **walked** to school yesterday.*\n- **Future**: will happen — *I **will walk** to school tomorrow.*`, `- **Present** (joale): hona joale kapa kamehla — *I **walk** to school.*\n- **Past** (e fetileng): ho se ho etsahetse — *I **walked** to school yesterday.*\n- **Future** (e tlang): ho tla etsahala — *I **will walk** to school tomorrow.*`),
    S(`Irregular past tense`, `Past tense e sa lateleng molao`, `Many common verbs do not add -ed: go → **went**, eat → **ate**, see → **saw**, come → **came**, run → **ran**, write → **wrote**, take → **took**, buy → **bought**, sing → **sang**. Learn them by saying them aloud!`, `Maetsi a mangata a tloaelehileng ha a eketse -ed: go → **went**, eat → **ate**, see → **saw**, come → **came**, run → **ran**, write → **wrote**, take → **took**, buy → **bought**, sing → **sang**. A ithute ka ho a bua ka lentsoe!`)
  ],
  words: [['yesterday', 'maobane'], ['today', 'kajeno'], ['tomorrow', 'hosane'], ['verb', 'leetsi']],
  quiz: [
    Q(`Yesterday I ___ to the shop.`, `Maobane ___ lebenkeleng.`, ['go', 'went', 'will go', 'goes'], 1),
    Q(`Tomorrow we ___ football.`, `Hosane re ___ bolo.`, ['played', 'play', 'will play', 'plays'], 2),
    Q(`She ___ water every morning.`, `O ___ metsi hoseng ho hong le ho hong.`, ['drink', 'drinks', 'drank', 'drinking'], 1),
    Q(`The past tense of "eat" is…`, `Past tense ea "eat" ke…`, ['eated', 'ate', 'eaten', 'eats'], 1),
    Q(`The past tense of "buy" is…`, `Past tense ea "buy" ke…`, ['buyed', 'bought', 'brought', 'buys'], 1)
  ] },

{ id: 'e5-adjectives', grade: 5, outcome: 'LO 13, 15, 16, 20', title: L(`Adjectives, articles and pronouns`, `Mahlalosi, a/an/the le liemeli (pronouns)`),
  sections: [
    S(`Comparing with adjectives`, `Ho bapisa ka mahlalosi`, `Short adjectives: *tall → taller → tallest*, *cold → colder → coldest*, *big → bigger → biggest*. Long adjectives use more/most: *beautiful → more beautiful → most beautiful*. Irregular: *good → better → best*, *bad → worse → worst*.\n*Thabana Ntlenyana is the **highest** mountain in Southern Africa.*`, `Mahlalosi a makhutšoanyane: *tall → taller → tallest*. A malelele a sebelisa more/most: *beautiful → more beautiful → most beautiful*. A sa lateleng molao: *good → better → best*, *bad → worse → worst*.\n*Thabana Ntlenyana is the **highest** mountain in Southern Africa.* (Ke thaba e telele ka ho fetisisa Afrika Boroa.)`),
    S(`a, an, the`, `a, an, the`, `Use **a** before a consonant sound: *a cow, a book*. Use **an** before a vowel sound: *an egg, an orange, an hour* (the h is silent!). Use **the** for a particular thing we already know: *the sun, the teacher in our class*.`, `Sebelisa **a** pele ho molumo oa konsonante: *a cow*. Sebelisa **an** pele ho molumo oa voukale: *an egg, an orange, an hour* (h ha e utloahale!). Sebelisa **the** bakeng sa ntho e tsebahalang: *the sun*.`),
    S(`Pronouns`, `Liemeli (pronouns)`, `Pronouns replace nouns so we do not repeat them: *I, you, he, she, it, we, they / me, him, her, us, them*. *Lineo is kind. **She** helps everyone.*\nDemonstrative: *this, that, these, those*. Relative: *who* (people), *which* (things), *that*. *The boy **who** won is my cousin.*`, `Pronouns li nkela mabitso sebaka e le hore re se a phete: *I, you, he, she, it, we, they*. *Lineo is kind. **She** helps everyone.*\nTse supang: *this, that, these, those*. Tse amanang: *who* (batho), *which* (lintho), *that*.`)
  ],
  words: [['adjective', 'lehlalosi'], ['bigger', 'kholoanyane'], ['the biggest', 'e kholo ka ho fetisisa'], ['pronoun', 'seemeli']],
  quiz: [
    Q(`Maseru is ___ than Butha-Buthe.`, `Maseru e ___ ho Butha-Buthe.`, ['big', 'bigger', 'biggest', 'more big'], 1),
    Q(`She is the ___ runner in our school.`, `Ke semathi se ___ sekolong sa rona.`, ['fast', 'faster', 'fastest', 'most fast'], 2),
    Q(`I ate ___ apple.`, `Ke jele ___ apole.`, ['a', 'an', 'the a', '–'], 1),
    Q(`Thabo and I are friends. ___ play together.`, `Thabo le nna re metsoalle. ___ bapala hammoho.`, ['They', 'We', 'Us', 'Them'], 1),
    Q(`The woman ___ sells fruit is my aunt.`, `Mosali ___ rekisang litholoana ke 'mangoane oa ka.`, ['which', 'who', 'what', 'whose'], 1)
  ] },

{ id: 'e5-punctuation', grade: 5, outcome: 'LO 14, 17, 18', hard: true, title: L(`Letters, capitals, punctuation and silent letters`, `Litlhaku, litlhaku tse kholo, matšoao le litlhaku tse khutsitseng`),
  sections: [
    S(`The alphabet and capital letters`, `Alefabeta le litlhaku tse kholo`, `English has 26 letters: 5 **vowels** (a, e, i, o, u) and 21 **consonants**. Use a CAPITAL letter:\n- at the start of every sentence\n- for names of people and places (*Thabo, Quthing*)\n- for days and months (*Monday, March*)\n- for the word *I*`, `Senyesemane se na le litlhaku tse 26: **livoukale** tse 5 (a, e, i, o, u) le **likonsonante** tse 21. Sebelisa tlhaku e KHOLO:\n- qalong ea polelo e 'ngoe le e 'ngoe\n- mabitsong a batho le libaka (*Thabo, Quthing*)\n- matsatsing le likhoeling (*Monday, March*)\n- lentsoeng *I*`),
    S(`Punctuation marks`, `Matšoao a puo`, `- Full stop **.** ends a sentence.\n- Question mark **?** ends a question: *Where do you live?*\n- Exclamation mark **!** shows strong feeling: *Help!*\n- Comma **,** separates items in a list: *maize, beans, and pumpkins*\n- Apostrophe **'** shows ownership: *Lerato's bag*\n- Quotation marks **" "** show what someone said.`, `- Khutlo **.** e qetella polelo.\n- Letšoao la potso **?** le qetella potso.\n- Letšoao la maikutlo **!** le bontša maikutlo a matla.\n- Feeloane **,** e arola lintho lethathamong.\n- Apostrophe **'** e bontša beng: *Lerato's bag*\n- Matšoao a qotso **" "** a bontša seo motho a se buileng.`),
    S(`Silent letters`, `Litlhaku tse khutsitseng`, `Some letters are written but not said: **k**nife, **k**now, **w**rite, **w**rong, lam**b**, clim**b**, **h**our, ta**l**k, lis**t**en, i**s**land. Read them aloud with the Read-to-me button and listen.`, `Litlhaku tse ling lia ngoloa empa ha li bitsoe: **k**nife, **k**now, **w**rite, lam**b**, **h**our, ta**l**k, lis**t**en. Li bale ka konopo ea Mpalle 'me u mamele.`)
  ],
  words: [['letter', 'tlhaku'], ['full stop', 'khutlo'], ['question', 'potso'], ['sentence', 'polelo'], ['spell', 'peleta']],
  quiz: [
    Q(`Which sentence is correct?`, `Ke polelo efe e nepahetseng?`, ['where is the school', 'Where is the school?', 'where is the School?', 'Where is the school.'], 1),
    Q(`Which letter is silent in "knife"?`, `Ke tlhaku efe e khutsitseng ho "knife"?`, ['k', 'n', 'f', 'i'], 0),
    Q(`Which word needs a capital letter?`, `Ke lentsoe lefe le hlokang tlhaku e kholo?`, ['friday', 'apple', 'river', 'happy'], 0),
    N(`How many vowels are in the English alphabet?`, `Ho na le livoukale tse kae alefabeteng ea Senyesemane?`, 5),
    Q(`"This is Palesas book." What is missing?`, `"This is Palesas book." Ho haella eng?`, [['an apostrophe: Palesa\'s', 'apostrophe: Palesa\'s'], ['a question mark', 'letšoao la potso'], ['a comma', 'feeloane'], ['nothing', 'ha ho letho']], 0)
  ], practice: null },

{ id: 'e5-words', grade: 5, outcome: 'LO 25, 26, 28, 33', title: L(`Similes, synonyms, antonyms and homonyms`, `Lipapiso, mantsoe a tšoanang, a hananang le a ngoloang ka ho tšoana`),
  sections: [
    S(`Similes`, `Lipapiso (similes)`, `A simile compares two things using **as** or **like**: *as white as snow*, *as brave as a lion*, *as busy as a bee*, *she runs like the wind*, *as strong as an ox*.`, `Simile e bapisa lintho tse peli ka **as** kapa **like**: *as white as snow* (tšoeu joaloka lehloa), *as brave as a lion* (sebete joaloka tau), *as busy as a bee*.`),
    S(`Synonyms and antonyms`, `Mantsoe a tšoanang le a hananang`, `**Synonyms** mean the same: *big – large*, *happy – glad*, *begin – start*. **Antonyms** mean the opposite: *hot – cold*, *up – down*, *early – late*, *strong – weak*.`, `**Synonyms** a bolela ntho e tšoanang: *big – large*, *happy – glad*. **Antonyms** a hanana: *hot – cold* (chesa – bata), *up – down*, *early – late*.`),
    S(`Male and female words`, `Mantsoe a botona le a botšehali`, `*boy – girl, man – woman, father – mother, king – queen, uncle – aunt, bull – cow, ram – ewe, cock – hen, prince – princess*.`, `*boy – girl, man – woman, father – mother, king – queen (morena – mofumahali), uncle – aunt, bull – cow (poho – khomo), ram – ewe, cock – hen (mokoko – sethole)*.`),
    S(`Words that look the same (homonyms)`, `Mantsoe a ngoloang ka ho tšoana`, `Some words are spelt the same but mean different things: *a **bat** (animal) / a cricket **bat***, *a **watch** on my wrist / **watch** TV*, *the river **bank** / the **bank** for money*, *a **light** bag / turn on the **light***.`, `Mantsoe a mang a ngoloa ka ho tšoana empa a bolela lintho tse fapaneng: *bat* (mankhane / thupa ea cricket), *watch* (oatše / shebella), *bank* (lebopo la noka / banka).`)
  ],
  words: [['simile', 'papiso'], ['opposite', 'e hananang'], ['same', 'e tšoanang'], ['lion', 'tau'], ['snow', 'lehloa']],
  quiz: [
    Q(`As white as…`, `Tšoeu joaloka…`, ['snow', 'coal', 'grass', 'night'], 0),
    Q(`The antonym of "early" is…`, `Antonym ea "early" ke…`, ['soon', 'late', 'first', 'quick'], 1),
    Q(`A synonym for "begin" is…`, `Synonym ea "begin" ke…`, ['end', 'start', 'stop', 'finish'], 1),
    Q(`The female of "king" is…`, `Botšehali ba "king" ke…`, ['princess', 'queen', 'aunt', 'lady'], 1),
    Q(`In which sentence does "bat" mean an animal?`, `Ke polelo efe moo "bat" e bolelang phoofolo?`, ['The bat flew out of the cave at night.', 'He hit the ball with a bat.', 'Pass me the bat.', 'The bat broke.'], 0)
  ] },

{ id: 'e5-writing', grade: 5, outcome: 'LO 5, 27, 29, 32', title: L(`Writing: a friendly letter and a composition`, `Ho ngola: lengolo la setsoalle le moqoqo`),
  sections: [
    S(`A friendly letter`, `Lengolo la setsoalle`, `1. Your address and the date (top right)\n2. Greeting: *Dear Neo,*\n3. Opening: ask how they are\n4. Body: your news in short paragraphs\n5. Closing: *Your friend,* / *Love,*\n6. Your name`, `1. Aterese ea hau le letsatsi (holimo ka ho le letona)\n2. Tumeliso: *Dear Neo,*\n3. Qalo: botsa hore na o phela joang\n4. 'Mele: litaba tsa hau ka lirapa tse khutšoanyane\n5. Phetho: *Your friend,* / *Love,*\n6. Lebitso la hau`,
      { ex: L(`P.O. Box 12\nMaseru 100\n15 March 2026\n\nDear Neo,\n\nHow are you? I am well. Last Saturday our school had a sports day. I came second in the 100 m race!\n\nPlease write back soon and tell me about your new school.\n\nYour friend,\nLerato`, `(Mohlala ka Senyesemane – sheba ka holimo)`) }),
    S(`A composition (2–3 paragraphs)`, `Moqoqo (lirapa tse 2–3)`, `Plan first! Paragraph 1: **introduction** (what is it about?). Paragraph 2: **details** (what happened, in order: first, then, after that). Paragraph 3: **conclusion** (how you felt, what you learned). Then **edit**: check capitals, full stops and spelling.`, `Rala pele! Serapa sa 1: **kenyelletso** (ke ka eng?). Serapa sa 2: **lintlha** (ho etsahetse eng, ka tatellano: first, then, after that). Serapa sa 3: **phetho** (u ikutloile joang, u ithutile eng). Ebe u **lokisa**: hlahloba litlhaku tse kholo, likhutlo le mopeleto.`),
    S(`Giving instructions`, `Ho fana ka litaelo`, `Use numbers and command verbs: *1. **Fill** the pot with water. 2. **Boil** the water. 3. **Add** maize meal slowly. 4. **Stir** well.*`, `Sebelisa linomoro le maetsi a laelang: *1. **Fill** the pot with water. 2. **Boil** the water. 3. **Add** maize meal slowly. 4. **Stir** well.*`)
  ],
  words: [['letter', 'lengolo'], ['address', 'aterese'], ['paragraph', 'serapa'], ['friend', 'motsoalle'], ['write', 'ngola']],
  quiz: [
    Q(`Where do you write your address in a friendly letter?`, `Aterese u e ngola kae lengolong la setsoalle?`, [['top right', 'holimo ka ho le letona'], ['bottom left', 'tlase ka ho le letšehali'], ['in the middle', 'bohareng'], ['nowhere', 'ha ho kae']], 0),
    Q(`Which is a good greeting for a letter to a friend?`, `Ke tumeliso efe e ntle lengolong ho motsoalle?`, ['Dear Neo,', 'To whom it may concern', 'Hey you', 'Sir/Madam'], 0),
    Q(`The last paragraph of a composition is the…`, `Serapa sa ho qetela sa moqoqo ke…`, [['conclusion', 'phetho'], ['introduction', 'kenyelletso'], ['title', 'sehlooho'], ['address', 'aterese']], 0)
  ] },

/* ======================= GRADE 6 ======================= */
{ id: 'e6-conjunctions', grade: 6, title: L(`Joining sentences: conjunctions and adverbs`, `Ho kopanya lipolelo: likhokahanyi le li-adverb`),
  sections: [
    S(`Conjunctions`, `Likhokahanyi (conjunctions)`, `Join two short sentences: *and* (adds), *but* (contrast), *so* (result), *because* (reason), *although*, *when*, *or*.\n*It rained. We stayed inside.* → *It rained **so** we stayed inside.*\n*I was late **because** the taxi broke down.*`, `Kopanya lipolelo tse peli tse khutšoanyane: *and* (le), *but* (empa), *so* (kahoo), *because* (hobane), *although* (leha), *when* (ha), *or* (kapa).`),
    S(`Adverbs`, `Li-adverb`, `Adverbs tell **how** (manner: *slowly, carefully*), **when** (time: *yesterday, soon, now*) and **where** (place: *here, outside, everywhere*) something happens. *She sang **beautifully** **at the concert** **last night**.*`, `Li-adverb li bolela **joang** (*slowly* – butle), **neng** (*yesterday* – maobane) le **hokae** (*outside* – ka ntle) ketso e etsahalang.`)
  ],
  words: [['because', 'hobane'], ['but', 'empa'], ['so', 'kahoo'], ['slowly', 'butle'], ['outside', 'ka ntle']],
  quiz: [
    Q(`I wanted to play, ___ it was raining.`, `Ke ne ke batla ho bapala, ___ pula e ne e na.`, ['but', 'because', 'and', 'so'], 0),
    Q(`She was tired ___ she went to bed early.`, `O ne a khathetse ___ a robala kapele.`, ['so', 'but', 'or', 'although'], 0),
    Q(`In "He walked slowly", "slowly" tells us…`, `Ho "He walked slowly", "slowly" e re bolella…`, [['how', 'joang'], ['when', 'neng'], ['where', 'hokae'], ['who', 'mang']], 0)
  ] },

{ id: 'e6-voice', grade: 6, title: L(`Active and passive; direct and reported speech`, `Active le passive; puo e tobileng le e phetoang`),
  sections: [
    S(`Active and passive`, `Active le passive`, `Active: *The dog **chased** the cat.* (the doer comes first)\nPassive: *The cat **was chased** by the dog.* (the receiver comes first)\nPassive uses *was/were + past participle*.`, `Active: *The dog chased the cat.* (moetsi o tla pele)\nPassive: *The cat was chased by the dog.* (moetsuoa o tla pele)`),
    S(`Direct and reported speech`, `Puo e tobileng le e phetoang`, `Direct: *Thabo said, "I am hungry."*\nReported: *Thabo said **that he was** hungry.*\nIn reported speech, the tense moves back (am → was, will → would) and pronouns change (I → he/she).`, `E tobileng: *Thabo said, "I am hungry."*\nE phetoang: *Thabo said that he was hungry.*\nPuong e phetoang nako e khutlela morao (am → was) 'me liemeli lia fetoha (I → he/she).`)
  ],
  words: [['said', 'itse'], ['speech', 'puo'], ['hungry', 'lapile']],
  quiz: [
    Q(`Passive of "Mpho wrote the letter":`, `Passive ea "Mpho wrote the letter":`, ['The letter was written by Mpho.', 'The letter writes Mpho.', 'Mpho was written.', 'The letter wrote by Mpho.'], 0),
    Q(`Reported speech of: She said, "I am happy."`, `Puo e phetoang ea: She said, "I am happy."`, ['She said that she was happy.', 'She said that I am happy.', 'She says I happy.', 'She said she is be happy.'], 0)
  ] },

{ id: 'e6-reading', grade: 6, outcome: 'LO 1, 3, 7, 8', title: L(`Reading for information, speeches and debates`, `Ho bala ho fumana tlhahisoleseling, lipuo le likhang`),
  sections: [
    S(`Read for specific information`, `Bala ho fumana tlhahisoleseling e itseng`, `**Skim**: read quickly to get the main idea (titles, first lines). **Scan**: look quickly for one fact (a name, a number, a date). Then read carefully the part you need.`, `**Skim**: bala kapele ho fumana mohopolo o moholo. **Scan**: batla kapele ntlha e le 'ngoe (lebitso, nomoro, letsatsi). Ebe u bala ka hloko karolo eo u e hlokang.`),
    S(`Making a speech / defending your view`, `Ho etsa puo / ho sireletsa maikutlo`, `1. Greet the audience: *Good morning, Principal, teachers and fellow learners.*\n2. Say your point of view clearly.\n3. Give 2–3 reasons with examples.\n4. Conclude and thank the audience.\nIn a **debate**: listen to the other side, answer politely: *I respect my friend's point, but…*`, `1. Lumelisa bamameli.\n2. Bolela maikutlo a hau ka ho hlaka.\n3. Fana ka mabaka a 2–3 le mehlala.\n4. Qetella 'me u lebohe bamameli.\nNgangisanong: mamela lehlakore le leng, araba ka tlhompho.`)
  ],
  words: [['debate', 'ngangisano'], ['audience', 'bamameli'], ['reason', 'lebaka'], ['opinion', 'maikutlo']],
  quiz: [
    Q(`To find one date quickly in a page, you…`, `Ho fumana letsatsi le le leng kapele leqepheng, u…`, ['scan', 'skim', 'sing', 'write'], 0),
    Q(`A polite way to disagree in a debate:`, `Tsela e hlomphehang ea ho se lumellane ngangisanong:`, ['I respect your point, but…', 'You are stupid.', 'Be quiet!', 'I will not listen.'], 0)
  ] },

/* ======================= GRADE 7 ======================= */
{ id: 'e7-formal', grade: 7, title: L(`Formal letters and filling in forms`, `Mangolo a semmuso le ho tlatsa liforomo`),
  sections: [
    S(`A formal letter`, `Lengolo la semmuso`, `Used for the principal, the chief, a company or a newspaper. It has **two addresses** (yours top right, theirs on the left), *Dear Sir/Madam*, a **subject line** (*RE: Request for a school library*), polite formal language, and ends *Yours faithfully* (if you started *Dear Sir/Madam*) or *Yours sincerely* (if you used their name).`, `Le sebelisoa ho mosuoe-hlooho, morena, k'hamphani kapa koranta. Le na le **liaterese tse peli**, *Dear Sir/Madam*, **mola oa taba** (*RE: …*), puo e hlomphehang, 'me le qetella ka *Yours faithfully* kapa *Yours sincerely*.`),
    S(`Forms`, `Liforomo`, `Read every box before writing. Use CAPITAL letters if asked (BLOCK LETTERS). Surname = family name. DOB = date of birth. Sign only where it says *Signature*. Never give your PIN or password to anyone.`, `Bala lebokose le leng le le leng pele u ngola. Sebelisa litlhaku tse KHOLO haeba ho kopuoa. Surname = fane. DOB = letsatsi la tsoalo. Saena feela moo ho reng *Signature*. Le ka mohla u se ke ua fa motho PIN kapa password ea hau.`)
  ],
  words: [['surname', 'fane'], ['signature', 'tekeno'], ['date of birth', 'letsatsi la tsoalo'], ['request', 'kopo']],
  quiz: [
    Q(`A letter that starts "Dear Sir" ends with…`, `Lengolo le qalang ka "Dear Sir" le qetella ka…`, ['Yours faithfully', 'Love', 'Your friend', 'Bye'], 0),
    Q(`"Surname" means…`, `"Surname" e bolela…`, [['family name', 'fane'], ['first name', 'lebitso la pele'], ['nickname', 'lebitso la bosoasoi'], ['school name', 'lebitso la sekolo']], 0)
  ] },

{ id: 'e7-figures', grade: 7, title: L(`Figures of speech and poetry`, `Lipuo tsa setšoantšo le lithothokiso`),
  sections: [
    S(`Figures of speech`, `Lipuo tsa setšoantšo`, `- **Metaphor**: says something IS something else: *The classroom was a zoo.*\n- **Personification**: gives human actions to things: *The wind whispered.*\n- **Alliteration**: same first sound: *Big brown bears bounce.*\n- **Onomatopoeia**: sound words: *buzz, bang, moo.*\n- **Hyperbole**: huge exaggeration: *I have told you a million times!*`, `- **Metaphor**: e re ntho E LE ntho e 'ngoe: *The classroom was a zoo.*\n- **Personification**: e fa lintho liketso tsa batho: *The wind whispered.*\n- **Alliteration**: molumo o tšoanang qalong.\n- **Onomatopoeia**: mantsoe a melumo: *buzz, bang, moo.*\n- **Hyperbole**: ho feteletsa haholo.`),
    S(`Reading a poem`, `Ho bala thothokiso`, `Read it aloud twice. Ask: What is it about? How does it make me feel? Which words make pictures in my mind? Look for rhyme (*night / light*) and repetition.`, `E bale ka lentsoe habeli. Botsa: E bua ka eng? E nketsa hore ke ikutloe joang? Ke mantsoe afe a etsang litšoantšo kelellong? Batla morethetho le phetapheto.`)
  ],
  words: [['poem', 'thothokiso'], ['rhyme', 'morethetho'], ['sound', 'molumo']],
  quiz: [
    Q(`"The sun smiled on us" is an example of…`, `"The sun smiled on us" ke mohlala oa…`, ['personification', 'simile', 'alliteration', 'onomatopoeia'], 0),
    Q(`Which word is onomatopoeia?`, `Ke lentsoe lefe le leng onomatopoeia?`, ['buzz', 'happy', 'river', 'slowly'], 0),
    Q(`"He is a lion in battle" is a…`, `"He is a lion in battle" ke…`, ['metaphor', 'simile', 'question', 'plural'], 0)
  ] },

{ id: 'e7-comprehension', grade: 7, title: L(`Comprehension and summary writing`, `Kutloisiso le ho ngola kakaretso`),
  sections: [
    S(`Answering comprehension questions`, `Ho araba lipotso tsa kutloisiso`, `Read the questions **first**, then the passage. Find the sentence with the answer. Answer in **full sentences** using your own words. For "why" questions, give the reason (*because…*).`, `Bala lipotso **pele**, ebe u bala temana. Fumana polelo e nang le karabo. Araba ka **lipolelo tse feletseng** ka mantsoe a hau. Lipotsong tsa "hobaneng", fana ka lebaka (*because…*).`),
    S(`Writing a summary`, `Ho ngola kakaretso`, `1. Underline the main points. 2. Leave out examples and repeated ideas. 3. Write the points in your own words, in order. 4. Keep within the word limit.`, `1. Thalla lintlha tsa bohlokoa. 2. Tlohela mehlala le mehopolo e phetoang. 3. Ngola lintlha ka mantsoe a hau, ka tatellano. 4. Se fete palo ea mantsoe e lumelletsoeng.`)
  ],
  words: [['summary', 'kakaretso'], ['main point', 'ntlha ea bohlokoa'], ['passage', 'temana']],
  quiz: [
    Q(`When summarising you should leave out…`, `Ha u ngola kakaretso u lokela ho tlohela…`, [['examples and repetition', 'mehlala le phetapheto'], ['main points', 'lintlha tsa bohlokoa'], ['verbs', 'maetsi'], ['everything', 'tsohle']], 0),
    Q(`What should you read first in a comprehension test?`, `U lokela ho bala eng pele tekong ea kutloisiso?`, [['the questions', 'lipotso'], ['nothing', 'ha ho letho'], ['the last line only', 'mola oa ho qetela feela'], ['the title only', 'sehlooho feela']], 0)
  ] }
]);
