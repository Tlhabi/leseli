/* Science & Technology – Grades 5–7. Grade 5 outcomes from syllabus page 81.
   Learners named animal classification and oxygen/gases as hard. */
'use strict';
const ANIMALS = [
  { emo: '🐄', en: 'cow', st: 'khomo', g: 'mam', why: L('Has hair and feeds its calf milk.', 'E na le moriri ebile e anyesa namane ea eona.') },
  { emo: '🐑', en: 'sheep', st: 'nku', g: 'mam', why: L('Wool is hair; lambs drink milk.', 'Boea ke moriri; likonyana li anya lebese.') },
  { emo: '🦅', en: 'eagle', st: 'ntsu', g: 'bird', why: L('Feathers, wings, lays eggs.', 'Masiba, mapheo, e behela mahe.') },
  { emo: '🐓', en: 'chicken', st: 'khoho', g: 'bird', why: L('Feathers and lays eggs.', 'Masiba ebile e behela mahe.') },
  { emo: '🐍', en: 'snake', st: 'noha', g: 'rep', why: L('Dry scales, lays eggs on land.', 'Makhakhapha a omileng, e behela mahe fatše.') },
  { emo: '🦎', en: 'lizard', st: 'mokhosi', g: 'rep', why: L('Dry scaly skin, cold-blooded.', 'Letlalo le nang le makhakhapha, mali a batang.') },
  { emo: '🐸', en: 'frog', st: 'senqanqane', g: 'amph', why: L('Lives in water when young (tadpole) and on land later; moist skin.', 'E phela metsing ha e sa le nyane (koeekoee) ebe e phela fatše; letlalo le metsi.') },
  { emo: '🐟', en: 'fish (trout)', st: 'tlhapi', g: 'fish', why: L('Gills, fins, lives in water.', 'Lipheleng tsa ho hema (gills), mapheo a ho sesa, e phela metsing.') },
  { emo: '🐝', en: 'bee', st: 'notši', g: 'ins', why: L('Six legs and three body parts.', 'Maoto a tšeletseng le likarolo tse tharo tsa \'mele.') },
  { emo: '🦋', en: 'butterfly', st: 'serurubele', g: 'ins', why: L('Six legs, three body parts, wings.', 'Maoto a 6, likarolo tse 3 tsa \'mele, mapheo.') },
  { emo: '🐕', en: 'dog', st: 'ntja', g: 'mam', why: L('Hair and feeds puppies milk.', 'Moriri ebile e anyesa malinyane.') },
  { emo: '🦇', en: 'bat', st: 'mankhane', g: 'mam', why: L('It flies, but it has hair and feeds its babies milk – a mammal!', 'Ea fofa, empa e na le moriri ebile e anyesa – ke phoofolo e anyesang!') }
];
const GROUPS = [{ id: 'mam', emo: '🐄', en: 'Mammal', st: 'Phoofolo e anyesang' }, { id: 'bird', emo: '🪶', en: 'Bird', st: 'Nonyana' }, { id: 'rep', emo: '🐍', en: 'Reptile', st: 'Sehahabi' }, { id: 'amph', emo: '🐸', en: 'Amphibian', st: 'Sephela-metsing le fatše' }, { id: 'fish', emo: '🐟', en: 'Fish', st: 'Tlhapi' }, { id: 'ins', emo: '🐝', en: 'Insect', st: 'Kokoanyana' }];

