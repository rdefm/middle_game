import { useGameStore } from '@/store/gameStore';
import { resolveEnding } from '@/utils/endingResolver';
import { EndingType } from '@/store/types';

export function useEnding(): EndingType {
  const decisions = useGameStore((s) => s.decisions);
  return resolveEnding(decisions);
}