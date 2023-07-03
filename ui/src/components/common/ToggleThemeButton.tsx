import { Icon, IconButton, Tooltip, useColorMode } from '@chakra-ui/react';
import { MoonIcon, SunIcon } from './Icons';
import { SessionContext } from '../../context/SessionProvider';
import { useCallback, useContext } from 'react';
import SettingsService from '../../services/api/SettingsService';
const ToggleThemeButton = () => {
  const { colorMode, setColorMode } = useColorMode();
  const { session } = useContext(SessionContext);

  const handleToggle = useCallback(() => {
    const next = colorMode == 'light' ? 'dark' : 'light'
    SettingsService.updateSettings({colorMode: next})
    setColorMode(next);
  }, [session, colorMode, setColorMode])

  return (
    <Tooltip hasArrow label={`Cambiar a tema ${colorMode == 'light' ? 'oscuro' : 'claro'}`} aria-label='A tooltip'>
      <IconButton
        onClick={handleToggle}
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
