import { IProductItem } from '../product/product-item'
import { Card } from '@/components/shared/card'
import { Sheet } from '@/components/shared/sheet'
import { ArchiveX, Trash } from 'lucide-react'
import Image from 'next/image'
import { Button } from '@/components/shared'
import { useEffect, useState } from 'react'
import { useOrderStore } from '@/stores'
import { useRouter } from 'next/navigation'
import InputNumber from '@/components/shared/InputNumber'
import { PATH_NAME } from '@/configs'

export function PosTab({
  handleRemove,
  cancelOrder,
}: {
  handleRemove: (index: number) => void
  cancelOrder: () => void
}) {
  const router = useRouter()
  const productList = useOrderStore((state) => state.orderDetail)
  const totalPrice = useOrderStore((state) => state.totalPrice)
  const [newProductList, setNewProductList] = useState<IProductItem[] | null>(productList)

  useEffect(() => {
    if (productList) {
      const total = productList.reduce((acc, product) => {
        return acc + product.price * (product.quantity || 1)
      }, 0)
      useOrderStore.setState({ totalPrice: total })
    }
  }, [newProductList, productList])

  return (
    <div className='h-full'>
      {!productList?.length && (
        <div className='flex h-full flex-col items-center justify-center'>
          <ArchiveX size={48} />
          <span className='text-lg font-semibold'>No product selected</span>
        </div>
      )}
      {productList && productList.length > 0 && (
        <Sheet>
          {productList.map((product, index) => (
            <Card className='rounded-none' key={index}>
              <div className='flex flex-row gap-3 p-[15px]'>
                <div>
                  <Image
                    className='aspect-square rounded-lg'
                    src={
                      product.image ??
                      'https://res.cloudinary.com/dbpvh14wj/image/upload/f_auto,q_auto/pzi7bjxajmsgraesmjt2'
                    }
                    alt={''}
                    width={120}
                    height={120}
                  />
                </div>
                <div className='flex grow flex-col justify-between'>
                  <div className='flex flex-col'>
                    <span className='text-[20px] font-semibold text-gray-500'>{product.name}</span>
                    <span className='text-[14px] font-light'>
                      {product.color?.replace(/\b\w/g, (s) => s.toUpperCase())} | {product.size}
                    </span>
                  </div>
                  <span className='text-[16px] font-semibold'>{product.price} đ</span>
                  <div className='flex flex-row items-center justify-between'>
                    <div style={{ transform: 'scale(0.85)' }}>
                      <InputNumber
                        min={1}
                        max={100}
                        initialValue={product.quantity}
                        onChange={(value) => {
                          if (productList) {
                            const newProductList = [...productList]
                            newProductList[index].quantity = value
                            setNewProductList(newProductList)
                          }
                        }}
                      />
                    </div>
                    <div>
                      <Button
                        size='sm'
                        variant='destructive'
                        className='gap-[5px] rounded-full'
                        style={{ transform: 'scale(0.85)' }}
                        onClick={() => handleRemove(index)}
                      >
                        <Trash size={20} />
                        Delete
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
          <div className='w-full p-[15px]'>
            <div className='flex flex-row justify-between pb-[10px]'>
              <span>Total:</span>
              <span>{totalPrice} đ</span>
            </div>
            <div className='flex flex-row justify-between'>
              <Button
                size='sm'
                variant='destructive'
                className='gap-[5px] rounded-full'
                onClick={cancelOrder}
              >
                Cancel
              </Button>
              <Button
                size='sm'
                variant='default'
                className='gap-[5px] rounded-full'
                onClick={() => {
                  router.push(PATH_NAME.PLACE_ORDER)
                }}
              >
                Order
              </Button>
            </div>
          </div>
        </Sheet>
      )}
    </div>
  )
}
