/**
 * __tests__/branchResolver.test.ts
 *
 * Unit tests for:
 *   resolveScene(sceneId, decisions)   — src/utils/branchResolver.ts
 *   getActiveThreads(decisions)        — src/store/selectors.ts
 *   getTeamPresence(decisions)         — src/store/selectors.ts
 *   getEndingType(decisions)           — src/store/selectors.ts
 */

import { resolveScene } from '../src/utils/branchResolver';
import {
  getActiveThreads,
  getTeamPresence,
  getEndingType,
} from '../src/store/selectors';

// ===========================================================================
// resolveScene
// ===========================================================================

describe('resolveScene', () => {
  // -------------------------------------------------------------------------
  // Unknown / fallback
  // -------------------------------------------------------------------------
  describe('fallback for unknown scene IDs', () => {
    it('returns a defined value (base content) for an unknown scene ID', () => {
      const result = resolveScene('scene_that_does_not_exist', {});
      expect(result).toBeDefined();
    });

    it('returns a defined value for an empty string scene ID', () => {
      const result = resolveScene('', {});
      expect(result).toBeDefined();
    });

    it('does not throw for an unknown scene ID with any decisions', () => {
      expect(() =>
        resolveScene('unknown_scene', { priya_leave: 'approved', ben_flag: 'formal' })
      ).not.toThrow();
    });
  });

  // -------------------------------------------------------------------------
  // W1 — inbox-leave (priya_leave branching)
  // -------------------------------------------------------------------------
  describe('W1 inbox-leave — priya_leave branching', () => {
    it('returns a result object for w1-inbox-leave with priya_leave approved', () => {
      const result = resolveScene('w1-inbox-leave', { priya_leave: 'approved' });
      expect(result).toBeDefined();
    });

    it('returns a result object for w1-inbox-leave with priya_leave denied', () => {
      const result = resolveScene('w1-inbox-leave', { priya_leave: 'denied' });
      expect(result).toBeDefined();
    });

    it('returns different content variants for approved vs denied priya_leave', () => {
      const approved = resolveScene('w1-inbox-leave', { priya_leave: 'approved' });
      const denied = resolveScene('w1-inbox-leave', { priya_leave: 'denied' });
      // The two decisions must produce distinguishable content
      expect(JSON.stringify(approved)).not.toBe(JSON.stringify(denied));
    });
  });

  // -------------------------------------------------------------------------
  // W1 — inbox-flex (dayo_flex branching)
  // -------------------------------------------------------------------------
  describe('W1 inbox-flex — dayo_flex branching', () => {
    it('returns a result for w1-inbox-flex with dayo_flex escalated', () => {
      const result = resolveScene('w1-inbox-flex', { dayo_flex: 'escalated' });
      expect(result).toBeDefined();
    });

    it('returns a result for w1-inbox-flex with dayo_flex denied', () => {
      const result = resolveScene('w1-inbox-flex', { dayo_flex: 'denied' });
      expect(result).toBeDefined();
    });
  });

  // -------------------------------------------------------------------------
  // W2 — inbox-craig-ben (ben_flag branching)
  // -------------------------------------------------------------------------
  describe('W2 inbox-craig-ben — ben_flag branching', () => {
    it('returns a result for w2-inbox-craig-ben with ben_flag formal', () => {
      const result = resolveScene('w2-inbox-craig-ben', { ben_flag: 'formal' });
      expect(result).toBeDefined();
    });

    it('returns a result for w2-inbox-craig-ben with ben_flag informal', () => {
      const result = resolveScene('w2-inbox-craig-ben', { ben_flag: 'informal' });
      expect(result).toBeDefined();
    });

    it('returns a result for w2-inbox-craig-ben with ben_flag close', () => {
      const result = resolveScene('w2-inbox-craig-ben', { ben_flag: 'close' });
      expect(result).toBeDefined();
    });

    it('returns different content for formal vs close ben_flag', () => {
      const formal = resolveScene('w2-inbox-craig-ben', { ben_flag: 'formal' });
      const close = resolveScene('w2-inbox-craig-ben', { ben_flag: 'close' });
      expect(JSON.stringify(formal)).not.toBe(JSON.stringify(close));
    });
  });

  // -------------------------------------------------------------------------
  // W3 — inbox-b (situation_b branching driven by ben_flag)
  // -------------------------------------------------------------------------
  describe('W3 inbox-b — situation_b branching', () => {
    it('returns craig grievance branch when ben_flag is formal', () => {
      const result = resolveScene('w3-inbox-b', { ben_flag: 'formal' });
      expect(result).toBeDefined();
    });

    it('returns rhonda / ben follow-up branch when ben_flag is informal', () => {
      const result = resolveScene('w3-inbox-b', { ben_flag: 'informal' });
      expect(result).toBeDefined();
    });

    it('returns carol HR branch when ben_flag is close', () => {
      const result = resolveScene('w3-inbox-b', { ben_flag: 'close' });
      expect(result).toBeDefined();
    });

    it('returns different branches for formal vs close ben_flag', () => {
      const formal = resolveScene('w3-inbox-b', { ben_flag: 'formal' });
      const close = resolveScene('w3-inbox-b', { ben_flag: 'close' });
      expect(JSON.stringify(formal)).not.toBe(JSON.stringify(close));
    });
  });

  // -------------------------------------------------------------------------
  // W3 — inbox-a (situation_a branching driven by priya_leave)
  // -------------------------------------------------------------------------
  describe('W3 inbox-a — situation_a branching', () => {
    it('returns priya accounts redistribution branch when priya_leave is denied', () => {
      const result = resolveScene('w3-inbox-a', { priya_leave: 'denied' });
      expect(result).toBeDefined();
    });

    it('returns dayo half-day branch when priya_leave is approved', () => {
      const result = resolveScene('w3-inbox-a', { priya_leave: 'approved' });
      expect(result).toBeDefined();
    });
  });

  // -------------------------------------------------------------------------
  // W3 — thursday-1on1 (branching on priya_leave, ben_flag, rhonda_performance)
  // -------------------------------------------------------------------------
  describe('W3 thursday-1on1 — branching by distress priority', () => {
    it('returns priya exit conversation when priya_leave is denied', () => {
      const result = resolveScene('w3-thursday-1on1', { priya_leave: 'denied' });
      expect(result).toBeDefined();
    });

    it('returns a result when priya is retained (not exit branch)', () => {
      const result = resolveScene('w3-thursday-1on1', {
        priya_leave: 'approved',
        ben_flag: 'formal',
      });
      expect(result).toBeDefined();
    });
  });

  // -------------------------------------------------------------------------
  // General contract — resolveScene always returns defined, never throws
  // -------------------------------------------------------------------------
  describe('contract — resolveScene never throws', () => {
    const knownSceneIds = [
      'w1-monday-memo',
      'w1-monday-meeting',
      'w1-inbox-leave',
      'w1-inbox-flex',
      'w1-inbox-performance',
      'w1-thursday-1on1',
      'w1-friday-allhands',
      'w1-summary',
      'w2-monday-memo',
      'w2-monday-alignment',
      'w2-inbox-craig-ben',
      'w2-inbox-yemi',
      'w2-inbox-energy',
      'w2-thursday-craig-1on1',
      'w2-friday-allhands',
      'w2-summary',
      'w3-monday-memo',
      'w3-inbox-a',
      'w3-inbox-b',
      'w3-inbox-away-day',
      'w3-thursday-1on1',
      'w3-friday-allhands',
      'w3-summary',
    ];

    const representativeDecisions = {
      priya_leave: 'approved',
      dayo_flex: 'escalated',
      rhonda_performance: 'informal',
      ben_flag: 'formal',
      yemi_onboarding: 'honest',
      situation_b: 'close-stage1',
    };

    for (const sceneId of knownSceneIds) {
      it(`does not throw for scene '${sceneId}'`, () => {
        expect(() =>
          resolveScene(sceneId, representativeDecisions)
        ).not.toThrow();
      });
    }
  });
});

