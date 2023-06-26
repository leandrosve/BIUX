import { ReactNode } from 'react';
import { Flex } from '@chakra-ui/react';
import Footer from './Footer';
import { Outlet } from 'react-router-dom';
import GuestNavbar from './navbar/GuestNavbar';
import { SkipNavContent, SkipNavLink } from '@chakra-ui/skip-nav';

interface Props {
  children?: ReactNode;
}

const GuestLayout = ({ children }: Props) => {
  return (
    <Flex grow={1} align='stretch' justify='stretch' direction='column'>
      <SkipNavLink id='contenido'>Ir al contenido</SkipNavLink>

      <GuestNavbar />

      <Flex id='main' as='main' alignItems='center' justifyContent='center' grow={1} padding={[0, 5]} paddingBottom={50}>
        <SkipNavContent id='contenido'/>
        {children}
        <Outlet />
      </Flex>
      <Footer />
    </Flex>
  );
};

export default GuestLayout;
