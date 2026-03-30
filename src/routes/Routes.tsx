import { ROLES } from '@/helpers/constants';
import { lazy } from 'react';

// admin pages

const Regions = lazy(() => import('@/app/(admin)/(app)/(pages)/regions'));
const Directorate = lazy(() => import('@/app/(admin)/(app)/(pages)/directorates'));
const District = lazy(() => import('@/app/(admin)/(app)/(pages)/district'));
const Cluster = lazy(() => import('@/app/(admin)/(app)/(pages)/cluster'));
const Years = lazy(() => import('@/app/(admin)/(app)/(pages)/years'));
const Licences = lazy(() => import('@/app/(admin)/(app)/(pages)/licences'));

// add page

const AddRegion = lazy(() => import('@/app/(admin)/(app)/(pages)/regions/add-new'));
const AddDirectorate = lazy(() => import('@/app/(admin)/(app)/(pages)/directorates/add-new'));
const AddDistrict = lazy(() => import('@/app/(admin)/(app)/(pages)/district/add-new'));
const AddCluster = lazy(() => import('@/app/(admin)/(app)/(pages)/cluster/add-new'));
const AddSchool = lazy(() => import('@/app/(admin)/(app)/(pages)/schools/add-new'));
const AddYear = lazy(() => import('@/app/(admin)/(app)/(pages)/years/add-new'));
const AddLicence = lazy(() => import('@/app/(admin)/(app)/(pages)/licences/add-new'));

// admin invoice

const InvoiceAddNew = lazy(() => import('@/app/(admin)/(app)/(invoice)/add-new'));
const InvoiceList = lazy(() => import('@/app/(admin)/(app)/(invoice)/list'));
const InvoiceOverview = lazy(() => import('@/app/(admin)/(app)/(invoice)/overview'));

// USers

const UserGrid = lazy(() => import('@/app/(admin)/(app)/(users)/users-grid'));
const UserList = lazy(() => import('@/app/(admin)/(app)/(users)/users-list'));

const Calender = lazy(() => import('@/app/(admin)/(app)/calendar'));
const Chat = lazy(() => import('@/app/(admin)/(app)/chat'));
const MailBox = lazy(() => import('@/app/(admin)/(app)/mailbox'));
const Notes = lazy(() => import('@/app/(admin)/(app)/notes'));

// dashboard
const Student = lazy(() => import('@/app/(admin)/(dashboards)/student'));
const Teacher = lazy(() => import('@/app/(admin)/(dashboards)/teacher'));
const School = lazy(() => import('@/app/(admin)/(dashboards)/school'));
const Admin = lazy(() => import('@/app/(admin)/(dashboards)/index'));

// layouts
const DarkMode = lazy(() => import('@/app/(admin)/(layouts)/dark-mode'));
const RTL = lazy(() => import('@/app/(admin)/(layouts)/rtl-mode'));
const SideNavCompact = lazy(() => import('@/app/(admin)/(layouts)/sidenav-compact'));
const SideNavDark = lazy(() => import('@/app/(admin)/(layouts)/sidenav-dark'));
const SideNavHidden = lazy(() => import('@/app/(admin)/(layouts)/sidenav-hidden'));
const SideNavHover = lazy(() => import('@/app/(admin)/(layouts)/sidenav-hover'));
const SideNavHoverActive = lazy(() => import('@/app/(admin)/(layouts)/sidenav-hover-active'));
const SideOffcanvas = lazy(() => import('@/app/(admin)/(layouts)/sidenav-offcanvas'));
const SideNavSmall = lazy(() => import('@/app/(admin)/(layouts)/sidenav-small'));

//Pages

const Faq = lazy(() => import('@/app/(admin)/(pages)/faqs'));
const Pricing = lazy(() => import('@/app/(admin)/(pages)/pricing'));
const Starter = lazy(() => import('@/app/(admin)/(pages)/starter'));
const Timeline = lazy(() => import('@/app/(admin)/(pages)/timeline'));

//auth
const CreatePassword = lazy(() => import('@/app/(auth)/modern-create-password'));
const Login = lazy(() => import('@/app/(auth)/login'));
const Register = lazy(() => import('@/app/(auth)/modern-register'));
const ResetPassword = lazy(() => import('@/app/(auth)/modern-reset-password'));
const Logout = lazy(() => import('@/app/(auth)/modern-logout'));
const TwoStep = lazy(() => import('@/app/(auth)/modern-two-steps'));
const VerifyEmail = lazy(() => import('@/app/(auth)/modern-verify-email'));

//  landing

const OnePageLanding = lazy(() => import('@/app/(landing)/onepage-landing'));
const ProductLanding = lazy(() => import('@/app/(landing)/product-landing'));

//Other

const Error404 = lazy(() => import('@/app/(others)/404'));
const CommingSoon = lazy(() => import('@/app/(others)/coming-soon'));
const Maintenance = lazy(() => import('@/app/(others)/maintenance'));
const Offline = lazy(() => import('@/app/(others)/offline'));

