import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colours } from '@/theme/colours';
import { typography } from '@/theme/typography';
import { spacing } from '@/theme/spacing';

interface SpeakerLineProps {
  speaker: string;
  speech: string;
  isPlayer?: boolean;
}

export function SpeakerLine({ speaker, speech, isPlayer = false }: SpeakerLineProps) {
  return (
    <View style={styles.line}>
      <Text style={[styles.speaker, isPlayer && styles.speakerPlayer]}>
        {speaker.toUpperCase()}
      </Text>
      <Text style={styles.speech}>{speech}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  line: {
    marginBottom: spacing[16],
  },
  speaker: {
    fontFamily: typography.mono,
    fontSize: typography.sizes.xs,
    fontWeight: typography.weights.medium,
    color: colours.inkFaint,
    letterSpacing: 1,
    marginBottom: spacing[4],
  },
  speakerPlayer: {
    color: colours.accent,
  },
  speech: {
    fontFamily: typography.sans,
    fontSize: typography.sizes.base,
    fontWeight: typography.weights.regular,
    color: colours.inkMid,
    lineHeight: typography.sizes.base * 1.65,
  },
});