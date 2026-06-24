import { mondayMemo } from './monday-memo';
import { inboxABranches } from './inbox-a';
import { inboxBBranches } from './inbox-b';
import { inboxAwayDay } from './inbox-away-day';
import { thursdayOneOnOneBranches } from './thursday-1on1';
import { fridayAllHands } from './friday-allhands';

export const week3Scenes = [
  {
    id: 'w3-monday-memo',
    scene: mondayMemo,
  },
  {
    id: 'w3-inbox-a',
    branches: inboxABranches,
    decisionKey: 'situation_a',
  },
  {
    id: 'w3-inbox-b',
    branches: inboxBBranches,
    decisionKey: 'situation_b',
  },
  {
    id: 'w3-inbox-away-day',
    scene: inboxAwayDay,
    decisionKey: 'away_day_conflicts',
  },
  {
    id: 'w3-thursday-1on1',
    branches: thursdayOneOnOneBranches,
    decisionKey: 'w3_1on1_response',
  },
  {
    id: 'w3-friday-allhands',
    scene: fridayAllHands,
  },
  {
    id: 'w3-summary',
    screenType: 'summary' as const,
  },
] as const;

export { mondayMemo } from './monday-memo';
export { inboxABranches, branchPriyaAccounts, branchDayoHalfDay } from './inbox-a';
export {
  inboxBBranches,
  branchCraigGrievance,
  branchBenSecondFlag,
  branchRhondaStage1,
  branchCarolHR,
  situationBValuesByBranch,
} from './inbox-b';
export { inboxAwayDay } from './inbox-away-day';
export {
  thursdayOneOnOneBranches,
  branchPriyaExit,
  branchMarcusCheckin,
  branchBenUnscheduled,
  branchRhondaCheckin,
} from './thursday-1on1';
export { fridayAllHands } from './friday-allhands';
export {
  situationADeltas,
  situationBDeltas,
  awayDayDeltas,
  energyScoreDelta,
  w1Deltas,
  w2Deltas,
  situationAOutcomeText,
  situationBOutcomeText,
  awayDayOutcomeText,
  buildW3Verdict,
  w3SummaryFooter,
} from './summary';

export const WEEK3_REQUIRED_DECISIONS = [
  'situation_a',
  'situation_b',
  'away_day_conflicts',
  'w3_1on1_response',
] as const;