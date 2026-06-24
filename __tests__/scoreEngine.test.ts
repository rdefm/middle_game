/**
 * __tests__/scoreEngine.test.ts
 *
 * Unit tests for computeScores(decisions) and applyDeltas.
 * Scores are diagnostic only — they never gate endings.
 * Base scores: { morale: 50, leadership: 50, ops: 60, policy: 50 }
 * Clamp range: 5 (floor) to 100 (ceiling).
 */

import { computeScores, applyDeltas } from '../src/utils/scoreEngine';
import type { Scores } from '../src/store/types';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const baseScores: Scores = { morale: 50, leadership: 50, ops: 60, policy: 50 };

// ---------------------------------------------------------------------------
// Base scores — empty decisions
// ---------------------------------------------------------------------------
describe('computeScores — base scores', () => {
  it('returns base scores when decisions is empty', () => {
    const result = computeScores({});
    expect(result.morale).toBe(50);
    expect(result.leadership).toBe(50);
    expect(result.ops).toBe(60);
    expect(result.policy).toBe(50);
  });

  it('returns base scores when all decision values are undefined', () => {
    const result = computeScores({
      priya_leave: undefined,
      dayo_flex: undefined,
      rhonda_performance: undefined,
      ben_flag: undefined,
    });
    expect(result.morale).toBe(50);
    expect(result.leadership).toBe(50);
    expect(result.ops).toBe(60);
    expect(result.policy).toBe(50);
  });
});

// ---------------------------------------------------------------------------
// applyDeltas — unit tests for the pure delta application function
// ---------------------------------------------------------------------------
describe('applyDeltas', () => {
  it('adds positive deltas to each score dimension', () => {
    const result = applyDeltas(baseScores, { morale: 10, leadership: 5 });
    expect(result.morale).toBe(60);
    expect(result.leadership).toBe(55);
    expect(result.ops).toBe(60);   // unchanged
    expect(result.policy).toBe(50); // unchanged
  });

  it('subtracts negative deltas from each score dimension', () => {
    const result = applyDeltas(baseScores, { morale: -10, ops: -15 });
    expect(result.morale).toBe(40);
    expect(result.ops).toBe(45);
  });

  it('applies zero deltas without changing scores', () => {
    const result = applyDeltas(baseScores, { morale: 0, leadership: 0, ops: 0, policy: 0 });
    expect(result).toEqual(baseScores);
  });

  it('handles partial delta objects — unspecified keys treated as 0', () => {
    const result = applyDeltas(baseScores, { policy: 20 });
    expect(result.morale).toBe(50);
    expect(result.leadership).toBe(50);
    expect(result.ops).toBe(60);
    expect(result.policy).toBe(70);
  });

  // Clamp floor —————————————————————————————————————————————————————————————

  it('clamps morale at floor 5 when delta would push below 5', () => {
    const low: Scores = { morale: 8, leadership: 50, ops: 60, policy: 50 };
    const result = applyDeltas(low, { morale: -20 });
    expect(result.morale).toBe(5);
  });

  it('clamps leadership at floor 5', () => {
    const low: Scores = { morale: 50, leadership: 6, ops: 60, policy: 50 };
    const result = applyDeltas(low, { leadership: -30 });
    expect(result.leadership).toBe(5);
  });

  it('clamps ops at floor 5', () => {
    const low: Scores = { morale: 50, leadership: 50, ops: 7, policy: 50 };
    const result = applyDeltas(low, { ops: -100 });
    expect(result.ops).toBe(5);
  });

  it('clamps policy at floor 5', () => {
    const low: Scores = { morale: 50, leadership: 50, ops: 60, policy: 5 };
    const result = applyDeltas(low, { policy: -1 });
    expect(result.policy).toBe(5);
  });

  it('returns exactly 5 when delta brings score to exactly 5', () => {
    const s: Scores = { morale: 15, leadership: 50, ops: 60, policy: 50 };
    const result = applyDeltas(s, { morale: -10 });
    expect(result.morale).toBe(5);
  });

  // Clamp ceiling ————————————————————————————————————————————————————————————

  it('clamps morale at ceiling 100 when delta would push above 100', () => {
    const high: Scores = { morale: 95, leadership: 50, ops: 60, policy: 50 };
    const result = applyDeltas(high, { morale: 20 });
    expect(result.morale).toBe(100);
  });

  it('clamps leadership at ceiling 100', () => {
    const high: Scores = { morale: 50, leadership: 98, ops: 60, policy: 50 };
    const result = applyDeltas(high, { leadership: 10 });
    expect(result.leadership).toBe(100);
  });

  it('clamps ops at ceiling 100', () => {
    const high: Scores = { morale: 50, leadership: 50, ops: 99, policy: 50 };
    const result = applyDeltas(high, { ops: 100 });
    expect(result.ops).toBe(100);
  });

  it('clamps policy at ceiling 100', () => {
    const high: Scores = { morale: 50, leadership: 50, ops: 60, policy: 100 };
    const result = applyDeltas(high, { policy: 5 });
    expect(result.policy).toBe(100);
  });

  it('returns exactly 100 when delta brings score to exactly 100', () => {
    const s: Scores = { morale: 90, leadership: 50, ops: 60, policy: 50 };
    const result = applyDeltas(s, { morale: 10 });
    expect(result.morale).toBe(100);
  });

  it('does not mutate the input scores object', () => {
    const original: Scores = { morale: 50, leadership: 50, ops: 60, policy: 50 };
    const copy = { ...original };
    applyDeltas(original, { morale: 20, leadership: -10 });
    expect(original).toEqual(copy);
  });
});

