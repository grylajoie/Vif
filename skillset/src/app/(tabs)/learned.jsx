import { useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import {
  BigButton, Card, Empty, Field, IconButton, List, PickChip, Screen, T, styles,
} from '../../components/ui';
import { skillName } from '../../lib/engine.js';
import { useSkillset } from '../../state/SkillsetProvider';
import { colors, fonts } from '../../theme';

const WEEK = 7 * 24 * 60 * 60 * 1000;
const formatDate = (t) => new Date(t).toLocaleDateString(undefined, { month: 'short', day: 'numeric' });

export default function LearnedScreen() {
  const { state, addLog, deleteLog } = useSkillset();
  const [text, setText] = useState('');
  const [skill, setSkill] = useState(null);
  const owned = Object.keys(state.skills).sort((a, b) => skillName(state, a).localeCompare(skillName(state, b)));
  const thisWeek = state.log.filter((l) => Date.now() - l.t < WEEK).length;
  const submit = () => { addLog(text, skill); setText(''); setSkill(null); };

  return (
    <Screen title="Learned" subtitle={`${thisWeek} this week · ${state.log.length} total`}>
      <Card style={{ gap: 12 }}>
        <T variant="label">What did you learn?</T>
        <Field value={text} onChangeText={setText} placeholder="e.g. How Postgres indexes speed up joins" maxLength={200} returnKeyType="done" onSubmitEditing={submit} />
        {owned.length ? (
          <>
            <T variant="small">Related skill (optional)</T>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 8 }}>
              {owned.map((id) => (
                <PickChip key={id} label={skillName(state, id)} on={skill === id} onPress={() => setSkill(skill === id ? null : id)} />
              ))}
            </ScrollView>
          </>
        ) : null}
        <BigButton title="Log it · +5 XP" icon="flash" onPress={submit} disabled={!text.trim()} />
      </Card>

      {state.log.length ? (
        <List>
          {state.log.slice(0, 100).map((l) => (
            <View key={l.id} style={styles.item}>
              <Text style={{ fontFamily: fonts.mono, fontSize: 12, color: colors.muted, width: 52 }}>{formatDate(l.t)}</Text>
              <View style={{ flex: 1 }}>
                <T>{l.text}</T>
                {l.skill ? <T variant="small" style={{ color: colors.accent }}>{skillName(state, l.skill)}</T> : null}
              </View>
              <IconButton name="trash-outline" label="Delete entry" onPress={() => deleteLog(l.id)} />
            </View>
          ))}
        </List>
      ) : (
        <Empty icon="book" title="Your learning log is empty" body="Log one thing each time you learn something. Every entry is worth 5 XP and builds a record you can look back on." />
      )}
    </Screen>
  );
}
