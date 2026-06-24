import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { colours } from '@/theme/colours';
import { typography } from '@/theme/typography';
import { spacing } from '@/theme/spacing';

interface HandwrittenNoteProps {
  text: string;
}

export function HandwrittenNote({ text }: HandwrittenNoteProps) {
  return <Text style={styles.note}>{text}</Text>;
}

const styles = StyleSheet.create({
  note: {
    fontFamily: typography.sans,
    fontSize: typography.sizes.md,
    fontWeight: typography.weights.light,
    fontStyle: 'italic',
    color: colours.inkFaint,
    lineHeight: typography.sizes.md * 1.7,
    marginVertical: spacing[16],
    paddingHorizontal: spacing[8],
  },
});