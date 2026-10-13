import test from 'node:test';
import assert from 'node:assert/strict';
import { ROLE_BY_ID, ROLES, SKILLS } from '../data/catalog.js';
import {
  evaluateRole, gapsOf, levelForXp, planTextFor, progress, rankRoles, xpForLevel,
} from './engine.js';

const make = (skills = {}) => ({ skills, custom: {}, plan: [], log: [], goal: null });

test('every role requirement points at a known skill', () => {
  for (const role of ROLES) {
    for (const req of role.req) {
      for (const id of req.ids) assert.ok(SKILLS[id], `${role.id} references unknown skill ${id}`);
      assert.ok(req.lvl >= 1 && req.lvl <= 5);
    }
  }
});

test('level thresholds round-trip', () => {
  for (let n = 1; n < 12; n++) {
    assert.equal(levelForXp(xpForLevel(n)), n);
    assert.equal(levelForXp(xpForLevel(n + 1) - 1), n);
  }
});

test('empty profile matches nothing and starts at level 1', () => {
  const s = make();
  assert.equal(progress(s).level, 1);
  assert.ok(rankRoles(s).every((r) => r.pct === 0));
});

test('meeting every target gives 100% and no gaps', () => {
  const role = ROLE_BY_ID.frontend;
  const skills = {};
  for (const req of role.req) skills[req.ids[0]] = req.lvl;
  const ev = evaluateRole(make(skills), role);
  assert.equal(ev.pct, 100);
  assert.equal(gapsOf(ev.items).length, 0);
});

test('alternatives count with the best one the user has', () => {
  const ev = evaluateRole(make({ go: 4 }), ROLE_BY_ID.backend);
  const lang = ev.items.find((i) => i.ids.includes('go'));
  assert.equal(lang.best, 'go');
  assert.equal(lang.cur, 4);
});

test('core gaps rank ahead of supporting gaps of the same size', () => {
  const s = make();
  const gaps = gapsOf(evaluateRole(s, ROLE_BY_ID.data_sci).items);
  assert.equal(gaps[0].w, 3);
  assert.match(planTextFor(s, gaps[0]), /^Get .+ to \w+ \(Lv \d\)$/);
});

test('frontend skills rank frontend-ish roles first', () => {
  const top = rankRoles(make({ js: 4, ts: 3, html_css: 4, react: 4, a11y: 3, web_perf: 3 }))[0];
  assert.equal(top.role.id, 'frontend');
});
