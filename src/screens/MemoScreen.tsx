import React, { useCallback } from 'react';
import { StyleSheet, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { WeekStackParamList } from '../navigation/WeekNavigator';
import { colours } from '../theme/colours';

import DocWrapper from '../components/layout/DocWrapper';
import DocHeader from '../components/layout/DocHeader';
import DayBar from '../components/layout/DayBar';
import ScreenScrollView from '../components/layout/ScreenScrollView';
import EmailMeta from '../components/content/EmailMeta';
import EmailBody from '../components/content/EmailBody';
import PolicyBox from '../components/content/PolicyBox';
import HandwrittenNote from '../components/content/HandwrittenNote';
import ContinueButton from '../components/navigation/ContinueButton';
import { useBranchContent } from '../hooks/useBranchContent';

type Props = NativeStackScreenProps<WeekStackParamList, 'Memo'>;

export default function MemoScreen({ route, navigation }: Props) {
  const { sceneId, week } = route.params;
  const content = useBranchContent(sceneId);

  const handleContinue = useCallback(() => {
    // Navigate to the next screen in the week flow. MemoScreen is always the
    // first screen in a week, so the next screen depends on week type:
    //  - Week 4 (Away Day): Scene → Scene → ... → WeekSummary
    //  - Week 8 (War Room): WarRoom → Ending
    //  - Standard weeks 1–3, 5–7: Meeting → Inbox → ...
    if (week === 4) {
      navigation.navigate('Scene', { sceneId: content?.nextSceneId ?? `w${week}_scene_arrival`, week });
    } else if (week === 8) {
      navigation.navigate('WarRoom', { week });
    } else {
      navigation.navigate('Meeting', { sceneId: content?.nextSceneId ?? `w${week}_monday_meeting`, week });
    }
  }, [navigation, week, content]);

  return (
    <View style={styles.shell}>
      <DocWrapper>
        <DocHeader
          company="PEMBROOK SOLUTIONS"
          docType={content?.docType ?? 'INTERNAL MEMO'}
        />
        {content?.day != null && (
          <DayBar day={content.day} totalDays={content.totalDays ?? 5} currentDay={content.currentDay ?? 1} />
        )}
        <ScreenScrollView>
          {content?.emailMeta != null && <EmailMeta {...content.emailMeta} />}
          {content?.body != null && <EmailBody text={content.body} />}
          {content?.policyRef != null && (
            <PolicyBox text={content.policyText ?? ''} reference={content.policyRef} />
          )}
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
