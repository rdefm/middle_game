import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { WeekStackParamList } from '../navigation/WeekNavigator';
import { colours } from '../theme/colours';
import { typography } from '../theme/typography';
import { spacing } from '../theme/spacing';

import { useEnding } from '../hooks/useEnding';
import { useGameStore } from '../store/gameStore';

// ---------------------------------------------------------------------------
// STUB IMPORT — src/content/week8/endings.ts does not yet exist.
// This file is created in Chunk 4 (Week 8 content). The import path below is
// the canonical location per spec §8 / §3. When Chunk 4 Week 8 content is
// added, this import resolves automatically.
// ---------------------------------------------------------------------------
// import { endings } from '../content/week8/endings';
import type { EndingType } from '../store/types';

// Temporary inline stub so EndingScreen compiles before week8/endings.ts exists.
// Replace with the real import above once Chunk 4 Week 8 content lands.
type Ending = {
  type: EndingType;
  title: string;
  body: string;
  dhNote?: string;
};

const ENDING_STUB: Record<EndingType, Ending> = {
  restructured_out: {
    type: 'restructured_out',
    title: 'Restructured Out',
    body:
      "Jordan's role is absorbed by the restructure. Diana delivers the news, not Marcus. She is professional and clear and there is nothing to argue with.\n\nOn the coach home from the (cancelled, it turns out) Week 8 pitch meeting, you update your own LinkedIn. The status is \u201cOpen to Work.\u201d You set it to visible only to recruiters, then change it to everyone, then change it back.",
  },
  you_hand_it_in: {
    type: 'you_hand_it_in',
    title: 'You Hand It In',
    body:
      "The pitch goes okay but not well. Sitting in the debrief, you realise you have spent eight weeks managing a system that was never going to reward the right decisions with the right outcomes.\n\nYou draft a resignation in the Notes app on the coach. The game ends mid-sentence \u2014 not because you haven't decided, but because the decision doesn't need a full sentence to be made.",
  },
  marcus_leaves_pushed: {
    type: 'marcus_leaves_pushed',
    title: 'Marcus Leaves (Accountability)',
    body:
      "Marcus's exit is confirmed during Week 8. The anonymous Away Day feedback, combined with the expense disclosure (which you made), triggered a review that Diana was already conducting.\n\nHis LinkedIn updates on a Thursday. Brett's engagement is terminated. The restructure continues but with different energy. Diana asks you to stay involved. This is not a promotion. It is the possibility of one, eventually, if things go the way they might.\n\nYour management training is approved. It starts in Q1.",
    dhNote: 'trust your gut.',
  },
  marcus_leaves_quietly: {
    type: 'marcus_leaves_quietly',
    title: 'Marcus Leaves (Quietly)',
    body:
      "Marcus's exit happens, but you weren't the one who surfaced what surfaced it. Diana worked it out herself, or Ben's investigation got there independently, or the Away Day card was enough on its own.\n\nMarcus gives a speech at his leaving drinks that is genuinely moving. Brett sends flowers. You are not sure how you feel about any of it. The restructure continues. Your role is secure. Things are better. You're not sure they're better because of anything you did.",
  },
  back_on_monday: {
    type: 'back_on_monday',
    title: 'Back on Monday',
    body:
      "The pitch goes adequately. The restructure settles. Marcus is still there, slightly diminished. Diana is there, slightly improving things.\n\nYemi asks you on the coach home what you've learned. You give an honest answer that isn't tidy. She nods. She says D. Hartley said something similar once. The coach pulls into the station. Monday is in two days.",
    dhNote: 'not this one. trust your gut.',
  },
  something_shifted: {
    type: 'something_shifted',
    title: 'Something Shifted',
    body:
      "The pitch lands. Not because of the deck or the process or the policy handbook. Because Rhonda spotted something. Because Dayo's process idea was in there. Because Ben's numbers were right. Because Priya's handover notes had Sandra's preference noted (\u201ccall on Tuesdays, she doesn't trust emails since the incident\u201d). Because you kept the team together when the easiest thing would have been to let the system process them.\n\nDiana tells you the contract is confirmed on the coach home. The confirmation email arrives while you're reading it. You show Yemi. She shows you D. Hartley's postcard \u2014 it arrived this week, she's been saving it.",
    dhNote: 'told you.',
  },
};

