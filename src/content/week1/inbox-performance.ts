// src/content/week1/inbox-performance.ts

import type { Scene, Decision, DecisionOption } from '../_types';

export const rhondaPerformanceFlag: Scene = {
  id: 'w1-inbox-rhonda-performance',
  type: 'inbox-item',
  personCard: {
    characterId: 'rhonda',
    name: 'Rhonda Takács',
    role: 'Ops Coordinator · 2 years',
    bio: 'Solid mid-performer. Lately her outputs have slipped — deadlines missed by small margins, unusual for her. Hasn\'t said anything. You haven\'t asked.',
    avatarColour: '#4A5568',
    initial: 'R',
  },
  emailMeta: {
    from: 'Pembrook HR System — Automated Alert',
    to: 'jordan.ellis@pembrook.com',
    date: 'Tuesday, 08:00',
    re: 'Performance Flag — R. Takács',
  },
  body: `This is an automated notification.

Team member Rhonda Takács has missed 3 deadlines in the past 6 weeks, triggering an automatic performance flag under Policy §9.1.

As Team Lead, you are required to:
— Acknowledge this flag within 48 hours
— Schedule a performance conversation within 10 working days
— Document the outcome in the HR portal

Failure to action this flag may result in escalation to your line manager.

This message was generated automatically. Please do not reply to this email.`,
  policyBox: {
    section: '§9.1',
    title: 'Policy §9.1 — Performance Management (D. Hartley, 2019)',
    text: 'Three missed deadlines within a 6-week period constitutes a formal performance trigger. The Team Lead must initiate a Stage 1 Performance Conversation within 10 working days and document the outcome in the HR portal.\n\nI want to be clear about what Stage 1 means: it is the beginning of a formal paper trail. It does not mean someone is about to be fired. It does mean that if you ever want to fire them, this is now in their file, permanently, regardless of what happens next. Please think carefully before initiating Stage 1 for someone who has missed three deadlines for reasons you do not yet know.\n\nI am legally required to write this policy. I am not legally required to pretend it\'s a good idea in every situation. — D. Hartley',
  },
  footnote: 'You have not spoken to Rhonda about this. The automated system has. It sent her a copy of the flag notification at the same time it sent you yours, which you will discover when she mentions it, quietly, in the kitchen on Wednesday.',
};

export const rhondaPerformanceDecision: Decision = {
  key: 'rhonda_performance',
  label: 'Rhonda Takács — Performance Flag',
  options: [
    {
      value: 'informal',
      label: 'Informal chat first',
      variant: 'approve',
      stampText: 'Noted',
      scoreDeltas: {
        morale: 8,
        leadership: -8,
        ops: 0,
        policy: 0,
      },
    },
    {
      value: 'formal',
      label: 'Initiate Stage 1 formally',
      variant: 'deny',
      stampText: 'Flagged',
      scoreDeltas: {
        morale: -10,
        leadership: 10,
        ops: 0,
        policy: 12,
      },
    },
  ] as DecisionOption[],
};