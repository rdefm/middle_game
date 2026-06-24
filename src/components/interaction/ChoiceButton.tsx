import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import { colours } from '@/theme/colours';
import { typography } from '@/theme/typography';
import { spacing } from '@/theme/spacing';

interface ChoiceButtonProps {
  label: string;
  onPress: () => void;
  disabled?: boolean;
}

export function ChoiceButton({ label, onPress, disabled = false }: ChoiceButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        styles.button,
        { opacity: disabled ? 0.4 : pressed ? 0.7 : 1 },
      ]}
    >
      <Text style={styles.label}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: colours.paper,
    borderWidth: 1,
    borderColor: colours.rule,
    paddingVertical: spacing[16],
    paddingHorizontal: spacing[20],
    marginVertical: spacing[4],
  },
  label: {
    fontFamily: typography.sans,
    fontSize: typography.sizes.base,
    fontWeight: typography.weights.regular,
    color: colours.inkMid,
    lineHeight: typography.sizes.base * 1.5,
  },
});