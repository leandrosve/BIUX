import { createBrowserRouter } from 'react-router-dom';
import LandingPage from '../pages/landing-page/LandingPage';
import ConfigPage from '../pages/ConfigPage';
import SignupPage from '../pages/SignupPage';
import LoginPage from '../pages/LoginPage';

import PrivateLayout from '../layout/PrivateLayout';
import GuestLayout from '../layout/GuestLayout';
import NotFoundPage from '../pages/not-found-page/NotFoundPage';
import RoutineForm from '../features/routines/RoutineForm';

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
