import { DecisionKey } from '@/store/types';
import { useGameStore } from '@/store/gameStore';

type MakeDecision = (value: string | number) => void;

export function useDecision(
  key: DecisionKey,
): [string | number | undefined, MakeDecision] {
  const value = useGameStore((s) => s.decisions[key]);
  const makeDecisionStore = useGameStore((s) => s.makeDecision);

  const makeDecision: MakeDecision = (val) => {
    makeDecisionStore(key, val);
  };

  return [value, makeDecision];
}