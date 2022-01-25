import { render, screen } from '../../test-utils'
import { AuthCheck } from './'

const setup = (isAuthenticated: boolean) => {
  render(
    <AuthCheck>
      <div>test</div>
    </AuthCheck>,
    isAuthenticated
  )
}

describe('<AuthCheck />', () => {
  it('it renders the children if a user is available', () => {
    setup(true)
    expect(screen.queryByText('test')).toBeInTheDocument()
  })

  it('it renders a sign in message if the user is not available', () => {
    setup(false)
    expect(screen.queryByText('test')).not.toBeInTheDocument()
    expect(
      screen.queryByText('You must be signed in to view this page')
    ).toBeInTheDocument()
  })
})
