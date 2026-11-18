/* Sesotho – Grades 5–7 (Lesotho orthography: ea, oa, li-, tš, 'm). Grade 5 outcomes follow the
   syllabus pages 1–2: Mekhoa ea ho ithuta, Phelisano le bochaba, Tšebeliso ea puo, Sebopeho sa puo.
   Main text is Sesotho; the English line under it helps learners and visitors. Teachers can correct
   any wording in Teacher area → Correct the lessons. */
'use strict';
LESELI.addLessons('sesotho', [
/* ======================= SEHLOPHA SA 5 ======================= */
{ id: 'st5-lumeliso', grade: 5, outcome: 'LO 9, 10', title: L(`Greetings and respect`, `Lumeliso le tlhompho`),
  sections: [
    S(`How Basotho greet`, `Kamoo Basotho ba lumelisanang kateng`, `The younger person greets the older person first. To one man: *Lumela ntate.* To one woman: *Lumela 'mè.* To many people, or to an elder with respect: *Lumelang.* Answer: *E, ntate / E, 'mè.* Then ask: *Le phela joang?* – *Re phela hantle, le uena le phela joang?*`, `E monyenyane o lumelisa e moholo pele. Ho monna a le mong: *Lumela ntate.* Ho mosali a le mong: *Lumela 'mè.* Ho batho ba bangata, kapa ho e moholo ka tlhompho: *Lumelang.* Karabo: *E, ntate / E, 'mè.* Ebe u botsa: *Le phela joang?* – *Re phela hantle, le uena le phela joang?*`),
    S(`Respect in words and actions`, `Tlhompho lipuong le liketsong`, `- We use *le* (plural) when speaking to an elder: *Ntate, le kae?* not *u kae?*\n- We greet with the right hand, sometimes holding the right arm with the left hand.\n- We do not interrupt elders; we wait to be given a turn.\n- We say *Kea leboha* (thank you) and *Ka kopo* (please).\n- When leaving: *Sala hantle* (to the one staying) – *Tsamaea hantle* (to the one leaving).`, `- Re sebelisa *le* (bongata) ha re bua le e moholo: *Ntate, le kae?* eseng *u kae?*\n- Re lumelisa ka letsoho le letona, ka linako tse ling re tšoere letsoho le letona ka le letšehali.\n- Ha re kene baholo hanong; re emela ho fuoa sebaka.\n- Re re *Kea leboha* le *Ka kopo*.\n- Ha re tsamaea: *Sala hantle* (ho ea salang) – *Tsamaea hantle* (ho ea tsamaeang).`),
    S(`Family names of respect`, `Mabitso a tlhompho a lelapa`, `*Ntate-moholo* (grandfather), *Nkhono* (grandmother), *Ntate* (father, or any older man), *'Mè* (mother, or any older woman), *Abuti* (older brother/young man), *Ausi* (older sister/young woman), *Malome* (uncle, mother's brother), *Rakhali* (aunt, father's sister).`, `*Ntate-moholo*, *Nkhono*, *Ntate*, *'Mè*, *Abuti*, *Ausi*, *Malome* (moena oa 'mè), *Rakhali* (khaitseli ea ntate).`)
  ],
  words: [['greet', 'lumelisa'], ['thank you', 'kea leboha'], ['please', 'ka kopo'], ['respect', 'tlhompho'], ['grandmother', 'nkhono'], ['uncle (mother\'s brother)', 'malome'], ['goodbye (to one staying)', 'sala hantle']],
  quiz: [
    Q(`How do you greet one older woman?`, `U lumelisa mosali e moholo a le mong joang?`, [['Lumela \'mè', 'Lumela \'mè'], ['Lumela ntate', 'Lumela ntate'], ['Sala hantle', 'Sala hantle'], ['Kea leboha', 'Kea leboha']], 0),
    Q(`Who greets first?`, `Ke mang ea lumelisang pele?`, [['the younger person', 'e monyenyane'], ['the older person', 'e moholo'], ['nobody', 'ha ho motho'], ['the visitor only', 'moeti feela']], 0),
    Q(`You are leaving your friend at home. You say…`, `U siea motsoalle oa hau hae. U re…`, ['Sala hantle', 'Tsamaea hantle', 'Lumela', 'Ka kopo'], 0),
    Q(`"Malome" is…`, `"Malome" ke…`, [['your mother\'s brother', 'moena oa \'mè oa hau'], ['your father\'s sister', 'khaitseli ea ntate'], ['your grandfather', 'ntate-moholo'], ['your teacher', 'mosuoe oa hau']], 0),
    TF(`We use "le" when speaking to an elder, to show respect.`, `Re sebelisa "le" ha re bua le e moholo, ho bontša tlhompho.`, true)
  ] },

{ id: 'st5-lilotho', grade: 5, outcome: 'LO 13, 15', title: L(`Riddles (lilotho) and traditional games`, `Lilotho le lipapali tsa setso`),
  sections: [
    S(`How to play lilotho`, `Mokhoa oa ho lothana`, `The asker begins: *"Ka u lotha!"* The other answers: *"Ka u lotholla!"* Then the riddle is said. If you cannot guess, you "pay" with a cow (a pretend one!) and the asker tells the answer. Riddles teach us to think and to look closely at nature.`, `Ea lothang o qala: *"Ka u lotha!"* E mong o araba: *"Ka u lotholla!"* Ebe lelotho lea boleloa. Haeba u sa khone ho le fumana, u "lefa" ka khomo ('me ke ea papali!) ebe ea lothang o bolela karabo. Lilotho li re ruta ho nahana le ho sheba tlhaho ka hloko.`),
    S(`Riddles about plants`, `Lilotho tseo likarabo tsa tsona e leng limela`, `- *Ngoana ea apereng likobo tse ngata; ha u li hlobola oa lla.* – **Eiee** (an onion: peeling it makes you cry)\n- *Ngoanana ea moriri o mosehla o ipatile ka har'a likobo tse tala.* – **Poone** (a mealie cob)\n- *Ntlo e tala ka ntle, e khubelu ka hare, e tletse bana ba batšo.* – **Lehapu** (a watermelon)\n- *Ke hola ke shebile letsatsi kamehla.* – **Soneblomo** (sunflower)`, `- *Ngoana ea apereng likobo tse ngata; ha u li hlobola oa lla.* – **Eiee**\n- *Ngoanana ea moriri o mosehla o ipatile ka har'a likobo tse tala.* – **Poone**\n- *Ntlo e tala ka ntle, e khubelu ka hare, e tletse bana ba batšo.* – **Lehapu**\n- *Ke hola ke shebile letsatsi kamehla.* – **Soneblomo**`),
    S(`Traditional games`, `Lipapali tsa setso`, `**Morabaraba** (a board game with "cows"), **liketoane** (throwing and catching stones), **mohobelo** and **mokhibo** (dances), **khati** (skipping rope with songs), **lesokoana** (a game with a stick). Try Morabaraba in the Games section!`, `**Morabaraba** (papali ea boto ka "likhomo"), **liketoane** (ho akhela le ho tšoasa majoana), **mohobelo** le **mokhibo** (litantši), **khati** (ho tlola thapo ka lipina), **lesokoana**. Leka Morabaraba karolong ea Lipapali!`)
  ],
  words: [['riddle', 'lelotho'], ['onion', 'eiee'], ['maize', 'poone'], ['watermelon', 'lehapu'], ['game', 'papali'], ['dance', 'tantši']],
  quiz: [
    Q(`The asker says "Ka u lotha!" The answer is…`, `Ea lothang o re "Ka u lotha!" Karabo ke…`, ['Ka u lotholla!', 'Lumela!', 'Kea leboha!', 'Sala hantle!'], 0),
    Q(`"A child wearing many blankets; when you take them off, you cry."`, `"Ngoana ea apereng likobo tse ngata; ha u li hlobola oa lla."`, [['onion', 'eiee'], ['maize', 'poone'], ['pumpkin', 'mokhopu'], ['potato', 'tapole']], 0),
    Q(`Which is a Basotho board game?`, `Ke papali efe ea boto ea Basotho?`, ['Morabaraba', 'Mokhibo', 'Khati', 'Mohobelo'], 0),
    Q(`"Green outside, red inside, full of black children."`, `"Ntlo e tala ka ntle, e khubelu ka hare, e tletse bana ba batšo."`, [['watermelon', 'lehapu'], ['orange', 'lamunu'], ['apple', 'apole'], ['cabbage', 'k\'habeche']], 0)
  ] },

{ id: 'st5-mantsoe', grade: 5, outcome: 'LO 20, 21, 22, 23', title: L(`Opposites, synonyms and idioms`, `Mantsoe a hananang, a tšoanang ka moelelo le maelana`),
  sections: [
    S(`Opposites`, `Mantsoe a hananang`, `*holimo – tlase* (up – down), *chesa – bata* (hot – cold), *hōla – nyenyane* (big – small), *khanya – lefifi* (light – dark), *pele – morao* (front – back), *thabile – hlomohile* (happy – sad), *nka – fa* (take – give).`, `*holimo – tlase*, *chesa – bata*, *e kholo – e nyenyane*, *khanya – lefifi*, *pele – morao*, *thabile – hlomohile*, *nka – fa*.\nMohlala: *Metsi a chesa, leqhoa le **bata**.*`),
    S(`Words with the same meaning`, `Mantsoe a tšoanang ka moelelo`, `*potlaka – akofa* (hurry), *bua – re* (say), *ntle – motle* (beautiful), *ngoana – lesea* (baby/child), *tsamaea – sepela* (walk/go).`, `*potlaka – akofa*, *ntle – motle*, *ngoana – lesea*, *tsamaea – sepela*.\nMohlala: *Akofa, re tla siuoa ke bese!* = *Potlaka, re tla siuoa ke bese!*`),
    S(`Words with several meanings`, `Mantsoe a nang le meelelo e fapaneng`, `*Letsatsi* = the sun, or a day. *Khoeli* = the moon, or a month. *Leleme* = the tongue, or a language. The sentence tells us which meaning: *Letsatsi le chabile* (the sun has risen) / *Ke tla tla letsatsing la Moqebelo* (on Saturday).`, `*Letsatsi* = letsatsi le chabang, kapa letsatsi la beke. *Khoeli* = khoeli ea leholimo, kapa khoeli ea selemo. *Leleme* = setho sa molomo, kapa puo. Polelo e re bolella moelelo.`),
    S(`Idioms (maelana)`, `Maelana`, `Idioms say something in a picture way:\n- *Ho ja bohobe ka meno a pele* – to eat in a hurry, carelessly\n- *Ho ba le pelo e telele* – to be patient\n- *Ho otla mohatla* – to show off\n- *Ho ba le letsoho le bulehileng* – to be generous`, `Maelana a bua ka tsela ea setšoantšo:\n- *Ho ba le pelo e telele* – ho ba mamello\n- *Ho ba le letsoho le bulehileng* – ho fana habonolo\n- *Ho ja ka meno a pele* – ho ja kapele ntle le hloko`)
  ],
  words: [['opposite', 'e hananang'], ['up', 'holimo'], ['down', 'tlase'], ['patient', 'pelo e telele'], ['day / sun', 'letsatsi'], ['month / moon', 'khoeli']],
  quiz: [
    Q(`The opposite of "chesa" is…`, `E hananang le "chesa" ke…`, ['bata', 'potlaka', 'holimo', 'ja'], 0),
    Q(`Which word has the same meaning as "potlaka"?`, `Ke lentsoe lefe le tšoanang ka moelelo le "potlaka"?`, ['akofa', 'robala', 'lula', 'lieha'], 0),
    Q(`"Khoeli" can mean…`, `"Khoeli" e ka bolela…`, [['the moon or a month', 'khoeli ea leholimo kapa khoeli ea selemo'], ['a cow', 'khomo'], ['water', 'metsi'], ['a song', 'pina']], 0),
    Q(`"Ho ba le pelo e telele" means…`, `"Ho ba le pelo e telele" ho bolela…`, [['to be patient', 'ho ba mamello'], ['to be tall', 'ho ba molelele'], ['to be sick', 'ho kula'], ['to be angry', 'ho halefa']], 0)
  ] },

{ id: 'st5-lijo', grade: 5, outcome: 'LO 16, 17, 18', title: L(`Sesotho food and describing animals`, `Lijo tsa Sesotho le ho hlalosa liphoofolo`),
  sections: [
    S(`Our food`, `Lijo tsa rona`, `- **Papa** – stiff porridge of maize meal, eaten with *moroho* (cooked greens) or meat\n- **Motoho** – soft sour porridge of sorghum (*mabele*)\n- **Leqebekoane** – steamed bread\n- **Likhobe** – samp or maize and beans boiled together\n- **Lipabi** – roasted maize meal\n- **Nama ea khomo, ea nku** – beef, mutton (eaten at feasts – *mokete*)`, `- **Papa** – e phehoang ka phofo ea poone, e jeoa le *moroho* kapa nama\n- **Motoho** – lesheleshele le bolila la *mabele*\n- **Leqebekoane** – bohobe bo phehiloeng ka mouoane\n- **Likhobe** – poone le linaoa tse phehiloeng hammoho\n- **Lipabi** – phofo ea poone e halikiloeng\n- **Nama ea khomo, ea nku** – e jeoa meketeng`),
    S(`Describing animals with colours`, `Ho hlalosa liphoofolo ka mebala`, `Basotho describe cattle by colour: *khomo e ntšo* (black), *e tšoeu* (white), *e khubelu* (red-brown), *e tšehla* (yellow-brown), *e putsoa* (grey), *e matheba* (spotted). Notice: the colour word agrees with the noun: *nku e tšoeu*, *lipere tse ntšo*, *ntja e sootho*.`, `Basotho ba hlalosa likhomo ka mebala: *khomo e ntšo*, *e tšoeu*, *e khubelu*, *e tšehla*, *e putsoa*, *e matheba*. Hlokomela: lentsoe la 'mala le lumellana le lereho: *nku e tšoeu*, *lipere tse ntšo*, *ntja e sootho*.`),
    S(`Describing animals by their marks and sounds`, `Ho hlalosa liphoofolo ka matšoao le melumo`, `*Pere* has a mane (*moetse*) and hooves. *Khomo* has horns (*linaka*) and *ea lla: mooo*. *Nku* has wool (*boea*). *Ntja e bohola* (barks). *Katse e lla: meu*. *Mokoko o lla hoseng*.`, `*Pere* e na le moetse le litlhako. *Khomo* e na le linaka 'me ea lla. *Nku* e na le boea. *Ntja ea bohola*. *Katse e re: meu*. *Mokoko o lla hoseng.*`)
  ],
  words: [['porridge', 'papa'], ['sorghum', 'mabele'], ['feast', 'mokete'], ['horns', 'linaka'], ['wool', 'boea'], ['black', 'e ntšo'], ['white', 'e tšoeu']],
  quiz: [
    Q(`Motoho is made from…`, `Motoho o etsoa ka…`, [['sorghum', 'mabele'], ['rice', 'raese'], ['beans only', 'linaoa feela'], ['potatoes', 'litapole']], 0),
    Q(`Choose the correct phrase.`, `Khetha poleloana e nepahetseng.`, ['lipere tse ntšo', 'lipere e ntšo', 'lipere o ntšo', 'lipere li ntšo tse'], 0),
    Q(`Which animal barks?`, `Ke phoofolo efe e bohlolang?`, [['dog', 'ntja'], ['cat', 'katse'], ['sheep', 'nku'], ['horse', 'pere']], 0),
    Q(`Leqebekoane is…`, `Leqebekoane ke…`, [['steamed bread', 'bohobe bo phehiloeng ka mouoane'], ['a game', 'papali'], ['a song', 'pina'], ['a drink', 'seno']], 0)
  ] },

{ id: 'st5-sebopeho', grade: 5, outcome: 'LO 27, 28, 30, 32, 34, 36', title: L(`Grammar: nouns, pronouns, qualificatives, conjunctions`, `Sebopeho sa puo: lereho, seemeli, sehlakisi, sehokelo`),
  sections: [
    S(`Nouns (mareho) and their classes`, `Mareho le lihlopha tsa ona`, `Sesotho nouns have pairs of prefixes for one and many:\n- **mo-/ba-**: *motho – batho*, *moithuti – baithuti*\n- **mo-/me-**: *molamu – melamu*, *motse – metse*\n- **le-/ma-**: *lejoe – majoe*, *lebese*\n- **se-/li-**: *setulo – litulo*, *sefate – lifate*\n- **(n)-/li-**: *ntja – lintja*, *pere – lipere*\nA noun can be the **doer** (*Ngoana o ja*) or the **receiver** (*'Mè o fepa ngoana*).`, `Mareho a Sesotho a na le lihlomathiso tsa bonngoe le bongata:\n- **mo-/ba-**: *motho – batho*\n- **mo-/me-**: *molamu – melamu*\n- **le-/ma-**: *lejoe – majoe*\n- **se-/li-**: *setulo – litulo*\n- **(n)-/li-**: *ntja – lintja*\nLereho le ka ba **moetsi** (*Ngoana o ja*) kapa **moetsuoa** (*'Mè o fepa ngoana*).`),
    S(`Pronouns (seemeli)`, `Liemeli`, `Absolute pronouns: *nna, uena, eena, rona, lona, bona*. *Ke **nna** ea ngotseng.* Demonstratives point: *motho **enoa*** (this person), *batho **bana*** (these people), *setulo **sena***, *litulo **tsena***.`, `Seemeli-tu: *nna, uena, eena, rona, lona, bona*. *Ke **nna** ea ngotseng.* Tse supang: *motho **enoa***, *batho **bana***, *setulo **sena***, *litulo **tsena***.`),
    S(`Qualificatives of colour and number`, `Sehlakisi sa 'mala le sa palo`, `Colour: *khomo e **ntšo***, *lipere tse **tšoeu***. Number: *likhomo tse **peli***, *batho ba **bararo***, *lifate tse **hlano***. The qualificative agrees with its noun!`, `'Mala: *khomo e **ntšo***, *lipere tse **tšoeu***. Palo: *likhomo tse **peli***, *batho ba **bararo***, *lifate tse **hlano***. Sehlakisi se lumellana le lereho la sona!`),
    S(`Conjunctions and adverbs of place`, `Lihokelo le maeketsi a sebaka`, `Conjunctions join: *le* (and), *empa* (but), *hobane* (because), *kahoo* (so), *ha* (when). Adverbs of place: *mona* (here), *moo* (there), *ka hare* (inside), *ka ntle* (outside), *holimo*, *tlase*. *Ke tla bapala ka **ntle** **hobane** letsatsi le chabile.*`, `Lihokelo: *le*, *empa*, *hobane*, *kahoo*, *ha*. Maeketsi a sebaka: *mona*, *moo*, *ka hare*, *ka ntle*, *holimo*, *tlase*. *Ke tla bapala ka **ntle** **hobane** letsatsi le chabile.*`),
    S(`Building words from syllables`, `Ho bopa mantsoe ka melumo`, `Sesotho words are made of syllables: *ba-na*, *ngoa-na*, *ko-lo-be*, *me-tsi*, *pe-re*. Tap the syllables to build a word. When you make a real word, Leseli tells you!`, `Mantsoe a Sesotho a entsoe ka melumo: *ba-na*, *ngoa-na*, *ko-lo-be*, *me-tsi*, *pe-re*. Tobetsa melumo ho bopa lentsoe. Ha u bopa lentsoe la 'nete, Leseli e tla u bolella!`, { tool: 'syllables', toolOpts: { parts: ['ba', 'na', 'ngoa', 'ko', 'lo', 'be', 'me', 'tsi', 'pe', 're', 'li', 'jo', 'ntja', 'ho'] } })
  ],
  words: [['noun', 'lereho'], ['pronoun', 'seemeli'], ['conjunction', 'sehokelo'], ['adverb', 'leeketsi'], ['person / people', 'motho / batho'], ['chair / chairs', 'setulo / litulo']],
  quiz: [
    Q(`The plural of "setulo" is…`, `Bongata ba "setulo" ke…`, ['litulo', 'matulo', 'betulo', 'metulo'], 0),
    Q(`The plural of "molamu" is…`, `Bongata ba "molamu" ke…`, ['melamu', 'balamu', 'lilamu', 'malamu'], 0),
    Q(`Choose the correct phrase.`, `Khetha poleloana e nepahetseng.`, ['batho ba bararo', 'batho tse tharo', 'batho e meraro', 'batho li tharo'], 0),
    Q(`Which word is a conjunction?`, `Ke lentsoe lefe e leng sehokelo?`, ['hobane', 'setulo', 'ntšo', 'mona'], 0),
    Q(`"Ka ntle" is an adverb of…`, `"Ka ntle" ke leeketsi la…`, [['place', 'sebaka'], ['time', 'nako'], ['colour', "'mala"], ['number', 'palo']], 0)
  ] },

{ id: 'st5-lengolo', grade: 5, outcome: 'LO 5, 8, 24, 25, 26', title: L(`Writing: a letter, an essay, an advertisement; weather words`, `Ho ngola: lengolo, moqoqo, papatso; mantsoe a leholimo`),
  sections: [
    S(`A friendly letter that persuades`, `Lengolo la setsoalle le kholisang`, `Write your address and date at the top right. Greet: *Motsoalle oa ka Neo,* Ask about their health, then give your news and **persuade**: *Ke kopa hore u tle moketeng oa sekolo hobane…* End: *Ke nna motsoalle oa hau, Lerato.*`, `Ngola aterese ea hau le letsatsi holimo ka ho le letona. Lumelisa: *Motsoalle oa ka Neo,* Botsa ka bophelo, ebe u fana ka litaba 'me u **kholise**: *Ke kopa hore u tle moketeng oa sekolo hobane…* Qetella: *Ke nna motsoalle oa hau, Lerato.*`),
    S(`Weather words`, `Mantsoe a boemo ba leholimo`, `*Letsatsi le chabile* (sunny), *ho na le maru* (cloudy), *pula e na* (raining), *lehloa le khetheha* (snowing), *sefako* (hail), *lehalima* (lightning), *moea o matla* (strong wind), *serame* (frost), *ho chesa* (hot), *ho bata* (cold). In winter there is snow on the Maloti mountains.`, `*Letsatsi le chabile*, *ho na le maru*, *pula e na*, *lehloa le khetheha*, *sefako*, *lehalima*, *moea o matla*, *serame*, *ho chesa*, *ho bata*. Mariha ho na le lehloa lithabeng tsa Maloti.`, { tool: 'thermometer' }),
    S(`An advertisement and checking your work`, `Papatso le ho lokisa mosebetsi oa hau`, `An advertisement is short and catches the eye: **what** is sold, **where**, **when**, **price**, and a nice slogan: *"Lijo tse monate tsa 'Mè Mpho – Mantaha ho isa Labohlano, M10 feela!"* Then read your writing again and **correct your mistakes**: spelling, capital letters, full stops.`, `Papatso e khutšoanyane ebile e hohela mahlo: ho rekisoa **eng**, **hokae**, **neng**, **theko**, le polelo e monate: *"Lijo tse monate tsa 'Mè Mpho – Mantaha ho isa Labohlano, M10 feela!"* Ebe u bala mongolo oa hau hape 'me u **lokise liphoso**: mopeleto, litlhaku tse kholo, likhutlo.`)
  ],
  words: [['letter', 'lengolo'], ['essay', 'moqoqo'], ['advertisement', 'papatso'], ['snow', 'lehloa'], ['hail', 'sefako'], ['lightning', 'lehalima']],
  quiz: [
    Q(`"Lehloa" is…`, `"Lehloa" ke…`, [['snow', 'snow'], ['rain', 'pula'], ['wind', 'moea'], ['sun', 'letsatsi']], 0),
    Q(`A good advertisement says…`, `Papatso e ntle e bolela…`, [['what, where, when and the price', 'eng, hokae, neng le theko'], ['a long story', 'pale e telele'], ['nothing', 'ha ho letho'], ['only your name', 'lebitso la hau feela']], 0),
    Q(`How does a friendly letter end?`, `Lengolo la setsoalle le qetella joang?`, ['Ke nna motsoalle oa hau, Lerato.', 'Lumela ntate.', 'Ka u lotha!', 'Sala hantle setulo.'], 0)
  ] },

/* ======================= SEHLOPHA SA 6 ======================= */
{ id: 'st6-tsomo', grade: 6, outcome: 'LO 14', title: L(`Folktales (litšomo)`, `Litšomo`),
  sections: [
    S(`What is a tšomo?`, `Tšomo ke eng?`, `A tšomo is a traditional story, told in the evening by grandmothers around the fire. It begins: *"Ka nako e 'ngoe…"* or *"Ho ne ho le…"* and ends: *"Ke tšomo ka mathetho!"* Animals often talk, and the story teaches a lesson, such as working together or not being greedy.`, `Tšomo ke pale ea setso, e phetoang mantsiboea ke bo-nkhono ho pota mollo. E qala ka: *"Ka nako e 'ngoe…"* kapa *"Ho ne ho le…"* 'me e fela ka: *"Ke tšomo ka mathetho!"* Hangata liphoofolo lia bua, 'me pale e ruta thuto, joalo ka ho sebetsa hammoho kapa ho se be meharo.`),
    S(`Parts of a tšomo`, `Likarolo tsa tšomo`, `1. **Opening**: who, where (*Ho ne ho le mohlankana ea bitsoang…*)\n2. **Problem**: something goes wrong\n3. **Events**: often in threes, with a song repeated\n4. **Ending**: the problem is solved; the lesson is clear\nRead "Mmutla le Tau" and other stories in the Library!`, `1. **Qalo**: mang, hokae\n2. **Bothata**: ho na le ho sa tsamaeng hantle\n3. **Liketsahalo**: hangata ka makhetlo a mararo, le pina e phetoang\n4. **Qetello**: bothata bo rarolloa; thuto ea hlaka\nBala "Mmutla le Tau" le lipale tse ling Laeboraring!`)
  ],
  words: [['folktale', 'tšomo'], ['story', 'pale'], ['lesson', 'thuto'], ['grandmother', 'nkhono'], ['hare', 'mmutla']],
  quiz: [
    Q(`How does a tšomo end?`, `Tšomo e fela joang?`, ['Ke tšomo ka mathetho!', 'Ka u lotha!', 'Lumelang!', 'Kea leboha!'], 0),
    Q(`Who usually tells litšomo?`, `Hangata ke mang ea phetang litšomo?`, [['grandmothers', 'bo-nkhono'], ['the radio', 'seea-le-moea'], ['the police', 'mapolesa'], ['shopkeepers', 'barekisi']], 0),
    TF(`In litšomo animals often talk.`, `Litšomong hangata liphoofolo lia bua.`, true)
  ] },

{ id: 'st6-maele', grade: 6, title: L(`Proverbs (maele)`, `Maele`),
  sections: [
    S(`What are maele?`, `Maele ke eng?`, `Proverbs are short wise sayings from our elders. They teach how to live well.`, `Maele ke lipolelo tse khutšoanyane tsa bohlale tse tsoang ho baholo ba rona. A ruta mokhoa oa ho phela hantle.`),
    S(`Proverbs and their meanings`, `Maele le meelelo ea ona`, `- *Ngoana ea sa lleng o shoela tharing* – if you do not ask for help, nobody will know you need it\n- *Kopano ke matla* – unity is strength\n- *Letsoho le hlatsoa le leng* – we help each other\n- *Thupa e kojoa e sa le metsi* – teach children while they are young\n- *Motho ke motho ka batho* – we are people through other people\n- *Pelo e ja serati* – the heart wants what it loves\n- *Mphemphe o a lapisa* – begging tires people; work for yourself`, `- *Ngoana ea sa lleng o shoela tharing* – haeba u sa kope thuso, ha ho motho ea tla tseba hore u ea e hloka\n- *Kopano ke matla*\n- *Letsoho le hlatsoa le leng* – rea thusana\n- *Thupa e kojoa e sa le metsi* – ruta bana ha ba sa le banyenyane\n- *Motho ke motho ka batho*\n- *Pelo e ja serati*\n- *Mphemphe o a lapisa* – ho kopa ho khathatsa batho; iphelise`)
  ],
  words: [['proverb', 'seele (maele)'], ['wisdom', 'bohlale'], ['unity', 'kopano'], ['strength', 'matla']],
  quiz: [
    Q(`"Kopano ke matla" means…`, `"Kopano ke matla" e bolela…`, [['unity is strength', 'ha re kopane re matla'], ['money is power', 'chelete ke matla'], ['run fast', 'matha kapele'], ['eat well', 'ja hantle']], 0),
    Q(`Which proverb says we should ask for help when we need it?`, `Ke seele sefe se reng re lokela ho kopa thuso ha re e hloka?`, ['Ngoana ea sa lleng o shoela tharing', 'Pelo e ja serati', 'Thupa e kojoa e sa le metsi', 'Mphemphe o a lapisa'], 0),
    Q(`Complete: "Letsoho le hlatsoa…"`, `Phethela: "Letsoho le hlatsoa…"`, ['le leng', 'metsi', 'sesepa', 'hantle'], 0)
  ] },

{ id: 'st6-thothokiso', grade: 6, outcome: 'LO 6, 7', title: L(`Poetry (lithoko) and debate (phehisano)`, `Lithothokiso le phehisano`),
  sections: [
    S(`Praise poetry (lithoko)`, `Lithoko`, `Basotho have praise poems (*lithoko*) for chiefs, heroes, cattle and even oneself. They use **repetition**, **comparison** (the hero is a lion, a storm) and strong rhythm. When you read a poem, ask: Who or what is praised? Which comparisons are used? How does it make me feel?`, `Basotho ba na le *lithoko* tsa marena, bahale, likhomo esita le motho ka boeena. Li sebelisa **phetapheto**, **papiso** (mohale ke tau, sefefo) le morethetho o matla. Ha u bala thothokiso, botsa: Ho rorisoa mang kapa eng? Ho sebelisoa lipapiso life? E nketsa hore ke ikutloe joang?`),
    S(`Debating (phehisano)`, `Phehisano`, `Two teams argue for (*ba lumelang*) and against (*ba hananang*) a topic, e.g. *"Bana ba lokela ho ba le lifono sekolong."* Speak in turn, give reasons and examples, listen with respect, and never insult the other side.`, `Lihlopha tse peli li phehisana ka taba: ba **lumelang** le ba **hananang**, mohl. *"Bana ba lokela ho ba le lifono sekolong."* Buang ka ho latellana, fanang ka mabaka le mehlala, mamelang ka tlhompho, 'me le se ke la nyelisa lehlakore le leng.`)
  ],
  words: [['poem', 'thothokiso'], ['praise poem', 'lithoko'], ['debate', 'phehisano'], ['reason', 'lebaka'], ['hero', 'mohale']],
  quiz: [
    Q(`In a debate the team that disagrees is…`, `Phehisanong sehlopha se sa lumelleng ke…`, ['ba hananang', 'ba lumelang', 'ba binang', 'ba robetseng'], 0),
    Q(`Lithoko are…`, `Lithoko ke…`, [['praise poems', 'lithothokiso tsa thoriso'], ['riddles', 'lilotho'], ['letters', 'mangolo'], ['games', 'lipapali']], 0)
  ] },

/* ======================= SEHLOPHA SA 7 ======================= */
{ id: 'st7-maetsi', grade: 7, outcome: 'LO 33, 35', title: L(`Verbs and time: past, present, future`, `Maetsi le nako: e fetileng, ea joale, e tlang`),
  sections: [
    S(`Tenses in Sesotho`, `Linako ka Sesotho`, `- Present: *Ke **ja** papa.* (I eat)\n- Recent past: *Ke **jele** papa.* (I ate)\n- Future: *Ke **tla ja** papa.* (I will eat)\n- Negative: *Ha ke **je**.* (I do not eat) – *Ha ke a **ja**.* (I did not eat)`, `- Nako ea joale: *Ke **ja** papa.*\n- Nako e fetileng: *Ke **jele** papa.*\n- Nako e tlang: *Ke **tla ja** papa.*\n- Kganyetso: *Ha ke **je**.* – *Ha ke a **ja**.*`),
    S(`Time phrases`, `Lipoleloana tsa nako`, `*Maobane* (yesterday), *kajeno* (today), *hosane* (tomorrow), *hoseng* (morning), *motšehare* (afternoon), *mantsiboea* (evening), *bosiu* (night), *selemong se tlang* (next year), *ha khale* (long ago).`, `*Maobane*, *kajeno*, *hosane*, *hoseng*, *motšehare*, *mantsiboea*, *bosiu*, *selemong se tlang*, *ha khale*.\nMohlala: *Maobane ke **ile** ka ea Maseru; hosane ke **tla** ea Leribe.*`),
    S(`Days and months`, `Matsatsi le likhoeli`, `Days: *Sontaha, Mantaha, Labobeli, Laboraro, Labone, Labohlano, Moqebelo*.\nMonths: *Pherekhong, Hlakola, Hlakubele, 'Mesa, Motšeanong, Phupjane, Phupu, Phato, Loetse, Mphalane, Pulungoana, Tšitoe*.`, `Matsatsi: *Sontaha, Mantaha, Labobeli, Laboraro, Labone, Labohlano, Moqebelo*.\nLikhoeli: *Pherekhong, Hlakola, Hlakubele, 'Mesa, Motšeanong, Phupjane, Phupu, Phato, Loetse, Mphalane, Pulungoana, Tšitoe*.`)
  ],
  words: [['yesterday', 'maobane'], ['today', 'kajeno'], ['tomorrow', 'hosane'], ['Monday', 'Mantaha'], ['January', 'Pherekhong'], ['December', 'Tšitoe']],
  quiz: [
    Q(`"Ke tla ja" is in the…`, `"Ke tla ja" e nakong…`, [['future', 'e tlang'], ['past', 'e fetileng'], ['present', 'ea joale'], ['negative', 'ea kganyetso']], 0),
    Q(`Which month is October?`, `Ke khoeli efe e leng October?`, ['Mphalane', 'Phupu', 'Hlakola', 'Tšitoe'], 0),
    Q(`The day after Labobeli is…`, `Letsatsi le latelang Labobeli ke…`, ['Laboraro', 'Mantaha', 'Labone', 'Sontaha'], 0),
    Q(`"I ate papa" in Sesotho is…`, `"I ate papa" ka Sesotho ke…`, ['Ke jele papa.', 'Ke tla ja papa.', 'Ha ke je papa.', 'Ke ja papa hosane.'], 0)
  ] },

{ id: 'st7-mekhoa', grade: 7, outcome: 'LO 19', title: L(`Basotho customs and responsibility`, `Mekhoa ea Basotho le boikarabello`),
  sections: [
    S(`Customs`, `Mekhoa`, `- **Seanamarena / kobo ea Basotho**: the Basotho blanket, worn with pride, especially in winter and at ceremonies\n- **Mokorotlo**: the conical straw hat, a national symbol (it is on our flag!)\n- **Pitso**: a meeting called by the chief where community matters are discussed\n- **Letsema**: neighbours working together in the fields\n- **Mafisa**: lending cattle to someone who looks after them`, `- **Kobo ea Basotho (seanamarena)**: e aparoa ka boikhohomoso, haholo mariha le meketeng\n- **Mokorotlo**: katiba ea joang, letšoao la naha (e folakhang ea rona!)\n- **Pitso**: kopano e bitsoang ke morena moo litaba tsa sechaba li buisanoang\n- **Letsema**: baahelani ba sebetsa hammoho masimong\n- **Mafisa**: ho alimela motho likhomo hore a li hlokomele`),
    S(`Showing responsibility`, `Ho bontša boikarabello`, `A responsible child: helps at home (fetching water, herding, cooking), looks after younger brothers and sisters, takes care of school books, tells the truth, and finishes homework. **Responsibility = doing what you should, even when nobody is watching.**`, `Ngoana ea nang le boikarabello: o thusa hae (ho kha metsi, ho alosa, ho pheha), o hlokomela bana ba banyenyane, o hlokomela libuka tsa sekolo, o bua 'nete, 'me o qeta mosebetsi oa sekolo. **Boikarabello = ho etsa se lokelang, leha ho se motho ea u bonang.**`)
  ],
  words: [['blanket', 'kobo'], ['meeting', 'pitso'], ['working together', 'letsema'], ['responsibility', 'boikarabello'], ['truth', "'nete"]],
  quiz: [
    Q(`"Letsema" is…`, `"Letsema" ke…`, [['neighbours working together in the fields', 'baahelani ba sebetsa hammoho masimong'], ['a blanket', 'kobo'], ['a hat', 'katiba'], ['a song', 'pina']], 0),
    Q(`Which symbol is on the flag of Lesotho?`, `Ke letšoao lefe le leng folakhang ea Lesotho?`, ['mokorotlo', 'tau', 'lehloa', 'khomo'], 0),
    Q(`A "pitso" is called by…`, `"Pitso" e bitsoa ke…`, [['the chief', 'morena'], ['a child', 'ngoana'], ['a shop', 'lebenkele'], ['the weather', 'leholimo']], 0)
  ] },

{ id: 'st7-puisano', grade: 7, outcome: 'LO 1, 2, 3, 4', title: L(`Speaking confidently and reading for information`, `Ho bua ka boitšepo le ho bala ho fumana tsebo`),
  sections: [
    S(`Speaking without preparing`, `Ho bua ntle le ho itokisa`, `When asked to speak suddenly: 1) take a breath, 2) say your main point first, 3) give one reason and one example, 4) finish with a short sentence. Look at the people listening and speak loudly enough.`, `Ha u kopuoa ho bua ka tšohanyetso: 1) hema, 2) bolela ntlha ea hau ea bohlokoa pele, 3) fana ka lebaka le le leng le mohlala o le mong, 4) qetella ka polelo e khutšoanyane. Sheba ba mamelang 'me u bue ka lentsoe le utloahalang.`),
    S(`Using a book to find information`, `Ho sebelisa buka ho batla tsebo`, `Look at the **title**, the **author**, and the **contents page** (*litaba*) at the front. The **index** at the back lists topics with page numbers. In Leseli, use the search box and the Textbooks in the Library the same way.`, `Sheba **sehlooho**, **mongoli**, le leqephe la **litaba** ka pele. **Index** ka morao e thathamisa litaba le linomoro tsa maqephe. Ho Leseli, sebelisa lebokose la ho batla le Libuka tsa thuto Laeboraring ka tsela e tšoanang.`)
  ],
  words: [['author', 'mongoli'], ['contents', 'litaba'], ['page', 'leqephe'], ['confidence', 'boitšepo']],
  quiz: [
    Q(`Where do you find the list of chapters in a book?`, `U fumana lethathamo la likhaolo bukeng hokae?`, [['the contents page at the front', 'leqepheng la litaba ka pele'], ['the last word', 'lentsoeng la ho qetela'], ['the cover colour', "'maleng oa sekoahelo"], ['nowhere', 'ha ho kae']], 0),
    Q(`When speaking suddenly, say ___ first.`, `Ha u bua ka tšohanyetso, bolela ___ pele.`, [['your main point', 'ntlha ea hau ea bohlokoa'], ['a joke', 'motlae'], ['nothing', 'ha ho letho'], ['goodbye', 'sala hantle']], 0)
  ] }
]);
