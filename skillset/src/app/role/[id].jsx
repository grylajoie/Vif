import { Linking, ScrollView, StyleSheet, Text, View } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from '@expo/vector-icons/Ionicons';
import {
  BigButton, Card, Chip, IconButton, List, Meter, T, styles,
} from '../../components/ui';
import { LEVELS, ROLE_BY_ID, roadmapUrl } from '../../data/catalog.js';
import {
  evaluateRole, gapsOf, isPlanned, matchTier, planStepFor, requirementName, skillDescription,
} from '../../lib/engine.js';
import { useSkillset } from '../../state/SkillsetProvider';
import { colors, fonts } from '../../theme';

export default function RoleScreen() {
  const { id } = useLocalSearchParams();
  const { state, addSteps, setGoal } = useSkillset();
  const role = ROLE_BY_ID[id];
  const close = () => (router.canGoBack() ? router.back() : router.replace('/'));

  if (!role) {
    return (
      <SafeAreaView style={styles.safe}>
        <View style={{ padding: 16, gap: 16 }}>
          <T variant="h2">Specialization not found</T>
          <BigButton title="Back to matches" onPress={close} />
        </View>
      </SafeAreaView>
    );
  }

  const ev = evaluateRole(state, role);
  const tier = matchTier(ev.pct);
  const core = ev.items.filter((i) => i.w === 3);
  const supporting = ev.items.filter((i) => i.w === 1);
  const coreDone = core.filter((i) => i.cur >= i.lvl).length;
  const nextStep = core.find((i) => i.cur < i.lvl);
  const unplanned = gapsOf(ev.items).filter((g) => !isPlanned(state, g));
  const isGoal = state.goal === role.id;
  const addOne = (item) => addSteps([planStepFor(state, item, role.id)]);

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={[styles.row, { alignItems: 'flex-start' }]}>
          <View style={{ flex: 1, gap: 6 }}>
            <T variant="label">{role.track}</T>
            <T variant="h1">{role.name}</T>
            <T variant="muted">{role.blurb}</T>
          </View>
          <IconButton name="close" size={26} label="Close" onPress={close} color={colors.ink} />
        </View>

        <Card style={{ gap: 14 }}>
          <View style={styles.row}>
            <Text style={{ fontFamily: fonts.monoBold, fontSize: 36, color: colors.accent }}>{ev.pct}%</Text>
            <View style={{ gap: 6 }}>
              <Chip label={tier.label} tone={tier.key} />
              <T variant="small">{coreDone} of {core.length} roadmap steps done</T>
            </View>
          </View>
          <Meter pct={ev.pct / 100} height={12} />
          <BigButton
            title={isGoal ? 'Remove as goal' : 'Set as my goal'}
            icon={isGoal ? 'flag-outline' : 'flag'}
            variant={isGoal ? 'soft' : 'primary'}
            onPress={() => setGoal(isGoal ? null : role.id)}
          />
          <BigButton
            title="Open full roadmap on roadmap.sh"
            icon="open-outline"
            variant="soft"
            size="md"
            onPress={() => Linking.openURL(roadmapUrl(role.slug)).catch(() => {})}
          />
        </Card>

        <View style={{ gap: 12 }}>
          <View style={styles.row}>
            <T variant="h2" style={{ flex: 1 }}>Roadmap</T>
            {unplanned.length ? (
              <BigButton
                size="md"
                title="Add all gaps"
                icon="add"
                onPress={() => addSteps(unplanned.map((g) => planStepFor(state, g, role.id)), 'All gaps added to plan')}
              />
            ) : null}
          </View>
          <T variant="small">Core skills in the order the roadmap teaches them.</T>
          <View style={{ gap: 0 }}>
            {core.map((item, i) => (
              <RoadmapStep
                key={item.ids.join('|')}
                item={item}
                name={requirementName(state, item)}
                planned={isPlanned(state, item)}
                isNext={item === nextStep}
                isLast={i === core.length - 1}
                onAdd={() => addOne(item)}
              />
            ))}
          </View>
        </View>

        {supporting.length ? (
          <View style={{ gap: 12 }}>
            <T variant="h2">Supporting skills</T>
            <T variant="small">Nice to have. Each counts a third as much as a core step.</T>
            <List>
              {supporting.map((item) => {
                const met = item.cur >= item.lvl;
                return (
                  <View key={item.ids.join('|')} style={styles.item}>
                    <Ionicons name={met ? 'checkmark-circle' : 'ellipse-outline'} size={22} color={met ? colors.accent : colors.muted} />
                    <View style={{ flex: 1, gap: 2 }}>
                      <T variant="strong">{requirementName(state, item)}</T>
                      <Text style={local.levels}>{item.cur ? LEVELS[item.cur] : 'Not started'} → {LEVELS[item.lvl]}</Text>
                    </View>
                    {met ? null : isPlanned(state, item) ? (
                      <Chip label="In plan" icon="checkmark" />
                    ) : (
                      <BigButton size="md" variant="soft" title="Add" onPress={() => addOne(item)} />
                    )}
                  </View>
                );
              })}
            </List>
          </View>
        ) : null}
      </ScrollView>
    </SafeAreaView>
  );
}

