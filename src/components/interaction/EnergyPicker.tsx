import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { colours } from '@/theme/colours';
import { typography } from '@/theme/typography';
import { spacing } from '@/theme/spacing';

interface EnergyPickerProps {
  value: number | null;
  onChange: (score: number) => void;
  disabled?: boolean;
}

// Valid range: 1–9. 10 is not a valid submission per game logic.
const SCORES = [1, 2, 3, 4, 5, 6, 7, 8, 9] as const;

export function EnergyPicker({ value, onChange, disabled = false }: EnergyPickerProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>TEAM ENERGY SCORE</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.row}
      >
        {SCORES.map((score) => {
          const isSelected = value === score;
          return (
            <Pressable
              key={score}
              onPress={() => !disabled && onChange(score)}
              style={({ pressed }) => [
                styles.cell,
                isSelected && styles.cellSelected,
                { opacity: disabled ? 0.5 : pressed ? 0.7 : 1 },
              ]}
            >
              <Text
                style={[styles.cellText, isSelected && styles.cellTextSelected]}
              >
                {score}
              </Text>
            </Pressable>
          );
        })}
      </ScrollView>
      <View style={styles.labels}>
        <Text style={styles.endLabel}>LOW</Text>
        <Text style={styles.endLabel}>HIGH</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: spacing[16],
  },
  label: {
    fontFamily: typography.mono,
    fontSize: typography.sizes.xs,
    fontWeight: typography.weights.medium,
    color: colours.inkFaint,
    letterSpacing: 1,
    marginBottom: spacing[12],
  },
  row: {
    flexDirection: 'row',
    gap: spacing[8],
    paddingVertical: spacing[4],
  },
  cell: {
    width: spacing[48] - spacing[4],
    height: spacing[48] - spacing[4],
    borderWidth: 1,
    borderColor: colours.rule,
    backgroundColor: colours.paper,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cellSelected: {
    backgroundColor: colours.ink,
    borderColor: colours.ink,
  },
  cellText: {
    fontFamily: typography.mono,
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.medium,
    color: colours.inkMid,
  },
  cellTextSelected: {
    color: colours.paper,
  },
  labels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: spacing[8],
  },
  endLabel: {
    fontFamily: typography.mono,
    fontSize: typography.sizes.xs,
    color: colours.inkFaint,
    letterSpacing: 0.5,
  },
});