import { Box, Flex, Wrap, WrapItem } from '@chakra-ui/react';
import { KeyboardEvent } from 'react';

interface Props {
  onChange: (color: string) => void;
  color: string;
}

// Color Schemes from Chakra UI
const COLORS = ['biux', 'red', 'orange', 'yellow', 'green', 'teal', 'blue', 'cyan', 'pink'];
const t = ['predeterminado', 'rojo', 'naranja', 'amarillo', 'verde', 'turquesa', 'azul', 'celeste', 'rosa'];

const ColorPicker = ({ onChange, color }: Props) => {
  const getKeyDownHandler = (color: string) => {
    return (event: KeyboardEvent) => {
      // Para que sea accesible y se pueda seleccionar con Enter
      if (event.key !== 'Enter') return;
      event.preventDefault();
      onChange?.(color);
    };
  };
  return (
    <Wrap gap={3}>
      {COLORS.map((c, i) => (
        <WrapItem
          key={c}
          onKeyDown={getKeyDownHandler(c)}
          tabIndex={0}
          borderRadius='50%'
          border={`10px solid`}
          borderColor={`${c}.500`}
          background={`${c}.${c == color ? 50 : 500}`}
          width={8}
          height={8}
          title={t[i]}
          cursor='pointer'
          onClick={() => onChange(c)}
          transition={'200ms'}
          _hover={{ filter: 'brightness(1.2)' }}
        />
      ))}
    </Wrap>
  );
};

export default ColorPicker;
