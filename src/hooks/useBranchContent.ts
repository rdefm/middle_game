import { useGameStore } from '@/store/gameStore';
import { resolveScene } from '@/utils/branchResolver';

export function useBranchContent(sceneId: string) {
  const decisions = useGameStore((s) => s.decisions);
  return resolveScene(sceneId, decisions);
}