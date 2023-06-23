import { Button, Card, Flex, FormControl, FormLabel, Heading, Icon, Input, Stack, Text, Tooltip } from '@chakra-ui/react';
import { BrandIcon } from '../components/common/Icons';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { BRoutes } from '../router/routes';
import { useMemo, useState, useEffect } from 'react';
import AuthService from '../services/api/AuthService';
import BAlert from '../components/common/BAlert';
import SessionService from '../services/SessionService';

const LoginPage = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const [submiting, setSubmiting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);


  const enableSubmit = useMemo(() => !!(email && password), [email, password]);

  const [searchParams, setSearchParams] = useSearchParams();

  const onSubmit = async (e: React.FormEvent) => {
    setError(null);
    setSuccess(null);
    e.preventDefault();
    setSubmiting(true);
    const res = await AuthService.login({ email, password });
    if (res.hasError) {
      setSubmiting(false);
      setError('El email y la contraseña no coinciden');
      return;
    }
    SessionService.saveLocalSession(res.data);
    location.replace('/');
  };

  useEffect(() => {
    if (searchParams.get('tokenExpired')) {
      setError('La sesión ha expirado, por favor vuelve a iniciar sesión.');   
    }
    if (searchParams.get('logout')) {
      setSuccess('Se ha cerrado la sesión correctamente. Hasta pronto!');   
    }
    setSearchParams('', { replace: true });
  }, []);

  return (
    <Flex grow={1} align='center' justify='space-between' direction={'column'} className='dark'>
      <Card boxShadow='lg' p='6' background='bg.300' rounded={40} display='flex' mt={10} flexDirection={'column'}>
        <Flex>
          <form onSubmit={onSubmit}>
            <Stack align='stretch' width={['auto', 350]}>
              <Icon margin='auto' as={BrandIcon} height={'40px'} width={'40px'} />

              <Heading mt={5} textAlign='center'>
                Iniciar Sesión
              </Heading>
              <BAlert status='error' autoFocus description={error} />
              <BAlert status='info' autoFocus description={success} />
              <FormControl>
                <FormLabel mt={2}>Email</FormLabel>
                <Input type='email' boxShadow='sm' variant={'filled'} size={'sm'} placeholder='Email' onChange={(e) => setEmail(e.target.value)} />
              </FormControl>
              <FormControl>
                <FormLabel mt={2}>Contraseña</FormLabel>
                <Input
                  type='password'
                  boxShadow='sm'
                  variant={'filled'}
                  size={'sm'}
                  placeholder='Contraseña'
                  onChange={(e) => setPassword(e.target.value)}
                />
              </FormControl>

              <Tooltip label='Por favor completa los campos necesarios' isDisabled={enableSubmit} hasArrow aria-label='A tooltip'>
                <Button colorScheme='primary' width='100%' mt={5} type='submit' isDisabled={!enableSubmit} isLoading={submiting}>
                  Continuar
                </Button>
              </Tooltip>

              <Text textAlign={'center'} mt={2}>
                ¿No estas registrado?{' '}
                <Link to={BRoutes.SIGNUP}>
                  <b>Registrarme</b>
                </Link>
              </Text>
            </Stack>
          </form>
        </Flex>
      </Card>
    </Flex>
  );
};

export default LoginPage;
