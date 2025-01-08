import { PATH_NAME } from './pathName'
import {
  LayoutDashboard,
  ReceiptText,
  Shirt,
  ShoppingCart,
  Smile,
  UsersRound,
  Settings,
  LayoutGrid,
  PackageOpen,
  TicketPercent,
  BadgeCheck,
  Package,
  Dumbbell,
  Dices,
} from 'lucide-react'

export interface ISidebarItem {
  title: string
  items: {
    icon: JSX.Element
    describe: string
    link: string
  }[]
}

export const adminSidebarItems: ISidebarItem[] = [
  {
    title: 'Main',
    items: [
      {
        icon: <LayoutDashboard strokeWidth={1.5} />,
        describe: 'Dashboard',
        link: PATH_NAME.HOME,
      },
    ],
  },
  {
    title: 'Product & Stock',
    items: [
      {
        icon: <Dumbbell strokeWidth={1.5} />,
        describe: 'Sports',
        link: PATH_NAME.SPORT,
      },
      {
        icon: <Dices strokeWidth={1.5} />,
        describe: 'Brands',
        link: PATH_NAME.BRAND,
      },
      {
        icon: <Shirt strokeWidth={1.5} />,
        describe: 'Products',
        link: PATH_NAME.PRODUCT,
      },
      {
        icon: <PackageOpen strokeWidth={1.5} />,
        describe: 'Stocks',
        link: PATH_NAME.STOCK,
      },
      {
        icon: <LayoutGrid strokeWidth={1.5} />,
        describe: 'Categories',
        link: PATH_NAME.CATEGORY,
      },
    ],
  },
  {
    title: 'Sales',
    items: [
      {
        icon: <TicketPercent strokeWidth={1.5} />,
        describe: 'Vouchers',
        link: PATH_NAME.VOUCHER,
      },
      {
        icon: <BadgeCheck strokeWidth={1.5} />,
        describe: 'Events',
        link: PATH_NAME.EVENT,
      },
    ],
  },
  {
    title: 'Pos & Orders',
    items: [
      // {
      //   icon: <ReceiptText strokeWidth={1.5} />,
      //   describe: 'POS',
      //   link: PATH_NAME.POS,
      // },
      {
        icon: <Package strokeWidth={1.5} />,
        describe: 'Orders',
        link: PATH_NAME.ORDER,
      },
      {
        icon: <ShoppingCart strokeWidth={1.5} />,
        describe: 'Order Details',
        link: PATH_NAME.ORDER_DETAILS,
      },
    ],
  },
  {
    title: 'Users',
    items: [
      {
        icon: <Smile strokeWidth={1.5} />,
        describe: 'Customers',
        link: PATH_NAME.CUSTOMER,
      },
      {
        icon: <UsersRound strokeWidth={1.5} />,
        describe: 'Employees',
        link: PATH_NAME.EMPLOYEE,
      },
    ],
  },
  {
    title: 'Setup',
    items: [
      {
        icon: <Settings strokeWidth={1.5} />,
        describe: 'Settings',
        link: PATH_NAME.SETTINGS.BASE + PATH_NAME.SETTINGS.PROFILE,
      },
    ],
  },
]

