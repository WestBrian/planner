import { FC, Children } from 'react'
import { motion, Variants } from 'framer-motion'
import { Label } from '../label'
import { Input } from '../input'
import { Textarea } from '../textarea'
import { TaskLength, TaskType } from '../time-card/types'
import { useForm, SubmitHandler } from 'react-hook-form'
import { Button } from '../button'
import { addTask } from '../../services/tasks'
import { Select } from '../select'
import range from 'lodash/range'
import { parse, format } from 'date-fns'
import { TaskTypes } from './TaskTypes'
import { BlockRadio } from './BlockRadio'
import { Days, days } from '../day-selector/types'

const parentVariants: Variants = {
  visible: {
    transition: {
      staggerChildren: 0.3
    }
  },
  hidden: {}
}

const childVariants: Variants = {
  visible: {
    opacity: 1,
    y: 0
  },
  hidden: {
    opacity: 0,
    y: 15
  }
}

const lengths: TaskLength[] = [15, 30, 45, 60]

interface FormState {
  day: Days
  hour: string
  minutes: string
  name: string
  length: string
  desc: string
  type: TaskType
}

const FormWrapper: FC = ({ children }) => {
  const childrenLength = Children.toArray(children).length

  return (
    <motion.div
      initial={'hidden'}
      animate={'visible'}
      variants={parentVariants}
    >
      {Children.map(children, (child, index) => (
        <motion.div
          variants={childVariants}
          className={childrenLength - 1 !== index ? 'mb-8' : ''}
        >
          {child}
        </motion.div>
      ))}
    </motion.div>
  )
}

interface NewTaskFormProps {
  onAfterSubmit?: () => void
}

export const NewTaskForm: FC<NewTaskFormProps> = ({ onAfterSubmit }) => {
  const { register, handleSubmit, watch } = useForm<FormState>()

  const selectedLength = watch('length')
  const selectedType = watch('type')

  const onSubmit: SubmitHandler<FormState> = (data) => {
    const { hour, minutes, ...rest } = data
    const startTime = parse(`${hour}:${minutes}`, 'H:mm', new Date())
    addTask({
      ...rest,
      startTime: format(startTime, 'HH:mm'),
      completed: false
    })
    if (onAfterSubmit) {
      onAfterSubmit()
    }
  }

  return (
    <div className="text-gray-900">
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormWrapper>
          <Select label={'Day'} options={[...days]} {...register('day')} />
          <div className="flex flex-row gap-4 md:gap-12">
            <Select
              label={'Start Time (hour)'}
              options={range(15).map((n) => String(n + 8))}
              {...register('hour')}
            />
            <Select
              label={'Start Time (minutes)'}
              options={['00', '15', '30', '45']}
              {...register('minutes')}
            />
          </div>
          <Input
            label="Task Name"
            placeholder="Eat breakfast"
            {...register('name')}
          />
          <div className="flex flex-col gap-2">
            <Label>Time (Minutes)</Label>
            <div className="flex flex-row flex-wrap gap-4 md:gap-12">
              {lengths.map((length) => (
                <BlockRadio
                  key={`l${length}`}
                  label={String(length)}
                  value={String(length)}
                  name="length"
                  selected={String(length) === selectedLength}
                  register={register}
                />
              ))}
            </div>
          </div>
          <Textarea
            label="Description"
            placeholder="Cook and eat a healthy breakfast"
            {...register('desc')}
          />
          <TaskTypes selected={selectedType} register={register} />
          <div className="flex flex-col md:flex-row justify-end gap-4">
            <Button type="submit" variant="tertiary">
              Add and create another task
            </Button>
            <Button type="submit">Add Task</Button>
          </div>
        </FormWrapper>
      </form>
    </div>
  )
}
