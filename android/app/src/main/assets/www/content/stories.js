/* Story books. Original stories written for Leseli (set in Lesotho) and retellings of old public-domain
   fables (Aesop, the Panchatantra). Each page is short, has a picture, and can be read aloud. */
'use strict';
const P = (pic, en, st) => ({ pic, en, st });
LESELI.stories = [
{ id: 'mmutla-tau', cover: '🐇', level: 5, title: L('The Hare and the Lion', 'Mmutla le Tau'),
  pages: [
    P('🦁', 'Long ago a hungry lion lived near a village in the mountains. Every day he caught many animals, and the animals were afraid.', 'Khale-khale, tau e lapileng e ne e lula haufi le motse o lithabeng. Letsatsi le leng le le leng e ne e tšoasa liphoofolo tse ngata, \'me liphoofolo li ne li tšohile.'),
    P('🐾', 'The animals met and said to the lion, "Do not hunt us all. Each day one animal will come to you." The lion agreed.', 'Liphoofolo tsa kopana tsa re ho tau, "U se ke ua re tsoma kaofela. Letsatsi le leng le le leng phoofolo e le \'ngoe e tla tla ho uena." Tau ea lumela.'),
    P('🐇', 'One day it was the hare\'s turn. The hare was small, but very clever. He walked slowly and arrived very late.', 'Ka letsatsi le leng e ne e le nako ea mmutla. Mmutla o ne o le monyenyane, empa o le bohlale haholo. O ile oa tsamaea butle \'me oa fihla morao haholo.'),
    P('😠', '"Why are you late?" roared the lion. "Sir," said the hare, "another lion stopped me on the way. He says HE is the king of this land!"', '"Hobaneng u liehile?" ea puruma tau. "Ntate," ha rialo mmutla, "tau e \'ngoe e nkemisitse tseleng. E re EONA ke morena oa naha ena!"'),
    P('🕳️', '"Show me this lion!" said the lion. The hare took him to a deep well. "He lives down there," said the hare. The lion looked in and saw an angry lion looking back.', '"Mpontše tau eo!" ha rialo tau. Mmutla oa e isa selibeng se tebileng. "E lula ka tlase mona," ha rialo mmutla. Tau ea sheba ka hare \'me ea bona tau e halefileng e e shebile.'),
    P('💦', 'The lion roared – and the lion in the water roared too. Angry, he jumped in to fight… but it was only his own reflection! The lion could not climb out, and the animals lived in peace.', 'Tau ea puruma – le tau e ka metsing ea puruma. E halefile, ea qhomela ka hare ho loana… empa e ne e le setšoantšo sa eona feela metsing! Tau ea sitoa ho tsoa, \'me liphoofolo tsa phela ka khotso.')
  ],
  moral: L('Brains are stronger than muscles. Ke tšomo ka mathetho!', 'Bohlale bo matla ho feta matla a \'mele. Ke tšomo ka mathetho!'),
  quiz: [Q('Why did the hare arrive late?', 'Hobaneng mmutla o fihlile morao?', [['to trick the lion', 'ho qhekella tau'], ['he was sick', 'o ne a kula'], ['he got lost', 'o ile a lahleha'], ['he was sleeping', 'o ne a robetse']], 0, null, null),
    Q('What did the lion see in the well?', 'Tau e boneng selibeng?', [['its own reflection', 'setšoantšo sa eona'], ['another real lion', 'tau e \'ngoe ea \'nete'], ['a fish', 'tlhapi'], ['nothing', 'ha ho letho']], 0),
    Q('What does this story teach?', 'Pale ena e ruta eng?', [['cleverness can beat strength', 'bohlale bo ka hlola matla'], ['always be late', 'kamehla fihla morao'], ['lions are kind', 'litau li mosa'], ['never drink water', 'u se ke ua noa metsi']], 0)] },

{ id: 'thabo-pula', cover: '🌧️', level: 5, title: L('Thabo and the Bottle Rain Gauge', 'Thabo le Rain Gauge ea Botlolo'),
  pages: [
    P('👴🏾', 'Thabo lived in Ha Ramabanta with his grandfather. Every spring Ntate-moholo asked the same question: "Has enough rain fallen to plant the maize?"', 'Thabo o ne a lula Ha Ramabanta le ntate-moholo oa hae. Selemo se seng le se seng Ntate-moholo o ne a botsa potso e tšoanang: "Na pula e lekaneng e se e nele hore re ka lema poone?"'),
    P('🍾', 'At school Thabo learned how to make a rain gauge. He cut an old plastic bottle, turned the top upside down like a funnel, and stuck a ruler on the side.', 'Sekolong Thabo o ile a ithuta ho etsa rain gauge. A seha botlolo ea khale ea polasetiki, a phethola karolo e ka holimo joaloka fanele, \'me a khomarela rulara ka thoko.'),
    P('🌧️', 'Every morning at seven o\'clock he read the water level in millimetres, wrote it in his book, and emptied the bottle.', 'Hoseng ho hong le ho hong ka hora ea bosupa o ne a bala boemo ba metsi ka limilimithara, a bo ngola bukeng ea hae, \'me a tšolla botlolo.'),
    P('📓', 'Monday 5 mm, Tuesday 12 mm, Wednesday 0 mm, Thursday 18 mm, Friday 10 mm. "That is 45 mm this week!" said Thabo.', 'Mantaha 5 mm, Labobeli 12 mm, Laboraro 0 mm, Labone 18 mm, Labohlano 10 mm. "Ke 45 mm bekeng ena!" ha rialo Thabo.'),
    P('🌽', 'Ntate-moholo smiled. "The soil is wet now. Tomorrow we plant." That year their maize grew tall, and neighbours came to ask Thabo about his "science bottle".', 'Ntate-moholo a bososela. "Mobu o se o le metsi. Hosane rea lema." Selemong seo poone ea bona ea hola ea ba telele, \'me baahelani ba tla ho botsa Thabo ka "botlolo ea saense".')
  ],
  moral: L('What you learn at school can help your whole family.', 'Seo u ithutang sona sekolong se ka thusa lelapa la hau lohle.'),
  quiz: [N('How much rain fell in the week? (mm)', 'Pula e kae e nele bekeng? (mm)', 45),
    Q('What did Thabo use to make the rain gauge?', 'Thabo o sebelisitse eng ho etsa rain gauge?', [['a plastic bottle and a ruler', 'botlolo ea polasetiki le rulara'], ['a cup', 'kopi'], ['a pot', 'pitsa'], ['a phone', 'fono']], 0),
    Q('On which day was there no rain?', 'Ke letsatsi lefe le neng le se na pula?', [['Wednesday', 'Laboraro'], ['Monday', 'Mantaha'], ['Thursday', 'Labone'], ['Friday', 'Labohlano']], 0)] },

{ id: 'palesa', cover: '👂🏾', level: 6, title: L("Palesa Listens", 'Palesa oa Mamela'),
  pages: [
    P('👧🏾', 'Palesa was born with eyes that see only light and shadows. But her ears were sharp – she could tell every bird in the valley by its song.', 'Palesa o hlahile ka mahlo a bonang khanya le meriti feela. Empa litsebe tsa hae li ne li le bohale – o ne a tseba nonyana e \'ngoe le e \'ngoe phuleng ka pina ea eona.'),
    P('🏫', 'At school some children laughed when she held her book very close. Palesa felt sad, but her teacher, \'Mè Lineo, sat with her and asked, "How do you learn best?"', 'Sekolong bana ba bang ba ne ba tšeha ha a tšoara buka ea hae haufi haholo. Palesa a hlomoha, empa mosuoe oa hae, \'Mè Lineo, a lula le eena a botsa, "U ithuta hantle joang?"'),
    P('📱', '"When someone reads to me," said Palesa. So \'Mè Lineo recorded the lessons in her own voice on the school phone. Palesa listened again and again.', '"Ha motho a mpalla," ha rialo Palesa. Kahoo \'Mè Lineo a rekota lithuto ka lentsoe la hae fonong ea sekolo. Palesa a mamela khafetsa.'),
    P('🏆', 'At the end of the year there was a spelling and quiz competition. The questions were read aloud. Palesa answered every one – she came first!', 'Qetellong ea selemo ho ne ho e-na le tlhōlisano ea ho peleta le lipotso. Lipotso li ne li baloa ka lentsoe. Palesa a araba tsohle – a ba oa pele!'),
    P('🤝', 'The children who had laughed came to say sorry. "Teach us how you remember so well," they said. Palesa smiled. "Listen carefully – and help each other."', 'Bana ba neng ba tšeha ba tla ho kopa tšoarelo. "Re rute kamoo u hopolang hantle kateng," ba rialo. Palesa a bososela. "Mamelang ka hloko – \'me le thusane."')
  ],
  moral: L('Everyone learns in their own way. Include everybody.', 'E mong le e mong o ithuta ka tsela ea hae. Kenyelletsa bohle.'),
  quiz: [Q('How does Palesa learn best?', 'Palesa o ithuta hantle joang?', [['when someone reads to her', 'ha motho a mo balla'], ['alone in the dark', 'a le mong lefifing'], ['by not listening', 'ka ho se mamele'], ['only with pictures', 'ka litšoantšo feela']], 0),
    Q('What did \'Mè Lineo do to help?', '\'Mè Lineo o entse eng ho thusa?', [['recorded lessons in her voice', 'o rekotile lithuto ka lentsoe la hae'], ['sent Palesa home', 'o khutlisitse Palesa hae'], ['laughed', 'o tšehile'], ['nothing', 'ha ho letho']], 0),
    Q('What should we do for learners who learn differently?', 'Re lokela ho etsa eng bakeng sa baithuti ba ithutang ka tsela e fapaneng?', [['include and help them', 'ho ba kenyelletsa le ho ba thusa'], ['laugh at them', 'ho ba tšeha'], ['ignore them', 'ho ba hlokomoloha'], ['send them away', 'ho ba leleka']], 0)] },

{ id: 'bohloa-tsie', cover: '🐜', level: 5, title: L('The Ant and the Grasshopper', 'Bohloa le Tsie'),
  pages: [
    P('☀️', 'All summer long the ant worked hard, carrying seeds to her home under the ground. The grasshopper sang and danced in the sun.', 'Lehlabula lohle bohloa bo ile ba sebetsa ka thata, bo jara lipeō bo li isa lehaeng la bona ka tlas\'a mobu. Tsie e ile ea bina ea tantša letsatsing.'),
    P('🎶', '"Why work so hard?" laughed the grasshopper. "Come and play!" "I am storing food for winter," said the ant. "You should do the same."', '"Hobaneng u sebetsa ka thata hakaale?" ea tšeha tsie. "Tloo re bapale!" "Ke bolokela mariha lijo," ha rialo bohloa. "Le uena u lokela ho etsa joalo."'),
    P('❄️', 'Then winter came. Snow covered the Maloti. The grasshopper was cold and hungry, and there was no food anywhere.', 'Joale mariha a fihla. Lehloa la koahela Maloti. Tsie e ne e bata ebile e lapile, \'me ho ne ho se lijo kae kapa kae.'),
    P('🚪', 'The grasshopper knocked at the ant\'s door. "Please, I am hungry." The kind ant shared her food, and said, "Next summer, sing AND work."', 'Tsie ea kokota monyakong oa bohloa. "Ka kopo, ke lapile." Bohloa bo mosa ba arolelana lijo tsa bona, ba re, "Lehlabula le tlang, bina \'me u SEBETSE hape."')
  ],
  moral: L('Plan and save today for tomorrow.', 'Rala \'me u boloke kajeno bakeng sa hosane.'),
  quiz: [Q('What did the ant do in summer?', 'Bohloa bo entse eng lehlabula?', [['stored food', 'bo ile ba boloka lijo'], ['sang all day', 'bo ile ba bina letsatsi lohle'], ['slept', 'bo ile ba robala'], ['travelled', 'bo ile ba tsamaea']], 0),
    Q('What lesson does the story teach?', 'Pale e ruta thuto efe?', [['plan and save for the future', 'rala u bolokele bokamoso'], ['never work', 'u se ke ua sebetsa'], ['winter is warm', 'mariha a futhumetse'], ['do not share', 'u se ke ua arolelana']], 0)] },

{ id: 'tau-toeba', cover: '🐭', level: 5, title: L('The Lion and the Mouse', 'Tau le Toeba'),
  pages: [
    P('😴', 'A lion was sleeping under a tree. A little mouse ran over his nose by mistake. The lion woke up and caught the mouse in his big paw.', 'Tau e ne e robetse tlas\'a sefate. Toeba e nyenyane ea mathela holim\'a nko ea eona ka phoso. Tau ea tsoha \'me ea tšoasa toeba ka leoto la eona le leholo.'),
    P('🙏', '"Please let me go," said the mouse. "One day I will help you." The lion laughed – how could a tiny mouse help a lion? But he let her go.', '"Ka kopo ntokolle," ha rialo toeba. "Ka letsatsi le leng ke tla u thusa." Tau ea tšeha – toeba e nyenyane e ka thusa tau joang? Empa ea e lokolla.'),
    P('🕸️', 'Some days later, the lion was caught in a hunter\'s rope net. He roared and roared, but he could not get out.', 'Matsatsi a seng makae hamorao, tau ea tšoasoa ke leqhoele la thapo la setsomi. Ea puruma haholo, empa ea sitoa ho tsoa.'),
    P('🐭', 'The mouse heard him. She came and chewed the ropes with her sharp teeth until the lion was free. "You see," said the mouse, "even small friends can help."', 'Toeba ea e utloa. Ea tla \'me ea hlafuna lithapo ka meno a eona a bohale ho fihlela tau e lokoloha. "Ua bona," ha rialo toeba, "le metsoalle e menyenyane e ka thusa."')
  ],
  moral: L('Be kind to everyone – no one is too small to help.', 'Eba mosa ho bohle – ha ho motho ea monyenyane haholo hore a ka se thuse.'),
  quiz: [Q('How did the mouse free the lion?', 'Toeba e lokollitse tau joang?', [['chewed the ropes', 'e hlafunne lithapo'], ['called a hunter', 'e bitsitse setsomi'], ['sang a song', 'e binne pina'], ['ran away', 'e balehile']], 0)] },

{ id: 'bese-ea-ho-arola', cover: '🚌', level: 5, title: L('The Bus Stop Sharing Day', 'Letsatsi la ho Abelana Seteisheneng sa Bese'),
  pages: [
    P('🚌', 'On sports day, 156 learners from Moshoeshoe II had to travel to the stadium. Each taxi could carry 12 learners. "How many taxis do we need?" asked the principal.', 'Ka letsatsi la lipapali, baithuti ba 156 ba Moshoeshoe II ba ne ba tlameha ho ea lebaleng la lipapali. Tekesi e \'ngoe le e \'ngoe e ne e ka nka baithuti ba 12. "Re hloka litekesi tse kae?" ha botsa mosuoe-hlooho.'),
    P('✏️', 'Mpho drew the "bus stop" on the board: 12 outside, 156 inside. "First, how many 12s fit into 15? One! 1 × 12 = 12. 15 − 12 = 3. Bring down the 6 – that makes 36."', 'Mpho a taka "bus stop" botong: 12 ka ntle, 156 ka hare. "Pele, 12 e kena ka makhetlo a makae ho 15? Hang! 1 × 12 = 12. 15 − 12 = 3. Theola 6 – e etsa 36."'),
    P('🧮', '"How many 12s fit into 36? Three! 3 × 12 = 36. 36 − 36 = 0. Nothing left over." Mpho wrote 13 on top of the bus stop.', '"12 e kena ka makhetlo a makae ho 36? Makhetlo a mararo! 3 × 12 = 36. 36 − 36 = 0. Ha ho se salang." Mpho a ngola 13 holim\'a bus stop.'),
    P('🎉', '"We need 13 taxis," said Mpho. The principal checked: 13 × 12 = 156. "Correct! Divide, multiply, subtract, bring down – well done, Mpho!"', '"Re hloka litekesi tse 13," ha rialo Mpho. Mosuoe-hlooho a hlahloba: 13 × 12 = 156. "Ho nepahetse! Arola, atisa, tlosa, theola – u entse hantle, Mpho!"')
  ],
  moral: L('Long division helps us share fairly. Try it in Practice → Long division.', 'Ho arola ho re thusa ho abelana ka toka. E leke ho Boikoetliso → Ho arola.'),
  quiz: [N('156 ÷ 12 = ?', '156 ÷ 12 = ?', 13), N('If 13 taxis each carry 12 learners, how many learners is that?', 'Haeba litekesi tse 13 li nka baithuti ba 12 ka \'ngoe, ke baithuti ba bakae?', 156),
    Q('What is the order of the steps?', 'Tatellano ea mehato ke efe?', [['divide, multiply, subtract, bring down', 'arola, atisa, tlosa, theola'], ['add, add, add', 'kopanya, kopanya'], ['subtract, divide, sing', 'tlosa, arola, bina'], ['multiply only', 'atisa feela']], 0)] },

{ id: 'nkhono-morabaraba', cover: '⚫', level: 6, title: L("Nkhono's Morabaraba", 'Morabaraba oa Nkhono'),
  pages: [
    P('👵🏾', 'Every holiday, Lineo visited her grandmother in Mokhotlong. Nkhono drew a Morabaraba board in the soil with a stick, and used white and black stones as cows.', 'Phomolong e \'ngoe le e \'ngoe, Lineo o ne a etela nkhono oa hae Mokhotlong. Nkhono o ne a taka boto ea Morabaraba mobung ka thupa, a sebelisa majoe a masoeu le a matšo e le likhomo.'),
    P('🤔', '"Do not only look at your cows," said Nkhono. "Look at MY cows too. Where will I make a row of three?" Lineo lost many games, but she started to think ahead.', '"U se ke ua sheba likhomo tsa hau feela," ha rialo Nkhono. "Sheba le likhomo TSA KA. Ke tla etsa mola oa tse tharo hokae?" Lineo a hloloa makhetlo a mangata, empa a qala ho nahana pele.'),
    P('🏁', 'On the last day, Lineo blocked Nkhono\'s mill, made her own, and took Nkhono\'s last cow. "You won!" laughed Nkhono. "A good herder watches the whole field."', 'Ka letsatsi la ho qetela, Lineo a thibela mola oa Nkhono, a etsa oa hae, \'me a nka khomo ea ho qetela ea Nkhono. "U hlotse!" ha tšeha Nkhono. "Molisa ea molemo o shebile lekhulo lohle."')
  ],
  moral: L('Think ahead and watch what others are planning – in games and in life.', 'Nahana pele \'me u shebe seo ba bang ba se ralang – lipapaling le bophelong.'),
  quiz: [Q('Where did Nkhono draw the board?', 'Nkhono o takile boto hokae?', [['in the soil', 'mobung'], ['on a phone', 'fonong'], ['on paper', 'pampiring'], ['on a wall', 'leboteng']], 0),
    Q('What did Nkhono teach Lineo?', 'Nkhono o rutile Lineo eng?', [['to think ahead', 'ho nahana pele'], ['to give up', 'ho tela'], ['to cheat', 'ho qhekella'], ['to run fast', 'ho matha kapele']], 0)] }
];