export const layoutsRoutes = [
  { path: '/admin/dashboard', name: 'DashboardA', element: <Admin />,
    roles: [ROLES.SUPER_ADMIN] },
  { path: '/school/dashboard', name: 'DashboardSc', element: <School />,
    roles: [ROLES.SCHOOL_ADMIN] },
  { path: '/student/dashboard', name: 'DashboardSt', element: <Student />,
    roles: [ROLES.STUDENT]},
  { path: '/teacher/dashboard', name: 'DashboardT', element: <Teacher />,
    roles: [ROLES.TEACHER] },

  { path: '/admin/regions', name: 'Regions', element: <Regions />,roles: [ROLES.SUPER_ADMIN]},
  { path: '/admin/directorates', name: 'Directorates', element: <Directorate /> ,roles: [ROLES.SUPER_ADMIN]},
  { path: '/admin/districts', name: 'Districts', element: <District /> ,roles: [ROLES.SUPER_ADMIN]},
  { path: '/admin/clusters', name: 'Cluster', element: <Cluster /> ,roles: [ROLES.SUPER_ADMIN]},
  { path: '/admin/years', name: 'Years', element: <Years /> ,roles: [ROLES.SUPER_ADMIN,ROLES.SCHOOL_ADMIN]},
  { path: '/admin/licences', name: 'Licences', element: <Licences /> ,roles: [ROLES.SUPER_ADMIN,ROLES.SCHOOL_ADMIN]},

  { path: '/admin/regions/create', name: 'AddRegion', element: <AddRegion /> ,roles: [ROLES.SUPER_ADMIN]},
  { path: '/admin/directorates/create', name: 'AddDirectorate', element: <AddDirectorate /> ,roles: [ROLES.SUPER_ADMIN]},
  { path: '/admin/districts/create', name: 'AddDistrict', element: <AddDistrict /> ,roles: [ROLES.SUPER_ADMIN]},
  { path: '/admin/clusters/create', name: 'AddCluster', element: <AddCluster /> ,roles: [ROLES.SUPER_ADMIN]},
  { path: '/admin/schools/create', name: 'AddSchool', element: <AddSchool /> ,roles: [ROLES.SUPER_ADMIN]},
  { path: '/admin/years/create', name: 'AddYear', element: <AddYear /> ,roles: [ROLES.SUPER_ADMIN]},
  { path: '/admin/licences/create', name: 'AddLicence', element: <AddLicence /> ,roles: [ROLES.SUPER_ADMIN]},


  { path: '/add-new', name: 'InvoiceAddNew', element: <InvoiceAddNew /> },
  { path: '/list', name: 'InvoiceList', element: <InvoiceList /> },
  { path: '/overview', name: 'InvoiceOverview', element: <InvoiceOverview /> },

  { path: '/users-grid', name: 'UserGrid', element: <UserGrid /> },
  { path: '/users-list', name: 'UserList', element: <UserList /> },

  { path: '/calendar', name: 'Calender', element: <Calender /> },
  { path: '/chat', name: 'Chat', element: <Chat /> },
  { path: '/mailbox', name: 'MailBox', element: <MailBox /> },
  { path: '/notes', name: 'Notes', element: <Notes /> },

  { path: '/analytics', name: 'Analytics', element: <Student /> },
  { path: '/', name: 'pages', element: <Admin /> },
  { path: '/email', name: 'Email', element: <Teacher /> },
  { path: '/hr', name: 'Hr', element: <School /> },

  { path: '/dark-mode', name: 'DarkMode', element: <DarkMode /> },
  { path: '/rtl-mode', name: 'RtlMode', element: <RTL /> },
  { path: '/sidenav-compact', name: 'SideNavCompact', element: <SideNavCompact /> },
  { path: '/sidenav-dark', name: 'SideNavDark', element: <SideNavDark /> },
  { path: '/sidenav-hidden', name: 'SideNavHidden', element: <SideNavHidden /> },
  { path: '/sidenav-hover', name: 'SideNavHover', element: <SideNavHover /> },
  { path: '/sidenav-offcanvas', name: 'SideNavOffcanvas', element: <SideOffcanvas /> },
  { path: '/sidenav-small', name: 'SideNavSmall', element: <SideNavSmall /> },
  { path: '/sidenav-hover-active', name: 'SideNavHoverActive', element: <SideNavHoverActive /> },

  { path: '/faqs', name: 'Faqs', element: <Faq /> },
  { path: '/pricing', name: 'Pricing', element: <Pricing /> },
  { path: '/starter', name: 'Starter', element: <Starter /> },
  { path: '/timeline', name: 'Timeline', element: <Timeline /> },
];

export const singlePageRoutes = [
  { path: '/', name: 'auth', element: <Login /> },

  { path: '/auth', name: 'auth', element: <Login /> },
  {
    path: '/modern-create-password',
    name: 'ModernCreatePassword',
    element: <CreatePassword />,
  },
  { path: '/modern-register', name: 'ModernRegister', element: <Register /> },
  { path: '/modern-reset-password', name: 'ModernResetPassword', element: <ResetPassword /> },
  { path: '/modern-logout', name: 'ModernLogout', element: <Logout /> },
  { path: '/modern-verify-email', name: 'ModernVerifyEmail', element: <VerifyEmail /> },
  { path: '/modern-two-steps', name: 'ModernTwoStep', element: <TwoStep /> },

  { path: '/onepage-landing', name: 'OnePageLanding', element: <OnePageLanding /> },
  { path: '/product-landing', name: 'ProductLanding', element: <ProductLanding /> },

  { path: '/404', name: '404', element: <Error404 /> },
  { path: '/coming-soon', name: 'ComingSoon', element: <CommingSoon /> },
  { path: '/maintenance', name: 'Maintenance', element: <Maintenance /> },
  { path: '/offline', name: 'Offline', element: <Offline /> },
];
