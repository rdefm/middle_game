// src/content/week1/monday-memo.ts

import type { Scene } from '../_types';

const mondayMemo: Scene = {
  id: 'w1-monday-memo',
  type: 'memo',
  day: 'Monday',
  docHeader: {
    companyName: 'Pembrook Solutions — Internal Comms',
    docType: 'MEMO\nPriority: High',
  },
  emailMeta: {
    to: 'All Team Leads, Operations',
    from: 'Marcus Webb, VP People Experience',
    date: 'Monday 14 Oct, 08:03',
    re: 'Q4 Visibility Initiative — Action Required',
  },
  body: `Hi Team Leads,

Exciting news. Following last quarter's engagement survey (participation: 31%, which Marcus described in his summary as "strong early signal"), the Leadership Team has identified a key opportunity area: visibility.

Effective immediately, all team members are asked to submit a brief "Weekly Win" to their Team Lead by COB Friday. This should be 2–3 sentences describing a positive contribution they made that week. It should be upbeat. Marcus has used the word "upbeat" three times in the briefing document, which is itself described as "a quick read" and is eleven pages long.

Team Leads will compile these into a single document and submit to me by EOD Friday. I will then read them over the weekend and select highlights for the Monday all-hands. This is not optional. The reading-them-over-the-weekend part is optional for me, not for you.

This is in addition to existing Friday reporting.

The purpose of this initiative is to help leadership understand the brilliant work happening on the ground. It is not, Marcus has stressed, about surveillance. He stressed this unprompted.

Also: please note that the Q4 Morale Dashboard is nearly ready. It will track team sentiment in real time using an algorithm. When asked what algorithm, Marcus said "a good one."

Participation is voluntary. However, non-participation will be noted.

Thanks for your continued excellence,
Marcus

Marcus Webb | VP, People Experience | Certified Gallup Strengths Coach | He/Him
"People are our greatest asset." — Pembrook Solutions Annual Report 2022, 2023, 2024*

*2024 report pending board approval. Quote subject to change.`,
  policyBox: {
    section: '§8.2',
    title: 'Policy Handbook §8.2 — Team Lead Obligations',
    text: 'Team Leads may not delegate mandatory reporting tasks to team members without prior written approval from their line manager. This includes but is not limited to: weekly KPI submissions, incident reports, morale surveys, and — as of this paragraph, which the author added after a particularly bad Thursday — any document that leadership has described as \'just a quick thing.\'\n\nIf you are reading this section because someone has asked you to do something that feels like three jobs disguised as one job: yes. That is what this is. You still have to do it.\n\n— §8.2, Employee Handbook (D. Hartley, 2019)',
  },
  footnote: 'This will take approximately 45 minutes of your time on Friday. You currently have 2.5 hours of unallocated capacity on Friday, which is also when your performance reviews are due, which Marcus knows, because he approved your Q4 calendar in September.',
};

export default mondayMemo;