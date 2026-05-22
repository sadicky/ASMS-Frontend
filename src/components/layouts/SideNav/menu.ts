import type { IconType } from 'react-icons/lib';
import {
  LuMonitorDot,
  LuShoppingBag,
  LuSquareUserRound,
  LuAlbum,
  LuSchool,
  LuScrollText,
  LuCalendarClock,
  LuView,
} from 'react-icons/lu';
import { GiBookPile, GiTeacher } from "react-icons/gi";
import { PiExam, PiStudentFill } from "react-icons/pi";
import { FaGlobeAfrica } from "react-icons/fa";
import { SiGoogleclassroom } from "react-icons/si";
import { LuBookOpen } from "react-icons/lu";
import { LuTableColumnsSplit } from "react-icons/lu";
import { FaBook } from "react-icons/fa6";
import { MdAssessment, MdMenuBook, MdPlayLesson } from "react-icons/md";
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
    key: 'Streams',
    label: 'Streams',
    icon: LuBookOpen,
    href: '/streams',
   roles: [ROLES.SUPER_ADMIN, ROLES.SCHOOL_ADMIN],
  },
  {
    key: 'Classes',
    label: 'Classes',
    icon: SiGoogleclassroom,
    roles: [ROLES.SCHOOL_ADMIN],
   href: '/classes',
  },
  {
    key: 'Subjects',
    label: 'Subjects',
    icon: MdMenuBook ,
    roles: [ROLES.SCHOOL_ADMIN,ROLES.SUPER_ADMIN],
   href: '/subjects',
  },
  {
    key: 'Courses',
    label: 'Courses',
    icon: FaBook ,
    roles: [ROLES.SCHOOL_ADMIN,ROLES.SUPER_ADMIN,ROLES.TEACHER],
   href: '/courses',
  },
  {
    key: 'Lessons',
    label: 'Sessions',
    icon: MdPlayLesson ,
    roles: [ROLES.TEACHER,ROLES.SCHOOL_ADMIN],
   href: '/lessons',
  },
  {
    key: 'Timetable',
    label: 'Timetable',
    icon: LuTableColumnsSplit ,
    roles: [ROLES.SCHOOL_ADMIN,ROLES.TEACHER],
   href: '/timetables',
  },
  {
    key: 'Attendances',
    label: 'Attendances',
    icon: LuCalendarClock ,
    roles: [ROLES.SCHOOL_ADMIN,ROLES.TEACHER],
   href: '/attendances',
  },
  {
    key: 'Assessments',
    label: 'Assessments',
    icon: MdAssessment ,
    roles: [ROLES.SCHOOL_ADMIN,ROLES.TEACHER],
   href: '/assessments',
  },
  {
    key: 'Exams',
    label: 'Exams',
    icon: PiExam ,
    roles: [ROLES.SCHOOL_ADMIN,ROLES.TEACHER],
   href: '/exams',
  },
  {
    key: 'GradeBook',
    label: 'GradeBook',
    icon: GiBookPile ,
    roles: [ROLES.SCHOOL_ADMIN,ROLES.TEACHER, ROLES.PARENT],
   href: '/gradebooks',
  },
  {
    key: 'Students',
    label: 'Students',
    icon: PiStudentFill,
    roles: [ROLES.SCHOOL_ADMIN],
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