function RoadmapStep({ item, name, planned, isNext, isLast, onAdd }) {
  const met = item.cur >= item.lvl;
  const desc = item.ids.length === 1 ? skillDescription(item.ids[0]) : null;
  return (
    <View style={local.step}>
      <View style={local.rail}>
        <View style={[local.dot, met && local.dotDone, isNext && local.dotNext]}>
          {met ? (
            <Ionicons name="checkmark" size={18} color={colors.accentInk} />
          ) : (
            <Text style={[local.dotText, isNext && { color: colors.accent }]}>{item.step}</Text>
          )}
        </View>
        {isLast ? null : <View style={[local.line, met && { backgroundColor: colors.accent }]} />}
      </View>
      <View style={[local.body, isNext && local.bodyNext]}>
        <View style={styles.row}>
          <T variant="strong" style={{ flex: 1 }}>{name}</T>
          {isNext ? <Chip label="Next" tone="solid" /> : null}
        </View>
        <T style={{ fontSize: 15 }}>{item.note}</T>
        {desc ? <T variant="small">{desc}</T> : null}
        <View style={[styles.row, { justifyContent: 'space-between' }]}>
          <Text style={local.levels}>
            {met ? `Done · ${LEVELS[item.cur]}` : `${item.cur ? LEVELS[item.cur] : 'Not started'} → ${LEVELS[item.lvl]}`}
          </Text>
          {met ? null : planned ? (
            <Chip label="In plan" icon="checkmark" />
          ) : (
            <BigButton size="md" variant="soft" title="Add to plan" icon="add" onPress={onAdd} />
          )}
        </View>
      </View>
    </View>
  );
}

const local = StyleSheet.create({
  step: { flexDirection: 'row', gap: 12 },
  rail: { width: 32, alignItems: 'center' },
  dot: { width: 32, height: 32, borderRadius: 16, borderWidth: 2, borderColor: colors.line, backgroundColor: colors.raised, alignItems: 'center', justifyContent: 'center' },
  dotDone: { backgroundColor: colors.accent, borderColor: colors.accent },
  dotNext: { borderColor: colors.accent },
  dotText: { fontFamily: fonts.monoBold, fontSize: 13, color: colors.muted },
  line: { flex: 1, width: 2, backgroundColor: colors.line, marginVertical: 4 },
  body: { flex: 1, gap: 8, backgroundColor: colors.surface, borderColor: colors.line, borderWidth: 1, borderRadius: 18, padding: 16, marginBottom: 12 },
  bodyNext: { borderColor: colors.accent },
  levels: { fontFamily: fonts.mono, fontSize: 12, color: colors.muted },
});
