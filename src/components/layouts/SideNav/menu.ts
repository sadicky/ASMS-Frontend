import type { IconType } from 'react-icons/lib';
import {
  LuCalendar1,
  LuCircuitBoard,
  LuFingerprint,
  LuMessagesSquare,
  LuMonitorDot,
  LuShoppingBag,
  LuSquareUserRound,
} from 'react-icons/lu';

export type MenuItemType = {
  key: string;
  label: string;
  isTitle?: boolean;
  href?: string;
  children?: MenuItemType[];

  icon?: IconType;
  parentKey?: string;
  target?: string;
  isDisabled?: boolean;
};

export const menuItemsData: MenuItemType[] = [
  {
    key: 'Overview',
    label: 'Overview',
    isTitle: true,
  },
  {
    key: 'Dashboards',
    label: 'Dashboards',
    icon: LuMonitorDot,
    children: [
      { key: 'Analytics', label: 'Analytics', href: '/analytics' },
      { key: 'Ecommerce', label: 'Ecommerce', href: '/index' },
      { key: 'Email', label: 'Email', href: '/email' },
      { key: 'HR', label: 'HR', href: '/hr' },
    ],
  },
  {
    key: 'Apps',
    label: 'Apps',
    isTitle: true,
  },
  {
    key: 'Chat',
    label: 'Chat',
    icon: LuMessagesSquare,
    href: '/chat',
  },
  {
    key: 'Calendar',
    label: 'Calendar',
    icon: LuCalendar1,
    href: '/calendar',
  },
  {
    key: 'Ecommerce',
    label: 'Ecommerce',
    icon: LuShoppingBag,
    children: [
      { key: 'Products', label: 'Products', href: '/product-list' },
      { key: 'Products Grid', label: 'Products Grid', href: '/product-grid' },
      { key: 'Product Details', label: 'Product Details', href: '/product-overview' },
      { key: 'Shopping Cart', label: 'Shopping Cart', href: '/cart' },
      { key: 'Checkout', label: 'Checkout', href: '/checkout' },
      { key: 'Add Products', label: 'Add Products', href: '/product-create' },
      { key: 'Orders', label: 'Orders', href: '/orders' },
      { key: 'Order Details', label: 'Order Details', href: '/order-overview' },
      { key: 'Sellers', label: 'Sellers', href: '/sellers' },
    ],
  },
  {
    key: 'HR Management',
    label: 'HR Management',
    icon: LuCircuitBoard,
    children: [
      { key: 'Employee List', label: 'Employee List', href: '/employee' },
      { key: 'Holidays', label: 'Holidays', href: '/holidays' },
      {
        key: 'Leave Manage',
        label: 'Leave Manage',
        href: '#',
        children: [
          { key: 'By Employee', label: 'By Employee', href: '/leave-employee' },
          {
            key: 'Add Leave(Employee)',
            label: 'Add Leave(Employee)',
            href: '/create-leave-employee',
          },
          { key: 'By HR', label: 'By HR', href: '/leave' },
          { key: 'Add Leave(HR)', label: 'Add Leave(HR)', href: '/create-leave' },
        ],
      },
      {
        key: 'Attendance',
        label: 'Attendance',
        href: '#',
        children: [
          { key: 'Attendance(HR)', label: 'Attendance(HR)', href: '/attendance' },
          { key: 'Main Attendance', label: 'Main Attendance', href: '/attendance-main' },
        ],
      },
      { key: 'Department', label: 'Department', href: '/department' },
      {
        key: 'Sales',
        label: 'Sales',
        href: '#',
        children: [
          { key: 'Estimates', label: 'Estimates', href: '/sales-estimates' },
          { key: 'Payments', label: 'Payments', href: '/sales-payments' },
          { key: 'Expenses', label: 'Expenses', href: '/sales-expenses' },
        ],
      },
      {
        key: 'Payroll',
        label: 'Payroll',
        href: '#',
        children: [
          { key: 'Employee Salary', label: 'Employee Salary', href: '/payroll-employee-salary' },
          { key: 'Payslip', label: 'Payslip', href: '/payroll-payslip' },
          { key: 'Create Payslip', label: 'Create Payslip', href: '/create-payslip' },
        ],
      },
    ],
  },
  {
    key: 'Users',
    label: 'Users',
    icon: LuSquareUserRound,
    children: [
      { key: 'List View', label: 'List View', href: '/users-list' },
      { key: 'Grid View', label: 'Grid View', href: '/users-grid' },
    ],
  },
  {
    key: 'Extra',
    label: 'Extra',
    isTitle: true,
  },
  {
    key: 'Modern Auth',
    label: 'Modern Auth',
    icon: LuFingerprint,
    children: [
      { key: 'Login', label: 'Login', href: '/Auth' },
      { key: 'Register', label: 'Register', href: '/modern-register' },
      { key: 'Verify Email', label: 'Verify Email', href: '/modern-verify-email' },
      { key: 'Two Steps', label: 'Two Steps', href: '/modern-two-steps' },
      { key: 'Logout', label: 'Logout', href: '/modern-logout' },
      { key: 'Reset Password', label: 'Reset Password', href: '/modern-reset-password' },
      { key: 'Create Password', label: 'Create Password', href: '/modern-create-password' },
    ],
  },
];
