'use client'

import { LoginForm } from './components/login-form'
import AuthForm from '../components/AuthForm'

const loginElement = <LoginForm />

function LogInPage() {
  return <AuthForm title='Hello,' description='Login to your account' content={loginElement} />
}

export default LogInPage
