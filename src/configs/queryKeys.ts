import { ORDER_STATUS } from './enum'

export const queryKeys = {
  profile: {
    gen: (accessToken: string) => ['profile', accessToken],
  },
  // PRODUCT
  allProducts: ['all-products'],
  products: {
    gen: (page?: number, categoryId?: string, searchTerm?: string) => [
      'products',
      page,
      categoryId,
      searchTerm,
    ],
  },
  productDetails: {
    gen: (id: string) => ['productDetails', id],
  },
  topProducts: ['topProducts'],
  // CATEGORY
  allCategories: ['all-categories'],
  categories: {
    gen: (page: number) => ['categories', page],
  },
  // EMPLOYEE
  positions: ['positions'],
  employeeAccount: ['employee-account'],
  employees: {
    gen: (page: number) => ['employees', page],
  },
  employeeDetails: {
    gen: (id: string) => ['employeeDetails', id],
  },
  // CUSTOMER
  customers: {
    gen: (page?: number) => ['customers', page],
  },
  customerAccount: ['customer-account'],
  customerDetails: {
    gen: (id: string) => ['customerDetails', id],
  },
  // ORDER
  allOrders: {
    gen: (status?: ORDER_STATUS, fromDate?: number, toDate?: number) => [
      'all-orders',
      status,
      fromDate,
      toDate,
    ],
  },
  orders: {
    gen: (page: number, status?: ORDER_STATUS, fromDate?: number, toDate?: number) => [
      'orders',
      page,
      status,
      fromDate,
      toDate,
    ],
  },
  totalEarnings: {
    gen: (month?: number, year?: number) => ['totalEarnings', month, year],
  },
  //ADDRESS
  addresses: {
    gen: (page?: number) => ['addresses', page],
  },
  addressDetails: {
    gen: (id: string) => ['addressDetails', id],
  },
  //SHIPPING-PRICE
  shippingPrices: {
    gen: (page?: number) => ['shipping-price', page],
  },
  //STOCKS
  stocks: {
    gen: (page?: number) => ['stocks', page],
  },
  //ROLES
  roles: ['roles'],
  roleDetails: {
    gen: (id: string) => ['roleDetails', id],
  },
  //PERMISSIONS
  permissions: {
    gen: (page?: number) => ['permissions', page],
  },
}
