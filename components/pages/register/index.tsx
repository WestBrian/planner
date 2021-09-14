import { RegisterForm, RegisterFormValues } from '../../register-form'
import { createUser } from '../../../services/auth'
import { useRouter } from 'next/router'

export const RegisterPage = () => {
  const router = useRouter()

  async function handleSubmit(values: RegisterFormValues) {
    try {
      await createUser(values)
      router.push('/dashboard')
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <div>
      <RegisterForm handleSubmit={handleSubmit} />
    </div>
  )
}
