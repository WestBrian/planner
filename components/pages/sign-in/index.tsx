import { FormEvent, useState } from 'react'
import { Input } from '../../input'
import { Button } from '../../button'
import { signIn } from '../../../services/auth'
import { useRouter } from 'next/router'

export const SignIn = () => {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    try {
      signIn({ email, password })
      router.push('/dashboard')
    } catch (err) {}
  }

  return (
    <div>
      <form
        className="w-full md:w-container mx-auto p-4 bg-white shadow rounded-lg flex flex-col gap-4"
        onSubmit={handleSubmit}
      >
        <h1 className="text-gray-500 uppercase font-semibold">Sign In</h1>
        <Input
          value={email}
          type="email"
          label="Email"
          placeholder="test@test.com"
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          value={password}
          label="Password"
          type="password"
          placeholder="*********"
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="flex flex-row justify-end">
          <Button type="submit">Sign In</Button>
        </div>
      </form>
    </div>
  )
}
