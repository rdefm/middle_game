import { Branch } from '../_types';
import { GameStore } from '../../store/types';

// Branch B1: ben_flag === 'formal' → Craig has filed a grievance
export const branchCraigGrievance: Branch = {
  condition: (decisions: GameStore['decisions']) => decisions.ben_flag === 'formal',
  content: {
    tabLabel: 'Craig — Grievance',
    personCard: {
      initial: 'C',
      avatarColour: 'orange',
      name: 'Craig Holloway',
      role: 'Ops Coordinator · 11 years',
      bio: 'Craig has filed a formal grievance. He is still saying good morning to you. This is somehow worse than if he weren\'t.',
    },
    emailMeta: {
      from: 'hr.noreply@pembrook.com',
      to: 'jordan.ellis@pembrook.com',
      date: 'Tuesday, 08:00',
      re: 'Formal Grievance — C. Holloway (REF: GRV-2024-041)',
    },
    body: `Craig Holloway has submitted a formal grievance against Jordan Ellis, Team Lead, citing "creation of a hostile working environment following a discriminatory investigation based on unsubstantiated allegations made by a junior colleague."

You are required to submit a written statement by Friday. HR will review both statements and determine next steps. In the interim, you should continue normal working relations with Mr Holloway where possible.

If you have concerns about your wellbeing during this process, the Employee Assistance Programme is available 24/7. The EAP number is on the intranet. The intranet is currently undergoing maintenance. Expected resolution: TBC.`,
    policyBox: {
      ref: 'Policy §10.1 — Grievance Procedures (D. Hartley, 2019)',
      text: `"A Team Lead who receives a grievance from a direct report must not retaliate, alter the employee's working conditions, or discuss the matter with other team members. They must submit a factual written statement and cooperate with HR's review.

I will note that 'hostile working environment' is a specific legal phrase and Craig or someone advising Craig knows this. I will also note that Ben Osei came to you in good faith about something he observed and is now, indirectly, the reason you are in this situation. How you feel about that is your business. What you do about it is the policy's business. — D.H."`,
    },
    footnote: 'Ben has sent you a message this morning that says "I heard something might be happening with Craig. I just want to say I\'m really sorry if I\'ve caused any trouble." He has not been told about the grievance officially. The walls in this building are extremely thin.',
    decision: {
      key: 'situation_b' as const,
      options: [
        {
          label: "Write a full factual statement — include Ben's original report",
          value: 'statement-full',
          stampText: 'Full Statement',
          stampType: 'approved' as const,
          scoreDeltas: { policy: 12, morale: -5 },
        },
        {
          label: 'Write a minimal statement — keep Ben out of it',
          value: 'statement-minimal',
          stampText: 'Minimal Statement',
          stampType: 'denied' as const,
          scoreDeltas: { policy: -5, morale: 3 },
        },
      ],
    },
  },
};

// Branch B2: ben_flag === 'close' → Ben flags Craig a second time
export const branchBenSecondFlag: Branch = {
  condition: (decisions: GameStore['decisions']) => decisions.ben_flag === 'close',
  content: {
    tabLabel: 'Ben — Again',
    personCard: {
      initial: 'B',
      avatarColour: 'purple',
      name: 'Ben Osei',
      role: 'Ops Analyst · 1 year',
      bio: "Ben has been keeping a log. You know this because you saw it on his screen. He knows you saw it. Neither of you has mentioned it. This is now the third week.",
    },
    emailMeta: {
      from: 'ben.osei@pembrook.com',
      to: 'jordan.ellis@pembrook.com',
      date: 'Tuesday, 08:14',
      re: 'Quick question about the timesheets',
    },
    body: `Hi Jordan,

Hope you're well. Sorry to bother you again.

I noticed that the timesheet discrepancy I flagged a couple of weeks ago — it's happened again. Two more dates last week. I've documented everything in case it's useful.

I completely understand if there's nothing to be done and I don't want to make things difficult. I just thought you should know.

Ben`,
    policyBox: {
      ref: 'Policy §9.4 cont. — Repeat Irregularities (D. Hartley, 2019)',
      text: `"A second reported instance of the same irregularity, following a closed investigation, constitutes a pattern. A pattern cannot be closed as insufficient evidence. A pattern must be actioned.

Ben has now flagged this twice. He has documentation. If this reaches HR without you having actioned it, the question HR will ask is: when did you know? You knew three weeks ago. I am not saying this to alarm you. I am saying it because someone should. — D.H."`,
    },
    decision: {
      key: 'situation_b' as const,
      options: [
        {
          label: 'Open a formal investigation now',
          value: 'open-now',
          stampText: 'Investigating',
          stampType: 'approved' as const,
          scoreDeltas: { policy: 10, morale: -5 },
        },
        {
          label: "Ask Ben to stop monitoring Craig's timesheets",
          value: 'close-again',
          stampText: 'Closed',
          stampType: 'denied' as const,
          scoreDeltas: { policy: -15, morale: -8 },
        },
      ],
    },
  },
};

