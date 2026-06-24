import React, { useCallback } from 'react';
import { StyleSheet, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { WeekStackParamList } from '../navigation/WeekNavigator';
import { colours } from '../theme/colours';
import { spacing } from '../theme/spacing';

import DocWrapper from '../components/layout/DocWrapper';
import DocHeader from '../components/layout/DocHeader';
import ScreenScrollView from '../components/layout/ScreenScrollView';
import MetricBar from '../components/summary/MetricBar';
import ResultRow from '../components/summary/ResultRow';
import SummaryNote from '../components/summary/SummaryNote';
import ContinueButton from '../components/navigation/ContinueButton';

import { useGameStore } from '../store/gameStore';
import { useScores } from '../hooks/useScores';
import { useBranchContent } from '../hooks/useBranchContent';

type Props = NativeStackScreenProps<WeekStackParamList, 'WeekSummary'>;

export default function WeekSummaryScreen({ route, navigation }: Props) {
  const { week } = route.params;
  const content = useBranchContent(`w${week}_summary`);
  const scores = useScores();
  const unlockWeek = useGameStore((s) => s.unlockWeek);

  const handleContinue = useCallback(() => {
    const nextWeek = week + 1;

    if (nextWeek > 8) {
      // After week 8 summary — shouldn't normally happen (Week 8 ends at Ending),
      // but handle gracefully.
      navigation.navigate('Ending');
      return;
    }

    unlockWeek(nextWeek);

    if (nextWeek === 8) {
      navigation.navigate('WarRoom', { week: nextWeek });
    } else {
      // Navigate back to root and start the next week
      navigation.getParent()?.navigate('WeekNavigator', { week: nextWeek });
    }
  }, [navigation, week, unlockWeek]);

  // Collect decisions made this week for ResultRow display
  const weekDecisions: Array<{
    label: string;
    value: string;
    outcome: string;
    stampType: 'approved' | 'denied' | 'neutral';
  }> = content?.decisions ?? [];

  return (
    <View style={styles.shell}>
      <DocWrapper>
        <DocHeader
          company="PEMBROOK SOLUTIONS"
          docType={`WEEK ${week} — SUMMARY`}
        />
        <ScreenScrollView>
          {/* Diagnostic scores */}
          <View style={styles.scoreSection}>
            <MetricBar label="Team Morale" value={scores.morale} />
            <MetricBar label="Leadership" value={scores.leadership} />
            <MetricBar label="Operations" value={scores.ops} />
            <MetricBar label="Policy Compliance" value={scores.policy} />
          </View>

          <View style={styles.divider} />

          {/* Decision outcomes this week */}
          {weekDecisions.map((d, idx) => (
            <ResultRow
              key={idx}
              label={d.label}
              outcome={d.outcome}
              stampType={d.stampType}
            />
          ))}

          <View style={styles.divider} />

          {/* Week verdict + narrative note */}
          {content?.verdict != null && (
            <SummaryNote verdict={content.verdict} note={content.note} />
          )}
        </ScreenScrollView>
      </DocWrapper>

      <ContinueButton onPress={handleContinue} visible />
    </View>
  );
}

const styles = StyleSheet.create({
  shell: {
    flex: 1,
    backgroundColor: colours.appBg,
  },
  scoreSection: {
    gap: spacing[12],
    marginBottom: spacing[16],
  },
  divider: {
    height: 1,
    backgroundColor: colours.rule,
    marginVertical: spacing[16],
  },
});
