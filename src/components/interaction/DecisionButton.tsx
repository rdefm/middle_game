import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import { colours } from '@/theme/colours';
import { typography } from '@/theme/typography';
import { spacing } from '@/theme/spacing';

type Variant = 'approve' | 'deny' | 'neutral';

interface DecisionButtonProps {
  label: string;
  onPress: () => void;
  variant: Variant;
  disabled?: boolean;
}

const VARIANT_STYLES: Record<Variant, { bg: string; border: string; text: string }> = {
  approve: {
    bg: colours.paper,
    border: colours.stampApprove,
    text: colours.stampApprove,
  },
  deny: {
    bg: colours.paper,
    border: colours.stampDeny,
    text: colours.stampDeny,
  },
  neutral: {
    bg: colours.paper,
    border: colours.ink,
    text: colours.ink,
  },
};

export function DecisionButton({
  label,
  onPress,
  variant,
  disabled = false,
}: DecisionButtonProps) {
  const vs = VARIANT_STYLES[variant];
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        styles.button,
        {
          backgroundColor: vs.bg,
          borderColor: vs.border,
          opacity: disabled ? 0.4 : pressed ? 0.7 : 1,
        },
      ]}
    >
      <Text style={[styles.label, { color: vs.text }]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    borderWidth: 1.5,
    paddingVertical: spacing[12],
    paddingHorizontal: spacing[20],
    marginVertical: spacing[4],
    alignItems: 'center',
  },
  label: {
    fontFamily: typography.mono,
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.medium,
    letterSpacing: 0.5,
  },
});