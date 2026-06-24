/**
 * __tests__/endingResolver.test.ts
 *
 * Unit tests for resolveEnding(decisions).
 * resolveEnding takes decisions ONLY — no scores parameter.
 * If you find yourself passing a second argument here, the function signature is wrong.
 */

import { resolveEnding } from '../src/utils/endingResolver';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Minimal decisions object that satisfies none of the named pivot conditions,
 *  producing the default Ending 5. */
const noDecisions = {} as const;

// ---------------------------------------------------------------------------
// Ending 6 — "Something Shifted"
// All pivot conditions met: priya approved, dayo retained, rhonda handled
// humanely (via rhonda_performance), ben protected, diana honest, expense
// forwarded, team win acknowledged as the STRING 'true'.
// ---------------------------------------------------------------------------
describe('resolveEnding — Ending 6 (something_shifted)', () => {
  const ending6Base = {
    priya_leave: 'approved',
    dayo_flex: 'escalated',           // anything except 'denied'
    rhonda_performance: 'informal',
    ben_flag: 'informal',             // anything except 'close'
    diana_corridor: 'honest',
    expense_email: 'forward_diana',
    team_win_acknowledged: 'true',    // STRING — not boolean
  };

  it('resolves something_shifted when all pivot conditions are met', () => {
    expect(resolveEnding(ending6Base)).toBe('something_shifted');
  });

  it('resolves something_shifted when rhonda supported via situation_b close-stage1 (not rhonda_performance)', () => {
    const decisions = {
      ...ending6Base,
      rhonda_performance: undefined,
      situation_b: 'close-stage1',
    };
    expect(resolveEnding(decisions)).toBe('something_shifted');
  });

  /**
   * CRITICAL: team_win_acknowledged = true (boolean) must NOT trigger Ending 6.
   * Only the string 'true' is valid. The store type is string | number, not boolean.
   * If this test fails, the resolver is accepting a boolean — fix the resolver.
   */
  it('does NOT resolve something_shifted when team_win_acknowledged is boolean true', () => {
    const decisions = {
      ...ending6Base,
      // Casting to any to force the boolean through despite TypeScript types.
      // This tests runtime behaviour, not compile-time safety.
      team_win_acknowledged: true as unknown as string,
    };
    expect(resolveEnding(decisions)).not.toBe('something_shifted');
  });

  it('does NOT resolve something_shifted when team_win_acknowledged is boolean false', () => {
    const decisions = {
      ...ending6Base,
      team_win_acknowledged: false as unknown as string,
    };
    expect(resolveEnding(decisions)).not.toBe('something_shifted');
  });

  it('does NOT resolve something_shifted when team_win_acknowledged is the string "false"', () => {
    const decisions = { ...ending6Base, team_win_acknowledged: 'false' };
    expect(resolveEnding(decisions)).not.toBe('something_shifted');
  });

  it('does NOT resolve something_shifted when priya_leave is denied', () => {
    const decisions = { ...ending6Base, priya_leave: 'denied' };
    expect(resolveEnding(decisions)).not.toBe('something_shifted');
  });

  it('does NOT resolve something_shifted when dayo_flex is denied', () => {
    const decisions = { ...ending6Base, dayo_flex: 'denied' };
    expect(resolveEnding(decisions)).not.toBe('something_shifted');
  });

  it('does NOT resolve something_shifted when ben_flag is close', () => {
    const decisions = { ...ending6Base, ben_flag: 'close' };
    expect(resolveEnding(decisions)).not.toBe('something_shifted');
  });

  it('does NOT resolve something_shifted when diana_corridor is not honest', () => {
    const decisions = { ...ending6Base, diana_corridor: 'diplomatic' };
    expect(resolveEnding(decisions)).not.toBe('something_shifted');
  });

  it('does NOT resolve something_shifted when expense_email is not forward_diana', () => {
    const decisions = { ...ending6Base, expense_email: 'raise_marcus' };
    expect(resolveEnding(decisions)).not.toBe('something_shifted');
  });
});