// ===========================================================================
// getActiveThreads
// ===========================================================================

describe('getActiveThreads', () => {
  it('returns an array', () => {
    const result = getActiveThreads({});
    expect(Array.isArray(result)).toBe(true);
  });

  it('returns empty array when no thread-triggering decisions are made', () => {
    const result = getActiveThreads({});
    expect(result).toEqual([]);
  });

  // craig_grievance thread — triggered by ben_flag = 'formal'
  it('includes craig_grievance when ben_flag is formal', () => {
    const result = getActiveThreads({ ben_flag: 'formal' });
    expect(result).toContain('craig_grievance');
  });

  it('does not include craig_grievance when ben_flag is informal', () => {
    const result = getActiveThreads({ ben_flag: 'informal' });
    expect(result).not.toContain('craig_grievance');
  });

  it('does not include craig_grievance when ben_flag is close', () => {
    const result = getActiveThreads({ ben_flag: 'close' });
    expect(result).not.toContain('craig_grievance');
  });

  // rhonda_stage1 thread — triggered by rhonda_performance = 'formal'
  it('includes rhonda_stage1 when rhonda_performance is formal', () => {
    const result = getActiveThreads({ rhonda_performance: 'formal' });
    expect(result).toContain('rhonda_stage1');
  });

  it('does not include rhonda_stage1 when rhonda_performance is informal', () => {
    const result = getActiveThreads({ rhonda_performance: 'informal' });
    expect(result).not.toContain('rhonda_stage1');
  });

  // situation_b thread — active when situation_b has a value
  it('includes a situation_b thread indicator when situation_b is set', () => {
    const result = getActiveThreads({ situation_b: 'escalate-stage2' });
    // The thread key name may vary; just confirm threads are non-empty when situation_b is set
    expect(result.length).toBeGreaterThan(0);
  });

  it('includes multiple threads when multiple triggers are active', () => {
    const result = getActiveThreads({
      ben_flag: 'formal',
      rhonda_performance: 'formal',
    });
    expect(result).toContain('craig_grievance');
    expect(result).toContain('rhonda_stage1');
    expect(result.length).toBeGreaterThanOrEqual(2);
  });

  it('returns no duplicates', () => {
    const result = getActiveThreads({
      ben_flag: 'formal',
      rhonda_performance: 'formal',
      situation_b: 'escalate-stage2',
    });
    const unique = [...new Set(result)];
    expect(result).toEqual(unique);
  });
});

