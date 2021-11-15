import { auth, firestore, arrayUnion } from './firebase'
import { format, addDays } from 'date-fns'
import { useDocumentData } from 'react-firebase-hooks/firestore'
import { TaskType } from '../components/time-card/types'
import { Days } from '../components/day-selector/types'

const getNowDocRef = () => {
  const { currentUser } = auth

  if (currentUser) {
    const now = new Date()
    return firestore
      .collection('users')
      .doc(currentUser.uid)
      .collection('tasks')
      .doc(format(now, 'MM-dd-y'))
  }

  return null
}

const getTomorrowDocRef = () => {
  const { currentUser } = auth

  if (currentUser) {
    const now = new Date()
    return firestore
      .collection('users')
      .doc(currentUser.uid)
      .collection('tasks')
      .doc(format(addDays(now, 1), 'MM-dd-y'))
  }

  return null
}

export interface Task {
  name: string
  desc: string
  length: string
  startTime: string
  type: TaskType
  completed: boolean
}

export const addTask = (payload: Task & { day: Days }) => {
  const { day, ...task } = payload
  const ref = day === 'today' ? getNowDocRef() : getTomorrowDocRef()

  if (ref) {
    ref.set(
      {
        tasks: arrayUnion(task)
      },
      {
        merge: true
      }
    )
  }
}

export const useTasks = (day: Days = 'today') => {
  return useDocumentData<{ tasks: Task[] }>(
    day === 'today' ? getNowDocRef() : getTomorrowDocRef()
  )
}
