import { cssVar, defineStyle, defineStyleConfig } from '@chakra-ui/react';

const skeletonVariant = {
  opacity: 0.2,
  [cssVar('skeleton-start-color').variable]: 'colors.primary.200', //changing startColor to red.800
  [cssVar('skeleton-end-color').variable]: 'colors.primary.300',
};

export const skeletonTheme = defineStyleConfig({
  defaultProps: {
    variant: 'primary',
  },
  variants: {
    primary: defineStyle({
      _light: skeletonVariant,
      _dark: skeletonVariant,
    }),
  },
});
