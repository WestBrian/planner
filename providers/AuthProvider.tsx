import { createContext, useContext, FC } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../services/firebase'
import type firebase from 'firebase'

interface AuthContextValues {
  user?: firebase.User | null
}

const AuthContext = createContext<AuthContextValues>({
  user: null
})

export const AuthContextProvider: FC = ({ children }) => {
  const [user, loading] = useAuthState(auth)

  return (
    <AuthContext.Provider value={{ user }}>
      {!loading && children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
