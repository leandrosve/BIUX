import { Box, HStack, RadioGroup, RadioProps, VisuallyHidden, useRadio, useRadioGroup } from '@chakra-ui/react';

interface Props {
  onChange: (color: string) => void;
  value: string;
}

// Color Schemes from Chakra UI
const COLORS = ['biux', 'red', 'orange', 'yellow', 'green', 'teal', 'blue', 'cyan', 'pink'];

const t: {[key: string]: string } = ({
  biux: 'predeterminado',
  red: 'rojo',
  orange: 'naranja',
  yellow: 'amarillo',
  green: 'verde',
  teal: 'turquesa',
  blue: 'azul',
  cyan: 'celeste',
  pink: 'rosa',
});;

const ColorPicker = ({ onChange, value }: Props) => {
  const { getRootProps, getRadioProps } = useRadioGroup({
    name: 'Esquema de colores',
    onChange: onChange,
    defaultValue: 'biux',
    value,
  });

  const group = getRootProps();
  return (
    <RadioGroup>
        {COLORS.map((c) => {
          const radio = getRadioProps({ value: c });
          return <ColorRadioOption key={c} {...radio} />;
        })}
    </RadioGroup>
  );
};

const ColorRadioOption = (props: RadioProps) => {
  const { getInputProps, getRadioProps } = useRadio(props);

  const input = getInputProps();
  const checkbox = getRadioProps();

  return (
    <Box as='label' display='inline-flex' margin={1}>
      <input {...input} />
      <Box
        {...checkbox}
        borderRadius='50%'
        border={`10px solid`}
        borderColor={`${props.value}.500`}
        background={`${props.value}.500`}
        _hover={{ filter: 'brightness(1.2)' }}
        _checked={{ bg: 'white' }}
        _focus={{
          boxShadow: 'outline',
        }}
        width={8}
        height={8}
        cursor='pointer'
        transition={'100ms'}
      />
      <VisuallyHidden>{t[props.value || '']}</VisuallyHidden>
    </Box>
  );
};

export default ColorPicker;
