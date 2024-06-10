import Image from 'next/image'
import { ResetPasswordForm } from './components/reset-password'
import AuthForm from '../components/AuthForm'

const resetPasswordElement = <ResetPasswordForm />

function ResetPasswordPage() {
  return (
    <AuthForm
      title='Reset Password'
      description='Enter your new password'
      content={resetPasswordElement}
    />
  )
}

export default ResetPasswordPage
