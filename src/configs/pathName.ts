export const PATH_NAME = {
  HOME: '/',
  ACCOUNT: {
    BASE: '/accounts',
    EMPLOYEE: '/employees',
    CUSTOMER: '/customers',
  },

  CUSTOMER: '/customers',
  CATEGORY: '/categories',
  EMPLOYEE: '/employees',
  EVENT: '/events',
  VOUCHER: '/vouchers',
  PRODUCT: '/products',
  POS: '/pos',
  STOCK: '/stocks',
  LOGIN: '/log-in',
  RESET_PASSWORD: '/reset',
  FORGOT_PASSWORD: '/forgot-password',
  VERIFICATION: '/verification',
  VERIFICATION_SUCCESS: '/verification-success',
  VERIFICATION_ERROR: '/verification-error',
  VERIFICATION_REQUIRED: '/verification-required',
  SETTINGS: {
    BASE: '/settings',
    PROFILE: '/profile',
    ROLE_PERMISSION: '/roles-permissions',
    SHIPPING_SETUP: '/shipping-setup',
  },
  ORDER_DETAILS: '/order-details',
}

export const AUTH_PATH_NAME = [
  PATH_NAME.LOGIN,
  PATH_NAME.RESET_PASSWORD,
  PATH_NAME.FORGOT_PASSWORD,
  PATH_NAME.VERIFICATION,
  PATH_NAME.VERIFICATION_SUCCESS,
  PATH_NAME.VERIFICATION_ERROR,
  PATH_NAME.VERIFICATION_REQUIRED,
]

export const PUBLIC_PATH_NAME = [
  PATH_NAME.HOME,
  PATH_NAME.CUSTOMER,
  PATH_NAME.CATEGORY,
  PATH_NAME.EVENT,
  PATH_NAME.VOUCHER,
  PATH_NAME.PRODUCT,
  PATH_NAME.POS,
  PATH_NAME.STOCK,
  PATH_NAME.ORDER_DETAILS,
  `${PATH_NAME.SETTINGS.BASE}${PATH_NAME.SETTINGS.PROFILE}`,
  `${PATH_NAME.SETTINGS.BASE}${PATH_NAME.SETTINGS.SHIPPING_SETUP}`,
  // AUTH
  ...AUTH_PATH_NAME,
]

export const MANAGER_PATH_NAME = [...PUBLIC_PATH_NAME, PATH_NAME.EMPLOYEE]

export const ADMIN_PATH_NAME = [
  ...PUBLIC_PATH_NAME,
  PATH_NAME.EMPLOYEE,
  PATH_NAME.ACCOUNT.BASE,
  `${PATH_NAME.ACCOUNT.BASE}${PATH_NAME.ACCOUNT.CUSTOMER}`,
  `${PATH_NAME.ACCOUNT.BASE}${PATH_NAME.ACCOUNT.EMPLOYEE}`,
  `${PATH_NAME.SETTINGS.BASE}${PATH_NAME.SETTINGS.ROLE_PERMISSION}`,
]
