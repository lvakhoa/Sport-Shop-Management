'use client'

import Image from 'next/image'

interface ISuccessfulMessage {
  message?: string
}

export function SuccessfulMessage({ message }: ISuccessfulMessage) {
  return (
    <div className='flex items-start gap-[15px] rounded-[5px] bg-[#D9EEE1] p-[15px]'>
      <Image alt='' src='./icons/success.svg' width={24} height={24} />
      <span>{message}</span>
    </div>
  )
}
