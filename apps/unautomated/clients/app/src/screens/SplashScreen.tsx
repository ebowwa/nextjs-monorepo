import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, Dimensions } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Button } from '../components/Button';
import { colors, spacing, typography, shadows } from '../theme';
import { RootStackParamList } from '../../App';

const { width } = Dimensions.get('window');

type SplashScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Splash'>;

interface Props {
  navigation: SplashScreenNavigationProp;
}

export default function SplashScreen({ navigation }: Props) {
  const handleGettingStartedPress = () => {
    navigation.navigate('GettingStarted');
  };

  const handleSignInPress = () => {
    navigation.navigate('SignIn');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Print On Demand</Text>
            <View style={styles.accent} />
          </View>
          <Text style={styles.subtitle}>Create and edit stunning images, optimize SEO, and manage product details for your store</Text>
        </View>

        <View style={styles.illustrationContainer}>
          <View style={styles.illustrationBackground}>
            <View style={[styles.decorativeCircle, styles.circle1]} />
            <View style={[styles.decorativeCircle, styles.circle2]} />
          </View>
        </View>

        <View style={styles.actionContainer}>
          <Button
            title="Getting Started"
            onPress={handleGettingStartedPress}
            style={styles.primaryButton}
          />
          <Button
            title="Sign In"
            onPress={handleSignInPress}
            variant="secondary"
            style={styles.secondaryButton}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
    padding: spacing.lg,
  },
  header: {
    marginTop: spacing.xl,
    marginBottom: spacing.lg,
  },
  titleContainer: {
    marginBottom: spacing.md,
  },
  title: {
    ...typography.h1,
    color: colors.text,
    marginBottom: spacing.xs,
  },
  accent: {
    position: 'absolute',
    bottom: -spacing.xs,
    left: 0,
    width: 40,
    height: 4,
    backgroundColor: colors.primary,
    borderRadius: 2,
  },
  subtitle: {
    ...typography.body,
    color: colors.textSecondary,
    lineHeight: 24,
    maxWidth: width * 0.85,
  },
  illustrationContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: spacing.xl,
  },
  illustrationBackground: {
    width: width * 0.8,
    height: width * 0.8,
    borderRadius: width * 0.4,
    backgroundColor: colors.surface,
    ...shadows.md,
    overflow: 'hidden',
  },
  decorativeCircle: {
    position: 'absolute',
    borderRadius: 999,
  },
  circle1: {
    width: width * 0.4,
    height: width * 0.4,
    backgroundColor: `${colors.primary}15`,
    top: -width * 0.1,
    right: -width * 0.1,
  },
  circle2: {
    width: width * 0.3,
    height: width * 0.3,
    backgroundColor: `${colors.primary}10`,
    bottom: -width * 0.05,
    left: -width * 0.05,
  },
  actionContainer: {
    marginTop: 'auto',
    paddingBottom: spacing.lg,
  },
  primaryButton: {
    marginBottom: spacing.md,
    height: 56,
  },
  secondaryButton: {
    marginBottom: spacing.md,
    height: 56,
  },
});
