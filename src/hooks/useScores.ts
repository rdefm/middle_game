import { useGameStore } from '@/store/gameStore';
import { computeScores } from '@/utils/scoreEngine';
import { Scores } from '@/store/types';

export function useScores(): Scores {
  const decisions = useGameStore((s) => s.decisions);
  return computeScores(decisions);
}