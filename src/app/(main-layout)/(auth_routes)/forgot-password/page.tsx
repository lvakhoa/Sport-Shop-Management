import Image from 'next/image'
import { ForgotPasswordForm } from './components/forgot-password'
import { SuccessfulSendMessage } from './components/successful-send-email'
import AuthForm from '../components/AuthForm'

const forgotPasswordElement = <ForgotPasswordForm />

function ForgotPasswordPage() {
  return (
    <AuthForm
      title='Forgot Password'
      description="Enter your email and we'll sent you a link to reset your password"
      content={forgotPasswordElement}
    />
  )
}

export default ForgotPasswordPage
