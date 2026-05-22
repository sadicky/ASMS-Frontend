import { ROLES } from '@/helpers/constants';
import { lazy } from 'react';

// admin pages

const Regions = lazy(() => import('@/app/(admin)/(app)/(pages)/regions'));
const Directorate = lazy(() => import('@/app/(admin)/(app)/(pages)/directorates'));
const District = lazy(() => import('@/app/(admin)/(app)/(pages)/district'));
const Cluster = lazy(() => import('@/app/(admin)/(app)/(pages)/cluster'));
const Years = lazy(() => import('@/app/(admin)/(app)/(pages)/years'));
const Licences = lazy(() => import('@/app/(admin)/(app)/(pages)/licences'));
const Grades = lazy(() => import('@/app/(admin)/(app)/(pages)/grades'));
const Classes = lazy(() => import('@/app/(admin)/(app)/(pages)/classes'));
const Students = lazy(() => import('@/app/(admin)/(app)/(pages)/students'));
const Terms = lazy(() => import('@/app/(admin)/(app)/(pages)/terms'));

//TEACHER ADD
const AddTeacherLessons = lazy(() => import('@/app/(teacher)/(pages)/lessons/add-new'));
const AddTeacherAssessment = lazy(() => import('@/app/(teacher)/(pages)/assessments/add-new'));
const AddTeacherAttendances = lazy(() => import('@/app/(teacher)/(pages)/attendances/add-new'));
const AddTeacherTimetable = lazy(() => import('@/app/(teacher)/(pages)/timetables/add-new'));
// const AddTeacherCourses = lazy(() => import('@/app/(teacher)/(pages)/courses/add-new'));

//TEACHER LISTS
const TeacherMyLessons = lazy(() => import('@/app/(teacher)/(pages)/lessons'));
const TeacherMyCourses = lazy(() => import('@/app/(teacher)/(pages)/courses'));
const TeacherMyAssessments = lazy(() => import('@/app/(teacher)/(pages)/assessments'));
const TeacherMyAttendances = lazy(() => import('@/app/(teacher)/(pages)/attendances'));
const TeacherMyTimetables = lazy(() => import('@/app/(teacher)/(pages)/timetables'));

// add page super admin
const AddRegion = lazy(() => import('@/app/(admin)/(app)/(pages)/regions/add-new'));
const AddDirectorate = lazy(() => import('@/app/(admin)/(app)/(pages)/directorates/add-new'));
const AddDistrict = lazy(() => import('@/app/(admin)/(app)/(pages)/district/add-new'));
const AddCluster = lazy(() => import('@/app/(admin)/(app)/(pages)/cluster/add-new'));
const AddSchool = lazy(() => import('@/app/(admin)/(app)/(pages)/schools/add-new'));
const AddYear = lazy(() => import('@/app/(admin)/(app)/(pages)/years/add-new'));
const AddLicence = lazy(() => import('@/app/(admin)/(app)/(pages)/licences/add-new'));
const AddGrade = lazy(() => import('@/app/(admin)/(app)/(pages)/grades/add-new'));
const AddClass = lazy(() => import('@/app/(admin)/(app)/(pages)/classes/add-new'));
const AddStaff = lazy(() => import('@/app/(school)/(pages)/staff/add-new'));

