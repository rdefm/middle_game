import { useGameStore } from '@/store/gameStore';
import { DecisionKey } from '@/store/types';

// Required decisions per week. A week is complete when all of its
// required decision keys have a non-null, non-undefined value.
const REQUIRED_DECISIONS: Record<number, DecisionKey[]> = {
  1: ['priya_leave', 'craig_leave', 'dayo_flex', 'rhonda_performance', 'priya_1on1_response'],
  2: ['ben_flag', 'yemi_onboarding', 'energy_score', 'craig_1on1_response'],
  3: ['situation_a', 'situation_b', 'away_day_conflicts', 'w3_1on1_response'],
  4: ['diagnostic_response', 'activity_group_response', 'lunch_response', 'postit_choice'],
  5: ['diana_first_impression', 'diana_corridor', 'team_role_application', 'marcus_diana_question'],
  6: ['expense_email', 'w6_1on1_response'],
  7: ['yemi_theory_response', 'team_transparency', 'team_win_acknowledged'],
  8: ['war_room_lead', 'war_room_numbers', 'war_room_client_call', 'war_room_insight', 'thursday_evening_response'],
};

export function useWeekComplete(week: number): boolean {
  const decisions = useGameStore((s) => s.decisions);
  const required = REQUIRED_DECISIONS[week] ?? [];
  return required.every((key) => decisions[key] != null);
}