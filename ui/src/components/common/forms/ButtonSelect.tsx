import { Box, BoxProps, Button, ButtonProps, Flex, Icon } from '@chakra-ui/react';
import { FocusEventHandler, KeyboardEvent, ReactElement, cloneElement } from 'react';
import { CheckIcon } from '../Icons';

interface Props {
  value: string;
  onChange: (value: string) => void;
  children: Array<ReactElement<ButtonSelectItemProps>>;
  checkIcon?: boolean;
}

interface ButtonSelectItemProps extends Omit<ButtonProps, 'onClick'> {
  value: string;
  selected?: string;
  label?: string;
  onClick?: (value: string) => void;
  first?: boolean;
  last?: boolean;
  checkIcon?: boolean;
}

const ButtonSelect = ({ value, onChange, checkIcon, children }: Props) => {
  return (
    <Flex>
      {children.map((c, i) =>
        cloneElement(c, { key: i, onClick: onChange, selected: value, checkIcon, first: i == 0, last: i + 1 == children.length })
      )}
    </Flex>
  );
};

export const ButtonSelectItem = ({ value, selected, onClick, label, first, last, children, checkIcon, ...rest }: ButtonSelectItemProps) => {
  const isSelected = selected == value;

  const handleClick = (v: string) => {
    if (isSelected) return;
    onClick?.(v);
  };

  return (
    <Button
      background={`primary.${isSelected ? 500 : 50}`}
      color={isSelected ? 'white' : 'gray.600'}
      cursor={'pointer'}
      _hover={!isSelected ? { background: 'primary.100', color: 'gray.800' } : {}}
      onClick={() => handleClick?.(value)}
      padding={3}
      fontWeight='semibold'
      textAlign={'center'}
      justifyContent={'center'}
      display='flex'
      alignItems={'center'}
      href='#'
      borderLeftRadius={first ? 10 : 0}
      borderRightRadius={last ? 10 : 0}
      borderRightWidth={last ? 0 : '1px'}
      borderColor='#a4a4a430'
      tabIndex={0}
      transition={'200ms'}
      position='relative'
      {...rest}
    >
      <Flex gap={1} alignItems={'center'}>
        {label}
        {children}
      </Flex>
      {isSelected && checkIcon && (
        <Flex position='absolute' bottom={0.5} right={0.5}>
          <Icon as={CheckIcon} w={4} h={4} />
        </Flex>
      )}
    </Button>
  );
};

export default ButtonSelect;
