import { FC } from 'react'
import { TaskLength, TaskType } from './types'
import {
  typeToBorderColor,
  typeToBgColor,
  typeToMetaColor,
  typeToTitleColor,
  typeToInteractableBackgroundColor,
  typeToInteractableTextColor
} from './helpers'
import classNames from 'classnames'
import { ClockIcon, CheckCircleIcon } from '@heroicons/react/outline'
import { format, addMinutes } from 'date-fns'

interface TimeCardProps {
  title: string
  desc?: string
  startTime: Date
  taskTime: TaskLength
  completed: boolean
  type: TaskType
}

export const TimeCard: FC<TimeCardProps> = ({
  title,
  desc,
  startTime,
  taskTime,
  completed,
  type
}) => {
  const wrapperClasses = classNames({
    'px-4': true,
    'py-2': true,
    [typeToBgColor(type)]: true,
    'border-l-8': true,
    [typeToBorderColor(type)]: true,
    'rounded-lg': true,
    flex: true,
    'flex-row': true,
    'items-center': true,
    'justify-between': true,
    'h-card-small': taskTime === 15 || taskTime === 30,
    'h-card-medium': taskTime === 45,
    'h-card-large': taskTime === 60
  })

  const titleClasses = classNames({
    'text-base': true,
    'font-semibold': true,
    [typeToTitleColor(type)]: true
  })

  const descClasses = classNames({
    'text-xs': true,
    [typeToMetaColor(type)]: true
  })

  const timeClasses = classNames({
    'text-xs': true,
    'font-semibold': true,
    [typeToMetaColor(type)]: true,
    flex: true,
    'flex-row': true,
    'gap-1.5': true,
    'items-center': true
  })

  const buttonClasses = classNames({
    'w-10': true,
    'p-1.5': true,
    [typeToInteractableBackgroundColor(type)]: true,
    'rounded-full': true,
    [typeToInteractableTextColor(type)]: true,
    'h-auto': true
  })

  return (
    <div className={wrapperClasses}>
      <div className="flex flex-col justify-between h-full">
        <div>
          <h2 className={titleClasses}>{title}</h2>
          {desc && taskTime > 30 && <p className={descClasses}>{desc}</p>}
        </div>
        <div className={timeClasses}>
          <ClockIcon className="w-3" />
          <span>
            {format(startTime, 'hh:mm')} -{' '}
            {format(addMinutes(startTime, taskTime), 'hh:mm aa')}
          </span>
        </div>
      </div>
      {type !== 'free-time' && (
        <div>
          <button className={buttonClasses} aria-label={`Complete ${title}`}>
            <CheckCircleIcon />
          </button>
        </div>
      )}
    </div>
  )
}
