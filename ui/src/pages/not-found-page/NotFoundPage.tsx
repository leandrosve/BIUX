import { Button, Flex, Heading, Image, Text, Wrap, WrapItem } from '@chakra-ui/react';
import illustration from '../../assets/illustrations/missing-page.png';
import React from 'react';
import GuestLayout from '../../layout/GuestLayout';
import { Link } from 'react-router-dom';
import { ArrowBackIcon } from '@chakra-ui/icons';
import { BRoutes } from '../../router/router';

const NotFoundPage = () => {
  return (
    <GuestLayout>
      <Flex grow={1} alignSelf='stretch' alignItems='center' justifyContent='center'>
        <Flex direction='column' alignItems='center' justifyContent='center'>
          <Heading>Página no encontrada</Heading>
          <Text>Lo sentimos, parece que no hemos podido encontrar la pagina solicitada...</Text>
          <Wrap alignItems='center' justifyContent='center' mt={5} gap={3}>
            <WrapItem>
            <Link to='/'>
              <Button leftIcon={<ArrowBackIcon />} colorScheme='primary'>
                Volver al inicio
              </Button>
            </Link></WrapItem>
            <WrapItem>
            <Link to={BRoutes.LOGIN}>
              <Button colorScheme='primary' variant='outline'>Iniciar Sesión</Button>
            </Link></WrapItem> <WrapItem>
            <Link to={BRoutes.SIGNUP}>
              <Button colorScheme='primary' variant='outline'>Registrarme</Button>
            </Link></WrapItem>
          </Wrap>
          <Flex alignItems={'center'} justifyContent={'center'} className='landing-page-illustration'>
            <Image src={illustration} alt='Cyclist' transform='scaleX(-1)' className='hue-adaptative'/>
          </Flex>
        </Flex>
      </Flex>
    </GuestLayout>
  );
};

export default NotFoundPage;
