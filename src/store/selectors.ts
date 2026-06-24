import { GameStore, EndingType } from './types';
import { resolveEnding } from '../utils/endingResolver';

/**
 * Returns list of currently active narrative thread IDs.
 * Used by branchResolver and WeekSummaryScreen to surface relevant content.
 */
export const getActiveThreads = (
  decisions: GameStore['decisions']
): string[] => {
  const threads: string[] = [];

  // Craig grievance thread: active when ben_flag is 'formal'
  if (decisions.ben_flag === 'formal') {
    threads.push('craig_grievance');
  }

  // Rhonda Stage 1 thread: active when rhonda_performance is 'formal'
  if (decisions.rhonda_performance === 'formal') {
    threads.push('rhonda_stage1');
  }

  // Rhonda Stage 2 thread: active when situation_b is 'escalate-stage2'
  if (decisions.situation_b === 'escalate-stage2') {
    threads.push('rhonda_stage2');
  }

  // Ben follow-up thread: active when ben_flag is 'informal' and situation_b resolves ben route
  if (decisions.ben_flag === 'informal') {
    threads.push('ben_followup');
  }

  // Craig HR route: active when ben_flag was 'close' and carol-chat was chosen
  if (decisions.ben_flag === 'close') {
    threads.push('craig_carol_hr');
  }

  // Craig grievance closed/ongoing from situation_b
  if (
    decisions.situation_b === 'open-now' ||
    decisions.situation_b === 'statement-full' ||
    decisions.situation_b === 'statement-minimal'
  ) {
    if (!threads.includes('craig_grievance')) {
      threads.push('craig_grievance');
    }
  }

  // Dayo at-risk thread
  if (decisions.dayo_flex === 'denied') {
    threads.push('dayo_at_risk');
  }

  // Priya absent thread
  if (decisions.priya_leave === 'denied') {
    threads.push('priya_account_redistribution');
  }

  // Diana relationship thread
  if (decisions.diana_first_impression !== undefined) {
    threads.push('diana_relationship');
  }

  // Expense disclosure thread
  if (decisions.expense_email !== undefined) {
    threads.push('expense_disclosure');
  }

  return threads;
};

/**
 * Returns presence state for all named team members.
 * Used by WarRoomScreen to gate war-room options.
 *
 * Rules (from spec §2 Week 8 team capability notes and Chunk 2 instructions):
 *  - Priya: absent if priya_leave === 'denied'
 *  - Dayo: absent if dayo_flex === 'denied'; disengaged if situation_a === 'deny-dayo'
 *  - Rhonda: present (unless Stage 2 → disengaged); supported = informal or close-stage1
 *  - Ben: disengaged if ben_flag === 'close'
 *  - Yemi: always present
 */
export const getTeamPresence = (
  decisions: GameStore['decisions']
): Record<string, 'present' | 'absent' | 'disengaged'> => {
  const presence: Record<string, 'present' | 'absent' | 'disengaged'> = {
    priya: 'present',
    dayo: 'present',
    rhonda: 'present',
    ben: 'present',
    yemi: 'present',
  };

  // Priya: absent if leave was denied (she handed in notice)
  if (decisions.priya_leave === 'denied') {
    presence.priya = 'absent';
  }

  // Dayo: absent if flex was denied entirely; disengaged if situation_a denied him
  if (decisions.dayo_flex === 'denied') {
    presence.dayo = 'absent';
  } else if (decisions.situation_a === 'deny-dayo') {
    presence.dayo = 'disengaged';
  }

  // Rhonda: disengaged if on Stage 2 formal track
  if (decisions.situation_b === 'escalate-stage2') {
    presence.rhonda = 'disengaged';
  }

  // Ben: disengaged if his flag was closed without action
  if (decisions.ben_flag === 'close') {
    presence.ben = 'disengaged';
  }

  // Yemi: always present (no condition can make her absent)
  presence.yemi = 'present';

  return presence;
};

/**
 * Thin wrapper around resolveEnding.
 * Use the useEnding hook in React components.
 */
export const getEndingType = (
  decisions: GameStore['decisions']
): EndingType => {
  return resolveEnding(decisions);
};