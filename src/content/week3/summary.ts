import { GameStore } from '../../store/types';
import { Scores } from '../../store/types';

export type W3SituationAOutcome = {
  label: string;
  resultLabel: string;
  stampType: 'approved' | 'denied' | 'neutral';
  noteText: string;
};

export type W3SituationBOutcome = {
  label: string;
  resultLabel: string;
  stampType: 'approved' | 'denied' | 'neutral';
  noteText: string;
};

export type W3AwayDayOutcome = {
  resultLabel: string;
  stampType: 'approved' | 'denied' | 'neutral';
  noteText: string;
};

// Base scores used in buildW3Summary — W1 + W2 deltas applied before W3 deltas
// W1 deltas (as per buildW3Summary in HTML)
export const w1Deltas: Record<string, Record<string, Partial<Scores>>> = {
  priya_leave: {
    approved: { morale: 10, ops: -5 },
    denied:   { morale: -15 },
  },
  craig_leave: {
    approved: { ops: -8 },
    denied:   { morale: -3, leadership: 3 },
  },
  dayo_flex: {
    escalated: { morale: -6, leadership: 4 },
    denied:    { morale: -10 },
  },
  rhonda_performance: {
    informal: { morale: 6, leadership: -6 },
    formal:   { morale: -8, leadership: 8, policy: 10 },
  },
};

// W2 deltas
export const w2Deltas: Record<string, Record<string, Partial<Scores>>> = {
  ben_flag: {
    formal:   { leadership: 8, morale: -10, policy: 12 },
    close:    { morale: -4, policy: -8 },
    informal: { morale: 3 },
  },
  yemi_onboarding: {
    honest:  { morale: 8 },
    deflect: { morale: -6 },
  },
};

// W3 situation A deltas
export const situationADeltas: Record<string, Partial<Scores>> = {
  // Priya branch
  'spread':            { morale: -5, ops: -8 },
  'dump':              { morale: -12, ops: -3 },
  'escalate-resource': { morale: -3, leadership: -5 },
  // Dayo branch
  'approve-dayo': { morale: 8 },
  'ask-dayo':     { morale: 2 },
  'deny-dayo':    { morale: -14 },
};

// W3 situation B deltas
export const situationBDeltas: Record<string, Partial<Scores>> = {
  // Craig grievance branch
  'statement-full':    { policy: 12, morale: -5 },
  'statement-minimal': { policy: -5, morale: 3 },
  // Ben second flag branch
  'open-now':   { policy: 10, morale: -5 },
  'close-again': { policy: -15, morale: -8 },
  // Rhonda Stage 1 branch
  'close-stage1':    { morale: 12, leadership: -5 },
  'extend-stage1':   {},
  'escalate-stage2': { morale: -12, leadership: 8, policy: 8 },
  // Carol HR branch
  'document-informal': { policy: 5 },
  'carol-chat':        { morale: 5, leadership: 3 },
};

// W3 away day deltas
export const awayDayDeltas: Record<string, Partial<Scores>> = {
  escalate: { morale: 4, leadership: -3 },
  exempt:   { morale: 10, leadership: -8, policy: 5 },
  enforce:  { morale: -12, leadership: 8 },
};

// Energy score delta helper (from buildW3Summary)
export function energyScoreDelta(score: number): Partial<Scores> {
  if (score >= 8) return { leadership: 8, morale: -4 };
  if (score <= 5) return { leadership: -6, morale: 6 };
  return {};
}

// Outcome text per situation A value
export const situationAOutcomeText: Record<string, W3SituationAOutcome> = {
  // Priya branch
  spread: {
    label: 'Priya — Account Redistribution',
    resultLabel: 'DISTRIBUTED',
    stampType: 'approved',
    noteText: "You spread Priya's accounts across the team. Everyone absorbed a little more. Nobody said anything. The team WhatsApp, which you are not in, was unusually quiet this week.",
  },
  dump: {
    label: 'Priya — Account Redistribution',
    resultLabel: 'ASSIGNED TO RHONDA',
    stampType: 'denied',
    noteText: "You gave Hartfield to Rhonda. She took it without complaint. Her first call with Sandra went well — she called on a Tuesday, as instructed. You noted this. Priya's desk has been cleared. Someone from facilities has already put a plant on it.",
  },
  'escalate-resource': {
    label: 'Priya — Account Redistribution',
    resultLabel: 'ESCALATED',
    stampType: 'neutral',
    noteText: "Marcus said he'd 'keep an eye on capacity.' The accounts are still unassigned in the portal. You distributed them yourself on Friday afternoon. This took an hour. The hour was not in your calendar.",
  },
  // Dayo branch
  'approve-dayo': {
    label: 'Dayo — Half Day Request',
    resultLabel: 'APPROVED',
    stampType: 'approved',
    noteText: "You approved Dayo's half day without asking. He came back Friday morning, said nothing about the appointment, and brought doughnuts. He hasn't updated his LinkedIn since. You choose to find this meaningful.",
  },
  'ask-dayo': {
    label: 'Dayo — Half Day Request',
    resultLabel: 'APPROVED (QUESTIONED)',
    stampType: 'neutral',
    noteText: "You asked what the appointment was. Dayo said 'just a thing.' You approved it. The question sat between you for the rest of the week. He brought doughnuts anyway. The doughnuts felt slightly complicated.",
  },
  'deny-dayo': {
    label: 'Dayo — Half Day Request',
    resultLabel: 'DENIED',
    stampType: 'denied',
    noteText: "You denied the half day. Dayo attended the Thursday afternoon meeting. He was present in the technical sense. His LinkedIn now says 'Actively Exploring New Opportunities.' It said this by Friday evening.",
  },
};

