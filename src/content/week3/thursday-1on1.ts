import { Branch } from '../_types';
import { GameStore } from '../../store/types';

// Branch 1 (highest priority): priya_leave === 'denied' → Priya exit 1:1
export const branchPriyaExit: Branch = {
  condition: (decisions: GameStore['decisions']) => decisions.priya_leave === 'denied',
  content: {
    header: 'Jordan Ellis / Priya Sharma — Exit 1:1 · Thu 31 Oct',
    personCard: {
      initial: 'P',
      avatarColour: 'teal',
      name: 'Priya Sharma',
      role: 'Senior Ops Analyst · Last day tomorrow',
      bio: 'Priya is composed. She has been composed all week. The composure is doing a lot of work.',
    },
    dialogue: [
      {
        speaker: 'Priya',
        text: "I've finished the handover notes. Everything's on the drive. I've flagged Sandra at Hartfield separately — she prefers a phone call to an email, just so whoever picks it up knows.",
      },
      {
        speaker: 'You',
        handwritten: 'How do you end this?',
        isChoice: true,
      },
    ],
    choices: [
      {
        key: 'priya-1',
        decisionValue: 'priya-1',
        label: '"I\'m really sorry about how the leave request went. I want you to know I didn\'t have a choice."',
      },
      {
        key: 'priya-2',
        decisionValue: 'priya-2',
        label: '"You\'ve been brilliant. I hope the next place knows what they\'re getting."',
      },
      {
        key: 'priya-3',
        decisionValue: 'priya-3',
        label: '"Is there anything I can do differently? For the team, I mean. Going forward."',
      },
    ],
    responses: {
      'priya-1': 'She pauses. "You did have a choice." She says it without anger. That\'s the worst version of that sentence. "But I understand the system you were in. Good luck, Jordan. I mean that."',
      'priya-2': 'She smiles — a real one, small. "They seem nice. Different kind of place." She closes her notebook. "Take care of the team." She means Dayo. You both know she means Dayo.',
      'priya-3': 'She thinks for a moment. Then: "Let people tell you things before they get to the point where they\'re putting it in a leave request." She stands up. "That\'s all."',
    },
    decision: {
      key: 'w3_1on1_response' as const,
      options: [
        { label: '"I\'m really sorry about how the leave request went. I want you to know I didn\'t have a choice."', value: 'priya-1', stampText: 'Said', stampType: 'neutral' as const, scoreDeltas: {} },
        { label: '"You\'ve been brilliant. I hope the next place knows what they\'re getting."', value: 'priya-2', stampText: 'Said', stampType: 'approved' as const, scoreDeltas: {} },
        { label: '"Is there anything I can do differently? For the team, I mean. Going forward."', value: 'priya-3', stampText: 'Said', stampType: 'approved' as const, scoreDeltas: {} },
      ],
    },
  },
};

