import type { Task } from '../../services/tasks'
import type { FormState } from './index'
import { format } from 'date-fns'
import { Days } from '../day-selector/types'

export function formStateToTask(values: FormState): Task & { day: Days } {
  return {
    name: values.taskName,
    desc: values.description,
    length: values.taskLength,
    startTime: format(values.startTime, 'HH:mm'),
    type: values.taskType,
    completed: false,
    day: values.day
  }
}
