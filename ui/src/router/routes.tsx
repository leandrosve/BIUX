import LandingPage from '../pages/landing-page/LandingPage';
import SignupPage from '../pages/SignupPage';
import LoginPage from '../pages/LoginPage';
import { lazy } from 'react';

const RoutinesPage = lazy(() => import('../features/routines/RoutinesPage'));
const ConfigPage = lazy(() => import('../pages/ConfigPage'));
const NotFoundPage = lazy(() => import('../pages/not-found-page/NotFoundPage'));

export enum BRoutes {
  HOME = '/',
  CONFIG = '/config',
  SIGNUP = '/registrarme',
  LOGIN = '/login',
  RUTINES = '/rutinas',
  DASHBOARD = '/dashboard',
  PROFILE = '/perfil',
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

  { path: '*', type: 'any', title: 'Página no encontrada', element: <NotFoundPage /> },
];

export default routes;