// Branch 2: priya stayed AND energy_score <= 5 → Marcus check-in
export const branchMarcusCheckin: Branch = {
  condition: (decisions: GameStore['decisions']) =>
    decisions.priya_leave !== 'denied' &&
    parseInt(String(decisions.energy_score ?? '6')) <= 5,
  content: {
    header: 'Jordan Ellis / Marcus Webb — Check-in · Thu 31 Oct, 15:00',
    personCard: {
      initial: 'M',
      avatarColour: 'blue',
      name: 'Marcus Webb',
      role: 'VP, People Experience',
      bio: "Marcus has brought two coffees. He has also brought a printout of your energy score. It is face-down on the desk. He doesn't look at it during the meeting. You look at it the entire meeting.",
    },
    dialogue: [
      {
        speaker: 'Marcus',
        text: 'So — just wanted to check in. No agenda, as I said. How are you finding it? The role, the team, all of it. Be honest.',
      },
      {
        speaker: 'You',
        handwritten: 'He said be honest. The printout is face-down. What do you say?',
        isChoice: true,
      },
    ],
    choices: [
      {
        key: 'marcus-honest',
        decisionValue: 'marcus-honest',
        label: '"Honestly? It\'s been harder than I expected. The team is stretched and I still haven\'t had any management training."',
      },
      {
        key: 'marcus-fine',
        decisionValue: 'marcus-fine',
        label: '"It\'s going well. Busy, but that\'s the job."',
      },
      {
        key: 'marcus-question',
        decisionValue: 'marcus-question',
        label: '"Can I ask — what does the energy score actually affect? In terms of outcomes for my team?"',
      },
    ],
    responses: {
      'marcus-honest': 'Marcus nods slowly. "I hear that. I really do. The training — I\'m going to personally chase that this week. And the team stretch — let\'s put something in the diary to look at capacity properly. Week after next?"\n\n[The printout stays face-down. You leave with two new calendar invites and the faint, unverifiable feeling that something might actually happen. Historically, this feeling has not been reliable. But it\'s there.]',
      'marcus-fine': 'Marcus smiles. "That\'s the spirit." He flips the printout over and slides it into a folder without showing you. "You\'re doing great, Jordan. Really."\n\n[You have said you are fine. You are not sure whether you are fine. The printout is now in a folder. The meeting is over. You do not feel better.]',
      'marcus-question': 'Marcus opens his mouth. Closes it. Opens it again. "It feeds into the team-level Ways of Working profile, which informs Brett\'s recommendations, which feeds into the Q1 people strategy." A pause. "It\'s part of a holistic picture."\n\n[You have learned nothing except that Marcus uses "holistic" as a full stop.]',
    },
    decision: {
      key: 'w3_1on1_response' as const,
      options: [
        { label: '"Honestly? It\'s been harder than I expected. The team is stretched and I still haven\'t had any management training."', value: 'marcus-honest', stampText: 'Honest', stampType: 'approved' as const, scoreDeltas: {} },
        { label: '"It\'s going well. Busy, but that\'s the job."', value: 'marcus-fine', stampText: 'Fine', stampType: 'neutral' as const, scoreDeltas: {} },
        { label: '"Can I ask — what does the energy score actually affect? In terms of outcomes for my team?"', value: 'marcus-question', stampText: 'Asked', stampType: 'neutral' as const, scoreDeltas: {} },
      ],
    },
  },
};

// Branch 3: priya stayed AND energy > 5 AND ben_flag === 'formal' → Ben unscheduled
export const branchBenUnscheduled: Branch = {
  condition: (decisions: GameStore['decisions']) =>
    decisions.priya_leave !== 'denied' &&
    parseInt(String(decisions.energy_score ?? '6')) > 5 &&
    decisions.ben_flag === 'formal',
  content: {
    header: 'Jordan Ellis / Ben Osei — Unscheduled · Thu 31 Oct',
    personCard: {
      initial: 'B',
      avatarColour: 'purple',
      name: 'Ben Osei',
      role: 'Ops Analyst · 1 year',
      bio: "Ben asked for five minutes. He's been standing outside your office for three of them.",
    },
    dialogue: [
      {
        speaker: 'Ben',
        text: '"I heard Craig put in a grievance. I don\'t know details but — is this because of what I told you? I didn\'t think it would go this far. I\'m worried I\'ve made things really bad for you."',
      },
      {
        speaker: 'You',
        handwritten: 'Ben came to you in good faith. He\'s 24. He is visibly frightened.',
        isChoice: true,
      },
    ],
    choices: [
      {
        key: 'ben-reassure',
        decisionValue: 'ben-reassure',
        label: '"You did the right thing. This is on Craig, not you. I\'ll handle it."',
      },
      {
        key: 'ben-honest',
        decisionValue: 'ben-honest',
        label: '"I can\'t discuss the details. But I want you to know your position is secure."',
      },
      {
        key: 'ben-regret',
        decisionValue: 'ben-regret',
        label: '"I probably should have handled it differently. But that\'s my problem, not yours."',
      },
    ],
    responses: {
      'ben-reassure': 'Ben exhales. He looks younger than usual, which you didn\'t think was possible. "Okay. Okay. I\'m sorry. I just — I didn\'t want to cause problems." He leaves. You sit with the word "handle."',
      'ben-honest': 'He nods. He looks slightly less frightened, which is the best available outcome. "Thank you. I appreciate you saying that." He leaves. He checks behind him before he goes. Old habit, or new one — you can\'t tell.',
      'ben-regret': 'He blinks. "No, it\'s — you didn\'t do anything wrong. I did the right thing, I think. I\'m just not used to it." He goes. You sit with the fact that a 24-year-old just reassured you, and that he was right to.',
    },
    decision: {
      key: 'w3_1on1_response' as const,
      options: [
        { label: '"You did the right thing. This is on Craig, not you. I\'ll handle it."', value: 'ben-reassure', stampText: 'Reassured', stampType: 'approved' as const, scoreDeltas: {} },
        { label: '"I can\'t discuss the details. But I want you to know your position is secure."', value: 'ben-honest', stampText: 'Honest', stampType: 'neutral' as const, scoreDeltas: {} },
        { label: '"I probably should have handled it differently. But that\'s my problem, not yours."', value: 'ben-regret', stampText: 'Acknowledged', stampType: 'neutral' as const, scoreDeltas: {} },
      ],
    },
  },
};

