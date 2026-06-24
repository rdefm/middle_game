import { GameStore } from '../store/types';

/**
 * Resolves which content variant to surface for a given scene ID,
 * based on the current decisions record.
 *
 * Content files export all possible branches; this function selects
 * the correct one at runtime so components remain stateless.
 *
 * Returns null for unrecognised scene IDs — callers should fall back
 * to base/default content in that case.
 */
export function resolveScene(
  sceneId: string,
  decisions: GameStore['decisions']
): string | null {
  switch (sceneId) {
    // ── Week 3 — Situation A ───────────────────────────────────────────────
    // Which inbox-a branch is active depends on whether Priya stayed.
    case 'w3-inbox-a': {
      if (decisions.priya_leave === 'denied') {
        return 'w3-inbox-a-priya-redistribution';
      }
      return 'w3-inbox-a-dayo-halfday';
    }

    // ── Week 3 — Situation B ───────────────────────────────────────────────
    // Which inbox-b branch is active depends on W2 ben_flag.
    case 'w3-inbox-b': {
      if (decisions.ben_flag === 'formal') {
        return 'w3-inbox-b-craig-grievance';
      }
      if (decisions.ben_flag === 'close') {
        return 'w3-inbox-b-ben-second-flag';
      }
      // ben_flag === 'informal': further sub-branch on rhonda
      if (decisions.rhonda_performance === 'formal') {
        return 'w3-inbox-b-rhonda-stage1';
      }
      return 'w3-inbox-b-carol-hr';
    }

    // ── Week 3 — Thursday 1:1 ─────────────────────────────────────────────
    // Priya exit conversation if she was denied; otherwise Marcus / Ben / Rhonda.
    case 'w3-thursday-1on1': {
      if (decisions.priya_leave === 'denied') {
        return 'w3-1on1-priya-exit';
      }
      if (decisions.ben_flag === 'formal') {
        return 'w3-1on1-ben-check';
      }
      if (decisions.rhonda_performance === 'formal') {
        return 'w3-1on1-rhonda-check';
      }
      return 'w3-1on1-marcus-checkin';
    }

    // ── Week 2 — Thursday Craig 1:1 ──────────────────────────────────────
    case 'w2-thursday-craig-1on1': {
      return 'w2-craig-1on1-base';
    }

    // ── Week 1 — Thursday Priya 1:1 ──────────────────────────────────────
    case 'w1-thursday-1on1': {
      return 'w1-priya-1on1-base';
    }

    // ── Unknown scene ID — return null; callers render base content ───────
    default:
      return null;
  }
}