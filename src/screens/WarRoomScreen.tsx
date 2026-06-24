import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { WeekStackParamList } from '../navigation/WeekNavigator';
import { colours } from '../theme/colours';
import { typography } from '../theme/typography';
import { spacing } from '../theme/spacing';

import DecisionButton from '../components/interaction/DecisionButton';
import ContinueButton from '../components/navigation/ContinueButton';

import { useGameStore } from '../store/gameStore';
import { getTeamPresence } from '../store/selectors';
import type { DecisionKey } from '../store/types';

// ---------------------------------------------------------------------------
// WarRoomScreen — Week 8 only.
//
// Interaction model per spec §10:
//  - No document wrapper
//  - Decisions tap-only (no SwipeDecision)
//  - Options greyed out (not hidden) for absent/disengaged members
//  - Team presence read from getTeamPresence(decisions)
//  - Decisions arrive in sequence
// ---------------------------------------------------------------------------

type Props = NativeStackScreenProps<WeekStackParamList, 'WarRoom'>;

type TeamMember = {
  key: string;
  name: string;
};

const TEAM_MEMBERS: TeamMember[] = [
  { key: 'priya', name: 'Priya Sharma' },
  { key: 'dayo', name: 'Dayo Okafor' },
  { key: 'rhonda', name: 'Rhonda Takács' },
  { key: 'ben', name: 'Ben Osei' },
  { key: 'yemi', name: 'Yemi Adeyemi' },
];

type WarRoomDecision = {
  key: DecisionKey;
  prompt: string;
  options: {
    label: string;
    value: string;
    requiresMember?: string; // member key that must be 'present' to be active
  }[];
};

const WAR_ROOM_DECISIONS: WarRoomDecision[] = [
  {
    key: 'war_room_lead',
    prompt: 'Who takes the lead on the proposal?',
    options: [
      { label: 'You lead it', value: 'self' },
      { label: 'Delegate to Priya', value: 'delegate_priya', requiresMember: 'priya' },
      { label: 'Delegate to Dayo', value: 'delegate_dayo', requiresMember: 'dayo' },
    ],
  },
  {
    key: 'war_room_numbers',
    prompt: 'Who handles the financial section?',
    options: [
      { label: 'Ben runs the numbers', value: 'ben', requiresMember: 'ben' },
      { label: 'You do it yourself', value: 'self' },
      { label: 'Bring in external support', value: 'external' },
    ],
  },
  {
    key: 'war_room_client_call',
    prompt: 'Who makes the direct call to Sandra at Hartfield?',
    options: [
      { label: 'Priya calls Sandra', value: 'priya', requiresMember: 'priya' },
      { label: 'Yemi reaches out', value: 'yemi', requiresMember: 'yemi' },
      { label: 'Skip the direct call', value: 'skip' },
    ],
  },
  {
    key: 'war_room_insight',
    prompt: "Dayo's old process idea — relevant here. What do you do?",
    options: [
      { label: "Surface Dayo's idea", value: 'surface_dayo', requiresMember: 'dayo' },
      { label: 'Leave it — not the moment', value: 'ignore' },
      { label: 'Adapt it without crediting him', value: 'take_credit' },
    ],
  },
];

