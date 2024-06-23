import { cn } from '@/lib/utils'
import Image from 'next/image'
import React from 'react'

type ItemProps = { icon: React.ReactElement; describe: string; link: string; active: boolean }

function Item({ icon, describe, link, active }: ItemProps) {
  return (
    <div
      className={cn(
        'flex cursor-pointer items-center rounded-lg px-[8px] py-[10px] sm:px-[10px] sm:py-[14px]',
        active ? 'bg-blue-50' : 'bg-white hover:bg-blue-50',
      )}
    >
      <a
        href={link}
        className={cn(
          'flex h-full w-full items-center gap-[10px] max-[468px]:gap-[5px]',
          active ? 'text-primary' : 'text-content',
        )}
      >
        {icon}
        <span className='text-[16px] font-medium'>{describe}</span>
      </a>
    </div>
  )
}

export default Item
