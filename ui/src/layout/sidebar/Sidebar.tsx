import {
  Avatar,
  Card,
  CardBody,
  Drawer,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  Flex,
  Heading,
  Icon,
  Text,
  useMediaQuery,
} from '@chakra-ui/react';
import './sidebar.css';
import SidebarItem from './SidebarItem';
import items from './sidebarItems';
import { BrandIcon, LogOutIcon } from '../../components/common/Icons';
import useCurrentPath from '../../hooks/useCurrentPath';

interface Props {
  open?: boolean;
  onClose: () => void;
}

interface SidebarContentProps {
  currentPath?: string;
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
    <Flex alignSelf='stretch' background='bg.300' minWidth={260} padding={2}>
      <SidebarContent currentPath={currentPath?.path} />
    </Flex>
  );
};

const SidebarContent = ({ currentPath }: SidebarContentProps) => (
  <Flex direction='column' flexGrow={1} gap={1}>
    {items.map((item) => (
      <SidebarItem {...item} key={item.label} selected={!!(currentPath && currentPath === item.path)} />
    ))}
  </Flex>
);

const SidebarDrawer = (props: SidebarDrawerProps) => (
  <Drawer isOpen={!!props.open} onClose={props.onClose} placement='left'>
    <DrawerOverlay />
    <DrawerContent background='bg.300' padding='10px' maxWidth='300px'>
      <DrawerCloseButton />
      <Flex alignItems='flex-end' gap={3} paddingY={5}>
        <Icon as={BrandIcon} height={'40px'} width={'40px'} />
        <Heading as='span' fontWeight='light' fontSize={30} color='primary.950'>
          BIUX
        </Heading>
      </Flex>
      <Flex direction='column'>
        <Text fontWeight='bold' color='text.300' marginBottom={3}>
          Navegación
        </Text>
        <SidebarContent currentPath={props.currentPath} />

        <Text fontWeight='bold' color='text.300' marginBottom={3} marginTop={5}>
          Panel de usuario
        </Text>
        <Card padding={2} gap={2} _dark={{background: "bg.400"}}>
          <Flex alignItems='center' gap={3}>
            <Avatar name='Jon Doe' size='sm' bg='teal.500' />
            Jon Doe
          </Flex>
          <SidebarItem onClick={() => console.log('cerrar sesión')}>
            <Flex grow={1} justifyContent='space-between'>
              Cerrar Sesión <Icon as={LogOutIcon} boxSize={6} />
            </Flex>
          </SidebarItem>
        </Card>
      </Flex>
    </DrawerContent>
  </Drawer>
);

export default Sidebar;
