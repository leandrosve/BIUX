import { Avatar, AvatarProps } from '@chakra-ui/react';
import React, { useMemo } from 'react';

const COLORS = ['purple', 'red', 'orange', 'yellow', 'green', 'teal', 'blue', 'cyan', 'pink'];

const BAvatar = (props: AvatarProps) => {
  const color = useMemo(() => {
    let hash = 0;
    if (!props.name) return 'teal';
    for (var i = 0; i < props.name.length; i++) {
      hash = props.name.charCodeAt(i) + hash;
    }
    const position = hash % 9;
    return COLORS[position] + '.700';
  }, []);
  return (
    <Avatar fontWeight='bold' color='white' bg={color} {...props}>
      {props.children}
    </Avatar>
  );
};

export default BAvatar;
