import { DaySelector, DaySelectorProps } from './'
import { render, screen, fireEvent } from '../../test-utils'

const defaultProps: DaySelectorProps = {
  currentDay: 'today',
  onChange: jest.fn()
}

const setup = (props?: Partial<DaySelectorProps>) => {
  render(<DaySelector {...{ ...defaultProps, ...props }} />)
}

describe('<DaySelector />', () => {
  it('calls `onChange` with the correct day', () => {
    const onChangeMock = jest.fn()
    setup({
      onChange: onChangeMock
    })
    fireEvent.click(screen.getByLabelText('tomorrow'))
    expect(onChangeMock).toHaveBeenCalled()
    expect(onChangeMock).toHaveBeenLastCalledWith('tomorrow')
  })
})
