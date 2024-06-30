export const PATH_NAME = {
  HOME: '/',
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

export const ADMIN_PATH_NAME = [
  `${PATH_NAME.SETTINGS}${PATH_NAME.SETTINGS.ROLE_PERMISSION}`,
  `${PATH_NAME.SETTINGS}${PATH_NAME.SETTINGS.SHIPPING_SETUP}`,
]

export const AUTH_PATH_NAME = [
  PATH_NAME.LOGIN,
  PATH_NAME.RESET_PASSWORD,
  PATH_NAME.FORGOT_PASSWORD,
  PATH_NAME.VERIFICATION,
  PATH_NAME.VERIFICATION_SUCCESS,
  PATH_NAME.VERIFICATION_ERROR,
  PATH_NAME.VERIFICATION_REQUIRED,
]
