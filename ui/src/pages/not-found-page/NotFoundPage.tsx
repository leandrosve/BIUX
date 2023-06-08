import { Button, Flex, Heading, Icon, Image, Text, Wrap, WrapItem } from '@chakra-ui/react';
import illustration from '../../assets/illustrations/missing-page.png';
import React, { useContext, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ArrowBackIcon, SettingsIcon } from '@chakra-ui/icons';
import { BRoutes } from '../../router/routes';
import { SessionContext } from '../../context/SessionProvider';
import SessionService from '../../services/SessionService';
import { LogOutIcon } from '../../components/common/Icons';

const NotFoundPage = () => {
  const { session } = useContext(SessionContext);
  return (
    <Flex grow={1} alignSelf='stretch' alignItems='center' justifyContent='center'>
      <Flex direction='column' alignItems='center' justifyContent='center' p={2}>
        <Heading textAlign='center'>Página no encontrada</Heading>
        <Text align='center'>Lo sentimos, parece que no hemos podido encontrar la pagina solicitada...</Text>
        <Wrap justify='center' mt={5} spacing={3}>
          <WrapItem>
            <Link to='/'>
              <Button leftIcon={<ArrowBackIcon />} colorScheme='primary'>
                Volver al inicio
              </Button>
            </Link>
          </WrapItem>
          {!session ? (
            <>
              <WrapItem>
                <Link to={BRoutes.LOGIN}>
                  <Button colorScheme='primary' variant='outline'>
                    Iniciar Sesión
                  </Button>
                </Link>
              </WrapItem>{' '}
              <WrapItem>
                <Link to={BRoutes.SIGNUP}>
                  <Button colorScheme='primary' variant='outline'>
                    Registrarme
                  </Button>
                </Link>
              </WrapItem>
            </>
          ) : (
            <>
              <WrapItem>
                <Link to={BRoutes.CONFIG}>
                  <Button colorScheme='primary' variant='outline' leftIcon={<SettingsIcon />}>
                    Configuración
                  </Button>
                </Link>
              </WrapItem>
              <WrapItem>
                <Button
                  colorScheme='primary'
                  variant='outline'
                  leftIcon={<Icon as={LogOutIcon} boxSize={5} />}
                  onClick={SessionService.destroyLocalSession}
                >
                  Cerrar Sesión
                </Button>
              </WrapItem>
            </>
          )}
        </Wrap>
        <Flex alignItems={'center'} justifyContent={'center'} className='landing-page-illustration'>
          <Image src={illustration} alt='Cyclist' transform='scaleX(-1)' className='hue-adaptative' />
        </Flex>
      </Flex>
    </Flex>
  );
};

export default NotFoundPage;
