import { useState } from 'react';
import { View } from 'react-native';
import LevelCard from '../../components/LevelCard';
import QuickStart from '../../components/QuickStart';
import RoleCard from '../../components/RoleCard';
import { BigButton, Card, Screen, SectionHead, T } from '../../components/ui';
import { rankRoles } from '../../lib/engine.js';
import { useSkillset } from '../../state/SkillsetProvider';

export default function RolesScreen() {
  const { state } = useSkillset();
  const [showAll, setShowAll] = useState(false);
  const count = Object.keys(state.skills).length;

  if (!count) {
    return (
      <Screen>
        <LevelCard />
        <SectionHead title="Specializations" />
        <QuickStart note="Your best-matching specializations appear here as soon as you add a few skills." />
      </Screen>
    );
  }

  const ranked = rankRoles(state);
  const goal = state.goal ? ranked.find((r) => r.role.id === state.goal) : null;
  const rest = ranked.filter((r) => r !== goal);
  const top = rest.filter((r) => r.pct >= 25).slice(0, 6);
  const others = rest.filter((r) => !top.includes(r));

  return (
    <Screen>
      <LevelCard />
      {goal ? (
        <View style={{ gap: 10 }}>
          <T variant="label">Your goal</T>
          <RoleCard entry={goal} isGoal />
        </View>
      ) : null}
      <View style={{ gap: 12 }}>
        <SectionHead title="Best matches" aside={`from ${count} skill${count === 1 ? '' : 's'}`} />
        {top.length ? (
          top.map((entry) => <RoleCard key={entry.role.id} entry={entry} />)
        ) : (
          <Card><T variant="muted">No strong matches yet. Add more skills or raise their levels and specializations will start to line up.</T></Card>
        )}
      </View>
      {others.length ? (
        <View style={{ gap: 12 }}>
          <BigButton
            variant="soft"
            icon={showAll ? 'chevron-up' : 'chevron-down'}
            title={showAll ? 'Hide other specializations' : `Show ${others.length} other specializations`}
            onPress={() => setShowAll((v) => !v)}
          />
          {showAll ? others.map((entry) => <RoleCard key={entry.role.id} entry={entry} />) : null}
        </View>
      ) : null}
      <T variant="small">Specializations follow the role roadmaps on roadmap.sh. Core skills count 3×, supporting skills 1×, and a skill counts fully once it reaches the target level.</T>
    </Screen>
  );
}
