import { Decision } from '@/content/_types';

export const inboxCraigBen: {
  sceneId: string;
  dayLabel: string;
  dayDots: string[];
  personCard: {
    initial: string;
    avatarColour: string;
    name: string;
    role: string;
    bio: string;
  };
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
  decision: Decision;
} = {
  sceneId: 'w2-inbox-craig-ben',
  dayLabel: 'Week 2 — Tuesday–Wednesday',
  dayDots: ['done', 'current', 'current', 'empty', 'empty'],
  personCard: {
    initial: 'B',
    avatarColour: 'purple',
    name: 'Ben Osei',
    role: 'Ops Analyst · 1 year',
    bio: 'Careful, conscientious, slightly nervous in meetings. Sends emails at 7am and then worries they were too keen. Keeps meticulous notes. Has not previously caused or reported any issues.',
  },
  emailMeta: {
    from: 'ben.osei@pembrook.com',
    to: 'jordan.ellis@pembrook.com',
    date: 'Tuesday, 08:23',
    re: 'Something I wanted to flag — please ignore if not appropriate',
  },
  emailBody: `Hi Jordan,

I'm sorry to bring this to you and please feel free to tell me I'm overstepping.

I was reviewing the shared task tracker last week to update my own entries and I noticed something that didn't look right in Craig's timesheets. Specifically, there are two dates — 9th and 14th October — where he's logged full days but the tracker shows no activity and he wasn't in the office either day. I could be wrong. It might be a system thing. I didn't want to mention it but it's been bothering me.

I haven't said anything to Craig or anyone else. I wanted to come to you first. Again — please ignore this if I've misread it.

Ben

P.S. If this causes any problems for me I completely understand.`,
  policyBox: {
    heading: 'Policy §9.4 — Timekeeping Irregularities (D. Hartley, 2019)',
    body: `"A reported discrepancy in timesheet records must be acknowledged by the Team Lead within 48 hours. The Team Lead may: (a) investigate formally via HR, which triggers a disciplinary review; (b) raise informally with the employee; or (c) determine insufficient evidence and close.

I will note that option (c) is sometimes chosen because option (a) is frightening and option (b) is awkward. These are understandable reasons. They are not, strictly speaking, good ones. Craig has been here eleven years. Ben has been here one. You may want to consider what that means for how each of them will experience whatever you decide.

Also: the 9th was a Wednesday. Craig was in the WhatsApp at 2pm sending a gif of a dog falling off a sofa. This is not in the official record. I just know things now. — D.H."`,
  },
  decision: {
    key: 'ben_flag',
    prompt: 'How do you respond to Ben?',
    options: [
      {
        value: 'formal',
        label: 'Investigate formally',
        variant: 'approve',
        stampText: 'Escalated',
        scoreDeltas: {
          leadership: 10,
          policy: 15,
          morale: -12,
          ops: 0,
        },
      },
      {
        value: 'informal',
        label: 'Informal word with Craig',
        variant: 'neutral',
        stampText: 'Noted',
        scoreDeltas: {
          leadership: -3,
          policy: -5,
          morale: 5,
          ops: 0,
        },
      },
      {
        value: 'close',
        label: 'Insufficient evidence — close',
        variant: 'deny',
        stampText: 'Closed',
        scoreDeltas: {
          leadership: 5,
          policy: -10,
          morale: -5,
          ops: 0,
        },
      },
    ],
  },
};