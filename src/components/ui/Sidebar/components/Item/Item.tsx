import Image from 'next/image'
import React from 'react'

type ItemProps = { icon: string; describe: string; link: string }

function Item({ icon, describe, link }: ItemProps) {
  return (
    <div className="flex items-center pl-[15px] pr-[28px] pt-[20px] pb-[20px] rounded-lg bg-white-100 hover:bg-blue-50">
      <a href={link} className="flex items-center gap-[12px]">
        <Image src={icon} alt="icon" width={30} height={30} />
        <span className="font-semibold text-[20px] text-gray-400">{describe}</span>
      </a>
    </div>
  )
}

export default Item
