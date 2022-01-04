import { useState, useEffect, useMemo } from 'react'
import { TimeCard } from '../../time-card'
import { NewTaskButton } from '../../new-task-button'
import { motion, Variants } from 'framer-motion'
import { Task, useTasks } from '../../../services/tasks'
import { computeFreeTime, sortTasks, dateStrToDate } from './helpers'
import { DaySelector } from '../../day-selector'
import { Days } from '../../day-selector/types'
import { useRouter } from 'next/router'

const childVariants: Variants = {
  visible: (custom: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: custom * 0.1
    }
  }),
  hidden: {
    opacity: 0,
    y: 15
  }
}

export const Dashboard = () => {
  const router = useRouter()
  const [currentDay, setCurrentDay] = useState<Days>('today')
  const [values] = useTasks(currentDay)
  const [tasks, setTasks] = useState<(Task & { id: string })[]>([])

  const userTasks = useMemo(() => values || [], [values])

  useEffect(() => {
    const freeTimes = computeFreeTime(userTasks)
    setTasks(sortTasks([...userTasks, ...freeTimes]))
  }, [userTasks])

  return (
    <>
      <motion.div className="w-full mx-auto" style={{ maxWidth: 960 }}>
        <DaySelector
          currentDay={currentDay}
          onChange={(day) => setCurrentDay(day)}
        />
        {tasks.map((task, index) => (
          <motion.div
            initial={'hidden'}
            animate={'visible'}
            custom={index}
            variants={childVariants}
            className="mb-4"
            key={task.startTime}
          >
            <TimeCard
              title={task.name}
              desc={task.desc}
              type={task.type}
              startTime={dateStrToDate(task.startTime)}
              taskTime={Number(task.length) as any}
              completed={task.completed}
              onEdit={() => router.push(`/${task.id}/edit`)}
            />
          </motion.div>
        ))}
      </motion.div>
      <NewTaskButton userTasks={userTasks} selectedDay={currentDay} />
    </>
  )
}
