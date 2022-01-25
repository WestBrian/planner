import { render, screen } from '../../test-utils'
import { FieldWrapper, FieldWrapperProps } from './'
import { getDefaultMessage } from './helpers'

const defaultValues: FieldWrapperProps = {
  id: 'test-id',
  label: 'test-label'
}

const setup = (props?: Partial<FieldWrapperProps>) => {
  render(
    <FieldWrapper {...{ ...defaultValues, ...props }}>
      <input id="test-id" value="test-value" readOnly />
    </FieldWrapper>
  )
}

describe('<FieldWrapper />', () => {
  it('sets up the id correctly', () => {
    setup()
    expect(screen.queryByLabelText('test-label')).toHaveValue('test-value')
  })

  it('renders an error', () => {
    setup({
      error: {
        type: 'required'
      }
    })
    expect(
      screen.queryByText(getDefaultMessage({ type: 'required' }))
    ).toBeInTheDocument()
  })
})
