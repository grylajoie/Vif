import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import Ionicons from '@expo/vector-icons/Ionicons';
import {
  BigButton, Card, Field, IconButton, PickChip, T, styles, tap,
} from '../components/ui';
import { CATEGORIES, ROLES, SKILLS } from '../data/catalog.js';
import { rankRoles, skillName } from '../lib/engine.js';
import { parseSkills } from '../lib/parse.js';
import { useSkillset } from '../state/SkillsetProvider';
import { colors, fonts } from '../theme';

// One screen to say what you know, three ways, with matches updating live.
export default function KnowScreen() {
  const { state, toggleSkill, addSkills, addRoleSkills, addCustomSkill } = useSkillset();
  const insets = useSafeAreaInsets();
  const [text, setText] = useState('');
  const [parsed, setParsed] = useState(null);
  const count = Object.keys(state.skills).length;
  const top = count ? rankRoles(state).slice(0, 3) : [];
  const close = () => (router.canGoBack() ? router.back() : router.replace('/'));

  const find = () => {
    const result = parseSkills(text);
    setParsed(result);
    if (result.found.length) addSkills(result.found, `Found ${result.found.length} skill${result.found.length === 1 ? '' : 's'}`);
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView contentContainerStyle={[styles.scroll, { paddingBottom: 200 }]} keyboardShouldPersistTaps="handled">
        <View style={[styles.row, { alignItems: 'flex-start' }]}>
          <View style={{ flex: 1, gap: 4 }}>
            <T variant="display">What do you know?</T>
            <T variant="muted">Use any of the three ways below. Your matches update as you go.</T>
          </View>
          <IconButton name="close" size={26} label="Close" onPress={close} color={colors.ink} />
        </View>

        <Section n="1" title="Type or paste it" hint="A list, a sentence, or your CV's skills line.">
          <Field
            value={text}
            onChangeText={setText}
            placeholder="e.g. React, TypeScript, Node, Postgres, Docker, AWS"
            multiline
            style={{ minHeight: 96, paddingTop: 16, textAlignVertical: 'top' }}
          />
          <BigButton title="Find my skills" icon="sparkles" onPress={find} disabled={!text.trim()} />
          {parsed ? (
            <View style={{ gap: 10 }}>
              {parsed.found.length ? (
                <>
                  <T variant="small">Recognised {parsed.found.length}. Tap one to remove it.</T>
                  <View style={styles.chips}>
                    {parsed.found.map((id) => (
                      <PickChip key={id} label={skillName(state, id)} on={!!state.skills[id]} onPress={() => toggleSkill(id)} />
                    ))}
                  </View>
                </>
              ) : (
                <T variant="small">No known skills found. Try names like “Python” or “Docker”, separated by commas.</T>
              )}
              {parsed.unknown.length ? (
                <>
                  <T variant="small">Not recognised. Tap to add as your own skill:</T>
                  <View style={styles.chips}>
                    {parsed.unknown.map((w) => (
                      <PickChip
                        key={w}
                        label={w}
                        on={Object.values(state.custom).some((c) => c.name.toLowerCase() === w)}
                        onPress={() => addCustomSkill(w)}
                      />
                    ))}
                  </View>
                </>
              ) : null}
            </View>
          ) : null}
        </Section>

        <Section n="2" title="Start from a role you already do" hint="Adds that role's core skills in one tap. Remove any you don't have below.">
          <View style={styles.chips}>
            {ROLES.map((r) => (
              <Pressable
                key={r.id}
                accessibilityRole="button"
                onPress={() => { tap('impact'); addRoleSkills(r.id); }}
                style={({ pressed }) => [local.role, pressed && styles.pressed]}
              >
                <Ionicons name="add" size={18} color={colors.accent} />
                <Text style={local.roleText}>{r.name}</Text>
              </Pressable>
            ))}
          </View>
        </Section>

        <Section n="3" title="Tap what you know" hint="Green means you know it. Tap again to remove.">
          {CATEGORIES.filter((c) => c !== 'Other').map((c) => (
            <View key={c} style={{ gap: 8 }}>
              <T variant="label">{c}</T>
              <View style={styles.chips}>
                {Object.keys(SKILLS).filter((k) => SKILLS[k].cat === c).map((k) => (
                  <PickChip key={k} label={SKILLS[k].name} on={!!state.skills[k]} onPress={() => toggleSkill(k)} />
                ))}
              </View>
            </View>
          ))}
        </Section>
      </ScrollView>

      <View style={[local.bar, { paddingBottom: insets.bottom + 12 }]}>
        {top.length ? (
          <View style={{ gap: 6 }}>
            <T variant="label">{count} skill{count === 1 ? '' : 's'} · your best matches</T>
            {top.map((m) => (
              <View key={m.role.id} style={styles.row}>
                <Text style={local.pct}>{m.pct}%</Text>
                <T variant="strong" style={{ flex: 1, fontSize: 15 }} numberOfLines={1}>{m.role.name}</T>
              </View>
            ))}
          </View>
        ) : (
          <T variant="muted">Add a few skills to see which roles you match.</T>
        )}
        <BigButton title={count ? 'See all my matches' : 'Close'} icon={count ? 'arrow-forward' : undefined} onPress={close} />
      </View>
    </SafeAreaView>
  );
}

function Section({ n, title, hint, children }) {
  return (
    <Card style={{ gap: 14 }}>
      <View style={styles.row}>
        <View style={local.num}><Text style={local.numText}>{n}</Text></View>
        <View style={{ flex: 1 }}>
          <T variant="h3">{title}</T>
          <T variant="small">{hint}</T>
        </View>
      </View>
      {children}
    </Card>
  );
}

const local = StyleSheet.create({
  num: { width: 32, height: 32, borderRadius: 16, backgroundColor: colors.accentSoft, alignItems: 'center', justifyContent: 'center' },
  numText: { fontFamily: fonts.monoBold, fontSize: 14, color: colors.accent },
  role: { minHeight: 48, flexDirection: 'row', alignItems: 'center', gap: 6, paddingHorizontal: 14, borderRadius: 12, borderWidth: 1, borderColor: colors.line, backgroundColor: colors.raised },
  roleText: { fontFamily: fonts.semibold, fontSize: 15, color: colors.ink },
  bar: { position: 'absolute', left: 0, right: 0, bottom: 0, gap: 12, paddingTop: 14, paddingHorizontal: 16, backgroundColor: colors.surface, borderTopWidth: 1, borderTopColor: colors.line },
  pct: { fontFamily: fonts.monoBold, fontSize: 15, color: colors.accent, width: 48 },
});
