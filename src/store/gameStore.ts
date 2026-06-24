import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GameStore, DecisionKey, Scores } from './types';

const DEFAULT_WEEK_SCORES: Record<number, Scores> = {};

const initialDecisions: GameStore['decisions'] = {};

const initialWeekUnlocked: Record<number, boolean> = {
  1: true,
  2: false,
  3: false,
  4: false,
  5: false,
  6: false,
  7: false,
  8: false,
};

export const useGameStore = create<GameStore>()(
  persist(
    (set) => ({
      currentWeek: 1,
      weekUnlocked: initialWeekUnlocked,
      decisions: initialDecisions,
      weekScores: DEFAULT_WEEK_SCORES,
      endingType: null,

      makeDecision: (key: DecisionKey, value: string | number) =>
        set((state) => ({
          decisions: {
            ...state.decisions,
            [key]: value,
          },
        })),

      unlockWeek: (week: number) =>
        set((state) => ({
          currentWeek: week,
          weekUnlocked: {
            ...state.weekUnlocked,
            [week]: true,
          },
        })),

      resetGame: () =>
        set({
          currentWeek: 1,
          weekUnlocked: initialWeekUnlocked,
          decisions: {},
          weekScores: {},
          endingType: null,
        }),
    }),
    {
      name: 'middle-game-store',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);