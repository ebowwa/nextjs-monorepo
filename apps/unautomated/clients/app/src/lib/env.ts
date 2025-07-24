import { Platform } from 'react-native';
import Constants from 'expo-constants';

// Function to get environment variables
export function getEnvVars() {
  try {
    // Get the environment variables from Expo's Constants
    const supabaseUrl = Constants.expoConfig?.extra?.supabaseUrl || 
                       process.env.EXPO_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = Constants.expoConfig?.extra?.supabaseAnonKey || 
                           process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;

    return {
      supabaseUrl,
      supabaseAnonKey
    };
  } catch (error) {
    console.error('Error loading environment variables:', error);
    return {
      supabaseUrl: '',
      supabaseAnonKey: ''
    };
  }
}
