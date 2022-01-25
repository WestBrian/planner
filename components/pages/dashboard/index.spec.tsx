import { render, screen, fireEvent, toMock } from '../../../test-utils'
import { tasks } from '../../../test-data'
import { Dashboard } from './'
import { useTasks } from '../../../services/tasks'
import { Days } from '../../day-selector/types'
import { useMemo } from 'react'
import router from 'next/router'

jest.mock('next/dist/client/router', () => require('next-router-mock'))

jest.mock('../../../services/tasks', () => {
  return {
    useTasks: jest.fn()
  }
})

const mockedUseTasks = toMock(useTasks)

function useTasksImpl(day?: Days): ReturnType<typeof useTasks> {
  const formattedTasks = useMemo(
    () => tasks.map((t) => ({ ...t, name: `${day} ${t.name}` })),
    [day]
  )

  return [formattedTasks as any, false, undefined]
}

const setup = () => {
  render(<Dashboard />)
}

describe('<Dashboard />', () => {
  beforeEach(() => {
    mockedUseTasks.mockClear()
    mockedUseTasks.mockImplementation(useTasksImpl)
  })

  it('renders correctly', () => {
    setup()
    expect(screen.queryByText('today Make lunch')).toBeInTheDocument()
  })

  it('switches day view', () => {
    setup()
    fireEvent.click(screen.getByLabelText('tomorrow'))
    expect(screen.queryByText('tomorrow Make lunch')).toBeInTheDocument()
  })

  it('navigates to the edit screen when a time card is clicked', () => {
    setup()
    fireEvent.click(screen.getByText('today Make lunch'))
    expect(router.pathname).toBe('/3/edit')
  })
})
