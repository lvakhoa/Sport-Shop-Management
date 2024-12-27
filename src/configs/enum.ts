export enum GENDER {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
}

export enum NOTIFICATION_TYPE {
  EVENT = 'EVENT',
  ORDER = 'ORDER',
  PRODUCT = 'PRODUCT',
}

export enum ORDER_STATUS {
  PENDING = 'PENDING',
  SUCCESS = 'SUCCESS',
  CANCELLED = 'CANCELLED',
}

export enum PAYMENT_TYPE {
  CASH = 'CASH',
  BANK = 'BANK',
}

export enum SIZE {
  S = 'S',
  M = 'M',
  L = 'L',
  XL = 'XL',
}

export enum HTTP_METHOD {
  GET = 'GET',
  POST = 'POST',
  PATCH = 'PATCH',
  PUT = 'PUT',
  DELETE = 'DELETE',
  OPTIONS = 'OPTIONS',
  HEAD = 'HEAD',
}

export enum ROLE_TITLE {
  ADMIN = 'ADMIN',
  MANAGER = 'MANAGER',
  EMPLOYEE = 'EMPLOYEE',
  CUSTOMER = 'CUSTOMER',
}

export enum SHIPPING_LOCATION {
  IN_PROVINCE = 'IN_PROVINCE',
  OUT_PROVINCE = 'OUT_PROVINCE',
}

export enum TRANSACTION_STATUS {
  PENDING = 'PENDING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR',
}

export enum STATUS {
  ACTIVE = 'Active',
  INACTIVE = 'Inactive',
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
