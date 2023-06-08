import { Button, Card, Flex, FormControl, FormLabel, Heading, Icon, Image, Input, Skeleton, Text, useMediaQuery } from '@chakra-ui/react';
import illustration from '../assets/illustrations/bike-cut-recollored.png';
import { BrandIcon } from '../components/common/Icons';
import { Link } from 'react-router-dom';
import { BRoutes } from '../router/routes';

const SignupPage = () => {
  const [desktop] = useMediaQuery('(min-width: 992px)', { ssr: false, fallback: true });
  return (
    <Flex grow={1} align='center' justify='space-between' direction={'column'} className='dark'>
      <Card boxShadow='lg' p='6' background='bg.300' rounded={40} display='flex' mt={10} flexDirection={'column'}>
        <Flex gap={5} align='stretch'>
          <Flex align='stretch' direction='column' minWidth={['auto', 325]} gap={1}>
            <Icon as={BrandIcon} height={'60px'} width={'60px'} marginRight={3} />
            <Heading my={1}>¡Registrate!</Heading>
            <FormControl>
              <FormLabel>Nombre</FormLabel>
              <Input type='text' boxShadow='sm' variant={'filled'} size={'sm'} placeholder='Nombre' />
            </FormControl>
            <FormControl>
              <FormLabel>Apellido</FormLabel>
              <Input type='text' boxShadow='sm' variant={'filled'} size={'sm'} placeholder='Apellido' />
            </FormControl>
            <FormControl>
              <FormLabel>Email</FormLabel>
              <Input type='email' boxShadow='sm' variant={'filled'} size={'sm'} placeholder='Email' />
            </FormControl>
            <FormControl>
              <FormLabel>Contraseña</FormLabel>
              <Input type='password' boxShadow='sm' variant={'filled'} size={'sm'} placeholder='Contraseña' />
            </FormControl>
            <FormControl>
              <FormLabel>Confirmar Contraseña</FormLabel>
              <Input type='password' boxShadow='sm' variant={'filled'} size={'sm'} placeholder='Confirmar Contraseña' />
            </FormControl>
            <Button colorScheme='primary' width='100%' mt={3}>
              Continuar
            </Button>
            <Text textAlign={'center'} mt={2}>
              ¿Ya estas registrado?{' '}
              <Link to={BRoutes.LOGIN}>
                <b>Iniciar Sesión</b>
              </Link>
            </Text>
          </Flex>
          {desktop && (
            <Flex alignItems={'center'} justifyContent={'center'}>
              <Image src={illustration} className='hue-adaptative' alt='Cyclist' w={480} fallback={<Skeleton width={500} height={562} />} />
            </Flex>
          )}
        </Flex>
      </Card>
    </Flex>
  );
};

export default SignupPage;
