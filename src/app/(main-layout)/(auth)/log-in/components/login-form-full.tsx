'use client'

import { Label } from '@/components/shared/label'
import { LoginForm } from './login-form'
import Image from 'next/image'
import { ReactElement } from 'react'

interface ILoginForm {
  title?: string
  description?: string
  form?: ReactElement
}

export function Login({ title, description, form }: ILoginForm) {
  return (
    <div className="flex border-2 rounded-[15px] shadow-xl gap-[40px]">
      <Image alt="" src="/assets/images/login.svg" width={500} height={400} />
      <div className="grid content-center pr-[50px] flex-initial w-[500px]">
        <span className="font-semibold text-[32px]">{title}</span>
        <span className="pt-2 pb-3 text-[20px]">{description}</span>
        {form}
      </div>
    </div>
  )
}
