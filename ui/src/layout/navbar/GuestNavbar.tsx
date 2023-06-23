import {
  Flex,
  Heading,
  Icon,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList, useMediaQuery
} from '@chakra-ui/react';
import { BrandIcon } from '../../components/common/Icons';
import { Link, useLocation } from 'react-router-dom';
import { BRoutes } from '../../router/routes';
import { HamburgerIcon } from '@chakra-ui/icons';
import { CSSProperties } from 'react';
import LinkButton from '../../components/common/LinkButton';
import ToggleThemeButton from '../../components/common/ToggleThemeButton';

interface IPropsGuestNavbarDropdown {
  pathname: string;
}
const STYLES: CSSProperties = {
  backgroundColor: 'var(--primary-400)',
};
const GuestNavbar = () => {
  const [desktop] = useMediaQuery('(min-width: 992px)', { ssr: false, fallback: true });
  let location = useLocation();

  const renderMenu = () => {
    if (desktop)
      return (
        <>
          <LinkButton to={BRoutes.LOGIN} colorScheme='primary' as='span' variant={location.pathname !== BRoutes.LOGIN ? 'ghost' : undefined}>
            Iniciar Sesión
          </LinkButton>
          <LinkButton to={BRoutes.SIGNUP} colorScheme='primary' as='span' variant={location.pathname !== BRoutes.SIGNUP ? 'ghost' : undefined}>
            Registrarme
          </LinkButton>
        </>
      );
    return <GuestNavbarDropdown pathname={location.pathname} />;
  };
  return (
    <Flex as='span' align='center' justify='space-between' alignSelf='stretch' paddingX={5} paddingY={2} background='transparent'>
      <Link to={BRoutes.HOME}>
        <Flex alignItems='flex-end' gap={3}>
          <Icon as={BrandIcon} height={'40px'} width={'40px'} />
          <Heading as='h1' fontWeight='light' fontSize={30} color='primary.950'>
            BIUX
          </Heading>
        </Flex>
      </Link>

      <Flex gap={3}>
        <ToggleThemeButton />
        {renderMenu()}
      </Flex>
    </Flex>
  );
};

const GuestNavbarDropdown = ({ pathname }: IPropsGuestNavbarDropdown) => {
  return (
    <Menu>
      <MenuButton as={IconButton} aria-label='Options' icon={<HamburgerIcon width={30} height={30} />} variant='outline' />
      <MenuList>
        <Link to={BRoutes.SIGNUP}>
          <MenuItem style={pathname === BRoutes.SIGNUP ? { ...STYLES } : undefined} mb={2}>
            Registrarme
          </MenuItem>
        </Link>
        <Link to={BRoutes.LOGIN}>
          <MenuItem style={pathname === BRoutes.LOGIN ? { ...STYLES } : undefined}>Iniciar Sesión</MenuItem>
        </Link>
      </MenuList>
    </Menu>
  );
};

export default GuestNavbar;
