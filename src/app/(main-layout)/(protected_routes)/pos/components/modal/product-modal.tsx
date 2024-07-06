import React from 'react'
import Modal from 'react-modal'
import { IProductItem1 } from '../../page'
import { CircleX, ReceiptText } from 'lucide-react'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from '@/components/shared/carousel'

import { ToggleGroup, ToggleGroupItem } from '@/components/shared/toggle-group'
import { Button } from '@/components/shared'
import InputNumber from '@/components/shared/InputNumber'
import { currencyFormatter } from '@/helpers'

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    transform: 'translate(-50%, -50%)',
  },
}

export function ProductModal({
  isOpen,
  onClose,
  product,
  onAddToReceipt,
}: {
  isOpen: boolean
  onClose: () => void
  product: IProductItem1
  onAddToReceipt: (color: string, size: string, quantity: number) => void
}) {
  const colors = Array.from(
    new Set(product.stocks?.map((stock) => stock.color?.name).filter(Boolean)),
  )
  const sizes = Array.from(new Set(product.stocks?.map((stock) => stock.size).filter(Boolean)))
  const images = Array.from(
    new Set(product.stocks?.map((stock) => stock.media?.url).filter(Boolean)),
  )

  const [currentItem, setcurrentItem] = useState(0)
  const [api, setApi] = useState<CarouselApi>()
  const [color, setColor] = useState(colors[0])
  const [size, setSize] = useState(sizes[0])
  const [quantity, setQuantity] = useState(1)

  useEffect(() => {
    if (!api) {
      return
    }
    api.scrollTo(currentItem)

    api.on('select', () => {
      setcurrentItem(api.selectedScrollSnap())
    })
  }, [api, currentItem])

  //kệ cái warning kêu thêm colors với sizes nhé
  useEffect(() => {
    setColor(colors[0])
    setSize(sizes[0])
  }, [isOpen])

  return (
    <div>
      <Modal isOpen={isOpen} style={customStyles} onAfterClose={() => setcurrentItem(0)}>
        <div className='flex justify-end pb-[10px]'>
          <CircleX className='cursor-pointer' size={25} onClick={onClose} />
        </div>
        <div className='flex gap-3 pl-10'>
          <div className='flex flex-col gap-3 pr-10'>
            <Carousel setApi={setApi} className='w-full max-w-xs'>
              <CarouselContent>
                {images.map((item, index) => (
                  <CarouselItem key={index}>
                    <div>
                      <Image
                        className='flex aspect-square cursor-pointer items-center justify-center rounded-lg'
                        src={item!}
                        alt=''
                        layout='responsive'
                        width={50}
                        height={50}
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
            <Carousel className='w-full max-w-xs'>
              <CarouselContent>
                {images.map((item, index) => (
                  <CarouselItem
                    key={index}
                    onClick={() => setcurrentItem(index)}
                    className='basis-1/3'
                  >
                    <div>
                      <Image
                        className={`flex aspect-square cursor-pointer items-center justify-center rounded-lg ${currentItem === index ? 'border-[3px] border-blue-500' : ''}`}
                        src={item!}
                        alt=''
                        layout='responsive'
                        width={50}
                        height={50}
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>
          <div className='flex w-[300px] flex-col pl-[10px]'>
            <h2 className='text-lg font-semibold leading-[34px] sm:text-[26px]'>{product.name}</h2>
            <h2 className='text-[20px] font-light'>{currencyFormatter(product.price)}</h2>
            <div className='flex flex-col gap-[20px] pt-[10px]'>
              <div className='flex items-center gap-3'>
                <span className='text-[15px]'>Color:</span>
                <ToggleGroup type='single' defaultValue={colors[0]} className='gap-2'>
                  {colors.map((color) => (
                    <ToggleGroupItem
                      key={color}
                      value={color!}
                      variant='outline'
                      onClick={() => setColor(color)}
                      className='rounded-xl'
                    >
                      {color!.replace(/\b\w/g, (s) => s.toUpperCase())}
                    </ToggleGroupItem>
                  ))}
                </ToggleGroup>
              </div>
              <div className='flex items-center gap-3'>
                <span className='text-[15px]'>Sizes:</span>
                <ToggleGroup type='single' defaultValue={sizes[0]} className='gap-2'>
                  {sizes.map((size) => (
                    <ToggleGroupItem
                      key={size}
                      value={size!}
                      variant='outline'
                      onClick={() => setSize(size)}
                      className='rounded-xl'
                    >
                      {size}
                    </ToggleGroupItem>
                  ))}
                </ToggleGroup>
              </div>
              <div className='flex items-center gap-2'>
                <span className='text-[15px]'>Quantity:</span>
                <div>
                  <InputNumber
                    min={1}
                    max={100}
                    initialValue={1}
                    onChange={(value) => setQuantity(value)}
                  />
                </div>
              </div>
              <Button
                className='gap-[10px]'
                onClick={() => onAddToReceipt(color!, size!, quantity)}
              >
                <ReceiptText size={20} />
                Add to receipt
              </Button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  )
}
