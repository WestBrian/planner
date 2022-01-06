import React, { FC } from 'react'
import { render } from '@testing-library/react'
import { ChakraProvider } from '@chakra-ui/react'
import { AuthContext } from './providers/AuthProvider'
import type firebase from 'firebase'

const AuthenticatedProviders: FC = ({ children }) => {
  return (
    <ChakraProvider>
      <AuthContext.Provider
        value={{
          user: {
            email: 'test@test.com',
            uid: '123'
          } as firebase.User
        }}
      >
        {children}
      </AuthContext.Provider>
    </ChakraProvider>
  )
}

const UnauthenticatedProviders: FC = ({ children }) => {
  return (
    <ChakraProvider>
      <AuthContext.Provider value={{ user: null }}>
        {children}
      </AuthContext.Provider>
    </ChakraProvider>
  )
}

type RenderParameters = Parameters<typeof render>

const customRender = (
  ui: RenderParameters[0],
  isAuthenticated = true,
  options?: RenderParameters[1]
) =>
  render(ui, {
    wrapper: isAuthenticated
      ? AuthenticatedProviders
      : UnauthenticatedProviders,
    ...options
  })

export * from '@testing-library/react'
export { customRender as render }
