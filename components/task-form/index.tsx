import { FC, useEffect } from 'react'
import { Stack, Flex, Heading, Button, CloseButton } from '@chakra-ui/react'
import { TextField } from '../textfield'
import { TimePicker } from '../time-picker'
import { Select } from '../select'
import { Days, days } from '../day-selector/types'
import { taskLengths, TaskType } from '../time-card/types'
import { TypePicker } from '../type-picker'
import { Textarea } from '../textarea'
import { useForm } from 'react-hook-form'
import { Task } from '../../services/tasks'
import { addMinutes, areIntervalsOverlapping, format } from 'date-fns'
import { taskToInterval } from '../pages/dashboard/helpers'

function removeCurrentTask(tasks: Task[], id?: string) {
  if (id) {
    return tasks.filter((task) => task.id !== id)
  } else {
    return tasks
  }
}

export interface FormState {
  day: Days
  taskName: string
  startTime: Date
  taskLength: string
  taskType: TaskType
  description: string
}

interface TaskFormProps {
  heading: string
  submitButtonText?: string
  defaultValues?: Partial<FormState>
  currentTaskId?: string
  currentTasks: Task[]
  onClose: () => void
  onSubmit: (values: FormState) => void
}

export const TaskForm: FC<TaskFormProps> = ({
  heading,
  submitButtonText,
  defaultValues,
  currentTaskId,
  currentTasks,
  onClose,
  onSubmit
}) => {
  const { register, handleSubmit, watch, setValue, formState } =
    useForm<FormState>({
      defaultValues
    })
  const { errors } = formState
  const startTime = watch('startTime')
  const taskLength = watch('taskLength')
  const taskType = watch('taskType')

  useEffect(() => {
    register('startTime', {
      required: true,
      validate: {
        noOverlap: (value) => {
          return !removeCurrentTask(currentTasks, currentTaskId).some((task) =>
            areIntervalsOverlapping(
              {
                start: value,
                end: addMinutes(value, Number(taskLength))
              },
              taskToInterval(task)
            )
          )
        }
      }
    })
  }, [currentTaskId, currentTasks, taskLength, register])

  useEffect(() => {
    register('taskType', {
      required: true
    })
  }, [register])

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing="8">
        <Flex align="center" justify="space-between">
          <Heading as="h1" size="sm">
            {heading}
          </Heading>
          <CloseButton onClick={onClose} />
        </Flex>
        <Select
          label="Day"
          options={[...days]}
          placeholder="Select which day the task is for..."
          error={errors.day}
          {...register('day', {
            required: true
          })}
        />
        <TextField
          label="Task name"
          placeholder="Enter a task name..."
          error={errors.taskName}
          {...register('taskName', {
            required: true
          })}
        />
        <Stack spacing="8" direction={['column', 'row']}>
          <TimePicker
            startHour={8}
            endHour={22}
            value={startTime}
            onChange={(date) => setValue('startTime', date)}
            error={errors.startTime}
          />
          <Select
            label="Length of task"
            options={[...taskLengths].map((l) => ({
              label: `${l} minutes`,
              value: String(l)
            }))}
            placeholder="Select the length of the task..."
            error={errors.taskLength}
            {...register('taskLength', {
              required: true
            })}
          />
        </Stack>
        <TypePicker
          value={taskType}
          onChange={(type) => setValue('taskType', type)}
        />
        <Textarea
          label="Description (optional)"
          placeholder="Enter a description for the task..."
          {...register('description')}
        />
        <Flex justify="flex-end">
          <Button type="submit" colorScheme="teal" variant="solid">
            {submitButtonText || 'Submit'}
          </Button>
        </Flex>
      </Stack>
    </form>
  )
}
