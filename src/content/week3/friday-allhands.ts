import { Scene } from '../_types';
import { GameStore } from '../../store/types';

export const fridayAllHands: Scene = {
  id: 'w3-friday-allhands',
  screenType: 'meeting',
  content: (decisions: GameStore['decisions']) => ({
    dayBar: {
      label: 'Week 3 — Friday All-Hands, 09:00',
      dotsTotal: 5,
      dotsCurrent: [4],
      dotsDone: [0, 1, 2, 3],
    },
    meetingHeader: 'Friday All-Hands — Marcus Webb + Brett Callahan (dial-in)',
    transcript: [
      {
        speaker: 'Marcus',
        text: 'Morning! Big week. Lots happening. Before we get into it — Away Day reminders have gone out. Very excited. Brett is joining us today to preview the agenda. Brett!',
      },
      {
        speaker: 'Brett',
        text: "Hey team! Can everyone hear me okay? My video might be a bit — yeah, okay, audio only is fine. So — the Away Day. I want to paint a picture. You walk into the Meridian Suite. The energy is already different. We're going to do something I call a Human Edge Inventory — it's an individual diagnostic, takes about 45 minutes, completely confidential, results shared with your line manager.",
      },
      {
        speaker: 'You',
        handwritten: true,
        text: '[Brett has described a 45-minute confidential individual diagnostic whose results are shared with line managers. You sit with the grammatical relationship between "confidential" and "shared with your line manager." You do not raise this.]',
      },
      {
        speaker: 'Brett',
        text: 'Then a group exercise — I can\'t give too much away but it involves a physical challenge, some low-level problem solving, and what I call "productive discomfort." Lunch is included. Then an afternoon of breakouts around the five Ways of Working dimensions. Home by six, seven at the latest.',
      },
      {
        speaker: 'Kezia (Finance)',
        text: 'Seven pm on a Friday?',
      },
      {
        speaker: 'Brett',
        text: 'At the latest. Probably six. The productive discomfort session usually moves quickly once people lean in.',
      },
      {
        speaker: 'Kezia (Finance)',
        text: 'What does "productive discomfort" mean?',
      },
      {
        speaker: 'Brett',
        text: "It means — growth happens at the edge of comfort. It's not uncomfortable uncomfortable. It's productively uncomfortable. There's a difference.",
      },
      {
        speaker: 'Kezia (Finance)',
        text: 'Is it physical?',
      },
      {
        speaker: 'Marcus',
        text: "Kezia, we'll share the full agenda nearer the time! Brett, incredible preview, thank you. Team — any other questions? No? Amazing. Have a brilliant weekend, absolute legends the lot of you.",
      },
      // Dynamic block injected based on away_day_conflicts decision
      ...(decisions.away_day_conflicts === 'escalate'
        ? [{
            speaker: 'You',
            handwritten: true,
            text: '[You raised the date conflict with Marcus before this meeting. He said "let\'s see how many people it affects" and then did not follow up. Three people it affects are currently sitting in this meeting nodding along to Brett\'s agenda.]',
          }]
        : decisions.away_day_conflicts === 'exempt'
        ? [{
            speaker: 'You',
            handwritten: true,
            text: '[You approved exemptions for Rhonda, Dayo, and Ben under §7.3. Marcus has not acknowledged this. It\'s possible he doesn\'t know. It\'s possible he does and is choosing not to raise it in front of Brett. Both of these things are consistent with Marcus.]',
          }]
        : decisions.away_day_conflicts === 'enforce'
        ? [{
            speaker: 'You',
            handwritten: true,
            text: '[You told your team attendance was mandatory. Rhonda replied "of course." Dayo replied with a thumbs up emoji after a 40-minute gap. Ben replied "understood" in the same tone someone uses when they\'re writing something down.]',
          }]
        : []),
      {
        speaker: '—',
        small: true,
        text: "The meeting ends. You check the Apex Human Performance website. Under \"Productive Discomfort Sessions\" it says: \"Trust falls, cold exposure, and optional barefoot walking.\" There is a photo of Brett in a field. He is not wearing shoes. He looks very happy about this.",
      },
    ],
    continueLabel: 'End of Week 3 — Summary →',
    continueTarget: 'w3-summary',
  }),
};