export const colours = {
  paper:        '#F2EFE8',
  ink:          '#1A1A18',
  inkFaint:     '#6B6B62',
  inkMid:       '#3D3D36',
  rule:         '#C8C4B8',
  accent:       '#2B4A8C',
  accentSoft:   '#E8EDF7',
  warn:         '#8C2B2B',
  warnSoft:     '#F7E8E8',
  stampApprove: '#1A6B3A',
  stampDeny:    '#8C2B2B',
  highlight:    '#F5E642',
  appBg:        '#2A2A26',
} as const

export type ColourKey = keyof typeof colours