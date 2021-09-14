import { useState, FormEvent, FC } from 'react'
import { Input } from '../input'
import { Button } from '../button'

export interface RegisterFormValues {
  email: string
  password: string
}

interface RegisterFormProps {
  handleSubmit: (values: RegisterFormValues) => void
}

export const RegisterForm: FC<RegisterFormProps> = ({ handleSubmit }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const _handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    handleSubmit({
      email,
      password
    })
  }

  return (
    <form onSubmit={_handleSubmit}>
      <div className="w-full md:w-container mx-auto p-4 bg-white shadow rounded-lg flex flex-col gap-4">
        <h1 className="text-gray-500 uppercase font-semibold">Register</h1>
        <Input
          label="Email"
          type="email"
          placeholder="test@test.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          label="Password"
          type="password"
          placeholder="*********"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="flex flex-row justify-end">
          <Button type="submit">Create Account</Button>
        </div>
      </div>
    </form>
  )
}