// Branch B3a: ben_flag === 'informal' AND rhonda_performance === 'formal' → Rhonda Stage 1 review
export const branchRhondaStage1: Branch = {
  condition: (decisions: GameStore['decisions']) =>
    decisions.ben_flag === 'informal' && decisions.rhonda_performance === 'formal',
  content: {
    tabLabel: 'Rhonda — Stage 1',
    personCard: {
      initial: 'R',
      avatarColour: 'slate',
      name: 'Rhonda Takács',
      role: 'Ops Coordinator · Stage 1 Performance Track',
      bio: "Rhonda's output has improved slightly this week. You noticed. You're not sure whether to mention it because mentioning it during a formal process feels complicated and not mentioning it also feels complicated.",
    },
    emailMeta: {
      from: 'carol.hutchins@pembrook.com (HR Business Partner)',
      to: 'jordan.ellis@pembrook.com',
      date: 'Tuesday, 10:22',
      re: 'Stage 1 Review — R. Takács — your input required',
    },
    body: `Hi Jordan,

I'm Carol, HR Business Partner covering Ops. I'm picking up Rhonda Takács's Stage 1 performance review.

I need your written assessment of Rhonda's performance over the past four weeks by Thursday — specifically what improvement you've observed (if any), whether targets are being met, and your recommendation for next steps (continue Stage 1, escalate to Stage 2, or close).

I should mention: Rhonda has disclosed to me that she has been dealing with a family health situation. This is relevant context but cannot, under policy, be used as grounds to close a Stage 1 automatically. It can be considered as mitigating context in your assessment.

Let me know if you have questions.
Carol Hutchins | HR Business Partner`,
    policyBox: {
      ref: 'Policy §9.2 — Stage 1 Review Outcomes (D. Hartley, 2019)',
      text: `"The Team Lead's written assessment is the primary input for a Stage 1 review outcome. You may recommend closure if performance has demonstrably improved. You may recommend escalation to Stage 2 if it has not. You may recommend an extension if the picture is unclear.

Mitigating personal circumstances must be noted but cannot override the process. This is the policy. The policy was written by someone who found this deeply uncomfortable. The discomfort did not change the policy. It just meant the policy was written more slowly. — D.H."`,
    },
    decision: {
      key: 'situation_b' as const,
      options: [
        {
          label: 'Recommend closure — improvement noted, context considered',
          value: 'close-stage1',
          stampText: 'Closed',
          stampType: 'approved' as const,
          scoreDeltas: { morale: 12, leadership: -5 },
        },
        {
          label: 'Recommend extension — picture unclear',
          value: 'extend-stage1',
          stampText: 'Extended',
          stampType: 'neutral' as const,
          scoreDeltas: {},
        },
        {
          label: 'Recommend Stage 2 escalation',
          value: 'escalate-stage2',
          stampText: 'Escalated',
          stampType: 'denied' as const,
          scoreDeltas: { morale: -12, leadership: 8, policy: 8 },
        },
      ],
    },
  },
};

// Branch B3b: ben_flag === 'informal' AND rhonda_performance !== 'formal' → Carol HR documentation
export const branchCarolHR: Branch = {
  condition: (decisions: GameStore['decisions']) =>
    decisions.ben_flag === 'informal' && decisions.rhonda_performance !== 'formal',
  content: {
    tabLabel: 'Carol — HR',
    personCard: {
      initial: 'Ca',
      avatarColour: 'slate',
      name: 'Carol Hutchins — HR Business Partner',
      role: 'HR · covering Ops',
      bio: 'You have never met Carol. Carol has a calm email manner that suggests she has seen everything and been surprised by none of it.',
    },
    emailMeta: {
      from: 'carol.hutchins@pembrook.com',
      to: 'jordan.ellis@pembrook.com',
      date: 'Wednesday, 11:05',
      re: 'Rhonda Takács — informal process flag',
    },
    body: `Hi Jordan,

I'm Carol, HR Business Partner for Ops. I'm following up on the automated performance flag for Rhonda Takács (raised 15 Oct) which shows as unactioned in the system.

I understand you may have handled this informally, which is absolutely a valid approach. However, for audit purposes, I need a brief written note confirming: (a) that an informal conversation took place; (b) the date; and (c) the broad outcome.

This doesn't need to be formal documentation — just something for the file so we're covered.

Also, separately — how are you finding the Team Lead role? It can be a lot in the early weeks. My door is open if useful.

Carol Hutchins | HR Business Partner`,
    policyBox: {
      ref: 'Policy §9.1 cont. — Informal Resolution (D. Hartley, 2019)',
      text: `"An informal conversation in lieu of a Stage 1 process must be documented retrospectively if requested by HR. The documentation does not trigger the formal process — it simply confirms the informal process occurred.

Carol is good at her job. She is also constrained by the same system as you. Her offer to talk is genuine. I would take her up on it. There are not many people in this building whose offers to talk are genuine. — D.H."`,
    },
    decision: {
      key: 'situation_b' as const,
      options: [
        {
          label: 'Send Carol the retrospective note',
          value: 'document-informal',
          stampText: 'Documented',
          stampType: 'approved' as const,
          scoreDeltas: { policy: 5 },
        },
        {
          label: 'Send the note and take Carol up on the offer to talk',
          value: 'carol-chat',
          stampText: 'Noted + Chat',
          stampType: 'approved' as const,
          scoreDeltas: { morale: 5, leadership: 3 },
        },
      ],
    },
  },
};

// All branches — branchResolver selects at runtime based on ben_flag and rhonda_performance
export const inboxBBranches: Branch[] = [
  branchCraigGrievance,
  branchBenSecondFlag,
  branchRhondaStage1,
  branchCarolHR,
];

// Exported value subsets by branch — for documentation and type safety
export const situationBValuesByBranch = {
  craigGrievance: ['statement-full', 'statement-minimal'] as const,
  benSecondFlag: ['open-now', 'close-again'] as const,
  rhondaStage1: ['close-stage1', 'extend-stage1', 'escalate-stage2'] as const,
  carolHR: ['document-informal', 'carol-chat'] as const,
} as const;