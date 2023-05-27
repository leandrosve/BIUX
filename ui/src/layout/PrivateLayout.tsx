import { Flex } from '@chakra-ui/react';
import Navbar from './navbar/Navbar';
import Footer from './Footer';
import { ReactNode, useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './sidebar/Sidebar';

interface Props {
  children?: ReactNode;
}
const PrivateLayout = ({ children }: Props) => {
  const [displaySidebar, setDisplaySidebar] = useState(false);
  return (
    <Flex grow={1} align='center' justify='space-between' direction={'column'}>
      <Navbar hasSidebar onOpenSidebar={() => setDisplaySidebar(true)}/>

      <Flex grow={1} alignSelf='stretch'>
        <Sidebar open={displaySidebar} onClose={() => setDisplaySidebar(false)}/>
        <Flex grow={1} alignSelf='stretch' paddingBottom={30} justifyContent={{base: 'center', md: 'start'}}>
          {children} <Outlet />
        </Flex>
      </Flex>
      <Footer />
    </Flex>
  );
};

export default PrivateLayout;
