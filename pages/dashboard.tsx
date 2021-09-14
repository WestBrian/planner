import type { NextPage } from 'next'
import { Dashboard } from '../components/pages/dashboard'
import { AuthCheck } from '../components/auth-check'

const DashboardPage: NextPage = () => {
  return (
    <AuthCheck>
      <Dashboard />
    </AuthCheck>
  )
}

export default DashboardPage
