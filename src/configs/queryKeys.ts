import { all } from 'axios'
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
  // VOUCHER
  allVouchers: ['all-vouchers'],
  vouchers: {
    gen: (page?: number) => ['vouchers', page],
  },
  voucherDetails: {
    gen: (id: string) => ['voucherDetails', id],
  },
  // CATEGORY
  allCategories: ['all-categories'],
  categoryDetails: {
    gen: (id: string) => ['categoryDetails', id],
  },
  categories: {
    gen: (page: number) => ['categories', page],
  },
  // BRAND
  brands: {
    gen: (page?: number) => ['brands', page],
  },
  brandDetails: {
    gen: (id: string) => ['brandDetails', id],
  },
  // SPORT
  sports: {
    gen: (page?: number) => ['sports', page],
  },
  sportDetails: {
    gen: (id: string) => ['sportDetails', id],
  },
  // EVENT
  allEvents: ['all-events'],
  events: {
    gen: (page?: number) => ['events', page],
  },
  eventDetails: {
    gen: (id: string) => ['eventDetails', id],
  },
  // EMPLOYEE
  positions: ['positions'],
  employeeAccount: ['employee-account'],
  employees: {
    gen: (page?: number) => ['employees', page],
  },
  employeeAccountDetails: {
    gen: (id: string) => ['employeeAccountDetails', id],
  },
  employeeDetails: {
    gen: (id: string) => ['employeeDetails', id],
  },
  // CUSTOMER
  customers: {
    gen: (page?: number) => ['customers', page],
  },
  customerAccount: ['customer-account'],
  customerAccountDetails: {
    gen: (id: string) => ['customerAccountDetails', id],
  },
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
  orderDetails: {
    gen: (id: string) => ['orderDetails', id],
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
  allStocks: ['all-stocks'],
  stocks: {
    gen: (count?: number, page?: number, product_id?: string) => [
      'stocks',
      count,
      page,
      product_id,
    ],
  },
  stockDetails: {
    gen: (id: string) => ['stockDetails', id],
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
  //COLORS
  allColors: ['all-colors'],
  colors: {
    gen: (id?: string) => ['colors', id],
  },
  //SHIPMENTS
  allShipments: ['all-shipments'],
  shipments: {
    gen: (id?: string) => ['shipments', id],
  },
}
