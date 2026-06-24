import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colours } from '@/theme/colours';
import { typography } from '@/theme/typography';
import { spacing } from '@/theme/spacing';

interface ContinueButtonProps {
  onPress: () => void;
  visible: boolean;
}

export function ContinueButton({ onPress, visible }: ContinueButtonProps) {
  if (!visible) return null;

  return (
    <View style={styles.container}>
      <Pressable
        onPress={onPress}
        style={({ pressed }) => [styles.button, { opacity: pressed ? 0.7 : 1 }]}
      >
        <Text style={styles.label}>Next →</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: spacing[24],
    alignItems: 'flex-end',
  },
  button: {
    backgroundColor: colours.ink,
    paddingVertical: spacing[12],
    paddingHorizontal: spacing[24],
  },
  label: {
    fontFamily: typography.mono,
    fontSize: typography.sizes.base,
    fontWeight: typography.weights.medium,
    color: colours.paper,
    letterSpacing: 0.5,
  },
});