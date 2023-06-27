import { Button, Card, FormControl, FormLabel, Heading, Icon, Select, Stack, Text, useColorMode, useToast } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import AccesibilityService, { AccesibilitySettings } from '../services/AccesibilityService';
import ButtonSelect, { ButtonSelectItem } from '../components/common/forms/ButtonSelect';
import ColorPicker from '../components/common/forms/ColorPicker';
import { MoonIcon, SunIcon, UndoIcon } from '../components/common/Icons';
import AlertToast from '../components/common/alert-toast/AlertToast';
import ResponsiveCard from '../components/common/ResponsiveCard';
import AutoBreadcrumbs from '../layout/AutoBreadcrumbs';
import SettingsService from '../services/api/SettingsService';

const ConfigPage = () => {
  const [fontFamily, setFontFamily] = useState<string>(AccesibilityService.getLocalSettings().fontFamily);
  const [fontSize, setFontSize] = useState<string>(AccesibilityService.getLocalSettings().fontSize);
  const [color, setColor] = useState<string>(AccesibilityService.getLocalSettings().color);
  const [previousSettings, setPreviousSettings] = useState<AccesibilitySettings>(AccesibilityService.getLocalSettings());
  const { colorMode, setColorMode } = useColorMode();
  const [loading, setLoading] = useState<boolean>(false);
  const toast = useToast();

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    toast.closeAll();
    const newSettings = { fontFamily, fontSize, color, colorMode };
    await SettingsService.updateSettings(newSettings);
    AccesibilityService.saveAndUpdate(newSettings, setColorMode);
    setLoading(false);
    setPreviousSettings(newSettings);
    showUndoToast();
  };

  const undoChanges = async () => {
    await SettingsService.updateSettings(previousSettings);
    AccesibilityService.saveAndUpdate(previousSettings, setColorMode);
    setStates(previousSettings);
    toast.closeAll();
  };

  const setStates = (settings: AccesibilitySettings) => {
    setFontFamily(settings.fontFamily);
    setFontSize(settings.fontSize);
    setColor(settings.color);
    setColorMode(settings.colorMode);
  };

  const restoreDefaults = async () => {
    setStates(AccesibilityService.DEFAULT_SETTINGS);
    AccesibilityService.restoreDefaults();
    await SettingsService.updateSettings(AccesibilityService.DEFAULT_SETTINGS);
    toast.closeAll();
    showUndoToast(true);
  };

  const showUndoToast = (restoredDefaults?: boolean) => {
    toast({
      position: 'bottom-right',
      duration: 5000,
      render: (t) => (
        <AlertToast colorScheme='primary' status='success' hasProgress duration={5000} hasIcon isClosable onClose={() => toast.close(t.id || '')}>
          {restoredDefaults ? 'Se restablecieron los ajustes por defecto' : 'Se han guardado los cambios!'}
          <Button onClick={undoChanges} ml={5} colorScheme='primary' variant='ghost' gap={1}>
            <Icon as={UndoIcon} />
            Deshacer
          </Button>
        </AlertToast>
      ),
    });
  };

  useEffect(() => {
    AccesibilityService.initialize();
  }, []);

  return (
    <>
      <AutoBreadcrumbs />
      <ResponsiveCard defaultWidth={500}>
        <form onSubmit={handleSave}>
          <Stack align='stretch' gap={3}>
            <Heading mt={2}>Configuración</Heading>
            <Card
              fontFamily={fontFamily}
              fontSize={fontSize}
              paddingX={5}
              paddingY={2}
              background={`${color}.500`}
              color='white'
              border='5px solid'
              borderColor={`${color}.300`}
              textAlign={'center'}
              alignItems='center'
              justify='center'
              minHeight={110}
            >
              <Text fontSize={'1em'}>Asi es como se veran los textos en la aplicación!</Text>
              <Heading fontSize={'1.875em'} fontFamily={fontFamily}>
                Títulos y encabezados
              </Heading>
              <Text fontSize={'0.875em'}>Algunos otros detalles son un poco mas pequeños...</Text>
            </Card>

            <FormControl>
              <FormLabel fontWeight={'semibold'}>Tipo de fuente</FormLabel>
              <Select value={fontFamily} onChange={(e) => setFontFamily(e.target.value)} autoComplete='on'>
                <option label='Nunito (Predeterminado)' value='Nunito' />
                <option label='Arial' value='Arial' />
                <option label='Raleway' value='Raleway' />
                <option label='Sans Serif' value='sans-serif' />
                <option label='Verdana' value='Verdana' />
                <option label='Montserrat' value='Montserrat' />
                <option label='Poppins' value='Poppins' />
              </Select>
            </FormControl>

            <FormControl>
              <FormLabel fontWeight={'semibold'} as='span'>
                Tamaño de fuente
              </FormLabel>
              <ButtonSelect value={fontSize} onChange={(value) => setFontSize(value)} checkIcon>
                <ButtonSelectItem value='14px' label='Pequeño' fontSize={14} width={150} />
                <ButtonSelectItem value='18px' label='Mediano' fontSize={18} width={150} />
                <ButtonSelectItem value='24px' label='Grande' fontSize={24} width={150} />
              </ButtonSelect>
            </FormControl>

            <FormControl>
              <FormLabel fontWeight={'semibold'} as='legend'>
                Color principal
              </FormLabel>
              <ColorPicker onChange={(c) => setColor(c)} value={color} />
            </FormControl>

            <FormControl>
              <FormLabel fontWeight={'semibold'} as='span'>
                Tema
              </FormLabel>
              <ButtonSelect value={colorMode} onChange={(v) => setColorMode(v)} checkIcon>
                <ButtonSelectItem value='light' width={150}>
                  <Icon as={SunIcon} w={6} h={6} /> Claro
                </ButtonSelectItem>
                <ButtonSelectItem value='dark' width={150}>
                  <Icon as={MoonIcon} w={5} h={5} /> Oscuro
                </ButtonSelectItem>
              </ButtonSelect>
            </FormControl>

            <Stack>
              <Button colorScheme='primary' width='100%' mt={5} type='submit' isLoading={loading}>
                Guardar
              </Button>
              <Button colorScheme='primary' variant='ghost' width='100%' onClick={restoreDefaults}>
                Restablecer Ajustes
              </Button>
            </Stack>
          </Stack>
        </form>
      </ResponsiveCard>
    </>
  );
};

export default ConfigPage;
