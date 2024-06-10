export const queryKeys = {
  profile: {
    gen: (accessToken: string) => ['profile', accessToken],
  },
  // PRODUCT
  products: {
    gen: (page: number) => ['products', page],
  },
  productDetails: {
    gen: (id: string) => ['productDetails', id],
  },
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
    gen: (page: number) => ['customers', page],
  },
  customerAccount: ['customer-account'],
  customerDetails: {
    gen: (id: string) => ['customerDetails', id],
  },
}
