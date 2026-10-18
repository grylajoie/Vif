// Turn free text ("I know React, Node and Postgres") into catalog skill ids.
import { ALIASES, SKILLS } from '../data/catalog.js';

const escape = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

// Longest phrases first so "react native" wins over "react" and "spring boot" over "spring".
const PHRASES = (() => {
  const map = new Map();
  for (const [id, sk] of Object.entries(SKILLS)) map.set(sk.name.toLowerCase(), id);
  for (const [id, words] of Object.entries(ALIASES)) for (const w of words) map.set(w, id);
  return [...map.entries()]
    .sort((a, b) => b[0].length - a[0].length)
    .map(([phrase, id]) => ({ id, re: new RegExp(`(^|[^a-z0-9+#.])${escape(phrase)}(?![a-z0-9+#])`, 'g') }));
})();

// Words that join items in a sentence; never reported as unknown skills.
const FILLER = new Set(['i', 'know', 'and', 'with', 'some', 'a', 'bit', 'of', 'experience', 'in', 'using', 'use', 'also', 'plus', 'basic', 'basics', 'good', 'strong', 'familiar', 'the', 'my', 'am', 'have', 'worked', 'on', 'like', 'etc']);

export function parseSkills(text) {
  let rest = ` ${String(text || '').toLowerCase()} `;
  const found = [];
  for (const { id, re } of PHRASES) {
    re.lastIndex = 0;
    if (re.test(rest)) {
      if (!found.includes(id)) found.push(id);
      re.lastIndex = 0;
      rest = rest.replace(re, '$1 , ');
    }
  }
  // Whatever is left between separators and isn't filler is offered as a custom skill.
  const unknown = rest
    .split(/[,;\n/|•·]+|\band\b|\bor\b/)
    .map((t) => t.trim().split(/\s+/).filter((w) => w && !FILLER.has(w)).join(' '))
    .filter((t) => t.length > 1 && t.length <= 40 && /[a-z]/.test(t));
  return { found, unknown: [...new Set(unknown)] };
}
