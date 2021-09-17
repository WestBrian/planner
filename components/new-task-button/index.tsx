import { useState } from 'react'
import { motion } from 'framer-motion'
import { PlusIcon, XIcon } from '@heroicons/react/solid'
import classNames from 'classnames'
import { useWindowSize } from '@react-hook/window-size'
import { NewTaskForm } from '../new-task-form'

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

export const NewTaskButton = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [width, height] = useWindowSize()

  const open = () => setIsOpen(true)
  const close = () => setIsOpen(false)

  const buttonClasses = classNames({
    block: true,
    'text-white': true,
    'p-4': true,
    'bg-green-500': true,
    'hover:bg-green-600': true,
    fixed: true,
    'bottom-8': true,
    'right-8': true,
    'origin-bottom-right': true,
    'overflow-y-scroll': true,
    'shadow-lg': open
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
        <div>
          <div className="flex flex-row justify-end">
            <button className="w-8 text-gray-900" onClick={close}>
              <XIcon />
            </button>
          </div>
          <NewTaskForm />
        </div>
      ) : (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <PlusIcon />
        </motion.div>
      )}
    </motion.div>
  )
}
