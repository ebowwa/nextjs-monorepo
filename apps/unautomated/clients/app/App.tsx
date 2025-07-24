import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { colors, typography } from './src/theme';
import { supabase, isSessionValid } from './src/lib/supabase';
import { Session } from '@supabase/supabase-js';
import { View, ActivityIndicator } from 'react-native';
import { ThemeProvider } from './src/theme/ThemeContext';

// Import screens
import SplashScreen from './src/screens/SplashScreen';
import GettingStartedScreen from './src/screens/GettingStartedScreen';
import SignUpScreen from './src/screens/SignUpScreen';
import SignInScreen from './src/screens/SignInScreen';
import DashboardScreen from './src/screens/DashboardScreen';
import TrendsScreen from './src/screens/TrendsScreen';

// Define navigation types
export type RootStackParamList = {
  Splash: undefined;
  GettingStarted: undefined;
  SignUp: undefined;
  SignIn: undefined;
  Dashboard: undefined;
  MarketResearch: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if there's a valid session
    const checkSession = async () => {
      try {
        const currentSession = (await supabase.auth.getSession()).data.session;
        if (currentSession && (await isSessionValid())) {
          setSession(currentSession);
        }
      } catch (error) {
        console.error('Error checking session:', error);
      } finally {
        setLoading(false);
      }
    };

    checkSession();

    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => {
      if (subscription) {
        subscription.unsubscribe();
      }
    };
  }, []);

  // Show loading indicator while checking session
  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <ThemeProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerStyle: {
                backgroundColor: colors.background,
              },
              headerTitleStyle: {
                ...typography.h2,
              },
              headerTintColor: colors.text,
            }}
          >
            {session ? (
              // Authenticated stack
              <>
                <Stack.Screen 
                  name="Dashboard" 
                  component={DashboardScreen}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="MarketResearch"
                  component={TrendsScreen}
                  options={{
                    headerShown: true,
                    title: 'Market Research',
                    presentation: 'card',
                  }}
                />
              </>
            ) : (
              // Non-authenticated stack
              <>
                <Stack.Screen 
                  name="Splash" 
                  component={SplashScreen} 
                  options={{ headerShown: false }}
                />
                <Stack.Screen 
                  name="GettingStarted" 
                  component={GettingStartedScreen}
                  options={{ title: 'Getting Started' }}
                />
                <Stack.Screen 
                  name="SignUp" 
                  component={SignUpScreen}
                  options={{ title: 'Sign Up' }}
                />
                <Stack.Screen 
                  name="SignIn" 
                  component={SignInScreen}
                  options={{ title: 'Sign In' }}
                />
              </>
            )}
          </Stack.Navigator>
        </NavigationContainer>
      </GestureHandlerRootView>
    </ThemeProvider>
  );
};
