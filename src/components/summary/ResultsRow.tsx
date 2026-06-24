import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colours } from '@/theme/colours';
import { typography } from '@/theme/typography';
import { spacing } from '@/theme/spacing';

type StampType = 'approved' | 'denied' | 'neutral';

interface ResultRowProps {
  label: string;
  outcome: string;
  stampType: StampType;
}

const STAMP_COLOUR: Record<StampType, string> = {
  approved: colours.stampApprove,
  denied: colours.stampDeny,
  neutral: colours.inkFaint,
};

export function ResultRow({ label, outcome, stampType }: ResultRowProps) {
  return (
    <View style={styles.row}>
      <View style={styles.info}>
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.outcome}>{outcome}</Text>
      </View>
      <View style={[styles.stamp, { borderColor: STAMP_COLOUR[stampType] }]}>
        <Text style={[styles.stampText, { color: STAMP_COLOUR[stampType] }]}>
          {stampType.toUpperCase()}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: spacing[12],
    borderBottomWidth: 1,
    borderBottomColor: colours.rule,
    gap: spacing[12],
  },
  info: {
    flex: 1,
  },
  label: {
    fontFamily: typography.mono,
    fontSize: typography.sizes.xs,
    fontWeight: typography.weights.medium,
    color: colours.inkFaint,
    letterSpacing: 0.5,
    marginBottom: spacing[4],
  },
  outcome: {
    fontFamily: typography.sans,
    fontSize: typography.sizes.base,
    fontWeight: typography.weights.regular,
    color: colours.inkMid,
  },
  stamp: {
    borderWidth: 1.5,
    paddingHorizontal: spacing[8],
    paddingVertical: spacing[4],
  },
  stampText: {
    fontFamily: typography.mono,
    fontSize: typography.sizes.xs,
    fontWeight: typography.weights.medium,
    letterSpacing: 1,
  },
});