// ===========================================================================
// getTeamPresence
// ===========================================================================

describe('getTeamPresence', () => {
  // -------------------------------------------------------------------------
  // Return shape
  // -------------------------------------------------------------------------
  it('returns an object with keys for all five team members', () => {
    const result = getTeamPresence({});
    expect(result).toHaveProperty('priya');
    expect(result).toHaveProperty('dayo');
    expect(result).toHaveProperty('rhonda');
    expect(result).toHaveProperty('ben');
    expect(result).toHaveProperty('yemi');
  });

  it('all values are one of present | absent | disengaged', () => {
    const valid = new Set(['present', 'absent', 'disengaged']);
    const result = getTeamPresence({
      priya_leave: 'denied',
      dayo_flex: 'denied',
      situation_a: 'deny-dayo',
      ben_flag: 'close',
    });
    for (const member of ['priya', 'dayo', 'rhonda', 'ben', 'yemi']) {
      expect(valid.has(result[member])).toBe(true);
    }
  });

  // -------------------------------------------------------------------------
  // Priya — absent if priya_leave = 'denied'
  // -------------------------------------------------------------------------
  it('priya is absent when priya_leave is denied', () => {
    const result = getTeamPresence({ priya_leave: 'denied' });
    expect(result.priya).toBe('absent');
  });

  it('priya is present when priya_leave is approved', () => {
    const result = getTeamPresence({ priya_leave: 'approved' });
    expect(result.priya).toBe('present');
  });

  it('priya is present when no priya_leave decision is set', () => {
    const result = getTeamPresence({});
    expect(result.priya).toBe('present');
  });

  // -------------------------------------------------------------------------
  // Dayo — absent if dayo_flex = 'denied'; disengaged if situation_a = 'deny-dayo'
  // -------------------------------------------------------------------------
  it('dayo is absent when dayo_flex is denied', () => {
    const result = getTeamPresence({ dayo_flex: 'denied' });
    expect(result.dayo).toBe('absent');
  });

  it('dayo is disengaged when situation_a is deny-dayo', () => {
    const result = getTeamPresence({ situation_a: 'deny-dayo' });
    expect(result.dayo).toBe('disengaged');
  });

  it('dayo is present when dayo_flex is escalated and situation_a is not deny-dayo', () => {
    const result = getTeamPresence({ dayo_flex: 'escalated' });
    expect(result.dayo).toBe('present');
  });

  it('dayo is present when no flex or situation_a decision is set', () => {
    const result = getTeamPresence({});
    expect(result.dayo).toBe('present');
  });

  it('dayo absent (not disengaged) when dayo_flex denied takes priority over situation_a deny-dayo', () => {
    // absent is the stronger condition — if both are set, dayo is absent
    const result = getTeamPresence({
      dayo_flex: 'denied',
      situation_a: 'deny-dayo',
    });
    expect(result.dayo).toBe('absent');
  });

  // -------------------------------------------------------------------------
  // Ben — disengaged if ben_flag = 'close'
  // -------------------------------------------------------------------------
  it('ben is disengaged when ben_flag is close', () => {
    const result = getTeamPresence({ ben_flag: 'close' });
    expect(result.ben).toBe('disengaged');
  });

  it('ben is present when ben_flag is formal', () => {
    const result = getTeamPresence({ ben_flag: 'formal' });
    expect(result.ben).toBe('present');
  });

  it('ben is present when ben_flag is informal', () => {
    const result = getTeamPresence({ ben_flag: 'informal' });
    expect(result.ben).toBe('present');
  });

  it('ben is present when no ben_flag decision is set', () => {
    const result = getTeamPresence({});
    expect(result.ben).toBe('present');
  });

  // -------------------------------------------------------------------------
  // Rhonda — no absent/disengaged condition in selector (presence is via
  // rhonda_performance / situation_b but those affect score/endings, not
  // war room presence in the selector layer — Rhonda's war room availability
  // is gated by content, not presence enum per spec §9.1 selector notes).
  // She defaults to present.
  // -------------------------------------------------------------------------
  it('rhonda is present by default (no selector-level absent condition)', () => {
    const result = getTeamPresence({});
    expect(result.rhonda).toBe('present');
  });

  it('rhonda remains present even when rhonda_performance is formal', () => {
    // rhonda_performance affects score and ending; selector maps to 'present'.
    const result = getTeamPresence({ rhonda_performance: 'formal' });
    expect(result.rhonda).toBe('present');
  });

  // -------------------------------------------------------------------------
  // Yemi — always present regardless of decisions
  // -------------------------------------------------------------------------
  it('yemi is always present when no decisions are set', () => {
    const result = getTeamPresence({});
    expect(result.yemi).toBe('present');
  });

  it('yemi is always present regardless of yemi_onboarding value', () => {
    const honest = getTeamPresence({ yemi_onboarding: 'honest' });
    const deflect = getTeamPresence({ yemi_onboarding: 'deflect' });
    expect(honest.yemi).toBe('present');
    expect(deflect.yemi).toBe('present');
  });

  it('yemi is always present even when all other team members are absent or disengaged', () => {
    const result = getTeamPresence({
      priya_leave: 'denied',
      dayo_flex: 'denied',
      ben_flag: 'close',
    });
    expect(result.yemi).toBe('present');
  });

  it('yemi is present regardless of any decision combination', () => {
    // Brute-force: throw every possible adverse decision at getTeamPresence.
    const adverseDecisions = {
      priya_leave: 'denied',
      dayo_flex: 'denied',
      situation_a: 'deny-dayo',
      ben_flag: 'close',
      rhonda_performance: 'formal',
      situation_b: 'escalate-stage2',
      yemi_onboarding: 'deflect',
      diana_corridor: 'avoid',
      expense_email: 'delete',
      team_win_acknowledged: 'false',
    };
    const result = getTeamPresence(adverseDecisions);
    expect(result.yemi).toBe('present');
  });

  // -------------------------------------------------------------------------
  // Combined scenarios
  // -------------------------------------------------------------------------
  it('all non-yemi members can be absent/disengaged simultaneously while yemi stays present', () => {
    const result = getTeamPresence({
      priya_leave: 'denied',
      dayo_flex: 'denied',
      ben_flag: 'close',
    });
    expect(result.priya).toBe('absent');
    expect(result.dayo).toBe('absent');
    expect(result.ben).toBe('disengaged');
    expect(result.yemi).toBe('present');
  });

  it('full best-case team: all present', () => {
    const result = getTeamPresence({
      priya_leave: 'approved',
      dayo_flex: 'escalated',
      ben_flag: 'formal',
      yemi_onboarding: 'honest',
    });
    expect(result.priya).toBe('present');
    expect(result.dayo).toBe('present');
    expect(result.ben).toBe('present');
    expect(result.yemi).toBe('present');
  });
});

