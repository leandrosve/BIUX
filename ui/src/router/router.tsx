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
}

const router = createBrowserRouter([
  {
    element: <PrivateLayout />,
    children: [
      {
        path: '/config',
        element: <ConfigPage />,
      },
      {
        path: '/rutinas',
        element: <RoutineForm />,
      },
    ],
  },
  {
    element: <GuestLayout />,
    children: [
      {
        path: '/',
        element: <LandingPage />,
      },
      {
        path: '/registro',
        element: <SignupPage />,
      },
      {
        path: '/login',
        element: <LoginPage />,
      },
    ],
  },
  {path:'*', element: <NotFoundPage/>}
]);

export default router;
