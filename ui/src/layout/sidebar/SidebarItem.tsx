import { As, Flex, Icon, Tag, Text } from '@chakra-ui/react';
import { ReactNode } from 'react';

interface SidebarItemProps {
  label?: string;
  path?: string;
  icon?: As;
  iconSize?: number;
  selected?: boolean;
  onClick?: () => void;
  children?: ReactNode;
}
const SidebarItem = ({ label, icon, iconSize = 6, selected, onClick, children }: SidebarItemProps) => {
  return (
    <Flex padding={2} color='text.300' className={`sidebar-item  ${selected ? 'selected' : ''}`} gap={2} alignItems='center' onClick={onClick}>
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
      {!!label && <Text>{label}</Text>}
      {children}
    </Flex>
  );
};

export default SidebarItem;
