/* Creativity and Entrepreneurial – Grades 5–7 (Grade 6 outcomes photographed: syllabus pp. 144–145).
   Three learners said drawing is hard, so drawing lessons give step-by-step methods and a drawing pad
   with a guide grid. */
'use strict';
LESELI.addLessons('creative', [
/* ======================= GRADE 5 ======================= */
{ id: 'c5-drawing', grade: 5, hard: true, title: L(`Drawing step by step: shapes, measuring, sketching`, `Ho taka mohato ka mohato: libopeho, ho lekanya, ho sketcha`),
  sections: [
    S(`Everything is made of simple shapes`, `Tsohle li entsoe ka libopeho tse bonolo`, `Good artists start with **light, simple shapes**: circles, ovals, squares, triangles. A cow = a big oval body + a smaller oval head + four rectangles for legs + triangles for horns. Then you join the shapes, rub out the extra lines and add details. **Press lightly first; darken lines at the end.**`, `Litaki tse ntle li qala ka **libopeho tse bonolo tse bobebe**: lidikadikoe, li-oval, likoere, likhutlo-tharo. Khomo = oval e kholo ea 'mele + oval e nyane ea hlooho + likhutlo-nne tse 4 tsa maoto + likhutlo-tharo tsa linaka. Ebe u kopanya libopeho, u hlakola mela e feteletseng 'me u kenya lintlha. **Hatella butle pele; teneha mela qetellong.**`, { tool: 'drawpad', toolOpts: { guide: 'house' } }),
    S(`Measured drawing`, `Ho taka ka litekanyo`, `Use a ruler to draw exact sizes. If a real table is 2 m long and you draw 1 cm for every 20 cm (**scale 1 : 20**), your drawing is 10 cm long. Measured drawings are used by builders and designers.`, `Sebelisa rulara ho taka boholo bo nepahetseng. Haeba tafole ea 'nete e le bolelele ba 2 m 'me u taka 1 cm bakeng sa 20 cm e 'ngoe le e 'ngoe (**sekala 1 : 20**), setšoantšo sa hau se bolelele ba 10 cm. Litšoantšo tsa litekanyo li sebelisoa ke lihahi le baqapi.`),
    S(`Observational and freehand sketching`, `Ho sketcha ka ho shebisisa`, `Look at the real thing more than at your paper! Sit outside and sketch a mountain, a tree or a rondavel. Notice: things far away look **smaller** and **lighter**; the **shadow** is on the side away from the sun. Shade with the side of your pencil.`, `Sheba ntho ea 'nete ho feta pampiri ea hau! Lula ka ntle 'me u sketche thaba, sefate kapa rondavel. Hlokomela: lintho tse hole li shebahala li **nyenyane** ebile li **khanya**; **moriti** o lehlakoreng le hole le letsatsi. Etsa moriti ka lehlakore la pensele.`),
    S(`Drawing a face (portrait)`, `Ho taka sefahleho`, `1. Draw an egg shape. 2. Draw a light line down the middle and one across the middle – the **eyes go on the middle line**. 3. The nose ends halfway between the eyes and the chin. 4. The mouth is a third of the way from the nose to the chin. 5. Ears go from eye level to nose level. Use the guide on the pad below.`, `1. Taka sebopeho sa lehe. 2. Taka mola o bobebe bohareng ho theoha le o mong ho tšela bohare – **mahlo a mola oa bohareng**. 3. Nko e fela bohareng pakeng tsa mahlo le seledu. 4. Molomo o karolong ea boraro ho tloha nkong ho ea selelung. 5. Litsebe li tloha boemong ba mahlo ho isa ho ba nko. Sebelisa tataiso pading e ka tlase.`, { tool: 'drawpad', toolOpts: { guide: 'face' } })
  ],
  words: [['draw', 'taka'], ['pencil', 'pensele'], ['shape', 'sebopeho'], ['shadow', 'moriti'], ['ruler', 'rulara'], ['face', 'sefahleho']],
  quiz: [
    Q(`How should you start a drawing?`, `U lokela ho qala setšoantšo joang?`, [['with light, simple shapes', 'ka libopeho tse bonolo tse bobebe'], ['with dark details', 'ka lintlha tse tšoeu haholo'], ['with colour only', "ka 'mala feela"], ['with the background', 'ka morao feela']], 0),
    Q(`Where do the eyes go on a face?`, `Mahlo a ea kae sefahlehong?`, [['on the middle line', 'molaleng oa bohareng'], ['at the top', 'holimo'], ['near the chin', 'haufi le seledu'], ['on the ears', 'litsebeng']], 0),
    Q(`At a scale of 1 : 20, a 2 m (200 cm) table is drawn…`, `Sekaleng sa 1 : 20, tafole ea 2 m (200 cm) e takoa…`, ['10 cm long', '20 cm long', '2 cm long', '200 cm long'], 0),
    TF(`Things far away look smaller.`, `Lintho tse hole li shebahala li le nyenyane.`, true)
  ] },

{ id: 'c5-colour', grade: 5, outcome: 'G6 LO 4', title: L(`Colours and painting`, `Mebala le ho penta`),
  sections: [
    S(`Primary and secondary colours`, `Mebala ea mantlha le ea bobeli`, `The **primary colours** are **red, yellow and blue** – you cannot mix them from other colours. Mix two primaries to get a **secondary colour**: red + yellow = **orange**, yellow + blue = **green**, blue + red = **purple**. Try it!`, `**Mebala ea mantlha** ke **bofubelu, bosehla le boputsoa** – u ke ke ua e kopanya ho tsoa mebaleng e meng. Kopanya e 'meli ea mantlha ho fumana **'mala oa bobeli**: bofubelu + bosehla = **lamunu**, bosehla + boputsoa = **botala**, boputsoa + bofubelu = **perese**. Leka!`, { tool: 'colourmix' }),
    S(`Warm and cool colours; making paint`, `Mebala e futhumetseng le e pholileng; ho etsa pente`, `**Warm** colours (red, orange, yellow) feel like fire and sun. **Cool** colours (blue, green, purple) feel calm like water. Add white to make a colour lighter (a **tint**), black to make it darker (a **shade**). No paint? Use natural colours: soil, charcoal, crushed leaves, flowers.`, `Mebala e **futhumetseng** (bofubelu, lamunu, bosehla) e tšoana le mollo le letsatsi. E **pholileng** (boputsoa, botala, perese) e khutsitse joaloka metsi. Kenya bosoeu ho bobebisa 'mala, botšo ho o lefifatsa. Ha ho pente? Sebelisa mebala ea tlhaho: mobu, mashala, makhasi a sitsoeng, lipalesa.`)
  ],
  words: [['colour', "'mala"], ['red', 'bofubelu'], ['yellow', 'bosehla'], ['blue', 'boputsoa'], ['green', 'botala'], ['paint', 'pente']],
  quiz: [
    Q(`Yellow + blue = ?`, `Bosehla + boputsoa = ?`, [['green', 'botala'], ['orange', 'lamunu'], ['purple', 'perese'], ['brown', 'bosootho']], 0),
    Q(`Which is a primary colour?`, `Ke 'mala ofe oa mantlha?`, [['red', 'bofubelu'], ['green', 'botala'], ['orange', 'lamunu'], ['purple', 'perese']], 0),
    Q(`Red + yellow = ?`, `Bofubelu + bosehla = ?`, [['orange', 'lamunu'], ['green', 'botala'], ['blue', 'boputsoa'], ['grey', 'boputsoa bo bosoeu']], 0),
    Q(`Which is a cool colour?`, `Ke 'mala ofe o pholileng?`, [['blue', 'boputsoa'], ['red', 'bofubelu'], ['orange', 'lamunu'], ['yellow', 'bosehla']], 0)
  ] },

{ id: 'c5-music', grade: 5, outcome: 'G6 LO 7, 8, 9, 11', title: L(`Music: sound, rhythm and our songs`, `'Mino: molumo, morethetho le lipina tsa rona`),
  sections: [
    S(`Pitch, duration and volume`, `Bophahamo, bolelele le matla a molumo`, `- **Pitch**: how high or low a sound is (a bird whistles high, a cow moos low)\n- **Duration**: how long a sound lasts (a short clap, a long hum)\n- **Volume**: how loud or soft (thunder is loud, whispering is soft)\nThe **lesiba** (a Basotho mouth-bow played by herd boys) and the **setolo-tolo** make sounds by vibration.`, `- **Bophahamo**: molumo o phahame kapa o tlase hakae (nonyana e letsa holimo, khomo e lla tlase)\n- **Bolelele**: molumo o nka nako e kae (ho opa matsoho hanyane, ho bina nako e telele)\n- **Matla**: molumo o holimo kapa o tlase (lealuma le holimo, ho hoeshetsa ho tlase)\n**Lesiba** (seletsa sa balisana) le **setolo-tolo** li etsa melumo ka ho thothomela.`, { tool: 'sort', toolOpts: { items: [{ emo: '🐦', en: 'a bird whistling', st: 'nonyana e letsang molodi', g: 'h' }, { emo: '🐄', en: 'a cow mooing', st: 'khomo e llang', g: 'l' }, { emo: '🥁', en: 'a big drum', st: 'moropa o moholo', g: 'l' }, { emo: '👶', en: 'a baby crying', st: 'lesea le llang', g: 'h' }, { emo: '🦁', en: 'a lion roaring', st: 'tau e purumang', g: 'l' }, { emo: '🐭', en: 'a mouse squeaking', st: 'toeba e llang', g: 'h' }], groups: [{ id: 'h', emo: '⬆️', en: 'High pitch', st: 'Molumo o phahameng' }, { id: 'l', emo: '⬇️', en: 'Low pitch', st: 'Molumo o tlase' }] } }),
    S(`Scales and rhythm`, `Lisekala le morethetho`, `A **scale** is a ladder of notes: **do – re – mi – fa – so – la – ti – do** (tonic sol-fa, used in our school choirs). **Rhythm** is the pattern of long and short sounds: clap *ta ta ti-ti ta*. Songs for **mokhibo**, **mohobelo** and **litolobonya** each have their own rhythm.`, `**Sekala** ke lere la linoto: **do – re – mi – fa – so – la – ti – do** (tonic sol-fa, e sebelisoang ke likhoaere tsa sekolo). **Morethetho** ke paterone ea melumo e melelele le e mekhutšoanyane: opa *ta ta ti-ti ta*. Lipina tsa **mokhibo**, **mohobelo** le tse ling li na le morethetho oa tsona.`)
  ],
  words: [['song', 'pina'], ['sing', 'bina'], ['drum', 'moropa'], ['loud', 'holimo (molumo)'], ['dance', 'tantši'], ['choir', 'khoaere']],
  quiz: [
    Q(`A whistle has a ___ pitch.`, `Molodi o na le molumo o ___.`, [['high', 'phahameng'], ['low', 'tlase'], ['no', 'se nang'], ['red', 'mofubelu']], 0),
    Q(`"Volume" means how…`, `"Volume" e bolela hore molumo o…`, [['loud or soft a sound is', 'matla kapa bonolo'], ['long a song is', 'molelele hakae'], ['high or low', 'holimo kapa tlase'], ['old a song is', 'khale hakae']], 0),
    Q(`What comes after "do – re – mi"?`, `Ho latela eng ka mor'a "do – re – mi"?`, ['fa', 'so', 'la', 'ti'], 0),
    Q(`The lesiba is…`, `Lesiba ke…`, [['a Basotho mouth-bow instrument', 'seletsa sa Basotho se letsoang ka molomo'], ['a dance', 'tantši'], ['a food', 'lijo'], ['a game', 'papali']], 0)
  ] },

{ id: 'c5-crafts', grade: 5, outcome: 'G6 LO 14, 24, 25, 26', title: L(`Crafts from waste: paper mâché, wire, clay`, `Mesebetsi ea matsoho ka litšila: paper mâché, terata, letsopa`),
  sections: [
    S(`Paper mâché`, `Paper mâché`, `1. Tear old newspaper into strips. 2. Mix flour and water into a smooth glue. 3. Dip strips and lay them over a shape (a balloon or crumpled paper) in 3–4 layers. 4. Dry in the sun for 2 days. 5. Paint. You can make bowls, masks and animals.`, `1. Taborisa likoranta tsa khale ka mela. 2. Kopanya phofo le metsi ho etsa sekhomaretsi se boreleli. 3. Kenya mela 'me u e behe holim'a sebopeho (balune kapa pampiri e phuthiloeng) ka mekato e 3–4. 4. Omisa letsatsing matsatsi a 2. 5. Penta. U ka etsa likotlolo, limaske le liphoofolo.`),
    S(`Wire and clay`, `Terata le letsopa`, `Wire cars (*likoloi tsa terata*) are a proud Basotho craft – bend wire with pliers around a drawing of your car. Clay from the river can be shaped into pots and animals, dried, then fired in a hot fire to make it hard.`, `Likoloi tsa terata ke mosebetsi oa matsoho oo Basotho ba ikhohomosang ka oona – koba terata ka pliers ho pota setšoantšo sa koloi ea hau. Letsopa la noka le ka bopoa lipitsa le liphoofolo, la omisoa, ebe le chesoa mollong o chesang hore le thatafale.`),
    S(`Reuse and recycle to earn money`, `Sebelisa hape u etse chelete`, `Plastic bottles become pot plants, pencil holders and brooms; tins become lamps and toys; plastic bags can be woven into mats and bags. Sell them at the school market! This keeps Lesotho clean **and** makes income.`, `Libotlolo tsa polasetiki li fetoha lipitsa tsa limela, lisebelisoa tsa ho boloka lipensele le mafielo; lithini li fetoha mabone le lintho tsa ho bapala; mekotla ea polasetiki e ka lohuoa ho etsa limethe le mekotla. Li rekise mmarakeng oa sekolo! Sena se boloka Lesotho e hloekile **le** ho etsa chelete.`)
  ],
  words: [['wire', 'terata'], ['clay', 'letsopa'], ['glue', 'sekhomaretsi'], ['newspaper', 'koranta'], ['recycle', 'sebelisa hape']],
  quiz: [
    Q(`Paper mâché glue can be made from…`, `Sekhomaretsi sa paper mâché se ka etsoa ka…`, [['flour and water', 'phofo le metsi'], ['sand and oil', 'lehlabathe le oli'], ['salt only', 'letsoai feela'], ['milk and sugar', 'lebese le tsoekere']], 0),
    Q(`Why do we reuse plastic bottles?`, `Hobaneng re sebelisa libotlolo tsa polasetiki hape?`, [['to keep the country clean and earn money', 'ho boloka naha e hloekile le ho etsa chelete'], ['to make more litter', 'ho etsa litšila tse ngata'], ['to burn them', 'ho li chesa'], ['no reason', 'ha ho lebaka']], 0)
  ] },

{ id: 'c5-business', grade: 5, outcome: 'G6 LO 28–36', title: L(`Needs, wants, resources and markets`, `Litlhoko, litakatso, lisebelisoa le limmaraka`),
  sections: [
    S(`Needs and wants`, `Litlhoko le litakatso`, `**Needs** are things we must have to live: food, water, shelter, clothes, health care, education. **Wants** are nice to have: sweets, toys, a TV. Because money and resources are **scarce** (limited), we must choose needs first.`, `**Litlhoko** ke lintho tseo re tlamehang ho ba le tsona ho phela: lijo, metsi, bolulo, liaparo, tlhokomelo ea bophelo, thuto. **Litakatso** ke lintho tse monate ho ba le tsona: lipompong, lintho tsa ho bapala, TV. Kaha chelete le lisebelisoa li **haella**, re tlameha ho khetha litlhoko pele.`),
    S(`Resources`, `Lisebelisoa`, `**Natural resources** come from nature: water, soil, sunshine, grass, diamonds. **Renewable** resources can be replaced (water, wind, sun, trees if we replant). **Non-renewable** resources run out (diamonds, coal, oil). We must use them carefully.`, `**Lisebelisoa tsa tlhaho** li tsoa tlhahong: metsi, mobu, letsatsi, joang, litaemane. Tse **nchafalang** li ka nkeloa sebaka (metsi, moea, letsatsi, lifate haeba re lema hape). Tse **sa nchafaleng** lia fela (litaemane, mashala, oli). Re tlameha ho li sebelisa ka hloko.`, { tool: 'sort', toolOpts: { items: [{ emo: '☀️', en: 'sunlight', st: 'khanya ea letsatsi', g: 'r' }, { emo: '💎', en: 'diamonds (Letšeng mine)', st: 'litaemane (Letšeng)', g: 'n' }, { emo: '💧', en: 'water', st: 'metsi', g: 'r' }, { emo: '🛢️', en: 'petrol / oil', st: 'peterole / oli', g: 'n' }, { emo: '🌬️', en: 'wind', st: 'moea', g: 'r' }, { emo: '⚫', en: 'coal', st: 'mashala', g: 'n' }, { emo: '🌳', en: 'trees (if replanted)', st: 'lifate (ha li lengoa hape)', g: 'r' }], groups: [{ id: 'r', emo: '♻️', en: 'Renewable', st: 'E nchafalang' }, { id: 'n', emo: '⛏️', en: 'Non-renewable', st: 'E sa nchafaleng' }] } }),
    S(`Producers, consumers and markets`, `Bahlahisi, bareki le limmaraka`, `A **producer** makes goods (a farmer grows cabbages) or gives a service (a hairdresser, a taxi driver). A **consumer** buys and uses them. A **market** is where buyers and sellers meet – a street market in Maseru, or an online market on a phone. The **price** depends on cost, demand and how much is available.`, `**Mohlahisi** o etsa thepa (sehoai se lema k'habeche) kapa o fana ka tšebeletso (moetsi oa moriri, mokhanni oa tekesi). **Moreki** o reka 'me o li sebelisa. **Mmaraka** ke moo bareki le barekisi ba kopanang teng – mmaraka oa seterateng Maseru, kapa mmaraka oa inthanete fonong. **Theko** e itšetlehile ka litšenyehelo, tlhoko, le hore na ho na le bongata bo bokae.`)
  ],
  words: [['need', 'tlhoko'], ['want', 'takatso'], ['market', 'mmaraka'], ['producer', 'mohlahisi'], ['consumer', 'moreki'], ['scarce', 'haella']],
  quiz: [
    Q(`Which is a need?`, `Ke efe e leng tlhoko?`, [['clean water', 'metsi a hloekileng'], ['sweets', 'lipompong'], ['a toy car', 'koloi ea ho bapala'], ['a TV', 'TV']], 0),
    Q(`Diamonds are a ___ resource.`, `Litaemane ke sesebelisoa se ___.`, [['non-renewable', 'sa nchafaleng'], ['renewable', 'nchafalang'], ['man-made', 'entsoeng ke motho'], ['free', 'mahala']], 0),
    Q(`A farmer who grows and sells cabbages is a…`, `Sehoai se lemang le ho rekisa k'habeche ke…`, [['producer', 'mohlahisi'], ['consumer', 'moreki'], ['market', 'mmaraka'], ['resource', 'sesebelisoa']], 0),
    TF(`Scarcity means we cannot have everything we want.`, `Tlhaello e bolela hore re ke ke ra ba le tsohle tseo re li batlang.`, true)
  ] },

/* ======================= GRADE 6 ======================= */
{ id: 'c6-advertising', grade: 6, outcome: 'LO 13, 16, 17', title: L(`Advertising, signs and calligraphy`, `Papatso, matšoao le mongolo o motle (calligraphy)`),
  sections: [
    S(`Ways to advertise`, `Mekhoa ea ho bapatsa`, `Posters, radio jingles, WhatsApp status, word of mouth, a sign board, or giving free tastes at the market. A good advert uses **AIDA**: catch **A**ttention, create **I**nterest, make people **D**esire it, ask for **A**ction ("Buy today!"). Adverts must be **honest**.`, `Liphousetara, lipina tsa seea-le-moea, WhatsApp status, molomo ho ea ho o mong, boto ea letšoao, kapa ho fa batho ho latsoa mahala mmarakeng. Papatso e ntle e sebelisa **AIDA**: hohela **tlhokomelo**, tsosa **thahasello**, etsa hore batho ba **lakatse**, kopa **ketso** ("Reka kajeno!"). Lipapatso li tlameha ho bua **'nete**.`),
    S(`Signs and calligraphy`, `Matšoao le calligraphy`, `Warning signs must be simple and clear: a red triangle means danger (*Kotsi!*), a big picture works for people who cannot read. **Calligraphy** is beautiful lettering: hold a flat pen or a cut stick at an angle so lines are thick going down and thin going across.`, `Matšoao a temoso a tlameha ho ba bonolo ebile a hlakile: khutlo-tharo e khubelu e bolela kotsi (*Kotsi!*), setšoantšo se seholo se thusa ba sa tsebeng ho bala. **Calligraphy** ke ho ngola litlhaku tse ntle: tšoara pene e bataletseng kapa lehlaka le khaotsoeng ka sekhutlo hore mela e be teteaneng ha e theoha 'me e be tšesaane ha e tšela.`, { tool: 'drawpad' })
  ],
  words: [['poster', 'phousetara'], ['danger', 'kotsi'], ['sign', 'letšoao'], ['advertise', 'bapatsa'], ['honest', "'nete"]],
  quiz: [
    Q(`In AIDA, the first A means…`, `Ho AIDA, A ea pele e bolela…`, [['attention', 'tlhokomelo'], ['always', 'kamehla'], ['art', 'bonono'], ['answer', 'karabo']], 0),
    Q(`A warning sign should be…`, `Letšoao la temoso le lokela ho ba…`, [['simple, clear, with a picture', 'bonolo, le hlakile, le setšoantšo'], ['very small', 'le lenyenyane haholo'], ['full of long words', 'le tletse mantsoe a malelele'], ['hidden', 'le patiloe']], 0)
  ] },

{ id: 'c6-portraits', grade: 6, outcome: 'LO 2, 3, 5, 15', title: L(`Portraits, costumes and cultures`, `Litšoantšo tsa batho, liaparo le litso`),
  sections: [
    S(`Portraits from different cultures`, `Litšoantšo tsa batho ba litso tse fapaneng`, `A portrait shows a person's face and character. Show culture through clothing and decoration: a Mosotho in a **seanamarena** blanket and **mokorotlo**; a Chinese person in a **qipao** dress; an Indian woman in a **sari**; a European in a suit and hat. Draw with respect – never to make fun of anyone.`, `Setšoantšo sa motho se bontša sefahleho le semelo sa motho. Bontša setso ka liaparo le mekhabiso: Mosotho ka **kobo ea seanamarena** le **mokorotlo**; Mochaena ka mose oa **qipao**; mosali oa India ka **sari**; Moeurope ka sutu le katiba. Taka ka tlhompho – le ka mohla u se ke ua soma motho.`, { tool: 'drawpad', toolOpts: { guide: 'face' } }),
    S(`Basotho costumes for different ages and occasions`, `Liaparo tsa Basotho ho latela lilemo le liketsahalo`, `Girls may wear the **thethana** (beaded skirt) for traditional dances; married women wear the **seshoeshoe** dress and a **tuku** (headscarf); herd boys wear blankets and gumboots; elders wear blankets of special patterns at weddings and funerals. Make costumes for dolls from cloth scraps.`, `Banana ba ka apara **thethana** litantšing tsa setso; basali ba nyetsoeng ba apara mose oa **seshoeshoe** le **tuku**; balisana ba apara likobo le lieta tsa rabara; baholo ba apara likobo tsa mekhabiso e ikhethang manyalong le mapatong. Etsetsa lipopi liaparo ka masela a setseng.`)
  ],
  words: [['portrait', 'setšoantšo sa motho'], ['blanket', 'kobo'], ['dress', 'mose'], ['culture', 'setso'], ['doll', 'popi']],
  quiz: [
    Q(`The traditional Basotho print dress is called…`, `Mose oa setso oa Basotho o bitsoa…`, ['seshoeshoe', 'sari', 'qipao', 'kilt'], 0),
    Q(`A sari is traditional clothing from…`, `Sari ke seaparo sa setso sa…`, ['India', 'Lesotho', 'China', 'Scotland'], 0)
  ] },

{ id: 'c6-games', grade: 6, outcome: 'LO 21, 22, 23', title: L(`Games: indigenous games and strategy`, `Lipapali: tsa setso le tsa leqheka`),
  sections: [
    S(`Morabaraba`, `Morabaraba`, `Morabaraba is played by two players with 12 "cows" each on a board of three squares. Make a row of three (a *mill*) to capture the other player's cows. It trains planning and thinking ahead. Play it against the phone in **Library → Games**.`, `Morabaraba e bapaloa ke libapali tse peli ka "likhomo" tse 12 ka 'ngoe botong ea likoere tse tharo. Etsa mola oa tse tharo ho hapa likhomo tsa sebapali se seng. E koetlisa ho rala le ho nahana pele. E bapale le fono ho **Laeboraring → Lipapali**.`),
    S(`Strategy games from other cultures`, `Lipapali tsa leqheka tsa litso tse ling`, `**Chess** (from India/Persia), **draughts/checkers**, **mancala/morabaraba-like counting games** across Africa (bao in Kenya, oware in Ghana). **Modify** a board game: change the board size, the number of pieces or a rule to suit your friends.`, `**Chess** (e tsoang India/Persia), **draughts**, lipapali tsa ho bala tsa **mancala** ho pholletsa le Afrika (bao Kenya, oware Ghana). **Fetola** papali ea boto: fetola boholo ba boto, palo ea likotoana kapa molao hore e tšoanele metsoalle ea hau.`)
  ],
  words: [['game', 'papali'], ['player', 'sebapali'], ['board', 'boto'], ['rule', 'molao'], ['win', 'hlola']],
  quiz: [
    N(`How many cows does each Morabaraba player have?`, `Sebapali se seng le se seng sa Morabaraba se na le likhomo tse kae?`, 12),
    Q(`In Morabaraba, three cows in a line is called a…`, `Ho Morabaraba, likhomo tse tharo moleng li bitsoa…`, ['mill', 'goal', 'try', 'check'], 0)
  ] },

/* ======================= GRADE 7 ======================= */
{ id: 'c7-business', grade: 7, title: L(`Starting a small business`, `Ho qala khoebo e nyenyane`),
  sections: [
    S(`A business idea`, `Mohopolo oa khoebo`, `Look for a **need** in your community: fat cakes at school break, fixing phones, selling vegetables from a school garden, braiding hair. Ask: Who will buy? Where? How much will they pay? What do I need to start?`, `Batla **tlhoko** sechabeng sa hau: makoenya nakong ea phomolo, ho lokisa lifono, ho rekisa meroho ea serapa sa sekolo, ho loha moriri. Botsa: Ke mang ea tla reka? Hokae? Ba tla lefa bokae? Ke hloka eng ho qala?`),
    S(`Costs, price and profit`, `Litšenyehelo, theko le phaello`, `Write down all **costs** (flour, oil, gas, packaging). Divide by the number of items to get the cost per item. Set a **price** a bit higher so you make a **profit**. Keep a simple **record book**: date, money in, money out. Save part of the profit to grow.`, `Ngola **litšenyehelo** tsohle (phofo, oli, khase, liphuthelo). Arola ka palo ea lintho ho fumana litšenyehelo tsa ntho e le 'ngoe. Beha **theko** e phahameng hanyane e le hore u etse **phaello**. Boloka **buka ea lirekoto** e bonolo: letsatsi, chelete e kenang, chelete e tsoang. Boloka karolo ea phaello ho holisa khoebo.`, { tool: 'profit' })
  ],
  words: [['business', 'khoebo'], ['customer', 'moreki'], ['profit', 'phaello'], ['record book', 'buka ea lirekoto'], ['save', 'boloka']],
  quiz: [
    N(`20 fat cakes cost M30 to make. Cost of one fat cake (Maloti)?`, `Makoenya a 20 a bitsa M30 ho etsoa. Le leng le bitsa bokae (Maloti)?`, 1.5),
    Q(`To make a profit, the selling price must be…`, `Ho etsa phaello, theko ea ho rekisa e tlameha ho ba…`, [['higher than the cost', 'holimo ho litšenyehelo'], ['lower than the cost', 'tlase ho litšenyehelo'], ['zero', 'zero'], ['a secret', 'lekunutu']], 0),
    Q(`A record book shows…`, `Buka ea lirekoto e bontša…`, [['money in and money out', 'chelete e kenang le e tsoang'], ['only your name', 'lebitso la hau feela'], ['songs', 'lipina'], ['the weather', 'boemo ba leholimo']], 0)
  ] },

{ id: 'c7-vandalism', grade: 7, outcome: 'G6 LO 27, 37', title: L(`Protecting property and saying no to vandalism`, `Ho sireletsa thepa le ho hana ho senya`),
  sections: [
    S(`What is vandalism?`, `Ho senya thepa ke eng?`, `Vandalism is damaging things on purpose: breaking windows, writing on walls, stealing taps, cutting fences. It costs the community money that could buy books and medicine, and it can make places unsafe.`, `Ho senya thepa ka boomo: ho roba lifensetere, ho ngola maboteng, ho utsoa lipompo, ho seha literata. Ho jella sechaba chelete e neng e ka reka libuka le meriana, ebile ho ka etsa hore libaka li se bolokehe.`),
    S(`Word puzzles against substance abuse`, `Lipapali tsa mantsoe khahlanong le lithethefatsi`, `Make a word search or crossword with healthy messages: *SAY NO*, *HEALTH*, *FRIENDS*, *SPORT*, *FUTURE*. Share it with your class. Substance abuse often leads to vandalism and crime.`, `Etsa papali ea ho batla mantsoe kapa crossword e nang le melaetsa e phetseng hantle: *HANA*, *BOPHELO*, *METSOALLE*, *LIPAPALI*, *BOKAMOSO*. E arolelane le sehlopha sa hau. Tšebeliso e mpe ea lithethefatsi hangata e lebisa ho senyeng thepa le botlokotsebe.`)
  ],
  words: [['property', 'thepa'], ['damage', 'senya'], ['community', 'sechaba'], ['crime', 'botlokotsebe']],
  quiz: [
    Q(`Which is vandalism?`, `Ke efe e leng ho senya thepa?`, [['breaking school windows', 'ho roba lifensetere tsa sekolo'], ['cleaning the classroom', 'ho hloekisa tlelase'], ['planting trees', 'ho lema lifate'], ['reading a book', 'ho bala buka']], 0),
    TF(`Vandalism costs the whole community.`, `Ho senya thepa ho jella sechaba sohle.`, true)
  ] },

{ id: 'c7-design', grade: 7, outcome: 'G6 LO 18, 19, 38, 39', title: L(`Design: toys, digital graphics, knitting and crochet`, `Moralo: lintho tsa ho bapala, litšoantšo tsa dijithale, ho loha`),
  sections: [
    S(`The design process`, `Mokhoa oa ho rala`, `1. **Identify** the problem (*little children need safe toys*). 2. **Research** (what toys exist? what materials do we have?). 3. **Sketch** 3 ideas. 4. **Make** the best one. 5. **Test** it with users. 6. **Improve** it. That is exactly how Leseli was made – with your school!`, `1. **Hlalosa** bothata. 2. **Batlisisa**. 3. **Sketcha** mehopolo e 3. 4. **Etsa** e molemo ka ho fetisisa. 5. **Leka** le basebelisi. 6. **E ntlafatse**. Ke kamoo Leseli e entsoeng kateng – le sekolo sa hau!`),
    S(`Drawing on a phone or computer`, `Ho taka ka fono kapa k'homphieutha`, `A graphics/painting programme has a **pencil/brush**, **shapes**, **fill bucket**, **colour picker**, **eraser** and **undo**. Use the drawing pad below like a simple paint programme and **save** your work.`, `Lenaneo la ho taka le na le **pensele/borashe**, **libopeho**, **nkho ea ho tlatsa**, **mokhethi oa mebala**, **sehlakoli** le **undo**. Sebelisa pad ea ho taka e ka tlase joaloka lenaneo le bonolo 'me u **boloke** mosebetsi oa hau.`, { tool: 'drawpad' }),
    S(`Knitting and crochet`, `Ho loha`, `**Rib stitch** (knitting): knit 1, purl 1 across the row, then repeat – it stretches, good for jersey cuffs and hats. **Crochet**: a **double crochet** goes yarn-over once; a **treble** goes yarn-over twice and is taller. Start with a small square motif, then join squares into a blanket.`, `**Rib stitch**: knit 1, purl 1 moleng, ebe u pheta – ea otlolloha, e loketse matsoho a jesi le likatiba. **Crochet**: **double crochet** e kenya khoele hang; **treble** e kenya khoele habeli 'me e telele. Qala ka sekoere se senyenyane, ebe u kopanya likoere ho etsa kobo.`)
  ],
  words: [['design', 'moralo'], ['toy', 'papadi'], ['knit', 'loha'], ['test', 'leka'], ['improve', 'ntlafatsa']],
  quiz: [
    Q(`What comes after "make" in the design process?`, `Ho latela eng ka mor'a "etsa" mokhoeng oa ho rala?`, [['test', 'leka'], ['throw away', 'lahla'], ['sell immediately', 'rekisa hang'], ['sleep', 'robala']], 0),
    Q(`Rib stitch is knit 1, ___ 1.`, `Rib stitch ke knit 1, ___ 1.`, ['purl', 'cut', 'tie', 'skip'], 0)
  ] }
]);
