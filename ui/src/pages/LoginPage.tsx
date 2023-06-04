import {
  Button,
  Card,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Icon, Input,
  Stack,
  Text,
  Tooltip
} from '@chakra-ui/react';
import { BrandIcon } from '../components/common/Icons';
import { Link, useNavigate } from 'react-router-dom';
import { BRoutes } from '../router/router';
import { useMemo, useState } from 'react';
import AuthService from '../services/api/AuthService';
import BAlert from '../components/common/BAlert';

const LoginPage = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const [submiting, setSubmiting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();
  const enableSubmit = useMemo(() => !!(email && password), [email, password]);

  const onSubmit = async (e: React.FormEvent) => {
    setError(null);
    e.preventDefault();
    setSubmiting(true);
    const res = await AuthService.login({ email, password });
    setSubmiting(false);
    switch (res.status) {
      case 401:
        setError('El email y la contraseña no coinciden');
        break;
      case 200:
        navigate('/config')
        break;
      default:
        break;
    }
  };

  return (
    <Flex grow={1} align='center' justify='space-between' direction={'column'} className='dark'>
      <Card boxShadow='lg' p='6' background='bg.300' rounded={40} display='flex' mt={10} flexDirection={'column'}>
        <Flex>
          <form onSubmit={onSubmit}>
            <Stack align='stretch' width={'350px'}>
              <Icon margin='auto' as={BrandIcon} height={'40px'} width={'40px'} />

              <Heading mt={20} textAlign='center'>
                Iniciar Sesión
              </Heading>
              <BAlert status='error' autoFocus description={error} />
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
