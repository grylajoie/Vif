import { View } from 'react-native';
import { router } from 'expo-router';
import { useSkillset } from '../state/SkillsetProvider';
import { BigButton, Card, T } from './ui';

// Empty-state call to action: the fastest path from "nothing" to role matches.
export default function QuickStart({ note }) {
  const { loadSample } = useSkillset();
  return (
    <Card style={{ gap: 14, padding: 20 }}>
      <View style={{ gap: 6 }}>
        <T variant="h2">See which roles fit you</T>
        <T variant="muted">{note}</T>
      </View>
      <View style={{ gap: 6 }}>
        <T>• Paste a list like “React, Node, Docker”</T>
        <T>• Or start from a role you already do</T>
        <T>• Or tap the skills you know</T>
      </View>
      <BigButton title="Add what I know" icon="flash" onPress={() => router.push('/know')} />
      <BigButton title="Try with example skills" variant="soft" size="md" onPress={loadSample} />
    </Card>
  );
}
