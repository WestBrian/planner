import { render, screen, fireEvent } from '../../test-utils'
import { TimeCard, TimeCardProps } from './'

const defaultValues: TimeCardProps = {
  title: 'test task',
  desc: 'test description',
  startTime: new Date(),
  taskTime: 60,
  completed: false,
  type: 'hobby',
  onEdit: jest.fn()
}

const setup = (props?: Partial<TimeCardProps>) => {
  render(<TimeCard {...{ ...defaultValues, ...props }} />)
}

describe('<TimeCard />', () => {
  it('is a button when not `free-time`', () => {
    setup()
    expect(screen.getByTestId('task-wrapper').localName).toBe('button')
  })

  it('is a div when `free-time`', () => {
    setup({ type: 'free-time' })
    expect(screen.getByTestId('task-wrapper').localName).toBe('div')
  })
})
