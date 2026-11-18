/* Personal, Spiritual and Social – Grades 5–7: history and geography of Lesotho, citizenship, values,
   safety. A learner told us "the history side" of social studies is hard – so history lessons use
   short stories, timelines and lots of questions. */
'use strict';
const TIMELINE = `<svg viewBox="0 0 340 150" width="100%" role="img" aria-label="Timeline 1786 to 1966"><line x1="15" y1="70" x2="325" y2="70" stroke="#0b2e7a" stroke-width="4"/>${[[20, '1786', 'Moshoeshoe born'], [85, '1824', 'Thaba-Bosiu'], [150, '1868', 'British protection'], [205, '1870', 'Moshoeshoe dies'], [270, '1966', 'Independence']].map(([x, y, t], i) => `<circle cx="${x}" cy="70" r="8" fill="${i === 4 ? '#00804a' : '#f6b73c'}" stroke="#0b2e7a" stroke-width="2"/><text x="${x}" y="${i % 2 ? 108 : 45}" font-size="12" font-weight="800" text-anchor="middle" fill="#0b2e7a">${y}</text><text x="${x}" y="${i % 2 ? 124 : 29}" font-size="9" text-anchor="middle">${t}</text>`).join('')}</svg>`;
const MAP = `<svg viewBox="0 0 300 260" width="100%" role="img" aria-label="Simple map of the ten districts of Lesotho"><path d="M110 20 L170 15 L215 45 L265 90 L280 140 L250 190 L205 235 L150 245 L95 225 L55 185 L30 140 L40 95 L70 55 Z" fill="#e3f4ea" stroke="#00804a" stroke-width="3"/>${[[120, 45, 'Butha-Buthe'], [95, 80, 'Leribe'], [80, 112, 'Berea'], [60, 140, 'Maseru ★'], [60, 172, 'Mafeteng'], [95, 200, "Mohale's Hoek"], [150, 225, 'Quthing'], [215, 200, "Qacha's Nek"], [160, 130, 'Thaba-Tseka'], [215, 85, 'Mokhotlong']].map(([x, y, n]) => `<circle cx="${x}" cy="${y}" r="4" fill="#0b2e7a"/><text x="${x + 6}" y="${y + 4}" font-size="11" font-weight="700">${n}</text>`).join('')}<text x="232" y="125" font-size="10" fill="#555">▲ Thabana</text><text x="232" y="137" font-size="10" fill="#555">Ntlenyana</text></svg>`;

