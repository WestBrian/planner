import { useState, useEffect, useRef } from 'react'
import { auth, firestore } from './firebase'
import { format, parse, addDays, isToday } from 'date-fns'
import {
  useCollectionData,
  useCollectionDataOnce,
  useDocumentDataOnce
} from 'react-firebase-hooks/firestore'
import { TaskType } from '../components/time-card/types'
import { Days } from '../components/day-selector/types'

export interface Task {
  name: string
  desc: string
  length: string
  startTime: string
  type: TaskType
  completed: boolean
  id?: string
}

const getTodayCollection = () => {
  const { currentUser } = auth

  if (currentUser) {
    const now = new Date()
    return firestore
      .collection('users')
      .doc(currentUser.uid)
      .collection('days')
      .doc(format(now, 'MM-dd-y'))
      .collection('tasks')
  }

  return null
}

const getTomorrowCollection = () => {
  const { currentUser } = auth

  if (currentUser) {
    const now = new Date()
    return firestore
      .collection('users')
      .doc(currentUser.uid)
      .collection('days')
      .doc(format(addDays(now, 1), 'MM-dd-y'))
      .collection('tasks')
  }

  return null
}

const getRefFromDay = (day: Days) => {
  return day === 'today' ? getTodayCollection() : getTomorrowCollection()
}

export const addTask = (payload: Task & { day: Days }) => {
  const { day, ...task } = payload
  const ref = getRefFromDay(day)

  if (ref) {
    ref.doc().set(task)
  }
}

export const updateTask = (
  id: string,
  payload: Task & { day: Days },
  oldDay: Days
) => {
  const { day, ...task } = payload
  const ref = getRefFromDay(day)

  if (day !== oldDay) {
    deleteTask(id, oldDay)
  }

  if (ref) {
    ref.doc(id).set(task)
  }
}

export const deleteTask = (id: string, day: Days) => {
  const ref = getRefFromDay(day)

  if (ref) {
    ref.doc(id).delete()
  }
}

export const useTasks = (day: Days = 'today') => {
  const ref = getRefFromDay(day)
  return useCollectionData<Task, 'id'>(ref, {
    idField: 'id'
  })
}

export const useTasksOnce = (day: Days | null) => {
  return useCollectionDataOnce<Task>(day ? getRefFromDay(day) : null, {
    idField: 'id'
  })
}

const useRefFromId = (id: string) => {
  const [ref, setRef] =
    useState<firebase.default.firestore.CollectionReference<firebase.default.firestore.DocumentData> | null>(
      null
    )

  useEffect(() => {
    const todayRef = getTodayCollection()
    const tomorrowRef = getTomorrowCollection()

    todayRef
      ?.doc(id)
      .get()
      .then((snapshot) => {
        if (snapshot.exists) {
          setRef(todayRef)
        }
      })

    tomorrowRef
      ?.doc(id)
      .get()
      .then((snapshot) => {
        if (snapshot.exists) {
          setRef(tomorrowRef)
        }
      })
  }, [id])

  return ref
}

export const useTaskOnce = (id: string) => {
  const ref = useRefFromId(id)
  return useDocumentDataOnce<Task>(ref?.doc(id))
}

export const useDayFromId = (id: string): Days | null => {
  const ref = useRefFromId(id)

  if (ref) {
    const parentDate = ref.parent?.id
    if (parentDate) {
      const date = parse(parentDate, 'MM-dd-y', new Date())
      return isToday(date) ? 'today' : 'tomorrow'
    }
  }

  return null
}
