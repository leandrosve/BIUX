import { InfoOutlineIcon } from '@chakra-ui/icons';
import { Collapse, Flex, FormControl, FormErrorMessage, FormHelperText, FormLabel, FormLabelProps, Input, InputProps } from '@chakra-ui/react';

interface Props extends InputProps {
  label?: string;
  error?: string | boolean;
  help?: string;
  touched?: boolean;
  labelProps?: FormLabelProps;
}
const TextField = ({ error, label, help, touched, labelProps, ...props }: Props) => {
  return (
    <FormControl isInvalid={!!error && touched}>
      <FormLabel htmlFor={props.id} {...labelProps}>{label}</FormLabel>
      <Input {...props} borderColor={!error && touched ? 'green.300' : undefined} />
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
