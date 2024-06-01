import Image from 'next/image'
import React from 'react'

type ItemProps = { icon: string; describe: string; link: string }

function Item({ icon, describe, link }: ItemProps) {
  return (
    <div className='flex cursor-pointer items-center rounded-lg bg-white-100 py-[20px] hover:bg-blue-50 sm:px-[15px]'>
      <a href={link} className='flex items-center gap-[10px] max-[468px]:gap-[5px]'>
        <Image src={icon} className=' max-[468px]:size-[20px]' alt='icon' width={30} height={30} />
        <span className='text-[20px] font-semibold text-gray-400 max-[468px]:text-[16px]'>
          {describe}
        </span>
      </a>
    </div>
  )
}

export default Item
