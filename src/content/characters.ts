// src/content/characters.ts

export interface Character {
  id: string;
  name: string;
  role: string;
  bio: string;
  avatarColour: string;
  initial: string;
}

export const characters: Record<string, Character> = {
  jordan: {
    id: 'jordan',
    name: 'Jordan Ellis',
    role: 'Team Lead, Ops',
    bio: 'Newly promoted. Defined entirely by decisions.',
    avatarColour: '#4A5568',
    initial: 'J',
  },
  marcus: {
    id: 'marcus',
    name: 'Marcus Webb',
    role: 'VP, People Experience',
    bio: 'Clueless but not malicious. Certified Gallup Strengths Coach. He/Him.',
    avatarColour: '#2B4A8C',
    initial: 'M',
  },
  priya: {
    id: 'priya',
    name: 'Priya Sharma',
    role: 'Senior Ops Analyst · 6 years',
    bio: 'Highest performer on the team. Quiet, meticulous. Sends you her deliverables before you ask. Has never taken unplanned leave.',
    avatarColour: '#1A6B6B',
    initial: 'P',
  },
  craig: {
    id: 'craig',
    name: 'Craig Holloway',
    role: 'Ops Coordinator · 11 years',
    bio: 'Been here longer than the current IT system. Technically adequate. Protective of his calendar. Has a signed photo of the previous CEO on his desk, which nobody has asked about.',
    avatarColour: '#8C5B1A',
    initial: 'C',
  },
  dayo: {
    id: 'dayo',
    name: 'Dayo Okafor',
    role: 'Ops Analyst · 3 years',
    bio: 'Cheerful, fast, occasionally overconfident. Runs the team\'s unofficial WhatsApp group. Brings in birthday cake for everyone including people whose birthdays he\'s guessed.',
    avatarColour: '#1A6B3A',
    initial: 'D',
  },
  rhonda: {
    id: 'rhonda',
    name: 'Rhonda Takács',
    role: 'Ops Coordinator · 2 years',
    bio: 'Solid mid-performer. Lately her outputs have slipped — deadlines missed by small margins, unusual for her. Hasn\'t said anything. You haven\'t asked.',
    avatarColour: '#4A5568',
    initial: 'R',
  },
  ben: {
    id: 'ben',
    name: 'Ben Osei',
    role: 'Ops Analyst · 1 year',
    bio: 'Conscientious, nervous. Keeps his head down and his work tidy.',
    avatarColour: '#5B2B8C',
    initial: 'B',
  },
  yemi: {
    id: 'yemi',
    name: 'Yemi Adeyemi',
    role: 'Junior Analyst (Customer Success, borrowed)',
    bio: 'Comic relief with genuine heart. Recently started. Has strong opinions about the handbook.',
    avatarColour: '#8C2B2B',
    initial: 'Y',
  },
  diana: {
    id: 'diana',
    name: 'Diana Osei',
    role: 'Director of Operations',
    bio: 'Arrives Week 5 from Group HQ. Sharp, fair, and appears to have actually read things before meetings.',
    avatarColour: '#2B4A8C',
    initial: 'D',
  },
  carol: {
    id: 'carol',
    name: 'Carol Hutchins',
    role: 'HR Business Partner',
    bio: 'Competent, humane, constrained.',
    avatarColour: '#4A5568',
    initial: 'C',
  },
  brett: {
    id: 'brett',
    name: 'Brett Callahan',
    role: 'Apex Human Performance',
    bio: 'Keynote speaker. Has a TED talk. Physically appears in Weeks 4 and 8.',
    avatarColour: '#8C5B1A',
    initial: 'B',
  },
  kezia: {
    id: 'kezia',
    name: 'Kezia (Finance)',
    role: 'Finance — All-Hands Regular',
    bio: 'Asks the questions nobody else will. Running joke with teeth.',
    avatarColour: '#5B2B8C',
    initial: 'K',
  },
  dave: {
    id: 'dave',
    name: 'Dave (IT)',
    role: 'IT Support',
    bio: 'Peripheral. Witnessed the microwave incident. Slightly frightened of Yemi.',
    avatarColour: '#4A5568',
    initial: 'D',
  },
  dHartley: {
    id: 'dHartley',
    name: 'D. Hartley',
    role: 'HR Business Partner (former) · Retired, Bahamas',
    bio: 'Author of the Policy Handbook. Won £2.3 million on a EuroMillions Lucky Dip six weeks after leaving Pembrook. Has not responded to Marcus\'s LinkedIn messages.',
    avatarColour: '#1A6B3A',
    initial: 'H',
  },
};