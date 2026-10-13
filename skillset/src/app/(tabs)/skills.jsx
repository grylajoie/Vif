import { useMemo, useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import QuickStart from '../../components/QuickStart';
import {
  BigButton, Card, Field, IconButton, LevelPips, List, PickChip, Screen, SectionHead, T, styles,
} from '../../components/ui';
import { CATEGORIES, LEVEL_HINTS, LEVELS, SKILLS } from '../../data/catalog.js';
import { levelOf, skillCategory, skillName } from '../../lib/engine.js';
import { useSkillset } from '../../state/SkillsetProvider';
import { colors, fonts } from '../../theme';

export default function SkillsScreen() {
  const { state, setLevel, addSkill, addCustomSkill, removeSkill, reset } = useSkillset();
  const [query, setQuery] = useState('');
  const [openCat, setOpenCat] = useState(null);
  const [confirmReset, setConfirmReset] = useState(false);

  const owned = Object.keys(state.skills);
  const byCategory = useMemo(() => {
    const groups = {};
    for (const id of owned) (groups[skillCategory(id)] ||= []).push(id);
    for (const c of Object.keys(groups)) {
      groups[c].sort((a, b) => levelOf(state, b) - levelOf(state, a) || skillName(state, a).localeCompare(skillName(state, b)));
    }
    return groups;
  }, [state]);

  const q = query.trim().toLowerCase();
  const hits = q
    ? Object.keys(SKILLS)
      .filter((k) => !state.skills[k] && SKILLS[k][0].toLowerCase().includes(q))
      .sort((a, b) => SKILLS[a][0].toLowerCase().indexOf(q) - SKILLS[b][0].toLowerCase().indexOf(q))
      .slice(0, 6)
    : [];
  const exact = q && (Object.values(SKILLS).some(([n]) => n.toLowerCase() === q) || Object.values(state.custom).some((c) => c.name.toLowerCase() === q));

  const add = (id) => { addSkill(id); setQuery(''); };
  const addCustom = () => { addCustomSkill(query); setQuery(''); };

  return (
    <Screen title="Skills" subtitle="Tap a number to set your level">
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
              <SuggestRow key={k} title={SKILLS[k][0]} meta={SKILLS[k][1]} onPress={() => add(k)} />
            ))}
            {!exact ? <SuggestRow key="custom" title={`Add “${query.trim()}” as a new skill`} meta="Custom" onPress={addCustom} /> : null}
          </List>
        ) : null}
      </View>

      {owned.length ? (
        CATEGORIES.filter((c) => byCategory[c]).map((c) => (
          <View key={c} style={{ gap: 8 }}>
            <T variant="label">{c}</T>
            <List>
              {byCategory[c].map((id) => (
                <View key={id} style={{ padding: 16, gap: 12 }}>
                  <View style={styles.row}>
                    <View style={{ flex: 1 }}>
                      <T variant="strong">{skillName(state, id)}</T>
                      <T variant="small">{LEVELS[levelOf(state, id)]} · {LEVEL_HINTS[levelOf(state, id)]}</T>
                    </View>
                    <IconButton name="close" label={`Remove ${skillName(state, id)}`} onPress={() => removeSkill(id)} />
                  </View>
                  <LevelPips name={skillName(state, id)} value={levelOf(state, id)} onChange={(n) => setLevel(id, n)} />
                </View>
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
            const available = Object.keys(SKILLS).filter((k) => SKILLS[k][1] === c && !state.skills[k]);
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
                    {available.map((k) => <PickChip key={k} label={SKILLS[k][0]} onPress={() => addSkill(k)} />)}
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

function SuggestRow({ title, meta, onPress }) {
  return (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.item, { minHeight: 56 }, pressed && { backgroundColor: colors.raised }]}>
      <Ionicons name="add-circle" size={22} color={colors.accent} />
      <T variant="strong" style={{ flex: 1 }}>{title}</T>
      <T variant="small">{meta}</T>
    </Pressable>
  );
}
