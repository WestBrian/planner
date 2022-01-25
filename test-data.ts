import { Task } from './services/tasks'

export const tasks: Task[] = [
  {
    name: 'Clean dishes',
    desc: 'Wash and put away all of the dishes',
    length: '30',
    startTime: '09:00',
    type: 'chore',
    completed: true,
    id: '1'
  },
  {
    name: 'Workout',
    desc: 'Do a full body workout',
    length: '60',
    startTime: '10:00',
    type: 'well-being',
    completed: false,
    id: '2'
  },
  {
    name: 'Make lunch',
    desc: 'Cook and eat a healthy lunch',
    length: '60',
    startTime: '12:00',
    type: 'well-being',
    completed: false,
    id: '3'
  }
]
