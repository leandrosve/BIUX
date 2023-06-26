import {
  Card,
  Drawer,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  Flex,
  Heading,
  Icon,
  IconButton,
  List,
  ListItem,
  Text,
  useMediaQuery,
} from '@chakra-ui/react';
import './sidebar.css';
import SidebarItem from './SidebarItem';
import items from './sidebarItems';
import { BrandIcon, LogOutIcon } from '../../components/common/Icons';
import useCurrentPath from '../../hooks/useCurrentPath';
import SessionService from '../../services/SessionService';
import { useContext, useMemo } from 'react';
import { SessionContext } from '../../context/SessionProvider';
import { Link } from 'react-router-dom';
import { BRoutes } from '../../router/routes';
import { EditIcon } from '@chakra-ui/icons';
import BAvatar from '../../components/common/BAvatar';

interface Props {
  open?: boolean;
  onClose: () => void;
}

interface SidebarContentProps {
  currentPath?: string;
  onClose: () => void;
}

interface SidebarDrawerProps {
  currentPath?: string;
  open?: boolean;
  onClose: () => void;
}

const Sidebar = (props: Props) => {
  const [desktop] = useMediaQuery('(min-width: 992px)', { ssr: false, fallback: true });
  const currentPath = useCurrentPath();
  if (!desktop) return <SidebarDrawer {...props} currentPath={currentPath?.path} />;
  return (
    <Flex alignSelf='stretch' background='bg.300' minWidth={'15em'} padding={2} as='nav'>
      <SidebarContent currentPath={currentPath?.path} onClose={props.onClose} />
    </Flex>
  );
};

const SidebarContent = ({ currentPath, onClose }: SidebarContentProps) => {
  const {session} = useContext(SessionContext);
  const handleClickLink = () => {
    onClose();
  };
  const sidebarItems = useMemo(() => {
    return items.filter((item) => !item.role || item.role == session?.user.role);
  }, [items, session]);
  return (
    <List display='flex' flexDirection='column' flexGrow={1} gap={1}>
      {sidebarItems.map((item) => {
        const selected = !!(currentPath && (currentPath === item.path || currentPath.startsWith(item.path + '/')));
        return (
          <ListItem key={item.label} aria-current={selected}>
            <SidebarItem {...item} selected={selected} onLinkClick={handleClickLink} />
          </ListItem>
        );
      })}
    </List>
  );
};

const SidebarDrawer = (props: SidebarDrawerProps) => {
  const { session } = useContext(SessionContext);
  const name = session?.user.firstName + ' ' + session?.user.lastName;
  return (
    <Drawer isOpen={!!props.open} onClose={props.onClose} placement='left'>
      <DrawerOverlay />
      <DrawerContent background='bg.300' padding='10px' maxWidth='300px' overflowY='auto' maxHeight={'100vh'}>
        <DrawerCloseButton />
        <Flex alignItems='flex-end' gap={3} paddingY={5}>
          <Icon as={BrandIcon} height={'40px'} width={'40px'} />
          <Heading as='span' fontWeight='light' fontSize={30} color='primary.950'>
            BIUX
          </Heading>
        </Flex>
        <Flex direction='column' as='nav'>
          <Text fontWeight='bold' color='text.300' marginBottom={3}>
            Navegación
          </Text>
          <SidebarContent currentPath={props.currentPath} onClose={props.onClose} />

          <Text fontWeight='bold' color='text.300' marginBottom={3} marginTop={5}>
            Panel de usuario
          </Text>
          <Card padding={2} gap={0} _dark={{ background: 'bg.400' }}>
            <Flex alignItems='center' justifyContent='space-between'>
              <Flex alignItems='center' gap={3}>
                <BAvatar name={name} size='sm' />
                {name}
              </Flex>
              <Link to={BRoutes.PROFILE}>
                <IconButton as='span' variant='ghost' icon={<EditIcon />} aria-label='Editar Perfil' />
              </Link>
            </Flex>

            <SidebarItem onClick={SessionService.destroyLocalSession}>
              <Flex grow={1} justifyContent='space-between'>
                Cerrar Sesión <Icon as={LogOutIcon} boxSize={6} />
              </Flex>
            </SidebarItem>
          </Card>
        </Flex>
      </DrawerContent>
    </Drawer>
  );
};

export default Sidebar;