// ---------------------------------------------------------------------------
// Ending 3 — "Marcus Leaves (Accountability)" — marcus_leaves_pushed
// Gate: diana_corridor = 'honest' AND (expense_email = 'forward_diana' OR 'raise_marcus')
// ---------------------------------------------------------------------------
describe('resolveEnding — Ending 3 (marcus_leaves_pushed)', () => {
  /**
   * Canonical Ending 3 test case from spec:
   * diana_corridor = 'honest', expense_email = 'raise_marcus' → marcus_leaves_pushed
   */
  it('resolves marcus_leaves_pushed when diana_corridor honest and expense_email raise_marcus', () => {
    const decisions = {
      diana_corridor: 'honest',
      expense_email: 'raise_marcus',
    };
    expect(resolveEnding(decisions)).toBe('marcus_leaves_pushed');
  });

  it('resolves marcus_leaves_pushed when diana_corridor honest and expense_email forward_diana (no E6 conditions)', () => {
    // No priya_leave = 'approved', no team_win_acknowledged = 'true', etc.
    // Ending 6 check fails, so falls through to Ending 3.
    const decisions = {
      diana_corridor: 'honest',
      expense_email: 'forward_diana',
    };
    expect(resolveEnding(decisions)).toBe('marcus_leaves_pushed');
  });

  it('does NOT resolve marcus_leaves_pushed when diana_corridor is not honest', () => {
    const decisions = {
      diana_corridor: 'diplomatic',
      expense_email: 'raise_marcus',
    };
    expect(resolveEnding(decisions)).not.toBe('marcus_leaves_pushed');
  });

  it('does NOT resolve marcus_leaves_pushed when expense_email is delete', () => {
    const decisions = {
      diana_corridor: 'honest',
      expense_email: 'delete',
    };
    expect(resolveEnding(decisions)).not.toBe('marcus_leaves_pushed');
  });

  it('does NOT resolve marcus_leaves_pushed when expense_email is screenshot_wait', () => {
    // screenshot_wait is not in the Ending 3 gate
    const decisions = {
      diana_corridor: 'honest',
      expense_email: 'screenshot_wait',
    };
    expect(resolveEnding(decisions)).not.toBe('marcus_leaves_pushed');
  });
});

// ---------------------------------------------------------------------------
// Ending 4 — "Marcus Leaves (Quietly)" — marcus_leaves_quietly
// Gate: diana_first_impression !== 'deflect'
//       AND diana_corridor !== 'honest'
//       AND expense_email !== 'forward_diana'
//       AND expense_email !== 'delete'
// ---------------------------------------------------------------------------
describe('resolveEnding — Ending 4 (marcus_leaves_quietly)', () => {
  /**
   * Canonical Ending 4 test case from spec:
   * diana_first_impression = 'open', diana_corridor = 'diplomatic',
   * expense_email = 'raise_marcus' → marcus_leaves_quietly
   */
  it('resolves marcus_leaves_quietly: open impression, diplomatic corridor, raise_marcus expense', () => {
    const decisions = {
      diana_first_impression: 'open',
      diana_corridor: 'diplomatic',
      expense_email: 'raise_marcus',
    };
    expect(resolveEnding(decisions)).toBe('marcus_leaves_quietly');
  });

  it('resolves marcus_leaves_quietly when diana_first_impression is cautious', () => {
    const decisions = {
      diana_first_impression: 'cautious',
      diana_corridor: 'avoid',
      expense_email: 'screenshot_wait',
    };
    expect(resolveEnding(decisions)).toBe('marcus_leaves_quietly');
  });

  it('does NOT resolve marcus_leaves_quietly when diana_first_impression is deflect', () => {
    const decisions = {
      diana_first_impression: 'deflect',
      diana_corridor: 'diplomatic',
      expense_email: 'raise_marcus',
    };
    expect(resolveEnding(decisions)).not.toBe('marcus_leaves_quietly');
  });

  it('does NOT resolve marcus_leaves_quietly when diana_corridor is honest (would be Ending 3)', () => {
    const decisions = {
      diana_first_impression: 'open',
      diana_corridor: 'honest',
      expense_email: 'raise_marcus',
    };
    expect(resolveEnding(decisions)).not.toBe('marcus_leaves_quietly');
  });

  it('does NOT resolve marcus_leaves_quietly when expense_email is forward_diana', () => {
    const decisions = {
      diana_first_impression: 'open',
      diana_corridor: 'diplomatic',
      expense_email: 'forward_diana',
    };
    expect(resolveEnding(decisions)).not.toBe('marcus_leaves_quietly');
  });

  it('does NOT resolve marcus_leaves_quietly when expense_email is delete', () => {
    const decisions = {
      diana_first_impression: 'open',
      diana_corridor: 'diplomatic',
      expense_email: 'delete',
    };
    expect(resolveEnding(decisions)).not.toBe('marcus_leaves_quietly');
  });
});

