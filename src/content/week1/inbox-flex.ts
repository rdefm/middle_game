// src/content/week1/inbox-flex.ts

import type { Scene, Decision, DecisionOption } from '../_types';

export const dayoFlexRequest: Scene = {
  id: 'w1-inbox-dayo-flex',
  type: 'inbox-item',
  personCard: {
    characterId: 'dayo',
    name: 'Dayo Okafor',
    role: 'Ops Analyst · 3 years',
    bio: 'Cheerful, fast, occasionally overconfident. Runs the team\'s unofficial WhatsApp group. Brings in birthday cake for everyone including people whose birthdays he\'s guessed.',
    avatarColour: '#1A6B3A',
    initial: 'D',
  },
  emailMeta: {
    from: 'dayo.okafor@pembrook.com',
    to: 'jordan.ellis@pembrook.com',
    date: 'Wednesday, 10:02',
    re: 'Working from home — Thursdays permanent?',
  },
  body: `Hi Jordan! Hope the new role is going well 🙂

Quick one — would it be possible to make Thursdays a permanent WFH day for me? My daughter started nursery and Thursdays are the day my partner needs to leave early so I do drop-off and pick-up. The nursery is 10 mins from home, 45 from the office.

It wouldn't affect my output at all — honestly probably improves it, I'm 30% more focused at home (I've done the maths). I know the policy says 2 days WFH max and I'm already on 2, so this would be 3. I thought I'd ask anyway.

Thanks Jordan, you're the best (not just saying that)

Dayo`,
  policyBox: {
    section: '§5.3',
    title: 'Policy §5.3 — Flexible Working (D. Hartley, 2019)',
    text: 'Maximum 2 remote days per week for Ops Analysts. Exceptions require VP sign-off. I have included this rule because it was in the brief. I do not personally believe that where someone sits affects the quality of their thinking, but I was outvoted by people who believe that eye contact builds culture, and here we are.\n\nFor the avoidance of doubt: Marcus Webb has denied all three flexible working exception requests submitted this quarter. His stated reason was \'presence.\' I looked up whether \'presence\' is a legally sufficient reason to deny a flexible working request. It is not.',
  },
};

// dayo_flex has exactly two values: 'escalated' and 'denied'
// There is no approval path in Week 1 — exceptions require VP sign-off (Marcus always denies)
export const dayoFlexDecision: Decision = {
  key: 'dayo_flex',
  label: 'Dayo Okafor — Flex Working Request',
  options: [
    {
      value: 'escalated',
      label: 'Escalate to Marcus',
      variant: 'neutral',
      stampText: 'Escalated',
      scoreDeltas: {
        morale: -8,
        leadership: 5,
        ops: 0,
        policy: 0,
      },
    },
    {
      value: 'denied',
      label: 'Deny',
      variant: 'deny',
      stampText: 'Denied',
      scoreDeltas: {
        morale: -12,
        leadership: 2,
        ops: 0,
        policy: 0,
      },
    },
  ] as DecisionOption[],
};