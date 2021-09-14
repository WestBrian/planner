import type { NextPage } from 'next'
import { SignIn } from '../components/pages/sign-in'
import { useAuth } from '../providers/AuthProvider'
import { useRouter } from 'next/router'

const Home: NextPage = () => {
  const router = useRouter()
  const { user } = useAuth()

  if (user) {
    router.push('/dashboard')
  }

  return <SignIn />
}

export default Home
