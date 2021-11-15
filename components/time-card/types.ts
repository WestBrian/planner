export const taskTypes = [
  'work',
  'hobby',
  'well-being',
  'chore',
  'fun',
  'free-time'
] as const

export type TaskType = typeof taskTypes[number]

export const taskLengths = [15, 30, 45, 60] as const

export type TaskLength = typeof taskLengths[number]