export default function WarRoomScreen({ navigation }: Props) {
  const decisions = useGameStore((s) => s.decisions);
  const makeDecision = useGameStore((s) => s.makeDecision);
  const presence = getTeamPresence(decisions);

  const [currentDecisionIdx, setCurrentDecisionIdx] = useState(0);
  const [allComplete, setAllComplete] = useState(false);

  const currentDecision = WAR_ROOM_DECISIONS[currentDecisionIdx];

  const handleTap = useCallback(
    (key: DecisionKey, value: string) => {
      makeDecision(key, value);
      const nextIdx = currentDecisionIdx + 1;
      if (nextIdx >= WAR_ROOM_DECISIONS.length) {
        setAllComplete(true);
      } else {
        setCurrentDecisionIdx(nextIdx);
      }
    },
    [currentDecisionIdx, makeDecision],
  );

  const handleContinue = useCallback(() => {
    navigation.navigate('Ending');
  }, [navigation]);

  return (
    <View style={styles.shell}>
      <SafeAreaView style={styles.safe}>
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.weekLabel}>WEEK 8 — THE WAR ROOM</Text>
            <Text style={styles.subLabel}>Thursday deadline. Proposal to Hartfield Group.</Text>
          </View>

          {/* Team presence board */}
          <View style={styles.teamBoard}>
            <Text style={styles.sectionLabel}>YOUR TEAM</Text>
            <View style={styles.teamGrid}>
              {TEAM_MEMBERS.map((member) => {
                const status = presence[member.key] ?? 'present';
                return (
                  <View key={member.key} style={styles.memberRow}>
                    <View
                      style={[
                        styles.statusDot,
                        status === 'present' && styles.dotPresent,
                        status === 'disengaged' && styles.dotDisengaged,
                        status === 'absent' && styles.dotAbsent,
                      ]}
                    />
                    <Text
                      style={[
                        styles.memberName,
                        status !== 'present' && styles.memberNameDim,
                      ]}
                    >
                      {member.name}
                    </Text>
                    <Text style={styles.memberStatus}>{status}</Text>
                  </View>
                );
              })}
            </View>
          </View>

          {/* Decision sequence */}
          {!allComplete && currentDecision != null && (
            <View style={styles.decisionBlock}>
              <Text style={styles.decisionPrompt}>{currentDecision.prompt}</Text>
              <View style={styles.optionsList}>
                {currentDecision.options.map((opt) => {
                  const memberKey = opt.requiresMember;
                  const memberStatus = memberKey ? (presence[memberKey] ?? 'present') : 'present';
                  const isDisabled = memberStatus !== 'present';

                  return (
                    <DecisionButton
                      key={opt.value}
                      label={opt.label}
                      variant="neutral"
                      disabled={isDisabled}
                      onPress={() => handleTap(currentDecision.key, opt.value)}
                    />
                  );
                })}
              </View>

              {/* Progress indicator */}
              <Text style={styles.progress}>
                {currentDecisionIdx + 1} / {WAR_ROOM_DECISIONS.length}
              </Text>
            </View>
          )}

          {/* All decisions made */}
          {allComplete && (
            <View style={styles.outcomeBlock}>
              <Text style={styles.outcomeText}>
                Thursday evening. The proposal went in at 17:43.{'\n\n'}
                You are at your desk. Your phone is face-down. The fluorescent
                light in the corner of the office has been flickering since Week
                3 and nobody has fixed it.{'\n\n'}
                A message arrives.
              </Text>
            </View>
          )}
        </ScrollView>

        <ContinueButton onPress={handleContinue} visible={allComplete} />
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
  scroll: {
    flex: 1,
  },
  scrollContent: {
    padding: spacing[24],
    paddingBottom: spacing[48],
  },
  header: {
    marginBottom: spacing[32],
    paddingBottom: spacing[16],
    borderBottomWidth: 1,
    borderBottomColor: colours.rule,
  },
  weekLabel: {
    fontFamily: typography.mono,
    fontSize: typography.sizes.sm,
    color: colours.paper,
    letterSpacing: 2,
    marginBottom: spacing[8],
  },
  subLabel: {
    fontFamily: typography.sans,
    fontSize: typography.sizes.base,
    color: colours.inkFaint,
    fontStyle: 'italic',
  },
  teamBoard: {
    marginBottom: spacing[32],
  },
  sectionLabel: {
    fontFamily: typography.mono,
    fontSize: typography.sizes.xs,
    color: colours.inkFaint,
    letterSpacing: 2,
    marginBottom: spacing[12],
  },
  teamGrid: {
    gap: spacing[8],
  },
  memberRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing[12],
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  dotPresent: {
    backgroundColor: colours.stampApprove,
  },
  dotDisengaged: {
    backgroundColor: colours.highlight,
  },
  dotAbsent: {
    backgroundColor: colours.inkFaint,
  },
  memberName: {
    fontFamily: typography.sans,
    fontSize: typography.sizes.base,
    color: colours.paper,
    flex: 1,
  },
  memberNameDim: {
    opacity: 0.4,
  },
  memberStatus: {
    fontFamily: typography.mono,
    fontSize: typography.sizes.xs,
    color: colours.inkFaint,
    letterSpacing: 1,
  },
  decisionBlock: {
    marginTop: spacing[16],
  },
  decisionPrompt: {
    fontFamily: typography.sans,
    fontSize: typography.sizes.lg,
    color: colours.paper,
    lineHeight: 24,
    marginBottom: spacing[20],
  },
  optionsList: {
    gap: spacing[8],
  },
  progress: {
    fontFamily: typography.mono,
    fontSize: typography.sizes.xs,
    color: colours.inkFaint,
    textAlign: 'right',
    marginTop: spacing[16],
    letterSpacing: 1,
  },
  outcomeBlock: {
    marginTop: spacing[16],
  },
  outcomeText: {
    fontFamily: typography.sans,
    fontSize: typography.sizes.lg,
    color: colours.paper,
    lineHeight: 26,
  },
});
