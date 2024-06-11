import React, { useState } from 'react'

interface InputNumberProps {
  min: number
  max: number
  initialValue?: number
  onChange?: (value: number) => void
}

function InputNumber({ min, max, initialValue = 1, onChange }: InputNumberProps) {
  const [value, setValue] = useState(initialValue)

  const increment = () => {
    const newValue = value + 1
    if (newValue <= max) {
      setValue(newValue)
      onChange?.(newValue)
    }
  }

  const decrement = () => {
    const newValue = value - 1
    if (newValue >= min) {
      setValue(newValue)
      onChange?.(newValue)
    }
  }

  return (
    <div className='flex h-[36px] w-[100px] items-center justify-around rounded-full bg-blue-50 p-[2px]'>
      <button
        className='text-white flex h-[24px] w-[24px] cursor-pointer items-center justify-center rounded-full border-none bg-transparent text-2xl transition duration-200 ease-in-out hover:bg-secondary'
        type='button'
        onClick={decrement}
      >
        -
      </button>
      <span className='h-full w-1/3 rounded-full bg-white-100 text-center text-[15px] leading-[34px] text-black-100'>
        {value}
      </span>
      <button
        className='text-white flex h-[24px] w-[24px] cursor-pointer items-center justify-center rounded-full border-none bg-transparent text-2xl transition duration-200 ease-in-out hover:bg-secondary'
        type='button'
        onClick={increment}
      >
        +
      </button>
    </div>
  )
}

export default InputNumber
