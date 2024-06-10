'use client'

import Image from 'next/image'

interface IErrorMessage {
  message?: string
}

export function ErrorMessage({ message }: IErrorMessage) {
  return (
    <div className='flex items-start gap-[15px] rounded-[5px] bg-[#FFAAAF] p-[15px]'>
      <Image alt='' src='./icons/fail.svg' width={24} height={24} />
      <span>{message}</span>
    </div>
  )
}
