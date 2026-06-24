// src/content/week1/summary.ts

import type { WeekSummary, DecisionOutcome } from '../_types';
import type { GameStore } from '../../store/types';

// Base scores for Week 1 (starting values before deltas)
export const W1_BASE_SCORES = {
  morale: 50,
  leadership: 50,
  ops: 60,
  policy: 50,
};

// Score deltas extracted verbatim from buildSummary() in middle.html
// Each object maps decision value → score changes
export const w1ScoreDeltas = {
  priya_leave: {
    approved: { morale: 15, leadership: 0, ops: -8, policy: -10 },
    denied: { morale: -18, leadership: 5, ops: 0, policy: 8 },
  },
  craig_leave: {
    approved: { morale: 3, leadership: -3, ops: -10, policy: 0 },
    denied: { morale: -5, leadership: 3, ops: 5, policy: 5 },
  },
  // Additional ops penalty when both Priya AND Craig are approved
  both_approved_bonus: { morale: 0, leadership: 0, ops: -8, policy: 0 },
  dayo_flex: {
    escalated: { morale: -8, leadership: 5, ops: 0, policy: 0 },
    denied: { morale: -12, leadership: 2, ops: 0, policy: 0 },
  },
  rhonda_performance: {
    informal: { morale: 8, leadership: -8, ops: 0, policy: 0 },
    formal: { morale: -10, leadership: 10, ops: 0, policy: 12 },
  },
};

// Outcome labels for summary display
export const w1OutcomeLabels: Record<string, Record<string, string>> = {
  priya_leave: {
    approved: 'APPROVED',
    denied: 'DENIED',
  },
  craig_leave: {
    approved: 'APPROVED',
    denied: 'DENIED',
  },
  dayo_flex: {
    escalated: 'ESCALATED',
    denied: 'DENIED',
  },
  rhonda_performance: {
    informal: 'INFORMAL CHAT',
    formal: 'STAGE 1 FLAGGED',
  },
};

// Contextual narrative notes, extracted verbatim from buildNote() in middle.html
export const w1NarrativeNotes = {
  priya_denied_craig_approved:
    'Craig sent a photo from Las Vegas to the team WhatsApp. It is a picture of a cocktail the size of a bucket. He has captioned it "team bonding lads." Priya worked all week. She did not mention her father. She did not mention anything.',

  priya_approved_craig_approved:
    'Both Priya and Craig were off the same week. The team managed. Just. Dayo described it as "character building." He meant it sincerely, which somehow made it worse.',

  priya_approved_craig_denied:
    'Craig told two people you "play favourites." He is not entirely wrong — you applied different policies to different people based on their circumstances. This is sometimes called management. Craig calls it favouritism. The distinction may depend on whether you are Craig.',

  priya_denied_craig_denied:
    'You denied both requests. Operational coverage was excellent. Nobody said thank you. Priya handed in her notice the following Tuesday. She was very professional about it, which was somehow the worst part.',

  dayo_escalated:
    'Marcus denied Dayo\'s flexible working request. His response email was four sentences long and contained the phrase "intentional presence" twice. Dayo has updated his LinkedIn. You noticed this but have not mentioned it. He has not mentioned it either. You are both pretending.',

  dayo_denied:
    'You denied Dayo\'s flexible working request. He said "no worries at all!" in the way that means several worries. He hasn\'t brought cake in since. The team has not remarked on this. The absence of cake is louder than cake.',

  rhonda_informal:
    'You had a chat with Rhonda. She told you about her mother. She cried a little, then apologised for crying, then apologised for apologising. You told her it was fine. It was fine. HR sent you an automated warning at 8am the next morning for failing to complete the Stage 1 process. There will be a meeting about this. The meeting will be called a "check-in."',

  rhonda_formal:
    'Rhonda\'s Stage 1 performance flag is now on her file. You found out about her mother later, from Dayo, who found out from the kitchen. The flag cannot be removed without a formal review process that takes eight weeks. Rhonda knows this. She hasn\'t said anything.',
};

// Verdict text based on score balance, extracted verbatim from buildNote() in middle.html
export function getW1Verdict(morale: number, leadership: number, ops: number, policy: number): string {
  const avg = (morale + leadership + ops + policy) / 4;
  if (morale > leadership + 15) {
    return 'Your team trusts you. Leadership is watching you with mild suspicion and has described you internally as "a bit soft." This is not in writing. Yet.';
  } else if (leadership > morale + 15) {
    return 'Leadership is very pleased with you. Three of your team members are quietly interviewing elsewhere. You are, by every metric Marcus tracks, doing brilliantly.';
  } else if (avg > 65) {
    return 'A reasonable week, by the standards of this particular building. Nobody has quit. Nobody has cried in the toilets, as far as you know. This counts.';
  } else {
    return 'It was a hard week. You made the decisions you could make, with the information you had, inside a system you did not design. The Policy Handbook does not have a section on that. D. Hartley probably wanted to write one.';
  }
}

export const W1_SUMMARY_FOOTER =
  'Next week: Marcus has scheduled a 30-minute "alignment session" with you. The invite has no agenda. There is a note at the bottom that says "informal, no prep needed!" You will spend the weekend preparing.';

export const w1SummaryDecisionRows: DecisionOutcome[] = [
  {
    key: 'priya_leave',
    label: 'Priya Sharma — Leave Request (21–25 Oct)',
  },
  {
    key: 'craig_leave',
    label: 'Craig Holloway — Leave Request (21–25 Oct)',
  },
  {
    key: 'dayo_flex',
    label: 'Dayo Okafor — Flex Working Request',
  },
  {
    key: 'rhonda_performance',
    label: 'Rhonda Takács — Performance Flag',
  },
];