import { FC } from 'react'
import { useAuth } from '../../providers/AuthProvider'

export const AuthCheck: FC = ({ children }) => {
  const { user } = useAuth()

  return user ? (
    <>{children}</>
  ) : (
    <div>You must be signed in to view this page</div>
  )
}
