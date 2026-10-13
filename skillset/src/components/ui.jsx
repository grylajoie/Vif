import { Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from '@expo/vector-icons/Ionicons';
import * as Haptics from 'expo-haptics';
import { colors, fonts, radius, space } from '../theme';
import { LEVELS } from '../data/catalog.js';

export function tap(kind = 'selection') {
  if (Platform.OS === 'web') return;
  try {
    if (kind === 'impact') Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    else if (kind === 'success') Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    else Haptics.selectionAsync();
  } catch {
    // Haptics are a nicety; ignore devices without them.
  }
}

export function Screen({ children, title, subtitle, right }) {
  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
        {title ? (
          <View style={styles.screenHead}>
            <View style={{ flex: 1 }}>
              <T variant="display">{title}</T>
              {subtitle ? <T variant="muted">{subtitle}</T> : null}
            </View>
            {right}
          </View>
        ) : null}
        {children}
      </ScrollView>
    </SafeAreaView>
  );
}

const textVariants = {
  display: { fontFamily: fonts.heavy, fontSize: 32, letterSpacing: -0.8, color: colors.ink },
  h1: { fontFamily: fonts.heavy, fontSize: 28, letterSpacing: -0.6, color: colors.ink },
  h2: { fontFamily: fonts.heavy, fontSize: 22, letterSpacing: -0.4, color: colors.ink },
  h3: { fontFamily: fonts.bold, fontSize: 18, color: colors.ink },
  body: { fontFamily: fonts.medium, fontSize: 16, lineHeight: 22, color: colors.ink },
  strong: { fontFamily: fonts.bold, fontSize: 16, color: colors.ink },
  muted: { fontFamily: fonts.medium, fontSize: 14, lineHeight: 20, color: colors.muted },
  small: { fontFamily: fonts.medium, fontSize: 13, color: colors.muted },
  label: { fontFamily: fonts.monoBold, fontSize: 11, letterSpacing: 1.2, textTransform: 'uppercase', color: colors.muted },
  mono: { fontFamily: fonts.monoBold, fontSize: 16, color: colors.ink },
};

export function T({ variant = 'body', style, ...props }) {
  return <Text {...props} style={[textVariants[variant], style]} />;
}

export function Card({ children, style, highlight }) {
  return <View style={[styles.card, highlight && styles.cardHighlight, style]}>{children}</View>;
}

export function List({ children }) {
  const items = Array.isArray(children) ? children.flat().filter(Boolean) : [children];
  return (
    <View style={styles.list}>
      {items.map((child, i) => (
        <View key={child.key ?? i} style={i > 0 ? styles.divider : null}>{child}</View>
      ))}
    </View>
  );
}

export function BigButton({ title, onPress, variant = 'primary', size = 'lg', icon, style, disabled }) {
  const v = buttonVariants[variant];
  return (
    <Pressable
      accessibilityRole="button"
      disabled={disabled}
      onPress={() => { tap('impact'); onPress?.(); }}
      style={({ pressed }) => [
        styles.btn,
        size === 'md' && styles.btnMd,
        { backgroundColor: v.bg, borderColor: v.border },
        pressed && styles.pressed,
        disabled && { opacity: 0.4 },
        style,
      ]}
    >
      {icon ? <Ionicons name={icon} size={size === 'md' ? 18 : 22} color={v.fg} /> : null}
      <Text style={[styles.btnText, size === 'md' && { fontSize: 14 }, { color: v.fg }]}>{title}</Text>
    </Pressable>
  );
}

const buttonVariants = {
  primary: { bg: colors.accent, fg: colors.accentInk, border: colors.accent },
  soft: { bg: colors.accentSoft, fg: colors.accent, border: 'transparent' },
  danger: { bg: 'transparent', fg: colors.danger, border: colors.danger },
};

export function IconButton({ name, onPress, label, color = colors.muted, size = 22 }) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      hitSlop={8}
      onPress={onPress}
      style={({ pressed }) => [styles.iconBtn, pressed && { backgroundColor: colors.raised }]}
    >
      <Ionicons name={name} size={size} color={color} />
    </Pressable>
  );
}

const chipTones = {
  neutral: { bg: colors.raised, fg: colors.ink },
  strong: { bg: colors.accentSoft, fg: colors.accent },
  good: { bg: colors.infoSoft, fg: colors.info },
  emerging: { bg: colors.warnSoft, fg: colors.warn },
  far: { bg: colors.raised, fg: colors.muted },
  solid: { bg: colors.accent, fg: colors.accentInk },
};

export function Chip({ label, tone = 'neutral', icon }) {
  const t = chipTones[tone];
  return (
    <View style={[styles.chip, { backgroundColor: t.bg }]}>
      {icon ? <Ionicons name={icon} size={13} color={t.fg} /> : null}
      <Text style={[styles.chipText, { color: t.fg }]}>{label}</Text>
    </View>
  );
}

export function PickChip({ label, on, onPress }) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ selected: !!on }}
      onPress={() => { tap(); onPress(); }}
      style={({ pressed }) => [styles.pick, on && styles.pickOn, pressed && styles.pressed]}
    >
      <Text style={[styles.pickText, on && { color: colors.accentInk }]}>{on ? '✓ ' : '+ '}{label}</Text>
    </Pressable>
  );
}