// Branch 4 (fallback): Rhonda check-in
export const branchRhondaCheckin: Branch = {
  condition: (decisions: GameStore['decisions']) =>
    decisions.priya_leave !== 'denied' &&
    parseInt(String(decisions.energy_score ?? '6')) > 5 &&
    decisions.ben_flag !== 'formal',
  content: {
    header: 'Jordan Ellis / Rhonda Takács — Check-in · Thu 31 Oct',
    personCard: {
      initial: 'R',
      avatarColour: 'slate',
      name: 'Rhonda Takács',
      role: 'Ops Coordinator · 2 years',
      bio: "Rhonda's work has been better this week. She knows you've noticed because you told her so in a Tuesday email, which was three words — \"great work Rhonda\" — but which she replied to with \"thank you, means a lot.\" That exchange is the thing you feel best about this week.",
    },
    dialogue: [
      {
        speaker: 'Rhonda',
        text: '"My mum came home from hospital on Monday. She\'s okay. I just — I wanted to say thank you. For how you handled things."',
      },
      {
        speaker: 'You',
        handwritten: "She's thanking you. Whatever you did, she's thanking you for it.",
        isChoice: true,
      },
    ],
    choices: [
      {
        key: 'rhonda-warm',
        decisionValue: 'rhonda-warm',
        label: '"I\'m so glad she\'s home. You don\'t need to thank me — just look after yourself."',
      },
      {
        key: 'rhonda-practical',
        decisionValue: 'rhonda-practical',
        label: '"Really glad to hear it. And the work this week has been great — genuinely."',
      },
    ],
    responses: {
      'rhonda-warm': 'She nods. Gathers her things. At the door: "The Stage 1 thing — I know it\'s on my file. I\'m not angry about it. I just wanted you to know that." She leaves. You look at the file. You look at it for a while.',
      'rhonda-practical': '"It helps. Having something normal to do." She half-smiles. "See you tomorrow." She goes. It\'s a small thing. Most of the things that matter are small things, you\'re starting to notice.',
    },
    decision: {
      key: 'w3_1on1_response' as const,
      options: [
        { label: '"I\'m so glad she\'s home. You don\'t need to thank me — just look after yourself."', value: 'rhonda-warm', stampText: 'Warm', stampType: 'approved' as const, scoreDeltas: {} },
        { label: '"Really glad to hear it. And the work this week has been great — genuinely."', value: 'rhonda-practical', stampText: 'Practical', stampType: 'approved' as const, scoreDeltas: {} },
      ],
    },
  },
};

// Priority order: Priya exit > Marcus check-in > Ben unscheduled > Rhonda check-in
// branchResolver evaluates conditions in this order and returns first match
export const thursdayOneOnOneBranches: Branch[] = [
  branchPriyaExit,
  branchMarcusCheckin,
  branchBenUnscheduled,
  branchRhondaCheckin,
];