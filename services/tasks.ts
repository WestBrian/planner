import { auth, firestore, arrayUnion } from './firebase'
import { format } from 'date-fns'
import { useDocumentData } from 'react-firebase-hooks/firestore'
import { TaskType } from '../components/time-card/types'

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

export interface Task {
  name: string
  desc: string
  length: string
  startTime: string
  type: TaskType
  completed: boolean
}

export const addTask = (payload: Task) => {
  const nowRef = getNowDocRef()

  if (nowRef) {
    nowRef.set(
      {
        tasks: arrayUnion(payload)
      },
      {
        merge: true
      }
    )
  }
}

export const useTasks = () => {
  const nowRef = getNowDocRef()
  return useDocumentData<{ tasks: Task[] }>(nowRef)
}
