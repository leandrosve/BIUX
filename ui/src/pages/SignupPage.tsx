import { Box, Button, Card, Flex, FormControl, FormLabel, Heading, Icon, Image, Input, Skeleton, Stack, Text, useMediaQuery } from '@chakra-ui/react';
import illustration from '../assets/illustrations/bike-cut-recollored.png';
import { BrandIcon } from '../components/common/Icons';
import { Link } from 'react-router-dom';
import { BRoutes } from '../router/router';

const SignupPage = () => {
  const [desktop] = useMediaQuery('(min-width: 992px)', { ssr: false, fallback: true});
  return (
    <Flex grow={1} align='center' justify='space-between' direction={'column'} className='dark'>
      <Card boxShadow='lg' p='6' background='bg.300' rounded={40} display='flex' mt={10} flexDirection={'column'}>
        <Flex gap={5}>
          <Stack align='stretch'>
            <Icon as={BrandIcon} height={'60px'} width={'60px'} marginRight={3} />
            <Heading mt={20}>¡Registrate!</Heading>
            <FormControl>
              <FormLabel>Nombre</FormLabel>
              <Input type='text' boxShadow='sm' variant={'filled'} size={'sm'} placeholder='Nombre' />
              <FormLabel mt={2}>Apellido</FormLabel>
              <Input type='text' boxShadow='sm' variant={'filled'} size={'sm'} placeholder='Apellido' />
              <FormLabel mt={2}>Email</FormLabel>
              <Input type='email' boxShadow='sm' variant={'filled'} size={'sm'} placeholder='Email' />
              <FormLabel mt={2}>Contraseña</FormLabel>
              <Input type='password' boxShadow='sm' variant={'filled'} size={'sm'} placeholder='Contraseña' />
              <FormLabel mt={2}>Confirmar Contraseña</FormLabel>
              <Input type='password' boxShadow='sm' variant={'filled'} size={'sm'} placeholder='Confirmar Contraseña' />
              <Button colorScheme='primary' width='100%' mt={5}>
                Continuar
              </Button>
              <Text textAlign={'center'} mt={2}>
                ¿Ya estas registrado? <Link to={BRoutes.LOGIN}><b>Iniciar Sesión</b></Link>
              </Text>
            </FormControl>
          </Stack>
          {desktop && (
            <Flex alignItems={'center'} justifyContent={'center'}>
              <Image src={illustration} className='hue-adaptative' alt='Cyclist' w={480} fallback={<Skeleton width={500} height={562}/>}/>
            </Flex>
          )}
        </Flex>
      </Card>
    </Flex>
  );
};

export default SignupPage;
