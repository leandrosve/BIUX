import { Badge, Button, Flex, Heading, Image, Skeleton, Text, useMediaQuery, useToast } from '@chakra-ui/react';
import illustration from '../../assets/illustrations/bike-cut-recollored.png';
import { Link, useNavigate } from 'react-router-dom';
import { BRoutes } from '../../router/routes';
import { useFormik } from 'formik';
import signupSchema from '../../validation/signupSchema';
import TextField from '../../components/common/forms/TextField';
import AuthService from '../../services/api/AuthService';
import { useState } from 'react';
import BAlert from '../../components/common/BAlert';
import AlertToast from '../../components/common/alert-toast/AlertToast';
import Role from '../../model/user/Role';

type ID = 'firstName' | 'lastName' | 'email' | 'password' | 'passwordConfirmation';
const fields: { label: string; help?: string; type?: string; id: ID, isPassword?: boolean }[] = [
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

interface Props {
  role?: Role;
  accessCode?: string;
  instructorId?: number;
  instructorName?: string;
}

const RegistrationStep = ({ accessCode, instructorId, instructorName, role = Role.STUDENT }: Props) => {
  const toast = useToast();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>();
  const navigate = useNavigate();

  const [desktop] = useMediaQuery('(min-width: 768px)', { ssr: false, fallback: true });

  const formik = useFormik({
    initialValues: signupSchema.initialValues,
    validationSchema: signupSchema.validationSchema,
    onSubmit: async (values) => {
      setIsSubmitting(true);
      setError(null);
      const body = {
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        password: values.password,
        role,
        code:accessCode
      };
      const res = await AuthService.signUp(body);
      if (res.status == 201) {
        navigate('/login');
        showUndoToast();
      }
      if (res.hasError) {
        setError(res.errorMessage);
      }
      setIsSubmitting(false);
    },
  });

  const showUndoToast = () => {
    toast({
      position: 'top-right',
      duration: 8000,
      render: (t) => (
        <AlertToast colorScheme='primary' status='success' hasProgress duration={8000} hasIcon isClosable onClose={() => toast.close(t.id || '')}>
          {'Se ha registrado el usuario exitosamente'}
        </AlertToast>
      ),
    });
  };

  return (
    <Flex gap={5} align='stretch'>
      <Flex as='form' align='stretch' direction='column' gap={1} onSubmit={(e) => formik.handleSubmit(e as any)}
        width={{base: '100%', md:'400px', lg: '350px'}}
      >
        <Badge variant='subtle' colorScheme={role == Role.STUDENT ? 'teal' : 'orange'} alignSelf='baseline' marginY={-2} borderRadius='md'>
          {role == Role.INSTRUCTOR ? 'Instructor' : 'Alumno' + (instructorName ? ` de ${instructorName}` : '')}
        </Badge>
        <Heading my={1}>¡Registrate! </Heading>
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
          Registrarme
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
          <Image src={illustration} className='hue-adaptative' alt='Cyclist' w={520} fallback={<Skeleton width={520} height={562} />} />
        </Flex>
      )}
    </Flex>
  );
};

export default RegistrationStep;
