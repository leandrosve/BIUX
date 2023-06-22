import { Icon, IconButton, Tooltip, useColorMode } from '@chakra-ui/react';
import { MoonIcon, SunIcon } from './Icons';

const ToggleThemeButton = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Tooltip hasArrow label={`Cambiar a tema ${colorMode == 'light' ? 'oscuro' : 'claro'}`} aria-label='A tooltip'>
      <IconButton
        onClick={toggleColorMode}
        variant='ghost'
        colorScheme='primary'
        borderRadius='50%'
        padding='3px'
        display='flex'
        alignItems='center'
        justifyContent='center'
        aria-label='toggle color mode'
        icon={<Icon as={colorMode == 'light' ? SunIcon : MoonIcon} />}
      />
    </Tooltip>
  );
};

export default ToggleThemeButton;
