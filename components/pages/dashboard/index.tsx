import { useState, useEffect } from 'react'
import { TimeCard } from '../../time-card'
import { NewTaskButton } from '../../new-task-button'
import { motion, Variants } from 'framer-motion'
import { Task, useTasks } from '../../../services/tasks'
import { computeFreeTime, sortTasks, dateStrToDate } from './helpers'

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
  const [values] = useTasks()
  const [tasks, setTasks] = useState<Task[]>([])

  useEffect(() => {
    const tasks = values?.tasks || []
    const freeTimes = computeFreeTime(tasks)
    setTasks(sortTasks([...tasks, ...freeTimes]))
  }, [values])

  return (
    <>
      <motion.div className="w-full mx-auto" style={{ maxWidth: 960 }}>
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
              type={task.type || 'hobby'}
              startTime={dateStrToDate(task.startTime)}
              taskTime={Number(task.length) as any}
              completed={false}
            />
          </motion.div>
        ))}
      </motion.div>
      <NewTaskButton />
    </>
  )
}
