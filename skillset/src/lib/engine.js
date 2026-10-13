// Scoring, XP and matching. Pure functions over the app state.
import {
  LEVELS, ROLES, SKILLS, TITLES, XP_PER_LEVEL, XP_PER_LOG, XP_PER_STEP,
} from '../data/catalog.js';

export const skillName = (state, id) =>
  (SKILLS[id] && SKILLS[id].name) || (state.custom[id] && state.custom[id].name) || id;

export const skillCategory = (id) => (SKILLS[id] && SKILLS[id].cat) || 'Other';

export const skillDescription = (id) => (SKILLS[id] && SKILLS[id].desc) || null;

// Roles that list this skill (or an alternative containing it) as a core step.
export const rolesUsingSkill = (id) =>
  ROLES.filter((r) => r.req.some((q) => q.w === 3 && q.ids.includes(id)));

export const levelOf = (state, id) => state.skills[id] || 0;

export function totalXp(state) {
  let xp = 0;
  for (const id of Object.keys(state.skills)) xp += XP_PER_LEVEL[state.skills[id]] || 0;
  xp += state.log.length * XP_PER_LOG;
  xp += state.plan.filter((p) => p.done).length * XP_PER_STEP;
  return xp;
}

// Level n starts at 20 * n * (n - 1) XP: 0, 40, 120, 240, 400, ...
export const xpForLevel = (n) => 20 * n * (n - 1);
export const levelForXp = (xp) => Math.floor((1 + Math.sqrt(1 + xp / 5)) / 2);
export const titleForLevel = (n) => TITLES[Math.min(n, TITLES.length - 1)];

export function progress(state) {
  const xp = totalXp(state);
  const level = levelForXp(xp);
  const lo = xpForLevel(level);
  const hi = xpForLevel(level + 1);
  return { xp, level, title: titleForLevel(level), toNext: hi - xp, pct: (xp - lo) / (hi - lo) };
}

export function evaluateRole(state, role) {
  let total = 0;
  let earned = 0;
  const items = role.req.map((req) => {
    let best = req.ids[0];
    let cur = 0;
    for (const id of req.ids) {
      if (levelOf(state, id) > cur) {
        cur = levelOf(state, id);
        best = id;
      }
    }
    total += req.w;
    earned += req.w * Math.min(cur / req.lvl, 1);
    return { ...req, cur, best };
  });
  return { pct: Math.round((100 * earned) / total), items };
}

export function rankRoles(state) {
  return ROLES.map((role) => ({ role, ...evaluateRole(state, role) })).sort((a, b) => b.pct - a.pct);
}

export function matchTier(pct) {
  if (pct >= 75) return { key: 'strong', label: 'Strong match' };
  if (pct >= 50) return { key: 'good', label: 'Good match' };
  if (pct >= 25) return { key: 'emerging', label: 'Emerging' };
  return { key: 'far', label: 'Long shot' };
}

// Core gaps in roadmap order, then supporting gaps by size of shortfall.
export const gapsOf = (items) =>
  items.filter((i) => i.cur < i.lvl).sort((a, b) => {
    if (a.w !== b.w) return b.w - a.w;
    if (a.step && b.step) return a.step - b.step;
    return (b.lvl - b.cur) - (a.lvl - a.cur);
  });

export const requirementName = (state, item) =>
  item.cur > 0 || item.ids.length === 1
    ? skillName(state, item.best)
    : item.ids.map((id) => skillName(state, id)).join(' or ');

export const planTextFor = (state, item) =>
  `Get ${requirementName(state, item)} to ${LEVELS[item.lvl]} (Lv ${item.lvl})`;

export const isPlanned = (state, item) =>
  state.plan.some((p) => !p.done && p.text === planTextFor(state, item));

export function planStepFor(state, item, roleId) {
  return {
    text: planTextFor(state, item),
    role: roleId,
    skill: item.cur > 0 || item.ids.length === 1 ? item.best : null,
    lvl: item.lvl,
  };
}
