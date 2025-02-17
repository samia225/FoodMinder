import { Stack, router } from 'expo-router';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { AuthProvider, useAuth } from './contexts/auth';
import { useColorScheme } from '@/hooks/useColorScheme';

SplashScreen.preventAutoHideAsync();

function RootLayoutNav() {
  const { user } = useAuth();
  const colorScheme = useColorScheme();

  useEffect(() => {
    // Immediately redirect to login if no user
    if (!user) {
      router.replace('/auth/LoginScreen'); // Changed from LoginScreen to match Screen name
    } else {
      router.replace('/storage'); // Changed from /(tabs) to direct tab route
    }
  }, [user]);

  return (
    <>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen 
          name="(tabs)" 
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen 
          name="auth/login" 
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen 
          name="auth/signup" 
          options={{
            headerShown: false,
          }}
        />
      </Stack>
      <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
    </>
  );
}

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
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
    <AuthProvider>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <RootLayoutNav />
      </ThemeProvider>
    </AuthProvider>
  );
}