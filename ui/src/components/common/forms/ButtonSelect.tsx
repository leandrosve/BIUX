import { Box, Button, ButtonGroup, ButtonProps, Flex, Icon, RadioGroup, RadioProps, useRadio, useRadioGroup } from '@chakra-ui/react';
import { ReactElement, ReactNode, cloneElement } from 'react';
import { CheckIcon } from '../Icons';

interface Props {
  value: string;
  onChange: (value: string) => void;
  children: Array<ReactElement<ButtonSelectItemProps>>;
  checkIcon?: boolean;
  name: string; // description
}

const ButtonSelect = ({ value, onChange, checkIcon, children, name }: Props) => {
  const { getRootProps, getRadioProps } = useRadioGroup({
    name: name,
    onChange: onChange,
    defaultValue: '',
    value,
  });

  const group = getRootProps()
  return (
    <ButtonGroup {...group} isAttached border='1px solid' borderRadius='lg' borderColor='chakra-border-color' display='inline-flex' maxWidth={'100%'}>
      {children.map((c, i) => {
        const radioProps = getRadioProps({ value: c.props.value});
        return cloneElement(c, { key: i, checkIcon, radioProps });
      })}
    </ButtonGroup>
  );
};

interface ButtonSelectItemProps extends ButtonProps {
  children?: ReactNode;
  checkIcon?: boolean;
  label?: string;
  radioProps?: RadioProps;
}

export const ButtonSelectItem = ({ children, label, checkIcon, radioProps, ...props }: ButtonSelectItemProps) => {
  const { getInputProps, getRadioProps } = useRadio(radioProps);

  const input = getInputProps();
  const checkbox = getRadioProps();
  return (
    <Button
      as='label'
      colorScheme={radioProps?.isChecked ? 'primary' : undefined}
      background={radioProps?.isChecked ? undefined : 'whiteAlpha.100'}
      variant={radioProps?.isChecked ? 'solid' : 'outline'}
      padding={3}
      borderWidth='0px'
      _notLast={{borderRightWidth: '1px'}}
      fontWeight='semibold'
      transition={'200ms'}
      position='relative'
      {...checkbox}
      {...props}
    >
      <input {...input} />
      <Flex gap={1} alignItems={'center'}>
        {label}
        {children}
      </Flex>
      {radioProps?.isChecked && checkIcon && (
        <Flex position='absolute' bottom={0.5} right={0.5}>
          <Icon as={CheckIcon} w={4} h={4} />
        </Flex>
      )}
    </Button>
  );
};

export default ButtonSelect;