export const managerSidebarItems: ISidebarItem[] = [
  {
    title: 'Main',
    items: [
      {
        icon: <LayoutDashboard strokeWidth={1.5} />,
        describe: 'Dashboard',
        link: PATH_NAME.HOME,
      },
    ],
  },
  {
    title: 'Product & Stock',
    items: [
      {
        icon: <Shirt strokeWidth={1.5} />,
        describe: 'Products',
        link: PATH_NAME.PRODUCT,
      },
      {
        icon: <PackageOpen strokeWidth={1.5} />,
        describe: 'Stocks',
        link: PATH_NAME.STOCK,
      },
      {
        icon: <LayoutGrid strokeWidth={1.5} />,
        describe: 'Categories',
        link: PATH_NAME.CATEGORY,
      },
    ],
  },
  {
    title: 'Sales',
    items: [
      {
        icon: <TicketPercent strokeWidth={1.5} />,
        describe: 'Vouchers',
        link: PATH_NAME.VOUCHER,
      },
      {
        icon: <BadgeCheck strokeWidth={1.5} />,
        describe: 'Events',
        link: PATH_NAME.EVENT,
      },
    ],
  },
  {
    title: 'Pos & Orders',
    items: [
      {
        icon: <ReceiptText strokeWidth={1.5} />,
        describe: 'POS',
        link: PATH_NAME.POS,
      },
      {
        icon: <Package strokeWidth={1.5} />,
        describe: 'Orders',
        link: PATH_NAME.ORDER,
      },
      {
        icon: <ShoppingCart strokeWidth={1.5} />,
        describe: 'Order Details',
        link: PATH_NAME.ORDER_DETAILS,
      },
    ],
  },
  {
    title: 'Users',
    items: [
      {
        icon: <Smile strokeWidth={1.5} />,
        describe: 'Customers',
        link: PATH_NAME.CUSTOMER,
      },
      {
        icon: <UsersRound strokeWidth={1.5} />,
        describe: 'Employees',
        link: PATH_NAME.EMPLOYEE,
      },
    ],
  },
  {
    title: 'Setup',
    items: [
      {
        icon: <Settings strokeWidth={1.5} />,
        describe: 'Settings',
        link: PATH_NAME.SETTINGS.BASE + PATH_NAME.SETTINGS.PROFILE,
      },
    ],
  },
]

export const employeeSidebarItems: ISidebarItem[] = [
  {
    title: 'Main',
    items: [
      {
        icon: <LayoutDashboard strokeWidth={1.5} />,
        describe: 'Dashboard',
        link: PATH_NAME.HOME,
      },
    ],
  },
  {
    title: 'Product & Stock',
    items: [
      {
        icon: <Dumbbell strokeWidth={1.5} />,
        describe: 'Sports',
        link: PATH_NAME.SPORT,
      },
      {
        icon: <Dices strokeWidth={1.5} />,
        describe: 'Brands',
        link: PATH_NAME.BRAND,
      },
      {
        icon: <Shirt strokeWidth={1.5} />,
        describe: 'Products',
        link: PATH_NAME.PRODUCT,
      },
      {
        icon: <PackageOpen strokeWidth={1.5} />,
        describe: 'Stocks',
        link: PATH_NAME.STOCK,
      },
      {
        icon: <LayoutGrid strokeWidth={1.5} />,
        describe: 'Categories',
        link: PATH_NAME.CATEGORY,
      },
    ],
  },
  {
    title: 'Sales',
    items: [
      {
        icon: <TicketPercent strokeWidth={1.5} />,
        describe: 'Vouchers',
        link: PATH_NAME.VOUCHER,
      },
      {
        icon: <BadgeCheck strokeWidth={1.5} />,
        describe: 'Events',
        link: PATH_NAME.EVENT,
      },
    ],
  },
  {
    title: 'Pos & Orders',
    items: [
      // {
      //   icon: <ReceiptText strokeWidth={1.5} />,
      //   describe: 'POS',
      //   link: PATH_NAME.POS,
      // },
      {
        icon: <Package strokeWidth={1.5} />,
        describe: 'Orders',
        link: PATH_NAME.ORDER,
      },
      {
        icon: <ShoppingCart strokeWidth={1.5} />,
        describe: 'Order Details',
        link: PATH_NAME.ORDER_DETAILS,
      },
    ],
  },
  {
    title: 'Users',
    items: [
      {
        icon: <Smile strokeWidth={1.5} />,
        describe: 'Customers',
        link: PATH_NAME.CUSTOMER,
      },
    ],
  },
  {
    title: 'Setup',
    items: [
      {
        icon: <Settings strokeWidth={1.5} />,
        describe: 'Settings',
        link: PATH_NAME.SETTINGS.BASE + PATH_NAME.SETTINGS.PROFILE,
      },
    ],
  },
]
