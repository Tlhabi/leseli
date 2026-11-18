/* Mathematics – Grades 5, 6, 7. Grade 5 follows the syllabus learning outcomes (LO numbers from the
   syllabus page 57). Topics learners named as hard are marked hard:true (multiplication, long division,
   addition, subtraction, multiples, angles). */
'use strict';
LESELI.addLessons('maths', [
/* ======================= GRADE 5 ======================= */
{ id: 'm5-place', grade: 5, outcome: 'LO 3, 13', title: L(`Place value and rounding (5-digit numbers)`, `Boleng ba sebaka le ho potoloha (linomoro tsa lidijithi tse 5)`),
  sections: [
    S(`Every digit has a place`, `Nomoro e 'ngoe le e 'ngoe e na le sebaka`,
      `In **47 305** each digit has a value that depends on its place:\n- 4 is in the **ten thousands** place → 40 000\n- 7 is in the **thousands** place → 7 000\n- 3 is in the **hundreds** place → 300\n- 0 is in the **tens** place → 0\n- 5 is in the **ones** place → 5\n\nSo 47 305 = 40 000 + 7 000 + 300 + 5. We write a space between groups of three digits to make big numbers easy to read.`,
      `Ho **47 305** dijithi e 'ngoe le e 'ngoe e na le boleng bo itšetlehileng ka sebaka sa eona:\n- 4 e sebakeng sa **mashome a likete** → 40 000\n- 7 e sebakeng sa **likete** → 7 000\n- 3 e sebakeng sa **makholo** → 300\n- 0 e sebakeng sa **mashome** → 0\n- 5 e sebakeng sa **bonngoe** → 5\n\nKahoo 47 305 = 40 000 + 7 000 + 300 + 5. Re siea sebaka pakeng tsa lihlopha tsa lidijithi tse tharo hore linomoro tse kholo li balehe habonolo.`,
      { tool: 'placevalue' }),
    S(`Rounding to the nearest 1 000`, `Ho potoloha ho 1 000 e haufi`,
      `Rounding gives a number that is easy to say, like "about 46 000 people".\n1. Find the thousands digit.\n2. Look at the digit just to its right (the hundreds).\n3. If it is **5 or more**, round **up**. If it is **less than 5**, round **down**.`,
      `Ho potoloha ho re fa nomoro e bonolo ho e bua, joaloka "batho ba ka bang 46 000".\n1. Fumana dijithi ea likete.\n2. Sheba dijithi e ka letsohong le letona ho eona (makholo).\n3. Haeba e le **5 kapa ho feta**, potoloha **holimo**. Haeba e le **ka tlase ho 5**, potoloha **tlase**.`,
      { calc: 'round 45678 to nearest 1000', tip: L(`The Maseru District has about 519 000 people – that is a rounded number!`, `Setereke sa Maseru se na le batho ba ka bang 519 000 – ena ke nomoro e potolohisitsoeng!`) })
  ],
  words: [['digit', 'dijithi'], ['place value', 'boleng ba sebaka'], ['thousands', 'likete'], ['hundreds', 'makholo'], ['round off', 'potoloha'], ['about', 'ka bang']],
  quiz: [
    Q(`What is the value of 7 in 47 305?`, `Boleng ba 7 ho 47 305 ke bofe?`, ['7', '700', '7 000', '70 000'], 2, `7 is in the thousands place.`, `7 e sebakeng sa likete.`),
    Q(`Which number is 60 000 + 3 000 + 40 + 2?`, `Ke nomoro efe e leng 60 000 + 3 000 + 40 + 2?`, ['63 042', '63 420', '6 342', '60 342'], 0),
    Q(`Round 45 678 to the nearest 1 000.`, `Potoloha 45 678 ho 1 000 e haufi.`, ['45 000', '46 000', '45 700', '50 000'], 1, `The hundreds digit is 6 (5 or more), so round up.`, `Dijithi ea makholo ke 6 (5 kapa ho feta), kahoo potoloha holimo.`),
    Q(`Round 72 381 to the nearest 1 000.`, `Potoloha 72 381 ho 1 000 e haufi.`, ['72 000', '73 000', '72 400', '70 000'], 0, `3 is less than 5, so round down.`, `3 e ka tlase ho 5, kahoo potoloha tlase.`),
    N(`How many thousands are there in 38 000?`, `Ho na le likete tse kae ho 38 000?`, 38),
    Q(`Which is the biggest number?`, `Ke nomoro efe e kholo ka ho fetisisa?`, ['54 999', '59 405', '59 054', '9 999'], 1)
  ], practice: 'round' },

{ id: 'm5-addsub', grade: 5, outcome: 'LO 4, 5', hard: true, title: L(`Adding and subtracting big numbers`, `Ho kopanya le ho tlosa linomoro tse kholo`),
  sections: [
    S(`Adding with carrying`, `Ho kopanya ka ho fetisetsa`,
      `Write the numbers in columns, ones under ones. Start from the **right** (the ones).\nIf a column adds up to 10 or more, write the ones digit and **carry** the tens digit to the next column on the left.`,
      `Ngola linomoro ka likholomo, bonngoe ka tlas'a bonngoe. Qala ka ho le **letona** (bonngoe).\nHaeba kholomo e kopana ho ba 10 kapa ho feta, ngola dijithi ea bonngoe 'me u **fetisetse** dijithi ea mashome kholomong e latelang ka letsohong le letšehali.`,
      { calc: '4587 + 9765', tool: 'stepper', toolOpts: { op: '+' } }),
    S(`Subtracting with borrowing`, `Ho tlosa ka ho alima`,
      `Start from the ones. If the top digit is **smaller** than the bottom digit, **borrow** 1 from the column on the left: it becomes 10 more in your column.\nAlways check: answer + the number you took away = the number you started with.`,
      `Qala ka bonngoe. Haeba dijithi e ka holimo e **nyane** ho e ka tlase, **alima** 1 kholomong e ka letsohong le letšehali: e fetoha 10 e eketsehileng kholomong ea hau.\nKamehla hlahloba: karabo + nomoro eo u e tlositseng = nomoro eo u qalileng ka eona.`,
      { calc: '50213 - 1789', tool: 'stepper', toolOpts: { op: '−' } }),
    S(`Using it in real life`, `Ho e sebelisa bophelong`,
      `A farmer in Mafeteng sold 12 450 kg of maize in May and 9 875 kg in June. Total = 12 450 + 9 875 = **22 325 kg**. Difference = 12 450 − 9 875 = **2 575 kg** more in May.`,
      `Sehoai sa Mafeteng se rekisitse poone ea 12 450 kg ka Motšeanong le 9 875 kg ka Phupjane. Kakaretso = 12 450 + 9 875 = **22 325 kg**. Phapang = 12 450 − 9 875 = **2 575 kg** e fetang ka Motšeanong.`)
  ],
  words: [['add', 'kopanya'], ['subtract', 'tlosa'], ['carry', 'fetisetsa'], ['borrow', 'alima'], ['total', 'kakaretso'], ['difference', 'phapang'], ['column', 'kholomo']],
  quiz: [
    N(`34 256 + 12 589 = ?`, `34 256 + 12 589 = ?`, 46845),
    N(`50 000 − 1 234 = ?`, `50 000 − 1 234 = ?`, 48766, `Borrow across the zeros: 50 000 → 4 9 9 9 10.`, `Alima ho feta li-zero: 50 000 → 4 9 9 9 10.`),
    N(`8 795 + 6 405 = ?`, `8 795 + 6 405 = ?`, 15200),
    Q(`When must you borrow?`, `U tlameha ho alima neng?`, [[`When the top digit is smaller than the bottom digit`, `Ha dijithi e ka holimo e le nyane ho e ka tlase`], [`When the answer is big`, `Ha karabo e le kholo`], [`Always`, `Kamehla`], [`Never`, `Le ka mohla`]], 0),
    N(`A school has 1 245 books. 378 are lost. How many are left?`, `Sekolo se na le libuka tse 1 245. Tse 378 lia lahleha. Ho sala tse kae?`, 867),
    TF(`To check 900 − 456 = 444, we can add 444 + 456.`, `Ho hlahloba 900 − 456 = 444, re ka kopanya 444 + 456.`, true)
  ], practice: 'add', ask: ['4587 + 9765', '50213 - 1789'] },

{ id: 'm5-mult', grade: 5, outcome: 'LO 21, 22, 24', hard: true, title: L(`Multiplication and multiples`, `Ho atisa le liatiso (multiples)`),
  sections: [
    S(`Multiplication is fast adding`, `Ho atisa ke ho kopanya ka potlako`,
      `4 × 6 means 4 groups of 6: 6 + 6 + 6 + 6 = 24. Learning the **times tables** up to 10 × 10 makes everything faster. Tap the table below to explore.`,
      `4 × 6 e bolela lihlopha tse 4 tsa 6: 6 + 6 + 6 + 6 = 24. Ho ithuta **litafole tsa ho atisa** ho fihlela ho 10 × 10 ho etsa hore tsohle li potlake. Tobetsa tafole e ka tlase.`,
      { tool: 'timestable' }),
    S(`Multiples`, `Liatiso (multiples)`,
      `The **multiples** of a number are the answers in its times table. Multiples of 4: 4, 8, 12, 16, 20, 24 … Every multiple of 4 can be divided by 4 with nothing left over.\n**Tricks:** multiples of 2 end in 0, 2, 4, 6, 8. Multiples of 5 end in 0 or 5. Multiples of 10 end in 0.`,
      `**Liatiso** tsa nomoro ke likarabo tsa tafole ea eona ea ho atisa. Liatiso tsa 4: 4, 8, 12, 16, 20, 24 … Seatiso se seng le se seng sa 4 se ka aroloa ka 4 ho sa sale letho.\n**Maqheka:** liatiso tsa 2 li fela ka 0, 2, 4, 6, 8. Tsa 5 li fela ka 0 kapa 5. Tsa 10 li fela ka 0.`),
    S(`3-digit × 2-digit (long multiplication)`, `Dijithi tse 3 × dijithi tse 2`,
      `To work out 345 × 23:\n1. Multiply 345 by the **3 ones** → 1 035\n2. Multiply 345 by the **2 tens** (that is 20) → put a 0 first, then 345 × 2 = 690 → 6 900\n3. **Add** the two rows: 1 035 + 6 900 = 7 935`,
      `Ho fumana 345 × 23:\n1. Atisa 345 ka **bonngoe ba 3** → 1 035\n2. Atisa 345 ka **mashome a 2** (ke hore 20) → qala ka ho beha 0, ebe 345 × 2 = 690 → 6 900\n3. **Kopanya** mela e 'meli: 1 035 + 6 900 = 7 935`,
      { calc: '345 x 23', tool: 'stepper', toolOpts: { op: '×', a: 128, b: 34 } })
  ],
  words: [['multiply', 'atisa'], ['times table', 'tafole ea ho atisa'], ['multiple', 'seatiso'], ['product', 'sehlahisoa'], ['group', 'sehlopha']],
  quiz: [
    N(`7 × 8 = ?`, `7 × 8 = ?`, 56), N(`9 × 6 = ?`, `9 × 6 = ?`, 54), N(`345 × 23 = ?`, `345 × 23 = ?`, 7935),
    Q(`Which is a multiple of 6?`, `Ke efe e leng seatiso sa 6?`, ['32', '42', '26', '15'], 1, `6 × 7 = 42`, `6 × 7 = 42`),
    Q(`Which list shows multiples of 5?`, `Ke lethathamo lefe le bontšang liatiso tsa 5?`, ['5, 10, 15, 20', '5, 6, 7, 8', '1, 5, 25, 50', '10, 12, 14, 16'], 0),
    N(`A bus carries 48 learners. How many learners do 12 buses carry?`, `Bese e nka baithuti ba 48. Libese tse 12 li nka baithuti ba bakae?`, 576),
    N(`One exercise book costs M12. How much do 25 cost (in Maloti)?`, `Buka e le 'ngoe ea ho ngolla e bitsa M12. Tse 25 li bitsa bokae (ka Maloti)?`, 300)
  ], practice: 'mul', ask: ['345 x 23', 'multiples of 7'] },

{ id: 'm5-div', grade: 5, outcome: 'LO 24', hard: true, title: L(`Long division (the "bus stop" / car method)`, `Ho arola ho holoanyane (mokhoa oa "bus stop")`),
  sections: [
    S(`Division shares equally`, `Ho arola ke ho abela ka ho lekana`,
      `24 ÷ 6 = 4 means: share 24 sweets equally among 6 children – each gets 4. Division is the **opposite of multiplication**: 6 × 4 = 24, so 24 ÷ 6 = 4.`,
      `24 ÷ 6 = 4 e bolela: abela lipompong tse 24 ka ho lekana ho bana ba 6 – e mong le e mong o fumana 4. Ho arola ke **ho fapana le ho atisa**: 6 × 4 = 24, kahoo 24 ÷ 6 = 4.`),
    S(`The bus stop steps`, `Mehato ea "bus stop"`,
      `Write the number being divided inside the "bus stop" and the divisor outside. Then repeat four steps for every digit, from the **left**:\n1. **Divide** – how many times does the divisor fit?\n2. **Multiply** – that number × the divisor\n3. **Subtract**\n4. **Bring down** the next digit\nA way to remember: **D**ad **M**um **S**ister **B**rother!`,
      `Ngola nomoro e aroloang ka hare ho "bus stop" 'me moaroli a be ka ntle. Ebe u pheta mehato e mene bakeng sa dijithi e 'ngoe le e 'ngoe, ho tloha ka **letšehali**:\n1. **Arola** – moaroli o kena ka makhetlo a makae?\n2. **Atisa** – nomoro eo × moaroli\n3. **Tlosa**\n4. **Theola** dijithi e latelang\nTsela ea ho hopola: **N**tate **M**'e **Ab**uti **Ou**si!`,
      { calc: '7452 / 6', tool: 'stepper', toolOpts: { op: '÷' } }),
    S(`Remainders`, `Se salang (remainder)`,
      `Sometimes something is left over. 25 ÷ 4 = 6 remainder 1, because 4 × 6 = 24 and 1 is left. In a story, think about what the remainder means: 25 learners, 4 per bench → 7 benches are needed (6 full + 1 more for the last learner).`,
      `Ka linako tse ling ho na le se salang. 25 ÷ 4 = 6 'me ho sala 1, hobane 4 × 6 = 24 'me ho sala 1. Paleng, nahana hore na se salang se bolela eng: baithuti ba 25, ba 4 bencheng ka 'ngoe → ho hlokahala libenche tse 7 (tse 6 tse tletseng + e le 'ngoe bakeng sa moithuti oa ho qetela).`,
      { calc: '625 / 4' })
  ],
  words: [['divide', 'arola'], ['share', 'abela'], ['remainder', 'se salang'], ['divisor', 'moaroli'], ['bring down', 'theola']],
  quiz: [
    N(`84 ÷ 4 = ?`, `84 ÷ 4 = ?`, 21), N(`7 452 ÷ 6 = ?`, `7 452 ÷ 6 = ?`, 1242), N(`625 ÷ 5 = ?`, `625 ÷ 5 = ?`, 125),
    Q(`What is 29 ÷ 4?`, `29 ÷ 4 ke bokae?`, [[`7 remainder 1`, `7, ho sala 1`], [`7`, `7`], [`6 remainder 5`, `6, ho sala 5`], [`8`, `8`]], 0),
    Q(`What is the first step of the bus stop method?`, `Mohato oa pele oa "bus stop" ke ofe?`, [[`Divide`, `Arola`], [`Subtract`, `Tlosa`], [`Bring down`, `Theola`], [`Add`, `Kopanya`]], 0),
    N(`M960 is shared equally by 8 friends. How many Maloti each?`, `M960 e abeloa metsoalle e 8 ka ho lekana. E mong le e mong o fumana Maloti a makae?`, 120),
    TF(`If 9 × 7 = 63 then 63 ÷ 7 = 9.`, `Haeba 9 × 7 = 63 joale 63 ÷ 7 = 9.`, true)
  ], practice: 'div', ask: ['7452 ÷ 6', '625 ÷ 4'] },

{ id: 'm5-fractions', grade: 5, outcome: 'LO 7, 8, 9, 23, 25, 26', title: L(`Fractions: equivalent, adding, subtracting, mixed`, `Likaroloana: tse lekanang, ho kopanya, ho tlosa, tse kopaneng`),
  sections: [
    S(`What is a fraction?`, `Karoloana ke eng?`,
      `A fraction is part of a whole. In **3/4** the bottom number (4) says the whole is cut into 4 equal parts; the top number (3) says we have 3 of them.`,
      `Karoloana ke karolo ea ntho e felletseng. Ho **3/4** nomoro e ka tlase (4) e re ntho e khaoletsoe likarolo tse 4 tse lekanang; nomoro e ka holimo (3) e re re na le tse 3 ho tsona.`),
    S(`Equivalent fractions`, `Likaroloana tse lekanang`,
      `1/2 = 2/4 = 4/8: the same amount, cut into more pieces. Multiply (or divide) the top **and** the bottom by the same number. Move the sliders to see it.`,
      `1/2 = 2/4 = 4/8: bongata bo tšoanang, bo khaoletsoe likotoana tse ngata. Atisa (kapa arola) holimo **le** tlase ka nomoro e tšoanang. Sutumetsa li-slider ho e bona.`,
      { tool: 'fractionbars' }),
    S(`Adding and subtracting fractions`, `Ho kopanya le ho tlosa likaroloana`,
      `If the bottom numbers are the **same**, add or subtract the tops only: 2/7 + 3/7 = 5/7.\nIf they are **different**, first make them the same with equivalent fractions: 1/2 + 1/3 = 3/6 + 2/6 = 5/6.`,
      `Haeba linomoro tse ka tlase li **tšoana**, kopanya kapa tlosa tse ka holimo feela: 2/7 + 3/7 = 5/7.\nHaeba li **fapana**, pele li etse hore li tšoane ka likaroloana tse lekanang: 1/2 + 1/3 = 3/6 + 2/6 = 5/6.`,
      { calc: '1/2 + 1/3' }),
    S(`Mixed numbers`, `Linomoro tse kopaneng`,
      `**2 1/2** means 2 wholes and a half. To add or subtract mixed numbers, change them to improper fractions (top bigger than bottom): 2 1/2 = 5/2. Then work as before and change back.`,
      `**2 1/2** e bolela tse peli tse felletseng le halofo. Ho kopanya kapa ho tlosa linomoro tse kopaneng, li fetole hore e be likaroloana tse holimo e leng kholo: 2 1/2 = 5/2. Ebe u sebetsa joalo ka pele 'me u li khutlise.`,
      { calc: '2 1/2 + 1 3/4' })
  ],
  words: [['fraction', 'karoloana'], ['half', 'halofo'], ['quarter', 'kotara'], ['equal parts', 'likarolo tse lekanang'], ['whole', 'e felletseng']],
  quiz: [
    Q(`Which fraction is equal to 1/2?`, `Ke karoloana efe e lekanang le 1/2?`, ['2/3', '3/6', '1/4', '2/5'], 1),
    N(`2/7 + 3/7 = ? (write like 5/7)`, `2/7 + 3/7 = ? (ngola joaloka 5/7)`, '5/7'),
    N(`1/2 + 1/4 = ?`, `1/2 + 1/4 = ?`, '3/4', `1/2 = 2/4, and 2/4 + 1/4 = 3/4`, `1/2 = 2/4, 'me 2/4 + 1/4 = 3/4`),
    N(`3/4 − 1/2 = ?`, `3/4 − 1/2 = ?`, '1/4'),
    Q(`2 1/2 + 1 3/4 = ?`, `2 1/2 + 1 3/4 = ?`, ['3 4/6', '4 1/4', '3 1/4', '4 3/4'], 1),
    Q(`Mother cuts a loaf into 8 equal slices. You eat 3. What fraction is left?`, `'Mè o khaola bohobe likarolo tse 8 tse lekanang. U ja tse 3. Ho sala karoloana efe?`, ['3/8', '5/8', '5/3', '8/5'], 1),
    N(`3 × 2/5 = ? (fraction times a whole number)`, `3 × 2/5 = ?`, '1 1/5', `3 × 2/5 = 6/5 = 1 1/5`, `3 × 2/5 = 6/5 = 1 1/5`)
  ], practice: 'frac', ask: ['1/2 + 1/3', '2 1/2 - 1 3/4'] },

{ id: 'm5-angles', grade: 5, outcome: 'LO 10, 11, 12', hard: true, title: L(`Angles, the protractor and triangles`, `Likhutlo, protractor le likhutlo-tharo`),
  sections: [
    S(`Kinds of angles`, `Mefuta ea likhutlo`,
      `An angle is the amount of **turn** between two lines that meet. We measure it in **degrees (°)** with a protractor.\n- **Acute**: less than 90°\n- **Right**: exactly 90° (the corner of a book)\n- **Obtuse**: between 90° and 180°\n- **Straight**: 180°\nDrag the green arm to try.`,
      `Sekhutlo ke boholo ba **ho reteleha** pakeng tsa mela e 'meli e kopanang. Re se lekanya ka **likhato (°)** ka protractor.\n- **Se sehloko**: ka tlase ho 90°\n- **Se tokileng**: 90° hantle (khutlo ea buka)\n- **Se setompo**: pakeng tsa 90° le 180°\n- **Se otlolohileng**: 180°\nHula letsoho le letala ho leka.`,
      { tool: 'angle' }),
    S(`Using a protractor`, `Ho sebelisa protractor`,
      `1. Put the centre point of the protractor exactly on the corner (vertex) of the angle.\n2. Line up the 0° line with one arm of the angle.\n3. Read the number where the other arm crosses the scale. Use the scale that starts at 0 on your arm!`,
      `1. Beha bohare ba protractor hantle khutlong ea sekhutlo.\n2. Lekanya mola oa 0° le letsoho le leng la sekhutlo.\n3. Bala nomoro moo letsoho le leng le tšelang sekala. Sebelisa sekala se qalang ka 0 letsohong la hau!`),
    S(`Angles in a triangle add up to 180°`, `Likhutlo tsa khutlo-tharo li kopana ho ba 180°`,
      `Cut out a paper triangle, tear off the three corners and put them together: they make a straight line, 180°. So if you know two angles, the third = 180° − (the other two).`,
      `Seha khutlo-tharo ka pampiri, khaola likhutlo tse tharo 'me u li kopanye: li etsa mola o otlolohileng, 180°. Kahoo haeba u tseba likhutlo tse peli, ea boraro = 180° − (tse ling tse peli).`,
      { calc: 'triangle 50 60', tool: 'triangle' })
  ],
  words: [['angle', 'sekhutlo'], ['degree', 'khato'], ['triangle', 'khutlo-tharo'], ['right angle', 'sekhutlo se tokileng'], ['measure', 'lekanya']],
  quiz: [
    Q(`An angle of 120° is…`, `Sekhutlo sa 120° ke…`, [['acute', 'se sehloko'], ['right', 'se tokileng'], ['obtuse', 'se setompo'], ['straight', 'se otlolohileng']], 2),
    Q(`An angle of 35° is…`, `Sekhutlo sa 35° ke…`, [['acute', 'se sehloko'], ['right', 'se tokileng'], ['obtuse', 'se setompo'], ['straight', 'se otlolohileng']], 0),
    N(`A triangle has angles 50° and 60°. The third angle is ? °`, `Khutlo-tharo e na le likhutlo tsa 50° le 60°. Sa boraro ke ? °`, 70),
    N(`A triangle has a right angle and an angle of 35°. The third angle is ? °`, `Khutlo-tharo e na le sekhutlo se tokileng le sa 35°. Sa boraro ke ? °`, 55),
    N(`The angles inside every triangle add up to ? °`, `Likhutlo ka hare ho khutlo-tharo e 'ngoe le e 'ngoe li kopana ho ba ? °`, 180),
    TF(`The corner of a page is a right angle (90°).`, `Khutlo ea leqephe ke sekhutlo se tokileng (90°).`, true)
  ], practice: 'angles' },

{ id: 'm5-sets', grade: 5, outcome: 'LO 1, 2', title: L(`Sets: intersection and union`, `Lihlopha (sets): ho kopana le kopano`),
  sections: [
    S(`What is a set?`, `Sete ke eng?`, `A **set** is a group of things, written in curly brackets: A = {Lerato, Thabo, Palesa}. The things in it are called **members** (elements).`, `**Sete** ke sehlopha sa lintho, se ngotsoeng ka masakaneng a kobehileng: A = {Lerato, Thabo, Palesa}. Lintho tse ho sona li bitsoa **litho**.`),
    S(`Intersection ∩ and union ∪`, `Intersection ∩ le union ∪`,
      `**A ∩ B** (intersection) = members that are in **both** sets.\n**A ∪ B** (union) = **all** members of A and B together, each written only once.\nIn the Venn diagram, the middle part where the circles overlap is A ∩ B.`,
      `**A ∩ B** (intersection) = litho tse ho li-sete **ka bobeli**.\n**A ∪ B** (union) = litho **tsohle** tsa A le B hammoho, e 'ngoe le e 'ngoe e ngoloa hang feela.\nSetšoantšong sa Venn, karolo e bohareng moo lidikadikoe li kopanang ke A ∩ B.`,
      { tool: 'venn' })
  ],
  words: [['set', 'sete'], ['member', 'setho'], ['both', 'ka bobeli'], ['all', 'tsohle']],
  quiz: [
    Q(`A = {2, 4, 6, 8}, B = {4, 8, 12}. A ∩ B = ?`, `A = {2, 4, 6, 8}, B = {4, 8, 12}. A ∩ B = ?`, ['{4, 8}', '{2, 4, 6, 8, 12}', '{12}', '{2, 6}'], 0),
    Q(`A = {a, b, c}, B = {c, d}. A ∪ B = ?`, `A = {a, b, c}, B = {c, d}. A ∪ B = ?`, ['{c}', '{a, b, c, d}', '{a, b, c, c, d}', '{a, b}'], 1),
    N(`How many members are in {cow, sheep, goat, horse}?`, `Ho na le litho tse kae ho {khomo, nku, pōli, pere}?`, 4),
    Q(`The symbol ∩ means…`, `Letšoao ∩ le bolela…`, [['in both sets', 'ho li-sete ka bobeli'], ['all members', 'litho tsohle'], ['not in the set', 'eseng ho sete'], ['add', 'kopanya']], 0)
  ] },

{ id: 'm5-money', grade: 5, outcome: 'LO 14, 27', title: L(`Money: Maloti and lisente`, `Chelete: Maloti le lisente`),
  sections: [
    S(`Our money`, `Chelete ea rona`, `Lesotho's money is the **Loti** (plural: **Maloti**, written M). 1 Loti = 100 **lisente** (s). M5.50 means 5 Maloti and 50 lisente. The South African Rand has the same value and is also used in Lesotho.`, `Chelete ea Lesotho ke **Loti** (bongata: **Maloti**, e ngoloa M). Loti e le 'ngoe = **lisente** tse 100. M5.50 e bolela Maloti a 5 le lisente tse 50. Rand ea Afrika Boroa e na le boleng bo tšoanang 'me e sebelisoa Lesotho.`),
    S(`Buying, multiplying and change`, `Ho reka, ho atisa le chelete e salang`,
      `If one item costs M14 and you buy 6: 6 × M14 = **M84**. If you pay with M100, your change is M100 − M84 = **M16**. Try the little shop!`,
      `Haeba ntho e le 'ngoe e bitsa M14 'me u reka tse 6: 6 × M14 = **M84**. Haeba u lefa ka M100, chelete e salang ke M100 − M84 = **M16**. Leka lebenkele le lenyenyane!`,
      { tool: 'shop' }),
    S(`Managing money`, `Ho laola chelete`, `Make a **budget**: write what money comes in and what goes out. Buy **needs** (food, school things) before **wants** (sweets). Save a little every week – many Basotho families save together in a **stokvel** (motšelo).`, `Etsa **tekanyetso**: ngola chelete e kenang le e tsoang. Reka **litlhoko** (lijo, lintho tsa sekolo) pele ho **litakatso** (lipompong). Boloka hanyane beke le beke – malapa a mangata a Basotho a bolokela hammoho ka **motšelo**.`)
  ],
  words: [['money', 'chelete'], ['price', 'theko'], ['change', 'chelete e salang'], ['buy', 'reka'], ['sell', 'rekisa'], ['save', 'boloka']],
  quiz: [
    N(`One loaf costs M15. How much do 4 loaves cost (Maloti)?`, `Bohobe bo le bong bo bitsa M15. Tse 4 li bitsa bokae (Maloti)?`, 60),
    N(`You pay M50 for something that costs M37. Your change is M?`, `U lefa M50 bakeng sa ntho e bitsang M37. Chelete e salang ke M?`, 13),
    N(`How many lisente are in M3?`, `Ho na le lisente tse kae ho M3?`, 300),
    Q(`Which is a NEED?`, `Ke efe e leng TLHOKO?`, [['school shoes', 'lieta tsa sekolo'], ['sweets', 'lipompong'], ['a toy', 'papadi'], ['cool drink', 'seno se tsoekere']], 0),
    N(`A pen costs M6. How many pens can you buy with M50, and how much is left? (number of pens)`, `Pene e bitsa M6. U ka reka lipene tse kae ka M50?`, 8, `50 ÷ 6 = 8 remainder 2, so 8 pens and M2 left.`, `50 ÷ 6 = 8 ho sala 2, kahoo lipene tse 8 'me ho sala M2.`)
  ], practice: 'money' },

{ id: 'm5-measure', grade: 5, outcome: 'LO 15, 16, 17, 18', title: L(`Measurement: length, volume and circles`, `Litekanyo: bolelele, volume le selikalikoe`),
  sections: [
    S(`Centimetres and metres`, `Lisentimitara le limitara`, `**1 m = 100 cm**. To change metres to centimetres, multiply by 100 (2 m = 200 cm). To change centimetres to metres, divide by 100 (350 cm = 3.5 m).`, `**1 m = 100 cm**. Ho fetola limitara hore e be lisentimitara, atisa ka 100 (2 m = 200 cm). Ho fetola lisentimitara hore e be limitara, arola ka 100 (350 cm = 3.5 m).`, { calc: '350 cm to m' }),
    S(`Volume of a cube and cuboid`, `Volume ea khube le khuboite`, `Volume is the **space** an object takes up. For a cuboid (box): **Volume = length × width × height**. A box 4 cm × 3 cm × 2 cm holds 24 small cubes of 1 cm³. Move the sliders.`, `Volume ke **sebaka** seo ntho e se nkang. Bakeng sa khuboite (lebokose): **Volume = bolelele × bophara × bophahamo**. Lebokose la 4 cm × 3 cm × 2 cm le tšoara likhube tse nyane tse 24 tsa 1 cm³. Sutumetsa li-slider.`, { tool: 'cuboid' }),
    S(`Circumference of a circle`, `Potoloho ea selikalikoe`, `The **circumference** is the distance all the way round a circle. **C = π × d**, where d is the diameter (across the middle) and π ≈ 3.14 or 22/7. The radius r is half the diameter.`, `**Potoloho** ke sebaka ho pota selikalikoe sohle. **C = π × d**, moo d e leng bophara (ho tšela bohareng) 'me π ≈ 3.14 kapa 22/7. Radius r ke halofo ea bophara.`, { calc: 'circumference radius 7', tool: 'circle' })
  ],
  words: [['length', 'bolelele'], ['width', 'bophara'], ['height', 'bophahamo'], ['circle', 'selikalikoe'], ['volume', 'volume'], ['metre', 'mitara']],
  quiz: [
    N(`3 m = ? cm`, `3 m = ? cm`, 300), N(`450 cm = ? m`, `450 cm = ? m`, 4.5),
    N(`Volume of a box 5 cm × 4 cm × 3 cm = ? cm³`, `Volume ea lebokose la 5 cm × 4 cm × 3 cm = ? cm³`, 60),
    N(`A circle has diameter 14 cm. Circumference (use 22/7) = ? cm`, `Selikalikoe se na le bophara ba 14 cm. Potoloho (sebelisa 22/7) = ? cm`, 44),
    Q(`Which formula gives the volume of a cuboid?`, `Ke foromo efe e fanang ka volume ea khuboite?`, ['l + w + h', 'l × w × h', '2 × (l + w)', 'π × d'], 1)
  ], practice: 'units' },

{ id: 'm5-symmetry', grade: 5, outcome: 'LO 19, 20', title: L(`Symmetry and patterns`, `Symmetry le lipaterone`),
  sections: [
    S(`Lines of symmetry`, `Mela ea symmetry`, `A shape is **symmetrical** if you can fold it so both halves match exactly. The fold line is a **line of symmetry**. A square has 4, a rectangle has 2, a circle has very many. Look at a Basotho blanket or a mokorotlo – many have symmetry!`, `Sebopeho se na le **symmetry** haeba u ka se mena 'me likarolo tse peli li tšoane hantle. Mola oa ho mena ke **mola oa symmetry**. Sekoere se na le e 4, khutlo-nne e na le e 2, selikalikoe se na le e mengata haholo. Sheba kobo ea Basotho kapa mokorotlo – tse ngata li na le symmetry!`),
    S(`Make a symmetrical design`, `Etsa moralo o nang le symmetry`, `Colour squares on the left side. The mirror line copies them on the right side – this is **reflection**.`, `Kenya mebala mabokoseng a ka letšehali. Mola oa seipone o a kopitsa ka letsohong le letona – ena ke **ho bonahatsa (reflection)**.`, { tool: 'symmetry' })
  ],
  words: [['symmetry', 'symmetry'], ['mirror', 'seipone'], ['fold', 'mena'], ['shape', 'sebopeho']],
  quiz: [
    N(`How many lines of symmetry does a square have?`, `Sekoere se na le mela e mekae ea symmetry?`, 4),
    N(`How many lines of symmetry does a rectangle (not a square) have?`, `Khutlo-nne (eseng sekoere) e na le mela e mekae ea symmetry?`, 2),
    Q(`Which letter has a vertical line of symmetry?`, `Ke tlhaku efe e nang le mola o emeng oa symmetry?`, ['A', 'F', 'G', 'R'], 0),
    TF(`A line of symmetry divides a shape into two matching halves.`, `Mola oa symmetry o arola sebopeho ka likarolo tse peli tse tšoanang.`, true)
  ] },

/* ======================= GRADE 6 ======================= */
{ id: 'm6-numbers', grade: 6, title: L(`Big numbers, factors, primes, HCF and LCM`, `Linomoro tse kholo, lintlha (factors), li-prime, HCF le LCM`),
  sections: [
    S(`Millions`, `Limilione`, `1 000 000 = one million. Lesotho has about 2 300 000 people (two million three hundred thousand). Read big numbers in groups of three from the right.`, `1 000 000 = milione e le 'ngoe. Lesotho e na le batho ba ka bang 2 300 000 (limilione tse peli le likete tse makholo a mararo). Bala linomoro tse kholo ka lihlopha tsa tse tharo ho tloha ka ho le letona.`, { tool: 'placevalue', toolOpts: { n: 2305147 } }),
    S(`Factors and prime numbers`, `Lintlha (factors) le linomoro tsa prime`, `**Factors** of 12 are the numbers that divide 12 exactly: 1, 2, 3, 4, 6, 12. A **prime number** has exactly two factors, 1 and itself: 2, 3, 5, 7, 11, 13, 17, 19 … (1 is not prime.)`, `**Lintlha (factors)** tsa 12 ke linomoro tse arolang 12 hantle: 1, 2, 3, 4, 6, 12. **Nomoro ea prime** e na le lintlha tse peli feela, 1 le eona ka bo eona: 2, 3, 5, 7, 11, 13, 17, 19 … (1 hase prime.)`, { calc: 'factors 24' }),
    S(`HCF and LCM`, `HCF le LCM`, `**HCF** (highest common factor) = the biggest number that divides both. **LCM** (lowest common multiple) = the smallest number both divide into. Use LCM to find a common bottom number for fractions.`, `**HCF** = nomoro e kholo ka ho fetisisa e arolang tsoelapele ka bobeli. **LCM** = nomoro e nyane ka ho fetisisa eo ka bobeli li kenang ho eona. Sebelisa LCM ho fumana nomoro e tšoanang e ka tlase bakeng sa likaroloana.`, { calc: 'hcf 12 18' })
  ],
  words: [['million', 'milione'], ['factor', 'ntlha (factor)'], ['prime number', 'nomoro ea prime'], ['common', 'e tšoanang']],
  quiz: [
    Q(`Which is a prime number?`, `Ke efe e leng nomoro ea prime?`, ['9', '15', '17', '21'], 2),
    N(`HCF of 12 and 18 = ?`, `HCF ea 12 le 18 = ?`, 6), N(`LCM of 4 and 6 = ?`, `LCM ea 4 le 6 = ?`, 12),
    N(`How many factors does 12 have?`, `12 e na le lintlha tse kae?`, 6),
    Q(`How do you write two million five hundred thousand?`, `U ngola limilione tse peli le likete tse makholo a mahlano joang?`, ['2 500 000', '2 050 000', '250 000', '25 000 000'], 0)
  ], practice: 'hcf' },

{ id: 'm6-decimals', grade: 6, title: L(`Decimals and percentages`, `Li-decimal le liphesente`),
  sections: [
    S(`Decimals`, `Li-decimal`, `A decimal point separates wholes from parts: 3.75 = 3 wholes + 7 tenths + 5 hundredths. Money uses decimals: M3.75 = 3 Maloti 75 lisente. 0.5 = 1/2, 0.25 = 1/4, 0.1 = 1/10.`, `Ntlha ea decimal e arola tse felletseng le likarolo: 3.75 = tse 3 tse felletseng + mashome a 7 (tenths) + makholo a 5 (hundredths). Chelete e sebelisa li-decimal: M3.75 = Maloti a 3 le lisente tse 75. 0.5 = 1/2, 0.25 = 1/4, 0.1 = 1/10.`),
    S(`Percentages`, `Liphesente`, `**Per cent (%)** means "out of 100". 50% = 50/100 = 1/2. 25% = 1/4. 10% = 1/10. To find 20% of 150: 20 ÷ 100 × 150 = **30**. Shops use % for discounts: 10% off M200 = M20 off.`, `**Phesente (%)** e bolela "ho tse 100". 50% = 50/100 = 1/2. 25% = 1/4. 10% = 1/10. Ho fumana 20% ea 150: 20 ÷ 100 × 150 = **30**. Mabenkele a sebelisa % bakeng sa theolelo: 10% ho M200 = M20 e theohileng.`, { calc: '20% of 150' })
  ],
  words: [['decimal point', 'ntlha ea decimal'], ['per cent', 'phesente'], ['discount', 'theolelo'], ['tenth', 'karolo ea leshome']],
  quiz: [
    Q(`0.5 is the same as…`, `0.5 e tšoana le…`, ['1/5', '1/2', '5/1', '1/50'], 1),
    N(`25% of 80 = ?`, `25% ea 80 = ?`, 20), N(`10% of M350 = M?`, `10% ea M350 = M?`, 35),
    Q(`Which is the largest?`, `Ke efe e kholo ka ho fetisisa?`, ['0.7', '0.65', '0.09', '0.6'], 0),
    N(`3.2 + 1.5 = ?`, `3.2 + 1.5 = ?`, 4.7)
  ], practice: 'percent' },

{ id: 'm6-fracops', grade: 6, title: L(`Multiplying and dividing fractions`, `Ho atisa le ho arola likaroloana`),
  sections: [
    S(`Multiplying fractions`, `Ho atisa likaroloana`, `Multiply the tops and multiply the bottoms: 2/3 × 3/4 = 6/12 = **1/2**. "Of" means multiply: 1/2 of 3/4 = 1/2 × 3/4 = 3/8.`, `Atisa tse ka holimo 'me u atise tse ka tlase: 2/3 × 3/4 = 6/12 = **1/2**. "Ea" (of) e bolela ho atisa: 1/2 ea 3/4 = 1/2 × 3/4 = 3/8.`, { calc: '2/3 x 3/4' }),
    S(`Dividing fractions`, `Ho arola likaroloana`, `Keep the first fraction, **flip** the second, then multiply: 3/4 ÷ 1/2 = 3/4 × 2/1 = 6/4 = **1 1/2**. Think: how many halves fit into 3/4?`, `Boloka karoloana ea pele, **phethola** ea bobeli, ebe u atisa: 3/4 ÷ 1/2 = 3/4 × 2/1 = 6/4 = **1 1/2**. Nahana: ho kena lihalofo tse kae ho 3/4?`, { calc: '3/4 ÷ 1/2' })
  ],
  words: [['flip', 'phethola'], ['of', 'ea'], ['simplify', 'nolofatsa']],
  quiz: [
    N(`1/2 × 1/3 = ?`, `1/2 × 1/3 = ?`, '1/6'), N(`2/3 × 3/4 = ?`, `2/3 × 3/4 = ?`, '1/2'),
    Q(`3/4 ÷ 1/2 = ?`, `3/4 ÷ 1/2 = ?`, ['3/8', '1 1/2', '2/3', '1/4'], 1),
    N(`1/4 of 20 = ?`, `1/4 ea 20 = ?`, 5)
  ] },

{ id: 'm6-ratio', grade: 6, title: L(`Ratio and proportion`, `Karolelano (ratio) le tekano`),
  sections: [
    S(`What is a ratio?`, `Ratio ke eng?`, `A ratio compares amounts. If a class has 12 girls and 8 boys, girls : boys = 12 : 8 = **3 : 2** (divide both by 4). For every 3 girls there are 2 boys.`, `Ratio e bapisa bongata. Haeba sehlopha se na le banana ba 12 le bashanyana ba 8, banana : bashanyana = 12 : 8 = **3 : 2** (arola ka bobeli ka 4). Bakeng sa banana ba 3 ho na le bashanyana ba 2.`),
    S(`Sharing in a ratio`, `Ho abelana ka ratio`, `Share M60 between Thabo and Lineo in the ratio 2 : 1. Total parts = 2 + 1 = 3. One part = 60 ÷ 3 = M20. Thabo gets 2 × 20 = **M40**, Lineo gets **M20**.`, `Abela M60 pakeng tsa Thabo le Lineo ka ratio ea 2 : 1. Likarolo kaofela = 2 + 1 = 3. Karolo e le 'ngoe = 60 ÷ 3 = M20. Thabo o fumana 2 × 20 = **M40**, Lineo o fumana **M20**.`),
    S(`Proportion in recipes`, `Tekano ho diresepe`, `Papa for 4 people needs 2 cups of maize meal. For 8 people (twice as many) use 4 cups. If the people double, the amount doubles.`, `Papa ea batho ba 4 e hloka linoelo tse 2 tsa phofo. Bakeng sa batho ba 8 (habeli) sebelisa linoelo tse 4. Ha batho ba eketseha habeli, bongata bo eketseha habeli.`)
  ],
  words: [['ratio', 'ratio (karolelano)'], ['share', 'abelana'], ['double', 'habeli']],
  quiz: [
    Q(`Simplify 10 : 15`, `Nolofatsa 10 : 15`, ['2 : 3', '1 : 5', '3 : 2', '10 : 5'], 0),
    N(`Share M90 in the ratio 2 : 1. The bigger share is M?`, `Abela M90 ka ratio ea 2 : 1. Kabelo e kholo ke M?`, 60),
    N(`3 eggs make 1 cake. How many eggs for 4 cakes?`, `Mahe a 3 a etsa kuku e le 'ngoe. Ho hlokahala mahe a makae bakeng sa likuku tse 4?`, 12)
  ] },

{ id: 'm6-area', grade: 6, title: L(`Perimeter and area`, `Potoloho le sebaka (area)`),
  sections: [
    S(`Perimeter`, `Potoloho (perimeter)`, `Perimeter is the distance **around** a shape. Add all the sides. Rectangle: P = 2 × (length + width). A garden 8 m by 5 m needs 2 × (8 + 5) = **26 m** of fence.`, `Potoloho ke sebaka **ho pota** sebopeho. Kopanya mahlakore 'ohle. Khutlo-nne: P = 2 × (bolelele + bophara). Serapa sa 8 m ka 5 m se hloka terata ea 2 × (8 + 5) = **26 m**.`),
    S(`Area`, `Sebaka (area)`, `Area is the **space inside** a flat shape, measured in square units (cm², m²). Rectangle: A = length × width. The same garden has area 8 × 5 = **40 m²**. Triangle: A = ½ × base × height.`, `Area ke **sebaka se ka hare** ho sebopeho se bataletseng, se lekanngoang ka liyuniti tse sekoere (cm², m²). Khutlo-nne: A = bolelele × bophara. Serapa sona seo se na le area ea 8 × 5 = **40 m²**. Khutlo-tharo: A = ½ × motheo × bophahamo.`)
  ],
  words: [['perimeter', 'potoloho'], ['area', 'sebaka (area)'], ['square metre', 'mitara-sekoere'], ['fence', 'terata']],
  quiz: [
    N(`Perimeter of a 6 m by 4 m rectangle = ? m`, `Potoloho ea khutlo-nne ea 6 m ka 4 m = ? m`, 20),
    N(`Area of a 6 m by 4 m rectangle = ? m²`, `Area ea khutlo-nne ea 6 m ka 4 m = ? m²`, 24),
    N(`Area of a triangle with base 10 cm and height 6 cm = ? cm²`, `Area ea khutlo-tharo e nang le motheo oa 10 cm le bophahamo ba 6 cm = ? cm²`, 30),
    Q(`Area is measured in…`, `Area e lekanngoa ka…`, ['cm', 'cm²', 'kg', 'litres'], 1)
  ], practice: 'area' },

{ id: 'm6-data', grade: 6, title: L(`Data: tables, bar graphs and the mean`, `Lintlha: litafole, li-bar graph le karolelano (mean)`),
  sections: [
    S(`Collecting and showing data`, `Ho bokella le ho bontša lintlha`, `Count things and write them in a **table** (tally marks help: ||||). A **bar graph** shows the numbers as bars – the taller the bar, the bigger the number. Below: rain measured with a rain gauge each school day.`, `Bala lintho 'me u li ngole **tafoleng** (matšoao a ho bala a thusa: ||||). **Bar graph** e bontša linomoro e le mekoallo – ha mokoallo o le molelele, nomoro e kholo. Ka tlase: pula e lekantsoeng ka rain gauge letsatsi le leng le le leng la sekolo.`, { tool: 'raingauge' }),
    S(`The mean (average)`, `Karolelano (mean)`, `Mean = total ÷ how many. Test marks 6, 8, 7, 9, 10: total = 40, there are 5 marks, mean = 40 ÷ 5 = **8**. The **mode** is the most common value; the **range** is biggest − smallest.`, `Karolelano = kakaretso ÷ palo ea tsona. Lintlha tsa teko 6, 8, 7, 9, 10: kakaretso = 40, ho na le lintlha tse 5, karolelano = 40 ÷ 5 = **8**. **Mode** ke boleng bo hlahang haholo; **range** ke e kholo − e nyane.`)
  ],
  words: [['data', 'lintlha (data)'], ['bar graph', 'bar graph'], ['average', 'karolelano'], ['table', 'tafole']],
  quiz: [
    N(`Mean of 4, 6, 8 = ?`, `Karolelano ea 4, 6, 8 = ?`, 6), N(`Mean of 10, 20, 30, 40 = ?`, `Karolelano ea 10, 20, 30, 40 = ?`, 25),
    N(`Range of 3, 9, 5, 12 = ?`, `Range ea 3, 9, 5, 12 = ?`, 9),
    Q(`Mode of 2, 3, 3, 5, 3, 7 = ?`, `Mode ea 2, 3, 3, 5, 3, 7 = ?`, ['2', '3', '5', '7'], 1)
  ] },

/* ======================= GRADE 7 ======================= */
{ id: 'm7-integers', grade: 7, title: L(`Negative numbers (integers)`, `Linomoro tse ka tlase ho zero`),
  sections: [
    S(`Below zero`, `Ka tlase ho zero`, `On a winter night in Mokhotlong it can be −10 °C: ten degrees **below** zero. Numbers below zero are **negative**. On a number line they are to the left of 0. −8 is smaller than −2.`, `Bosiung ba mariha Mokhotlong ho ka ba −10 °C: likhato tse leshome **ka tlase** ho zero. Linomoro tse ka tlase ho zero ke **tse mpe (negative)**. Moleng oa linomoro li ka letsohong le letšehali la 0. −8 e nyane ho −2.`, { tool: 'numberline' }),
    S(`Adding and subtracting`, `Ho kopanya le ho tlosa`, `Adding a positive: move **right**. Subtracting a positive: move **left**. Subtracting a negative is the same as adding: 3 − (−2) = 3 + 2 = **5**. Temperature 4 °C falls by 7 degrees → 4 − 7 = **−3 °C**.`, `Ho kopanya e ntle: ea ka **ho le letona**. Ho tlosa e ntle: ea ka **ho le letšehali**. Ho tlosa e mpe ho tšoana le ho kopanya: 3 − (−2) = 3 + 2 = **5**. Mocheso oa 4 °C o theoha ka likhato tse 7 → 4 − 7 = **−3 °C**.`, { tool: 'thermometer' })
  ],
  words: [['negative', 'e mpe (negative)'], ['positive', 'e ntle (positive)'], ['number line', 'mola oa linomoro'], ['temperature', 'mocheso']],
  quiz: [
    N(`−3 + 7 = ?`, `−3 + 7 = ?`, 4), N(`2 − 9 = ?`, `2 − 9 = ?`, -7), N(`5 − (−3) = ?`, `5 − (−3) = ?`, 8),
    Q(`Which is the coldest?`, `Ke efe e batang ka ho fetisisa?`, ['−2 °C', '0 °C', '−9 °C', '3 °C'], 2),
    N(`At 6 am it was −4 °C. By noon it was 11 °C warmer. Temperature at noon = ? °C`, `Ka 6 hoseng ho ne ho le −4 °C. Motšehare ho ne ho futhumetse ka 11 °C. Mocheso motšehare = ? °C`, 7)
  ], practice: 'integers' },

{ id: 'm7-algebra', grade: 7, title: L(`Algebra: expressions and simple equations`, `Aljebra: lipolelo le lipalo tse bonolo`),
  sections: [
    S(`Letters for numbers`, `Litlhaku sebakeng sa linomoro`, `In algebra a letter stands for an unknown number. If a bag holds **x** apples, 3 bags hold **3x** apples. 3x + 2 means "3 times x, plus 2". If x = 5, then 3x + 2 = 15 + 2 = 17.`, `Ho aljebra tlhaku e emela nomoro e sa tsejoeng. Haeba mokotla o tšoara liapole tse **x**, mekotla e 3 e tšoara liapole tse **3x**. 3x + 2 e bolela "3 makhetlo x, hammoho le 2". Haeba x = 5, joale 3x + 2 = 15 + 2 = 17.`),
    S(`Solving equations like a balance`, `Ho rarolla lipalo joaloka sekala`, `An equation is like a balanced scale: both sides are equal. Whatever you do to one side, do to the other. x + 4 = 11 → take 4 from both sides → **x = 7**. 3x = 12 → divide both sides by 3 → **x = 4**.`, `Equation e tšoana le sekala se lekaneng: mahlakore ka bobeli a lekana. Seo u se etsang lehlakoreng le leng, se etse ho le leng. x + 4 = 11 → tlosa 4 mahlakoreng ka bobeli → **x = 7**. 3x = 12 → arola mahlakore ka bobeli ka 3 → **x = 4**.`, { tool: 'balance' })
  ],
  words: [['equation', 'equation (palo e lekaneng)'], ['unknown', 'e sa tsejoeng'], ['solve', 'rarolla'], ['both sides', 'mahlakore ka bobeli']],
  quiz: [
    N(`x + 5 = 12. x = ?`, `x + 5 = 12. x = ?`, 7), N(`4x = 28. x = ?`, `4x = 28. x = ?`, 7), N(`2x + 3 = 15. x = ?`, `2x + 3 = 15. x = ?`, 6),
    N(`If y = 4, what is 5y − 2?`, `Haeba y = 4, 5y − 2 ke bokae?`, 18),
    Q(`"Five more than a number n" is…`, `"Hlano ho feta nomoro n" ke…`, ['5n', 'n + 5', 'n − 5', '5 − n'], 1)
  ], practice: 'equations' },

{ id: 'm7-percent', grade: 7, title: L(`Percentages in business: profit, loss, discount, VAT`, `Liphesente khoebong: phaello, tahlehelo, theolelo, VAT`),
  sections: [
    S(`Profit and loss`, `Phaello le tahlehelo`, `**Profit** = selling price − cost price (when you sell for more than you paid). **Loss** = cost price − selling price. A vendor buys a box of apples for M80 and sells them for M120: profit = **M40**. Profit % = 40 ÷ 80 × 100 = **50%**.`, `**Phaello** = theko ea ho rekisa − theko ea ho reka. **Tahlehelo** = theko ea ho reka − theko ea ho rekisa. Morekisi o reka lebokose la liapole ka M80 'me o li rekisa ka M120: phaello = **M40**. Phaello % = 40 ÷ 80 × 100 = **50%**.`, { tool: 'profit' }),
    S(`Discount and VAT`, `Theolelo le VAT`, `A 20% discount on M250 → 20% of 250 = M50 → new price M200. VAT (tax) in Lesotho is 15% on many goods: a M100 item + 15% VAT = **M115**.`, `Theolelo ea 20% ho M250 → 20% ea 250 = M50 → theko e ncha M200. VAT (lekhetho) Lesotho ke 15% thepeng e ngata: ntho ea M100 + VAT ea 15% = **M115**.`, { calc: '15% of 100' })
  ],
  words: [['profit', 'phaello'], ['loss', 'tahlehelo'], ['cost price', 'theko ea ho reka'], ['selling price', 'theko ea ho rekisa'], ['tax', 'lekhetho']],
  quiz: [
    N(`Bought for M50, sold for M65. Profit = M?`, `E rekiloe ka M50, ea rekisoa ka M65. Phaello = M?`, 15),
    N(`25% discount on M80. New price = M?`, `Theolelo ea 25% ho M80. Theko e ncha = M?`, 60),
    N(`Profit of M20 on a cost of M100 is ? %`, `Phaello ea M20 ho theko ea M100 ke ? %`, 20),
    Q(`Bought for M90, sold for M70. This is…`, `E rekiloe ka M90, ea rekisoa ka M70. Sena ke…`, [['a loss of M20', 'tahlehelo ea M20'], ['a profit of M20', 'phaello ea M20'], ['a profit of M160', 'phaello ea M160'], ['no change', 'ha ho phetoho']], 0)
  ], practice: 'percent' },

{ id: 'm7-speed', grade: 7, title: L(`Rate: speed, distance and time`, `Lebelo, sebaka le nako`),
  sections: [
    S(`Speed = distance ÷ time`, `Lebelo = sebaka ÷ nako`, `A taxi travels about 76 km from Maseru to Mafeteng. If it takes 1 hour, its speed is 76 km/h. **Speed = distance ÷ time**, **Distance = speed × time**, **Time = distance ÷ speed**.`, `Tekesi e tsamaea sebaka sa lik'hilomithara tse ka bang 76 ho tloha Maseru ho ea Mafeteng. Haeba e nka hora e le 'ngoe, lebelo la eona ke 76 km/h. **Lebelo = sebaka ÷ nako**, **Sebaka = lebelo × nako**, **Nako = sebaka ÷ lebelo**.`),
    S(`Unit rate`, `Theko ea yuniti e le 'ngoe`, `Which is cheaper: 2 kg of sugar for M36 or 5 kg for M85? Per kg: 36 ÷ 2 = M18, 85 ÷ 5 = M17. The 5 kg bag is cheaper per kilogram.`, `Ke efe e theko e tlase: tsoekere ea 2 kg ka M36 kapa 5 kg ka M85? Ka kg: 36 ÷ 2 = M18, 85 ÷ 5 = M17. Mokotla oa 5 kg o theko e tlase ka kilogram.`)
  ],
  words: [['speed', 'lebelo'], ['distance', 'sebaka (bohole)'], ['hour', 'hora'], ['cheaper', 'theko e tlase']],
  quiz: [
    N(`A car goes 180 km in 3 hours. Speed = ? km/h`, `Koloi e tsamaea 180 km ka lihora tse 3. Lebelo = ? km/h`, 60),
    N(`Walk at 5 km/h for 2 hours. Distance = ? km`, `Tsamaea ka 5 km/h lihora tse 2. Sebaka = ? km`, 10),
    N(`3 pens cost M18. One pen costs M?`, `Lipene tse 3 li bitsa M18. Pene e le 'ngoe e bitsa M?`, 6)
  ] },

{ id: 'm7-geometry', grade: 7, title: L(`Geometry: angles on lines, circles and 3-D shapes`, `Jiometri: likhutlo meleng, selikalikoe le libopeho tsa 3-D`),
  sections: [
    S(`Angles on a straight line and around a point`, `Likhutlo moleng o otlolohileng le ho pota ntlha`, `Angles on a straight line add up to **180°**. Angles around a point add up to **360°** (a full turn). Vertically opposite angles are equal.`, `Likhutlo moleng o otlolohileng li kopana ho ba **180°**. Likhutlo ho pota ntlha li kopana ho ba **360°** (ho reteleha ho feletseng). Likhutlo tse shebaneng li lekana.`, { tool: 'angle' }),
    S(`Area of a circle`, `Area ea selikalikoe`, `**Area = π × r × r**. A round rondavel floor with radius 3 m has area ≈ 3.14 × 3 × 3 ≈ **28.3 m²**.`, `**Area = π × r × r**. Fatše la rondavel le chitja le nang le radius ea 3 m le na le area ≈ 3.14 × 3 × 3 ≈ **28.3 m²**.`, { tool: 'circle' }),
    S(`3-D shapes`, `Libopeho tsa 3-D`, `A **cube** has 6 faces, 12 edges and 8 vertices (corners). A **cylinder** (like a tin) has 2 circle faces and a curved surface. A **cone** looks like a mokorotlo hat!`, `**Khube** e na le lifahleho tse 6, mathoko a 12 le likhutlo tse 8. **Cylinder** (joaloka thini) e na le lifahleho tse 2 tse chitja le bokantle bo kobehileng. **Cone** e shebahala joaloka mokorotlo!`, { tool: 'cuboid' })
  ],
  words: [['face', 'sefahleho'], ['edge', 'thoko'], ['cube', 'khube'], ['cone', 'cone']],
  quiz: [
    N(`Two angles on a straight line: one is 110°. The other is ? °`, `Likhutlo tse peli moleng o otlolohileng: e 'ngoe ke 110°. E 'ngoe ke ? °`, 70),
    N(`How many faces does a cube have?`, `Khube e na le lifahleho tse kae?`, 6),
    N(`Angles around a point add to ? °`, `Likhutlo ho pota ntlha li kopana ho ba ? °`, 360),
    Q(`Which shape looks like a mokorotlo?`, `Ke sebopeho sefe se shebahalang joaloka mokorotlo?`, [['cone', 'cone'], ['cube', 'khube'], ['cylinder', 'cylinder'], ['sphere', 'bolo']], 0)
  ] },

{ id: 'm7-probability', grade: 7, title: L(`Probability and coordinates`, `Monyetla (probability) le likhokahanyo`),
  sections: [
    S(`Chance`, `Monyetla`, `Probability tells how likely something is, from 0 (impossible) to 1 (certain). Throw a dice: P(getting 6) = 1/6. A bag has 3 red and 1 blue ball: P(red) = 3/4.`, `Probability e bolela hore na ho ka etsahala hakae, ho tloha ho 0 (ho ke ke ha etsahala) ho isa ho 1 (ho tla etsahala). Akhela daese: P(ho fumana 6) = 1/6. Mokotla o na le libolo tse 3 tse khubelu le e 1 e putsoa: P(e khubelu) = 3/4.`),
    S(`Coordinates`, `Likhokahanyo`, `A point on a grid is written (x, y): first go **across** (x), then **up** (y). (3, 5) means 3 across, 5 up. Maps use the same idea.`, `Ntlha marang-rang e ngoloa (x, y): pele u ea **ka mahlakore** (x), ebe **holimo** (y). (3, 5) e bolela 3 ka mahlakore, 5 holimo. Limmapa li sebelisa mohopolo ona.`)
  ],
  words: [['probability', 'monyetla'], ['certain', 'ho tiile'], ['impossible', 'ho ke ke ha etsahala'], ['coordinates', 'likhokahanyo']],
  quiz: [
    Q(`P(getting a head when tossing a coin) = ?`, `Monyetla oa ho fumana hlooho ha u phethola chelete ea tšepe = ?`, ['1/2', '1/4', '1', '0'], 0),
    Q(`The point (4, 2) is…`, `Ntlha (4, 2) ke…`, [['4 across, 2 up', '4 ka mahlakore, 2 holimo'], ['4 up, 2 across', '4 holimo, 2 ka mahlakore'], ['6 across', '6 ka mahlakore'], ['2 across, 4 up', '2 ka mahlakore, 4 holimo']], 0),
    Q(`Which probability means "certain"?`, `Ke probability efe e bolelang "ho tla etsahala ka sebele"?`, ['0', '1/2', '1', '2'], 2)
  ] }
]);
