import { Scene } from '@/content/_types';

export const thursdayCraig1on1: Scene & {
  personCard: {
    initial: string;
    avatarColour: string;
    name: string;
    role: string;
    bio: string;
  };
  dialogue: {
    opening: { speaker: string; text: string };
    prompt: string;
    choices: Array<{
      value: string;
      label: string;
      response: { first: string; follow: string };
    }>;
  };
  closingHandwritten: string;
} = {
  id: 'w2-thursday-craig-1on1',
  type: 'oneOnOne',
  dayLabel: 'Week 2 — Thursday, 14:00',
  dayDots: ['done', 'done', 'done', 'current', 'empty'],
  header: {
    companyName: 'Pembrook — 1:1 Notes',
    docType: 'Jordan Ellis / Craig Holloway\nThu 24 Oct, 14:00',
  },
  personCard: {
    initial: 'C',
    avatarColour: 'orange',
    name: 'Craig Holloway',
    role: 'Ops Coordinator · 11 years',
    bio: 'Craig arrived exactly on time, which is unusual. He has brought his own coffee. He seems relaxed in the way that people seem relaxed when they have decided to seem relaxed.',
  },
  dialogue: {
    opening: {
      speaker: 'Craig',
      text: "How's it going? You settling in alright? Big job, this, for someone new to it. No offence.",
    },
    prompt: 'How do you play this?',
    choices: [
      {
        value: 'professional',
        label: '"It\'s going well. I wanted to check in about a couple of things."',
        response: {
          first:
            '"Yeah, things are going well." He drinks his coffee. He is waiting.',
          follow:
            "You bring up the timesheet discrepancy. Craig says: \"Ah, yeah — I was working from home those days. Must've not logged it properly. I'll sort it.\" He says this in the way someone says something they've prepared to say. You cannot tell if it's true. He probably can't tell if you believe it.",
        },
      },
      {
        value: 'deflect',
        label: '"Fine thanks. Busy week. How are you finding things?"',
        response: {
          first:
            '"Not bad, not bad. Busy. You know how it is." He relaxes slightly. He was expecting something else.',
          follow:
            "The 1:1 continues. The timesheet issue sits in your notebook, unraised. Craig tells you about a process improvement idea he's had for three years that nobody has actioned. It is, genuinely, a good idea. You leave feeling two things at once.",
        },
      },
      {
        value: 'direct',
        label: '"Actually, Craig — I need to ask you about the 9th and 14th."',
        response: {
          first:
            'A pause. Not long. Craig puts his coffee down.\n\n"What about them?"',
          follow:
            "You explain what Ben flagged. Craig doesn't deny it immediately, which is interesting. He says he was dealing with a family thing he didn't want to put through HR. His voice is steady but his jaw isn't. You have no way of knowing if this is true. The policy handbook has a section on this. It does not help.",
        },
      },
    ],
  },
  closingHandwritten:
    '[The 1:1 ends. Craig leaves. You sit for a moment. The signed photo of the previous CEO watches you from Craig\'s desk across the open plan.]',
  decision: {
    key: 'craig_1on1_response',
    prompt: 'How do you play this?',
    options: [
      {
        value: 'professional',
        label: '"It\'s going well. I wanted to check in about a couple of things."',
        variant: 'neutral',
        stampText: 'Raised',
        scoreDeltas: { leadership: 0, morale: 0, policy: 0, ops: 0 },
      },
      {
        value: 'deflect',
        label: '"Fine thanks. Busy week. How are you finding things?"',
        variant: 'neutral',
        stampText: 'Deferred',
        scoreDeltas: { leadership: 0, morale: 0, policy: 0, ops: 0 },
      },
      {
        value: 'direct',
        label: '"Actually, Craig — I need to ask you about the 9th and 14th."',
        variant: 'neutral',
        stampText: 'Direct',
        scoreDeltas: { leadership: 0, morale: 0, policy: 0, ops: 0 },
      },
    ],
  },
};