//add page school admin
const AddStudent = lazy(() => import('@/app/(school)/(pages)/students/add-new'));
const AddMyClass = lazy(() => import('@/app/(school)/(pages)/classes/add-new'));
const AddMyStream = lazy(() => import('@/app/(school)/(pages)/streams/add-new'));
const AddMySubject = lazy(() => import('@/app/(school)/(pages)/subjects/add-new'));
const AddMyCourses = lazy(() => import('@/app/(school)/(pages)/courses/add-new'));
const AddMyAssignment = lazy(() => import('@/app/(school)/(pages)/teacher-assignment/add-new'));
const AddMyLesson = lazy(() => import('@/app/(school)/(pages)/lessons/add-new'));
const AddMyTimetable = lazy(() => import('@/app/(school)/(pages)/timetables/add-new'));
const AddMyAttendance = lazy(() => import('@/app/(school)/(pages)/attendances/add-new'));
const AddMyAssessment = lazy(() => import('@/app/(school)/(pages)/assessments/add-new'));
const AddMyTerm = lazy(() => import('@/app/(school)/(pages)/terms/add-new'));
const AddMyExam = lazy(() => import('@/app/(school)/(pages)/exams/add-new'));
const AddMyGradeBook = lazy(() => import('@/app/(school)/(pages)/gradebooks/add-new'));

// SUPER ADMIN LIST VIEWS
const SchoolList = lazy(() => import('@/app/(admin)/(app)/(pages)/schools'));
const LicencesList = lazy(() => import('@/app/(admin)/(app)/(pages)/licences'));
const SchoolOverview = lazy(() => import('@/app/(admin)/(app)/(pages)/schools/overview'));
const ClassOverview = lazy(() => import('@/app/(admin)/(app)/(pages)/classes/overview'));
const StudentOverview = lazy(() => import('@/app/(admin)/(app)/(pages)/students/overview'));

//SCHOOL ADMIN OVERVIEW
const MyStudentOverview = lazy(() => import('@/app/(school)/(pages)/students/overview'));
const MyStaffOverview = lazy(() => import('@/app/(school)/(pages)/staff/overview'));

//TEACHER OVERVIEW
const MyCoursesLessons = lazy(() => import('@/app/(teacher)/(pages)/courses/overview'));
const MyRecordsMarks = lazy(() => import('@/app/(teacher)/(pages)/assessments/record-marks'));


// SCHOOL ADMIN LIST VIEWS
const StudentSchool = lazy(() => import('@/app/(school)/(pages)/students'));
const MyClass = lazy(() => import('@/app/(school)/(pages)/classes'));
const MyGrades = lazy(() => import('@/app/(school)/(pages)/grades'));
const MySubjects = lazy(() => import('@/app/(school)/(pages)/subjects'));
const MyCourses = lazy(() => import('@/app/(school)/(pages)/courses'));
const MyLessons = lazy(() => import('@/app/(school)/(pages)/lessons'));
const MyTimetable = lazy(() => import('@/app/(school)/(pages)/timetables'));
const MyAttendances = lazy(() => import('@/app/(school)/(pages)/attendances'));
const MyAssessments = lazy(() => import('@/app/(school)/(pages)/assessments'));
const MyTerms = lazy(() => import('@/app/(school)/(pages)/terms'));
const MyExams = lazy(() => import('@/app/(school)/(pages)/exams'));
const MyGradeBooks = lazy(() => import('@/app/(school)/(pages)/gradebooks'));
const Staffs = lazy(() => import('@/app/(school)/(pages)/staff'));
const Streams = lazy(() => import('@/app/(school)/(pages)/streams'));

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

//auth
const CreatePassword = lazy(() => import('@/app/(auth)/modern-create-password'));
const Login = lazy(() => import('@/app/(auth)/login'));
const Register = lazy(() => import('@/app/(auth)/modern-register'));
const ResetPassword = lazy(() => import('@/app/(auth)/modern-reset-password'));
const Logout = lazy(() => import('@/app/(auth)/modern-logout'));
const TwoStep = lazy(() => import('@/app/(auth)/modern-two-steps'));
const VerifyEmail = lazy(() => import('@/app/(auth)/modern-verify-email'));


//Other

const Error404 = lazy(() => import('@/app/(others)/404'));
const CommingSoon = lazy(() => import('@/app/(others)/coming-soon'));
const Maintenance = lazy(() => import('@/app/(others)/maintenance'));
const Offline = lazy(() => import('@/app/(others)/offline'));

