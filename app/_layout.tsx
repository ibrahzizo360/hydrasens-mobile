import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import 'react-native-reanimated';
import { useColorScheme } from '@/hooks/useColorScheme';
import useAuthStore from '@/hooks/useAuthStore';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';
import { Platform } from 'react-native';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    'Lora': require('../assets/fonts/Lora-Bold.ttf'),
  });
  const { loadOnBoardingStatus, checkAuthStatus } = useAuthStore();
  const [authLoaded, setAuthLoaded] = useState(false);
  const [shouldRedirect, setShouldRedirect] = useState(false);

  // Check onboarding and auth status
  useEffect(() => {
    const checkStatus = async () => {
      await loadOnBoardingStatus();
      const authStatus = await checkAuthStatus();
      if (!authStatus) {
        setShouldRedirect(true);
        setAuthLoaded(true);
      } else {
        setAuthLoaded(true);
      }
    };

    checkStatus();
  }, [loadOnBoardingStatus, checkAuthStatus]);

  // Hide splash screen once fonts and auth status are loaded
  useEffect(() => {
    if (loaded && authLoaded) {
      const timer = setTimeout(() => {
        SplashScreen.hideAsync();
      }, 2500);

      return () => clearTimeout(timer);
    }
  }, [loaded, authLoaded]);

  const [expoPushToken, setExpoPushToken] = useState('');
  const [channels, setChannels] = useState<Notifications.NotificationChannel[]>([]);
  const [notification, setNotification] = useState<Notifications.Notification | undefined>(undefined);

  // Handle push notifications
  useEffect(() => {
    registerForPushNotificationsAsync().then(token => token && setExpoPushToken(token));

    if (Platform.OS === 'android') {
      Notifications.getNotificationChannelsAsync().then(value => setChannels(value ?? []));
    }

    const notificationListener = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });

    const responseListener = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener);
      Notifications.removeNotificationSubscription(responseListener);
    };
  }, []);

  // Check if everything is loaded
  if (!loaded || !authLoaded) {
    return null;
  }

  if (shouldRedirect) {
    return (
      <Stack>
        <Stack.Screen name="sign-in" options={{ headerShown: false }} />
      </Stack>
    );
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

// Push notification registration
async function registerForPushNotificationsAsync() {
  let token;

  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }

    try {
      const projectId = Constants?.expoConfig?.extra?.eas?.projectId ?? Constants?.easConfig?.projectId;
      if (!projectId) {
        throw new Error('Project ID not found');
      }
      token = (await Notifications.getExpoPushTokenAsync({ projectId })).data;
      console.log(token);
    } catch (e) {
      token = `${e}`;
    }
  } else {
    alert('Must use physical device for Push Notifications');
  }

  return token;
}
