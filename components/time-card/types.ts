export type TaskType =
  | 'work'
  | 'hobby'
  | 'well-being'
  | 'chore'
  | 'fun'
  | 'free-time'

export const taskLengths = [15, 30, 45, 60] as const

export type TaskLength = typeof taskLengths[number]
