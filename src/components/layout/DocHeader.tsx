import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colours } from '@/theme/colours';
import { typography } from '@/theme/typography';
import { spacing } from '@/theme/spacing';

interface DocHeaderProps {
  companyName?: string;
  docType: string;
}

export function DocHeader({
  companyName = 'PEMBROOK SOLUTIONS',
  docType,
}: DocHeaderProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.company}>{companyName}</Text>
      <Text style={styles.docType}>{docType}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: colours.rule,
    paddingBottom: spacing[12],
    marginBottom: spacing[24],
  },
  company: {
    fontFamily: typography.mono,
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.medium,
    color: colours.ink,
    letterSpacing: 1,
  },
  docType: {
    fontFamily: typography.mono,
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.regular,
    color: colours.inkFaint,
    letterSpacing: 0.5,
  },
});