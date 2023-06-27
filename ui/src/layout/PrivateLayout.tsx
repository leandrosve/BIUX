import { Flex, useColorMode } from '@chakra-ui/react';
import Navbar from './navbar/Navbar';
import Footer from './Footer';
import { ReactNode, useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './sidebar/Sidebar';
import { SkipNavContent, SkipNavLink } from '@chakra-ui/skip-nav';
import SettingsService from '../services/api/SettingsService';

interface Props {
  children?: ReactNode;
}
const PrivateLayout = ({ children }: Props) => {
  const [displaySidebar, setDisplaySidebar] = useState(false);
  const { setColorMode } = useColorMode();

  useEffect(() => {
    SettingsService.getInitialSettings(setColorMode);
  }, []);

  return (
    <Flex className='private-layout background-tone' grow={1} align='center' justify='space-between' direction={'column'} maxWidth='100%'>
      <SkipNavLink id='contenido' zIndex={1000}>
        Ir al contenido
      </SkipNavLink>

      <Navbar hasSidebar onOpenSidebar={() => setDisplaySidebar(true)} />

      <Flex grow={1} alignSelf='stretch'>
        <Sidebar open={displaySidebar} onClose={() => setDisplaySidebar(false)} />
        <Flex id='main' tabIndex={-1} grow={1} alignSelf='stretch' direction='column' paddingBottom={30} maxWidth='100%' alignItems='start' as='main'>
          <Flex id='breadcrumb-container' />
          <SkipNavContent id='contenido' />
          {children} <Outlet />
        </Flex>
      </Flex>
      <Footer />
    </Flex>
  );
};

export default PrivateLayout;
