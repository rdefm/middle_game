// src/content/week1/monday-meeting.ts

import type { Scene } from '../_types';

const mondayMeeting: Scene = {
  id: 'w1-monday-meeting',
  type: 'meeting',
  day: 'Monday — All-Hands, 09:30',
  meetingHeader: 'Pembrook Solutions — Weekly All-Hands | Transcript excerpt',
  transcript: [
    {
      speaker: 'Marcus',
      text: 'Morning everyone. Really great energy in the room. Incredible. So, Q3 numbers — we hit 94% of target, which leadership is calling a win. I\'m calling it a win. It\'s a win. Massive thanks to the ops team for that.',
    },
    {
      speaker: 'You',
      text: '[You note that Q3 ops target was quietly reduced by 12% in August following a "strategic recalibration" that nobody announced. 94% of a reduced target is not, mathematically, the same number as last year. You say nothing. There are twenty-three people in this meeting.]',
      isHandwritten: true,
    },
    {
      speaker: 'Marcus',
      text: 'Now, I know there\'s been some noise around the headcount freeze. I want to be super transparent here. The freeze is a strategic pause. It\'s not a cut. It\'s not even a stop. It\'s a... considered moment of intentional non-hiring. We\'re being thoughtful. Thoughtfulness takes time. That\'s what makes it thoughtful.',
    },
    {
      speaker: 'Marcus',
      text: 'We do have one open position in Ops — Tariq\'s old role. That will be filled. The hiring process will kick off imminently. Jordan, you\'re covering that in the interim, yes?',
    },
    {
      speaker: 'You',
      text: '[This is the first you\'ve heard of this. Tariq left six weeks ago. You have been informally covering his work for six weeks without anyone saying so out loud, which is perhaps the most Pembrook thing that has ever happened.]',
      isHandwritten: true,
      speech: 'Sure, Marcus.',
    },
    {
      speaker: 'Marcus',
      text: 'Brilliant. Love the attitude. And final thing — the Weekly Win initiative, did everyone get my email? Forty-seven people have already opened it, I can see that in Outlook, which I just want to put out there. Anyway. This is going to be transformational for visibility. Any questions?',
    },
    {
      speaker: 'Kezia (Finance)',
      text: 'Yes — what happened to the culture budget? We were told in July that team social events would be funded in Q4 and now the portal says—',
    },
    {
      speaker: 'Marcus',
      text: 'Great question. That\'s being looked at. Anyone else? No? Brilliant. Have an incredible week, everyone, you are all genuinely amazing.',
    },
    {
      speaker: '—',
      text: 'The meeting ends 11 minutes early. Marcus leaves immediately, already on his phone. There is a plate of pastries that nobody touches. Later you will learn they were ordered by Marcus\'s EA for a different meeting that was cancelled. They will sit on the table until Wednesday, at which point Dave from IT will eat all of them in one go and feel terrible about it.',
      isSmall: true,
      isItalic: true,
    },
  ],
  warnBox: 'You are now formally covering Tariq\'s role in addition to your own. No additional resource has been allocated. Your KPI targets have not changed. A calendar invite has arrived from Marcus titled "Quick Sync — Jordan Capacity Check" scheduled for Week 7. Week 7 is in six weeks. Tariq\'s role covers 40% of your current workload.',
};

export default mondayMeeting;