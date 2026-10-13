import { useMemo, useState } from 'react';
import { Linking, Pressable, Text, View } from 'react-native';
import { router } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import QuickStart from '../../components/QuickStart';
import {
  BigButton, Card, Field, IconButton, LevelPips, List, PickChip, Screen, SectionHead, T, styles,
} from '../../components/ui';
import { CATEGORIES, LEVEL_HINTS, LEVELS, SKILLS, roadmapUrl } from '../../data/catalog.js';
import {
  levelOf, rolesUsingSkill, skillCategory, skillDescription, skillName,
} from '../../lib/engine.js';
import { useSkillset } from '../../state/SkillsetProvider';
import { colors, fonts } from '../../theme';

export default function SkillsScreen() {
  const { state, setLevel, addSkill, addCustomSkill, removeSkill, reset } = useSkillset();
  const [query, setQuery] = useState('');
  const [openCat, setOpenCat] = useState(null);
  const [openSkill, setOpenSkill] = useState(null);
  const [confirmReset, setConfirmReset] = useState(false);

  const owned = Object.keys(state.skills);
  const byCategory = useMemo(() => {
    const groups = {};
    for (const id of Object.keys(state.skills)) (groups[skillCategory(id)] ||= []).push(id);
    for (const c of Object.keys(groups)) {
      groups[c].sort((a, b) => levelOf(state, b) - levelOf(state, a) || skillName(state, a).localeCompare(skillName(state, b)));
    }
    return groups;
  }, [state]);

  const q = query.trim().toLowerCase();
  const hits = q
    ? Object.keys(SKILLS)
      .filter((k) => !state.skills[k] && SKILLS[k].name.toLowerCase().includes(q))
      .sort((a, b) => SKILLS[a].name.toLowerCase().indexOf(q) - SKILLS[b].name.toLowerCase().indexOf(q))
      .slice(0, 6)
    : [];
  const exact = q && (Object.values(SKILLS).some((s) => s.name.toLowerCase() === q) || Object.values(state.custom).some((c) => c.name.toLowerCase() === q));

  const add = (id) => { addSkill(id); setQuery(''); };
  const addCustom = () => { addCustomSkill(query); setQuery(''); };

  return (
    <Screen title="Skills" subtitle="Tap a skill for details, a number to set your level">
      <View style={{ gap: 8 }}>
        <Field
          value={query}
          onChangeText={setQuery}
          placeholder="Add a skill: Kubernetes, Rust, GraphQL…"
          returnKeyType="done"
          autoCorrect={false}
          onSubmitEditing={() => (hits[0] ? add(hits[0]) : q && !exact && addCustom())}
        />
        {q ? (
          <List>
            {hits.map((k) => (
              <SuggestRow key={k} title={SKILLS[k].name} meta={SKILLS[k].desc} onPress={() => add(k)} />
            ))}
            {!exact ? <SuggestRow key="custom" title={`Add “${query.trim()}” as a new skill`} meta="Custom skill" onPress={addCustom} /> : null}
          </List>
        ) : null}
      </View>

      {owned.length ? (
        CATEGORIES.filter((c) => byCategory[c]).map((c) => (
          <View key={c} style={{ gap: 8 }}>
            <T variant="label">{c}</T>
            <List>
              {byCategory[c].map((id) => (
                <SkillRow
                  key={id}
                  id={id}
                  name={skillName(state, id)}
                  level={levelOf(state, id)}
                  open={openSkill === id}
                  onToggle={() => setOpenSkill(openSkill === id ? null : id)}
                  onLevel={(n) => setLevel(id, n)}
                  onRemove={() => removeSkill(id)}
                />
              ))}
            </List>
          </View>
        ))
      ) : (
        <QuickStart note="Pick a few to start. You can set exact levels afterwards." />
      )}

      <View style={{ gap: 12 }}>
        <SectionHead title="Browse by area" />
        <List>
          {CATEGORIES.filter((c) => c !== 'Other').map((c) => {
            const available = Object.keys(SKILLS).filter((k) => SKILLS[k].cat === c && !state.skills[k]);
            if (!available.length) return null;
            const open = openCat === c;
            return (
              <View key={c}>
                <Pressable
                  accessibilityRole="button"
                  accessibilityState={{ expanded: open }}
                  onPress={() => setOpenCat(open ? null : c)}
                  style={[styles.item, { justifyContent: 'space-between' }]}
                >
                  <T variant="strong">{c}</T>
                  <View style={styles.row}>
                    <Text style={{ fontFamily: fonts.mono, color: colors.muted }}>{available.length}</Text>
                    <Ionicons name={open ? 'chevron-up' : 'chevron-down'} size={20} color={colors.accent} />
                  </View>
                </Pressable>
                {open ? (
                  <View style={[styles.chips, { paddingHorizontal: 16, paddingBottom: 16 }]}>
                    {available.map((k) => <PickChip key={k} label={SKILLS[k].name} onPress={() => addSkill(k)} />)}
                  </View>
                ) : null}
              </View>
            );
          })}
        </List>
      </View>

      <Card>
        <T variant="h3">Levels</T>
        {[1, 2, 3, 4, 5].map((n) => (
          <View key={n} style={styles.row}>
            <Text style={{ fontFamily: fonts.monoBold, color: colors.accent, width: 18 }}>{n}</Text>
            <T variant="strong" style={{ width: 80, fontSize: 14 }}>{LEVELS[n]}</T>
            <T variant="small" style={{ flex: 1 }}>{LEVEL_HINTS[n]}</T>
          </View>
        ))}
      </Card>

      <Card>
        <T variant="h3">Your data</T>
        <T variant="muted">Everything is stored on this device only.</T>
        <BigButton
          variant="danger"
          size="md"
          title={confirmReset ? 'Tap again to delete everything' : 'Delete all my data'}
          onPress={() => {
            if (!confirmReset) { setConfirmReset(true); return; }
            setConfirmReset(false);
            reset();
          }}
        />
      </Card>
    </Screen>
  );
}

