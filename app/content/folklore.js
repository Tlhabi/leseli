/* Lilotho (riddles) and maele (proverbs). Riddles are in the traditional "Ka u lotha" form; some are
   well known, some were written in the same style for Leseli. Teachers and grandparents can correct or
   add more (Teacher area → Write a new lesson, or tell the project team). */
'use strict';
const R = (qst, qen, ast, aen) => ({ q: { st: qst, en: qen }, a: { st: ast, en: aen } });
LESELI.riddles = [
  R('Basali ba bararo ba apehile pitsa e le \'ngoe.', 'Three women are cooking one pot together.', 'Majoe a leifo', 'The three hearth stones'),
  R('Ntlo e se nang monyako.', 'A house without a door.', 'Lehe', 'An egg'),
  R('Ngoana ea apereng likobo tse ngata; ha u li hlobola oa lla.', 'A child wearing many blankets; when you take them off, you cry.', 'Eiee', 'An onion'),
  R('Ngoanana ea moriri o mosehla o ipatile ka har\'a likobo tse tala.', 'A girl with yellow hair hiding inside green blankets.', 'Poone', 'A mealie (maize cob)'),
  R('Ntlo e tala ka ntle, e khubelu ka hare, e tletse bana ba batšo.', 'A house green outside, red inside, full of black children.', 'Lehapu', 'A watermelon'),
  R('Ke hola ke shebile letsatsi kamehla.', 'I grow always facing the sun.', 'Soneblomo', 'A sunflower'),
  R('Ke tsamaea bosiu le motšehare empa ha ke tlohe moo ke leng teng.', 'I walk day and night but never leave my place.', 'Lesupa-nako', 'A clock'),
  R('Monna e mosoeu ea emeng thabeng mariha, a timela lehlabula.', 'A white man who stands on the mountain in winter and disappears in summer.', 'Lehloa', 'Snow'),
  R('Ke na le meno empa ha ke je.', 'I have teeth but I do not eat.', 'Kama', 'A comb'),
  R('Ke u latela hohle motšehare, empa bosiu kea nyamela.', 'I follow you everywhere in the day, but at night I disappear.', 'Moriti', 'Your shadow'),
  R('Ke lla ke sa utloe bohloko; ke tsamaea ke se na maoto.', 'I cry without pain; I travel without legs.', 'Pula / leru', 'A rain cloud'),
  R('Lesea le leng le le leng le ntlhoka, empa ha ke na \'mele.', 'Every baby needs me, but I have no body.', 'Moea', 'Air'),
  R('Khomo e ntšo e ntšang lebese le lesoeu.', 'A black cow that gives white milk.', 'Pitsa ea papa', 'A pot of maize porridge'),
  R('Ke khanya bosiu, empa ha ke mollo.', 'I shine at night, but I am not a fire.', 'Khoeli', 'The moon'),
  R('Ke molelele, ke na le leoto le le leng, ke roetse katiba e tala.', 'I am tall, I have one leg, and I wear a green hat.', 'Sefate', 'A tree'),
  R('Ke na le mahlo a mangata empa ha ke bone.', 'I have many eyes but I cannot see.', 'Tapole', 'A potato'),
  R('Ke nkoa ka matsoho, ke kenngoa ka molomong, ke tsoa ke bolela litaba.', 'I am held in the hand and put to the mouth, and I come out telling news.', 'Fono', 'A phone'),
  R('Ke kholo ho feta tlou empa ha ke na boima.', 'I am bigger than an elephant but I weigh nothing.', 'Moriti oa tlou', 'An elephant\'s shadow')
];
LESELI.proverbs = [
  { st: 'Ngoana ea sa lleng o shoela tharing.', en: 'A child who does not cry dies in the carrying-skin. (If you need help, ask for it.)' },
  { st: 'Kopano ke matla.', en: 'Unity is strength.' },
  { st: 'Letsoho le hlatsoa le leng.', en: 'One hand washes the other. (We help each other.)' },
  { st: 'Thupa e kojoa e sa le metsi.', en: 'A stick is bent while it is still green. (Teach children while they are young.)' },
  { st: 'Motho ke motho ka batho.', en: 'A person is a person through other people.' },
  { st: 'Pelo e ja serati.', en: 'The heart eats what it loves.' },
  { st: 'Mphemphe o a lapisa.', en: 'Begging makes people tired. (Work for yourself.)' },
  { st: '\'Mangoana o tšoara thipa ka bohaleng.', en: 'A child\'s mother holds the knife by the sharp edge. (A mother protects her children at any cost.)' },
  { st: 'Morena ke morena ka sechaba.', en: 'A chief is a chief because of the people.' },
  { st: 'Lehlaka le le leng ha le fielle.', en: 'One reed alone cannot sweep. (Work together.)' }
];
