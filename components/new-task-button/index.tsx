import { FC, useState } from 'react'
import { motion } from 'framer-motion'
import { PlusIcon, XIcon } from '@heroicons/react/solid'
import classNames from 'classnames'
import { useWindowSize } from '@react-hook/window-size'
import { addTask, Task } from '../../services/tasks'
import { Days } from '../day-selector/types'
import { FormState, TaskForm } from '../task-form'
import { parse } from 'date-fns'
import { formStateToTask } from '../task-form/helpers'

const variants = {
  open: (custom: { width: number; height: number }) => ({
    width: Math.min(custom.width - 64, 640),
    height: custom.height - 64,
    backgroundColor: 'rgb(255, 255, 255)',
    borderRadius: '4px'
  }),
  closed: {
    width: 64,
    height: 64,
    borderRadius: '64px',
    transition: {
      when: 'afterChildren'
    }
  }
}

interface NewTaskButtonProps {
  userTasks: Task[]
  selectedDay: Days
}

export const NewTaskButton: FC<NewTaskButtonProps> = ({
  userTasks,
  selectedDay
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [width, height] = useWindowSize()

  const open = () => setIsOpen(true)
  const close = () => setIsOpen(false)

  function handleSubmit(values: FormState) {
    try {
      addTask(formStateToTask(values))
      close()
    } catch (err) {
      console.error(err)
    }
  }

  const buttonClasses = classNames({
    block: true,
    'text-white': !isOpen,
    'px-4': !isOpen,
    'px-8': isOpen,
    'py-4': true,
    'bg-green-500': true,
    'hover:bg-green-600': true,
    fixed: true,
    'bottom-8': true,
    'right-8': true,
    'origin-bottom-right': true,
    'overflow-y-scroll': true,
    'shadow-lg': true
  })

  return (
    <motion.div
      className={buttonClasses}
      animate={isOpen ? 'open' : 'closed'}
      variants={variants}
      custom={{ width, height }}
      aria-label={!isOpen ? 'add new task' : undefined}
      role={!isOpen ? 'button' : undefined}
      onClick={!isOpen ? open : undefined}
    >
      {isOpen ? (
        <TaskForm
          heading="NEW TASK"
          submitButtonText="Add task"
          defaultValues={{
            day: selectedDay,
            taskName: '',
            startTime: parse('8:00', 'HH:mm', new Date()),
            taskLength: '60',
            taskType: 'chore',
            description: ''
          }}
          currentTasks={userTasks}
          onClose={close}
          onSubmit={handleSubmit}
        />
      ) : (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <PlusIcon />
        </motion.div>
      )}
    </motion.div>
  )
}