LESELI.addLessons('social', [
/* ======================= GRADE 5 ======================= */
{ id: 'so5-moshoeshoe', grade: 5, hard: true, title: L(`Moshoeshoe I and the birth of the Basotho nation`, `Moshoeshoe I le tsoalo ea sechaba sa Basotho`),
  sections: [
    S(`Young Lepoqo`, `Lepoqo e monyenyane`, `Moshoeshoe was born around **1786** at Menkhoaneng, near Butha-Buthe, and was first called **Lepoqo**. As a young man he learned wisdom from the great teacher **Mohlomi**, who taught that a leader should rule with kindness and that people are a chief's real wealth.`, `Moshoeshoe o hlahile hoo e ka bang ka **1786** Menkhoaneng, haufi le Butha-Buthe, 'me pele o ne a bitsoa **Lepoqo**. Ha e sa le mohlankana o ile a ithuta bohlale ho mosuoe e moholo **Mohlomi**, ea neng a ruta hore moetapele o lokela ho busa ka mosa le hore batho ke leruo la 'nete la morena.`),
    S(`Thaba-Bosiu, 1824`, `Thaba-Bosiu, 1824`, `During the **Lifaqane** wars, many groups were attacked and scattered. In **1824** Moshoeshoe led his people from Butha-Buthe to **Thaba-Bosiu**, a flat-topped mountain that was easy to defend. He welcomed refugees from many clans, gave them land and cattle (*mafisa*), and they became one nation – the **Basotho**. He even forgave the cannibals who ate his grandfather Peete, saying people should be won with kindness.`, `Nakong ea lintoa tsa **Lifaqane**, lihlopha tse ngata li ile tsa hlaseloa tsa qhalakana. Ka **1824** Moshoeshoe o ile a isa batho ba hae ho tloha Butha-Buthe ho ea **Thaba-Bosiu**, thaba e sephara holimo eo ho neng ho le bonolo ho e sireletsa. O ile a amohela baphaphathehi ba lichaba tse ngata, a ba fa mobu le likhomo (*mafisa*), 'me ba fetoha sechaba se le seng – **Basotho**. O bile a tšoarela le malimo a neng a jele ntate-moholo oa hae Peete, a re batho ba lokela ho haptjoa ka mosa.`, { fig: TIMELINE }),
    S(`Protecting the land`, `Ho sireletsa naha`, `Boer settlers wanted Basotho land, and wars were fought in the 1850s and 1860s. Much land west of the Mohokare (Caledon) River was lost. To save the nation, Moshoeshoe asked Britain for protection, and in **1868** the country became **Basutoland**. Moshoeshoe died in **1870**. We remember him on **Moshoeshoe's Day, 11 March**.`, `Bajaki ba Maburu ba ne ba batla mobu oa Basotho, 'me ho ile ha loanoa lintoa lilemong tsa bo-1850 le bo-1860. Mobu o mongata ka bophirimela ba noka ea Mohokare o ile oa lahleha. Ho pholosa sechaba, Moshoeshoe o ile a kopa tšireletso ho Brithani, 'me ka **1868** naha ea fetoha **Basutoland**. Moshoeshoe o hlokahetse ka **1870**. Re mo hopola ka **Letsatsi la Moshoeshoe, la 11 Hlakubele**.`)
  ],
  words: [['nation', 'sechaba'], ['chief / king', 'morena'], ['war', 'ntoa'], ['refugee', 'mophaphathehi'], ['history', 'histori'], ['mountain', 'thaba']],
  quiz: [
    Q(`What was Moshoeshoe's first name?`, `Lebitso la pele la Moshoeshoe e ne e le mang?`, ['Lepoqo', 'Mohlomi', 'Peete', 'Letsie'], 0),
    N(`In which year did Moshoeshoe move to Thaba-Bosiu?`, `Moshoeshoe o falletse Thaba-Bosiu ka selemo sefe?`, 1824),
    Q(`Who was Moshoeshoe's wise teacher?`, `Mosuoe ea bohlale oa Moshoeshoe e ne e le mang?`, ['Mohlomi', 'Moorosi', 'Masopha', 'Jonathan'], 0),
    Q(`Why did Moshoeshoe choose Thaba-Bosiu?`, `Hobaneng Moshoeshoe a khethile Thaba-Bosiu?`, [['It was easy to defend', 'Ho ne ho le bonolo ho e sireletsa'], ['It had a big shop', 'E ne e e-na le lebenkele le leholo'], ['It was near the sea', 'E ne e le haufi le leoatle'], ['It had no water', 'E ne e se na metsi']], 0),
    Q(`Moshoeshoe's Day is on…`, `Letsatsi la Moshoeshoe ke…`, [['11 March', '11 Hlakubele'], ['4 October', '4 Mphalane'], ['25 December', '25 Tšitoe'], ['1 January', '1 Pherekhong']], 0),
    N(`In which year did Basutoland come under British protection?`, `Basutoland e bile tlas'a tšireletso ea Brithani ka selemo sefe?`, 1868)
  ] },

{ id: 'so5-geography', grade: 5, title: L(`Our country: districts, mountains and rivers`, `Naha ea rona: litereke, lithaba le linoka`),
  sections: [
    S(`The Kingdom in the Sky`, `'Muso o Leholimong`, `Lesotho is completely surrounded by South Africa. It is called the **Kingdom in the Sky** because all of the country is more than 1 400 m above sea level – the highest "lowest point" of any country in the world. The capital city is **Maseru**.`, `Lesotho e pota-potiloe ka ho feletseng ke Afrika Boroa. E bitsoa **'Muso o Leholimong** hobane naha eohle e ka holimo ho limithara tse 1 400 ho feta boemo ba leoatle – sebaka se tlase ka ho fetisisa se phahameng ho feta sa naha efe kapa efe lefatšeng. Motse-moholo ke **Maseru**.`),
    S(`Ten districts`, `Litereke tse leshome`, `Butha-Buthe, Leribe, Berea, Maseru, Mafeteng, Mohale's Hoek, Quthing, Qacha's Nek, Thaba-Tseka and Mokhotlong. The **lowlands** are in the west (most farming and towns); the **Maloti mountains** cover the east.`, `Butha-Buthe, Leribe, Berea, Maseru, Mafeteng, Mohale's Hoek, Quthing, Qacha's Nek, Thaba-Tseka le Mokhotlong. **Mabalane (lowlands)** a ka bophirimela (temo le litoropo tse ngata); **lithaba tsa Maloti** li koahela bochabela.`, { fig: MAP }),
    S(`Mountains and rivers`, `Lithaba le linoka`, `**Thabana Ntlenyana** (3 482 m) is the highest mountain in Southern Africa. The **Senqu** (Orange) River starts in our mountains and flows to the Atlantic Ocean. The **Mohokare** (Caledon) forms part of our western border. Our water is "white gold": the **Katse** and **Mohale** dams send water to South Africa and make electricity at **'Muela**.`, `**Thabana Ntlenyana** (3 482 m) ke thaba e telele ka ho fetisisa Afrika Boroa. Noka ea **Senqu** e qala lithabeng tsa rona 'me e phallela Leoatleng la Atlantic. **Mohokare** e etsa karolo ea moeli oa rona oa bophirimela. Metsi a rona ke "khauta e tšoeu": matamo a **Katse** le **Mohale** a romela metsi Afrika Boroa 'me a etsa motlakase **'Muela**.`)
  ],
  words: [['country', 'naha'], ['district', 'setereke'], ['river', 'noka'], ['dam', 'letamo'], ['capital city', 'motse-moholo'], ['border', 'moeli']],
  quiz: [
    N(`How many districts does Lesotho have?`, `Lesotho e na le litereke tse kae?`, 10),
    Q(`What is the highest mountain in Southern Africa?`, `Ke thaba efe e telele ka ho fetisisa Afrika Boroa?`, ['Thabana Ntlenyana', 'Thaba-Bosiu', 'Qiloane', 'Table Mountain'], 0),
    Q(`Which river is also called the Orange River?`, `Ke noka efe e bitsoang hape Orange River?`, ['Senqu', 'Mohokare', 'Makhaleng', 'Phuthiatsana'], 0),
    Q(`Lesotho is surrounded by…`, `Lesotho e pota-potiloe ke…`, [['South Africa', 'Afrika Boroa'], ['the sea', 'leoatle'], ['Botswana', 'Botswana'], ['Eswatini', 'Eswatini']], 0),
    Q(`Which district is Katse Dam in? (Hint: in the mountains, centre)`, `Letamo la Katse le setereke sefe?`, ['Thaba-Tseka', 'Mafeteng', 'Berea', 'Quthing'], 0)
  ] },

{ id: 'so5-rights', grade: 5, title: L(`Children's rights, responsibilities and staying safe`, `Litokelo tsa bana, boikarabello le ho lula u bolokehile`),
  sections: [
    S(`Rights`, `Litokelo`, `Every child has the right to: a **name and nationality**, **education**, **health care**, **food and shelter**, **play**, to be **protected from abuse**, and to be **heard**. Children with disabilities have the same rights and must be included.`, `Ngoana e mong le e mong o na le tokelo ea: **lebitso le bochaba**, **thuto**, **tlhokomelo ea bophelo**, **lijo le bolulo**, **ho bapala**, ho **sireletsoa tlhekefetsong**, le ho **mameloa**. Bana ba nang le bokooa ba na le litokelo tse tšoanang 'me ba tlameha ho kenyelletsoa.`),
    S(`Responsibilities`, `Boikarabello`, `Rights come with responsibilities: respect others, go to school and learn, help at home, look after school property, and do not bully anyone.`, `Litokelo li tla le boikarabello: hlompha ba bang, ea sekolong 'me u ithute, thusa hae, hlokomela thepa ea sekolo, 'me u se ke ua hlekefetsa motho.`),
    S(`If someone hurts you`, `Haeba motho a u utloisa bohloko`, `No one may touch you in a way that makes you feel unsafe. **Say NO, go away, and TELL** a trusted adult (parent, teacher, nurse, chief). Call the free **Child Helpline 116**, or the **police on 112**. It is never your fault.`, `Ha ho motho ea lumelloang ho u ama ka tsela e etsang hore u ikutloe u sa bolokeha. **Re CHE, tsamaea, 'me u BOLELLE** motho e moholo eo u mo tšepang (motsoali, mosuoe, mooki, morena). Letsetsa mahala **Child Helpline 116**, kapa **mapolesa ho 112**. Hase phoso ea hau le ka mohla.`)
  ],
  words: [['right', 'tokelo'], ['protect', 'sireletsa'], ['safe', 'bolokehile'], ['help', 'thuso'], ['tell', 'bolella']],
  quiz: [
    Q(`Which is a right of every child?`, `Ke tokelo efe ea ngoana e mong le e mong?`, [['education', 'thuto'], ['a car', 'koloi'], ['a phone', 'fono'], ['money every day', 'chelete letsatsi le leng le le leng']], 0),
    N(`The free Child Helpline number in Lesotho is…`, `Nomoro ea mahala ea Child Helpline Lesotho ke…`, 116),
    Q(`If someone hurts you, you should…`, `Haeba motho a u utloisa bohloko, u lokela ho…`, [['say no, go away and tell a trusted adult', 're che, tsamaea u bolelle motho e moholo eo u mo tšepang'], ['keep it a secret', 'e boloka e le lekunutu'], ['think it is your fault', 'nahana hore ke phoso ea hau'], ['do nothing', 'se etse letho']], 0),
    TF(`Children with disabilities have the same rights as other children.`, `Bana ba nang le bokooa ba na le litokelo tse tšoanang le tsa bana ba bang.`, true)
  ] },

/* ======================= GRADE 6 ======================= */
{ id: 'so6-government', grade: 6, title: L(`How Lesotho is governed`, `Kamoo Lesotho e busoang kateng`),
  sections: [
    S(`A constitutional monarchy`, `'Muso oa morena o laoloang ke molao-motheo`, `Lesotho has a **King** (head of state) whose powers are set by the **Constitution**. The **Prime Minister** leads the government. **Parliament** (the National Assembly and the Senate) makes laws. Judges in the **courts** decide if laws were broken. Citizens over 18 vote in elections every five years.`, `Lesotho e na le **Morena** (hlooho ea naha) eo matla a hae a behiloeng ke **Molao-motheo**. **Tonakholo** e etella 'muso pele. **Paramente** (Ntlo ea Sechaba le Senate) e etsa melao. Baahloli **makhotleng** ba etsa qeto hore na melao e tlotsoe. Baahi ba ka holimo ho lilemo tse 18 ba khetha likhethong lilemo tse ling le tse ling tse hlano.`),
    S(`Chiefs and councils`, `Marena le makhotla`, `In villages, **chiefs** keep order, settle disputes and allocate land. **Community councils** plan local services like roads and water. A **pitso** lets the community speak.`, `Metseng, **marena** a boloka khotso, a rarolla liqabang 'me a abela mobu. **Makhotla a sechaba** a rala litšebeletso tsa sebaka joaloka litsela le metsi. **Pitso** e fa sechaba monyetla oa ho bua.`)
  ],
  words: [['king', 'morena'], ['law', 'molao'], ['vote', 'khetha / vouta'], ['court', 'lekhotla'], ['citizen', 'moahi']],
  quiz: [
    Q(`Who makes laws in Lesotho?`, `Ke mang ea etsang melao Lesotho?`, [['Parliament', 'Paramente'], ['the chief alone', 'morena a le mong'], ['teachers', 'basuoe'], ['the police', 'mapolesa']], 0),
    N(`From what age can citizens vote?`, `Baahi ba ka khetha ho tloha lilemong life?`, 18),
    Q(`Who leads the government?`, `Ke mang ea etellang 'muso pele?`, [['the Prime Minister', 'Tonakholo'], ['the King', 'Morena'], ['a judge', 'moahloli'], ['the principal', 'mosuoe-hlooho']], 0)
  ] },

{ id: 'so6-sadc', grade: 6, title: L(`Our neighbours and Africa`, `Baahelani ba rona le Afrika`),
  sections: [
    S(`SADC`, `SADC`, `Lesotho is a member of the **Southern African Development Community (SADC)**, countries that work together on trade, peace and development. Its headquarters is in Gaborone, Botswana. Many Basotho work in South Africa, and our money (Loti) is linked to the Rand.`, `Lesotho ke setho sa **SADC**, linaha tse sebetsang hammoho khoebong, khotsong le ntlafatsong. Ntlo-kholo ea eona e Gaborone, Botswana. Basotho ba bangata ba sebetsa Afrika Boroa, 'me chelete ea rona (Loti) e hokahane le Rand.`),
    S(`Africa`, `Afrika`, `Africa has 54 countries. It has the world's longest river (the Nile) and largest hot desert (the Sahara). The **African Union** (AU), based in Addis Ababa, brings African countries together.`, `Afrika e na le linaha tse 54. E na le noka e telele ka ho fetisisa lefatšeng (Nile) le lehoatata le leholo ka ho fetisisa le chesang (Sahara). **African Union** (AU), e Addis Ababa, e kopanya linaha tsa Afrika.`)
  ],
  words: [['neighbour', 'moahelani'], ['trade', 'khoebo'], ['peace', 'khotso'], ['continent', 'kontinente']],
  quiz: [
    Q(`Where is the SADC headquarters?`, `Ntlo-kholo ea SADC e hokae?`, ['Gaborone', 'Maseru', 'Cairo', 'London'], 0),
    N(`How many countries are in Africa?`, `Afrika e na le linaha tse kae?`, 54),
    Q(`The longest river in the world is…`, `Noka e telele ka ho fetisisa lefatšeng ke…`, ['the Nile', 'the Senqu', 'the Mohokare', 'the Thames'], 0)
  ] },

{ id: 'so6-environment', grade: 6, title: L(`Caring for our environment`, `Ho hlokomela tikoloho ea rona`),
  sections: [
    S(`Problems`, `Mathata`, `Litter (plastic bags, bottles), cutting trees for firewood, overgrazing and soil erosion, dirty water, and burning rubbish all harm our environment and our health.`, `Litšila (mekotla ea polasetiki, libotlolo), ho rema lifate bakeng sa patsi, ho fulisa ho feta tekano le khoholeho ea mobu, metsi a litšila, le ho chesa litšila kaofela li senya tikoloho le bophelo ba rona.`),
    S(`What we can do`, `Seo re ka se etsang`, `**Reduce, reuse, recycle**: use a shopping bag many times, make crafts from bottles and tins, sort rubbish. Plant trees on Arbor Day, protect springs (*liliba*), and keep the school yard clean.`, `**Fokotsa, sebelisa hape, recycle**: sebelisa mokotla oa ho reka makhetlo a mangata, etsa mesebetsi ea matsoho ka libotlolo le lithini, hlopha litšila. Lema lifate ka Letsatsi la Lifate, sireletsa **liliba**, 'me u boloke lebala la sekolo le hloekile.`)
  ],
  words: [['environment', 'tikoloho'], ['litter', 'litšila'], ['spring (water)', 'seliba'], ['recycle', 'recycle (sebelisa hape)']],
  quiz: [
    Q(`Which is good for the environment?`, `Ke efe e molemo bakeng sa tikoloho?`, [['reusing bottles', 'ho sebelisa libotlolo hape'], ['burning plastic', 'ho chesa polasetiki'], ['cutting all trees', 'ho rema lifate tsohle'], ['throwing litter', 'ho lahla litšila']], 0),
    Q(`The 3 Rs are reduce, reuse and…`, `Li-R tse 3 ke reduce, reuse le…`, ['recycle', 'run', 'read', 'rest'], 0)
  ] },

/* ======================= GRADE 7 ======================= */
{ id: 'so7-independence', grade: 7, hard: true, title: L(`From Basutoland to independence (1868–1966)`, `Ho tloha Basutoland ho isa boipusong (1868–1966)`),
  sections: [
    S(`Colonial rule`, `Puso ea bokolone`, `From 1868 Basutoland was ruled by Britain. In 1871 it was placed under the Cape Colony; Basotho resisted, and in the **Gun War (1880–1881)** they refused to give up their guns. In 1884 Britain again ruled Basutoland directly, which helped keep Lesotho separate from South Africa.`, `Ho tloha ka 1868 Basutoland e ne e busoa ke Brithani. Ka 1871 e ile ea behoa tlas'a Kolone ea Kapa; Basotho ba hanyetsa, 'me **Ntoeng ea Lithunya (1880–1881)** ba hana ho tela lithunya tsa bona. Ka 1884 Brithani e ile ea boela ea busa Basutoland ka kotloloho, e leng ho ileng ha thusa Lesotho hore e lule e arohane le Afrika Boroa.`),
    S(`Independence`, `Boipuso`, `Political parties formed in the 1950s and 60s. On **4 October 1966** Basutoland became the independent **Kingdom of Lesotho**, with **King Moshoeshoe II** as head of state and **Chief Leabua Jonathan** as the first Prime Minister. We celebrate **Independence Day on 4 October**. Our flag (blue, white, green with a black mokorotlo) means rain, peace and prosperity.`, `Mekha ea lipolotiki e thehiloe lilemong tsa bo-1950 le bo-1960. Ka la **4 Mphalane 1966** Basutoland ea fetoha **'Muso oa Lesotho** o ikemetseng, ka **Morena Moshoeshoe II** e le hlooho ea naha le **Morena Leabua Jonathan** e le Tonakholo ea pele. Re keteka **Letsatsi la Boipuso ka la 4 Mphalane**. Folakha ea rona (boputsoa, bosoeu, botala le mokorotlo o motšo) e emela pula, khotso le nala.`)
  ],
  words: [['independence', 'boipuso'], ['flag', 'folakha'], ['colony', 'kolone'], ['peace', 'khotso'], ['rain', 'pula'], ['prosperity', 'nala']],
  quiz: [
    Q(`When did Lesotho become independent?`, `Lesotho e ipusitse neng?`, [['4 October 1966', '4 Mphalane 1966'], ['11 March 1824', '11 Hlakubele 1824'], ['1 January 2000', '1 Pherekhong 2000'], ['1868', '1868']], 0),
    Q(`Who was the first Prime Minister of Lesotho?`, `Tonakholo ea pele ea Lesotho e ne e le mang?`, ['Chief Leabua Jonathan', 'Moshoeshoe I', 'Mohlomi', 'Moorosi'], 0),
    Q(`The Gun War was fought because Basotho…`, `Ntoa ea Lithunya e loannoe hobane Basotho…`, [['refused to give up their guns', 'ba hanne ho tela lithunya tsa bona'], ['wanted more rain', 'ba ne ba batla pula e ngata'], ['had no cattle', 'ba ne ba se na likhomo'], ['wanted a new king', 'ba ne ba batla morena e mocha']], 0),
    Q(`The colours of the Lesotho flag stand for…`, `Mebala ea folakha ea Lesotho e emela…`, [['rain, peace and prosperity', 'pula, khotso le nala'], ['war and fire', 'ntoa le mollo'], ['snow only', 'lehloa feela'], ['the sea', 'leoatle']], 0)
  ] },

{ id: 'so7-world', grade: 7, title: L(`Maps and the world`, `Limmapa le lefatše`),
  sections: [
    S(`Reading a map`, `Ho bala mmapa`, `A map has a **title**, a **key** (what symbols mean), a **scale** (1 cm = 10 km) and a **compass** (North, South, East, West). Maseru is in the **west** of Lesotho; Mokhotlong is in the **north-east**.`, `Mmapa o na le **sehlooho**, **senotlolo** (se bolelang hore matšoao a bolela eng), **sekala** (1 cm = 10 km) le **khampase** (Leboea, Boroa, Bochabela, Bophirimela). Maseru e **bophirimela** ba Lesotho; Mokhotlong e **leboea-bochabela**.`, { fig: MAP }),
    S(`Continents and oceans`, `Likontinente le maoatle`, `There are **7 continents**: Africa, Asia, Europe, North America, South America, Australia (Oceania) and Antarctica, and **5 oceans**: Pacific, Atlantic, Indian, Southern and Arctic. Lesotho is in Southern Africa, south of the Equator.`, `Ho na le **likontinente tse 7**: Afrika, Asia, Europe, Amerika Leboea, Amerika Boroa, Australia le Antarctica, le **maoatle a 5**: Pacific, Atlantic, Indian, Southern le Arctic. Lesotho e Afrika Boroa, ka boroa ba Equator.`)
  ],
  words: [['map', 'mmapa'], ['north', 'leboea'], ['south', 'boroa'], ['east', 'bochabela'], ['west', 'bophirimela'], ['ocean', 'leoatle']],
  quiz: [
    N(`How many continents are there?`, `Ho na le likontinente tse kae?`, 7),
    Q(`The part of a map that explains the symbols is the…`, `Karolo ea mmapa e hlalosang matšoao ke…`, [['key', 'senotlolo'], ['scale', 'sekala'], ['title', 'sehlooho'], ['ocean', 'leoatle']], 0),
    Q(`"Bochabela" means…`, `"Bochabela" ke…`, ['east', 'west', 'north', 'south'], 0)
  ] },

{ id: 'so7-democracy', grade: 7, title: L(`Democracy, elections and values (botho)`, `Demokrasi, likhetho le botho`),
  sections: [
    S(`Democracy`, `Demokrasi`, `In a democracy, people choose their leaders in **free and fair elections** by **secret ballot**. Everyone is equal before the law. People may speak freely and must respect others' views. Voting is both a right and a responsibility.`, `Demokrasing, batho ba khetha baetapele ba bona **likhethong tse lokolohileng le tse hlokang leeme** ka **voutu ea lekunutu**. Bohle ba lekana ka pel'a molao. Batho ba ka bua ka bolokolohi 'me ba tlameha ho hlompha maikutlo a ba bang. Ho vouta ke tokelo le boikarabello.`),
    S(`Botho`, `Botho`, `**Botho** means being truly human: kindness, honesty, respect, sharing, and caring for the old, the sick and people with disabilities. *Motho ke motho ka batho.* Our religions and traditions all teach these values.`, `**Botho** ke ho ba motho ka 'nete: mosa, botšepehi, tlhompho, ho arolelana, le ho hlokomela maqheku, ba kulang le batho ba nang le bokooa. *Motho ke motho ka batho.* Litumelo le meetlo ea rona kaofela li ruta litekanyetso tsena.`)
  ],
  words: [['democracy', 'demokrasi'], ['election', 'likhetho'], ['honesty', 'botšepehi'], ['kindness', 'mosa'], ['equal', 'lekana']],
  quiz: [
    Q(`In an election, a secret ballot means…`, `Likhethong, voutu ea lekunutu e bolela…`, [['nobody can see who you voted for', 'ha ho motho ea bonang hore u khethile mang'], ['you vote twice', 'u vouta habeli'], ['the chief votes for you', 'morena o u voutela'], ['there is no vote', 'ha ho voutu']], 0),
    Q(`Which shows botho?`, `Ke efe e bontšang botho?`, [['helping an old person carry water', 'ho thusa leqheku ho jara metsi'], ['laughing at a disabled learner', 'ho tšeha moithuti ea nang le bokooa'], ['stealing', 'ho utsoa'], ['lying', 'ho bua leshano']], 0)
  ] }
]);
