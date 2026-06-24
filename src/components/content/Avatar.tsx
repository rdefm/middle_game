import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { typography } from '@/theme/typography';
import { spacing } from '@/theme/spacing';

interface AvatarProps {
  initial: string;
  colour: string;
  size?: number;
}

export function Avatar({ initial, colour, size = spacing[48] }: AvatarProps) {
  const fontSize = size * 0.4;
  return (
    <View
      style={[
        styles.square,
        {
          width: size,
          height: size,
          backgroundColor: colour,
        },
      ]}
    >
      <Text style={[styles.initial, { fontSize }]}>{initial.toUpperCase()}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  square: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  initial: {
    fontFamily: typography.mono,
    fontWeight: typography.weights.medium,
    color: '#FFFFFF',
  },
});