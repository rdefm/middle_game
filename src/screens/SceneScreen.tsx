import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { WeekStackParamList } from '../navigation/WeekNavigator';

// SceneScreen has NO document wrapper — spec §10 Away Day format:
// "short prose paragraphs, 2–3 choice buttons, no documents. It should feel
// like navigating a room rather than processing paperwork."

import { colours } from '../theme/colours';
import { typography } from '../theme/typography';
import { spacing } from '../theme/spacing';
import ChoiceButton from '../components/interaction/ChoiceButton';
import ContinueButton from '../components/navigation/ContinueButton';
import { useBranchContent } from '../hooks/useBranchContent';
import { useDecision } from '../hooks/useDecision';
import type { DecisionKey } from '../store/types';

type Props = NativeStackScreenProps<WeekStackParamList, 'Scene'>;

// Away Day scene sequence (Week 4):
// scene_arrival → scene_diagnostic → scene_activity → scene_lunch → scene_breakout → WeekSummary
const SCENE_SEQUENCE: Record<string, string> = {
  w4_scene_arrival: 'w4_scene_diagnostic',
  w4_scene_diagnostic: 'w4_scene_activity',
  w4_scene_activity: 'w4_scene_lunch',
  w4_scene_lunch: 'w4_scene_breakout',
  w4_scene_breakout: '__summary__',
};

export default function SceneScreen({ route, navigation }: Props) {
  const { sceneId, week } = route.params;
  const content = useBranchContent(sceneId);

  const decisionKey = content?.decision?.key as DecisionKey | undefined;
  const [decisionValue, makeDecision] = useDecision(decisionKey ?? ('' as DecisionKey));

  const [responded, setResponded] = useState(false);
  const [responseText, setResponseText] = useState('');

  const handleChoice = useCallback(
    (value: string, label: string) => {
      if (decisionKey && decisionValue == null) {
        makeDecision(value);
      }
      setResponseText(label);
      setResponded(true);
    },
    [decisionKey, decisionValue, makeDecision],
  );

  const handleContinue = useCallback(() => {
    const nextSceneId = content?.nextSceneId ?? SCENE_SEQUENCE[sceneId];
    if (nextSceneId === '__summary__' || nextSceneId == null) {
      navigation.navigate('WeekSummary', { week });
    } else {
      navigation.navigate('Scene', { sceneId: nextSceneId, week });
    }
  }, [navigation, sceneId, week, content]);

  const hasDecision = content?.decision != null;
  const decided = !hasDecision || decisionValue != null || responded;

  return (
    <View style={styles.shell}>
      <SafeAreaView style={styles.safe}>
        {/* Day indicator — minimal, no DayBar component */}
        {content?.day != null && (
          <View style={styles.dayRow}>
            <Text style={styles.dayLabel}>{content.day}</Text>
          </View>
        )}

        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Location / context header */}
          {content?.location != null && (
            <Text style={styles.location}>{content.location}</Text>
          )}

          {/* Scene prose — the environmental description */}
          {(content?.paragraphs ?? []).map((para: string, idx: number) => (
            <Text key={idx} style={styles.prose}>
              {para}
            </Text>
          ))}

          {/* Internal monologue */}
          {content?.note != null && (
            <Text style={styles.monologue}>{content.note}</Text>
          )}

          {/* Choice buttons — only shown before a decision is made */}
          {hasDecision && !decided && (
            <View style={styles.choices}>
              {(content.decision.options ?? []).map((opt: any) => (
                <ChoiceButton
                  key={opt.value}
                  label={opt.label}
                  onPress={() => handleChoice(opt.value, opt.label)}
                />
              ))}
            </View>
          )}

          {/* Post-choice prose — what happens as a result */}
          {responded && content?.responseText != null && (
            <Text style={[styles.prose, styles.responseText]}>
              {content.responseText}
            </Text>
          )}
        </ScrollView>

        <ContinueButton onPress={handleContinue} visible={decided} />
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  shell: {
    flex: 1,
    backgroundColor: colours.appBg,
  },
  safe: {
    flex: 1,
  },
  dayRow: {
    paddingHorizontal: spacing[24],
    paddingTop: spacing[16],
    paddingBottom: spacing[8],
  },
  dayLabel: {
    fontFamily: typography.mono,
    fontSize: typography.sizes.xs,
    color: colours.inkFaint,
    letterSpacing: 2,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: spacing[24],
    paddingBottom: spacing[48],
  },
  location: {
    fontFamily: typography.mono,
    fontSize: typography.sizes.sm,
    color: colours.inkFaint,
    letterSpacing: 1,
    marginBottom: spacing[24],
    textTransform: 'uppercase',
  },
  prose: {
    fontFamily: typography.sans,
    fontSize: typography.sizes.lg,
    color: colours.paper,
    lineHeight: 26,
    marginBottom: spacing[20],
  },
  monologue: {
    fontFamily: typography.sans,
    fontSize: typography.sizes.md,
    color: colours.inkFaint,
    fontStyle: 'italic',
    lineHeight: 22,
    marginBottom: spacing[20],
  },
  choices: {
    marginTop: spacing[12],
    gap: spacing[8],
  },
  responseText: {
    marginTop: spacing[16],
    color: colours.paper,
    opacity: 0.85,
  },
});
