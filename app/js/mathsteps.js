/* Leseli – worked maths solutions, shown step by step in Sesotho and English.
   Learners at Moshoeshoe II told us long division ("car method"/bus stop), multiplication,
   addition, subtraction, multiples and angles are hard. Every function here returns
   { answer, steps:[{en,st}], layout:"monospace drawing" } so Thuso and the practice screens can
   show HOW, not just the answer. Pure functions, no DOM, easy to test (see tools/test-math.js). */
'use strict';

const MS = (() => {
  const P = (en, st) => ({ en, st });
  const places = [P('ones', 'bonngoe'), P('tens', 'mashome'), P('hundreds', 'makholo'), P('thousands', 'likete'), P('ten thousands', 'mashome a likete'), P('hundred thousands', 'makholo a likete'), P('millions', 'limilione')];
  const pad = (s, n) => String(s).padStart(n, ' ');
  const gcd = (a, b) => { a = Math.abs(a); b = Math.abs(b); while (b) [a, b] = [b, a % b]; return a || 1; };
  const lcm = (a, b) => Math.abs(a * b) / gcd(a, b);

  function add(a, b) {
    const A = String(a), B = String(b), n = Math.max(A.length, B.length) + 1;
    const da = A.padStart(n, '0').split('').map(Number), db = B.padStart(n, '0').split('').map(Number);
    const res = Array(n).fill(0), carry = Array(n).fill(0); const steps = [];
    let c = 0;
    for (let i = n - 1; i >= 0; i--) {
      const s = da[i] + db[i] + c;
      if (i < n - 1 || s) {
        const pl = places[n - 1 - i] || P('next', 'e latelang');
        if (da[i] || db[i] || c) steps.push(P(
          `${pl.en[0].toUpperCase() + pl.en.slice(1)}: ${da[i]} + ${db[i]}${c ? ' + ' + c + ' (carried)' : ''} = ${s}. Write ${s % 10}${s >= 10 ? ', carry ' + Math.floor(s / 10) + ' to the next column' : ''}.`,
          `Kholomo ea ${pl.st}: ${da[i]} + ${db[i]}${c ? ' + ' + c + ' (e fetisitsoeng)' : ''} = ${s}. Ngola ${s % 10}${s >= 10 ? ', u fetisetse ' + Math.floor(s / 10) + ' kholomong e latelang' : ''}.`));
      }
      res[i] = s % 10; c = Math.floor(s / 10); if (i > 0) carry[i - 1] = c;
    }
    const ans = a + b, w = String(ans).length + 2;
    const layout = [pad(carry.map(x => x ? x : ' ').join('').replace(/^\s+/, m => m), w) + '  ← ' + 'carry', pad(A, w), '+' + pad(B, w - 1), '-'.repeat(w), pad(ans, w)].join('\n');
    steps.push(P(`So ${fmt(a)} + ${fmt(b)} = ${fmt(ans)}.`, `Kahoo ${fmt(a)} + ${fmt(b)} = ${fmt(ans)}.`));
    return { answer: ans, steps, layout };
  }

  function sub(a, b) {
    if (b > a) { const r = sub(b, a); r.answer = -r.answer; r.steps.unshift(P(`${b} is bigger than ${a}, so the answer will be negative. Work out ${b} − ${a} first.`, `${b} e kholo ho feta ${a}, kahoo karabo e tla ba ka tlase ho 0. Qala ka ${b} − ${a}.`)); return r; }
    const A = String(a), n = A.length; const top = A.split('').map(Number), bot = String(b).padStart(n, '0').split('').map(Number);
    const steps = [];
    for (let i = n - 1; i >= 0; i--) {
      const pl = places[n - 1 - i];
      if (top[i] < bot[i]) {
        let j = i - 1; while (top[j] === 0) j--;
        steps.push(P(`${pl.en}: ${top[i]} is smaller than ${bot[i]}, so borrow 1 ${places[n - 1 - j].en.replace(/s$/, '')} from the left. ${top[i]} becomes ${top[i] + 10}.`,
          `${pl.st}: ${top[i]} e nyane ho ${bot[i]}, kahoo alima 1 ho tsoa kholomong e ka letsohong le letšehali. ${top[i]} e fetoha ${top[i] + 10}.`));
        top[j]--; for (let k = j + 1; k < i; k++) top[k] = 9; top[i] += 10;
      }
      const d = top[i] - bot[i];
      if (i > 0 || d || n === 1) steps.push(P(`${pl.en[0].toUpperCase() + pl.en.slice(1)}: ${top[i]} − ${bot[i]} = ${d}.`, `Kholomo ea ${pl.st}: ${top[i]} − ${bot[i]} = ${d}.`));
    }
    const ans = a - b, w = A.length + 2;
    const layout = [pad(A, w), '−' + pad(b, w - 1), '-'.repeat(w), pad(ans, w)].join('\n');
    steps.push(P(`Check: ${fmt(ans)} + ${fmt(b)} = ${fmt(a)} ✓`, `Hlahloba: ${fmt(ans)} + ${fmt(b)} = ${fmt(a)} ✓`));
    return { answer: ans, steps, layout };
  }

  function mul(a, b) {
    const steps = [], B = String(b), rows = [];
    if (B.length === 1) {
      const r = a * b; const A = String(a).split('').map(Number); let c = 0;
      for (let i = A.length - 1; i >= 0; i--) { const p = A[i] * b + c; steps.push(P(`${A[i]} × ${b}${c ? ' + ' + c : ''} = ${p}. Write ${p % 10}${p >= 10 && i ? ', carry ' + Math.floor(p / 10) : ''}.`, `${A[i]} × ${b}${c ? ' + ' + c : ''} = ${p}. Ngola ${p % 10}${p >= 10 && i ? ', fetisetsa ' + Math.floor(p / 10) : ''}.`)); c = Math.floor(p / 10); }
      const w = String(r).length + 2;
      return { answer: r, steps: steps.concat([P(`${fmt(a)} × ${b} = ${fmt(r)}`, `${fmt(a)} × ${b} = ${fmt(r)}`)]), layout: [pad(a, w), '×' + pad(b, w - 1), '-'.repeat(w), pad(r, w)].join('\n') };
    }
    B.split('').reverse().forEach((d, i) => {
      const val = Number(d) * Math.pow(10, i), part = a * val;
      rows.push(part);
      steps.push(P(`Multiply ${fmt(a)} by ${d}${i ? ' ' + places[i].en.replace(/s$/, '') + (Number(d) === 1 ? '' : 's') + ' (that is ' + fmt(val) + ')' : ''} = ${fmt(part)}${i ? '. Put ' + '0'.repeat(i) + ' at the end first' : ''}.`,
        `Atisa ${fmt(a)} ka ${d}${i ? ' ' + places[i].st + ' (ke hore ' + fmt(val) + ')' : ''} = ${fmt(part)}${i ? '. Qala ka ho kenya ' + '0'.repeat(i) + ' qetellong' : ''}.`));
    });
    const r = a * b;
    steps.push(P(`Add the rows: ${rows.map(fmt).join(' + ')} = ${fmt(r)}.`, `Kopanya mela: ${rows.map(fmt).join(' + ')} = ${fmt(r)}.`));
    const w = String(r).length + 2;
    const layout = [pad(a, w), '×' + pad(b, w - 1), '-'.repeat(w)].concat(rows.map((x, i) => (i ? '+' : ' ') + pad(x, w - 1)), ['-'.repeat(w), pad(r, w)]).join('\n');
    return { answer: r, steps, layout };
  }

  /* long division ("bus stop"/"car method") */
  function div(n, d) {
    if (d === 0) return { answer: NaN, steps: [P('We cannot divide by 0.', 'Ha re khone ho arola ka 0.')], layout: '' };
    const N = String(n), steps = [], lines = []; let rem = 0, q = '', started = false;
    const off = String(d).length + 2; // column where the dividend starts
    for (let i = 0; i < N.length; i++) {
      const cur = rem * 10 + Number(N[i]);
      const k = Math.floor(cur / d), p = k * d;
      if (!started && k === 0 && i < N.length - 1) { rem = cur; q += ' '; continue; }
      started = true;
      steps.push(P(
        `How many ${d}s fit into ${cur}? ${k} (because ${k} × ${d} = ${p}${k + 1 > 1 ? ', and ' + (k + 1) + ' × ' + d + ' = ' + (k + 1) * d + ' is too big' : ''}). Write ${k} on top. ${cur} − ${p} = ${cur - p}.${i < N.length - 1 ? ' Bring down the next digit ' + N[i + 1] + '.' : ''}`,
        `${d} e kena ka makhetlo a makae ho ${cur}? Makhetlo a ${k} (hobane ${k} × ${d} = ${p}${k + 1 > 1 ? ', ha ' + (k + 1) + ' × ' + d + ' = ' + (k + 1) * d + ' e feta' : ''}). Ngola ${k} holimo. ${cur} − ${p} = ${cur - p}.${i < N.length - 1 ? ' Theola nomoro e latelang, ' + N[i + 1] + '.' : ''}`));
      lines.push({ col: i, cur, p });
      q += k; rem = cur - p;
    }
    const quotient = Math.floor(n / d);
    const L = [];
    L.push(' '.repeat(off) + q);
    L.push(' '.repeat(off - 1) + '┌' + '─'.repeat(N.length));
    L.push(String(d) + ' │' + N);
    lines.forEach((l, j) => {
      const end = off + l.col + 1, nx = lines[j + 1];
      L.push(pad('−' + l.p, end));
      L.push(pad('', end - String(l.p).length) + '─'.repeat(String(l.p).length));
      L.push(nx ? pad(nx.cur, end + 1) : pad(l.cur - l.p, end) + (rem ? '  ← ' + 'r' : ''));
    });
    steps.push(rem ? P(`Answer: ${fmt(quotient)} remainder ${rem}. Check: ${fmt(quotient)} × ${d} + ${rem} = ${fmt(n)} ✓`, `Karabo: ${fmt(quotient)} 'me ho sala ${rem}. Hlahloba: ${fmt(quotient)} × ${d} + ${rem} = ${fmt(n)} ✓`)
      : P(`Answer: ${fmt(quotient)}. Check: ${fmt(quotient)} × ${d} = ${fmt(n)} ✓`, `Karabo: ${fmt(quotient)}. Hlahloba: ${fmt(quotient)} × ${d} = ${fmt(n)} ✓`));
    return { answer: quotient, remainder: rem, steps, layout: L.join('\n') };
  }

  /* fractions: input {w,n,d} (whole, numerator, denominator) */
  const fr = (n, d, w) => ({ w: w || 0, n, d });
  const improper = f => (f.w || 0) * f.d + f.n;
  function showF(n, d) { if (d === 1) return String(n); const neg = n < 0; n = Math.abs(n); const w = Math.floor(n / d), r = n % d; return (neg ? '−' : '') + (w ? (r ? `${w} ${r}/${d}` : String(w)) : `${r}/${d}`); }
  function fracOp(f1, f2, op) {
    const steps = [];
    let n1 = improper(f1), n2 = improper(f2); const d1 = f1.d, d2 = f2.d;
    if (f1.w || f2.w) steps.push(P(`Change mixed numbers to improper fractions: ${showF(n1, d1)} = ${n1}/${d1} and ${showF(n2, d2)} = ${n2}/${d2}.`, `Fetola linomoro tse kopaneng hore e be likaroloana: ${showF(n1, d1)} = ${n1}/${d1} le ${showF(n2, d2)} = ${n2}/${d2}.`));
    if (op === '×') {
      const n = n1 * n2, d = d1 * d2;
      steps.push(P(`Multiply top × top and bottom × bottom: ${n1}×${n2} / ${d1}×${d2} = ${n}/${d}.`, `Atisa holimo ka holimo, tlase ka tlase: ${n1}×${n2} / ${d1}×${d2} = ${n}/${d}.`));
      return finish(n, d, steps);
    }
    if (op === '÷') {
      steps.push(P(`To divide, flip the second fraction and multiply: ${n1}/${d1} × ${d2}/${n2}.`, `Ho arola, phethola karoloana ea bobeli ebe u atisa: ${n1}/${d1} × ${d2}/${n2}.`));
      const n = n1 * d2, d = d1 * n2; steps.push(P(`= ${n}/${d}`, `= ${n}/${d}`));
      return finish(n, d, steps);
    }
    const D = lcm(d1, d2);
    if (d1 !== d2) {
      steps.push(P(`The bottom numbers (denominators) are different: ${d1} and ${d2}. The smallest number both go into is ${D}.`, `Linomoro tse ka tlase (denominator) li fapane: ${d1} le ${d2}. Nomoro e nyane ka ho fetisisa eo ka bobeli li kenang ho eona ke ${D}.`));
      steps.push(P(`${n1}/${d1} = ${n1 * D / d1}/${D} (multiply top and bottom by ${D / d1}). ${n2}/${d2} = ${n2 * D / d2}/${D} (multiply by ${D / d2}).`, `${n1}/${d1} = ${n1 * D / d1}/${D} (atisa holimo le tlase ka ${D / d1}). ${n2}/${d2} = ${n2 * D / d2}/${D} (atisa ka ${D / d2}).`));
    } else steps.push(P(`The bottom numbers are the same (${D}), so we only ${op === '+' ? 'add' : 'subtract'} the top numbers.`, `Linomoro tse ka tlase lia tšoana (${D}), kahoo re ${op === '+' ? 'kopanya' : 'tlosa'} feela tse ka holimo.`));
    const a = n1 * D / d1, b = n2 * D / d2, n = op === '+' ? a + b : a - b;
    steps.push(P(`${a} ${op} ${b} = ${n}, so we get ${n}/${D}.`, `${a} ${op} ${b} = ${n}, kahoo re fumana ${n}/${D}.`));
    return finish(n, D, steps);
  }
  function finish(n, d, steps) {
    const g = gcd(n, d); let sn = n / g, sd = d / g;
    if (g > 1) steps.push(P(`Simplify: divide top and bottom by ${g}: ${n}/${d} = ${sn}/${sd}.`, `Nolofatsa: arola holimo le tlase ka ${g}: ${n}/${d} = ${sn}/${sd}.`));
    if (Math.abs(sn) > sd && sd !== 1) steps.push(P(`As a mixed number: ${showF(sn, sd)}.`, `E le nomoro e kopaneng: ${showF(sn, sd)}.`));
    return { answer: showF(sn, sd), value: sn / sd, steps, layout: '' };
  }

  function round(n, to) {
    const r = Math.round(n / to) * to, low = Math.floor(n / to) * to, high = low + to;
    const look = Math.floor((n % to) / (to / 10));
    return { answer: r, steps: [
      P(`${fmt(n)} is between ${fmt(low)} and ${fmt(high)}.`, `${fmt(n)} e pakeng tsa ${fmt(low)} le ${fmt(high)}.`),
      P(`Look at the digit to the right of the ${to === 1000 ? 'thousands' : to === 100 ? 'hundreds' : 'tens'}: it is ${look}. ${look >= 5 ? '5 or more → round UP' : 'Less than 5 → round DOWN'}.`, `Sheba nomoro e ka letsohong le letona: ke ${look}. ${look >= 5 ? '5 kapa ho feta → nyolla' : 'Ka tlase ho 5 → theola'}.`),
      P(`${fmt(n)} ≈ ${fmt(r)}`, `${fmt(n)} ≈ ${fmt(r)}`)], layout: '' };
  }
  function multiples(n, k) { const list = Array.from({ length: k || 10 }, (_, i) => n * (i + 1)); return { answer: list.join(', '), steps: [P(`Multiples of ${n} are the answers in the ${n} times table: ${n}×1, ${n}×2, ${n}×3 …`, `Liatiso tsa ${n} ke likarabo tsa tafole ea ${n}: ${n}×1, ${n}×2, ${n}×3 …`), P(list.join(', ') + ' …', list.join(', ') + ' …')], layout: '' }; }
  function factors(n) { const f = []; for (let i = 1; i <= n; i++) if (n % i === 0) f.push(i); return { answer: f.join(', '), list: f, steps: [P(`Factors of ${n} divide into ${n} with no remainder.`, `Lintlha (factors) tsa ${n} li arola ${n} ntle le ho sala letho.`), P(f.join(', ') + (f.length === 2 ? ` — ${n} is a prime number.` : ''), f.join(', ') + (f.length === 2 ? ` — ${n} ke nomoro ea prime.` : ''))], layout: '' }; }
  function hcfLcm(a, b) { const g = gcd(a, b), l = lcm(a, b); return { answer: `HCF ${g}, LCM ${l}`, steps: [P(`Factors of ${a}: ${factors(a).list.join(', ')}. Factors of ${b}: ${factors(b).list.join(', ')}. Highest common factor (HCF) = ${g}.`, `Lintlha tsa ${a}: ${factors(a).list.join(', ')}. Tsa ${b}: ${factors(b).list.join(', ')}. HCF = ${g}.`), P(`Lowest common multiple (LCM) = ${a} × ${b} ÷ ${g} = ${l}.`, `LCM = ${a} × ${b} ÷ ${g} = ${l}.`)], layout: '' }; }
  function circumference(r, isD) {
    const d = isD ? r : 2 * r, c = Math.round(Math.PI * d * 100) / 100, c7 = d % 7 === 0 ? 22 / 7 * d : null;
    return { answer: c7 || c, steps: [
      P(`Circumference = π × diameter (π ≈ 3.14 or 22/7).`, `Potoloho = π × bophara (π ≈ 3.14 kapa 22/7).`),
      isD ? P(`Diameter = ${d}.`, `Bophara = ${d}.`) : P(`Diameter = 2 × radius = 2 × ${r} = ${d}.`, `Bophara = 2 × halofo ea bophara = 2 × ${r} = ${d}.`),
      c7 ? P(`22/7 × ${d} = 22 × ${d / 7} = ${c7}`, `22/7 × ${d} = 22 × ${d / 7} = ${c7}`) : P(`3.14 × ${d} = ${Math.round(3.14 * d * 100) / 100}`, `3.14 × ${d} = ${Math.round(3.14 * d * 100) / 100}`)], layout: '' };
  }
  function volume(l, w, ht) { const v = l * w * ht; return { answer: v, steps: [P('Volume of a cuboid = length × width × height.', 'Bophahamo ba sebaka (volume) = bolelele × bophara × bophahamo.'), P(`${l} × ${w} = ${l * w}, then ${l * w} × ${ht} = ${v} cubic units.`, `${l} × ${w} = ${l * w}, ebe ${l * w} × ${ht} = ${v} (likubiki).`)], layout: '' }; }
  function triangle(a, b) { const c = 180 - a - b; return { answer: c, steps: [P('The three angles inside a triangle always add up to 180°.', 'Likhutlo tse tharo ka hare ho khutlo-tharo kamehla li kopana ho ba 180°.'), P(`${a}° + ${b}° = ${a + b}°.`, `${a}° + ${b}° = ${a + b}°.`), P(`180° − ${a + b}° = ${c}°.`, `180° − ${a + b}° = ${c}°.`)], layout: '' }; }
  function convert(v, from, to) {
    const f = { mm: 0.001, cm: 0.01, m: 1, km: 1000, g: 0.001, kg: 1, ml: 0.001, l: 1 };
    const r = Math.round(v * f[from] / f[to] * 1000) / 1000; const big = f[from] > f[to];
    return { answer: r, steps: [P(`1 ${big ? from : to} = ${big ? f[from] / f[to] : f[to] / f[from]} ${big ? to : from}.`, `1 ${big ? from : to} = ${big ? f[from] / f[to] : f[to] / f[from]} ${big ? to : from}.`), P(`${big ? 'Big unit to small unit: multiply' : 'Small unit to big unit: divide'} by ${big ? f[from] / f[to] : f[to] / f[from]}: ${v} ${from} = ${r} ${to}.`, `${big ? 'Ho tloha ho e kholo ho ea ho e nyane: atisa' : 'Ho tloha ho e nyane ho ea ho e kholo: arola'} ka ${big ? f[from] / f[to] : f[to] / f[from]}: ${v} ${from} = ${r} ${to}.`)], layout: '' };
  }
  function percent(p, of) { const r = Math.round(p * of) / 100; return { answer: r, steps: [P(`${p}% means ${p} out of 100.`, `${p}% e bolela ${p} ho tse 100.`), P(`${p} ÷ 100 × ${of} = ${r}`, `${p} ÷ 100 × ${of} = ${r}`)], layout: '' }; }
  function placeValue(n) {
    const s = String(n); return { answer: s, steps: s.split('').map((d, i) => { const pl = places[s.length - 1 - i]; const v = Number(d) * Math.pow(10, s.length - 1 - i); return P(`${d} is in the ${pl.en} place → ${fmt(v)}`, `${d} e sebakeng sa ${pl.st} → ${fmt(v)}`); }).concat([P(`${fmt(n)} = ` + s.split('').map((d, i) => fmt(Number(d) * Math.pow(10, s.length - 1 - i))).filter(x => x !== '0').join(' + '), `${fmt(n)} = ` + s.split('').map((d, i) => fmt(Number(d) * Math.pow(10, s.length - 1 - i))).filter(x => x !== '0').join(' + '))]), layout: '' };
  }

  /* parse a typed question like "345 x 23", "625/5", "3/4 + 1 1/2", "round 45 678", "volume 2 3 4" */
  function solve(text) {
    let t = String(text).toLowerCase().replace(/(\d)[\s,](?=\d{3}\b)/g, '$1').replace(/×|\*|\bx\b|\btimes\b|\bka makhetlo\b|\batisa\b/g, '×').replace(/÷|\bdivided by\b|\barola ka\b/g, '÷').replace(/−|–|\bminus\b|\btlosa\b/g, '-').replace(/\bplus\b|\bkopanya le\b|\beketsa\b/g, '+');
    let m;
    const F = '(?:(\\d+)\\s+)?(\\d+)\\s*/\\s*(\\d+)';
    if ((m = t.match(new RegExp(F + '\\s*([+\\-×÷])\\s*' + F)))) {
      return fracOp(fr(+m[2], +m[3], +(m[1] || 0)), fr(+m[6], +m[7], +(m[5] || 0)), m[4]);
    }
    if ((m = t.match(new RegExp(F + '\\s*([×÷])\\s*(\\d+)(?!\\s*/)')))) return fracOp(fr(+m[2], +m[3], +(m[1] || 0)), fr(+m[5], 1), m[4]);
    if ((m = t.match(/(?:simplify|nolofatsa)\s*(\d+)\s*\/\s*(\d+)/))) return finish(+m[1], +m[2], [P(`Find a number that divides ${m[1]} and ${m[2]}.`, `Fumana nomoro e arolang ${m[1]} le ${m[2]}.`)]);
    if ((m = t.match(/(round|potoloha|nearest)\D*?(\d+)(?:\D+(10|100|1000))?/)) && /round|nearest|haufi/.test(t)) { const nums = t.match(/\d+/g).map(Number); const to = nums.find(x => [10, 100, 1000].includes(x) && x !== nums[0]) || 1000; return round(nums[0], to); }
    if ((m = t.match(/(multiples?|liatiso)\D*(\d+)/))) return multiples(+m[2], 10);
    if ((m = t.match(/(factors?|lintlha)\D*(\d+)/)) && !/\d+\D+\d+/.test(t.replace(m[0], ''))) return factors(+m[2]);
    if ((m = t.match(/(hcf|lcm|gcd)\D*(\d+)\D+(\d+)/))) return hcfLcm(+m[2], +m[3]);
    if ((m = t.match(/(circumference|potoloho)\D*(radius|diameter|r|d)?\s*=?\s*(\d+(?:\.\d+)?)/))) return circumference(+m[3], /diameter|\bd\b/.test(m[2] || ''));
    if ((m = t.match(/(volume)\D*(\d+)\D+(\d+)\D+(\d+)/))) return volume(+m[2], +m[3], +m[4]);
    if ((m = t.match(/(triangle|khutlo-?tharo|angle)\D*(\d+)\D+(\d+)/))) return triangle(+m[2], +m[3]);
    if ((m = t.match(/(\d+(?:\.\d+)?)\s*(mm|cm|km|kg|ml|m|g|l)\b\s*(?:to|in|ho|=)?\s*(mm|cm|km|kg|ml|m|g|l)\b/))) return convert(+m[1], m[2], m[3]);
    if ((m = t.match(/(\d+(?:\.\d+)?)\s*%\s*(?:of|ea|ho)?\s*(\d+(?:\.\d+)?)/))) return percent(+m[1], +m[2]);
    if ((m = t.match(/(place value|boleng)\D*(\d+)/))) return placeValue(+m[2]);
    if ((m = t.match(/(\d+)\s*([+\-×÷/])\s*(\d+)/))) {
      const a = +m[1], b = +m[3];
      switch (m[2]) { case '+': return add(a, b); case '-': return sub(a, b); case '×': return mul(a, b); default: return div(a, b); }
    }
    return null;
  }
  return { add, sub, mul, div, fracOp, fr, finish, round, multiples, factors, hcfLcm, circumference, volume, triangle, convert, percent, placeValue, solve, gcd, lcm, showF };
})();
if (typeof module !== 'undefined') module.exports = MS;
