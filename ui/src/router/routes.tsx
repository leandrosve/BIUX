import { createBrowserRouter } from 'react-router-dom';
import LandingPage from '../pages/landing-page/LandingPage';
import SignupPage from '../pages/SignupPage';
import LoginPage from '../pages/LoginPage';
import { lazy } from 'react';

const RoutineForm = lazy(() => import('../features/routines/RoutineForm'));
const ConfigPage = lazy(() => import('../pages/ConfigPage'));
const NotFoundPage = lazy(() => import('../pages/not-found-page/NotFoundPage'));


export enum BRoutes {
  HOME = '/',
  CONFIG = '/config',
  SIGNUP = '/registro',
  LOGIN = '/login',
  RUTINES = '/rutinas',
  DASHBOARD = '/dashboard',
  PROFILE = '/perfil',
}

const routes = [
  {
    path: '/config',
    type: 'private',
    element: <ConfigPage />,
  },
  {
    path: '/rutinas',
    type: 'private',

    element: <RoutineForm />,
  },
  {
    type: 'guest',
    path: '/',
    element: <LandingPage />,
  },
  {
    type: 'guest',
    path: '/registro',
    element: <SignupPage />,
  },
  {
    type: 'guest',
    path: '/login',
    element: <LoginPage />,
  },

  { path: '*', type: 'any', element: <NotFoundPage /> },
];

export default routes;
