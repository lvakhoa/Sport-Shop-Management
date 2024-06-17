import * as zustand from 'zustand'
import { IProductItem } from '@/app/(main-layout)/(protected_routes)/pos/components/product/product-item'

interface State {
  orderDetail: IProductItem[] | null
  totalPrice: number
}

interface Action {
  removeAll: () => void
  removeProduct: (index: number) => void
  addProduct: (product: IProductItem) => void
}

const useOrderStore = zustand.create<State & Action>((set) => ({
  orderDetail: null,
  totalPrice: 0,
  removeAll: () => {
    set({ orderDetail: null, totalPrice: 0 })
  },
  removeProduct: (index: number) => {
    set((state) => {
      const newProductList = state.orderDetail?.filter((_, i) => i !== index) ?? null
      const newTotalPrice = newProductList?.reduce((total, item) => total + item.price, 0) ?? 0
      return { orderDetail: newProductList, totalPrice: newTotalPrice }
    })
  },
  addProduct: (product: IProductItem) => {
    set((state) => {
      if (state.orderDetail?.find((item) => item.stock_id === product.stock_id)) return { ...state }
      const newProductList = state.orderDetail ? [...state.orderDetail, product] : [product]
      const newTotalPrice = newProductList.reduce((total, item) => total + item.price, 0)
      return { orderDetail: newProductList, totalPrice: newTotalPrice }
    })
  },
}))

export default useOrderStore
