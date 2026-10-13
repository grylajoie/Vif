import { useState } from 'react';
import { Pressable, View } from 'react-native';
import { router } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import {
  BigButton, Empty, Field, IconButton, List, Screen, T, styles, tap,
} from '../../components/ui';
import { ROLE_BY_ID } from '../../data/catalog.js';
import { useSkillset } from '../../state/SkillsetProvider';
import { colors } from '../../theme';

export default function PlanScreen() {
  const { state, addStep, toggleStep, deleteStep } = useSkillset();
  const [text, setText] = useState('');
  const open = state.plan.filter((p) => !p.done);
  const done = state.plan.filter((p) => p.done);
  const submit = () => { addStep(text); setText(''); };

  return (
    <Screen title="Plan" subtitle={`${open.length} open step${open.length === 1 ? '' : 's'}`}>
      <View style={{ gap: 10 }}>
        <Field value={text} onChangeText={setText} placeholder="e.g. Build a REST API with auth" maxLength={140} returnKeyType="done" onSubmitEditing={submit} />
        <BigButton title="Add step" icon="add" onPress={submit} disabled={!text.trim()} />
      </View>

      {open.length ? (
        <List>{open.map((p) => <StepRow key={p.id} step={p} onToggle={toggleStep} onDelete={deleteStep} />)}</List>
      ) : (
        <Empty icon="map" title="Nothing planned yet" body="Open a specialization on the Roles tab and add its skill gaps, or write your own step above.">
          <BigButton title="See my matches" variant="soft" size="md" onPress={() => router.navigate('/')} />
        </Empty>
      )}

      <T variant="small">Checking off a skill step raises that skill to its target level. Each finished step is worth 10 XP.</T>

      {done.length ? (
        <View style={{ gap: 8 }}>
          <T variant="label">Done · {done.length}</T>
          <List>{done.slice(0, 50).map((p) => <StepRow key={p.id} step={p} onToggle={toggleStep} onDelete={deleteStep} />)}</List>
        </View>
      ) : null}
    </Screen>
  );
}

function StepRow({ step, onToggle, onDelete }) {
  const role = step.role && ROLE_BY_ID[step.role];
  return (
    <View style={styles.item}>
      <Pressable
        accessibilityRole="checkbox"
        accessibilityState={{ checked: step.done }}
        hitSlop={10}
        onPress={() => { tap(step.done ? 'selection' : 'success'); onToggle(step.id); }}
        style={{
          width: 32, height: 32, borderRadius: 10, borderWidth: 2, alignItems: 'center', justifyContent: 'center',
          borderColor: step.done ? colors.accent : colors.line, backgroundColor: step.done ? colors.accent : colors.raised,
        }}
      >
        {step.done ? <Ionicons name="checkmark" size={20} color={colors.accentInk} /> : null}
      </Pressable>
      <View style={{ flex: 1 }}>
        <T style={step.done ? { color: colors.muted, textDecorationLine: 'line-through' } : null}>{step.text}</T>
        {role ? <T variant="small">For {role.name}</T> : null}
      </View>
      <IconButton name="trash-outline" label="Delete step" onPress={() => onDelete(step.id)} />
    </View>
  );
}
