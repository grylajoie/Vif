import { View } from 'react-native';
import { QUICK_PICKS } from '../data/catalog.js';
import { skillName } from '../lib/engine.js';
import { useSkillset } from '../state/SkillsetProvider';
import { BigButton, Card, PickChip, T, styles } from './ui';

// Shown while the profile is empty: one tap per known skill, or a sample profile.
export default function QuickStart({ note }) {
  const { state, addSkill, removeSkill, loadSample } = useSkillset();
  return (
    <Card style={{ gap: 14 }}>
      <View style={{ gap: 4 }}>
        <T variant="h3">Tap what you already know</T>
        <T variant="muted">{note}</T>
      </View>
      <View style={styles.chips}>
        {QUICK_PICKS.map((id) => (
          <PickChip
            key={id}
            label={skillName(state, id)}
            on={!!state.skills[id]}
            onPress={() => (state.skills[id] ? removeSkill(id) : addSkill(id))}
          />
        ))}
      </View>
      <BigButton title="Load example skills" icon="sparkles" variant="soft" onPress={loadSample} />
    </Card>
  );
}
