import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colours } from '@/theme/colours';
import { typography } from '@/theme/typography';
import { spacing } from '@/theme/spacing';

interface DayBarProps {
  label: string;
  totalDots: number;
  currentDot: number; // 1-based
}

export function DayBar({ label, totalDots, currentDot }: DayBarProps) {
  return (
    <View style={styles.bar}>
      <Text style={styles.label}>{label.toUpperCase()}</Text>
      <View style={styles.dots}>
        {Array.from({ length: totalDots }, (_, i) => (
          <View
            key={i}
            style={[
              styles.dot,
              i + 1 === currentDot ? styles.dotActive : styles.dotInactive,
            ]}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    backgroundColor: colours.ink,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing[16],
    paddingVertical: spacing[8],
  },
  label: {
    fontFamily: typography.mono,
    fontSize: typography.sizes.xs,
    fontWeight: typography.weights.medium,
    color: colours.paper,
    letterSpacing: 1.5,
  },
  dots: {
    flexDirection: 'row',
    gap: spacing[4],
  },
  dot: {
    width: spacing[8],
    height: spacing[8],
    borderRadius: spacing[4],
  },
  dotActive: {
    backgroundColor: colours.highlight,
  },
  dotInactive: {
    backgroundColor: colours.inkFaint,
  },
});