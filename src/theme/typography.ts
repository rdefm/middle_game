export const typography = {
  mono: 'IBMPlexMono',
  sans: 'IBMPlexSans',
  sizes: {
    xs:  10,
    sm:  11,
    base: 13,
    md:  14,
    lg:  15,
    xl:  18,
    xxl: 32,
  },
  weights: {
    light:   '300' as const,
    regular: '400' as const,
    medium:  '500' as const,
  },
} as const

export type FontFamily = 'IBMPlexMono' | 'IBMPlexSans'
export type FontSize = keyof typeof typography.sizes
export type FontWeight = keyof typeof typography.weights