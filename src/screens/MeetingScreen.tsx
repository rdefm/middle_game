import React, { useCallback } from 'react';
import { StyleSheet, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { WeekStackParamList } from '../navigation/WeekNavigator';
import { colours } from '../theme/colours';

import DocWrapper from '../components/layout/DocWrapper';
import DocHeader from '../components/layout/DocHeader';
import DayBar from '../components/layout/DayBar';
import ScreenScrollView from '../components/layout/ScreenScrollView';
import SpeakerLine from '../components/content/SpeakerLine';
import HandwrittenNote from '../components/content/HandwrittenNote';
import ContinueButton from '../components/navigation/ContinueButton';
import { useBranchContent } from '../hooks/useBranchContent';

type Props = NativeStackScreenProps<WeekStackParamList, 'Meeting'>;

export default function MeetingScreen({ route, navigation }: Props) {
  const { sceneId, week } = route.params;
  const content = useBranchContent(sceneId);

  // Meeting screens appear twice in the standard week flow:
  //   1. Monday meeting  → Inbox
  //   2. Friday all-hands → WeekSummary
  // The content's nextScreenType tells us where to go.
  const handleContinue = useCallback(() => {
    const nextType = content?.nextScreenType ?? 'inbox';
    if (nextType === 'summary') {
      navigation.navigate('WeekSummary', { week });
    } else if (nextType === '1on1') {
      navigation.navigate('OneOnOne', { sceneId: content?.nextSceneId ?? `w${week}_thursday_1on1`, week });
    } else {
      // Default: go to Inbox
      navigation.navigate('Inbox', { sceneId: content?.nextSceneId ?? `w${week}_inbox`, week });
    }
  }, [navigation, week, content]);

  return (
    <View style={styles.shell}>
      <DocWrapper>
        <DocHeader
          company="PEMBROOK SOLUTIONS"
          docType={content?.docType ?? 'MEETING TRANSCRIPT'}
        />
        {content?.day != null && (
          <DayBar day={content.day} totalDays={content.totalDays ?? 5} currentDay={content.currentDay ?? 1} />
        )}
        <ScreenScrollView>
          {(content?.lines ?? []).map((line: { speaker: string; text: string; isPlayer?: boolean }, idx: number) => (
            <SpeakerLine
              key={idx}
              speaker={line.speaker}
              text={line.text}
              isPlayer={line.isPlayer}
            />
          ))}
          {content?.note != null && <HandwrittenNote text={content.note} />}
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
});
