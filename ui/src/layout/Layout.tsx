import React, { PropsWithChildren, useContext } from 'react';
import { SessionContext } from '../context/SessionProvider';
import PrivateLayout from './PrivateLayout';
import GuestLayout from './GuestLayout';

const Layout = (props: PropsWithChildren) => {
  const { isLoggedIn } = useContext(SessionContext);
  if (isLoggedIn) return <PrivateLayout>{props.children}</PrivateLayout>;
  return <GuestLayout>{props.children}</GuestLayout>;
};

export default Layout;
