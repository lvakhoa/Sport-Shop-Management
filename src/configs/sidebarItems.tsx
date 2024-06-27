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
  Ticket,
  BadgeCheck,
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
        icon: <ShoppingCart strokeWidth={1.5} />,
        describe: 'Order Details',
        link: PATH_NAME.ORDER_DETAILS,
      },
    ],
  },
  {
    title: 'Vouchers & Events',
    items: [
      {
        icon: <TicketPercent strokeWidth={1.5} />,
        describe: 'Vouchers',
        link: '/vouchers',
      },
      {
        icon: <Ticket strokeWidth={1.5} />,
        describe: 'Events',
        link: '/events',
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
        link: `${PATH_NAME.SETTINGS}/profile`,
      },
    ],
  },
]
