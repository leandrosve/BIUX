import {
  Avatar,
  Button,
  Flex,
  Heading,
  Icon,
  IconButton,
  Menu,
  MenuButton,
  MenuGroup,
  MenuItem,
  MenuList,
  Tooltip,
  useColorMode,
  useMediaQuery,
} from '@chakra-ui/react';
import { BrandIcon, LogOutIcon, MoonIcon, SunIcon } from '../../components/common/Icons';
import { Link } from 'react-router-dom';
import { BRoutes } from '../../router/routes';
import { ChevronDownIcon, EditIcon, HamburgerIcon } from '@chakra-ui/icons';
import SessionService from '../../services/SessionService';
import { SessionContext } from '../../context/SessionProvider';
import { useContext } from 'react';
import ToggleThemeButton from '../../components/common/ToggleThemeButton';

interface Props {
  variant?: 'transparent' | 'solid';
  hasSidebar?: boolean;
  onOpenSidebar?: () => void;
}

const Navbar = ({ onOpenSidebar }: Props) => {
  const [desktop] = useMediaQuery('(min-width: 992px)', { ssr: false, fallback: true });

  const renderMenu = () => {
    if (desktop) return <NavbarDropdown />;
    return <IconButton icon={<HamburgerIcon width={30} height={30} />} aria-label='abrir/cerrar menú' variant='ghost' onClick={onOpenSidebar} />;
  };
  return (
    <Flex as='header' align='center' justify='space-between' alignSelf='stretch' paddingX={5} paddingY={2} background='bg.300'>
      <Link to={BRoutes.HOME}>
        <Flex alignItems='flex-end' gap={3}>
          <Icon as={BrandIcon} height={'40px'} width={'40px'} />
          <Heading as='span' fontWeight='light' fontSize={30} color='primary.950'>
            BIUX
          </Heading>
        </Flex>
      </Link>

      <Flex gap={3} as='nav'>
        <ToggleThemeButton />
        {renderMenu()}
      </Flex>
    </Flex>
  );
};

const NavbarDropdown = () => {
  const { session } = useContext(SessionContext);
  return (
    <Menu>
      <MenuButton
        as={Button}
        aria-label='User Options'
        variant='ghost'
        rightIcon={<ChevronDownIcon />}
        children={<Avatar name={session?.user.firstName + " " + session?.user.lastName} size='sm' bg='teal.700' color='white' />}
      />
      <MenuList minWidth={200} maxWidth={300}>
        <MenuGroup title={session?.user.firstName + " " + session?.user.lastName}>
          <Link to={BRoutes.PROFILE}>
            <MenuItem justifyContent='space-between' gap={5}>
              Editar Perfil <Icon as={EditIcon} />
            </MenuItem>
          </Link>
        </MenuGroup>
        <MenuItem justifyContent='space-between' gap={5} onClick={SessionService.destroyLocalSession}>
          Cerrar Sesión <Icon as={LogOutIcon} boxSize={5} />{' '}
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

export default Navbar;