// ---------------------------------------------------------------------------

type Props = NativeStackScreenProps<WeekStackParamList, 'Ending'>;

export default function EndingScreen({ navigation }: Props) {
  const endingType = useEnding();
  const resetGame = useGameStore((s) => s.resetGame);

  // When week8/endings.ts exists, swap this for:
  //   const ending = endings.find(e => e.type === endingType) ?? ENDING_STUB[endingType];
  const ending = ENDING_STUB[endingType] ?? ENDING_STUB['back_on_monday'];

  function handlePlayAgain() {
    resetGame();
    navigation.getParent()?.navigate('Title');
  }

  return (
    <View style={styles.shell}>
      <SafeAreaView style={styles.safe}>
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Ending header */}
          <View style={styles.header}>
            <Text style={styles.weekLabel}>WEEK 8 \u2014 ENDING</Text>
            <Text style={styles.endingTitle}>{ending.title}</Text>
          </View>

          <View style={styles.rule} />

          {/* Ending prose */}
          <Text style={styles.body}>{ending.body}</Text>

          {/* D. Hartley note — rendered only if present */}
          {ending.dhNote != null && (
            <View style={styles.dhNoteContainer}>
              <View style={styles.dhNoteInner}>
                <Text style={styles.dhNoteLabel}>D. Hartley \u2014 Policy Handbook, p. 47</Text>
                <Text style={styles.dhNoteText}>"{ending.dhNote}"</Text>
              </View>
            </View>
          )}

          <View style={styles.rule} />

          {/* Ending type tag */}
          <Text style={styles.endingTag}>{endingType.replace(/_/g, ' ').toUpperCase()}</Text>

          {/* Play again */}
          <TouchableOpacity style={styles.playAgainButton} onPress={handlePlayAgain}>
            <Text style={styles.playAgainLabel}>PLAY AGAIN \u2192</Text>
          </TouchableOpacity>

          <Text style={styles.footnote}>
            MIDDLE is a game about the decisions that don't appear on any scorecard.
            {'\n'}There are six endings. This was one of them.
          </Text>
        </ScrollView>
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
    marginBottom: spacing[24],
  },
  weekLabel: {
    fontFamily: typography.mono,
    fontSize: typography.sizes.xs,
    color: colours.inkFaint,
    letterSpacing: 2,
    marginBottom: spacing[12],
  },
  endingTitle: {
    fontFamily: typography.mono,
    fontSize: typography.sizes.xl,
    color: colours.paper,
    letterSpacing: 1,
    lineHeight: 28,
  },
  rule: {
    height: 1,
    backgroundColor: colours.rule,
    marginVertical: spacing[24],
    opacity: 0.3,
  },
  body: {
    fontFamily: typography.sans,
    fontSize: typography.sizes.lg,
    color: colours.paper,
    lineHeight: 28,
    marginBottom: spacing[24],
  },
  dhNoteContainer: {
    marginBottom: spacing[24],
  },
  dhNoteInner: {
    borderLeftWidth: 2,
    borderLeftColor: colours.highlight,
    paddingLeft: spacing[16],
    paddingVertical: spacing[8],
  },
  dhNoteLabel: {
    fontFamily: typography.mono,
    fontSize: typography.sizes.xs,
    color: colours.inkFaint,
    letterSpacing: 1,
    marginBottom: spacing[8],
  },
  dhNoteText: {
    fontFamily: typography.sans,
    fontSize: typography.sizes.md,
    color: colours.highlight,
    fontStyle: 'italic',
    lineHeight: 22,
  },
  endingTag: {
    fontFamily: typography.mono,
    fontSize: typography.sizes.xs,
    color: colours.inkFaint,
    letterSpacing: 2,
    marginBottom: spacing[24],
  },
  playAgainButton: {
    backgroundColor: colours.paper,
    paddingVertical: spacing[12],
    alignItems: 'center',
    marginBottom: spacing[24],
  },
  playAgainLabel: {
    fontFamily: typography.mono,
    fontSize: typography.sizes.md,
    color: colours.ink,
    letterSpacing: 2,
  },
  footnote: {
    fontFamily: typography.sans,
    fontSize: typography.sizes.xs,
    color: colours.inkFaint,
    fontStyle: 'italic',
    textAlign: 'center',
    lineHeight: 18,
  },
});