// ---------------------------------------------------------------------------
// Ending 2 — "You Hand It In" — you_hand_it_in
// Gate: priya denied, dayo denied, rhonda formal, situation_b escalate-stage2
// ---------------------------------------------------------------------------
describe('resolveEnding — Ending 2 (you_hand_it_in)', () => {
  const ending2Base = {
    priya_leave: 'denied',
    dayo_flex: 'denied',
    rhonda_performance: 'formal',
    situation_b: 'escalate-stage2',
  };

  it('resolves you_hand_it_in when all team-depleted conditions are met', () => {
    expect(resolveEnding(ending2Base)).toBe('you_hand_it_in');
  });

  it('does NOT resolve you_hand_it_in when priya_leave is approved', () => {
    const decisions = { ...ending2Base, priya_leave: 'approved' };
    expect(resolveEnding(decisions)).not.toBe('you_hand_it_in');
  });

  it('does NOT resolve you_hand_it_in when dayo_flex is not denied', () => {
    const decisions = { ...ending2Base, dayo_flex: 'escalated' };
    expect(resolveEnding(decisions)).not.toBe('you_hand_it_in');
  });

  it('does NOT resolve you_hand_it_in when rhonda_performance is informal', () => {
    const decisions = { ...ending2Base, rhonda_performance: 'informal' };
    expect(resolveEnding(decisions)).not.toBe('you_hand_it_in');
  });

  it('does NOT resolve you_hand_it_in when situation_b is not escalate-stage2', () => {
    const decisions = { ...ending2Base, situation_b: 'extend-stage1' };
    expect(resolveEnding(decisions)).not.toBe('you_hand_it_in');
  });
});

// ---------------------------------------------------------------------------
// Ending 1 — "Restructured Out" — restructured_out
// Gate: diana_corridor !== 'honest' AND expense_email = 'delete'
//       AND priya_leave = 'denied' AND dayo_flex = 'denied'
// ---------------------------------------------------------------------------
describe('resolveEnding — Ending 1 (restructured_out)', () => {
  const ending1Base = {
    diana_corridor: 'avoid',
    expense_email: 'delete',
    priya_leave: 'denied',
    dayo_flex: 'denied',
  };

  it('resolves restructured_out when all worst-case conditions are met', () => {
    expect(resolveEnding(ending1Base)).toBe('restructured_out');
  });

  it('does NOT resolve restructured_out when expense_email is not delete', () => {
    const decisions = { ...ending1Base, expense_email: 'raise_marcus' };
    expect(resolveEnding(decisions)).not.toBe('restructured_out');
  });

  it('does NOT resolve restructured_out when diana_corridor is honest', () => {
    const decisions = { ...ending1Base, diana_corridor: 'honest' };
    expect(resolveEnding(decisions)).not.toBe('restructured_out');
  });

  it('does NOT resolve restructured_out when priya_leave is approved', () => {
    const decisions = { ...ending1Base, priya_leave: 'approved' };
    expect(resolveEnding(decisions)).not.toBe('restructured_out');
  });

  it('does NOT resolve restructured_out when dayo_flex is not denied', () => {
    const decisions = { ...ending1Base, dayo_flex: 'escalated' };
    expect(resolveEnding(decisions)).not.toBe('restructured_out');
  });
});

