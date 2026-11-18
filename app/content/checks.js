/* Starting check (baseline) and final check (endline) – the SAME 10 questions per grade so that the
   change can be measured (KPI 6). Questions target what learners said was hard: addition, subtraction,
   multiplication, long division, multiples, angles, animal classification, oxygen, letters, history. */
'use strict';
LESELI.checks = {
  5: [
    N('4 587 + 2 765 = ?', '4 587 + 2 765 = ?', 7352),
    N('6 000 − 2 348 = ?', '6 000 − 2 348 = ?', 3652),
    N('23 × 14 = ?', '23 × 14 = ?', 322),
    N('624 ÷ 4 = ?', '624 ÷ 4 = ?', 156),
    Q('Which is a multiple of 7?', 'Ke efe e leng seatiso sa 7?', ['24', '35', '40', '17'], 1),
    N('A triangle has angles 60° and 70°. The third angle = ? °', 'Khutlo-tharo e na le likhutlo tsa 60° le 70°. Sa boraro = ? °', 50),
    Q('A frog is a…', 'Senqanqane ke…', [['amphibian', 'sephela-metsing le fatše'], ['reptile', 'sehahabi'], ['mammal', 'phoofolo e anyesang'], ['insect', 'kokoanyana']], 0),
    Q('Which gas does a fire need?', 'Mollo o hloka khase efe?', [['oxygen', 'oksijene'], ['carbon dioxide', 'carbon dioxide'], ['steam', 'mouoane'], ['smoke', 'mosi']], 0),
    Q('Which sentence is correct?', 'Ke polelo efe e nepahetseng?', ['my name is thabo.', 'My name is Thabo.', 'my Name is thabo', 'My name is thabo'], 1),
    Q('Who founded the Basotho nation?', 'Ke mang ea thehileng sechaba sa Basotho?', ['Moshoeshoe I', 'Mohlomi', 'Leabua Jonathan', 'Moorosi'], 0)
  ],
  6: [
    N('34 578 + 27 645 = ?', '34 578 + 27 645 = ?', 62223),
    N('50 004 − 18 765 = ?', '50 004 − 18 765 = ?', 31239),
    N('346 × 27 = ?', '346 × 27 = ?', 9342),
    N('4 536 ÷ 8 = ?', '4 536 ÷ 8 = ?', 567),
    N('LCM of 6 and 8 = ?', 'LCM ea 6 le 8 = ?', 24),
    N('25% of 120 = ?', '25% ea 120 = ?', 30),
    Q('An angle of 135° is…', 'Sekhutlo sa 135° ke…', [['obtuse', 'se setompo'], ['acute', 'se sehloko'], ['right', 'se tokileng'], ['straight', 'se otlolohileng']], 0),
    Q('Which part of a plant makes food?', 'Ke karolo efe ea semela e etsang lijo?', [['leaf', 'lekhasi'], ['root', 'motso'], ['seed', 'peō'], ['stem only', 'kutu feela']], 0),
    Q('Choose the passive: "The boy kicked the ball."', 'Khetha passive: "The boy kicked the ball."', ['The ball was kicked by the boy.', 'The ball kicks the boy.', 'The boy was kicked.', 'The ball kicked by boy.'], 0),
    Q('Lesotho became independent in…', 'Lesotho e ipusitse ka…', ['1966', '1824', '1868', '1993'], 0)
  ],
  7: [
    N('−5 + 12 = ?', '−5 + 12 = ?', 7),
    N('3x + 4 = 19. x = ?', '3x + 4 = 19. x = ?', 5),
    N('Bought for M80, sold for M100. Profit % = ?', 'E rekiloe ka M80, ea rekisoa ka M100. Phaello % = ?', 25),
    N('A car travels 150 km in 2 hours. Speed (km/h) = ?', 'Koloi e tsamaea 150 km ka lihora tse 2. Lebelo (km/h) = ?', 75),
    N('478 × 36 = ?', '478 × 36 = ?', 17208),
    N('9 765 ÷ 15 = ?', '9 765 ÷ 15 = ?', 651),
    Q('Two angles on a straight line: 125° and…', 'Likhutlo tse peli moleng o otlolohileng: 125° le…', ['55°', '65°', '45°', '235°'], 0),
    Q('Steam turning back into water is called…', 'Mouoane o fetohang metsi o bitsoa…', [['condensation', 'condensation'], ['melting', 'ho qhibiliha'], ['freezing', 'ho hoama'], ['burning', 'ho tuka']], 0),
    Q('"The wind whispered" is…', '"The wind whispered" ke…', ['personification', 'a simile', 'a question', 'a plural'], 0),
    Q('In a democracy leaders are chosen by…', 'Demokrasing baetapele ba khethoa ka…', [['free and fair elections', 'likhetho tse lokolohileng'], ['the richest family', 'lelapa le ruileng ka ho fetisisa'], ['a fight', 'ntoa'], ['the oldest person', 'motho e moholo ka ho fetisisa']], 0)
  ]
};
