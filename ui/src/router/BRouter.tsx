import React, { PropsWithChildren, ReactElement, useContext } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import routes, { BRoutes } from './routes';
import { SessionContext } from '../context/SessionProvider';
import PrivateLayout from '../layout/PrivateLayout';
import GuestLayout from '../layout/GuestLayout';

const BRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        {routes.map((route) => {
          const key = `${route.type}-${route.path}`;
          return <Route path={route.path} key={key} element={<RouteProtection type={route.type} element={route.element} />} />;
        })}
      </Routes>
    </BrowserRouter>
  );
};

function RouteProtection({ type, element }: { type: string; element: ReactElement }) {
  const sessionContext = useContext(SessionContext);

  if (type == 'private') {
    if (!sessionContext.session) return <Navigate to={BRoutes.LOGIN} replace />;
    return <PrivateLayout>{element}</PrivateLayout>;
  }

  if (type == 'guest') {
    if (sessionContext.session) return <Navigate to={BRoutes.DASHBOARD} replace />;
    return <GuestLayout>{element}</GuestLayout>;
  }

  if (sessionContext.session) return <PrivateLayout>{element}</PrivateLayout>;
  return <GuestLayout>{element}</GuestLayout>;
}

export default BRouter;
