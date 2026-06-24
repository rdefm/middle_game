import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colours } from '@/theme/colours';
import { typography } from '@/theme/typography';
import { spacing } from '@/theme/spacing';

interface WarnBoxProps {
  label?: string;
  children: React.ReactNode;
}

export function WarnBox({ label, children }: WarnBoxProps) {
  return (
    <View style={styles.box}>
      {label ? <Text style={styles.label}>{label}</Text> : null}
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
    backgroundColor: colours.warnSoft,
    borderLeftWidth: 3,
    borderLeftColor: colours.warn,
    paddingHorizontal: spacing[16],
    paddingVertical: spacing[12],
    marginVertical: spacing[16],
  },
  label: {
    fontFamily: typography.mono,
    fontSize: typography.sizes.xs,
    fontWeight: typography.weights.medium,
    color: colours.warn,
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