import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Heading,
  Input,
  Step,
  StepDescription,
  StepIcon,
  StepIndicator,
  StepNumber,
  StepSeparator,
  StepStatus,
  Stepper,
  Text,
  Textarea,
  Tooltip,
  useSteps,
} from '@chakra-ui/react';
import RoutineFormSegmentsStep from './RoutineFormSegmentsStep';
import { useState, useMemo } from 'react';
import Routine, { RoutineSegment } from '../../model/routines/Routine';
import ResponsiveCard from '../../components/common/ResponsiveCard';
import LinkButton from '../../components/common/LinkButton';
import { ArrowBackIcon } from '@chakra-ui/icons';
import StudentSearch from '../students/StudentSearch';
import useSimpleList from '../../hooks/useSimpleList';
import { BRoutes } from '../../router/routes';
import SimpleBreadcrumbs from '../../components/common/SimpleBreadcrumbs';
import { ReducedStudent } from '../../model/student/Student';

const breadcrumb = [
  { to: BRoutes.ROUTINES, title: 'Rutinas' },
  { to: '#contenido', title: 'Nueva rutina' },
];

const RoutineForm = () => {
  const { activeStep, goToNext, goToPrevious } = useSteps({
    index: 0,
    count: steps.length,
  });

  const [routine, setRoutine] = useState<Routine>({ name: '', description: '', segments: [], students: []});

  const handleSubmitDetails = (name: string, description: string, students: ReducedStudent[]) => {
    setRoutine((prev) => ({ ...prev, name, description, students }));
    goToNext();
  };

  const handlePrevious = (segments: RoutineSegment[]) => {
    setRoutine((prev) => ({ ...prev, segments }));
    goToPrevious();
  };

  return (
    <>
      <ResponsiveCard defaultWidth={800} defaultHeight={650}>
        <SimpleBreadcrumbs items={breadcrumb} />
        <Flex justifyContent='space-between' alignItems={{ base: 'stretch', xl: 'center' }} direction={{ base: 'column-reverse', xl: 'row' }}>
          <RutineStepper index={activeStep} />
          {activeStep === 0 && (
            <LinkButton to='/rutinas' alignSelf='end' type='submit' leftIcon={<ArrowBackIcon />} size={['sm', 'md']} mt={{ sm: 2, xl: 0 }} mb={2}>
              Volver al listado
            </LinkButton>
          )}
        </Flex>
        <Heading as='h1'>
          Nueva Rutina
        </Heading>
        <Flex direction='column' position='relative' grow={1}>
          {activeStep === 0 && <Step1 initialData={routine} onSubmit={handleSubmitDetails} />}
          {activeStep === 1 && <RoutineFormSegmentsStep routine={routine} onPrevious={handlePrevious} />}
        </Flex>
      </ResponsiveCard>
    </>
  );
};
const Step1 = (props: { initialData: Routine; onSubmit: (name: string, description: string, students:ReducedStudent[]) => void }) => {
  const [name, setName] = useState(props.initialData.name);
  const [description, setDescription] = useState(props.initialData.description ?? '');
  const students = useSimpleList<ReducedStudent>(props.initialData.students || [], (s) => s.id);
  const disableSubmit = useMemo(() => {
    if (!name) return true;
    if (description.length > 500 || name.length > 120) return true;
    return false;
  }, [description, name]);
  return (
    <>
      <Heading size='md' as='h2' color='text.300'>
        Detalles
      </Heading>
      <Text fontSize='sm'>
        Los campos marcados con <b>*</b> son requeridos
      </Text>
      <Flex as='form' direction='column' grow={1} onSubmit={() => props.onSubmit(name, description, students.items)}>
        <Flex grow={1} direction='column'>
          <FormControl isInvalid={name.length > 500}>
            <FormLabel mt={2} fontWeight='bold'>
              Nombre de la rutina <b>*</b>
            </FormLabel>
            <Input value={name} type='text' boxShadow='sm' placeholder='Nombre' onChange={(e) => setName(e.target.value)} />
            {name.length > 120 && <FormErrorMessage>La cantidad máxima de caracteres es 120</FormErrorMessage>}
          </FormControl>
          <FormControl isInvalid={description.length > 500} display='flex' flexDirection='column' flexGrow={1}>
            <FormLabel mt={2} fontWeight='bold'>
              Descripción
            </FormLabel>
            <Textarea
              value={description}
              boxShadow='sm'
              flexGrow={1}
              placeholder='Descripcion'
              resize='none'
              onChange={(e) => setDescription(e.target.value)}
            />
            {description.length > 500 && <FormErrorMessage>La cantidad máxima de caracteres es 500</FormErrorMessage>}
          </FormControl>
          <FormControl display='flex' flexDirection='column' flexGrow={1}>
            <FormLabel mt={2} mb={0} fontWeight='bold'>
              Alumnos
            </FormLabel>
            <FormHelperText mb={2} mt={0} color='text.300'>
              Puedes asignar alumnos a esta rutina ahora o en cualquier momento
            </FormHelperText>
            <StudentSearch selected={students.items} onAdd={students.add} onRemove={students.remove} />
          </FormControl>
        </Flex>

        <Flex justifyContent='end' mt={5}>
          <Tooltip
            placement='left'
            hasArrow
            isDisabled={!disableSubmit}
            label='Completa los campos necesarios'
            aria-label='A tooltip'
            openDelay={300}
          >
            <Button colorScheme='primary' type='submit' isDisabled={disableSubmit}>
              Siguiente
            </Button>
          </Tooltip>
        </Flex>
      </Flex>
    </>
  );
};

/* Minor components */
const steps = ['detalles', 'planificación'];
const RutineStepper = (props: { index: number }) => {
  return (
    <Stepper {...props} maxWidth={{ base: 325, md: 400 }} colorScheme='primary' flexGrow={1}>
      {steps.map((step, index) => (
        <Step key={index}>
          <StepIndicator>
            <StepStatus complete={<StepIcon />} incomplete={<StepNumber />} active={<StepNumber />} />
          </StepIndicator>

          <Box flexShrink='0'>
            <StepDescription>{step}</StepDescription>
          </Box>

          <StepSeparator />
        </Step>
      ))}
    </Stepper>
  );
};

export default RoutineForm;
