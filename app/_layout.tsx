import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    'Lora' : require('../assets/fonts/Lora-Bold.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="login" options={{ headerShown: false }} />
        <Stack.Screen name="register" options={{ headerShown: false }} />
        <Stack.Screen name="contribution/index" options={{ headerShown: false }} />
        <Stack.Screen name="contribution/start" options={{ headerShown: false }} />
        <Stack.Screen name="contribution/step1" options={{ headerShown: false }} />
        <Stack.Screen name="contribution/step2" options={{ headerShown: false }} />
        <Stack.Screen name="contribution/step3" options={{ headerShown: false }} />
        <Stack.Screen name="contribution/step4" options={{ headerShown: false }} />
        <Stack.Screen name="contribution/step5" options={{ headerShown: false }} />
        <Stack.Screen name="status/index" options={{ headerShown: false }} />
        <Stack.Screen name="status/step1" options={{ headerShown: false }} />
        <Stack.Screen name="status/step2" options={{ headerShown: false }} />
        <Stack.Screen name="profile" options={{ headerShown: false }} />
        <Stack.Screen name="notifications" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </ThemeProvider>
  );
}
