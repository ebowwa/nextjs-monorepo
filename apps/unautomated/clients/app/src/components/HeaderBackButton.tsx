import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { colors, typography, spacing } from '../theme';
import { HeaderBackButtonProps } from '../types/components';

export const HeaderBackButton: React.FC<HeaderBackButtonProps> = ({
  tintColor,
  pressOpacity = 0.7,
}) => {
  const navigation = useNavigation();

  return (
    <Pressable
      onPress={() => navigation.goBack()}
      style={({ pressed }) => [
        styles.container,
        pressed && { opacity: pressOpacity }
      ]}
    >
      <Text style={[
        styles.text,
        tintColor ? { color: tintColor } : null
      ]}>
        Back
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    marginLeft: spacing.md,
    padding: spacing.sm,
  },
  text: {
    ...typography.body,
    color: colors.primary,
  },
});
