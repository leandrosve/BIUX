import { Button, Flex, Icon } from '@chakra-ui/react';
import { useState } from 'react';
import InitialRoleStep from '../features/signup/InitialRoleStep';
import RegistrationStep from '../features/signup/RegistrationStep';
import ResponsiveCard from '../components/common/ResponsiveCard';
import { BrandIcon } from '../components/common/Icons';
import SimpleStepper from '../components/common/SimpleStepper';
import { ArrowBackIcon } from '@chakra-ui/icons';

enum Steps {
  INITIAL_ROLE = 0,
  REGISTRATION = 1,
}
const SignupPage = () => {
  const [step, setStep] = useState<Steps>(Steps.INITIAL_ROLE);
  return (
    <ResponsiveCard marginTop={5} maxWidth={900} defaultHeight='auto'>
      <Flex mb={3} justifyContent='space-between'>
        <SimpleStepper steps={['tipo de usuario', 'registro']} index={step} />

        {step == Steps.REGISTRATION && (
          <Button variant='ghost' leftIcon={<ArrowBackIcon />} onClick={() => setStep(Steps.INITIAL_ROLE)}>
            Atrás
          </Button>
        )}
      </Flex>
      {step === Steps.INITIAL_ROLE && <InitialRoleStep onSuccess={() => setStep(Steps.REGISTRATION)} />}
      {step === Steps.REGISTRATION && <RegistrationStep />}
    </ResponsiveCard>
  );
};

export default SignupPage;
