import { Scene } from '@/content/_types';

// Brett Callahan enters the world via this email (Ways of Working tab) in the inbox
// and appears in person at this Friday all-hands.

export const brettCallahanEmail = {
  from: 'brett.callahan@apexhumanperformance.com',
  to: 'jordan.ellis@pembrook.com (via marcus.webb)',
  date: 'Wednesday, 11:30',
  re: 'Your Ways of Working Self-Assessment — DUE THURSDAY',
  body: `Hi Jordan,

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
};

export const fridayAllhands: Scene & {
  meetingHeader: string;
  transcript: Array<{
    speaker: string;
    text: string;
    isHandwritten?: boolean;
    isSmall?: boolean;
  }>;
  closingNote: string;
} = {
  id: 'w2-friday-allhands',
  type: 'meeting',
  dayLabel: 'Week 2 — Friday All-Hands, 09:00',
  dayDots: ['done', 'done', 'done', 'done', 'current'],
  meetingHeader:
    'Friday All-Hands — Brett Callahan, Apex Human Performance | Ways of Working Findings',
  transcript: [
    {
      speaker: 'Marcus',
      text: 'Morning everyone! Huge week. Really huge. We have a very special guest — Brett from Apex has come in to share some early findings from the Ways of Working audit. I\'ve had a sneak peek and there are some really powerful insights. Brett, over to you.',
    },
    {
      speaker: 'Brett',
      text: "Thanks Marcus. Hi everyone! So — Pembrook. What a company. What a culture. The energy in this building is genuinely something. I've worked with a lot of organisations and I can tell you: you've got something here. Something real. We're calling it your Human Edge.",
    },
    {
      speaker: 'You',
      isHandwritten: true,
      text: '[Brett has a slide behind him. It has a triangle on it. It is the same triangle as on Marcus\'s whiteboard. In the middle it says "HUMAN EDGE™." You look at Marcus. Marcus nods. This is going well.]',
    },
    {
      speaker: 'Brett',
      text: "The self-assessment data is preliminary, but some clear themes are emerging. Across teams, Output and Resilience are strong. Collaboration is — there's room there. And Energy varies. Some teams are really firing. Others are in what we call a Vitality Deficit. That's not a bad thing — it's a diagnostic. It's information.",
    },
    {
      speaker: 'You',
      isHandwritten: true,
      text: "You realise your energy score is now visible, team-by-team, on a slide. Brett has used a bar chart. Your team's bar is visible. It is next to Dan Kowalski's team's bar. Dan Kowalski's team scored a 9. Dan Kowalski's team includes Yemi, who has been here four days and whose laptop only started working yesterday. You take a breath.",
    },
    {
      speaker: 'Kezia (Finance)',
      text: "Brett, quick question — how was Energy defined for the purposes of the self-assessment?",
    },
    {
      speaker: 'Brett',
      text: "Great question. Energy is the vitality dimension — it's about forward momentum, presence, the intangible spark that high-performing teams have. Respondents were asked to score intuitively.",
    },
    {
      speaker: 'Kezia (Finance)',
      text: "So it's a feeling.",
    },
    {
      speaker: 'Brett',
      text: "It's a — it's a calibrated intuitive benchmark.",
    },
    {
      speaker: 'Kezia (Finance)',
      text: "Right. And the culture budget — is there scope in the Apex engagement to address why the culture budget was cut?",
    },
    {
      speaker: 'Brett',
      text: "That's a great area for a phase two scoping conversation, absolutely—",
    },
    {
      speaker: 'Marcus',
      text: "Okay! Lots to digest. Brett will be circulating the full report next week. Really exciting stuff. Have an amazing weekend everyone, you absolute legends.",
    },
    {
      speaker: '—',
      isSmall: true,
      text: "You check the invoice total for Apex Human Performance on the company portal, which you have access to by accident following a permissions error in August that IT has not fixed. The invoice is £47,500. The report is 34 pages. Page 1 is a cover page. Page 2 is a contents page. Page 34 is Brett's bio, which mentions his TED talk. You close the portal.",
    },
  ],
  closingNote: 'End of Week 2.',
};