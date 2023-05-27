import {
  Button,
  Flex,
  Heading,
  Icon,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Tooltip,
  useColorMode,
  useMediaQuery,
} from '@chakra-ui/react';
import { BrandIcon, MoonIcon, SunIcon } from '../../components/common/Icons';
import { Link } from 'react-router-dom';
import { BRoutes } from '../../router/router';
import { HamburgerIcon } from '@chakra-ui/icons';

const GuestNavbar = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const [desktop] = useMediaQuery('(min-width: 992px)', { ssr: false, fallback: true });

  const renderMenu = () => {
    if (desktop)
      return (
        <>
          <Link to={BRoutes.LOGIN}>
            <Button colorScheme='primary' variant={'ghost'}>
              Iniciar Sesión
            </Button>
          </Link>
          <Link to={BRoutes.SIGNUP}>
            <Button colorScheme='primary'>Registrarme</Button>
          </Link>
        </>
      );
    return <GuestNavbarDropdown />;
  };
  return (
    <Flex align='center' justify='space-between' alignSelf='stretch' paddingX={5} paddingY={2} background='transparent'>
      <Link to={BRoutes.HOME}>
        <Flex alignItems='flex-end' gap={3}>
          <Icon as={BrandIcon} height={'40px'} width={'40px'} />
          <Heading as='span' fontWeight='light' fontSize={30} color='primary.950'>
            BIUX
          </Heading>
        </Flex>
      </Link>

      <Flex gap={3}>
        <Tooltip hasArrow label={`Cambiar a tema ${colorMode == 'light' ? 'oscuro' : 'claro'}`} aria-label='A tooltip'>
          <Button
            onClick={toggleColorMode}
            variant='ghost'
            colorScheme='primary'
            borderRadius='50%'
            padding='3px'
            display='flex'
            alignItems='center'
            justifyContent='center'
          >
            <Icon as={colorMode == 'light' ? SunIcon : MoonIcon} />
          </Button>
        </Tooltip>
        {renderMenu()}
      </Flex>
    </Flex>
  );
};

const GuestNavbarDropdown = () => (
  <Menu>
    <MenuButton as={IconButton} aria-label='Options' icon={<HamburgerIcon width={30} height={30} />} variant='outline' />
    <MenuList>
      <Link to={BRoutes.SIGNUP}>
        <MenuItem>Registrarme</MenuItem>
      </Link>
      <Link to={BRoutes.LOGIN}>
        <MenuItem>Iniciar Sesión</MenuItem>
      </Link>
    </MenuList>
  </Menu>
);

export default GuestNavbar;
