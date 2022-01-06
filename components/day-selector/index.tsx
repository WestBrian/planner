import { FC } from 'react'
import { Days, days } from './types'

export interface DaySelectorProps {
  currentDay: Days
  onChange: (day: Days) => void
}

export const DaySelector: FC<DaySelectorProps> = ({ currentDay, onChange }) => {
  return (
    <div className="mb-8 flex flex-row gap-4 border-2 border-gray-200 rounded px-4">
      {days.map((day) => (
        <div key={day} className="flex flex-row items-center gap-2">
          <input
            id={`${day}-radio`}
            type="radio"
            value={day}
            checked={currentDay === day}
            onChange={() => onChange(day)}
          />
          <label htmlFor={`${day}-radio`}>{day}</label>
        </div>
      ))}
    </div>
  )
}
