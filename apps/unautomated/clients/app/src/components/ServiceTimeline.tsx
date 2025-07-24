import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { colors, spacing, typography } from '../theme';

interface TimelineStep {
  title: string;
  description: string;
  platforms?: string[];
}

const timelineSteps: TimelineStep[] = [
  {
    title: "1. AI-Powered Design Creation",
    description: "Generate unique, market-ready designs using advanced AI. Perfect for t-shirts, hoodies, phone cases, and more. Stand out with original artwork that captures attention.",
  },
  {
    title: "2. Multi-Platform Integration",
    description: "Seamlessly list your designs on major print-on-demand platforms.",
    platforms: [
      "Amazon Merch",
      "Redbubble",
      "Printful",
      "Etsy POD"
    ]
  },
  {
    title: "3. Brand Building",
    description: "Create consistent design collections that build your brand identity. Perfect for influencers, artists, and entrepreneurs looking to monetize their creativity.",
  },
  {
    title: "4. SEO Optimization",
    description: "Get discovered with AI-optimized titles, descriptions, and tags. Our tools ensure your products rank higher in marketplace searches.",
  },
  {
    title: "5. Analytics & Growth",
    description: "Track performance across platforms, identify trending designs, and scale your print-on-demand business with data-driven insights.",
  }
];

export const ServiceTimeline = () => {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Text style={styles.heading}>How It Works</Text>
      <View style={styles.timeline}>
        {timelineSteps.map((step, index) => (
          <View key={index} style={styles.timelineItem}>
            <View style={styles.timelineConnector}>
              <View style={styles.dot} />
              {index !== timelineSteps.length - 1 && <View style={styles.line} />}
            </View>
            <View style={styles.content}>
              <Text style={styles.title}>{step.title}</Text>
              <Text style={styles.description}>{step.description}</Text>
              {step.platforms && (
                <View style={styles.platformsContainer}>
                  {step.platforms.map((platform, pIndex) => (
                    <View key={pIndex} style={styles.platformTag}>
                      <Text style={styles.platformText}>{platform}</Text>
                    </View>
                  ))}
                </View>
              )}
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: spacing.lg,
  },
  heading: {
    ...typography.h2,
    color: colors.text,
    marginBottom: spacing.xl,
    textAlign: 'center',
  },
  timeline: {
    paddingBottom: spacing.xl,
  },
  timelineItem: {
    flexDirection: 'row',
    marginBottom: spacing.xl,
  },
  timelineConnector: {
    alignItems: 'center',
    marginRight: spacing.md,
    width: 24,
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: colors.primary,
  },
  line: {
    width: 2,
    flex: 1,
    backgroundColor: colors.primary,
    marginTop: spacing.xs,
  },
  content: {
    flex: 1,
    paddingBottom: spacing.md,
  },
  title: {
    ...typography.h2,
    fontSize: 18,
    color: colors.text,
    marginBottom: spacing.xs,
  },
  description: {
    ...typography.body,
    color: colors.textSecondary,
    marginBottom: spacing.sm,
  },
  platformsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: spacing.xs,
  },
  platformTag: {
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: 16,
    marginRight: spacing.xs,
    marginBottom: spacing.xs,
  },
  platformText: {
    color: colors.surface,
    fontSize: 12,
    fontWeight: '500',
  },
});
