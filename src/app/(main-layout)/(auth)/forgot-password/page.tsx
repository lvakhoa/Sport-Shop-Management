import Image from 'next/image'
import { ForgotPasswordForm } from './components/forgot-password'
import { SuccessfulSendMessage } from './components/successful-send-email'

export default function ForgotPasswordFormFull() {
  return (
    <div className="flex">
      <div className="flex border-2 rounded-[15px] shadow-xl gap-[40px]">
        <Image alt="" src="/assets/images/login.svg" width={500} height={400} />
        <div className="grid content-center pr-[50px] flex-initial w-[500px]">
          <span className="font-semibold text-[32px]">Forgot Password</span>
          <span className="pt-2 pb-3 text-[20px]">
            Enter your email and we’ll sent you a link to reset your password
          </span>
          <ForgotPasswordForm />
        </div>
      </div>
    </div>
  )
}
