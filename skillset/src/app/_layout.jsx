import { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { DarkTheme, SplashScreen, Stack, ThemeProvider } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  useFonts, Manrope_400Regular, Manrope_500Medium, Manrope_600SemiBold, Manrope_700Bold, Manrope_800ExtraBold,
} from '@expo-google-fonts/manrope';
import { JetBrainsMono_500Medium, JetBrainsMono_600SemiBold } from '@expo-google-fonts/jetbrains-mono';
import { SkillsetProvider, useSkillset } from '../state/SkillsetProvider';
import { colors, fonts } from '../theme';

SplashScreen.preventAutoHideAsync().catch(() => {});

const navTheme = {
  ...DarkTheme,
  colors: { ...DarkTheme.colors, background: colors.bg, card: colors.surface, border: colors.line, primary: colors.accent, text: colors.ink },
};

export default function RootLayout() {
  const [loaded, error] = useFonts({
    Manrope_400Regular, Manrope_500Medium, Manrope_600SemiBold, Manrope_700Bold, Manrope_800ExtraBold,
    JetBrainsMono_500Medium, JetBrainsMono_600SemiBold,
  });

  useEffect(() => {
    if (loaded || error) SplashScreen.hideAsync().catch(() => {});
  }, [loaded, error]);

  if (!loaded && !error) return null;

  return (
    <SafeAreaProvider>
      <ThemeProvider value={navTheme}>
        <SkillsetProvider>
          <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: colors.bg } }}>
            <Stack.Screen name="(tabs)" />
            <Stack.Screen name="role/[id]" options={{ presentation: 'modal' }} />
          </Stack>
          <Toast />
          <StatusBar style="light" />
        </SkillsetProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}

function Toast() {
  const { toast } = useSkillset();
  const insets = useSafeAreaInsets();
  if (!toast) return null;
  return (
    <View pointerEvents="none" style={[styles.toastWrap, { bottom: insets.bottom + 96 }]}>
      <View style={styles.toast}><Text style={styles.toastText}>{toast}</Text></View>
    </View>
  );
}

const styles = StyleSheet.create({
  toastWrap: { position: 'absolute', left: 16, right: 16, alignItems: 'center' },
  toast: { backgroundColor: colors.accent, borderRadius: 999, paddingHorizontal: 20, paddingVertical: 12 },
  toastText: { fontFamily: fonts.bold, fontSize: 14, color: colors.accentInk },
});
