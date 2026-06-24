import { GameStore, EndingType } from '../store/types';

/**
 * Resolves the player's ending based solely on pivot decisions.
 * No scores parameter — decisions only.
 *
 * Priority order (first match wins):
 *   6 → 3 → 4 → 2 → 1 → 5 (default)
 */
export function resolveEnding(decisions: GameStore['decisions']): EndingType {
  // ── Ending 6 — Something Shifted (best outcome) ──────────────────────────
  // All pivots met: Priya stayed, Dayo retained, Rhonda supported,
  // Ben protected, Diana honest, expense forwarded, team win acknowledged.
  if (
    decisions.priya_leave === 'approved' &&
    decisions.dayo_flex !== 'denied' &&
    (decisions.rhonda_performance === 'informal' ||
      decisions.situation_b === 'close-stage1') &&
    decisions.ben_flag !== 'close' &&
    decisions.diana_corridor === 'honest' &&
    decisions.expense_email === 'forward_diana' &&
    decisions.team_win_acknowledged === 'true'
  ) {
    return 'something_shifted';
  }

  // ── Ending 3 — Marcus Leaves (Accountability) ────────────────────────────
  // Player was honest with Diana AND actioned the disclosure (forwarded or
  // raised directly with Marcus).
  if (
    decisions.diana_corridor === 'honest' &&
    (decisions.expense_email === 'forward_diana' ||
      decisions.expense_email === 'raise_marcus')
  ) {
    return 'marcus_leaves_pushed';
  }

  // ── Ending 4 — Marcus Leaves (Quietly) ───────────────────────────────────
  // Player established some Diana relationship (not deflect),
  // was not the driver of disclosure (not honest in corridor),
  // and neither buried (delete) nor forwarded the expense email.
  // Player was present but not the agent of accountability.
  if (
    decisions.diana_first_impression !== 'deflect' &&
    decisions.diana_corridor !== 'honest' &&
    decisions.expense_email !== 'forward_diana' &&
    decisions.expense_email !== 'delete'
  ) {
    return 'marcus_leaves_quietly';
  }

  // ── Ending 2 — You Hand It In ────────────────────────────────────────────
  // Multiple team members lost AND key decisions made against team
  // AND disclosure not made. The system asked you to do the wrong things
  // enough times.
  if (
    decisions.priya_leave === 'denied' &&
    decisions.dayo_flex === 'denied' &&
    decisions.rhonda_performance === 'formal' &&
    decisions.situation_b === 'escalate-stage2'
  ) {
    return 'you_hand_it_in';
  }

  // ── Ending 1 — Restructured Out ──────────────────────────────────────────
  // Diana corridor not honest AND expense deleted AND team depleted.
  if (
    decisions.diana_corridor !== 'honest' &&
    decisions.expense_email === 'delete' &&
    decisions.priya_leave === 'denied' &&
    decisions.dayo_flex === 'denied'
  ) {
    return 'restructured_out';
  }

  // ── Ending 5 — Back on Monday (default) ──────────────────────────────────
  // No dramatic pivots met in either direction. The most common ending.
  // Not a failure. A beginning.
  return 'back_on_monday';
}