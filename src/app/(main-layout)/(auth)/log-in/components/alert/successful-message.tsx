'use client'

import Image from 'next/image'

interface ISuccessfulMessage {
  message?: string
}

export function SuccessfulMessage({ message }: ISuccessfulMessage) {
  return (
    <div className="bg-[#D9EEE1] rounded-[5px] p-[15px] flex gap-[15px] items-start">
      <Image alt="" src="./icons/success.svg" width={24} height={24} />
      <span>{message}</span>
    </div>
  )
}
