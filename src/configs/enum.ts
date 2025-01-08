export enum ROLE_NAME {
  ADMIN = 'ADMIN',
  EMPLOYEE = 'EMPLOYEE',
  CUSTOMER = 'CUSTOMER',
}

export enum GROUP_VOUCHER_TYPE {
  SPORT = 'SPORT',
  BRAND = 'BRAND',
  PRODUCT = 'PRODUCT',
}

export enum VOUCHER_APPLICABLE_TYPE {
  SPORT = 'SPORT',
  BRAND = 'BRAND',
  PRODUCT = 'PRODUCT',
}
export const voucherApplicableTypeMapping = {
  [VOUCHER_APPLICABLE_TYPE.SPORT]: 'Sport',
  [VOUCHER_APPLICABLE_TYPE.BRAND]: 'Brand',
  [VOUCHER_APPLICABLE_TYPE.PRODUCT]: 'Product',
}

export enum VOUCHER_TYPE {
  FIXED_PRICE = 'FIXED_PRICE',
  PERCENT = 'PERCENT',
}
export const voucherTypeMapping = {
  [VOUCHER_TYPE.FIXED_PRICE]: 'Fixed price',
  [VOUCHER_TYPE.PERCENT]: 'Percent',
}

export enum PAYMENT_TYPE {
  CASH = 'CASH',
  BANK = 'BANK',
}

export enum GENDER {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
  OTHER = 'OTHER',
}

export enum METHOD {
  GET = 'GET',
  POST = 'POST',
  PATCH = 'PATCH',
  PUT = 'PUT',
  DELETE = 'DELETE',
  OPTIONS = 'OPTIONS',
  HEAD = 'HEAD',
}

export enum ORDER_STATUS {
  PENDING = 'PENDING',
  PACKAGING = 'PACKAGING',
  IN_TRANSIT = 'IN_TRANSIT',
  CANCELLED = 'CANCELLED',
  DELIVERED = 'DELIVERED',
  RETURNED = 'RETURNED',
  UNDELIVERED = 'UNDELIVERED',
}

export const orderStatusMapping = {
  [ORDER_STATUS.PENDING]: 'Pending',
  [ORDER_STATUS.PACKAGING]: 'Packaging',
  [ORDER_STATUS.IN_TRANSIT]: 'In transit',
  [ORDER_STATUS.CANCELLED]: 'Cancelled',
  [ORDER_STATUS.DELIVERED]: 'Delivered',
  [ORDER_STATUS.RETURNED]: 'Returned',
  [ORDER_STATUS.UNDELIVERED]: 'Undelivered',
}

export enum TRANSACTION_STATUS {
  PENDING = 'PENDING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR',
}

export enum TOKEN_TYPE {
  RESET_PASSWORD = 'RESET_PASSWORD',
  VERIFY_EMAIL = 'VERIFY_EMAIL',
  FCM_TOKEN = 'FCM_TOKEN',
}

export enum NOTIFICATION_TYPE {
  EVENT = 'EVENT',
  ORDER = 'ORDER',
  PRODUCT = 'PRODUCT',
}

export enum SIZE {
  S = 'S',
  M = 'M',
  L = 'L',
  XL = 'XL',
}

export enum SHIPPING_LOCATION {
  IN_PROVINCE = 'IN_PROVINCE',
  OUT_PROVINCE = 'OUT_PROVINCE',
}

export enum CONSUMER_TYPE {
  MEN = 'MEN',
  WOMEN = 'WOMEN',
  CHILDREN = 'CHILDREN',
}

export enum MEDIA_TYPE {
  IMAGE = 'IMAGE',
  VIDEO = 'VIDEO',
}

export enum GROUP_MEDIA_TYPE {
  STOCK = 'STOCK',
  ORDER = 'ORDER',
}

export enum TABLE_ACTION_TYPE {
  VIEW = 'VIEW',
  EDIT = 'EDIT',
  DELETE = 'DELETE',
}

export enum FILTER_INPUT_TYPE {
  TEXTBOX = 'TEXTBOX',
  DROPDOWN = 'DROPDOWN',
}