// Outcome text per situation B value
export const situationBOutcomeText: Record<string, W3SituationBOutcome> = {
  'statement-full': {
    label: 'Craig — Grievance Statement',
    resultLabel: 'FULL STATEMENT',
    stampType: 'approved',
    noteText: "You submitted a full statement including Ben's original report. HR acknowledged receipt. Craig has stopped saying good morning. Ben knows his name is in the document. He thanked you. He looked tired.",
  },
  'statement-minimal': {
    label: 'Craig — Grievance Statement',
    resultLabel: 'MINIMAL STATEMENT',
    stampType: 'denied',
    noteText: "You submitted a minimal statement. Ben's name isn't in it. Craig's grievance is still active. The matter is, in HR's words, 'ongoing.' You have a word for it too. It is a different word.",
  },
  'open-now': {
    label: 'Ben — Second Flag',
    resultLabel: 'INVESTIGATING',
    stampType: 'approved',
    noteText: "You opened the formal investigation. Craig was notified. He was not surprised, which is itself information. Ben forwarded you his log. It is meticulous. It covers six weeks. He has been doing this since the first email.",
  },
  'close-again': {
    label: 'Ben — Second Flag',
    resultLabel: 'CLOSED AGAIN',
    stampType: 'denied',
    noteText: "You told Ben to stop monitoring Craig's timesheets. He said 'okay.' He did not delete the log. You didn't ask him to delete the log. You both know where this ends.",
  },
  'close-stage1': {
    label: 'Rhonda — Stage 1 Review',
    resultLabel: 'CLOSED',
    stampType: 'approved',
    noteText: "You recommended closure of Rhonda's Stage 1. Carol accepted the recommendation. The flag remains on Rhonda's file — closure doesn't expunge it, just closes the process. Rhonda knows this. She said thank you anyway.",
  },
  'extend-stage1': {
    label: 'Rhonda — Stage 1 Review',
    resultLabel: 'EXTENDED',
    stampType: 'neutral',
    noteText: "You recommended an extension. The process continues. Rhonda's work remains improved. The process doesn't care about that yet.",
  },
  'escalate-stage2': {
    label: 'Rhonda — Stage 1 Review',
    resultLabel: 'STAGE 2',
    stampType: 'denied',
    noteText: "You recommended Stage 2. Carol processed it. Rhonda received the notification on Thursday. She did not come in her Friday morning. You noticed immediately.",
  },
  'document-informal': {
    label: 'Carol — HR Documentation',
    resultLabel: 'DOCUMENTED',
    stampType: 'approved',
    noteText: "You sent Carol the documentation. She replied within the hour: 'Perfect, thank you.' The offer to talk is still open. You haven't taken it up.",
  },
  'carol-chat': {
    label: 'Carol — HR Documentation',
    resultLabel: 'DOCUMENTED + CHAT',
    stampType: 'approved',
    noteText: "You sent Carol the retrospective note and took her up on the offer to talk. The conversation lasted 20 minutes. She said: 'You're doing better than you think.' You wrote this down. You're not sure why. You don't usually write things like that down.",
  },
};

// Outcome text per away day value
export const awayDayOutcomeText: Record<string, W3AwayDayOutcome> = {
  escalate: {
    resultLabel: 'ESCALATED (UNRESOLVED)',
    stampType: 'neutral',
    noteText: "You escalated the date conflict to Marcus. He said 'let's see.' The away day is still on the 15th. Three people have childcare problems on the 15th. The number has not changed.",
  },
  exempt: {
    resultLabel: 'EXEMPTIONS APPROVED',
    stampType: 'approved',
    noteText: "You approved exemptions for Rhonda, Dayo, and Ben. Marcus found out on Friday and asked for 'a quick chat next week.' The invite has no agenda. You are beginning to recognise this pattern.",
  },
  enforce: {
    resultLabel: 'ENFORCED',
    stampType: 'denied',
    noteText: "You enforced mandatory attendance. Rhonda, Dayo, and Ben made it work. You don't know what it cost them to make it work. You didn't ask. The policy didn't require you to ask.",
  },
};

// Verdict text — computed from morale vs leadership comparison and average
export function buildW3Verdict(morale: number, leadership: number, ops: number, policy: number): string {
  const avg = (morale + leadership + ops + policy) / 4;
  if (morale > leadership + 20) {
    return "Three weeks in. Your team would follow you somewhere, probably. Leadership is writing something about you in a document you'll never see. The two things are not compatible and you are in the middle of both of them. Hence the title.";
  }
  if (leadership > morale + 20) {
    return "Leadership thinks you're doing brilliantly. Two people on your team are actively interviewing. One of them you don't know about yet. The metrics look good. Metrics are very good at looking good.";
  }
  if (avg > 63) {
    return "You are, by most available measures, a reasonable manager in an unreasonable system. This is harder than it sounds and less recognised than it should be. D. Hartley would like you to know he's thinking of you. He is on a paddleboard. It is very sunny.";
  }
  return "Three weeks. You are still here. That is not nothing — it is, in fact, the whole thing. The system is the way it is. You are the way you are. The gap between those two facts is where the job lives. Welcome to the middle.";
}

export const w3SummaryFooter = `The Away Day is in two weeks. Brett has emailed to confirm the cold exposure element is "entirely optional." Marcus has forwarded this email with the message: "so excited for this one 🙌". The Policy Handbook has no section on cold exposure. D. Hartley left a Post-it on page 89 that says: "wear socks." Page 89 is about maternity leave. It's possible he knew.`;