import { render, screen, fireEvent } from '../../test-utils'
import { tasks } from '../../test-data'
import { NewTaskButton, NewTaskButtonProps } from './'

const defaultValues: NewTaskButtonProps = {
  userTasks: tasks,
  selectedDay: 'today'
}

const setup = (props?: Partial<NewTaskButtonProps>) => {
  render(<NewTaskButton {...{ ...defaultValues, ...props }} />)
}

describe('<NewTaskButton />', () => {
  it('opens the form when clicking on the new task button', () => {
    setup()
    expect(screen.queryByText('NEW TASK')).not.toBeInTheDocument()
    const wrapper = screen.getByTestId('new-task-wrapper')
    fireEvent.click(wrapper)
    expect(screen.queryByText('NEW TASK')).toBeInTheDocument()
  })
})
