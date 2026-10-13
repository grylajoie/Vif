import { ScrollView, Text, View } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  BigButton, Card, Chip, IconButton, List, Meter, T, styles,
} from '../../components/ui';
import { LEVELS, ROLE_BY_ID } from '../../data/catalog.js';
import {
  evaluateRole, gapsOf, isPlanned, matchTier, planStepFor, requirementName, skillName,
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
  const gaps = gapsOf(ev.items);
  const have = ev.items.filter((i) => i.cur >= i.lvl);
  const unplanned = gaps.filter((g) => !isPlanned(state, g));
  const isGoal = state.goal === role.id;

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
            <Chip label={tier.label} tone={tier.key} />
          </View>
          <Meter pct={ev.pct / 100} height={12} />
          <BigButton
            title={isGoal ? 'Remove as goal' : 'Set as my goal'}
            icon={isGoal ? 'flag-outline' : 'flag'}
            variant={isGoal ? 'soft' : 'primary'}
            onPress={() => setGoal(isGoal ? null : role.id)}
          />
        </Card>

        {gaps.length ? (
          <View style={{ gap: 12 }}>
            <View style={styles.row}>
              <T variant="h2" style={{ flex: 1 }}>What to do next</T>
              {unplanned.length ? (
                <BigButton
                  size="md"
                  title="Add all"
                  icon="add"
                  onPress={() => addSteps(unplanned.map((g) => planStepFor(state, g, role.id)), 'All gaps added to plan')}
                />
              ) : null}
            </View>
            <List>
              {gaps.map((g) => {
                const planned = isPlanned(state, g);
                return (
                  <View key={g.ids.join('|')} style={styles.item}>
                    <View style={{ flex: 1, gap: 2 }}>
                      <T variant="strong">{requirementName(state, g)}</T>
                      <Text style={{ fontFamily: fonts.mono, fontSize: 12, color: colors.muted }}>
                        {g.cur ? LEVELS[g.cur] : 'Not started'} → {LEVELS[g.lvl]} · {g.w === 3 ? 'core' : 'supporting'}
                      </Text>
                    </View>
                    {planned ? (
                      <Chip label="In plan" icon="checkmark" />
                    ) : (
                      <BigButton size="md" variant="soft" title="Add" icon="add" onPress={() => addSteps([planStepFor(state, g, role.id)])} />
                    )}
                  </View>
                );
              })}
            </List>
          </View>
        ) : (
          <Card><T style={{ color: colors.accent }}>You meet every target for this specialization.</T></Card>
        )}

        {have.length ? (
          <View style={{ gap: 12 }}>
            <T variant="h2">You already have</T>
            <View style={styles.chips}>
              {have.map((i) => <Chip key={i.ids.join('|')} tone="strong" icon="checkmark" label={`${skillName(state, i.best)} · ${LEVELS[i.cur]}`} />)}
            </View>
          </View>
        ) : null}
      </ScrollView>
    </SafeAreaView>
  );
}
