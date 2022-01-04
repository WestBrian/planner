import { FC } from 'react'
import { TaskLength, TaskType } from './types'
import {
  typeToBorderColor,
  typeToBgColor,
  typeToMetaColor,
  typeToTitleColor,
  typeToInteractableBackgroundColor,
  typeToInteractableTextColor,
  typeToHoverBgColor,
  typeToHoverInteractableBackgroundColor,
  getEmoji
} from './helpers'
import classNames from 'classnames'
import { ClockIcon, CheckIcon } from '@heroicons/react/outline'
import { format, addMinutes } from 'date-fns'

interface TimeCardProps {
  title: string
  desc?: string
  startTime: Date
  taskTime: TaskLength
  completed: boolean
  type: TaskType
  onEdit: () => void
}

export const TimeCard: FC<TimeCardProps> = ({
  title,
  desc,
  startTime,
  taskTime,
  completed,
  type,
  onEdit
}) => {
  const isNotFreeTime = type !== 'free-time'

  const wrapperClasses = classNames({
    block: true,
    'w-full': true,
    'px-4': true,
    'py-2': true,
    [typeToBgColor(type)]: true,
    [typeToHoverBgColor(type)]: isNotFreeTime,
    'border-l-8': true,
    [typeToBorderColor(type)]: true,
    'rounded-l-lg': type !== 'free-time',
    'rounded-lg': type === 'free-time',
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
    'p-4': true,
    [typeToInteractableBackgroundColor(type)]: true,
    [typeToHoverInteractableBackgroundColor(type)]: true,
    'rounded-r-lg': true,
    [typeToInteractableTextColor(type)]: true,
    'h-auto': true
  })

  const Tag = isNotFreeTime ? 'button' : 'div'

  return (
    <div className="flex flex-row">
      <Tag
        className={wrapperClasses}
        onClick={isNotFreeTime ? onEdit : undefined}
      >
        <div className="flex flex-col justify-between text-left h-full">
          <div>
            <div className="flex flex-row items-center gap-3">
              <span>{getEmoji(type)}</span>
              <h2 className={titleClasses}>{title}</h2>
            </div>
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
      </Tag>
      {type !== 'free-time' && (
        <button className={buttonClasses} aria-label={`Complete ${title}`}>
          <CheckIcon className="w-6" />
        </button>
      )}
    </div>
  )
}
