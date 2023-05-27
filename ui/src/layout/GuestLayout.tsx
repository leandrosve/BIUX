import { ReactNode } from 'react';
import { Flex } from '@chakra-ui/react';
import Footer from './Footer';
import { Outlet } from 'react-router-dom';
import GuestNavbar from './navbar/GuestNavbar';

interface Props {
  children?: ReactNode;
}

const GuestLayout = ({ children }: Props) => {
  return (
    <Flex grow={1} align='stretch' justify='stretch' direction='column'>
      <GuestNavbar />

      <Flex alignItems='center' justifyContent='center' grow={1} padding={5} paddingBottom={50}>
        {children}
        <Outlet/>
      </Flex>
      <Footer />
    </Flex>
  );
};

export default GuestLayout;
