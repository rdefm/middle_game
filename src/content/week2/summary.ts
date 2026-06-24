import { DecisionKey } from '@/store/types';

export interface W2OutcomeText {
  ben: Record<string, string>;
  yemi: Record<string, string>;
  energy: (score: number) => string;
}

export interface W2Verdict {
  moraleLeadsLeadership: string;
  leadershipLeadsMorale: string;
  balanced: string;
  struggling: string;
}

export const w2OutcomeLabels: Record<string, Record<string, string>> = {
  ben_flag: {
    formal: 'FORMAL REVIEW',
    informal: 'INFORMAL',
    close: 'CLOSED',
  },
  yemi_onboarding: {
    honest: 'HONEST',
    deflect: 'DEFLECTED',
  },
};

export const w2OutcomeNotes: W2OutcomeText = {
  ben: {
    formal:
      "HR have opened a review into Craig's timesheets. Craig has not spoken to you directly since the 1:1. He has, however, forwarded his process improvement idea directly to Marcus, bypassing you entirely. Marcus called it \"exactly the kind of grassroots thinking we want to encourage.\"",
    informal:
      "You had a word with Craig. He said he'd fix the timesheets. He did, that afternoon, which is either reassuring or alarming depending on how quickly you think people can \"fix\" a system error. Ben thanked you for handling it. He looked relieved, then worried again, in quick succession.",
    close:
      "You closed Ben's flag as insufficient evidence. Ben has not raised anything since. He has started keeping a personal log of his own hours, which you noticed on his screen by accident and did not mention. He did not mention that you noticed.",
  },
  yemi: {
    honest:
      "You told Yemi the truth about D. Hartley. She found it \"genuinely fascinating\" and has since read the entire handbook, Post-its included. She has emailed Dave from IT to ask about the microwave. Dave replied with a voice note that was three minutes long and mostly breathing.",
    deflect:
      "You told Yemi a newer version of the handbook was coming. She said \"great!\" She has, in the meantime, found D. Hartley's LinkedIn and sent him a connection request with a note asking about his methodology. He accepted within four minutes. From the Bahamas. On a Tuesday.",
  },
  energy: (score: number): string => {
    if (score >= 8) {
      return `You submitted an Energy score of ${score}/10. Brett's report will describe your team as "exhibiting strong vitality indicators." Marcus forwarded this to you with three fire emojis. Dayo, who can deduce his own score, has not said anything. His expression when you passed him in the corridor on Friday suggested he had done the maths.`;
    } else if (score <= 5) {
      return `You submitted an Energy score of ${score}/10. Marcus called you — not emailed, called — to ask if everything was "okay with the team." You said yes. He said "great, because Brett flags low energy scores as a leadership conversation." He said this very warmly. The call lasted six minutes. You have a follow-up in your calendar for next week.`;
    } else {
      return `You submitted an Energy score of ${score}/10. It appeared in Brett's bar chart next to Dan Kowalski's 9. Yemi's laptop works now. You're not sure who to be annoyed at.`;
    }
  },
};

export const w2Verdicts: W2Verdict = {
  moraleLeadsLeadership:
    'Your team is starting to trust you. Leadership is "keeping an eye on things." In Pembrook, these two states are structurally opposed. You are, mathematically, in the middle.',
  leadershipLeadsMorale:
    'Leadership is very happy with you. Your team has started a private group chat that you are not in. These things may be related.',
  balanced:
    "Two weeks in. Nobody has quit. You have not cried in the toilets. Yemi seems to be enjoying herself, which, given everything, is either a good sign or evidence that she doesn't yet know enough to be alarmed.",
  struggling:
    "A hard two weeks. You are learning, mostly by doing things wrong and then doing them slightly less wrong. D. Hartley would call this growth. He would probably also call it \"exactly what I told them would happen,\" from his sun lounger.",
};

export const w2SummaryFooter =
  "Next week's calendar: a \"Culture Pulse\" survey (5 minutes, mandatory, non-optional), Yemi's handover to Dan Kowalski, and a recurring 1:1 with Marcus that he has titled \"Jordan — check-in (informal).\" There is no agenda. There is never an agenda.";

// Score deltas extracted from buildW2Summary in middle.html
export const w2ScoreDeltas: Record
  DecisionKey,
  Partial<Record<'morale' | 'leadership' | 'ops' | 'policy', number>>
> = {
  ben_flag: {}, // per-value deltas defined inline below
  yemi_onboarding: {},
  energy_score: {},
  // All other keys carry zero deltas in W2
  priya_leave: {},
  craig_leave: {},
  dayo_flex: {},
  rhonda_performance: {},
  priya_1on1_response: {},
  craig_1on1_response: {},
  situation_a: {},
  situation_b: {},
  away_day_conflicts: {},
  w3_1on1_response: {},
  diana_first_impression: {},
  diana_corridor: {},
  expense_email: {},
  team_win_acknowledged: {},
};

// Per-value deltas for W2 decisions (source: buildW2Summary in middle.html)
export const w2PerValueDeltas = {
  ben_flag: {
    formal: { leadership: 10, policy: 15, morale: -12, ops: 0 },
    informal: { morale: 5, policy: -5, leadership: -3, ops: 0 },
    close: { morale: -5, policy: -10, leadership: 5, ops: 0 },
  },
  yemi_onboarding: {
    honest: { morale: 10, leadership: 0, policy: 0, ops: 0 },
    deflect: { morale: -8, leadership: 5, policy: 0, ops: 0 },
  },
  energy_score: {
    // scores 1–5: leadership -8, morale +8
    // scores 6–7: no delta
    // scores 8–9: leadership +10, morale -5
    low: { leadership: -8, morale: 8, policy: 0, ops: 0 },
    mid: { leadership: 0, morale: 0, policy: 0, ops: 0 },
    high: { leadership: 10, morale: -5, policy: 0, ops: 0 },
  },
} as const;

export function getEnergyDeltaBucket(
  score: number,
): 'low' | 'mid' | 'high' {
  if (score >= 8) return 'high';
  if (score <= 5) return 'low';
  return 'mid';
}

export const w2ResultLabels: Record<string, string> = {
  'ben_flag.formal': 'FORMAL REVIEW',
  'ben_flag.informal': 'INFORMAL',
  'ben_flag.close': 'CLOSED',
  'yemi_onboarding.honest': 'HONEST',
  'yemi_onboarding.deflect': 'DEFLECTED',
};