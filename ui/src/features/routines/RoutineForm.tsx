import {
  Box,
  Button,
  Card, FormControl,
  FormLabel,
  Heading,
  Input, Step,
  StepDescription,
  StepIcon,
  StepIndicator,
  StepNumber,
  StepSeparator,
  StepStatus,
  Stepper,
  Textarea,
  useSteps
} from '@chakra-ui/react';
import RoutineFormSegmentsStep from './RoutineFormSegmentsStep';

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
      rounded={{ lg: 40, md: 0, base: 0 }}
      alignSelf={{ base: 'stretch', md: 'stretch', lg: 'center' }}
      display='flex'
      mt={2}
      flexDirection={'column'}
    >
      <RutineStepper index={1} />
      <Heading mt={2} as='h1'>
        Nueva Rutina
      </Heading>
      {activeStep === 0 && <Step1 onSubmit={goToNext} />}
      {activeStep === 1 && <RoutineFormSegmentsStep onPrevious={goToPrevious} />}
    </Card>
  );
};
const Step1 = (props: { onSubmit: () => void }) => {
  return (
    <>
      <Heading size='md' as='h2' color='text.300'>
        Detalles
      </Heading>
      <form onSubmit={props.onSubmit}>
        <FormControl>
          <FormLabel mt={2} fontWeight='bold'>
            Nombre
          </FormLabel>
          <Input type='text' boxShadow='sm' placeholder='Nombre' />
        </FormControl>
        <FormControl>
          <FormLabel mt={2} fontWeight='bold'>
            Descripción
          </FormLabel>
          <Textarea boxShadow='sm' placeholder='Descripcion' resize='none' />
        </FormControl>
        <Button colorScheme='primary' mt={5} type='submit'>
          Siguiente
        </Button>
      </form>
    </>
  );
};

/* Minor components */
const steps = ['detalles', 'resultados esperados'];
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