export const layoutsRoutes = [
  // DASHBOARDS
  { path: '/admin/dashboard', name: 'DashboardA', element: <Admin />,
    roles: [ROLES.SUPER_ADMIN] },
  { path: '/school/dashboard', name: 'DashboardSc', element: <School />,
    roles: [ROLES.SCHOOL_ADMIN] },
  { path: '/student/dashboard', name: 'DashboardSt', element: <Student />,
    roles: [ROLES.STUDENT]},
  { path: '/teacher/dashboard', name: 'DashboardT', element: <Teacher />,
    roles: [ROLES.TEACHER] },

    // ADMIN PAGES

  { path: '/admin/regions', name: 'Regions', element: <Regions />,roles: [ROLES.SUPER_ADMIN]},
  { path: '/admin/directorates', name: 'Directorates', element: <Directorate /> ,roles: [ROLES.SUPER_ADMIN]},
  { path: '/admin/districts', name: 'Districts', element: <District /> ,roles: [ROLES.SUPER_ADMIN]},
  { path: '/admin/clusters', name: 'Cluster', element: <Cluster /> ,roles: [ROLES.SUPER_ADMIN]},
  { path: '/admin/years', name: 'Years', element: <Years /> ,roles: [ROLES.SUPER_ADMIN,ROLES.SCHOOL_ADMIN]},
  { path: '/admin/licences', name: 'Licences', element: <Licences /> ,roles: [ROLES.SUPER_ADMIN,ROLES.SCHOOL_ADMIN]},
  { path: '/admin/grades', name: 'Grades', element: <Grades /> ,roles: [ROLES.SUPER_ADMIN,ROLES.SCHOOL_ADMIN]},
   { path: '/admin/classes', name: 'Classes', element: <Classes /> ,roles: [ROLES.SUPER_ADMIN,ROLES.SCHOOL_ADMIN]},
   { path: '/admin/students', name: 'Students', element: <Students /> ,roles: [ROLES.SUPER_ADMIN]},
   { path: '/admin/terms', name: 'Terms', element: <Terms /> ,roles: [ROLES.SUPER_ADMIN]},

   // SCHOOL PAGES
   { path: '/school/students', name: 'Students', element: <StudentSchool /> ,roles: [ROLES.SCHOOL_ADMIN]},
   { path: '/school/staffs', name: 'Staff', element: <Staffs /> ,roles: [ROLES.SCHOOL_ADMIN]},
   { path: '/school/grades', name: 'Grades', element: <MyGrades /> ,roles: [ROLES.SCHOOL_ADMIN]},
   { path: '/school/classes', name: 'Classes', element: <MyClass /> ,roles: [ROLES.SCHOOL_ADMIN]},
   { path: '/school/streams', name: 'Streams', element: <Streams /> ,roles: [ROLES.SCHOOL_ADMIN]},
   { path: '/school/subjects', name: 'Subjects', element: <MySubjects /> ,roles: [ROLES.SCHOOL_ADMIN]},
   { path: '/school/courses', name: 'Courses', element: <MyCourses /> ,roles: [ROLES.SCHOOL_ADMIN]},
   { path: '/school/lessons', name: 'Lessons', element: <MyLessons /> ,roles: [ROLES.SCHOOL_ADMIN]},
   { path: '/school/timetables', name: 'Timetable', element: <MyTimetable /> ,roles: [ROLES.SCHOOL_ADMIN]},
   { path: '/school/attendances', name: 'Attendances', element: <MyAttendances /> ,roles: [ROLES.SCHOOL_ADMIN]},
   { path: '/school/assessments', name: 'Assessments', element: <MyAssessments /> ,roles: [ROLES.SCHOOL_ADMIN]},
   { path: '/school/terms', name: 'Terms', element: <MyTerms /> ,roles: [ROLES.SCHOOL_ADMIN]},
  { path: '/school/exams', name: 'Exams', element: <MyExams /> ,roles: [ROLES.SCHOOL_ADMIN]},
  { path: '/school/gradebooks', name: 'GradeBooks', element: <MyGradeBooks /> ,roles: [ROLES.SCHOOL_ADMIN, ROLES.TEACHER, ROLES.PARENT]},
 
  //TEACHER PAGES
 { path: '/teacher/lessons', name: 'Lessons', element: <TeacherMyLessons /> ,roles: [ROLES.TEACHER]},
 { path: '/teacher/courses', name: 'Courses', element: <TeacherMyCourses /> ,roles: [ROLES.TEACHER]},
 { path: '/teacher/assessments', name: 'Assessments', element: <TeacherMyAssessments /> ,roles: [ROLES.TEACHER]},
 { path: '/teacher/attendances', name: 'Attendances', element: <TeacherMyAttendances /> ,roles: [ROLES.TEACHER]},
 { path: '/teacher/timetables', name: 'Timetables', element: <TeacherMyTimetables /> ,roles: [ROLES.TEACHER]},


 //TEACHER ADD

  // ADD PAGES
  { path: '/admin/regions/create', name: 'AddRegion', element: <AddRegion /> ,roles: [ROLES.SUPER_ADMIN]},
  { path: '/admin/directorates/create', name: 'AddDirectorate', element: <AddDirectorate /> ,roles: [ROLES.SUPER_ADMIN]},
  { path: '/admin/districts/create', name: 'AddDistrict', element: <AddDistrict /> ,roles: [ROLES.SUPER_ADMIN]},
  { path: '/admin/clusters/create', name: 'AddCluster', element: <AddCluster /> ,roles: [ROLES.SUPER_ADMIN]},
  { path: '/admin/school/create', name: 'AddSchool', element: <AddSchool /> ,roles: [ROLES.SUPER_ADMIN]},
  { path: '/admin/years/create', name: 'AddYear', element: <AddYear /> ,roles: [ROLES.SUPER_ADMIN]},
  { path: '/admin/licences/create', name: 'AddLicence', element: <AddLicence /> ,roles: [ROLES.SUPER_ADMIN]},
  { path: '/admin/grades/create', name: 'AddGrade', element: <AddGrade /> ,roles: [ROLES.SUPER_ADMIN, ROLES.SCHOOL_ADMIN] },
  { path: '/admin/classes/create', name: 'AddClass', element: <AddClass /> ,roles: [ROLES.SUPER_ADMIN, ROLES.SCHOOL_ADMIN] },

{ path: '/school/students/create', name: 'AddStudent', element: <AddStudent /> ,roles: [ROLES.SCHOOL_ADMIN] },
{ path: '/school/staff/create', name: 'AddStaff', element: <AddStaff /> ,roles: [ROLES.SCHOOL_ADMIN] },
{ path: '/school/streams/create', name: 'AddStream', element: <AddMyStream /> ,roles: [ROLES.SCHOOL_ADMIN] },
{ path: '/school/classes/create', name: 'AddClass', element: <AddMyClass /> ,roles: [ROLES.SCHOOL_ADMIN] },
{ path: '/school/subjects/create', name: 'AddSubject', element: <AddMySubject /> ,roles: [ROLES.SCHOOL_ADMIN] },
{ path: '/school/courses/create', name: 'AddCourse', element: <AddMyCourses /> ,roles: [ROLES.SCHOOL_ADMIN] },
{ path: '/school/teacher-assignments/create', name: 'Add Staff', element: <AddMyAssignment /> ,roles: [ROLES.SCHOOL_ADMIN]},
{ path: '/school/timetables/create', name: 'Add Timetable', element: <AddMyTimetable /> ,roles: [ROLES.SCHOOL_ADMIN]},
{ path: '/school/lessons/create', name: 'Add Lesson', element: <AddMyLesson /> ,roles: [ROLES.TEACHER]},
{ path: '/school/attendances/create', name: 'Add Attendance', element: <AddMyAttendance /> ,roles: [ROLES.SCHOOL_ADMIN]},
{ path: '/school/assessments/create', name: 'Add Assessment', element: <AddMyAssessment /> ,roles: [ROLES.SCHOOL_ADMIN]},
{ path: '/school/terms/create', name: 'Add Term', element: <AddMyTerm /> ,roles: [ROLES.SCHOOL_ADMIN]},
{ path: '/school/exams/create', name: 'Add Exam', element: <AddMyExam /> ,roles: [ROLES.SCHOOL_ADMIN]},
{ path: '/school/gradebooks/create', name: 'Add GradeBook', element: <AddMyGradeBook /> ,roles: [ROLES.SCHOOL_ADMIN]},
 { path: '/school/streams/create', name: 'AddStream', element: <AddMyStream /> ,roles: [ROLES.SCHOOL_ADMIN] },

//TEACHER
{ path: '/teacher/lessons/course/:courseId/create', name: 'Add Session', element: <AddTeacherLessons /> ,roles: [ROLES.TEACHER]},
{ path: '/teacher/assessments/create', name: 'Add Assessment', element: <AddTeacherAssessment /> ,roles: [ROLES.TEACHER]},
{ path: '/teacher/attendances/create', name: 'Add Attendance', element: <AddTeacherAttendances /> ,roles: [ROLES.TEACHER]},
{ path: '/teacher/timetables/create', name: 'Add Timetable', element: <AddTeacherTimetable /> ,roles: [ROLES.TEACHER]},

// SUPER ADMIN VIEWS
  { path: '/admin/licences/list', name: 'LicencesList', element: <LicencesList /> ,roles: [ROLES.SUPER_ADMIN] },
  { path: '/admin/school/list', name: 'SchoolList', element: <SchoolList />,roles: [ROLES.SUPER_ADMIN, ROLES.SCHOOL_ADMIN] },
  { path: '/admin/school/:id', name: 'SchoolOverview', element: <SchoolOverview /> ,roles: [ROLES.SUPER_ADMIN, ROLES.SCHOOL_ADMIN]},
  { path: '/admin/classes/:id', name: 'ClassOverview', element: <ClassOverview /> ,roles: [ROLES.SUPER_ADMIN, ROLES.SCHOOL_ADMIN]},
  { path: '/admin/students/:id', name: 'StudentOverview', element: <StudentOverview /> ,roles: [ROLES.SUPER_ADMIN, ROLES.SCHOOL_ADMIN]},
 
    //SCHOOL OVERVIEW
  { path: '/school/students/:id', name: 'StudentOverview', element: <MyStudentOverview /> ,roles: [ROLES.SUPER_ADMIN, ROLES.SCHOOL_ADMIN]},
 { path: '/school/staffs/:id', name: 'StaffOverview', element: <MyStaffOverview /> ,roles: [ROLES.SCHOOL_ADMIN]},

 //TEACHER OVERVIEW
  { path: '/teacher/lessons/course/:courseId', name: 'My Lessons', element: <MyCoursesLessons /> ,roles: [ROLES.TEACHER]},
 { path: '/teacher/assessments/:id', name: 'My Assessments', element: <MyStaffOverview /> ,roles: [ROLES.TEACHER]},
 { path: '/teacher/assessments/:id/marks', name: 'My Marks', element: <MyRecordsMarks /> ,roles: [ROLES.TEACHER]},
 { path: '/teacher/marks/course/:id', name: 'My Marks', element: <MyStaffOverview /> ,roles: [ROLES.TEACHER]},


  //  /school/teacher-assignments/create?courseId=${course.id}
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


  { path: '/404', name: '404', element: <Error404 /> },
  { path: '/coming-soon', name: 'ComingSoon', element: <CommingSoon /> },
  { path: '/maintenance', name: 'Maintenance', element: <Maintenance /> },
  { path: '/offline', name: 'Offline', element: <Offline /> },
];
