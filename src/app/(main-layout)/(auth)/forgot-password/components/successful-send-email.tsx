'use client'

import Image from 'next/image'
import { Button } from '@/components/shared/button'

interface ISuccessfulMessage {
  message?: string
}

export function SuccessfulSendMessage({ message }: ISuccessfulMessage) {
  return (
    <div className="mt-[10px] flex-col content-center">
      <div className="bg-[#D9EEE1] rounded-[5px] p-[15px] flex gap-[15px] items-start">
        <Image alt="" src="./icons/success.svg" width={24} height={24} />
        <span className="text-[20px]">We have sent an email to {message} with instructions.</span>
      </div>
      <span className="mt-[10px] flex justify-center text-[16px]">
        Still can not find the email?
      </span>
    </div>
  )
}