LESELI.addLessons('science', [
/* ======================= GRADE 5 ======================= */
{ id: 's5-animals', grade: 5, hard: true, title: L(`Classifying animals`, `Ho hlopha liphoofolo`),
  sections: [
    S(`Animals with and without a backbone`, `Liphoofolo tse nang le tse se nang mokokotlo`, `Scientists sort animals into groups by what their bodies are like. **Vertebrates** have a backbone (cow, frog, eagle). **Invertebrates** have no backbone (bee, worm, spider, snail).`, `Bo-ramahlale ba hlopha liphoofolo ka mokhoa oo 'mele ea tsona e leng ka oona. **Vertebrates** li na le mokokotlo (khomo, senqanqane, ntsu). **Invertebrates** ha li na mokokotlo (notši, seboko, sekho, khofu).`),
    S(`Five groups of vertebrates`, `Lihlopha tse hlano tsa liphoofolo tse nang le mokokotlo`, `- **Mammals**: hair or fur, babies drink milk (cow, sheep, dog, people, bat)\n- **Birds**: feathers, wings, lay eggs with hard shells (chicken, eagle)\n- **Reptiles**: dry scales, lay eggs on land (snake, lizard, tortoise)\n- **Amphibians**: moist skin, young live in water and adults on land (frog)\n- **Fish**: gills, fins and scales, live in water (trout in the Senqu river)`, `- **Tse anyesang (mammals)**: moriri kapa boea, bana ba anya lebese (khomo, nku, ntja, batho, mankhane)\n- **Linonyana**: masiba, mapheo, li behela mahe a nang le likhetla tse thata (khoho, ntsu)\n- **Lihahabi**: makhakhapha a omileng, li behela mahe fatše (noha, mokhosi, khudu)\n- **Liphela-metsing le fatše (amphibians)**: letlalo le metsi, ba banyenyane ba phela metsing, ba baholo fatše (senqanqane)\n- **Litlhapi**: li-gill, mapheo a ho sesa le makhakhapha, li phela metsing (tlhapi nokeng ea Senqu)`, { tool: 'sort', toolOpts: { items: ANIMALS, groups: GROUPS } }),
    S(`Insects`, `Likokoanyana`, `Insects are invertebrates with **6 legs** and **3 body parts** (head, thorax, abdomen). Many have wings. A spider has 8 legs, so it is NOT an insect.`, `Likokoanyana ke invertebrates tse nang le **maoto a 6** le **likarolo tse 3 tsa 'mele** (hlooho, sefuba, mpa). Tse ngata li na le mapheo. Sekho se na le maoto a 8, kahoo HASE kokoanyana.`)
  ],
  words: [['mammal', 'phoofolo e anyesang'], ['bird', 'nonyana'], ['reptile', 'sehahabi'], ['insect', 'kokoanyana'], ['backbone', 'mokokotlo'], ['feathers', 'masiba'], ['scales', 'makhakhapha']],
  quiz: [
    Q(`A bat flies but it is a…`, `Mankhane oa fofa empa ke…`, [['mammal', 'phoofolo e anyesang'], ['bird', 'nonyana'], ['insect', 'kokoanyana'], ['reptile', 'sehahabi']], 0, `It has hair and feeds its young milk.`, `E na le moriri ebile e anyesa.`),
    Q(`Which animal is an amphibian?`, `Ke phoofolo efe e leng amphibian?`, [['frog', 'senqanqane'], ['snake', 'noha'], ['trout', 'tlhapi'], ['eagle', 'ntsu']], 0),
    N(`How many legs does an insect have?`, `Kokoanyana e na le maoto a makae?`, 6),
    Q(`Which group has feathers?`, `Ke sehlopha sefe se nang le masiba?`, [['birds', 'linonyana'], ['fish', 'litlhapi'], ['mammals', 'tse anyesang'], ['reptiles', 'lihahabi']], 0),
    TF(`A spider is an insect.`, `Sekho ke kokoanyana.`, false, `It has 8 legs and 2 body parts.`, `Se na le maoto a 8 le likarolo tse 2 tsa 'mele.`),
    Q(`Which animal has NO backbone?`, `Ke phoofolo efe e SE NANG mokokotlo?`, [['snail', 'khofu'], ['sheep', 'nku'], ['lizard', 'mokhosi'], ['chicken', 'khoho']], 0)
  ], ask: ['what is a reptile?', 'is a bat a bird?'] },

{ id: 's5-oxygen', grade: 5, outcome: 'LO 6', hard: true, title: L(`Air and oxygen: burning, breathing and rust`, `Moea le oksijene: ho tuka, ho hema le mafome`),
  sections: [
    S(`Air is a mixture of gases`, `Moea ke motsoako oa likhase`, `We cannot see air, but it is all around us. Air is a mixture of gases: about 78% **nitrogen**, 21% **oxygen**, and small amounts of **carbon dioxide** and other gases.`, `Ha re bone moea, empa o re potolohile. Moea ke motsoako oa likhase: ka bang 78% ke **naetrojene**, 21% ke **oksijene**, 'me ho na le **carbon dioxide** e nyenyane le likhase tse ling.`),
    S(`Oxygen supports burning`, `Oksijene e thusa mollo ho tuka`, `A fire needs three things: **fuel** (wood, paraffin, gas), **heat**, and **oxygen**. Cover a burning candle with a jar: the flame uses up the oxygen and goes out. That is why we smother a pan fire with a lid or a wet cloth.`, `Mollo o hloka lintho tse tharo: **mafura/patsi** (patsi, parafene, khase), **mocheso**, le **oksijene**. Koahela kerese e tukang ka nkho: lelakabe le sebelisa oksijene 'me lea tima. Ke ka hona re koahelang mollo oa pane ka sekoahelo kapa lesela le metsi.`, { tool: 'candle' }),
    S(`Oxygen supports life`, `Oksijene e phelisa`, `People and animals **breathe in** oxygen and **breathe out** carbon dioxide. Fish take oxygen from water with their gills. Plants make oxygen in sunlight. A room with a burning brazier (mbaola) and closed windows is dangerous – the fire uses oxygen and makes poisonous carbon monoxide. Always keep a window open!`, `Batho le liphoofolo ba **hema** oksijene 'me ba **hemela ka ntle** carbon dioxide. Litlhapi li nka oksijene metsing ka li-gill. Limela li etsa oksijene khanyeng ea letsatsi. Kamore e nang le mbaola e tukang 'me lifensetere li koetsoe e kotsi – mollo o sebelisa oksijene 'me o etsa khase e chefo (carbon monoxide). Kamehla siea fensetere e bulehile!`),
    S(`Oxygen causes rust`, `Oksijene e baka mafome`, `Iron left outside gets **rust** (brown and flaky). Rust needs **oxygen and water** together. We stop rust with paint, oil or grease – that is why gates and roofs are painted.`, `Tšepe e siuoeng ka ntle e ba le **mafome** (a sootho a khahlang). Mafome a hloka **oksijene le metsi** hammoho. Re thibela mafome ka pente, oli kapa mafura – ke ka hona liheke le marulelo a pentiloeng.`)
  ],
  words: [['oxygen', 'oksijene'], ['air', 'moea'], ['gas', 'khase'], ['rust', 'mafome'], ['breathe', 'hema'], ['fire', 'mollo'], ['candle', 'kerese']],
  quiz: [
    Q(`Which gas do we need to breathe in?`, `Ke khase efe eo re e hlokang ho hema?`, [['oxygen', 'oksijene'], ['carbon dioxide', 'carbon dioxide'], ['nitrogen', 'naetrojene'], ['smoke', 'mosi']], 0),
    Q(`Why does a candle go out under a jar?`, `Hobaneng kerese e tima ka tlas'a nkho?`, [['The oxygen is used up', 'Oksijene ea fela'], ['The jar is cold', 'Nkho e batile'], ['The wax melts', 'Boka boa qhibiliha'], ['It gets dark', 'Hoa fifala']], 0),
    Q(`Rust needs…`, `Mafome a hloka…`, [['oxygen and water', 'oksijene le metsi'], ['only sun', 'letsatsi feela'], ['only wind', 'moea feela'], ['salt only', 'letsoai feela']], 0),
    TF(`It is safe to sleep with a burning brazier (mbaola) and all windows closed.`, `Ho bolokehile ho robala le mbaola e tukang 'me lifensetere tsohle li koetsoe.`, false, `It can kill. Always let fresh air in.`, `E ka bolaea. Kamehla kenya moea o hloekileng.`),
    Q(`Which part of the air is oxygen?`, `Oksijene ke karolo efe ea moea?`, ['about 21%', 'about 78%', '100%', '1%'], 0)
  ], ask: ['what is oxygen?', 'why does iron rust?'] },

{ id: 's5-measure', grade: 5, outcome: 'LO 1, 2, 3', title: L(`Measuring weather: thermometer, rain gauge, scale`, `Ho lekanya boemo ba leholimo: thermometer, rain gauge, sekala`),
  sections: [
    S(`Temperature`, `Mocheso`, `A **thermometer** measures how hot or cold something is, in **degrees Celsius (°C)**. Water freezes at 0 °C and boils at 100 °C. In Lesotho winter nights can fall below 0 °C and summer days can reach 30 °C. Read the level of the red liquid at eye level.`, `**Thermometer** e lekanya hore na ntho e chesa kapa e bata hakae, ka **likhato tsa Celsius (°C)**. Metsi a hoama ho 0 °C 'me a bela ho 100 °C. Lesotho masiu a mariha a ka theohela ka tlase ho 0 °C 'me matsatsi a lehlabula a ka fihla 30 °C. Bala boemo ba mokelikeli o mofubelu mahlo a lekana le oona.`, { tool: 'thermometer' }),
    S(`Rainfall`, `Pula`, `A **rain gauge** collects rain. Read the water level in **millimetres (mm)** every morning at the same time, then empty it. Make one: cut the top off a plastic bottle, turn it upside down as a funnel, and stick a ruler on the side.`, `**Rain gauge** e bokella pula. Bala boemo ba metsi ka **limilimithara (mm)** hoseng ho hong le ho hong ka nako e tšoanang, ebe u e tšolla. Iketsetse: seha karolo e ka holimo ea botlolo ea polasetiki, e phethole e be fanele, 'me u khomarele rulara ka thoko.`, { tool: 'raingauge' }),
    S(`Mass`, `Boima`, `A **pan scale** (balance) compares masses. Put the object on one pan and known masses on the other until they balance. Mass is measured in grams (g) and kilograms (kg). 1 kg = 1 000 g.`, `**Sekala sa lipane** se bapisa boima. Beha ntho pane e 'ngoe 'me u behe boima bo tsebahalang ho e 'ngoe ho fihlela li lekana. Boima bo lekanngoa ka ligrama (g) le likilograma (kg). 1 kg = 1 000 g.`)
  ],
  words: [['thermometer', 'thermometer'], ['rain gauge', 'rain gauge (selekanya-pula)'], ['mass', 'boima'], ['weather', 'boemo ba leholimo'], ['cold', 'bata'], ['hot', 'chesa']],
  quiz: [
    N(`Water freezes at ? °C`, `Metsi a hoama ho ? °C`, 0), N(`1 kg = ? g`, `1 kg = ? g`, 1000),
    Q(`Rainfall is measured in…`, `Pula e lekanngoa ka…`, ['mm', 'kg', '°C', 'litres per person'], 0),
    Q(`Which instrument measures temperature?`, `Ke sesebelisoa sefe se lekanyang mocheso?`, ['thermometer', 'rain gauge', 'ruler', 'pan scale'], 0)
  ] },

{ id: 's5-heat', grade: 5, outcome: 'LO 4, 5', title: L(`Heat: sources and effects`, `Mocheso: mehloli le liphello`),
  sections: [
    S(`Sources of heat`, `Mehloli ea mocheso`, `Heat comes from the **sun**, **fire** (wood, dung, paraffin, gas), **electricity** (stove, heater) and **rubbing** (rub your hands together). The sun is our biggest source of heat and light.`, `Mocheso o tsoa **letsatsing**, **mollong** (patsi, lisu, parafene, khase), **motlakaseng** (setofo, hitara) le ho **hohla** (hohla matsoho a hau). Letsatsi ke mohloli o moholo ka ho fetisisa oa mocheso le khanya.`),
    S(`What heat does to solids and liquids`, `Seo mocheso o se etsang lintho tse tiileng le mekelikeli`, `- Heat makes things **expand** (get a little bigger); cooling makes them **contract**. That is why telephone wires sag in summer.\n- Heat **melts** solids: ice → water, fat → oil.\n- Heat **evaporates** liquids: water → steam. Cooling **condenses** steam back to water drops (look at a pot lid!).`, `- Mocheso o etsa hore lintho li **atolohe** (li holele hanyane); ho bata ho etsa hore li **honyelle**. Ke ka hona lithapo tsa mohala li leketlang lehlabula.\n- Mocheso o **qhibilihisa** lintho tse tiileng: leqhoa → metsi, mafura → oli.\n- Mocheso o **fetola mekelikeli mouoane**: metsi → mouoane. Ho bata ho **khutlisa** mouoane hore e be marotholi a metsi (sheba sekoahelo sa pitsa!).`)
  ],
  words: [['heat', 'mocheso'], ['melt', 'qhibiliha'], ['steam', 'mouoane'], ['expand', 'atoloha'], ['sun', 'letsatsi']],
  quiz: [
    Q(`What happens to ice when it is heated?`, `Ho etsahala'ng ka leqhoa ha le futhumatsoa?`, [['It melts', 'Lea qhibiliha'], ['It gets harder', 'Le thatafala'], ['Nothing', 'Ha ho letho'], ['It turns to wood', 'Le fetoha patsi']], 0),
    Q(`What is our biggest source of heat?`, `Mohloli oa rona o moholo oa mocheso ke ofe?`, [['the sun', 'letsatsi'], ['the moon', 'khoeli'], ['a candle', 'kerese'], ['a fridge', 'sehatsetsi']], 0),
    TF(`Metal expands when it is heated.`, `Tšepe ea atoloha ha e futhumatsoa.`, true)
  ] },

{ id: 's5-food', grade: 5, outcome: 'LO 7, 8, 9, 10', title: L(`Food, nutrients and healthy meals`, `Lijo, limatlafatsi le lijo tse phetseng hantle`),
  sections: [
    S(`Nutrients and what they do`, `Limatlafatsi le mosebetsi oa tsona`, `- **Carbohydrates** give energy: papa, bread, potatoes, sorghum (mabele)\n- **Proteins** build the body: beans, eggs, milk, meat, fish, peas (lierekisi)\n- **Fats** give energy and warmth: oil, butter, peanuts\n- **Vitamins and minerals** protect us from disease: green vegetables (moroho, spinach, rape), fruit\n- **Water** – drink clean water every day`, `- **Li-carbohydrate** li fana ka matla: papa, bohobe, litapole, mabele\n- **Liprotheine** li haha 'mele: linaoa, mahe, lebese, nama, tlhapi, lierekisi\n- **Mafura** a fana ka matla le mofuthu: oli, botoro, makotomane\n- **Livithamine le liminerale** li re sireletsa mafung: meroho e metala (moroho, sepinache, rapa), litholoana\n- **Metsi** – noa metsi a hloekileng letsatsi le leng le le leng`, { tool: 'sort', toolOpts: { items: [{ emo: '🍞', en: 'bread', st: 'bohobe', g: 'c' }, { emo: '🥚', en: 'eggs', st: 'mahe', g: 'p' }, { emo: '🥬', en: 'moroho (spinach)', st: 'moroho', g: 'v' }, { emo: '🫘', en: 'beans', st: 'linaoa', g: 'p' }, { emo: '🥔', en: 'potatoes', st: 'litapole', g: 'c' }, { emo: '🍊', en: 'orange', st: 'lamunu', g: 'v' }, { emo: '🥜', en: 'peanuts', st: 'makotomane', g: 'f' }, { emo: '🥛', en: 'milk', st: 'lebese', g: 'p' }], groups: [{ id: 'c', emo: '⚡', en: 'Energy (carbohydrates)', st: 'Matla (li-carbohydrate)' }, { id: 'p', emo: '💪', en: 'Body-building (proteins)', st: 'Ho haha \'mele (liprotheine)' }, { id: 'v', emo: '🛡️', en: 'Protection (vitamins)', st: 'Tšireletso (livithamine)' }, { id: 'f', emo: '🔥', en: 'Fats', st: 'Mafura' }] } }),
    S(`Preparing vegetables and eggs`, `Ho pheha meroho le mahe`, `Wash green vegetables **before** cutting them, cook them for a short time with little water and a lid – long boiling destroys vitamins. Boil eggs for about 10 minutes, or scramble them. Always wash hands first!`, `Hlatsoa meroho e metala **pele** u e seha, e phehe nako e khutšoanyane ka metsi a fokolang 'me u koahele – ho bela nako e telele ho senya livithamine. Bela mahe metsotso e ka bang 10, kapa u a hlohle. Kamehla hlatsoa matsoho pele!`),
    S(`Deficiency diseases`, `Mafu a tlhaello ea limatlafatsi`, `Without enough protein children can get **kwashiorkor** (swollen belly, thin arms). Without enough iron people get **anaemia** (tired, pale). Without vitamin C – **scurvy** (bleeding gums). A balanced diet prevents these.`, `Ntle le protheine e lekaneng bana ba ka tšoaroa ke **kwashiorkor** (mpa e ruruhileng, matsoho a masesane). Ntle le aene e lekaneng batho ba fumana **anaemia** (mokhathala, ho tšoeufala). Ntle le vithamine C – **scurvy** (marenene a tsoang mali). Lijo tse leka-lekaneng li thibela mafu ana.`)
  ],
  words: [['food', 'lijo'], ['vegetables', 'meroho'], ['eggs', 'mahe'], ['beans', 'linaoa'], ['energy', 'matla'], ['healthy', 'phetseng hantle']],
  quiz: [
    Q(`Which food gives mostly protein?`, `Ke lijo life tse fanang haholo ka protheine?`, [['beans', 'linaoa'], ['sugar', 'tsoekere'], ['oil', 'oli'], ['papa', 'papa']], 0),
    Q(`Which nutrient gives energy?`, `Ke matlafatsi afe a fanang ka matla?`, [['carbohydrates', 'li-carbohydrate'], ['vitamins', 'livithamine'], ['water', 'metsi'], ['minerals', 'liminerale']], 0),
    Q(`Kwashiorkor is caused by too little…`, `Kwashiorkor e bakoa ke ho haelloa ke…`, [['protein', 'protheine'], ['sugar', 'tsoekere'], ['water', 'metsi'], ['fat', 'mafura']], 0),
    TF(`We should wash vegetables before cutting them.`, `Re lokela ho hlatsoa meroho pele re e seha.`, true)
  ] },

{ id: 's5-health', grade: 5, outcome: 'LO 11, 12, 18, 21', title: L(`Diseases, hygiene and keeping clean`, `Mafu, bohloeki le ho lula re hloekile`),
  sections: [
    S(`Infectious and non-infectious diseases`, `Mafu a tšoaetsanoang le a sa tšoaetsanoeng`, `**Infectious** diseases spread from person to person through germs: flu, TB, diarrhoea, COVID-19, HIV. **Non-infectious** diseases do not spread: diabetes, high blood pressure, asthma.`, `Mafu a **tšoaetsanoang** a hasana ho tloha ho motho ho ea ho e mong ka likokoana-hloko: ntaramane, TB, letšollo, COVID-19, HIV. Mafu a **sa tšoaetsanoeng** ha a hasane: lefu la tsoekere, khatello e phahameng ea mali, asthma.`),
    S(`Stop the germs`, `Thibela likokoana-hloko`, `- Wash hands with soap after the toilet and before eating\n- Cough or sneeze into your elbow\n- Drink clean or boiled water\n- Keep the toilet and kitchen clean, cover food from flies\n- Bath and wash your clothes regularly – it also helps you feel good about yourself`, `- Hlatsoa matsoho ka sesepa ka mor'a ntloana le pele u ja\n- Khohlela kapa u thimole ka setsoe\n- Noa metsi a hloekileng kapa a belisitsoeng\n- Boloka ntloana le kichine li hloekile, koahela lijo ho lintsintsi\n- Hlapa 'me u hlatsoe liaparo tsa hau khafetsa – ho boetse ho u thusa ho ikutloa hantle`)
  ],
  words: [['germs', 'likokoana-hloko'], ['soap', 'sesepa'], ['clean', 'hloekile'], ['disease', 'lefu'], ['wash', 'hlatsoa']],
  quiz: [
    Q(`Which disease is infectious?`, `Ke lefu lefe le tšoaetsanoang?`, [['TB', 'TB'], ['diabetes', 'lefu la tsoekere'], ['asthma', 'asthma'], ['high blood pressure', 'khatello ea mali']], 0),
    Q(`When must you wash your hands?`, `U tlameha ho hlatsoa matsoho neng?`, [['after the toilet and before eating', "ka mor'a ntloana le pele u ja"], ['only on Sunday', 'Sontaha feela'], ['never', 'le ka mohla'], ['only when they look dirty', 'ha a shebahala a le litšila feela']], 0),
    TF(`Sneezing into your elbow helps stop germs spreading.`, `Ho thimola ka setsoe ho thusa ho thibela likokoana-hloko.`, true)
  ] },

/* ======================= GRADE 6 ======================= */
{ id: 's6-plants', grade: 6, title: L(`Plants: parts and photosynthesis`, `Limela: likarolo le photosynthesis`),
  sections: [
    S(`Parts of a plant`, `Likarolo tsa semela`, `- **Roots** hold the plant in the soil and take in water and minerals\n- The **stem** carries water up and food down\n- **Leaves** make food\n- **Flowers** make seeds so new plants can grow`, `- **Metso** e tšoara semela mobung 'me e monya metsi le liminerale\n- **Kutu** e isa metsi holimo le lijo tlase\n- **Makhasi** a etsa lijo\n- **Lipalesa** li etsa peō e le hore limela tse ncha li hole`),
    S(`Photosynthesis`, `Photosynthesis`, `Green leaves make food (sugar) using **sunlight**, **water** and **carbon dioxide** from the air. The green colour (chlorophyll) catches the light. Plants give out **oxygen** – the oxygen we breathe! Without plants there would be no food and no oxygen.`, `Makhasi a matala a etsa lijo (tsoekere) a sebelisa **khanya ea letsatsi**, **metsi** le **carbon dioxide** e tsoang moeeng. 'Mala o motala (chlorophyll) o tšoasa khanya. Limela li ntša **oksijene** – oksijene eo re e hemang! Ntle le limela ho ne ho ke ke ha e-ba le lijo kapa oksijene.`)
  ],
  words: [['root', 'motso'], ['stem', 'kutu'], ['leaf', 'lekhasi'], ['flower', 'palesa'], ['seed', 'peō'], ['sunlight', 'khanya ea letsatsi']],
  quiz: [
    Q(`Which part makes food for the plant?`, `Ke karolo efe e etsetsang semela lijo?`, [['leaves', 'makhasi'], ['roots', 'metso'], ['flowers', 'lipalesa'], ['soil', 'mobu']], 0),
    Q(`What gas do plants give out in sunlight?`, `Limela li ntša khase efe khanyeng ea letsatsi?`, [['oxygen', 'oksijene'], ['smoke', 'mosi'], ['carbon monoxide', 'carbon monoxide'], ['nitrogen', 'naetrojene']], 0),
    Q(`Roots take in…`, `Metso e monya…`, [['water and minerals', 'metsi le liminerale'], ['sunlight', 'khanya ea letsatsi'], ['oxygen only', 'oksijene feela'], ['food from people', 'lijo tsa batho']], 0)
  ], ask: ['what is photosynthesis?'] },

{ id: 's6-body', grade: 6, title: L(`The human body: digestion, breathing, blood`, `'Mele oa motho: tšilo ea lijo, ho hema, mali`),
  sections: [
    S(`Digestion`, `Tšilo ea lijo`, `Food goes: **mouth** (teeth chew, saliva) → **gullet** → **stomach** (acids break food down) → **small intestine** (nutrients go into the blood) → **large intestine** (water taken back) → waste leaves the body.`, `Lijo li tsamaea: **molomo** (meno a hlafuna, mathe) → **'metso** → **mpa** (liasiti li silakanya lijo) → **mala a manyenyane** (limatlafatsi li kena maling) → **mala a maholo** (metsi a khutlisoa) → litšila li tsoa 'meleng.`),
    S(`Breathing and the heart`, `Ho hema le pelo`, `Air goes through the nose and windpipe into the **lungs**. Oxygen goes into the blood. The **heart** is a pump: it pushes blood around the body about 70 times a minute. Feel your pulse at your wrist!`, `Moea o kena ka nko le phala ea moea ho ea **matšoafong**. Oksijene e kena maling. **Pelo** ke pompo: e sutumetsa mali 'meleng oohle makhetlo a ka bang 70 ka motsotso. Utloa pelo ea hau e otla letsohong!`)
  ],
  words: [['heart', 'pelo'], ['lungs', 'matšoafo'], ['stomach', 'mpa'], ['blood', 'mali'], ['teeth', 'meno']],
  quiz: [
    Q(`Which organ pumps blood?`, `Ke setho sefe se pompang mali?`, [['heart', 'pelo'], ['lungs', 'matšoafo'], ['stomach', 'mpa'], ['brain', 'boko']], 0),
    Q(`Where does oxygen enter the blood?`, `Oksijene e kena maling hokae?`, [['lungs', 'matšoafong'], ['stomach', 'mpeng'], ['teeth', 'menong'], ['skin of the feet', 'letlalong la maoto']], 0),
    Q(`Digestion starts in the…`, `Tšilo ea lijo e qala…`, [['mouth', 'molomong'], ['heart', 'pelong'], ['large intestine', 'maleng a maholo'], ['lungs', 'matšoafong']], 0)
  ] },

{ id: 's6-electricity', grade: 6, title: L(`Electricity and simple circuits`, `Motlakase le lipotoloho tse bonolo`),
  sections: [
    S(`A complete circuit`, `Potoloho e felletseng`, `Electricity flows only around a **complete circuit**: battery → wire → bulb → wire → back to the battery. A **switch** opens or closes the gap. Press the switch below.`, `Motlakase o phalla feela ho **potoloho e felletseng**: betri → terata → bolebe → terata → ho khutlela betring. **Switch** e bula kapa e koala sekheo. Tobetsa switch e ka tlase.`, { tool: 'circuit' }),
    S(`Conductors and insulators`, `Li-conductor le li-insulator`, `**Conductors** let electricity through: copper, iron, aluminium. **Insulators** do not: plastic, rubber, wood, glass. Wires are covered in plastic to keep us safe.\n**Safety:** never touch a broken wire, never put things into a plug socket, never fly a kite near power lines. Lesotho's electricity comes mostly from water (the 'Muela hydropower station).`, `**Li-conductor** li tlohella motlakase o fete: koporo, tšepe, aluminiamo. **Li-insulator** ha li o tlohelle: polasetiki, rabara, lepolanka, khalase. Literata li koahetsoe ka polasetiki ho re sireletsa.\n**Polokeho:** le ka mohla u se ke ua ama terata e robehileng, u se ke ua kenya lintho sekoting sa polaka, u se ke ua fofisa khaete haufi le lithapo tsa motlakase. Motlakase oa Lesotho o tsoa haholo metsing (setsi sa 'Muela).`)
  ],
  words: [['electricity', 'motlakase'], ['battery', 'betri'], ['bulb', 'bolebe'], ['wire', 'terata'], ['switch', 'switch'], ['safe', 'bolokehile']],
  quiz: [
    Q(`Which is an insulator?`, `Ke efe e leng insulator?`, [['plastic', 'polasetiki'], ['copper', 'koporo'], ['iron', 'tšepe'], ['aluminium', 'aluminiamo']], 0),
    Q(`The bulb lights when the circuit is…`, `Bolebe bo khanya ha potoloho e…`, [['complete (closed)', 'felletse (koetsoe)'], ['open', 'bulehile'], ['broken', 'robehile'], ['wet', 'metsi']], 0),
    TF(`It is safe to fly a kite near power lines.`, `Ho bolokehile ho fofisa khaete haufi le lithapo tsa motlakase.`, false)
  ] },

{ id: 's6-soil', grade: 6, title: L(`Soil, erosion and conservation`, `Mobu, khoholeho le paballo`),
  sections: [
    S(`Soil`, `Mobu`, `Soil is made of tiny rock pieces, **humus** (rotting plants and animals), water and air. **Sandy** soil drains fast; **clay** soil holds water; **loam** (a mix with humus) is best for crops.`, `Mobu o entsoe ka likotoana tse nyane tsa mafika, **humus** (limela le liphoofolo tse bolileng), metsi le moea. Mobu oa **lehlabathe** o tlohela metsi a feta kapele; mobu oa **letsopa** o tšoara metsi; **loam** (motsoako o nang le humus) o molemo ka ho fetisisa bakeng sa lijalo.`),
    S(`Soil erosion – Lesotho's big problem`, `Khoholeho ea mobu – bothata bo boholo ba Lesotho`, `Rain and wind wash away the top soil and make **dongas** (deep gullies). Causes: overgrazing, cutting trees, ploughing up and down slopes. **Conservation:** plant trees and grass, build stone lines and terraces, plough across the slope (contour ploughing), rotate grazing.`, `Pula le moea li hohola mobu o ka holimo 'me li etsa **mekoti ea likhohola (dongas)**. Lisosa: ho fulisa ho feta tekano, ho rema lifate, ho lema ho nyoloha le ho theoha matsoapo. **Paballo:** lema lifate le joang, haha mela ea majoe le literasi, lema ka ho tšela letsoapo, fapanyetsa makhulo.`)
  ],
  words: [['soil', 'mobu'], ['erosion', 'khoholeho'], ['donga', 'donga (mokoti)'], ['tree', 'sefate'], ['grass', 'joang']],
  quiz: [
    Q(`Which soil is best for crops?`, `Ke mobu ofe o molemo ka ho fetisisa bakeng sa lijalo?`, [['loam', 'loam'], ['sand only', 'lehlabathe feela'], ['stones', 'majoe'], ['clay only', 'letsopa feela']], 0),
    Q(`Which helps stop soil erosion?`, `Ke eng e thusang ho thibela khoholeho ea mobu?`, [['planting trees and grass', 'ho lema lifate le joang'], ['overgrazing', 'ho fulisa ho feta tekano'], ['cutting trees', 'ho rema lifate'], ['ploughing down the slope', 'ho lema ho theoha letsoapo']], 0)
  ] },

/* ======================= GRADE 7 ======================= */
{ id: 's7-matter', grade: 7, title: L(`Matter: states, mixtures and separating`, `Ntho: maemo, metsoako le ho arohanya`),
  sections: [
    S(`Three states of matter`, `Maemo a mararo a ntho`, `**Solid** (fixed shape: stone, ice), **liquid** (takes the shape of its container: water, milk), **gas** (spreads everywhere: steam, air). Heating and cooling change the state: melting, freezing, evaporating, condensing.`, `**E tiileng** (sebopeho se sa fetoheng: lejoe, leqhoa), **mokelikeli** (o nka sebopeho sa sejana: metsi, lebese), **khase** (e ata hohle: mouoane, moea). Ho futhumatsa le ho batisa ho fetola boemo: ho qhibiliha, ho hoama, ho fetoha mouoane, ho khutla e le metsi.`),
    S(`Separating mixtures`, `Ho arohanya metsoako`, `- **Sieving**: flour from stones (a sieve)\n- **Filtering**: sand from water (cloth or filter paper)\n- **Evaporating**: salt from salt water (heat it until the water goes)\n- **Picking/winnowing**: chaff from mabele grain (wind blows the light chaff away)`, `- **Ho sefa**: phofo le majoe (sefe)\n- **Ho hloekisa ka lesela (filtering)**: lehlabathe le metsi\n- **Ho fetola mouoane**: letsoai metsing a letsoai (futhumatsa ho fihlela metsi a fela)\n- **Ho foka**: mohlaka ho mabele (moea o fofisa mohlaka o bobebe)`)
  ],
  words: [['solid', 'e tiileng'], ['liquid', 'mokelikeli'], ['gas', 'khase'], ['mixture', 'motsoako'], ['sieve', 'sefe']],
  quiz: [
    Q(`Steam is a…`, `Mouoane ke…`, [['gas', 'khase'], ['solid', 'e tiileng'], ['liquid', 'mokelikeli'], ['mixture of stones', 'motsoako oa majoe']], 0),
    Q(`How can you get salt back from salt water?`, `U ka khutlisa letsoai metsing a letsoai joang?`, [['evaporate the water', 'fetola metsi mouoane'], ['sieve it', 'e sefe'], ['freeze it', 'e hatsetse'], ['shake it', 'e sisinye']], 0),
    Q(`Winnowing separates…`, `Ho foka ho arohanya…`, [['chaff from grain', 'mohlaka le lijo-thollo'], ['salt from water', 'letsoai le metsi'], ['oil from water', 'oli le metsi'], ['milk from tea', 'lebese le tee']], 0)
  ] },

{ id: 's7-forces', grade: 7, title: L(`Forces and simple machines`, `Matla (forces) le mechini e bonolo`),
  sections: [
    S(`Forces`, `Matla (forces)`, `A force is a **push** or a **pull**. Forces can start, stop, speed up, slow down or change the shape of things. **Gravity** pulls everything down to Earth. **Friction** slows moving things (it is why shoes grip the ground).`, `Force ke **ho sutumetsa** kapa ho **hula**. Matla a ka qala, a emisa, a potlakisa, a liehisa kapa a fetola sebopeho sa lintho. **Gravity** e hulela tsohle fatše. **Friction** e liehisa lintho tse tsamaeang (ke ka hona lieta li tšoarang fatše).`),
    S(`Simple machines make work easier`, `Mechini e bonolo e nolofatsa mosebetsi`, `- **Lever**: a crowbar or a see-saw\n- **Pulley**: lifts a bucket from a well\n- **Inclined plane (ramp)**: rolling a drum into a truck\n- **Wheel and axle**: a wheelbarrow or scotch-cart`, `- **Lever**: lekhopo kapa see-saw\n- **Pulley**: e phahamisa nkho ho tsoa selibeng\n- **Ramp (letsoapo)**: ho bilikisetsa moqomo koloing\n- **Lebili le axle**: kiribae kapa koloi ea lipere`)
  ],
  words: [['force', 'matla (force)'], ['push', 'sutumetsa'], ['pull', 'hula'], ['wheel', 'lebili'], ['gravity', 'gravity']],
  quiz: [
    Q(`A force is…`, `Force ke…`, [['a push or a pull', 'ho sutumetsa kapa ho hula'], ['a colour', "'mala"], ['a sound', 'molumo'], ['a gas', 'khase']], 0),
    Q(`Which force pulls things down to the ground?`, `Ke matla afe a hulelang lintho fatše?`, [['gravity', 'gravity'], ['friction', 'friction'], ['magnetism', 'makenete'], ['wind', 'moea']], 0),
    Q(`A wheelbarrow uses…`, `Kiribae e sebelisa…`, [['a wheel and axle and a lever', 'lebili le axle le lever'], ['a pulley only', 'pulley feela'], ['nothing', 'ha ho letho'], ['electricity', 'motlakase']], 0)
  ] },

{ id: 's7-earth', grade: 7, title: L(`Earth, sun and moon`, `Lefatše, letsatsi le khoeli`),
  sections: [
    S(`Day and night, seasons`, `Motšehare le bosiu, linako tsa selemo`, `The Earth **spins** once every 24 hours: the side facing the sun has day, the other side has night. The Earth goes **around the sun** once a year (365 days). Because the Earth is tilted we have seasons: in Lesotho summer is December–February and winter is June–August.`, `Lefatše le **ipotoloha** hang ka lihora tse 24: lehlakore le shebileng letsatsi le na le motšehare, le leng le na le bosiu. Lefatše le **potoloha letsatsi** hang ka selemo (matsatsi a 365). Kaha lefatše le sekame re na le linako tsa selemo: Lesotho lehlabula ke Tšitoe–Hlakola 'me mariha ke Phupjane–Phato.`),
    S(`The moon and the solar system`, `Khoeli le sistimi ea letsatsi`, `The moon goes around the Earth about once a month (29½ days) and does not make its own light – it reflects sunlight. There are 8 planets: Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus, Neptune.`, `Khoeli e potoloha lefatše hang ka khoeli (matsatsi a ka bang 29½) 'me ha e iketsetse khanya – e bonahatsa khanya ea letsatsi. Ho na le lipolanete tse 8: Mercury, Venus, Lefatše, Mars, Jupiter, Saturn, Uranus, Neptune.`)
  ],
  words: [['earth', 'lefatše'], ['moon', 'khoeli'], ['star', 'naleli'], ['season', 'nako ea selemo'], ['winter', 'mariha'], ['summer', 'lehlabula']],
  quiz: [
    N(`How many hours does the Earth take to spin once?`, `Lefatše le nka lihora tse kae ho ipotoloha hang?`, 24),
    Q(`Why do we have day and night?`, `Hobaneng re e-na le motšehare le bosiu?`, [['The Earth spins', 'Lefatše lea ipotoloha'], ['The sun switches off', 'Letsatsi lea tima'], ['Clouds', 'Maru'], ['The moon blocks the sun every night', 'Khoeli e koahela letsatsi bosiu bo bong le bo bong']], 0),
    Q(`In Lesotho, June to August is…`, `Lesotho, Phupjane ho isa Phato ke…`, [['winter', 'mariha'], ['summer', 'lehlabula'], ['spring', 'selemo'], ['autumn', 'hoetla']], 0)
  ] },

{ id: 's7-health', grade: 7, title: L(`Growing up healthy: puberty, HIV and substance abuse`, `Ho hola re phetse hantle: bocha, HIV le tšebeliso e mpe ea lithethefatsi`),
  sections: [
    S(`Puberty`, `Bocha (puberty)`, `Between about 9 and 16 the body changes from a child to an adult. Girls and boys grow taller, grow hair, voices change; girls begin to have periods. These changes are normal. Ask a trusted adult (parent, teacher, nurse) any question.`, `Pakeng tsa lilemo tse ka bang 9 le 16 'mele o fetoha ho tloha ho ngoana ho ea ho motho e moholo. Banana le bashanyana ba hola ba ba balelele, ba mela moriri, mantsoe a fetoha; banana ba qala ho ea khoeling. Liphetoho tsena li tloaelehile. Botsa motho e moholo eo u mo tšepang (motsoali, mosuoe, mooki) potso efe kapa efe.`),
    S(`HIV`, `HIV`, `HIV is a virus that weakens the body's defence. It spreads through blood and unprotected sex, and from mother to baby – **not** by hugging, sharing cups or shaking hands. People living with HIV who take their ARVs every day live long, healthy lives. Treat everyone with respect.`, `HIV ke vaerase e fokolisang tšireletso ea 'mele. E fetela ka mali le thobalano e sa sireletsoang, le ho tloha ho 'mè ho ea ho lesea – **eseng** ka ho haka, ho arolelana linoelo kapa ho tšoarana ka matsoho. Batho ba phelang le HIV ba noang li-ARV letsatsi le leng le le leng ba phela nako e telele ba phetse hantle. Hlompha bohle.`),
    S(`Say no to drugs`, `Hana lithethefatsi`, `Dagga, alcohol, glue and cigarettes harm the brain, lungs and liver of growing children. If someone pressures you: say **"No, thank you"**, walk away, and tell a trusted adult. Real friends respect your choice.`, `Matekoane, joala, sekhomaretsi le koae li senya boko, matšoafo le sebete sa bana ba holang. Haeba motho a u qobella: re **"Che, kea leboha"**, tsamaea, 'me u bolelle motho e moholo eo u mo tšepang. Metsoalle ea 'nete e hlompha khetho ea hau.`)
  ],
  words: [['healthy', 'phetseng hantle'], ['virus', 'vaerase'], ['respect', 'hlompha'], ['trust', 'tšepa'], ['say no', 'hana']],
  quiz: [
    Q(`HIV is NOT spread by…`, `HIV HA E fetisoe ka…`, [['hugging and sharing cups', 'ho haka le ho arolelana linoelo'], ['blood', 'mali'], ['unprotected sex', 'thobalano e sa sireletsoang'], ['mother to baby without treatment', "'mè ho ea ho lesea ntle le kalafo"]], 0),
    Q(`Someone offers you dagga. A good answer is…`, `Motho o u fa matekoane. Karabo e ntle ke…`, [['"No, thank you" and walk away', '"Che, kea leboha" ebe u tsamaea'], ['"Maybe later"', '"Mohlomong hamorao"'], ['Take it to be polite', 'E nke ho ba le mekhoa'], ['Keep it secret', 'E boloke e le lekunutu']], 0),
    TF(`Puberty changes are normal.`, `Liphetoho tsa bocha li tloaelehile.`, true)
  ] }
]);
