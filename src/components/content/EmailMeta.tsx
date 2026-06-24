import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colours } from '@/theme/colours';
import { typography } from '@/theme/typography';
import { spacing } from '@/theme/spacing';

interface EmailMetaProps {
  from: string;
  to: string;
  date: string;
  re: string;
}

export function EmailMeta({ from, to, date, re }: EmailMetaProps) {
  return (
    <View style={styles.container}>
      <MetaRow label="FROM" value={from} />
      <MetaRow label="TO" value={to} />
      <MetaRow label="DATE" value={date} />
      <MetaRow label="RE" value={re} />
    </View>
  );
}

function MetaRow({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.row}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    borderBottomColor: colours.rule,
    paddingBottom: spacing[16],
    marginBottom: spacing[20],
    gap: spacing[4],
  },
  row: {
    flexDirection: 'row',
    gap: spacing[12],
  },
  label: {
    fontFamily: typography.mono,
    fontSize: typography.sizes.xs,
    fontWeight: typography.weights.medium,
    color: colours.inkFaint,
    width: spacing[32],
    letterSpacing: 0.5,
  },
  value: {
    fontFamily: typography.mono,
    fontSize: typography.sizes.xs,
    fontWeight: typography.weights.regular,
    color: colours.inkMid,
    flex: 1,
  },
});