function SkillRow({ id, name, level, open, onToggle, onLevel, onRemove }) {
  const desc = skillDescription(id);
  const roles = open ? rolesUsingSkill(id) : [];
  const slug = SKILLS[id] && SKILLS[id].slug;
  return (
    <View style={{ padding: 16, gap: 12 }}>
      <View style={styles.row}>
        <Pressable
          accessibilityRole="button"
          accessibilityState={{ expanded: open }}
          accessibilityHint="Shows what this skill is and which roles use it"
          onPress={onToggle}
          style={{ flex: 1, gap: 2 }}
        >
          <View style={styles.row}>
            <T variant="strong" style={{ flexShrink: 1 }}>{name}</T>
            <Ionicons name={open ? 'chevron-up' : 'information-circle-outline'} size={18} color={colors.muted} />
          </View>
          <T variant="small">{LEVELS[level]} · {LEVEL_HINTS[level]}</T>
        </Pressable>
        <IconButton name="close" label={`Remove ${name}`} onPress={onRemove} />
      </View>
      <LevelPips name={name} value={level} onChange={onLevel} />
      {open ? (
        <View style={{ gap: 10, backgroundColor: colors.sunk, borderRadius: 14, padding: 14 }}>
          <T style={{ fontSize: 15 }}>{desc || 'A custom skill you added.'}</T>
          {roles.length ? (
            <>
              <T variant="label">Core step for</T>
              <View style={styles.chips}>
                {roles.map((r) => (
                  <Pressable
                    key={r.id}
                    accessibilityRole="button"
                    onPress={() => router.push(`/role/${r.id}`)}
                    style={({ pressed }) => [{ backgroundColor: colors.accentSoft, borderRadius: 999, paddingHorizontal: 12, paddingVertical: 8 }, pressed && { opacity: 0.7 }]}
                  >
                    <Text style={{ fontFamily: fonts.bold, fontSize: 13, color: colors.accent }}>{r.name}</Text>
                  </Pressable>
                ))}
              </View>
            </>
          ) : (
            <T variant="small">Not a core step in any tracked role yet.</T>
          )}
          {slug ? (
            <Pressable accessibilityRole="link" onPress={() => Linking.openURL(roadmapUrl(slug)).catch(() => {})} style={styles.row}>
              <Ionicons name="open-outline" size={16} color={colors.accent} />
              <Text style={{ fontFamily: fonts.bold, fontSize: 14, color: colors.accent }}>roadmap.sh/{slug}</Text>
            </Pressable>
          ) : null}
        </View>
      ) : null}
    </View>
  );
}

function SuggestRow({ title, meta, onPress }) {
  return (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.item, { minHeight: 56 }, pressed && { backgroundColor: colors.raised }]}>
      <Ionicons name="add-circle" size={22} color={colors.accent} />
      <View style={{ flex: 1, gap: 2 }}>
        <T variant="strong">{title}</T>
        <T variant="small" numberOfLines={1}>{meta}</T>
      </View>
    </Pressable>
  );
}
