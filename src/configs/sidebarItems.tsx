import { PATH_NAME } from './pathName'
import {
  CornerDownLeft,
  LayoutDashboard,
  ReceiptText,
  Shirt,
  ShoppingBasket,
  ShoppingCart,
  Smile,
  UserRound,
  UsersRound,
  Settings,
} from 'lucide-react'

export const sidebarItems = [
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
        icon: <ShoppingCart strokeWidth={1.5} />,
        describe: 'POS Orders',
        link: '/pos-orders',
      },
      {
        icon: <ShoppingBasket strokeWidth={1.5} />,
        describe: 'Online Orders',
        link: '/online-orders',
      },
      {
        icon: <CornerDownLeft strokeWidth={1.5} />,
        describe: 'Returns',
        link: '/returns',
      },
    ],
  },
  {
    title: 'Users',
    items: [
      {
        icon: <UserRound strokeWidth={1.5} />,
        describe: 'Administrators',
        link: '/administrators',
      },
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
        link: PATH_NAME.SETTINGS,
      },
    ],
  },
]