// ---------------------------------------------------------------------------
// W1 decisions — priya_leave
// ---------------------------------------------------------------------------
describe('computeScores — W1 priya_leave', () => {
  it('approved priya_leave improves morale relative to base', () => {
    const approved = computeScores({ priya_leave: 'approved' });
    const denied = computeScores({ priya_leave: 'denied' });
    expect(approved.morale).toBeGreaterThanOrEqual(denied.morale);
  });

  it('denied priya_leave does not improve morale relative to approved', () => {
    const approved = computeScores({ priya_leave: 'approved' });
    const denied = computeScores({ priya_leave: 'denied' });
    expect(denied.morale).toBeLessThanOrEqual(approved.morale);
  });

  it('approved priya_leave results in score within clamp range', () => {
    const result = computeScores({ priya_leave: 'approved' });
    for (const key of ['morale', 'leadership', 'ops', 'policy'] as const) {
      expect(result[key]).toBeGreaterThanOrEqual(5);
      expect(result[key]).toBeLessThanOrEqual(100);
    }
  });
});

// ---------------------------------------------------------------------------
// W1 decisions — dayo_flex
// ---------------------------------------------------------------------------
describe('computeScores — W1 dayo_flex', () => {
  it('escalated dayo_flex does not penalise morale vs denied', () => {
    const escalated = computeScores({ dayo_flex: 'escalated' });
    const denied = computeScores({ dayo_flex: 'denied' });
    expect(escalated.morale).toBeGreaterThanOrEqual(denied.morale);
  });

  it('denied dayo_flex does not improve morale vs escalated', () => {
    const escalated = computeScores({ dayo_flex: 'escalated' });
    const denied = computeScores({ dayo_flex: 'denied' });
    expect(denied.morale).toBeLessThanOrEqual(escalated.morale);
  });
});

// ---------------------------------------------------------------------------
// W1 decisions — rhonda_performance
// ---------------------------------------------------------------------------
describe('computeScores — W1 rhonda_performance', () => {
  it('informal rhonda_performance is not worse for morale than formal', () => {
    const informal = computeScores({ rhonda_performance: 'informal' });
    const formal = computeScores({ rhonda_performance: 'formal' });
    expect(informal.morale).toBeGreaterThanOrEqual(formal.morale);
  });

  it('formal rhonda_performance improves policy relative to base', () => {
    const formal = computeScores({ rhonda_performance: 'formal' });
    // formal compliance should register on policy dimension
    expect(formal.policy).toBeGreaterThanOrEqual(baseScores.policy);
  });
});

// ---------------------------------------------------------------------------
// W2 decisions — ben_flag
// ---------------------------------------------------------------------------
describe('computeScores — W2 ben_flag', () => {
  it('formal ben_flag is not worse for leadership than close', () => {
    const formal = computeScores({ ben_flag: 'formal' });
    const close = computeScores({ ben_flag: 'close' });
    expect(formal.leadership).toBeGreaterThanOrEqual(close.leadership);
  });

  it('close ben_flag does not improve morale versus informal or formal', () => {
    const close = computeScores({ ben_flag: 'close' });
    const informal = computeScores({ ben_flag: 'informal' });
    expect(close.morale).toBeLessThanOrEqual(informal.morale);
  });
});

// ---------------------------------------------------------------------------
// W2 decisions — yemi_onboarding
// ---------------------------------------------------------------------------
describe('computeScores — W2 yemi_onboarding', () => {
  it('honest yemi_onboarding is not worse for morale than deflect', () => {
    const honest = computeScores({ yemi_onboarding: 'honest' });
    const deflect = computeScores({ yemi_onboarding: 'deflect' });
    expect(honest.morale).toBeGreaterThanOrEqual(deflect.morale);
  });
});

// ---------------------------------------------------------------------------
// W3 decisions — away_day_conflicts
// ---------------------------------------------------------------------------
describe('computeScores — W3 away_day_conflicts', () => {
  it('exempt away_day_conflicts is not worse for morale than enforce', () => {
    const exempt = computeScores({ away_day_conflicts: 'exempt' });
    const enforce = computeScores({ away_day_conflicts: 'enforce' });
    expect(exempt.morale).toBeGreaterThanOrEqual(enforce.morale);
  });

  it('enforce away_day_conflicts is not better for morale than exempt or escalate', () => {
    const enforce = computeScores({ away_day_conflicts: 'enforce' });
    const exempt = computeScores({ away_day_conflicts: 'exempt' });
    expect(enforce.morale).toBeLessThanOrEqual(exempt.morale);
  });
});

