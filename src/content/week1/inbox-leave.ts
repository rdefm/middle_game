// src/content/week1/inbox-leave.ts

import type { Scene, Decision, DecisionOption } from '../_types';

export const priyaLeaveRequest: Scene = {
  id: 'w1-inbox-priya-leave',
  type: 'inbox-item',
  personCard: {
    characterId: 'priya',
    name: 'Priya Sharma',
    role: 'Senior Ops Analyst · 6 years',
    bio: 'Highest performer on the team. Quiet, meticulous. Sends you her deliverables before you ask. Has never taken unplanned leave.',
    avatarColour: '#1A6B6B',
    initial: 'P',
  },
  emailMeta: {
    from: 'priya.sharma@pembrook.com',
    to: 'jordan.ellis@pembrook.com',
    date: 'Tuesday, 09:14',
    re: 'Annual Leave Request — 21–25 Oct',
  },
  body: `Hi Jordan,

I hope you don't mind me asking at relatively short notice. I'd like to request the week of 21–25 October as annual leave if that's possible.

There are some family circumstances I need to attend to. I've already briefed Dayo on my current projects and the handover notes are on the shared drive.

I know it's not ideal timing with the Q4 push, but I wanted to ask. Of course I understand completely if it doesn't work.

Best,
Priya`,
  policyBox: {
    section: '§4.1',
    title: 'Policy §4.1 — Annual Leave (D. Hartley, 2019)',
    text: 'Requests must be submitted a minimum of 14 days in advance. This is non-negotiable, except when it is negotiable, which is at Team Lead discretion, which is why I\'m writing it down so there\'s a record of me telling you it\'s your call.\n\n\'Exceptional circumstances\' may be invoked by the Team Lead to approve short-notice requests. The handbook does not define exceptional circumstances because, frankly, if you can\'t recognise an exceptional circumstance when it\'s sitting in front of you, a definition isn\'t going to help.\n\nCurrent operational cover for 21–25 Oct: Adequate, provided one senior analyst remains present. Whether adequacy is a sufficient standard of care is left as an exercise for the reader.',
  },
  footnote: 'Priya has 9 days of annual leave remaining. She has not taken leave since April. She has written "family circumstances" once, at the start of the second paragraph, and not mentioned it again. She is either very private or very English. Possibly both.',
};

export const craigLeaveRequest: Scene = {
  id: 'w1-inbox-craig-leave',
  type: 'inbox-item',
  personCard: {
    characterId: 'craig',
    name: 'Craig Holloway',
    role: 'Ops Coordinator · 11 years',
    bio: 'Been here longer than the current IT system. Technically adequate. Protective of his calendar. Has a signed photo of the previous CEO on his desk, which nobody has asked about.',
    avatarColour: '#8C5B1A',
    initial: 'C',
  },
  emailMeta: {
    from: 'craig.holloway@pembrook.com',
    to: 'jordan.ellis@pembrook.com',
    date: 'Tuesday, 11:47',
    re: 'Leave — last week of Oct cheers',
  },
  body: `Jordan,

Taking 21-25 off. Already told the lads. It's a lads' trip, been planned since June. Vegas. Should be a good one.

Can you sort the approval? Just need the form signed off. Appreciate it mate.

Craig

P.S. Don't tell Marcus about the Vegas thing, he'll want to come`,
  policyBox: {
    section: '§4.1c',
    title: 'Policy §4.1(c) — Legacy Entitlements (D. Hartley, 2019)',
    text: 'Employees with 10+ years of continuous service retain rights under the 2013 Employment Terms unless explicitly renegotiated. I would like it noted for the record that I flagged in 2019 that these legacy contracts needed reviewing. I flagged it twice. The relevant VP said it was \'on the radar.\' It was not on the radar.\n\nSection 12 of any pre-2014 contract states annual leave may be taken with 5 working days\' notice, at Team Lead discretion. This means Craig, specifically, can do this. Yes, I know. I\'m sorry.\n\nCraig has 4 days of annual leave remaining. He has requested 5. This discrepancy does not appear to have occurred to him.',
  },
  warnBox: 'Both Priya and Craig have requested 21–25 Oct. You can approve both — coverage drops below recommended threshold and you will hear about it. You can approve one. You can deny both, at which point Priya will be professionally gracious about it and Craig will tell people you\'re "a bit much."',
};

export const priyaLeaveDecision: Decision = {
  key: 'priya_leave',
  label: 'Priya Sharma — Leave Request (21–25 Oct)',
  options: [
    {
      value: 'approved',
      label: 'Approve',
      variant: 'approve',
      stampText: 'Approved',
      scoreDeltas: {
        morale: 15,
        leadership: 0,
        ops: -8,
        policy: -10,
      },
    },
    {
      value: 'denied',
      label: 'Deny',
      variant: 'deny',
      stampText: 'Denied',
      scoreDeltas: {
        morale: -18,
        leadership: 5,
        ops: 0,
        policy: 8,
      },
    },
  ] as DecisionOption[],
};

export const craigLeaveDecision: Decision = {
  key: 'craig_leave',
  label: 'Craig Holloway — Leave Request (21–25 Oct)',
  options: [
    {
      value: 'approved',
      label: 'Approve',
      variant: 'approve',
      stampText: 'Approved',
      scoreDeltas: {
        morale: 3,
        leadership: -3,
        ops: -10,
        policy: 0,
      },
    },
    {
      value: 'denied',
      label: 'Deny',
      variant: 'deny',
      stampText: 'Denied',
      scoreDeltas: {
        morale: -5,
        leadership: 3,
        ops: 5,
        policy: 5,
      },
    },
  ] as DecisionOption[],
};

// Additional ops delta when BOTH Priya and Craig are approved simultaneously
export const BOTH_LEAVE_APPROVED_OPS_PENALTY = -8;