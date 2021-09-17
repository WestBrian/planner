import { FC, Children } from 'react'
import { motion, Variants } from 'framer-motion'
import { Label } from '../label'
import { Input } from '../input'
import { Textarea } from '../textarea'
import { TaskLength } from '../time-card/types'
import { useForm, SubmitHandler } from 'react-hook-form'
import { Button } from '../button'
import { addTask } from '../../services/tasks'
import { Select } from '../select'
import range from 'lodash/range'
import { parse, format } from 'date-fns'

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
  hour: string
  minutes: string
  name: string
  length: string
  desc: string
}

const FormWrapper: FC = ({ children }) => {
  return (
    <motion.div
      initial={'hidden'}
      animate={'visible'}
      variants={parentVariants}
    >
      {Children.map(children, (child) => (
        <motion.div variants={childVariants} className="mb-8">
          {child}
        </motion.div>
      ))}
    </motion.div>
  )
}

export const NewTaskForm: FC = () => {
  const { register, handleSubmit, watch } = useForm<FormState>()

  const selectedLength = watch('length')

  const onSubmit: SubmitHandler<FormState> = (data) => {
    const { hour, minutes, ...rest } = data
    const startTime = parse(`${hour}:${minutes}`, 'H:mm', new Date())
    addTask({
      ...rest,
      startTime: format(startTime, 'HH:mm'),
      type: 'hobby',
      completed: false
    })
  }

  return (
    <div className="text-gray-900 px-4">
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormWrapper>
          <p className="font-semibold text-gray-500 uppercase mb-8">New Task</p>
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
                <div
                  key={`l${length}`}
                  className={`rounded text-white flex justify-center items-center p-4 w-16 h-16 cursor-pointer relative hover:bg-green-600 ${
                    String(length) === selectedLength
                      ? 'bg-green-700'
                      : 'bg-green-500'
                  }`}
                >
                  <input
                    {...register('length')}
                    id={`l${length}`}
                    className="sr-only"
                    type="radio"
                    value={String(length)}
                    name="length"
                  />
                  <label
                    htmlFor={`l${length}`}
                    className="font-semibold text-3xl cursor-pointer w-16 h-16 absolute inset-0 flex justify-center items-center"
                  >
                    {length}
                  </label>
                </div>
              ))}
            </div>
          </div>
          <Textarea
            label="Description"
            placeholder="Cook and eat a healthy breakfast"
            {...register('desc')}
          />
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
