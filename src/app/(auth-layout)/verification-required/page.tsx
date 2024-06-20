'use client'

import AuthForm from '../components/AuthForm'
import { SuccessfulMessage } from '../components/alert/successful-message'
import { Button } from '@/components/shared'
import { useRouter } from 'next/navigation'

function VerificationRequired() {
  return (
    <AuthForm
      title='Verification Required!'
      content={
        <span className='w-[400px]'>
          To continue using Clothy. Please check your email to verify your account.
        </span>
      }
    />
  )
}

export default VerificationRequired
