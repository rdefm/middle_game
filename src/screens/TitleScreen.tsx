import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/RootNavigator';
import { colours } from '../theme/colours';
import { typography } from '../theme/typography';
import { spacing } from '../theme/spacing';
import { useGameStore } from '../store/gameStore';

type Props = NativeStackScreenProps<RootStackParamList, 'Title'>;

export default function TitleScreen({ navigation }: Props) {
  const resetGame = useGameStore((s) => s.resetGame);
  const currentWeek = useGameStore((s) => s.currentWeek);
  const hasProgress = currentWeek > 1;

  function handleStart() {
    navigation.navigate('WeekNavigator', { week: 1 });
  }

  function handleContinue() {
    navigation.navigate('WeekNavigator', { week: currentWeek });
  }

  function handleReset() {
    resetGame();
  }

  return (
    <View style={styles.shell}>
      <SafeAreaView style={styles.safe}>
        <View style={styles.doc}>
          {/* Header */}
          <Text style={styles.company}>PEMBROOK SOLUTIONS</Text>
          <View style={styles.rule} />

          {/* Title block */}
          <View style={styles.titleBlock}>
            <Text style={styles.title}>MIDDLE</Text>
            <Text style={styles.tagline}>
              A management simulation in eight weeks
            </Text>
          </View>

          <View style={styles.rule} />

          {/* Document meta */}
          <Text style={styles.meta}>FROM: Human Resources</Text>
          <Text style={styles.meta}>TO: Jordan Ellis, Team Lead (Ops)</Text>
          <Text style={styles.meta}>RE: Your first week</Text>

          <View style={styles.rule} />

          <Text style={styles.body}>
            Congratulations on your promotion. Your line manager is Marcus Webb,
            VP of People Experience. This document is your starting point.{'\n\n'}
            The Policy Handbook is available on the intranet. Page 47 has a
            Post-it attached. You'll get to it.
          </Text>

          <View style={styles.rule} />

          {/* CTA buttons */}
          <TouchableOpacity style={styles.button} onPress={handleStart}>
            <Text style={styles.buttonLabel}>
              {hasProgress ? 'NEW GAME' : 'START →'}
            </Text>
          </TouchableOpacity>

          {hasProgress && (
            <TouchableOpacity
              style={[styles.button, styles.buttonSecondary]}
              onPress={handleContinue}
            >
              <Text style={[styles.buttonLabel, styles.buttonLabelSecondary]}>
                CONTINUE — WEEK {currentWeek}
              </Text>
            </TouchableOpacity>
          )}

          {hasProgress && (
            <TouchableOpacity style={styles.resetButton} onPress={handleReset}>
              <Text style={styles.resetLabel}>reset progress</Text>
            </TouchableOpacity>
          )}

          {/* Footer note */}
          <Text style={styles.footnote}>
            D. Hartley's Policy Handbook is required reading. It will not be
            tested. It will matter.
          </Text>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  shell: {
    flex: 1,
    backgroundColor: colours.appBg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  safe: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing[16],
  },
  doc: {
    backgroundColor: colours.paper,
    borderTopWidth: 4,
    borderTopColor: colours.ink,
    padding: spacing[32],
    width: '100%',
    maxWidth: 480,
  },
  company: {
    fontFamily: typography.mono,
    fontSize: typography.sizes.xs,
    color: colours.inkFaint,
    letterSpacing: 2,
    marginBottom: spacing[12],
  },
  rule: {
    height: 1,
    backgroundColor: colours.rule,
    marginVertical: spacing[16],
  },
  titleBlock: {
    paddingVertical: spacing[8],
  },
  title: {
    fontFamily: typography.mono,
    fontSize: typography.sizes.xxl,
    color: colours.ink,
    letterSpacing: 4,
    marginBottom: spacing[8],
  },
  tagline: {
    fontFamily: typography.sans,
    fontSize: typography.sizes.base,
    color: colours.inkFaint,
    fontStyle: 'italic',
  },
  meta: {
    fontFamily: typography.mono,
    fontSize: typography.sizes.sm,
    color: colours.inkMid,
    marginBottom: spacing[4],
  },
  body: {
    fontFamily: typography.sans,
    fontSize: typography.sizes.base,
    color: colours.inkMid,
    lineHeight: 22,
  },
  button: {
    backgroundColor: colours.ink,
    paddingVertical: spacing[12],
    alignItems: 'center',
    marginBottom: spacing[8],
  },
  buttonLabel: {
    fontFamily: typography.mono,
    fontSize: typography.sizes.md,
    color: colours.paper,
    letterSpacing: 2,
  },
  buttonSecondary: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: colours.ink,
  },
  buttonLabelSecondary: {
    color: colours.ink,
  },
  resetButton: {
    alignItems: 'center',
    paddingVertical: spacing[8],
    marginBottom: spacing[4],
  },
  resetLabel: {
    fontFamily: typography.mono,
    fontSize: typography.sizes.xs,
    color: colours.inkFaint,
    textDecorationLine: 'underline',
  },
  footnote: {
    fontFamily: typography.sans,
    fontSize: typography.sizes.xs,
    color: colours.inkFaint,
    fontStyle: 'italic',
    marginTop: spacing[16],
    lineHeight: 16,
  },
});
