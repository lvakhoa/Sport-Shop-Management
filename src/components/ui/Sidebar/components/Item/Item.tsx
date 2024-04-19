import Image from 'next/image'
import React from 'react'

type ItemProps = { icon: string; describe: string; link: string }

function Item({ icon, describe, link }: ItemProps) {
  return (
    <div className="flex items-center sm:pl-[15px] sm:pr-[15px] pt-[20px] pb-[20px] rounded-lg bg-white-100 hover:bg-blue-50">
      <a href={link} className="flex items-center gap-[10px] max-[468px]:gap-[5px]">
        <Image
          src={icon}
          className="max-[468px]:w-[20px] max-[468px]:h-[20px]"
          alt="icon"
          width={30}
          height={30}
        />
        <span className="font-semibold text-[20px] max-[468px]:text-[16px] text-gray-400">
          {describe}
        </span>
      </a>
    </div>
  )
}

export default Item