// ---------------------------------------------------------------------------
// Ending 5 — "Back on Monday" — back_on_monday (default)
// No dramatic pivots met in either direction.
// ---------------------------------------------------------------------------
describe('resolveEnding — Ending 5 (back_on_monday)', () => {
  /**
   * Canonical Ending 5 test case: empty decisions → back_on_monday.
   */
  it('resolves back_on_monday for an empty decisions object', () => {
    expect(resolveEnding(noDecisions)).toBe('back_on_monday');
  });

  it('resolves back_on_monday for decisions that satisfy no named pivot gates', () => {
    const decisions = {
      priya_leave: 'approved',
      dayo_flex: 'escalated',
      rhonda_performance: 'informal',
      // No diana_corridor, no expense_email — Endings 3, 4, 6 all fail
      // Endings 1 and 2 also fail — falls to default
    };
    expect(resolveEnding(decisions)).toBe('back_on_monday');
  });

  it('resolves back_on_monday when diana_corridor is diplomatic and expense_email is screenshot_wait and diana_first_impression is deflect', () => {
    // Ending 4 blocked by deflect on diana_first_impression; Ending 3 blocked by non-honest corridor
    const decisions = {
      diana_first_impression: 'deflect',
      diana_corridor: 'diplomatic',
      expense_email: 'screenshot_wait',
    };
    expect(resolveEnding(decisions)).toBe('back_on_monday');
  });
});

// ---------------------------------------------------------------------------
// Priority order — Ending 6 fires before Ending 3 when conditions overlap
// A decisions object that satisfies both Ending 3 and Ending 6 simultaneously
// must resolve 'something_shifted' (Ending 6 checked first).
// ---------------------------------------------------------------------------
describe('resolveEnding — priority order', () => {
  it('resolves something_shifted (not marcus_leaves_pushed) when both Ending 3 and Ending 6 conditions are met', () => {
    // Ending 3: diana_corridor = 'honest' AND expense_email = 'forward_diana'
    // Ending 6: additionally needs priya_leave, dayo, rhonda, ben, team_win
    const decisions = {
      // Ending 6 pivots
      priya_leave: 'approved',
      dayo_flex: 'escalated',
      rhonda_performance: 'informal',
      ben_flag: 'informal',
      diana_corridor: 'honest',          // also satisfies Ending 3
      expense_email: 'forward_diana',    // also satisfies Ending 3
      team_win_acknowledged: 'true',     // string, not boolean
    };
    // Both Ending 3 and Ending 6 gates are satisfied.
    // Ending 6 is checked first — must win.
    expect(resolveEnding(decisions)).toBe('something_shifted');
  });

  it('resolves something_shifted (not marcus_leaves_quietly) when both Ending 4 and Ending 6 conditions could coexist', () => {
    // This edge is less likely by construction (E6 requires diana_corridor = 'honest' which
    // blocks E4), but confirm Ending 6 always wins over any lower-priority ending.
    const decisions = {
      priya_leave: 'approved',
      dayo_flex: 'escalated',
      rhonda_performance: 'informal',
      ben_flag: 'formal',
      diana_corridor: 'honest',
      diana_first_impression: 'open',
      expense_email: 'forward_diana',
      team_win_acknowledged: 'true',
    };
    expect(resolveEnding(decisions)).toBe('something_shifted');
  });

  it('resolves marcus_leaves_pushed (not marcus_leaves_quietly) when Ending 3 conditions block Ending 4', () => {
    // Ending 3 is checked before Ending 4 in the resolver.
    // diana_corridor = 'honest' satisfies E3 and also means E4 gate (diana_corridor !== 'honest') fails.
    // But confirm the priority explicitly.
    const decisions = {
      diana_first_impression: 'open',
      diana_corridor: 'honest',      // E3 fires here; E4's diana_corridor !== 'honest' is false
      expense_email: 'raise_marcus',
    };
    expect(resolveEnding(decisions)).toBe('marcus_leaves_pushed');
    expect(resolveEnding(decisions)).not.toBe('marcus_leaves_quietly');
  });
});
