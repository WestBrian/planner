import { FC } from 'react'
import { UseFormRegister } from 'react-hook-form'
import { TaskType, taskTypes } from '../time-card/types'
import { BlockRadio } from './BlockRadio'
import { Label } from '../label'
import { getEmoji } from '../time-card/helpers'

interface TaskTypesProps {
  selected: TaskType
  register: UseFormRegister<any>
}

export const TaskTypes: FC<TaskTypesProps> = ({ selected, register }) => {
  return (
    <div className="flex flex-col gap-2">
      <Label>Task Type</Label>
      <div className="flex flex-row flex-wrap gap-4 md:gap-12">
        {taskTypes.map((type) => (
          <BlockRadio
            key={type}
            label={type}
            emoji={getEmoji(type)}
            value={type}
            name="type"
            selected={selected === type}
            register={register}
          />
        ))}
      </div>
    </div>
  )
}
