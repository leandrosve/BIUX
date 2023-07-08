import { Flex, FlexProps } from '@chakra-ui/react';
import React from 'react';

interface Props extends FlexProps {
  onSubmit: () => void;
}

const Form = (props: Props) => {
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    props.onSubmit?.();
  };
  return (
    <Flex as='form' {...props}>
      {props.children}
    </Flex>
  );
};

export default Form;
