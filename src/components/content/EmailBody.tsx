import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { colours } from '@/theme/colours';
import { typography } from '@/theme/typography';
import { spacing } from '@/theme/spacing';

interface EmailBodyProps {
  body: string;
}

export function EmailBody({ body }: EmailBodyProps) {
  return <Text style={styles.body}>{body}</Text>;
}

const styles = StyleSheet.create({
  body: {
    fontFamily: typography.sans,
    fontSize: typography.sizes.base,
    fontWeight: typography.weights.regular,
    color: colours.inkMid,
    lineHeight: typography.sizes.base * 1.7,
    // whitespace: pre-line behaviour — preserve newlines
  },
});