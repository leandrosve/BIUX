import LandingPage from '../pages/landing-page/LandingPage';
import SignupPage from '../pages/SignupPage';
import LoginPage from '../pages/LoginPage';
import { lazy } from 'react';
import Role from '../model/user/Role';

const RoutinesPage = lazy(() => import('../features/routines/RoutinesPage'));
const StudentRoutinesPage = lazy(() => import('../features/students/StudentRoutinesPage'));
const ConfigPage = lazy(() => import('../pages/ConfigPage'));
const NotFoundPage = lazy(() => import('../pages/not-found-page/NotFoundPage'));
const MaintenancePage = lazy(() => import('../pages/maintenance-page/MaintenancePage'));
const DashboardPage = lazy(() => import('../pages/DashboardPage'));
const StudentDetail = lazy(() => import('../features/students/StudentDetail'));
const StudentsPageForInstructor= lazy(()=> import('../features/students/StudentsPage'))

export enum BRoutes {
  HOME = '/',
  CONFIG = '/config',
  SIGNUP = '/registrarme',
  LOGIN = '/login',
  ROUTINES = '/rutinas',
  DASHBOARD = '/dashboard',
  PROFILE = '/perfil',
  STUDENT_ROUTINES = '/alumno/rutinas',
  STUDENTS_LIST='/alumnos'
}

const routes = [
  {
    path: '/config',
    type: 'private',
    title: 'Configuración',
    element: <ConfigPage />,
  },
  {
    path: '/rutinas',
    type: 'private',
    title: 'Rutinas',
    hasSubroutes: true,
    subroutes: [{ path: 'crear', title: 'Nueva Rutina' }],
    element: <RoutinesPage />,
    role: Role.INSTRUCTOR
  },
  {
    path: '/alumnos',
    type: 'private',
    title: 'Alumnos',
    hasSubroutes: true,
    element: <StudentsPageForInstructor />,
    role: Role.INSTRUCTOR
  },
  {
    path: '/alumno/rutinas',
    type: 'private',
    title: 'Rutinas',
    hasSubroutes: true,
    element: <StudentRoutinesPage />,
    role: Role.STUDENT
  },
  {
    type: 'guest',
    path: '/',
    title: 'Controla el progreso de tus alumnos',
    element: <LandingPage />,
  },
  {
    type: 'guest',
    path: '/registrarme',
    title: 'Registrarme',
    element: <SignupPage />,
  },
  {
    type: 'guest',
    path: '/login',
    title: 'Iniciar Sesión',
    element: <LoginPage />,
  },
  {
    path: '/dashboard',
    type: 'private',
    title: 'Dashboard',
    element: <DashboardPage />,
  },
  {
    path: '/mantenimiento',
    type: 'any',
    title: 'Mantenimiento',
    element: <MaintenancePage />,
  },
  { path: '*', type: 'any', title: 'Página no encontrada', element: <NotFoundPage /> },
];

export default routes;