export function Meter({ pct, height = 10 }) {
  const width = `${Math.max(0, Math.min(100, Math.round(pct * 100)))}%`;
  return (
    <View style={[styles.meter, { height }]}>
      <View style={[styles.meterFill, { width }]} />
    </View>
  );
}

export function LevelPips({ value, onChange, name }) {
  return (
    <View style={styles.pips} accessibilityLabel={`Level for ${name}`}>
      {[1, 2, 3, 4, 5].map((n) => {
        const on = n <= value;
        return (
          <Pressable
            key={n}
            accessibilityRole="button"
            accessibilityLabel={LEVELS[n]}
            accessibilityState={{ selected: n === value }}
            onPress={() => { tap(); onChange(n); }}
            style={({ pressed }) => [styles.pip, on && styles.pipOn, pressed && styles.pressed]}
          >
            <Text style={[styles.pipText, on && { color: colors.accentInk }]}>{n}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

export function Field(props) {
  return <TextInput placeholderTextColor={colors.muted} selectionColor={colors.accent} {...props} style={[styles.field, props.style]} />;
}

export function SectionHead({ title, aside }) {
  return (
    <View style={styles.sectionHead}>
      <T variant="h2" style={{ flex: 1 }}>{title}</T>
      {aside ? <T variant="small">{aside}</T> : null}
    </View>
  );
}

export function Empty({ icon, title, body, children }) {
  return (
    <Card style={{ alignItems: 'center', gap: space.sm, paddingVertical: space.xl }}>
      {icon ? (
        <View style={styles.emptyIcon}><Ionicons name={icon} size={28} color={colors.accent} /></View>
      ) : null}
      <T variant="h3" style={{ textAlign: 'center' }}>{title}</T>
      <T variant="muted" style={{ textAlign: 'center', maxWidth: 300 }}>{body}</T>
      {children}
    </Card>
  );
}

export const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.bg },
  scroll: { padding: space.md, paddingBottom: 48, gap: space.lg, width: '100%', maxWidth: 640, alignSelf: 'center' },
  screenHead: { flexDirection: 'row', alignItems: 'center', gap: space.sm, paddingTop: space.xs },
  card: { backgroundColor: colors.surface, borderColor: colors.line, borderWidth: 1, borderRadius: radius.lg, padding: 18, gap: space.sm },
  cardHighlight: { borderColor: colors.accent, borderWidth: 2 },
  list: { backgroundColor: colors.surface, borderColor: colors.line, borderWidth: 1, borderRadius: radius.lg, overflow: 'hidden' },
  divider: { borderTopWidth: 1, borderTopColor: colors.line },
  row: { flexDirection: 'row', alignItems: 'center', gap: space.sm },
  item: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingHorizontal: 16, paddingVertical: 14, minHeight: 64 },
  btn: { minHeight: 56, borderRadius: radius.md, borderWidth: 1, paddingHorizontal: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8 },
  btnMd: { minHeight: 44, borderRadius: radius.sm, paddingHorizontal: 14 },
  btnText: { fontFamily: fonts.heavy, fontSize: 16 },
  pressed: { transform: [{ scale: 0.97 }], opacity: 0.9 },
  iconBtn: { width: 44, height: 44, borderRadius: radius.sm, alignItems: 'center', justifyContent: 'center' },
  chip: { flexDirection: 'row', alignItems: 'center', gap: 4, borderRadius: 999, paddingHorizontal: 12, paddingVertical: 6, alignSelf: 'flex-start' },
  chipText: { fontFamily: fonts.bold, fontSize: 13 },
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  pick: { minHeight: 48, justifyContent: 'center', paddingHorizontal: 16, borderRadius: radius.sm, borderWidth: 1, borderColor: colors.line, backgroundColor: colors.raised },
  pickOn: { backgroundColor: colors.accent, borderColor: colors.accent },
  pickText: { fontFamily: fonts.semibold, fontSize: 15, color: colors.ink },
  meter: { borderRadius: 999, backgroundColor: colors.raised, overflow: 'hidden' },
  meterFill: { height: '100%', borderRadius: 999, backgroundColor: colors.accent },
  pips: { flexDirection: 'row', gap: 6 },
  pip: { flex: 1, minWidth: 40, height: 44, borderRadius: 12, borderWidth: 1, borderColor: colors.line, backgroundColor: colors.raised, alignItems: 'center', justifyContent: 'center' },
  pipOn: { backgroundColor: colors.accent, borderColor: colors.accent },
  pipText: { fontFamily: fonts.monoBold, fontSize: 14, color: colors.muted },
  field: { minHeight: 56, borderRadius: radius.md, borderWidth: 1, borderColor: colors.line, backgroundColor: colors.sunk, paddingHorizontal: 16, fontFamily: fonts.medium, fontSize: 16, color: colors.ink },
  sectionHead: { flexDirection: 'row', alignItems: 'baseline', gap: space.sm },
  emptyIcon: { width: 56, height: 56, borderRadius: 18, backgroundColor: colors.accentSoft, alignItems: 'center', justifyContent: 'center' },
});
