import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack, useRouter } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';
import useAuthStore from '@/hooks/useAuthStore';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const route = useRouter();
  const [loaded] = useFonts({
    'Lora': require('../assets/fonts/Lora-Bold.ttf'),
  });
  const { isAuthenticated, onBoardingCompleted, loadOnBoardingStatus } = useAuthStore();
  const [isReady, setIsReady] = useState(false); // New state to track readiness

  useEffect(() => {
    const checkAuthStatus = async () => {
      await loadOnBoardingStatus(); // Ensure onboarding status is loaded
      setIsReady(true); // Set ready state to true after loading
    };

    checkAuthStatus();

    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  useEffect(() => {
    // Navigate only after the layout is ready and loaded
    if (isReady) {
      // Introduce a slight delay
      const delay = setTimeout(() => {
        if (onBoardingCompleted) {
          if (isAuthenticated) {
            route.push('/(tabs)');
          } else {
            route.push('/login');
          }
        } else {
          route.push('/');
        }
      }, 1); // Delay for 500 milliseconds

      // Cleanup timeout on unmount
      return () => clearTimeout(delay);
    }
  }, [isReady, isAuthenticated, onBoardingCompleted]);

  if (!loaded) {
    return null; // Wait until fonts are loaded
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="login" options={{ headerShown: false }} />
        <Stack.Screen name="index" options={{ headerShown: false }} />
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
