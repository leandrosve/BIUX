import { As, Flex, Icon, Tag, Text } from '@chakra-ui/react';
import { ReactNode } from 'react';
import { Link } from 'react-router-dom';

interface SidebarItemProps {
  label?: string;
  path?: string;
  icon?: As;
  iconSize?: number;
  selected?: boolean;
  onClick?: () => void;
  onClose?: () => void;
  onLinkClick?: () => void;
  children?: ReactNode;
}
const SidebarItem = ({ label, icon, iconSize = 6, selected, onClick, onLinkClick, path, children }: SidebarItemProps) => {
  return (
    <SidebarItemLinkWrapper path={path} onClick={onLinkClick} selected={selected}>
      <Flex
        onClick={onClick}
        as={onClick ? 'button' : 'div'}
        padding={2}
        color='text.300'
        className={`sidebar-item  ${selected ? 'selected' : ''}`}
        gap={2}
        alignItems='center'
      >
        {!!icon && (
          <Tag
            className='sidebar-item-icon'
            colorScheme='primary'
            padding={2}
            borderRadius={50}
            width='40px'
            height='40px'
            display='flex'
            alignItems='center'
            justifyContent='center'
            boxShadow='md'
          >
            <Icon as={icon} fill='text.300' boxSize={iconSize} />
          </Tag>
        )}
        {!!label && <Text as='h1'>{label}</Text>}
        {children}
      </Flex>
    </SidebarItemLinkWrapper>
  );
};

interface SidebarItemLinkWrapperProps {
  path?: string;
  onClick?: () => void;
  children: ReactNode;
  selected?: boolean;
}
const SidebarItemLinkWrapper = (props: SidebarItemLinkWrapperProps) => {
  if (props.path)
    return (
      <Link to={props.path} onClick={props.onClick} aria-current={props.selected ? 'page' : false}>
        {props.children}
      </Link>
    );
  return <>{props.children}</>;
};

export default SidebarItem;
