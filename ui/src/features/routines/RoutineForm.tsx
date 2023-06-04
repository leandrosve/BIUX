import {
  Box,
  Button,
  Card,
  Flex,
  FormControl,
  FormErrorMessage,
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

const RoutineForm = () => {
  const { activeStep, goToNext, goToPrevious } = useSteps({
    index: 0,
    count: steps.length,
  });

  return (
    <Card
      boxShadow='base'
      background='bg.300'
      p='6'
      rounded={{ lg: 40, md: 40, base: 0 }}
      minWidth={{ lg: 710, md: 710, base: '100%' }}
      alignSelf='center'
      display='flex'
      m={5}
      position='relative'
      flexDirection={'column'}
      minHeight={650}
    >
      <RutineStepper index={1} />
      <Heading mt={2} as='h1'>
        Nueva Rutina
      </Heading>
      <Flex direction='column' position='relative' grow={1}>
        {activeStep === 0 && <Step1 onSubmit={goToNext} />}
        {activeStep === 1 && <RoutineFormSegmentsStep onPrevious={goToPrevious} />}
      </Flex>
    </Card>
  );
};
const Step1 = (props: { onSubmit: () => void }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
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
      <Flex as='form' direction='column' grow={1} onSubmit={props.onSubmit}>
        <Flex grow={1} direction='column'>
          <FormControl isInvalid={name.length > 500}>
            <FormLabel mt={2}>
              Nombre de la rutina <b>*</b>
            </FormLabel>
            <Input type='text' boxShadow='sm' placeholder='Nombre' onChange={(e) => setName(e.target.value)} />
            {name.length > 120 && <FormErrorMessage>La cantidad máxima de caracteres es 120</FormErrorMessage>}
          </FormControl>
          <FormControl isInvalid={description.length > 500}>
            <FormLabel mt={2}>Descripción</FormLabel>
            <Textarea boxShadow='sm' placeholder='Descripcion' resize='none' onChange={(e) => setDescription(e.target.value)} />
            {description.length > 500 && <FormErrorMessage>La cantidad máxima de caracteres es 500</FormErrorMessage>}
          </FormControl>
        </Flex>

        <Flex justifyContent='end'>
          <Tooltip
            placement='left'
            hasArrow
            isDisabled={!disableSubmit}
            label='Completa los campos necesarios'
            aria-label='A tooltip'
            openDelay={300}
          >
            <Button colorScheme='primary' mt={5} type='submit' isDisabled={disableSubmit}>
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
    <Stepper {...props} maxWidth={400} colorScheme='primary'>
      {steps.map((step, index) => (
        <Step key={index}>
          <StepIndicator>
            <StepStatus complete={<StepIcon />} incomplete={<StepNumber />} active={<StepNumber />} />
          </StepIndicator>

          <Box flexShrink='0'>
            <StepDescription>{step}</StepDescription>
          </Box>

          <StepSeparator style={{ width: 60 }} />
        </Step>
      ))}
    </Stepper>
  );
};

export default RoutineForm;
