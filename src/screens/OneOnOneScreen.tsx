import React, { useState, useCallback } from 'react';
import { StyleSheet, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { WeekStackParamList } from '../navigation/WeekNavigator';
import { colours } from '../theme/colours';
import { spacing } from '../theme/spacing';

import DocWrapper from '../components/layout/DocWrapper';
import DocHeader from '../components/layout/DocHeader';
import DayBar from '../components/layout/DayBar';
import ScreenScrollView from '../components/layout/ScreenScrollView';
import PersonCard from '../components/content/PersonCard';
import SpeakerLine from '../components/content/SpeakerLine';
import HandwrittenNote from '../components/content/HandwrittenNote';
import ChoiceButton from '../components/interaction/ChoiceButton';
import StampOverlay from '../components/interaction/StampOverlay';
import ContinueButton from '../components/navigation/ContinueButton';

import { useBranchContent } from '../hooks/useBranchContent';
import { useDecision } from '../hooks/useDecision';
import type { DecisionKey } from '../store/types';

type Props = NativeStackScreenProps<WeekStackParamList, 'OneOnOne'>;

export default function OneOnOneScreen({ route, navigation }: Props) {
  const { sceneId, week } = route.params;
  const content = useBranchContent(sceneId);

  const decisionKey = content?.decision?.key as DecisionKey | undefined;
  const [decisionValue, makeDecision] = useDecision(decisionKey ?? ('' as DecisionKey));

  const [stampVisible, setStampVisible] = useState(false);
  const [stampText, setStampText] = useState('');
  const [stampType, setStampType] = useState<'approved' | 'denied' | 'neutral'>('neutral');

  const handleChoice = useCallback(
    (value: string, label: string) => {
      if (!decisionKey || decisionValue != null) return;
      makeDecision(value);
      setStampText(label);
      setStampType('neutral');
      setStampVisible(true);
    },
    [decisionKey, decisionValue, makeDecision],
  );

  const handleContinue = useCallback(() => {
    // After 1:1 (Thursday), flow goes to Friday all-hands meeting
    navigation.navigate('Meeting', {
      sceneId: content?.nextSceneId ?? `w${week}_friday_allhands`,
      week,
    });
  }, [navigation, week, content]);

  const decided = decisionValue != null;

  return (
    <View style={styles.shell}>
      <DocWrapper>
        <DocHeader
          company="PEMBROOK SOLUTIONS"
          docType={content?.docType ?? '1:1 NOTES'}
        />
        {content?.day != null && (
          <DayBar
            day={content.day}
            totalDays={content.totalDays ?? 5}
            currentDay={content.currentDay ?? 4}
          />
        )}
        <ScreenScrollView>
          {content?.person != null && <PersonCard person={content.person} />}

          {(content?.lines ?? []).map(
            (line: { speaker: string; text: string; isPlayer?: boolean }, idx: number) => (
              <SpeakerLine
                key={idx}
                speaker={line.speaker}
                text={line.text}
                isPlayer={line.isPlayer}
              />
            ),
          )}

          {content?.note != null && <HandwrittenNote text={content.note} />}

          {/* Choice buttons for 1:1 response */}
          {content?.decision != null && !decided && (
            <View style={styles.choices}>
              {(content.decision.options ?? []).map((opt: any) => (
                <ChoiceButton
                  key={opt.value}
                  label={opt.label}
                  onPress={() => handleChoice(opt.value, opt.stampText ?? opt.label)}
                />
              ))}
            </View>
          )}

          {/* Post-choice dialogue — shown after player responds */}
          {decided &&
            (content?.responseLines ?? []).map(
              (line: { speaker: string; text: string }, idx: number) => (
                <SpeakerLine key={`resp-${idx}`} speaker={line.speaker} text={line.text} />
              ),
            )}
        </ScreenScrollView>
      </DocWrapper>

      <StampOverlay text={stampText} type={stampType} visible={stampVisible} />
      <ContinueButton onPress={handleContinue} visible={decided} />
    </View>
  );
}

const styles = StyleSheet.create({
  shell: {
    flex: 1,
    backgroundColor: colours.appBg,
  },
  choices: {
    marginTop: spacing[16],
    gap: spacing[8],
  },
});
