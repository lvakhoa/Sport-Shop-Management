'use client'

import { PATH_NAME } from '@/configs'
import AuthForm from '../components/AuthForm'
import { SuccessfulMessage } from '../components/alert/successful-message'
import { Button } from '@/components/shared'
import { useRouter } from 'next/navigation'

function VerificationSuccessPage() {
  const router = useRouter()

  const handleLoginClick = () => {
    router.push(PATH_NAME.LOGIN)
  }

  const verificationSuccessElement = (
    <Button type='submit' className='flex h-[50px] w-full text-[20px]' onClick={handleLoginClick}>
      Login
    </Button>
  )

  return (
    <AuthForm
      title='Verified!'
      content={
        <div className='space-y-[15px]'>
          <SuccessfulMessage message='You have successfully verified account' />
          {verificationSuccessElement}
        </div>
      }
    />
  )
}

export default VerificationSuccessPage
