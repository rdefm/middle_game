import type { DecisionKey, EndingType } from '@/store/types'

export const WEEKS: readonly number[] = [1, 2, 3, 4, 5, 6, 7, 8] as const

export const DECISION_KEYS: readonly DecisionKey[] = [
  // Week 1
  'priya_leave',
  'craig_leave',
  'dayo_flex',
  'rhonda_performance',
  'priya_1on1_response',
  // Week 2
  'ben_flag',
  'yemi_onboarding',
  'energy_score',
  'craig_1on1_response',
  // Week 3
  'situation_a',
  'situation_b',
  'away_day_conflicts',
  'w3_1on1_response',
  // Week 4
  'diagnostic_response',
  'activity_group_response',
  'lunch_response',
  'postit_choice',
  // Week 5
  'diana_first_impression',
  'diana_corridor',
  'team_role_application',
  'marcus_diana_question',
  // Week 6
  'expense_email',
  'rhonda_finding',
  'w6_1on1_response',
  // Week 7
  'yemi_theory_response',
  'team_transparency',
  'craig_w7_response',
  'team_win_acknowledged',
  // Week 8
  'war_room_lead',
  'war_room_numbers',
  'war_room_client_call',
  'war_room_insight',
  'thursday_evening_response',
] as const

export const SCORE_KEYS: readonly (keyof import('@/store/types').Scores)[] = [
  'morale',
  'leadership',
  'ops',
  'policy',
] as const

export const ENDING_TYPES: readonly EndingType[] = [
  'restructured_out',
  'you_hand_it_in',
  'marcus_leaves_pushed',
  'marcus_leaves_quietly',
  'back_on_monday',
  'something_shifted',
] as const

// IAP gate — must remain false through Phases 1–4.
// Set to true only in Phase 5 when expo-in-app-purchases is implemented.
// Do not override this value in screen logic; read only from here.
export const PAYWALL_ENABLED = false