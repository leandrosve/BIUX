import { InfoOutlineIcon } from '@chakra-ui/icons';
import {
  Collapse,
  Flex,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  FormLabelProps,
  IconButton,
  Input,
  InputGroup,
  InputProps,
  InputRightElement
} from '@chakra-ui/react';
import { useState } from 'react';
import { EyeIcon, EyeOffIcon } from '../Icons';

interface Props extends InputProps {
  label?: string;
  error?: string | boolean;
  help?: string;
  touched?: boolean;
  labelProps?: FormLabelProps;
}
const TextField = ({ error, label, help, touched, labelProps, ...props }: Props) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <FormControl isInvalid={!!error && touched}>
      <FormLabel htmlFor={props.id} {...labelProps}>
        {label}
      </FormLabel>
      <InputGroup size={props.size}>
        <Input
          {...props}
          type={showPassword ? 'text' : props.type}
          borderColor={!error && touched ? 'green.300' : undefined}
          _focusVisible={{ borderColor: !error ? 'green.300' : undefined }}
        />
        {props.type === 'password' && (
          <InputRightElement>
            <IconButton
              size='sm'
              h='1.75rem'
              marginLeft='-4px'
              borderRadius='sm'
              variant='ghost'
              onClick={() => setShowPassword((p) => !p)}
              icon={showPassword ? <EyeOffIcon /> : <EyeIcon />}
              aria-label={showPassword ? 'ocultar contraseña' : 'mostrar contraseña'}
            ></IconButton>
          </InputRightElement>
        )}
      </InputGroup>
      {help && (
        <FormHelperText fontSize='xs'>
          <InfoOutlineIcon boxSize='12px' /> {help}
        </FormHelperText>
      )}
      <Collapse in={!!error && touched}>
        <Flex minHeight={5}>
          <FormErrorMessage fontSize='sm' marginTop='3px' color='red.600' _dark={{ color: 'red.300' }}>
            {error}
          </FormErrorMessage>
        </Flex>
      </Collapse>
    </FormControl>
  );
};

export default TextField;
