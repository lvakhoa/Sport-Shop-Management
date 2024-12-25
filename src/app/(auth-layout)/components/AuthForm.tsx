import { ReactElement } from 'react'
import Image from 'next/image'

interface IAuthForm {
  title?: string
  description?: string
  content?: ReactElement
}

function AuthForm({ title, description, content }: IAuthForm) {
  return (
    <div className='flex h-screen w-screen items-center justify-center'>
      <div className='inline-flex flex-row items-center rounded-[15px] border-2 shadow-xl'>
        <Image
          className='w-1/2'
          alt='Auth Image'
          src='/assets/images/login.png'
          width={500}
          height={450}
        />
        <div className='flex w-1/2 flex-col space-y-[10-px] px-[40px]'>
          <span className='text-[32px] font-semibold'>{title}</span>
          <span className='break-word w-[400px] text-ellipsis pb-[10px] text-[20px]'>
            {description}
          </span>
          {content}
        </div>
      </div>
    </div>
  )
}

export default AuthForm
