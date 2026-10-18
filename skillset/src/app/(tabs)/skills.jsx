import { useMemo, useState } from 'react';
import { Linking, Pressable, Text, View } from 'react-native';
import { router } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import QuickStart from '../../components/QuickStart';
import {
  BigButton, Card, Chip, LevelPips, List, Screen, T, styles,
} from '../../components/ui';
import { CATEGORIES, LEVEL_HINTS, LEVELS, SKILLS, roadmapUrl } from '../../data/catalog.js';
import {
  levelOf, rolesUsingSkill, skillCategory, skillDescription, skillName,
} from '../../lib/engine.js';
import { useSkillset } from '../../state/SkillsetProvider';
import { colors, fonts } from '../../theme';

export default function SkillsScreen() {
  const { state, setLevel, removeSkill, reset } = useSkillset();
  const [openSkill, setOpenSkill] = useState(null);
  const [confirmReset, setConfirmReset] = useState(false);
  const count = Object.keys(state.skills).length;

  const byCategory = useMemo(() => {
    const groups = {};
    for (const id of Object.keys(state.skills)) (groups[skillCategory(id)] ||= []).push(id);
    for (const c of Object.keys(groups)) groups[c].sort((a, b) => skillName(state, a).localeCompare(skillName(state, b)));
    return groups;
  }, [state]);

  return (
    <Screen title="Skills" subtitle={count ? `${count} skill${count === 1 ? '' : 's'} · tap one to set its level` : 'Nothing added yet'}>
      {count ? (
        <>
          <BigButton title="Add what I know" icon="flash" onPress={() => router.push('/know')} />
          {CATEGORIES.filter((c) => byCategory[c]).map((c) => (
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
                    onRemove={() => { setOpenSkill(null); removeSkill(id); }}
                  />
                ))}
              </List>
            </View>
          ))}
          <T variant="small">Levels are optional. A skill you know counts for most of a role match; reaching the role's target level adds the rest.</T>
        </>
      ) : (
        <QuickStart note="Add everything you know at once. You can fine-tune levels later if you want." />
      )}

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
    <View>
      <Pressable
        accessibilityRole="button"
        accessibilityState={{ expanded: open }}
        onPress={onToggle}
        style={({ pressed }) => [styles.item, { minHeight: 60 }, pressed && { backgroundColor: colors.raised }]}
      >
        <T variant="strong" style={{ flex: 1 }}>{name}</T>
        <Chip label={LEVELS[level]} tone={level >= 4 ? 'strong' : 'neutral'} />
        <Ionicons name={open ? 'chevron-up' : 'chevron-down'} size={20} color={colors.muted} />
      </Pressable>
      {open ? (
        <View style={{ paddingHorizontal: 16, paddingBottom: 16, gap: 12 }}>
          <LevelPips name={name} value={level} onChange={onLevel} />
          <T variant="small">{LEVELS[level]}: {LEVEL_HINTS[level]}</T>
          <T style={{ fontSize: 15 }}>{desc || 'A skill you added yourself.'}</T>
          {roles.length ? (
            <View style={{ gap: 8 }}>
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
            </View>
          ) : null}
          <View style={[styles.row, { justifyContent: 'space-between' }]}>
            {slug ? (
              <Pressable accessibilityRole="link" onPress={() => Linking.openURL(roadmapUrl(slug)).catch(() => {})} style={styles.row}>
                <Ionicons name="open-outline" size={16} color={colors.accent} />
                <Text style={{ fontFamily: fonts.bold, fontSize: 14, color: colors.accent }}>roadmap.sh/{slug}</Text>
              </Pressable>
            ) : <View />}
            <BigButton title="Remove" variant="danger" size="md" icon="trash-outline" onPress={onRemove} />
          </View>
        </View>
      ) : null}
    </View>
  );
}
