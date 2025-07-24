import React from 'react';
import { Pressable, Text, StyleSheet, BackHandler } from 'react-native';
import { useNavigation, CommonActions } from '@react-navigation/native';
import { colors, typography, spacing } from '../theme';
import { INITIAL_ROUTE, isRootScreen } from '../navigation/navigationConfig';

interface ExitButtonProps {
  tintColor?: string;
  pressOpacity?: number;
}

export const ExitButton: React.FC<ExitButtonProps> = ({
  tintColor,
  pressOpacity = 0.7,
}) => {
  const navigation = useNavigation();

  const handleExit = () => {
    const currentRoute = navigation.getCurrentRoute()?.name;
    
    // If we're already at the root screen, exit the app
    if (currentRoute && isRootScreen(currentRoute)) {
      BackHandler.exitApp();
      return;
    }

    // Try different navigation methods in order of preference
    try {
      // First try to go back
      if (navigation.canGoBack()) {
        navigation.goBack();
        return;
      }

      // If can't go back, try to reset to initial route
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: INITIAL_ROUTE }],
        })
      );
    } catch (error) {
      console.error('Navigation error:', error);
      // Force reset as last resort
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: INITIAL_ROUTE }],
        })
      );
    }
  };

  return (
    <Pressable
      onPress={handleExit}
      style={({ pressed }) => [
        styles.container,
        pressed && { opacity: pressOpacity }
      ]}
    >
      <Text style={[
        styles.text,
        tintColor ? { color: tintColor } : null
      ]}>
        ✕
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    marginRight: spacing.md,
    padding: spacing.sm,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    ...typography.body,
    fontSize: 20,
    color: colors.primary,
  },
});
