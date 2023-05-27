import { Button, Card, Flex, FormControl, FormLabel, Heading, Icon, Image, Input, Stack, Text, Tooltip, useMediaQuery } from '@chakra-ui/react';
import { BrandIcon } from '../components/common/Icons';
import { Link } from 'react-router-dom';
import { BRoutes } from '../router/router';
import { useMemo, useState } from 'react';

const LoginPage = () => {
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();

  const enableSubmit = useMemo(() => !!(email && password), [email, password]);

  return (
    <Flex grow={1} align='center' justify='space-between' direction={'column'} className='dark'>
      <Card boxShadow='lg' p='6' background='bg.300' rounded={40} display='flex' mt={10} flexDirection={'column'}>
        <Flex>
          <Stack align='stretch'>
            <Icon margin='auto' as={BrandIcon} height={'40px'} width={'40px'}/>
            <Heading mt={20} textAlign='center'>Iniciar Sesión</Heading>
            <FormControl>
              <FormLabel mt={2}>Email</FormLabel>
              <Input type='email' boxShadow='sm' variant={'filled'} size={'sm'} placeholder='Email' onChange={(e) => setEmail(e.target.value)} />
              <FormLabel mt={2}>Contraseña</FormLabel>
              <Input
                type='password'
                boxShadow='sm'
                variant={'filled'}
                size={'sm'}
                placeholder='Contraseña'
                onChange={(e) => setPassword(e.target.value)}
              />

              <Tooltip label='Por favor completa los campos necesarios' isDisabled={enableSubmit} hasArrow aria-label='A tooltip'>
                <Button colorScheme='primary' width='100%' mt={5} isDisabled={!enableSubmit}>
                  Continuar
                </Button>
              </Tooltip>

              <Text textAlign={'center'} mt={2}>
                ¿No estas registrado?{' '}
                <Link to={BRoutes.SIGNUP}>
                  <b>Registrarme</b>
                </Link>
              </Text>
            </FormControl>
          </Stack>
        </Flex>
      </Card>
    </Flex>
  );
};

export default LoginPage;
