import { Pressable, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import { useSkillset } from '../state/SkillsetProvider';
import { gapsOf, matchTier, requirementName } from '../lib/engine.js';
import { colors, fonts, radius } from '../theme';
import { Chip, Meter, T, tap } from './ui';

export default function RoleCard({ entry, isGoal }) {
  const { state } = useSkillset();
  const { role, pct, items } = entry;
  const tier = matchTier(pct);
  const next = gapsOf(items).filter((g) => g.w === 3).slice(0, 2).map((g) => requirementName(state, g));

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`${role.name}, ${pct} percent match`}
      onPress={() => { tap(); router.push(`/role/${role.id}`); }}
      style={({ pressed }) => [styles.card, isGoal && styles.goal, pressed && { transform: [{ scale: 0.98 }] }]}
    >
      <View style={styles.top}>
        <T variant="h3" style={{ flex: 1 }}>{role.name}</T>
        <Text style={styles.pct}>{pct}%</Text>
      </View>
      <Meter pct={pct / 100} />
      <View style={styles.chips}>
        {isGoal ? <Chip label="Goal" tone="solid" icon="flag" /> : null}
        <Chip label={tier.label} tone={tier.key} />
        <Chip label={role.track} />
      </View>
      {next.length ? (
        <T variant="muted">Next: {next.join(', ')}</T>
      ) : (
        <T variant="muted" style={{ color: colors.accent }}>All core skills covered</T>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.line, borderRadius: radius.lg, padding: 18, gap: 12 },
  goal: { borderColor: colors.accent, borderWidth: 2 },
  top: { flexDirection: 'row', alignItems: 'baseline', gap: 10 },
  pct: { fontFamily: fonts.monoBold, fontSize: 22, color: colors.accent },
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
});
