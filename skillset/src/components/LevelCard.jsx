import { StyleSheet, Text, View } from 'react-native';
import { useSkillset } from '../state/SkillsetProvider';
import { progress, rankRoles } from '../lib/engine.js';
import { colors, fonts, radius } from '../theme';
import { Card, Meter, T } from './ui';

export default function LevelCard() {
  const { state } = useSkillset();
  const p = progress(state);
  const skillCount = Object.keys(state.skills).length;
  const best = skillCount ? rankRoles(state)[0] : null;

  return (
    <Card style={{ gap: 16, padding: 20, borderRadius: radius.xl }}>
      <View style={styles.top}>
        <View style={styles.badge}>
          <Text style={styles.badgeLabel}>LEVEL</Text>
          <Text style={styles.badgeNum}>{p.level}</Text>
        </View>
        <View style={{ flex: 1, gap: 2 }}>
          <T variant="label">Skillset</T>
          <T variant="h1">{p.title}</T>
          <Text style={styles.xp}>{p.xp} XP · {p.toNext} to Lv {p.level + 1}</Text>
        </View>
      </View>
      <Meter pct={p.pct} height={12} />
      <View style={styles.stats}>
        <Stat value={skillCount} label="skills" />
        <Stat value={state.log.length} label="learned" />
        <Stat value={best ? `${best.pct}%` : '–'} label={best ? `${best.role.name.split(' ')[0]} match` : 'top match'} />
      </View>
    </Card>
  );
}

function Stat({ value, label }) {
  return (
    <View style={styles.stat}>
      <Text style={styles.statValue}>{value}</Text>
      <T variant="small" numberOfLines={1}>{label}</T>
    </View>
  );
}

const styles = StyleSheet.create({
  top: { flexDirection: 'row', alignItems: 'center', gap: 16 },
  badge: { width: 76, height: 76, borderRadius: 22, backgroundColor: colors.accent, alignItems: 'center', justifyContent: 'center' },
  badgeLabel: { fontFamily: fonts.monoBold, fontSize: 10, letterSpacing: 1.2, color: colors.accentInk },
  badgeNum: { fontFamily: fonts.monoBold, fontSize: 32, lineHeight: 36, color: colors.accentInk },
  xp: { fontFamily: fonts.mono, fontSize: 12, color: colors.muted },
  stats: { flexDirection: 'row', gap: 10 },
  stat: { flex: 1, backgroundColor: colors.raised, borderRadius: 16, padding: 12 },
  statValue: { fontFamily: fonts.monoBold, fontSize: 22, color: colors.ink },
});
