import { menuAnatomy } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers, defineStyle } from '@chakra-ui/react';

const { defineMultiStyleConfig } = createMultiStyleConfigHelpers(menuAnatomy.keys);

// define custom variants
const variants = {
  primary: {
    list: defineStyle({
      _dark: {
        bg: 'bg.400',
      },
    }),
    item: defineStyle({
      _dark: {
        bg: 'bg.400',
        _hover: {
          bg: 'bg.500',
        },
        _focus: {
          bg: 'bg.500',
        },
      },
    }),
  },
};

// export the custom variants in the component theme
export default defineMultiStyleConfig({
  variants,
  defaultProps: {
    variant: 'primary',
  },
});
