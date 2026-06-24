import { Branch } from '../_types';
import { GameStore } from '../../store/types';

// Branch A1: Priya has left (priya_leave === 'denied') → account redistribution
export const branchPriyaAccounts: Branch = {
  condition: (decisions: GameStore['decisions']) => decisions.priya_leave === 'denied',
  content: {
    tabLabel: "Priya's Accounts",
    personCard: {
      initial: 'P',
      avatarColour: 'teal',
      name: 'Priya Sharma — Final Week',
      role: 'Senior Ops Analyst · Last day: Friday',
      bio: "Her handover notes are colour-coded, cross-referenced, and include a section titled \"things Jordan should probably know but I didn't want to make a thing of.\" You read this section first.",
    },
    emailMeta: {
      from: 'Pembrook HR System',
      to: 'jordan.ellis@pembrook.com',
      re: 'Account Redistribution Required — P. Sharma departure',
    },
    body: `Priya Sharma's accounts must be redistributed before her departure on Friday 1 November. Please assign ownership of her 14 active accounts to existing team members and confirm in the portal by EOD Thursday.

Current team capacity is already at 94% of recommended load. One account (Hartfield Group — Priya's note: "call Sandra on Tuesdays only, she doesn't trust emails since the incident") requires senior analyst sign-off. Rhonda is the only other senior analyst.`,
    policyBox: {
      ref: 'Policy §2.7 — Account Redistribution (D. Hartley, 2019)',
      text: `"Accounts should be redistributed equitably across available capacity. Where capacity is already at or above 90%, the Team Lead should escalate to their line manager to request temporary resource.

I want to be very clear: escalating to Marcus about resource will result in Marcus saying 'let's keep an eye on it.' This is not resource. It is the word resource used as a substitute for resource. You will still have to make a decision. — D.H."`,
    },
    footnote: "Rhonda is on a Stage 1 performance track (if you chose that) or has just had a difficult few weeks (if you didn't). You are about to ask her to take on Priya's most complex account.",
    decision: {
      key: 'situation_a' as const,
      options: [
        {
          label: 'Spread accounts across the team equally',
          value: 'spread',
          stampText: 'Distributed',
          stampType: 'approved' as const,
          scoreDeltas: { morale: -5, ops: -8 },
        },
        {
          label: "Give Hartfield to Rhonda — she's most qualified",
          value: 'dump',
          stampText: 'Assigned',
          stampType: 'denied' as const,
          scoreDeltas: { morale: -12, ops: -3 },
        },
        {
          label: 'Escalate to Marcus for resource support',
          value: 'escalate-resource',
          stampText: 'Escalated',
          stampType: 'neutral' as const,
          scoreDeltas: { morale: -3, leadership: -5 },
        },
      ],
    },
  },
};

// Branch A2: Priya stayed (priya_leave === 'approved') → Dayo's half-day request
export const branchDayoHalfDay: Branch = {
  condition: (decisions: GameStore['decisions']) => decisions.priya_leave !== 'denied',
  content: {
    tabLabel: "Dayo's Half Day",
    personCard: {
      initial: 'D',
      avatarColour: 'green',
      name: 'Dayo Okafor',
      role: 'Ops Analyst · 3 years',
      bio: 'Dayo has updated his LinkedIn twice this month. His "Open to Work" setting is off, but his headline now says "Ops | Process Improvement | Open to conversations." You know what "open to conversations" means. You have not mentioned it.',
    },
    emailMeta: {
      from: 'dayo.okafor@pembrook.com',
      to: 'jordan.ellis@pembrook.com',
      date: 'Tuesday, 09:51',
      re: 'Thursday afternoon — half day request',
    },
    body: `Hi Jordan,

Would it be okay to take Thursday afternoon as half day leave? I have an appointment I can't move.

I'll make sure everything's covered before I go and I can pick up anything urgent Friday morning.

Thanks
Dayo`,
    policyBox: {
      ref: 'Policy §4.2 — Short Notice Leave (D. Hartley, 2019)',
      text: `"Half-day requests with less than 5 working days notice are at Team Lead discretion. 'An appointment I can't move' is the standard phrasing for an interview. It is also the standard phrasing for a medical appointment, a legal matter, and approximately forty other things that are none of your business. The policy does not require the employee to specify. You may ask. They may decline to answer. Both of these things are permitted. — D.H."`,
    },
    decision: {
      key: 'situation_a' as const,
      options: [
        {
          label: 'Approve without question',
          value: 'approve-dayo',
          stampText: 'Approved',
          stampType: 'approved' as const,
          scoreDeltas: { morale: 8 },
        },
        {
          label: 'Approve but ask what the appointment is',
          value: 'ask-dayo',
          stampText: 'Approved',
          stampType: 'neutral' as const,
          scoreDeltas: { morale: 2 },
        },
        {
          label: 'Deny — coverage needed Thursday',
          value: 'deny-dayo',
          stampText: 'Denied',
          stampType: 'denied' as const,
          scoreDeltas: { morale: -14 },
        },
      ],
    },
  },
};

// All branches — branchResolver selects at runtime
export const inboxABranches: Branch[] = [branchPriyaAccounts, branchDayoHalfDay];