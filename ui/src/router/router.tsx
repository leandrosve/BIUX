import { createBrowserRouter } from 'react-router-dom';
import LandingPage from '../pages/landing-page/LandingPage';
import ConfigPage from '../pages/ConfigPage';
import SignupPage from '../pages/SignupPage';
import LoginPage from '../pages/LoginPage';

import PrivateLayout from '../layout/PrivateLayout';
import GuestLayout from '../layout/GuestLayout';
import NotFoundPage from '../pages/not-found-page/NotFoundPage';

export enum BRoutes {
  HOME = '/',
  CONFIG = '/config',
  SIGNUP = '/registro',
  LOGIN = '/login',
}

const router = createBrowserRouter([
  {
    element: <PrivateLayout />,
    children: [
      {
        path: '/config',
        element: <ConfigPage />,
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
