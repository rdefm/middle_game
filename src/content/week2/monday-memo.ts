import { Scene } from '@/content/_types';

export const mondayMemo: Scene = {
  id: 'w2-monday-memo',
  type: 'memo',
  dayLabel: 'Week 2 — Monday, 09:00',
  dayDots: ['current', 'empty', 'empty', 'empty', 'empty'],
  header: {
    companyName: 'Pembrook Solutions — Internal Comms',
    docType: 'MEMO\nWeek 43',
  },
  emailMeta: {
    to: 'jordan.ellis@pembrook.com',
    from: 'marcus.webb@pembrook.com',
    date: 'Monday 21 Oct, 08:51',
    re: 'This morning! Quick thing. Also a couple of other things.',
  },
  body: `Jordan!

A few things before we catch up at 9 — just flagging so you're not blindsided (ha).

1. Ways of Working Audit
Leadership has commissioned Apex Human Performance Ltd to run a company-wide Ways of Working audit. This is very exciting. Apex came highly recommended and their proposal was compelling. I can't share the cost but I will say: it reflected the quality of their thinking. Each Team Lead will need to complete a self-assessment by Thursday. More details to follow. No prep needed for today's chat.

2. Yemi Adeyemi — Onboarding
Yemi joins today as Junior Analyst (Customer Success, Dan Kowalski's team). Dan is currently overwhelmed — his word, in a very long email that I've summarised as "overwhelmed" — so I've asked if you could handle Yemi's first week onboarding. You're not her line manager. This is just a pastoral thing. A human thing. You're good at human things, Jordan.

She starts at 9:30. Her access credentials, desk assignment, and equipment requisition are all "in progress" according to IT. Dave says "probably by Wednesday."

3. Management Training
I can see you've submitted another request for the New Manager Essentials programme. Budget's still being confirmed. Really hoping to get this sorted for you in Q1. You're doing amazingly without it, honestly — natural instinct.

See you at 9!
Marcus`,
  policyBox: {
    heading: 'Policy Handbook §3.1 — Onboarding (D. Hartley, 2019)',
    body: `"New employees must be assigned a named onboarding buddy from their own team, with a confirmed desk, working equipment, and system access on day one. I wrote this policy after watching seventeen consecutive new starters spend their first day sitting in reception eating a complimentary Pembrook biscuit (oat and raisin) and filling in emergency contact forms.

If you are onboarding someone without the correct equipment, access, or desk: this is not their problem to manage gracefully. It is a failure of process that has been handed to you to absorb. I note this not because it will change anything but because someone should say it.

You have submitted 3 requests for management training. Status: Pending. I know. I'm sorry. — D.H."`,
  },
  footnote:
    'You have been a Team Lead for two weeks. You have managed seven people, covered a vacant role, onboarded nobody, and received no training. You are now also responsible for someone else\'s new starter. Your lanyard still does not match your colleagues\'. Nobody has explained this.',
};