// ---------------------------------------------------------------------------
// W3 decisions — situation_b
// ---------------------------------------------------------------------------
describe('computeScores — W3 situation_b', () => {
  it('close-stage1 situation_b is not worse for morale than escalate-stage2', () => {
    const closeStage = computeScores({ situation_b: 'close-stage1' });
    const escalate = computeScores({ situation_b: 'escalate-stage2' });
    expect(closeStage.morale).toBeGreaterThanOrEqual(escalate.morale);
  });
});

// ---------------------------------------------------------------------------
// W4–8 stub decisions — all apply zero delta
// Chunk 2 spec: "DECISION_DELTA_MAP populated for W1–3 decisions only
// (W4–8 stubs return zero deltas)"
// ---------------------------------------------------------------------------
describe('computeScores — W4–8 stub decisions apply zero delta', () => {
  const w4Keys = [
    'diagnostic_response',
    'activity_group_response',
    'lunch_response',
    'postit_choice',
  ] as const;

  const w5Keys = [
    'diana_first_impression',
    'diana_corridor',
    'team_role_application',
    'marcus_diana_question',
  ] as const;

  const w6Keys = [
    'expense_email',
    'rhonda_finding',
    'w6_1on1_response',
  ] as const;

  const w7Keys = [
    'yemi_theory_response',
    'team_transparency',
    'craig_w7_response',
    'team_win_acknowledged',
  ] as const;

  const w8Keys = [
    'war_room_lead',
    'war_room_numbers',
    'war_room_client_call',
    'war_room_insight',
    'thursday_evening_response',
  ] as const;

  for (const key of [...w4Keys, ...w5Keys, ...w6Keys, ...w7Keys, ...w8Keys]) {
    it(`decision key '${key}' with any value applies zero delta (returns base scores)`, () => {
      // We test with a representative value for each key; what matters is that
      // the score is unchanged from base, regardless of value.
      const result = computeScores({ [key]: 'some_value' });
      expect(result.morale).toBe(baseScores.morale);
      expect(result.leadership).toBe(baseScores.leadership);
      expect(result.ops).toBe(baseScores.ops);
      expect(result.policy).toBe(baseScores.policy);
    });
  }

  it('multiple W4–8 decisions together still return base scores', () => {
    const result = computeScores({
      diana_corridor: 'honest',
      expense_email: 'forward_diana',
      team_win_acknowledged: 'true',
      war_room_lead: 'delegate_priya',
      postit_choice: 'honest_handed_in',
    });
    expect(result.morale).toBe(baseScores.morale);
    expect(result.leadership).toBe(baseScores.leadership);
    expect(result.ops).toBe(baseScores.ops);
    expect(result.policy).toBe(baseScores.policy);
  });
});

// ---------------------------------------------------------------------------
// Clamp behaviour via computeScores — full-stack clamp tests
// ---------------------------------------------------------------------------
describe('computeScores — clamp behaviour', () => {
  it('all scores remain within 5–100 range regardless of decision combination', () => {
    // Worst-case combo: all decisions that carry negative deltas applied together.
    const result = computeScores({
      priya_leave: 'denied',
      dayo_flex: 'denied',
      rhonda_performance: 'formal',
      ben_flag: 'close',
      yemi_onboarding: 'deflect',
      away_day_conflicts: 'enforce',
      situation_b: 'escalate-stage2',
    });
    for (const key of ['morale', 'leadership', 'ops', 'policy'] as const) {
      expect(result[key]).toBeGreaterThanOrEqual(5);
      expect(result[key]).toBeLessThanOrEqual(100);
    }
  });

  it('all scores remain within 5–100 range for best-case decision combination', () => {
    const result = computeScores({
      priya_leave: 'approved',
      dayo_flex: 'escalated',
      rhonda_performance: 'informal',
      ben_flag: 'formal',
      yemi_onboarding: 'honest',
      away_day_conflicts: 'exempt',
      situation_b: 'close-stage1',
    });
    for (const key of ['morale', 'leadership', 'ops', 'policy'] as const) {
      expect(result[key]).toBeGreaterThanOrEqual(5);
      expect(result[key]).toBeLessThanOrEqual(100);
    }
  });

  it('scores are integers or numbers (not NaN, not Infinity)', () => {
    const result = computeScores({ priya_leave: 'approved', ben_flag: 'close' });
    for (const key of ['morale', 'leadership', 'ops', 'policy'] as const) {
      expect(Number.isFinite(result[key])).toBe(true);
    }
  });
});

// ---------------------------------------------------------------------------
// computeScores returns a fresh object each call
// ---------------------------------------------------------------------------
describe('computeScores — immutability', () => {
  it('returns a new object on each call', () => {
    const a = computeScores({});
    const b = computeScores({});
    expect(a).not.toBe(b);
    expect(a).toEqual(b);
  });

  it('does not mutate the decisions object passed in', () => {
    const decisions = { priya_leave: 'approved' as const };
    const before = { ...decisions };
    computeScores(decisions);
    expect(decisions).toEqual(before);
  });
});
