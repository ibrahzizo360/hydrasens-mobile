import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack, useRouter, Slot } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';
import useAuthStore from '@/hooks/useAuthStore';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    'Lora': require('../assets/fonts/Lora-Bold.ttf'),
  });
  const { loadOnBoardingStatus, checkAuthStatus } = useAuthStore();
  const [authLoaded, setAuthLoaded] = useState(false);

  useEffect(() => {
    const checkStatus = async () => {
      await loadOnBoardingStatus();
      await checkAuthStatus();

      setAuthLoaded(true);
    };

    checkStatus();

    if (loaded && authLoaded) {
      const timer = setTimeout(() => {
        SplashScreen.hideAsync();
      }, 2500);
      
      return () => clearTimeout(timer);
    }
  }, [loaded, authLoaded]);

  if (!loaded || !authLoaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="sign-in" options={{ headerShown: false }} />
        <Stack.Screen name="onBoarding" options={{ headerShown: false }} />
        <Stack.Screen name="register" options={{ headerShown: false }} />
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
        <Stack.Screen name="(app)" options={{ headerShown: false }} />
      </Stack>
    </ThemeProvider>
  );
}
