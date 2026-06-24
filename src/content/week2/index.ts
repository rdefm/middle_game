import { mondayMemo } from './monday-memo';
import { mondayAlignment } from './monday-alignment';
import { inboxCraigBen } from './inbox-craig-ben';
import { inboxYemi } from './inbox-yemi';
import { inboxEnergy } from './inbox-energy';
import { thursdayCraig1on1 } from './thursday-craig-1on1';
import { fridayAllhands, brettCallahanEmail } from './friday-allhands';
import {
  w2OutcomeLabels,
  w2OutcomeNotes,
  w2Verdicts,
  w2SummaryFooter,
  w2PerValueDeltas,
  w2ResultLabels,
  getEnergyDeltaBucket,
} from './summary';

export const week2 = {
  weekNumber: 2,
  title: 'Ways of Working',
  scenes: [
    mondayMemo,
    mondayAlignment,
    // Inbox is a composite scene — individual items exported separately
    thursdayCraig1on1,
    fridayAllhands,
  ],
  inboxItems: {
    craigBen: inboxCraigBen,
    yemi: inboxYemi,
    energy: inboxEnergy,
  },
  // Brett Callahan's email — arrives in the inbox (Ways of Working tab)
  // this is his first appearance in the game
  brettCallahanEmail,
  summary: {
    outcomeLabels: w2OutcomeLabels,
    outcomeNotes: w2OutcomeNotes,
    verdicts: w2Verdicts,
    footer: w2SummaryFooter,
    perValueDeltas: w2PerValueDeltas,
    resultLabels: w2ResultLabels,
    getEnergyDeltaBucket,
  },
};

export {
  mondayMemo,
  mondayAlignment,
  inboxCraigBen,
  inboxYemi,
  inboxEnergy,
  thursdayCraig1on1,
  fridayAllhands,
  brettCallahanEmail,
  w2OutcomeLabels,
  w2OutcomeNotes,
  w2Verdicts,
  w2SummaryFooter,
  w2PerValueDeltas,
  w2ResultLabels,
  getEnergyDeltaBucket,
};

export type { W2OutcomeText, W2Verdict } from './summary';