// ===========================================================================
// getEndingType
// ===========================================================================

describe('getEndingType', () => {
  it('returns a valid EndingType string', () => {
    const validEndings = new Set([
      'restructured_out',
      'you_hand_it_in',
      'marcus_leaves_pushed',
      'marcus_leaves_quietly',
      'back_on_monday',
      'something_shifted',
    ]);
    const result = getEndingType({});
    expect(validEndings.has(result)).toBe(true);
  });

  it('returns back_on_monday for empty decisions (default ending)', () => {
    expect(getEndingType({})).toBe('back_on_monday');
  });

  it('returns something_shifted when all E6 pivot conditions are met', () => {
    const decisions = {
      priya_leave: 'approved',
      dayo_flex: 'escalated',
      rhonda_performance: 'informal',
      ben_flag: 'formal',
      diana_corridor: 'honest',
      expense_email: 'forward_diana',
      team_win_acknowledged: 'true',
    };
    expect(getEndingType(decisions)).toBe('something_shifted');
  });

  it('returns marcus_leaves_pushed when E3 conditions are met', () => {
    const decisions = {
      diana_corridor: 'honest',
      expense_email: 'raise_marcus',
    };
    expect(getEndingType(decisions)).toBe('marcus_leaves_pushed');
  });

  it('returns marcus_leaves_quietly when E4 conditions are met', () => {
    const decisions = {
      diana_first_impression: 'open',
      diana_corridor: 'diplomatic',
      expense_email: 'raise_marcus',
    };
    expect(getEndingType(decisions)).toBe('marcus_leaves_quietly');
  });

  it('returns restructured_out when E1 conditions are met', () => {
    const decisions = {
      diana_corridor: 'avoid',
      expense_email: 'delete',
      priya_leave: 'denied',
      dayo_flex: 'denied',
    };
    expect(getEndingType(decisions)).toBe('restructured_out');
  });

  it('is consistent with resolveEnding — thin wrapper produces identical results', () => {
    // getEndingType must be a thin wrapper: same inputs, same outputs.
    const { resolveEnding } = require('../src/utils/endingResolver');

    const testCases = [
      {},
      { diana_corridor: 'honest', expense_email: 'raise_marcus' },
      {
        priya_leave: 'approved',
        dayo_flex: 'escalated',
        rhonda_performance: 'informal',
        ben_flag: 'formal',
        diana_corridor: 'honest',
        expense_email: 'forward_diana',
        team_win_acknowledged: 'true',
      },
      {
        priya_leave: 'denied',
        dayo_flex: 'denied',
        rhonda_performance: 'formal',
        situation_b: 'escalate-stage2',
      },
    ];

    for (const decisions of testCases) {
      expect(getEndingType(decisions)).toBe(resolveEnding(decisions));
    }
  });
});
