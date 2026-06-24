import React, { useState, useCallback, useMemo } from 'react';
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
import WarnBox from '../components/content/WarnBox';
import HandwrittenNote from '../components/content/HandwrittenNote';
import PersonCard from '../components/content/PersonCard';
import DecisionButton from '../components/interaction/DecisionButton';
import SwipeDecision from '../components/interaction/SwipeDecision';
import StampOverlay from '../components/interaction/StampOverlay';
import EnergyPicker from '../components/interaction/EnergyPicker';
import InboxTabs from '../components/navigation/InboxTabs';
import ContinueButton from '../components/navigation/ContinueButton';

import { useBranchContent } from '../hooks/useBranchContent';
import { useDecision } from '../hooks/useDecision';
import { useWeekComplete } from '../hooks/useWeekComplete';
import type { DecisionKey } from '../store/types';

// ---------------------------------------------------------------------------
// TabConfig — mirrors spec §9.4
// ---------------------------------------------------------------------------
type TabConfig = {
  key: string;
  label: string;
  visible: boolean;
};

type Props = NativeStackScreenProps<WeekStackParamList, 'Inbox'>;

// ---------------------------------------------------------------------------
// InboxTabContent — renders a single inbox tab's content
// ---------------------------------------------------------------------------
type InboxTabContentProps = {
  tabSceneId: string;
  week: number;
};

function InboxTabContent({ tabSceneId }: InboxTabContentProps) {
  const content = useBranchContent(tabSceneId);
  const decisionKey = content?.decision?.key as DecisionKey | undefined;
  const [decisionValue, makeDecision] = useDecision(decisionKey ?? ('' as DecisionKey));

  const [stampVisible, setStampVisible] = useState(false);
  const [stampText, setStampText] = useState('');
  const [stampType, setStampType] = useState<'approved' | 'denied' | 'neutral'>('neutral');

  const handleDecision = useCallback(
    (value: string, text: string, type: 'approved' | 'denied' | 'neutral') => {
      if (!decisionKey || decisionValue != null) return;
      makeDecision(value);
      setStampText(text);
      setStampType(type);
      setStampVisible(true);
    },
    [decisionKey, decisionValue, makeDecision],
  );

  if (!content) return null;

  const decided = decisionValue != null;
  const isBinary =
    content.decision?.options?.length === 2 &&
    content.decision.options.some((o: any) => o.stampType === 'approved') &&
    content.decision.options.some((o: any) => o.stampType === 'denied');

  const isEnergyPicker = content.decision?.type === 'energy_picker';

  // Resolve which approve/deny option is which for SwipeDecision
  const approveOption = content.decision?.options?.find((o: any) => o.stampType === 'approved');
  const denyOption = content.decision?.options?.find((o: any) => o.stampType === 'denied');

  return (
    <View style={{ flex: 1 }}>
      <ScreenScrollView>
        {content.person != null && <PersonCard person={content.person} />}
        {content.emailMeta != null && <EmailMeta {...content.emailMeta} />}
        {content.body != null && <EmailBody text={content.body} />}
        {content.policyRef != null && (
          <PolicyBox text={content.policyText ?? ''} reference={content.policyRef} />
        )}
        {content.warnText != null && <WarnBox text={content.warnText} />}
        {content.note != null && <HandwrittenNote text={content.note} />}

        {/* Decision UI */}
        {content.decision != null && !decided && (
          <View style={inboxStyles.decisionArea}>
            {isEnergyPicker ? (
              <EnergyPicker
                onSelect={(val) =>
                  handleDecision(String(val), `SCORE: ${val}`, 'neutral')
                }
              />
            ) : isBinary && approveOption && denyOption ? (
              <SwipeDecision
                onApprove={() =>
                  handleDecision(approveOption.value, approveOption.stampText, 'approved')
                }
                onDeny={() =>
                  handleDecision(denyOption.value, denyOption.stampText, 'denied')
                }
              >
                <View style={inboxStyles.swipeCard}>
                  {(content.decision.options ?? []).map((opt: any) => (
                    <DecisionButton
                      key={opt.value}
                      label={opt.label}
                      variant={opt.stampType}
                      onPress={() =>
                        handleDecision(opt.value, opt.stampText, opt.stampType)
                      }
                    />
                  ))}
                </View>
              </SwipeDecision>
            ) : (
              <View>
                {(content.decision.options ?? []).map((opt: any) => (
                  <DecisionButton
                    key={opt.value}
                    label={opt.label}
                    variant={opt.stampType}
                    onPress={() =>
                      handleDecision(opt.value, opt.stampText, opt.stampType)
                    }
                  />
                ))}
              </View>
            )}
          </View>
        )}
      </ScreenScrollView>

      <StampOverlay text={stampText} type={stampType} visible={stampVisible} />
    </View>
  );
}

const inboxStyles = StyleSheet.create({
  decisionArea: {
    marginTop: 16,
  },
  swipeCard: {
    gap: 8,
  },
});

// ---------------------------------------------------------------------------
// InboxScreen — computes tab visibility, renders InboxTabs + active content
// ---------------------------------------------------------------------------

export default function InboxScreen({ route, navigation }: Props) {
  const { sceneId, week } = route.params;
  const content = useBranchContent(sceneId);
  const weekComplete = useWeekComplete(week);

  // Compute tabs from content. InboxScreen is responsible for computing
  // visible per spec §9.4. useBranchContent resolves which tabs exist based
  // on prior decisions.
  const tabs = useMemo<TabConfig[]>(() => {
    if (!content?.tabs) return [];
    // content.tabs is an array of { key, label, sceneId, visible } objects
    // produced by branchResolver from the week's inbox content files.
    return (content.tabs as Array<{ key: string; label: string; visible: boolean }>).map(
      (t) => ({ key: t.key, label: t.label, visible: t.visible }),
    );
  }, [content]);

  const visibleTabs = tabs.filter((t) => t.visible);
  const [activeKey, setActiveKey] = useState<string>(() => visibleTabs[0]?.key ?? '');

  // Derive the sceneId for the active tab
  const activeTabSceneId = useMemo(() => {
    if (!content?.tabs) return sceneId;
    const tab = (content.tabs as Array<{ key: string; sceneId: string }>).find(
      (t) => t.key === activeKey,
    );
    return tab?.sceneId ?? sceneId;
  }, [content, activeKey, sceneId]);

  const handleContinue = useCallback(() => {
    // After inbox, week flow goes to 1:1 (Thursday)
    navigation.navigate('OneOnOne', {
      sceneId: content?.nextSceneId ?? `w${week}_thursday_1on1`,
      week,
    });
  }, [navigation, week, content]);

  return (
    <View style={styles.shell}>
      <DocWrapper>
        <DocHeader
          company="PEMBROOK SOLUTIONS"
          docType={content?.docType ?? 'INBOX'}
        />
        {content?.day != null && (
          <DayBar
            day={content.day}
            totalDays={content.totalDays ?? 5}
            currentDay={content.currentDay ?? 3}
          />
        )}

        {/* Tab bar — purely presentational, InboxScreen owns visible logic */}
        {visibleTabs.length > 1 && (
          <InboxTabs
            tabs={tabs}
            activeKey={activeKey}
            onSelect={setActiveKey}
          />
        )}

        {/* Active tab content */}
        <InboxTabContent tabSceneId={activeTabSceneId} week={week} />
      </DocWrapper>

      <ContinueButton onPress={handleContinue} visible={weekComplete} />
    </View>
  );
}

const styles = StyleSheet.create({
  shell: {
    flex: 1,
    backgroundColor: colours.appBg,
  },
});
