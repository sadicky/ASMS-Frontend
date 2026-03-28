import type { IconType } from 'react-icons/lib';
import {
  LuMonitorDot,
  LuShoppingBag,
  LuSquareUserRound,
  LuAlbum,
  LuSchool,
  LuScrollText,
  LuShare2, 
  LuRotate3D,
  LuNewspaper
} from 'react-icons/lu';
import { GiTeacher } from "react-icons/gi";
import { PiStudentFill } from "react-icons/pi";
import { FaGlobeAfrica } from "react-icons/fa";
import { SiGoogleclassroom } from "react-icons/si";
import { ROLES } from "@/helpers/constants";

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
  roles?: string[]; 
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
    href: '/admin/dashboard',
    roles: [ROLES.SUPER_ADMIN],
  },

  // {
  //   key: 'SchoolDashboard',
  //   label: 'Dashboardschool',
  //   icon: LuMonitorDot,
  //   href: '/school/dashboard',
  //   roles: [ROLES.SCHOOL],
  // },

  // {
  //   key: 'TeacherDashboard',
  //   label: 'Dashboard',
  //   icon: LuMonitorDot,
  //   href: '/teacher/dashboard',
  //   roles: [ROLES.TEACHER],
  // },

  // {
  //   key: 'StudentDashboard',
  //   label: 'Dashboard',
  //   icon: LuMonitorDot,
  //   href: '/student/dashboard',
  //   roles: [ROLES.STUDENT],
  // },
  {
    key: 'Pages',
    label: 'Pages',
    isTitle: true,
    roles: [ROLES.SUPER_ADMIN],
  },
  {
    key: 'Regions',
    label: 'Regions',
    icon: FaGlobeAfrica,
    href: '/admin/regions',
    roles: [ROLES.SUPER_ADMIN],
  },
  {
    key: 'Directorates',
    label: 'Directorates',
    icon: LuNewspaper  ,
    href: '/admin/directorates',
  },
  {
    key: 'Districts',
    label: 'Districts',
    icon: LuRotate3D ,
    href: '/admin/districts',
  },
  {
    key: 'Clusters',
    label: 'Clusters',
    icon: LuShare2,
    href: '/admin/clusters',
  },
  {
    key: 'Years',
    label: 'Years',
    icon: LuAlbum,
    href: '/chat',
  },
  {
    key: 'Schools',
    label: 'Schools',
    icon: LuSchool ,
    children: [
      { key: 'AddSchool', label: 'Add School', href: '/add-school' },
      { key: 'Schools List', label: 'Schools List', href: '/schools-list' },
    ],
  },
  {
    key: 'Licenses',
    label: 'Licenses',
    icon: LuScrollText  ,
    children: [
      { key: 'AddLicense', label: 'Add License', href: '/add-license' },
      { key: 'Licenses List', label: 'Licenses List', href: '/licenses-list' },
    ],
  },
  {
    key: 'Grades',
    label: 'Grades',
    icon: LuShoppingBag,
    children: [
      { key: 'AddGrade', label: 'Add Grade', href: '/add-grade' },
      { key: 'Grades List', label: 'Grades List', href: '/grades-list' },
    ],
  },
  {
    key: 'Classes',
    label: 'Classes',
    icon: SiGoogleclassroom,
    children: [
      { key: 'AddClass', label: 'Add Class', href: '/add-class' },
      { key: 'Classes List', label: 'Classes List', href: '/classes-list' },
    ],
  },
  {
    key: 'Students',
    label: 'Students',
    icon: PiStudentFill,
    children: [
      { key: 'AddStudent', label: 'Add Student', href: '/add-student' },
      { key: 'Students List', label: 'Students List', href: '/students-list' },
    ],
  },
  {
    key: 'Staff',
    label: 'Staff',
    icon: GiTeacher,
    children: [
      { key: 'AddStaff', label: 'Add Staff', href: '/add-staff' },
      { key: 'Staff List', label: 'Staff List', href: '/staff-list' },
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
  }
];
