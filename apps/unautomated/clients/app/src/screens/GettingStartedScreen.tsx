import React from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ServiceTimeline } from '../components/ServiceTimeline';
import { Button } from '../components/Button';
import { colors, spacing } from '../theme';
import { RootStackParamList } from '../../App';

interface Props {
  navigation: NativeStackNavigationProp<RootStackParamList, 'GettingStarted'>;
}

export default function GettingStartedScreen({ navigation }: Props) {
  const handleSignUp = () => {
    navigation.navigate('SignUp');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ServiceTimeline />
      <View style={styles.footer}>
        <Button
          title="Sign Up to Get Started"
          onPress={handleSignUp}
          style={styles.button}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  footer: {
    padding: spacing.lg,
    paddingBottom: spacing.xl,
  },
  button: {
    height: 56,
  },
});
