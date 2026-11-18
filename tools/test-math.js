// Run: node tools/test-math.js  — checks the worked-solution engine gives correct answers.
global.fmt = n => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
const MS = require('../app/js/mathsteps.js');
let fail = 0; const eq = (name, got, want) => { if (String(got) !== String(want)) { fail++; console.log('FAIL', name, got, '!=', want); } };
for (let i = 0; i < 3000; i++) {
  const a = Math.floor(Math.random() * 99999), b = Math.floor(Math.random() * 99999), d = 2 + Math.floor(Math.random() * 30);
  eq('add', MS.add(a, b).answer, a + b); eq('sub', MS.sub(a, b).answer, a - b);
  eq('mul', MS.mul(a % 1000, b % 100).answer, (a % 1000) * (b % 100));
  const r = MS.div(a, d); eq('div', r.answer * d + r.remainder, a);
}
eq('frac', MS.solve('1/2 + 1/3').answer, '5/6'); eq('mixed', MS.solve('1 2/3 - 3/4').answer, '11/12');
eq('mixed2', MS.solve('2 1/2 + 1 3/4').answer, '4 1/4'); eq('fmul', MS.solve('3/4 x 2').answer, '1 1/2');
eq('round', MS.solve('round 45678 to nearest 1000').answer, 46000); eq('tri', MS.solve('triangle 50 60').answer, 70);
eq('conv', MS.solve('250 cm to m').answer, 2.5); eq('pct', MS.solve('20% of 150').answer, 30); eq('hcf', MS.solve('hcf 12 18').answer, 'HCF 6, LCM 36');
eq('div text', MS.solve('625 ÷ 5').answer, 125); eq('mul text', MS.solve('345 x 23').answer, 7935);
console.log(MS.div(7452, 6).layout); console.log(MS.mul(345, 23).layout); console.log(MS.add(4587, 9765).layout);
console.log(MS.div(7452,6).steps.map(s=>s.st).join('\n'));
console.log(fail ? fail + ' failures' : 'all maths tests passed');
