import type { IconType } from 'react-icons/lib';
import {
  LuMonitorDot,
  LuShoppingBag,
  LuSquareUserRound,
  LuAlbum,
  LuSchool,
  LuScrollText,
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
    roles: [ROLES.SUPER_ADMIN, ROLES.SCHOOL_ADMIN],
  },
  {
    key: 'Dashboards',
    label: 'Dashboards',
    icon: LuMonitorDot,
    href: '/dashboard',
    roles: [ROLES.SUPER_ADMIN,ROLES.SCHOOL_ADMIN,ROLES.TEACHER,ROLES.STUDENT],
  },

  {
    key: 'Pages',
    label: 'Pages',
    isTitle: true,
    roles: [ROLES.SUPER_ADMIN],
  },
  {
    key: 'Admin Hierarchy',
    label: 'Hierarchy',
    icon: FaGlobeAfrica,
    roles: [ROLES.SUPER_ADMIN],
    children: [ 
      { key: 'Regions', label: 'Regions', href: '/regions',roles: [ROLES.SUPER_ADMIN], },
      { key: 'Directorates', label: 'Directorates', href: '/directorates',roles: [ROLES.SUPER_ADMIN], },
      { key: 'Districts', label: 'Districts', href: '/districts',roles: [ROLES.SUPER_ADMIN], }, 
      { key: 'Clusters', label: 'Clusters', href: '/clusters',roles: [ROLES.SUPER_ADMIN], },
    ],
  },
  {
    key: 'Years',
    label: 'Years',
    icon: LuAlbum,
    href: '/years',
    roles: [ROLES.SUPER_ADMIN],
  },
  {
    key: 'Academics',
    label: 'Academics',
    isTitle: true,
    roles: [ROLES.SUPER_ADMIN, ROLES.SCHOOL_ADMIN, ROLES.TEACHER, ROLES.STUDENT],
  },
  {
    key: 'Schools',
    label: 'Schools',
    icon: LuSchool,
    roles: [ROLES.SUPER_ADMIN, ROLES.SCHOOL_ADMIN],
    children: [
      { key: 'AddSchool', label: 'Add School', href: '/school/create',roles: [ROLES.SUPER_ADMIN], },
      { key: 'Schools List', label: 'School List', href: '/school/list',roles: [ROLES.SUPER_ADMIN], },
    ],
  },
  {
    key: 'Licenses',
    label: 'Licenses',
    icon: LuScrollText,
    roles: [ROLES.SUPER_ADMIN, ROLES.SCHOOL_ADMIN],
    children: [
      { key: 'Licenses List', label: 'Licenses List', href: '/licences/list',roles: [ROLES.SUPER_ADMIN], },
    ],
  },
  {
    key: 'Grades',
    label: 'Grades',
    icon: LuShoppingBag,
    href: '/grades',
    roles: [ROLES.SUPER_ADMIN],
  },
  {
    key: 'Classes',
    label: 'Classes',
    icon: SiGoogleclassroom,
    roles: [ROLES.SUPER_ADMIN, ROLES.SCHOOL_ADMIN],
   href: '/classes',
  },
  {
    key: 'Students',
    label: 'Students',
    icon: PiStudentFill,
    roles: [ROLES.SUPER_ADMIN, ROLES.SCHOOL_ADMIN],
    children: [
      { key: 'AddStudent', label: 'Enrollement', href: '/students/create',roles: [ROLES.SCHOOL_ADMIN], },
      { key: 'Students List', label: 'Students List', href: '/students',roles: [ROLES.SUPER_ADMIN, ROLES.SCHOOL_ADMIN], },
    ],
  },
  {
    key: 'Staff',
    label: 'Staff',
    icon: GiTeacher,
    roles: [ROLES.SCHOOL_ADMIN],
    children: [
      { key: 'AddStaff', label: 'Add Staff', href: '/staff/create',roles: [ROLES.SCHOOL_ADMIN], },
      { key: 'Staff List', label: 'Staff List', href: '/staffs',roles: [ ROLES.SCHOOL_ADMIN], },
    ],
  },
  {
    key: 'Users',
    label: 'Users',
    icon: LuSquareUserRound,
    roles: [ROLES.SUPER_ADMIN, ROLES.SCHOOL_ADMIN],
    children: [
      { key: 'List View', label: 'List View', href: '/users-list',roles: [ROLES.SUPER_ADMIN], },
      { key: 'Grid View', label: 'Grid View', href: '/users-grid',roles: [ROLES.SUPER_ADMIN], },
    ],
  }
];
