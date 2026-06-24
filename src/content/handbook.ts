// src/content/handbook.ts

export interface HandbookEntry {
  section: string;
  title: string;
  text: string;
}

export const handbook: Record<string, HandbookEntry> = {
  '§1.1': {
    section: '§1.1',
    title: 'A Note from the Author',
    text: 'Welcome to the Pembrook Solutions Policy Handbook. This document exists because people cannot, apparently, be trusted to behave like adults without being told to in writing. If you are reading this because something has gone wrong, I am sorry, but also: I did warn them. I warned them several times.\n\nThe policies below represent the considered view of HR as of March 2019. Whether HR\'s view is worth considering is a question I leave to the reader. I will say only this: I have written this handbook with complete knowledge of how it will be used, by whom, and with what results. I cannot explain how I know this. The microwave in the third-floor kitchenette should be inspected by a qualified engineer. That is all.\n\nGood luck. You will need it on Week 2 especially.\n\n— D. Hartley, HR Business Partner (former). Currently: retired.',
  },

  '§3.1': {
    section: '§3.1',
    title: 'Onboarding',
    text: 'New employees must be assigned a named onboarding buddy from their own team, with a confirmed desk, working equipment, and system access on day one. I wrote this policy after watching seventeen consecutive new starters spend their first day sitting in reception eating a complimentary Pembrook biscuit (oat and raisin) and filling in emergency contact forms.\n\nIf you are onboarding someone without the correct equipment, access, or desk: this is not their problem to manage gracefully. It is a failure of process that has been handed to you to absorb. I note this not because it will change anything but because someone should say it.\n\nYou have submitted 3 requests for management training. Status: Pending. I know. I\'m sorry. — D.H.',
  },

  '§4.1': {
    section: '§4.1',
    title: 'Annual Leave',
    text: 'Requests must be submitted a minimum of 14 days in advance. This is non-negotiable, except when it is negotiable, which is at Team Lead discretion, which is why I\'m writing it down so there\'s a record of me telling you it\'s your call.\n\n\'Exceptional circumstances\' may be invoked by the Team Lead to approve short-notice requests. The handbook does not define exceptional circumstances because, frankly, if you can\'t recognise an exceptional circumstance when it\'s sitting in front of you, a definition isn\'t going to help.\n\nCurrent operational cover for 21–25 Oct: Adequate, provided one senior analyst remains present. Whether adequacy is a sufficient standard of care is left as an exercise for the reader.',
  },

  '§4.1c': {
    section: '§4.1(c)',
    title: 'Legacy Entitlements',
    text: 'Employees with 10+ years of continuous service retain rights under the 2013 Employment Terms unless explicitly renegotiated. I would like it noted for the record that I flagged in 2019 that these legacy contracts needed reviewing. I flagged it twice. The relevant VP said it was \'on the radar.\' It was not on the radar.\n\nSection 12 of any pre-2014 contract states annual leave may be taken with 5 working days\' notice, at Team Lead discretion. This means Craig, specifically, can do this. Yes, I know. I\'m sorry.',
  },

  '§5.3': {
    section: '§5.3',
    title: 'Flexible Working',
    text: 'Maximum 2 remote days per week for Ops Analysts. Exceptions require VP sign-off. I have included this rule because it was in the brief. I do not personally believe that where someone sits affects the quality of their thinking, but I was outvoted by people who believe that eye contact builds culture, and here we are.\n\nFor the avoidance of doubt: Marcus Webb has denied all three flexible working exception requests submitted this quarter. His stated reason was \'presence.\' I looked up whether \'presence\' is a legally sufficient reason to deny a flexible working request. It is not.',
  },

  '§8.2': {
    section: '§8.2',
    title: 'Team Lead Obligations',
    text: 'Team Leads may not delegate mandatory reporting tasks to team members without prior written approval from their line manager. This includes but is not limited to: weekly KPI submissions, incident reports, morale surveys, and — as of this paragraph, which the author added after a particularly bad Thursday — any document that leadership has described as \'just a quick thing.\'\n\nIf you are reading this section because someone has asked you to do something that feels like three jobs disguised as one job: yes. That is what this is. You still have to do it.\n\n— §8.2, Employee Handbook (D. Hartley, 2019)',
  },

  '§9.1': {
    section: '§9.1',
    title: 'Performance Management',
    text: 'Three missed deadlines within a 6-week period constitutes a formal performance trigger. The Team Lead must initiate a Stage 1 Performance Conversation within 10 working days and document the outcome in the HR portal.\n\nI want to be clear about what Stage 1 means: it is the beginning of a formal paper trail. It does not mean someone is about to be fired. It does mean that if you ever want to fire them, this is now in their file, permanently, regardless of what happens next. Please think carefully before initiating Stage 1 for someone who has missed three deadlines for reasons you do not yet know.\n\nI am legally required to write this policy. I am not legally required to pretend it\'s a good idea in every situation. — D. Hartley',
  },

  '§2.7': {
    section: '§2.7',
    title: 'Account Redistribution',
    text: 'Accounts should be redistributed equitably across available capacity. Where capacity is already at or above 90%, the Team Lead should escalate to their line manager to request temporary resource.\n\nI want to be very clear: escalating to Marcus about resource will result in Marcus saying \'let\'s keep an eye on it.\' This is not resource. It is the word resource used as a substitute for resource. You will still have to make a decision. — D.H.',
  },

  'page47': {
    section: 'page47',
    title: 'Post-it, page 47',
    text: 'not this one. trust your gut.',
  },
};