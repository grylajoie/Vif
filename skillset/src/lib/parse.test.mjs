import test from 'node:test';
import assert from 'node:assert/strict';
import { ALIASES, SKILLS } from '../data/catalog.js';
import { parseSkills } from './parse.js';

test('every alias points at a real skill', () => {
  for (const id of Object.keys(ALIASES)) assert.ok(SKILLS[id], id);
});

test('reads a comma list with shorthand', () => {
  const { found, unknown } = parseSkills('React, nodejs, Postgres, k8s, TS');
  assert.deepEqual(found.sort(), ['k8s', 'node', 'postgres', 'react', 'ts'].sort());
  assert.deepEqual(unknown, []);
});

test('reads a sentence and maps tools to skills', () => {
  const { found } = parseSkills('I know Python with pandas, Django and some Docker, plus GitHub Actions');
  for (const id of ['python', 'docker', 'cicd']) assert.ok(found.includes(id), id);
});

test('prefers the longer phrase', () => {
  const { found } = parseSkills('react native');
  assert.deepEqual(found, ['cross_mobile']);
});

test('handles symbols in names', () => {
  const { found } = parseSkills('C#, C++, .NET, Node.js, CI/CD');
  for (const id of ['csharp', 'cpp', 'node', 'cicd']) assert.ok(found.includes(id), id);
});

test('reports words it does not recognise', () => {
  const { found, unknown } = parseSkills('Vue, Elixir, Figma');
  assert.deepEqual(found, ['vue']);
  assert.deepEqual(unknown, ['elixir', 'figma']);
});
