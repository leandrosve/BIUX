import {
  Button,
  Card,
  Flex, Heading,
  Icon,
  Image, Skeleton,
  Text, useMediaQuery
} from '@chakra-ui/react';
import illustration from '../assets/illustrations/bike-cut-recollored.png';
import { BrandIcon } from '../components/common/Icons';
import { Link } from 'react-router-dom';
import { BRoutes } from '../router/routes';
import { useFormik } from 'formik';
import signupSchema from '../validation/signupSchema';
import TextField from '../components/common/forms/TextField';
import AuthService from '../services/api/AuthService';
import { useState } from 'react';
import BAlert from '../components/common/BAlert';

type ID = 'firstName' | 'lastName' | 'email' | 'password' | 'passwordConfirmation';
const fields: { label: string; help?: string; type?: string; id: ID }[] = [
  {
    label: 'Nombre',
    id: 'firstName',
  },
  {
    label: 'Apellido',
    id: 'lastName',
  },
  {
    label: 'Email',
    id: 'email',
  },
  {
    label: 'Contraseña',
    id: 'password',
    type: 'password',
    help: 'Debe contener al menos ocho caracteres y un número o símbolo',
  },
  {
    label: 'Confirmar Contraseña',
    type: 'password',
    id: 'passwordConfirmation',
  },
];
const SignupPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>();

  const [desktop] = useMediaQuery('(min-width: 992px)', { ssr: false, fallback: true });
  const formik = useFormik({
    initialValues: signupSchema.initialValues,
    validationSchema: signupSchema.validationSchema,
    onSubmit: async (values) => {
      setIsSubmitting(true);
      setError(null);
      const res = await AuthService.signUp(values);
      if (res.hasError) {
        setIsSubmitting(false);
        setError(res.error?.message);
      }
    },
  });
  return (
    <Flex grow={1} align='center' justify='space-between' direction={'column'} className='dark'>
      <Card boxShadow='lg' p='6' background='bg.300' rounded={40} display='flex' mt={10} flexDirection={'column'}>
        <Flex gap={5} align='stretch'>
          <form onSubmit={formik.handleSubmit}>
            <Flex align='stretch' direction='column' width={['auto', 325]} gap={1}>
              <Icon as={BrandIcon} height={'60px'} width={'60px'} marginRight={3} />
              <Heading my={1}>¡Registrate!</Heading>
              <BAlert status='error' autoFocus description={error} fontSize='sm' />
              {fields.map((f) => (
                <TextField
                  {...f}
                  boxShadow='sm'
                  variant={'filled'}
                  key={f.id}
                  size={'sm'}
                  placeholder={f.label}
                  onChange={formik.handleChange}
                  onBlurCapture={formik.handleBlur}
                  touched={formik.getFieldMeta(f.id).touched}
                  value={formik.values[f.id]}
                  error={formik.errors[f.id]}
                />
              ))}

              <Button colorScheme='primary' width='100%' mt={3} type='submit' isLoading={isSubmitting}>
                Continuar
              </Button>
              <Text textAlign={'center'} mt={2}>
                ¿Ya estas registrado?{' '}
                <Link to={BRoutes.LOGIN}>
                  <b>Iniciar Sesión</b>
                </Link>
              </Text>
            </Flex>
          </form>
          {desktop && (
            <Flex alignItems={'center'} justifyContent={'center'}>
              <Image src={illustration} className='hue-adaptative' alt='Cyclist' w={520} fallback={<Skeleton width={520} height={562} />} />
            </Flex>
          )}
        </Flex>
      </Card>
    </Flex>
  );
};

export default SignupPage;
