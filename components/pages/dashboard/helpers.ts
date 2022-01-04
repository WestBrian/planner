import { Task } from '../../../services/tasks'
import { taskLengths } from '../../time-card/types'
import {
  format,
  addHours,
  addMinutes,
  parse,
  areIntervalsOverlapping,
  Interval,
  isBefore
} from 'date-fns'

// TODO: Use user preference start/end hours
const START_HOUR = 8
const END_HOUR = 22

function newFreeTimeTask(date: Date, length: string): Task & { id: string } {
  return {
    name: 'Free time',
    desc: 'Do whatever you want!',
    startTime: format(date, 'HH:mm'),
    length,
    type: 'free-time',
    completed: false,
    id: ''
  }
}

function hourToDate(hour: number) {
  const now = new Date()
  return new Date(now.getFullYear(), now.getMonth(), now.getDate(), hour)
}

function calculatePotentialSpots(length: number) {
  return (60 - length) / 15 + 1
}

export function dateStrToDate(dateStr: string) {
  return parse(dateStr, 'HH:mm', new Date())
}

export function taskToInterval(task: Task): Interval {
  return {
    start: dateStrToDate(task.startTime),
    end: addMinutes(dateStrToDate(task.startTime), Number(task.length))
  }
}

export function computeFreeTime(
  tasks: (Task & { id: string })[]
): (Task & { id: string })[] {
  const freeTimes: (Task & { id: string })[] = []

  for (let i = START_HOUR; i < END_HOUR; i++) {
    const startOfHour = hourToDate(i)
    const endOfHour = addHours(startOfHour, 1)

    const hourHasTasks = tasks.some((task) =>
      areIntervalsOverlapping(taskToInterval(task), {
        start: startOfHour,
        end: endOfHour
      })
    )

    if (hourHasTasks) {
      for (const taskLength of [...taskLengths].reverse()) {
        const potentialSpots = calculatePotentialSpots(taskLength)
        for (let j = 0; j < potentialSpots; j++) {
          const startInterval: Interval = {
            start: addMinutes(startOfHour, j * 15),
            end: addMinutes(addMinutes(startOfHour, j * 15), taskLength)
          }
          const isOverlapping = [...tasks, ...freeTimes].some((task) =>
            areIntervalsOverlapping(startInterval, taskToInterval(task))
          )
          if (!isOverlapping) {
            freeTimes.push(
              newFreeTimeTask(startInterval.start as Date, String(taskLength))
            )
          }
        }
      }
    } else {
      freeTimes.push(newFreeTimeTask(startOfHour, '60'))
    }
  }

  return freeTimes
}

export function sortTasks(
  tasks: (Task & { id: string })[]
): (Task & { id: string })[] {
  return [...tasks].sort((a, b) => {
    if (isBefore(dateStrToDate(a.startTime), dateStrToDate(b.startTime))) {
      return -1
    } else if (
      isBefore(dateStrToDate(b.startTime), dateStrToDate(a.startTime))
    ) {
      return 1
    } else {
      return 0
    }
  })
}
