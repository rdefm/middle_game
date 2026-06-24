import { Scene } from '../_types';

export const inboxAwayDay: Scene = {
  id: 'w3-inbox-away-day',
  screenType: 'inbox',
  content: {
    tabLabel: 'Away Day',
    emailMeta: {
      from: 'rhonda.takacs@pembrook.com, dayo.okafor@pembrook.com, ben.osei@pembrook.com',
      to: 'jordan.ellis@pembrook.com',
      date: 'Tuesday (three separate emails, within 40 minutes of each other)',
    },
    body: `— Rhonda: "Hi Jordan, I don't want to cause any trouble but 15th November is a Friday and I have school drop-off at 8:15am and pick-up at 3:30pm. I'm not sure how this works with the away day? Sorry if I'm missing something."

— Dayo: "Jordan!! Away day looks incredible but Friday is my nursery day, I do both runs. Is there a remote option? Happy to join via Teams if that works? No worries if not."

— Ben: "Hi Jordan. Re: the away day. Fridays are difficult for me due to my son's school schedule. I've checked the policy handbook (Section 7.3) and it mentions 'alternative arrangements.' Is that something I could request? Again, very sorry."`,
    policyBox: {
      ref: "Policy §7.3 cont. — Your Options (D. Hartley, 2019)",
      text: `"The Team Lead may: (a) escalate to the organiser to request a date change — this will not work but it is worth documenting that you tried; (b) approve exemptions for affected team members, noting the policy justification — this is correct but Marcus will notice; (c) tell them to sort their own childcare — this is not in the handbook as an option. I am simply noting it happens. It should not happen.

For clarity: three people with caring conflicts on a mandatory event with 18 days notice is not their failure to be flexible. It is a planning failure that has been passed down the chain until it reached you. You are the chain's last link. Congratulations. — D.H."`,
    },
    decision: {
      key: 'away_day_conflicts' as const,
      options: [
        {
          label: 'Escalate to Marcus — request date change',
          value: 'escalate',
          stampText: 'Escalated',
          stampType: 'approved' as const,
          scoreDeltas: { morale: 4, leadership: -3 },
        },
        {
          label: 'Approve exemptions under §7.3',
          value: 'exempt',
          stampText: 'Exemptions Approved',
          stampType: 'approved' as const,
          scoreDeltas: { morale: 10, leadership: -8, policy: 5 },
        },
        {
          label: 'Tell them attendance is mandatory',
          value: 'enforce',
          stampText: 'Enforced',
          stampType: 'denied' as const,
          scoreDeltas: { morale: -12, leadership: 8 },
        },
      ],
    },
  },
};