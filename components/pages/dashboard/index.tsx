import { useState, useEffect } from 'react'
import { TimeCard } from '../../time-card'
import {
  parse,
  isBefore,
  isSameHour,
  format,
  areIntervalsOverlapping,
  addMinutes,
  Interval
} from 'date-fns'
import { NewTaskButton } from '../../new-task-button'
import { motion, Variants } from 'framer-motion'
import { Task, useTasks } from '../../../services/tasks'

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

  function startTimeToDate(startTime: string) {
    const now = new Date()
    return parse(startTime, 'HH:mm', now)
  }

  function getDateFromHour(hour: number) {
    const now = new Date()
    return new Date(now.getFullYear(), now.getMonth(), now.getDate(), hour)
  }

  function getPartialFreeTime(hour: Date, tasksInHour: Task[]) {
    const partials: Task[] = []

    const busyIntervals: Interval[] = tasksInHour.map((task) => ({
      start: startTimeToDate(task.startTime),
      end: addMinutes(startTimeToDate(task.startTime), Number(task.length))
    }))

    for (let i = 0; i < 4; i++) {
      const minutesToAdd = i * 15

      if (
        !busyIntervals.some((interval) =>
          areIntervalsOverlapping(
            {
              start: addMinutes(hour, minutesToAdd),
              end: addMinutes(addMinutes(hour, minutesToAdd), 15)
            },
            interval
          )
        )
      ) {
        partials.push({
          name: 'Free time',
          desc: 'Do whatever you want!',
          startTime: format(addMinutes(hour, minutesToAdd), 'HH:mm'),
          length: '15',
          type: 'free-time',
          completed: false
        })
      }
    }

    return partials
  }

  function fillInFreeTime(tasks: Task[]) {
    const startHour = 8
    const endHour = 22
    const freeTimes: Task[] = []

    for (let i = startHour; i < endHour; i++) {
      const hour = getDateFromHour(i)
      const tasksInHour = tasks.filter((task) =>
        isSameHour(startTimeToDate(task.startTime), hour)
      )
      if (tasksInHour.length > 0) {
        // getPartialFreeTime(hour, tasksInHour).forEach((partial) =>
        //   freeTimes.push(partial)
        // )

        const partials = getPartialFreeTime(hour, tasksInHour)
        partials.forEach((partial) => freeTimes.push(partial))
      } else {
        freeTimes.push({
          name: 'Free time',
          desc: 'Do whatever you want!',
          startTime: format(hour, 'HH:mm'),
          length: '60',
          type: 'free-time',
          completed: false
        })
      }
    }

    setTasks([...tasks, ...freeTimes])
  }

  const [tasks, setTasks] = useState<Task[]>([])

  useEffect(() => {
    if (values) {
      fillInFreeTime(values.tasks)
    }
  }, [values])

  return (
    <>
      <motion.div className="w-full mx-auto" style={{ maxWidth: 960 }}>
        {tasks
          .sort((a, b) => {
            if (
              isBefore(
                startTimeToDate(a.startTime),
                startTimeToDate(b.startTime)
              )
            ) {
              return -1
            } else if (
              isBefore(
                startTimeToDate(b.startTime),
                startTimeToDate(a.startTime)
              )
            ) {
              return 1
            } else {
              return 0
            }
          })
          .map((task, index) => (
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
                startTime={startTimeToDate(task.startTime)}
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
