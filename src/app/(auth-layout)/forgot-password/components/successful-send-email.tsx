'use client'

import Image from 'next/image'
import Link from 'next/link'

interface ISuccessfulMessage {
  message?: string
}

export function SuccessfulSendMessage({ message }: ISuccessfulMessage) {
  return (
    <div className='mt-[10px] flex-col content-center'>
      <div className='flex items-start gap-[15px] rounded-[5px] bg-[#D9EEE1] p-[15px]'>
        <Image alt='' src='./icons/success.svg' width={24} height={24} />
        <span className='text-[20px]'>We have sent an email to {message} with instructions.</span>
      </div>
    </div>
  )
}
