// src/content/week1/thursday-1on1.ts

import type { Scene, Decision, DecisionOption } from '../_types';

export const thursday1on1: Scene = {
  id: 'w1-thursday-1on1',
  type: '1on1',
  day: 'Thursday — 1:1, 14:00',
  docHeader: {
    companyName: 'Pembrook — 1:1 Notes',
    docType: 'Jordan Ellis / Priya Sharma\nThu 17 Oct, 14:00',
  },
  personCard: {
    characterId: 'priya',
    name: 'Priya Sharma',
    role: 'Senior Ops Analyst · 6 years',
    bio: 'Priya arrived two minutes early, which is normal. She has a coffee. She hasn\'t touched it.',
    avatarColour: '#1A6B6B',
    initial: 'P',
  },
  openingLine: {
    speaker: 'Priya',
    text: 'Thanks for making time. I know you\'re stretched.',
  },
  prompt: 'How do you respond?',
};

export const priya1on1Decision: Decision = {
  key: 'priya_1on1_response',
  label: 'Priya 1:1 — Your response',
  options: [
    {
      value: 'how_are_you',
      label: '"Of course. How are you doing?"',
      variant: 'neutral',
      stampText: '',
      scoreDeltas: {
        morale: 0,
        leadership: 0,
        ops: 0,
        policy: 0,
      },
    },
    {
      value: 'leave_decision',
      label: '"No problem. Did you get my decision on the leave request?"',
      variant: 'neutral',
      stampText: '',
      scoreDeltas: {
        morale: 0,
        leadership: 0,
        ops: 0,
        policy: 0,
      },
    },
    {
      value: 'q4_handover',
      label: '"I wanted to talk about the Q4 handover actually."',
      variant: 'neutral',
      stampText: '',
      scoreDeltas: {
        morale: 0,
        leadership: 0,
        ops: 0,
        policy: 0,
      },
    },
  ] as DecisionOption[],
};

// Priya's responses to each choice
export const priya1on1Responses: Record<string, string> = {
  how_are_you: 'She pauses. "Honestly? A bit tired. But that\'s not a you problem."',
  leave_decision: '"Yes, I got it." She says it evenly. You cannot tell if she\'s fine or not.',
  q4_handover: '"Of course." She opens her laptop. You notice she closes a tab before turning the screen.',
};

// Priya's follow-on dialogue (always delivered after the response)
export const priyaFollowOn = {
  text: 'I appreciate you letting me know either way. I just — it\'s my dad. He\'s not well. I didn\'t want to make it a whole thing.',
  stage: '[She looks at her coffee.]',
  close: 'Anyway. I\'m fine. Everything\'s under control.',
};

// Leave outcome text shown at end of 1:1, based on prior priya_leave decision
export const priyaLeaveOutcome: Record<string, { type: 'policy' | 'warn'; title: string; text: string }> = {
  approved: {
    type: 'policy',
    title: 'Her leave was approved',
    text: 'She nods. "Thank you. It means a lot." She doesn\'t say more. You don\'t push.',
  },
  denied: {
    type: 'warn',
    title: 'Her leave was denied',
    text: 'She nods. "Understood." She smiles in the way people smile when they are managing something you can\'t see. The coffee is cold now.',
  },
};