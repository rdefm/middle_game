export type DecisionKey =
  // Week 1
  | 'priya_leave'
  | 'craig_leave'
  | 'dayo_flex'
  | 'rhonda_performance'
  | 'priya_1on1_response'
  // Week 2
  | 'ben_flag'
  | 'yemi_onboarding'
  | 'energy_score'
  | 'craig_1on1_response'
  // Week 3
  | 'situation_a'
  | 'situation_b'
  | 'away_day_conflicts'
  | 'w3_1on1_response'
  // Week 4 (Away Day)
  | 'diagnostic_response'
  | 'activity_group_response'
  | 'lunch_response'
  | 'postit_choice'
  // Week 5 (Restructure)
  | 'diana_first_impression'
  | 'diana_corridor'
  | 'team_role_application'
  | 'marcus_diana_question'
  // Week 6 (Above Your Pay Grade)
  | 'expense_email'
  | 'rhonda_finding'
  | 'w6_1on1_response'
  // Week 7 (What Actually Happened)
  | 'yemi_theory_response'
  | 'team_transparency'
  | 'craig_w7_response'
  | 'team_win_acknowledged'
  // Week 8 (The War Room)
  | 'war_room_lead'
  | 'war_room_numbers'
  | 'war_room_client_call'
  | 'war_room_insight'
  | 'thursday_evening_response'

// NOTE: team_win_acknowledged must be stored as the string 'true' or 'false', never a boolean.
// The decisions record value type is string | number only. Use makeDecision('team_win_acknowledged', 'true').

export type EndingType =
  | 'restructured_out'
  | 'you_hand_it_in'
  | 'marcus_leaves_pushed'
  | 'marcus_leaves_quietly'
  | 'back_on_monday'
  | 'something_shifted'

export type Scores = {
  morale:     number
  leadership: number
  ops:        number
  policy:     number
}

export type GameStore = {
  currentWeek:  number
  weekUnlocked: Record<number, boolean>
  decisions:    Partial<Record<DecisionKey, string | number>>
  weekScores:   Record<number, Scores>
  endingType:   EndingType | null

  makeDecision: (key: DecisionKey, value: string | number) => void
  unlockWeek:   (week: number) => void
  resetGame:    () => void
}