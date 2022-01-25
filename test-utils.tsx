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

export type ArgumentsOf<T> = T extends (...args: infer A) => any ? A : never
export type ConstructorArgumentsOf<T> = T extends new (...args: infer A) => any
  ? A
  : never
interface MockWithArgs<T extends MockableFunction>
  extends jest.MockInstance<ReturnType<T>, ArgumentsOf<T>> {
  new (...args: ConstructorArgumentsOf<T>): T
  (...args: ArgumentsOf<T>): ReturnType<T>
}
type MockableFunction = (...args: any[]) => any
type MockedFunction<T extends MockableFunction> = MockWithArgs<T> &
  { [K in keyof T]: T[K] }
type MaybeMockedConstructor<T> = T extends new (...args: any[]) => infer R
  ? jest.MockInstance<R, ConstructorArgumentsOf<T>>
  : T
type MethodKeysOf<T> = {
  [K in keyof T]: T[K] extends MockableFunction ? K : never
}[keyof T]
type PropertyKeysOf<T> = {
  [K in keyof T]: T[K] extends MockableFunction ? never : K
}[keyof T]
type MockedObject<T> = MaybeMockedConstructor<T> &
  {
    [K in MethodKeysOf<T>]: T[K] extends MockableFunction
      ? MockedFunction<T[K]>
      : T[K]
  } &
  { [K in PropertyKeysOf<T>]: T[K] }
type MaybeMocked<T> = T extends MockableFunction
  ? MockedFunction<T>
  : T extends object
  ? MockedObject<T>
  : T

export function toMock<T>(func: T): MaybeMocked<T> {
  return func as any
}
