import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colours } from '@/theme/colours';
import { typography } from '@/theme/typography';
import { spacing } from '@/theme/spacing';

interface PolicyBoxProps {
  section?: string;
  children: React.ReactNode;
}

export function PolicyBox({ section, children }: PolicyBoxProps) {
  return (
    <View style={styles.box}>
      {section ? <Text style={styles.section}>{section}</Text> : null}
      {typeof children === 'string' ? (
        <Text style={styles.text}>{children}</Text>
      ) : (
        children
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    backgroundColor: colours.accentSoft,
    borderLeftWidth: 3,
    borderLeftColor: colours.accent,
    paddingHorizontal: spacing[16],
    paddingVertical: spacing[12],
    marginVertical: spacing[16],
  },
  section: {
    fontFamily: typography.mono,
    fontSize: typography.sizes.xs,
    fontWeight: typography.weights.medium,
    color: colours.accent,
    letterSpacing: 0.5,
    marginBottom: spacing[8],
  },
  text: {
    fontFamily: typography.sans,
    fontSize: typography.sizes.base,
    fontWeight: typography.weights.regular,
    color: colours.inkMid,
    lineHeight: typography.sizes.base * 1.6,
  },
});