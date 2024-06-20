'use client'

import AuthForm from '../components/AuthForm'
import { ErrorMessage } from '../components/alert/error-message'
import { SuccessfulMessage } from '../components/alert/successful-message'
import { Button } from '@/components/shared'
import { useRouter } from 'next/navigation'

function VerificationErrorPage() {
  const verificationErrorElement = (
    <Button type='submit' className='flex h-[50px] w-full text-[20px]'>
      Resend Verification Email
    </Button>
  )

  return (
    <AuthForm
      title='Verification Failed!'
      content={
        <div className='w-[400px] space-y-[15px]'>
          <ErrorMessage message='Sorry! We can’t verify your account now. Verification link has expried.' />
          {verificationErrorElement}
        </div>
      }
    />
  )
}

export default VerificationErrorPage
