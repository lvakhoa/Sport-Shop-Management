'use client'

import Image from 'next/image'

interface IExpiredMessage {
  message?: string
}

export function ExpiredMessage({ message }: IExpiredMessage) {
  return (
    <div className="bg-[#FFAAAF] rounded-[5px] p-[15px] flex gap-[15px] items-start">
      <Image alt="" src="./icons/fail.svg" width={24} height={24} />
      <span>{message}</span>
    </div>
  )
}
