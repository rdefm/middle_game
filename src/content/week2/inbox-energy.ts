import { Decision } from '@/content/_types';

export const inboxEnergy: {
  sceneId: string;
  emailMeta: {
    from: string;
    to: string;
    date: string;
    re: string;
  };
  emailBody: string;
  policyBox: {
    heading: string;
    body: string;
  };
  footnote: string;
  decision: Decision;
} = {
  sceneId: 'w2-inbox-energy',
  emailMeta: {
    from: 'brett.callahan@apexhumanperformance.com',
    to: 'jordan.ellis@pembrook.com (via marcus.webb)',
    date: 'Wednesday, 11:30',
    re: 'Your Ways of Working Self-Assessment — DUE THURSDAY',
  },
  emailBody: `Hi Jordan,

Brett here from Apex Human Performance! 🚀

Please complete the below self-assessment for your team by EOD Thursday. Score each dimension 1–10. There are no wrong answers. (There are answers that suggest misalignment with your organisation's growth trajectory, but these are distinct from wrong answers.)

— Output: Does your team deliver what they commit to?
— Presence: Are people showing up, physically and mentally?
— Collaboration: Is the team greater than the sum of its parts?
— Resilience: Can the team absorb pressure without breaking?
— Energy: Does the team bring vitality and forward momentum?

When you're done, reply to this email with your scores. Marcus will see them before I do. This is standard process.

If you have questions about any dimension, my TED talk covers the framework in detail. Link below.

Brett Callahan | Apex Human Performance | "Unlocking the Human Edge™"
[TED talk: "Why Your Org Chart Is Killing Your Culture" — 847,293 views]`,
  policyBox: {
    heading: 'Policy Handbook — Addendum, inserted loose (D. Hartley)',
    body: `"There is no policy covering external consultant assessments because when I wrote this handbook, Pembrook had not yet discovered consultants. They will. Oh, they will.

If you are asked to score your team members numerically on something called 'Energy': you are being asked to produce a number that will be presented as data, used to justify decisions, and experienced by your team as a judgement. It is not data. It is a feeling, formalised. The distinction will not appear in Brett's report.

Score honestly. Score kindly. These two things will sometimes be the same thing and sometimes not. Good luck. — D.H."`,
  },
  footnote:
    'You must submit an Energy score for your team. The score will be "anonymised." Your team has seven people. You know which members have had a hard few weeks. You also know Marcus will read the scores before Brett does.',
  submissionNote:
    'You are not sure what an honest answer is. You are fairly sure what Marcus wants the answer to be.',
  decision: {
    key: 'energy_score',
    prompt: 'Submit your team\'s Energy score:',
    options: [
      {
        value: '1',
        label: '1',
        variant: 'neutral',
        stampText: 'Score: 1/10',
        scoreDeltas: { leadership: -8, morale: 8, policy: 0, ops: 0 },
      },
      {
        value: '2',
        label: '2',
        variant: 'neutral',
        stampText: 'Score: 2/10',
        scoreDeltas: { leadership: -8, morale: 8, policy: 0, ops: 0 },
      },
      {
        value: '3',
        label: '3',
        variant: 'neutral',
        stampText: 'Score: 3/10',
        scoreDeltas: { leadership: -8, morale: 8, policy: 0, ops: 0 },
      },
      {
        value: '4',
        label: '4',
        variant: 'neutral',
        stampText: 'Score: 4/10',
        scoreDeltas: { leadership: -8, morale: 8, policy: 0, ops: 0 },
      },
      {
        value: '5',
        label: '5',
        variant: 'neutral',
        stampText: 'Score: 5/10',
        scoreDeltas: { leadership: -8, morale: 8, policy: 0, ops: 0 },
      },
      {
        value: '6',
        label: '6',
        variant: 'neutral',
        stampText: 'Score: 6/10',
        scoreDeltas: { leadership: 0, morale: 0, policy: 0, ops: 0 },
      },
      {
        value: '7',
        label: '7',
        variant: 'neutral',
        stampText: 'Score: 7/10',
        scoreDeltas: { leadership: 0, morale: 0, policy: 0, ops: 0 },
      },
      {
        value: '8',
        label: '8',
        variant: 'neutral',
        stampText: 'Score: 8/10',
        scoreDeltas: { leadership: 10, morale: -5, policy: 0, ops: 0 },
      },
      {
        value: '9',
        label: '9',
        variant: 'neutral',
        stampText: 'Score: 9/10',
        scoreDeltas: { leadership: 10, morale: -5, policy: 0, ops: 0 },
      },
    ],
  },
};