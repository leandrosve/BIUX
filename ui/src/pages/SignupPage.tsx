import { Button, Flex, Icon } from '@chakra-ui/react';
import { useState } from 'react';
import InitialRoleStep from '../features/signup/InitialRoleStep';
import RegistrationStep from '../features/signup/RegistrationStep';
import ResponsiveCard from '../components/common/ResponsiveCard';
import { BrandIcon } from '../components/common/Icons';
import SimpleStepper from '../components/common/SimpleStepper';
import { ArrowBackIcon } from '@chakra-ui/icons';
import Role from '../model/user/Role';

enum Steps {
  INITIAL_ROLE = 0,
  REGISTRATION = 1,
}

const SignupPage = () => {
  const [step, setStep] = useState<Steps>(Steps.INITIAL_ROLE);
  const [role, setRole] = useState<Role>();
  const [accessCode, setAccessCode] = useState<string>();
  const [instructorId, setInstructorId] = useState<number>();
  const [instructorName, setInstructorName] = useState<string>();

  const handleInitialRoleSuccess = (role: Role, accessCode?: string, instructorId?: number, instructorName?: string) => {
    setRole(role);
    setAccessCode(accessCode);
    setInstructorId(instructorId);
    setInstructorName(instructorName);
    setStep(Steps.REGISTRATION);
  };

  return (
    <ResponsiveCard marginY={[0,5]} maxWidth={900} defaultWidth='auto' defaultHeight='auto'>
      <Flex mb={3} justifyContent='space-between' flexDirection={{ base: 'column-reverse', md: 'row' }} gap='5px'>
        <SimpleStepper
          steps={[
            <>
              tipo de <br />
              usuario
            </>,
            'registro',
          ]}
          index={step}
        />
        {step == Steps.REGISTRATION && (
          <Button size={['sm', 'md']} alignSelf='end' leftIcon={<ArrowBackIcon />} onClick={() => setStep(Steps.INITIAL_ROLE)}>
            Atrás
          </Button>
        )}
      </Flex>
      {step === Steps.INITIAL_ROLE && <InitialRoleStep initialData={{ role, accessCode }} onSuccess={handleInitialRoleSuccess} />}
      {step === Steps.REGISTRATION && (
        <RegistrationStep instructorName={instructorName} role={role} accessCode={accessCode} instructorId={instructorId} />
      )}
    </ResponsiveCard>
  );
};

export default SignupPage;
