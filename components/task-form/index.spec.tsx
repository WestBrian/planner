import { render, screen, fireEvent, waitFor } from '../../test-utils'
import { TaskForm, TaskFormProps } from './'
import { parse } from 'date-fns'
import { tasks } from '../../test-data'

const defaultValues: TaskFormProps = {
  heading: 'NEW TASK',
  submitButtonText: 'Add task',
  defaultValues: {
    day: 'today',
    taskName: 'test task',
    startTime: parse('8:00', 'HH:mm', new Date()),
    taskLength: '60',
    taskType: 'chore',
    description: ''
  },
  currentTaskId: '1',
  currentTasks: tasks,
  onClose: jest.fn(),
  onSubmit: jest.fn()
}

const setup = (props?: Partial<TaskFormProps>) => {
  render(<TaskForm {...{ ...defaultValues, ...props }} />)

  return {
    getDaySelect: () => screen.getByLabelText('Day'),
    getNameInput: () => screen.getByLabelText('Task name'),
    getStartHourSelect: () => screen.getByLabelText('Start time (08:00 AM)'),
    getStartMinuteRadio: () => screen.getAllByRole('radiogroup')[0],
    getLengthSelect: () => screen.getByLabelText('Length of task'),
    getTypeRadio: () => screen.getAllByRole('radiogroup')[1],
    getDescriptionTextarea: () =>
      screen.getByLabelText('Description (optional)')
  }
}

describe('<TaskForm />', () => {
  it('calls `onSubmit` when entering valid data', async () => {
    const onSubmitMock = jest.fn()
    const {
      getDaySelect,
      getNameInput,
      getStartHourSelect,
      getLengthSelect,
      getTypeRadio,
      getDescriptionTextarea
    } = setup({ onSubmit: onSubmitMock })
    fireEvent.change(getDaySelect(), {
      target: {
        value: 'tomorrow'
      }
    })
    fireEvent.change(getNameInput(), {
      target: {
        value: 'test application'
      }
    })
    fireEvent.change(getStartHourSelect(), {
      target: {
        value: '14'
      }
    })
    fireEvent.change(getLengthSelect(), {
      target: {
        value: '45'
      }
    })
    fireEvent.click(getTypeRadio().getElementsByTagName('input')[1])
    fireEvent.change(getDescriptionTextarea(), {
      target: {
        value: 'this is a test description'
      }
    })
    fireEvent.submit(screen.getByRole('form'))
    await waitFor(() => expect(onSubmitMock).toHaveBeenCalled())
    expect(onSubmitMock).toHaveBeenLastCalledWith(
      {
        day: 'tomorrow',
        description: 'this is a test description',
        startTime: expect.any(Date),
        taskLength: '45',
        taskName: 'test application',
        taskType: 'fun'
      },
      expect.anything()
    )
  })
})
