export const days = ['today', 'tomorrow'] as const

export type Days = typeof days[number]
