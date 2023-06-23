import React, { PropsWithChildren, useContext } from 'react';
import { SessionContext } from '../context/SessionProvider';
import PrivateLayout from './PrivateLayout';
import GuestLayout from './GuestLayout';
import usePageTitle from '../hooks/usePageTitle';

const Layout = (props: PropsWithChildren) => {
  const { isLoggedIn } = useContext(SessionContext);
  if (location.pathname == '/mantenimiento') return <>{props.children}</>;
  usePageTitle();
  if (isLoggedIn) return <PrivateLayout>{props.children}</PrivateLayout>;
  return <GuestLayout>{props.children}</GuestLayout>;
};

export default Layout;
