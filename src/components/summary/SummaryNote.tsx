import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colours } from '@/theme/colours';
import { typography } from '@/theme/typography';
import { spacing } from '@/theme/spacing';

interface SummaryNoteProps {
  weekLabel: string;
  notes: string;
  verdict: string;
}

export function SummaryNote({ weekLabel, notes, verdict }: SummaryNoteProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.weekLabel}>{weekLabel.toUpperCase()}</Text>
      <Text style={styles.notes}>{notes}</Text>
      <View style={styles.divider} />
      <Text style={styles.verdict}>{verdict}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: spacing[24],
    paddingTop: spacing[20],
    borderTopWidth: 1,
    borderTopColor: colours.rule,
  },
  weekLabel: {
    fontFamily: typography.mono,
    fontSize: typography.sizes.xs,
    fontWeight: typography.weights.medium,
    color: colours.inkFaint,
    letterSpacing: 1.5,
    marginBottom: spacing[12],
  },
  notes: {
    fontFamily: typography.sans,
    fontSize: typography.sizes.base,
    fontWeight: typography.weights.regular,
    color: colours.inkMid,
    lineHeight: typography.sizes.base * 1.7,
    marginBottom: spacing[16],
  },
  divider: {
    height: 1,
    backgroundColor: colours.rule,
    marginVertical: spacing[16],
  },
  verdict: {
    fontFamily: typography.sans,
    fontSize: typography.sizes.md,
    fontWeight: typography.weights.light,
    fontStyle: 'italic',
    color: colours.ink,
    lineHeight: typography.sizes.md * 1.65,
  },
});