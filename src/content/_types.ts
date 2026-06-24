import type { DecisionKey, EndingType, Scores } from '@/store/types'

export type SceneContent = {
  title?:       string
  subtitle?:    string
  from?:        string
  to?:          string
  date?:        string
  re?:          string
  body?:        string
  paragraphs?:  string[]
  lines?:       SpeakerLine[]
  policyRef?:   string
  warnText?:    string
  note?:        string
}

export type SpeakerLine = {
  speaker: string
  text:    string
  isPlayer?: boolean
}

export type Scene = {
  id:         string
  screenType: 'memo' | 'meeting' | 'inbox' | '1on1' | 'scene' | 'summary' | 'ending'
  content:    SceneContent | ((decisions: Partial<Record<DecisionKey, string | number>>) => SceneContent)
}

export type Decision = {
  key:        DecisionKey
  options:    DecisionOption[]
  policyRef?: string
  warnText?:  string | ((decisions: Partial<Record<DecisionKey, string | number>>) => string)
}

export type DecisionOption = {
  label:       string
  value:       string
  stampText:   string
  stampType:   'approved' | 'denied' | 'neutral'
  scoreDeltas: Partial<Scores>
}

export type Branch = {
  condition: (decisions: Partial<Record<DecisionKey, string | number>>) => boolean
  content:   Partial<SceneContent>
}

export type Ending = {
  type:     EndingType
  title:    string
  body:     string
  dhNote?:  string
}

export type TabConfig = {
  key:     string
  label:   string
  visible: boolean
}